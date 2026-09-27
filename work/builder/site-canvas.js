(() => {
  let siteMode=false, siteZoom=.5, sitePanX=60, sitePanY=60;
  const SITE_LOGICAL_WIDTH=1440;
  const SITE_LOGICAL_HEIGHT=900;
  const SITE_THUMB_SCALE=.5;
  const SITE_CARD_WIDTH=SITE_LOGICAL_WIDTH*SITE_THUMB_SCALE;
  let pageDragId=null, pageDropIndex=null, pagePointerDrag=null, suppressPageClick=false, overviewRAF=0, overviewGeneration=0, overviewPreserveHeights=false;
  const q=s=>document.querySelector(s);

  function exactSection(section,page){
    const oldPage=P.activePageId,oldDevice=device,oldSelection=selection;
    P.activePageId=page.id;
    device='desktop';
    selection=null;
    try{
      const st=effective(section);
      const el=document.createElement('section');
      el.className='page-section site-exact-section '+(section.type||'');
      box(el,st);
      el.style.color=colour(st.color);
      el.style.padding=`${named(st.top,'spaces')}px ${named(st.side,'spaces')}px ${named(st.bottom,'spaces')}px`;
      el.style.minHeight=st.minHeight==='screen'?SITE_LOGICAL_HEIGHT+'px':st.minHeight+'px';
      const bg=assetUrl(st.bgAssetId)||st.bgImage||'';
      if(bg){
        el.style.backgroundImage=`linear-gradient(${rgba(colour(st.overlayColor),st.overlayOpacity)},${rgba(colour(st.overlayColor),st.overlayOpacity)}),url("${bg}")`;
        el.style.backgroundSize=st.bgFit;
        el.style.backgroundPosition=st.bgPos;
        el.style.backgroundRepeat='no-repeat';
      }
      if(section.type==='navbar'){
        normalizeNavbar(section,{legacy:true});
        const mode=navbarPlacement(section);
        el.classList.add('navbar-section','navbar-'+mode);
        el.dataset.navMode=mode;
        el.dataset.navTransparent=String(!!section.navTransparent);
        el.style.setProperty('--nav-top-color',colour(section.navTopColor));
        el.style.setProperty('--nav-solid-bg',colour(section.navTransparent?section.navScrolledBackground:st.background));
        el.style.setProperty('--nav-solid-color',colour(section.navTransparent?section.navScrolledColor:st.color));
        if(section.navTransparent)el.classList.add('navbar-transparent-top');
        if(mode==='overlay'||section.navTransparent){
          el.classList.add('site-navbar-overlap');
          el.style.position='absolute';
          el.style.top='0';el.style.left='0';el.style.right='0';el.style.width='100%';
          el.style.zIndex='40';
        }else{
          el.style.position='relative';
          el.style.top='auto';
          el.style.zIndex='5';
        }
      }
      el.style.display=st.visible===false?'none':'flex';
      el.style.flexDirection='column';
      el.style.justifyContent=({top:'flex-start',center:'center',bottom:'flex-end'}[st.vAlign]);
      const wrap=document.createElement('div');
      wrap.style.width='100%';
      wrap.style.maxWidth=st.contentWidth?st.contentWidth+'px':'none';
      wrap.style.margin='0 auto';
      for(const node of section.elements||[])wrap.append(renderNode(node));
      el.append(wrap);
      return el;
    }finally{
      P.activePageId=oldPage;
      device=oldDevice;
      selection=oldSelection;
    }
  }

  function clearPageDropMarker(){
    q('#sitePageDropMarker')?.remove();
    document.querySelectorAll('.site-page-card.dragging').forEach(x=>x.classList.remove('dragging'));
    pageDropIndex=null;
  }

  function sitePageDropIndex(clientX){
    const frames=[...document.querySelectorAll('#sitePages .site-page-card')]
      .filter(x=>x.dataset.pageId!==pageDragId);
    for(let i=0;i<frames.length;i++){
      const r=frames[i].getBoundingClientRect();
      if(clientX<r.left+r.width/2)return i;
    }
    return frames.length;
  }

  function showPageDropMarker(index){
    const root=q('#sitePages');
    if(!root)return;
    q('#sitePageDropMarker')?.remove();

    const marker=document.createElement('div');
    marker.id='sitePageDropMarker';
    marker.className='site-page-drop-marker';

    const frames=[...root.querySelectorAll('.site-page-card')]
      .filter(x=>x.dataset.pageId!==pageDragId);
    if(index>=frames.length)root.append(marker);
    else root.insertBefore(marker,frames[index]);
    pageDropIndex=index;
  }

  function reorderPage(pageId,index){
    const from=P.pages.findIndex(p=>p.id===pageId);
    if(from<0)return;

    const [page]=P.pages.splice(from,1);
    index=Math.max(0,Math.min(index,P.pages.length));
    P.pages.splice(index,0,page);

    P.activePageId=page.id;
    selection=null;
    activeScope='style';
    clearPageDropMarker();

    render();
    inspect();
    renderOverview();
    toast(page.name+' moved');
  }

  function beginPointerPageDrag(e,pageId,card,handle){
    pageDragId=pageId;
    pageDropIndex=P.pages.findIndex(p=>p.id===pageId);
    pagePointerDrag={
      pointerId:e.pointerId,
      startX:e.clientX,
      lastX:e.clientX,
      moved:false,
      card,
      handle
    };
    card.classList.add('dragging');
    handle.setPointerCapture(e.pointerId);
    document.body.classList.add('is-page-reordering');
    e.preventDefault();
    e.stopPropagation();
  }

  function movePointerPageDrag(e){
    if(!pagePointerDrag||e.pointerId!==pagePointerDrag.pointerId)return;
    const dx=e.clientX-pagePointerDrag.startX;
    pagePointerDrag.lastX=e.clientX;
    if(Math.abs(dx)>5)pagePointerDrag.moved=true;

    // The Site Canvas is scaled, so convert screen pixels back to world pixels.
    pagePointerDrag.card.style.transform=`translateX(${dx/siteZoom}px)`;
    pagePointerDrag.card.style.zIndex='20';

    const index=sitePageDropIndex(e.clientX);
    showPageDropMarker(index);
  }

  function finishPointerPageDrag(e,cancel=false){
    if(!pagePointerDrag||e.pointerId!==pagePointerDrag.pointerId)return;

    const {card,handle,moved}=pagePointerDrag;
    card.style.transform='';
    card.style.zIndex='';
    card.classList.remove('dragging');
    try{handle.releasePointerCapture(e.pointerId)}catch{}

    const id=pageDragId;
    const index=pageDropIndex;
    pagePointerDrag=null;
    pageDragId=null;
    document.body.classList.remove('is-page-reordering');

    if(cancel||!moved){
      clearPageDropMarker();
      return;
    }

    suppressPageClick=true;
    reorderPage(id,index);
  }


  function captureOverviewHeights(){
    const heights=new Map();
    document.querySelectorAll('#sitePages .site-page-card').forEach(card=>{
      const vp=card.querySelector('.site-page-sheet-viewport');
      if(card.dataset.pageId&&vp){
        const height=vp.style.height||((vp.offsetHeight||0)+'px');
        if(height&&height!=='0px')heights.set(card.dataset.pageId,height);
      }
    });
    return heights;
  }

  function scheduleOverview({preserveHeights=false}={}){
    overviewPreserveHeights=overviewPreserveHeights||preserveHeights;
    if(overviewRAF)cancelAnimationFrame(overviewRAF);
    overviewRAF=requestAnimationFrame(()=>{
      overviewRAF=0;
      const preserve=overviewPreserveHeights;
      overviewPreserveHeights=false;
      renderOverview({preserveHeights:preserve});
    });
  }

  function renderOverview({preserveHeights=false}={}){
    const generation=++overviewGeneration;
    const root=q('#sitePages');
    if(!root) return;
    const preservedHeights=preserveHeights?captureOverviewHeights():new Map();
    root.replaceChildren();
    for(const page of P.pages){
      const frame=document.createElement('article');
      frame.className='site-page-card'+(page.id===P.activePageId?' active':'');
      frame.dataset.pageId=page.id;
      frame.tabIndex=0;

      const head=document.createElement('div');
      head.className='site-page-card-head';

      const left=document.createElement('div');
      left.className='site-page-card-title';

      const drag=document.createElement('span');
      drag.className='site-page-drag-handle';
      drag.textContent='⋮⋮';
      drag.title='Drag to reorder this page';
      drag.draggable=false;
      drag.addEventListener('pointerdown',e=>{
        if(e.button!==0)return;
        beginPointerPageDrag(e,page.id,frame,drag);
      });

      const meta=document.createElement('div');
      meta.className='site-page-card-meta';
      meta.innerHTML=`<b>${esc(page.name)}</b><small>${esc(page.slug)}</small>`;

      const edit=document.createElement('button');
      edit.textContent='Edit';
      edit.onclick=e=>{e.stopPropagation();openPage(page.id)};

      left.append(drag,meta);
      head.append(left,edit);

      const sheetViewport=document.createElement('div');
      sheetViewport.className='site-page-sheet-viewport';
      const preservedHeight=preservedHeights.get(page.id);
      if(preservedHeight)sheetViewport.style.height=preservedHeight;
      const sheet=document.createElement('div');
      sheet.className='site-page-sheet';
      sheet.style.width=SITE_LOGICAL_WIDTH+'px';
      sheet.style.minHeight=SITE_LOGICAL_HEIGHT+'px';
      sheet.style.transform=`scale(${SITE_THUMB_SCALE})`;
      sheet.style.transformOrigin='top left';
      const shared=P.sharedSections||{};
      if(shared.navbar)sheet.append(exactSection(shared.navbar,page));
      if(page.sections.length){
        for(const section of page.sections) sheet.append(exactSection(section,page));
      }else{
        const empty=document.createElement('div');
        empty.className='site-page-empty';
        empty.textContent='No page-specific Sections';
        sheet.append(empty);
      }
      if(shared.footer)sheet.append(exactSection(shared.footer,page));
      sheetViewport.append(sheet);

      frame.append(head,sheetViewport);
      frame.onclick=()=>{if(suppressPageClick){suppressPageClick=false;return}selectPage(page.id)};
      frame.ondblclick=e=>{if(suppressPageClick){suppressPageClick=false;return}if(!e.target.closest('button')) openPage(page.id)};
      frame.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();openPage(page.id)}};
      root.append(frame);
      requestAnimationFrame(()=>{
        if(generation!==overviewGeneration||!sheet.isConnected||!sheetViewport.isConnected)return;
        // Transparent Site View Navbars are already out of normal flow when
        // created, so there is no delayed Navbar-height correction here.

        // Colour changes are paint-only. Keep the previously established page
        // geometry exactly as-is; repainting a palette must never make a Site
        // View page taller or shorter.
        if(preserveHeights&&preservedHeight)return;

        const logicalHeight=Math.max(SITE_LOGICAL_HEIGHT,sheet.offsetHeight);
        sheetViewport.style.height=Math.ceil(logicalHeight*SITE_THUMB_SCALE)+'px';
      });
    }
    applyTransform();
  }

  function selectPage(pageId,{focus=false}={}){
    if(!P.pages.some(p=>p.id===pageId)) return;
    P.activePageId=pageId;
    selection=null;
    activeScope='style';
    render();
    inspect();
    renderOverview();
    if(focus)requestAnimationFrame(()=>focusPage(pageId));
  }

  function openPage(pageId){
    if(!P.pages.some(p=>p.id===pageId)) return;
    P.activePageId=pageId;
    selection=null;
    activeScope='style';
    setMode(false);
    setLeftPanel('library');
    render();
    inspect();
  }

  function syncMode(){
    q('#pageEditorSurface').hidden=siteMode;
    q('#siteCanvasSurface').hidden=!siteMode;
    q('#pageViewControls').hidden=siteMode;
    q('#siteViewControls').hidden=!siteMode;
    q('#pageViewBtn').classList.toggle('active',!siteMode);
    q('#siteViewBtn').classList.toggle('active',siteMode);
    q('#workspace').classList.toggle('site-mode',siteMode);
  }

  function setMode(value,{fit=false}={}){
    siteMode=!!value;
    selection=null;
    activeScope='style';
    if(siteMode) setLeftPanel('pages');
    syncMode();
    if(siteMode){
      renderPages();
      inspect();
      renderOverview();
      if(fit) requestAnimationFrame(fitSite);
    }else{
      render();
      inspect();
    }
  }

  function applyTransform(){
    const world=q('#siteWorld');
    if(!world) return;
    world.style.transform=`translate(${sitePanX}px,${sitePanY}px) scale(${siteZoom})`;
    q('#siteZoomReset').textContent=Math.round(siteZoom*100)+'%';
  }

  function setZoom(next,anchorX=null,anchorY=null){
    const vp=q('#siteViewport');
    if(!vp) return;
    next=Math.max(.15,Math.min(1.2,next));
    const r=vp.getBoundingClientRect();
    const ax=anchorX??r.width/2, ay=anchorY??r.height/2;
    const wx=(ax-sitePanX)/siteZoom, wy=(ay-sitePanY)/siteZoom;
    sitePanX=ax-wx*next;
    sitePanY=ay-wy*next;
    siteZoom=next;
    applyTransform();
  }

  function fitSite(){
    if(!siteMode) return;
    const vp=q('#siteViewport'), pages=q('#sitePages');
    if(!vp||!pages) return;
    const w=Math.max(pages.scrollWidth,1), h=Math.max(pages.scrollHeight,1);
    siteZoom=Math.max(.03,Math.min(.8,(vp.clientWidth-100)/w,(vp.clientHeight-100)/h));
    sitePanX=(vp.clientWidth-w*siteZoom)/2;
    sitePanY=Math.max(40,(vp.clientHeight-h*siteZoom)/2);
    applyTransform();
  }

  function focusPage(pageId=P.activePageId){
    if(!siteMode)return;
    const vp=q('#siteViewport');
    const card=document.querySelector(`.site-page-card[data-page-id="${pageId}"]`);
    if(!vp||!card)return;

    const targetZoom=Math.max(.35,Math.min(.85,(vp.clientWidth-160)/Math.max(card.offsetWidth,1)));
    siteZoom=targetZoom;
    sitePanX=vp.clientWidth/2-(card.offsetLeft+card.offsetWidth/2)*siteZoom;
    sitePanY=56-card.offsetTop*siteZoom;
    applyTransform();
  }

  const baseRenderPages=renderPages;
  renderPages=function(){
    baseRenderPages();
    if(siteMode){
      const buttons=[...document.querySelectorAll('#pagesList .page-list-main')];
      buttons.forEach((button,index)=>{
        const page=P.pages[index];
        if(page)button.onclick=()=>selectPage(page.id,{focus:true});
      });
      scheduleOverview({preserveHeights:!!window.__runaSitePaintOnly});
    }
  };

  q('#pagesTab').onclick=()=>setLeftPanel('pages');
  q('#libraryTab').onclick=()=>{if(siteMode)setMode(false);setLeftPanel('library')};
  q('#assetsTab').onclick=()=>{if(siteMode)setMode(false);setLeftPanel('assets')};
  q('#treeTab').onclick=()=>{if(siteMode)setMode(false);setLeftPanel('tree')};

  q('#pageViewBtn').onclick=()=>setMode(false);
  q('#siteViewBtn').onclick=()=>setMode(true,{fit:true});
  q('#siteZoomOut').onclick=()=>setZoom(siteZoom-.1);
  q('#siteZoomIn').onclick=()=>setZoom(siteZoom+.1);
  q('#siteZoomReset').onclick=()=>setZoom(.5);
  q('#siteFocus').onclick=()=>focusPage();
  q('#siteFit').onclick=fitSite;

  const vp=q('#siteViewport');
  const sitePages=q('#sitePages');

  document.addEventListener('pointermove',movePointerPageDrag);
  document.addEventListener('pointerup',e=>finishPointerPageDrag(e,false));
  document.addEventListener('pointercancel',e=>finishPointerPageDrag(e,true));

  let panning=false,startX=0,startY=0,originX=0,originY=0,panMoved=false,panStartedOnPage=false;

  vp.addEventListener('pointerdown',e=>{
    if(!siteMode||pagePointerDrag)return;

    const overPage=!!e.target.closest('.site-page-card');

    // Left button pans empty canvas only.
    // Middle button pans from anywhere, including over page previews.
    const leftEmptyPan=e.button===0&&!overPage;
    const middleAnywherePan=e.button===1;
    if(!leftEmptyPan&&!middleAnywherePan)return;

    panning=true;
    panMoved=false;
    panStartedOnPage=overPage;
    startX=e.clientX;
    startY=e.clientY;
    originX=sitePanX;
    originY=sitePanY;
    vp.setPointerCapture(e.pointerId);
    vp.classList.add('panning');
    e.preventDefault();
  });

  vp.addEventListener('pointermove',e=>{
    if(!panning)return;
    const dx=e.clientX-startX,dy=e.clientY-startY;
    if(Math.abs(dx)>4||Math.abs(dy)>4)panMoved=true;
    sitePanX=originX+dx;
    sitePanY=originY+dy;
    applyTransform();
  });

  vp.addEventListener('pointerup',e=>{
    if(!panning)return;
    panning=false;
    vp.classList.remove('panning');
    try{vp.releasePointerCapture(e.pointerId)}catch{}

    if(panMoved&&panStartedOnPage){
      suppressPageClick=true;
      setTimeout(()=>{suppressPageClick=false},0);
    }
  });

  vp.addEventListener('pointercancel',()=>{
    panning=false;
    vp.classList.remove('panning');
  });

  vp.addEventListener('wheel',e=>{
    if(!siteMode)return;
    e.preventDefault();

    const r=vp.getBoundingClientRect();

    if(e.ctrlKey||e.metaKey){
      const factor=Math.exp(-e.deltaY*.002);
      setZoom(siteZoom*factor,e.clientX-r.left,e.clientY-r.top);
      return;
    }

    const unit=e.deltaMode===1?16:e.deltaMode===2?vp.clientHeight:1;
    let dx=e.deltaX*unit,dy=e.deltaY*unit;
    if(e.shiftKey&&Math.abs(dx)<1){
      dx=dy;
      dy=0;
    }
    sitePanX-=dx;
    sitePanY-=dy;
    applyTransform();
  },{passive:false});

  vp.addEventListener('dblclick',e=>{
    if(!siteMode||e.target.closest('.site-page-card'))return;
    fitSite();
  });
  syncMode();
})();