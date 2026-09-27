'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)], uid=p=>p+'_'+Math.random().toString(36).slice(2,10), clone=v=>structuredClone(v);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEYS={projects:'runa-v6-alpha-projects',presets:'runa-v106-presets'};
function read(key,fallback={}){try{return JSON.parse(localStorage.getItem(key))||fallback}catch{return fallback}}
function clearLegacySnapshotStorage(){
  try{
    const remove=[];
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i)||'';
      if(/^runa-/i.test(key)&&/snapshot/i.test(key))remove.push(key);
    }
    remove.forEach(key=>localStorage.removeItem(key));
  }catch{}
}
function persist(key,v,{quiet=false}={}){try{localStorage.setItem(key,JSON.stringify(v));return true}catch{if(!quiet)toast('Browser storage is full. Export your project or clear old saved data.');return false}}
const colourNames={
 primary:'Brand',accent:'Accent 1',accent2:'Accent 2',bg:'Background',surface:'Alternative background',text:'Main text',secondary:'Secondary text',dark:'Dark surface',onPrimary:'Text on brand',onDark:'Text on dark'
};
function design({primary='#174a42',accent='#d4aa62',accent2='#60758f',bg='#ffffff',surface='#f4f2ed',text='#1b1d1c',secondary='#66706c',dark='#151817',onPrimary='#ffffff',onDark='#ffffff',font='DM Sans',radius=8}={}){
 const textDefs={
  display:['Display',96,.92,700,0],displayTight:['Oversized display',96,.84,700,-2],
  h1:['Heading 1',56,1.05,700,0],h2:['Heading 2',44,1.12,700,0],h3:['Heading 3',27,1.2,700,0],h4:['Heading 4',23,1.25,700,0],h5:['Heading 5',20,1.3,700,0],h6:['Heading 6',18,1.3,700,0],
  lead:['Lead paragraph',20,1.6,400,0],body:['Body',16,1.65,400,0],emphasis:['Emphasis',16,1.5,700,0],leadEmphasis:['Lead emphasis',20,1.6,700,0],small:['Small text',12,1.5,400,0],label:['Label / eyebrow',12,1.4,700,.8],brand:['Brand text',22,1.1,800,0],button:['Button text',16,1.2,700,0],link:['Link',16,1.6,500,0]
 };
 const texts=Object.fromEntries(Object.entries(textDefs).map(([id,[name,size,lineHeight,weight,letterSpacing]])=>[id,{name,font,size,lineHeight,weight,letterSpacing,color:id==='link'?'$primary':'inherit',underline:id==='link'?'underline':'none',hoverColor:id==='link'?'$accent2':'inherit'}]));
 return {colours:Object.fromEntries(Object.entries({primary,accent,accent2,bg,surface,text,secondary,dark,onPrimary,onDark}).map(([id,value])=>[id,{name:colourNames[id],value}])),texts,
  buttons:{main:{name:'Primary button',background:'$primary',color:'$onPrimary',hoverBackground:'$dark',hoverColor:'$onDark',focusColor:'$accent2',padX:20,padY:12,radius:'@rounded',border:'@none',shadow:'@none',textStyle:'button'},alternative:{name:'Secondary button',background:'transparent',color:'$primary',hoverBackground:'$surface',hoverColor:'$primary',focusColor:'$accent2',padX:20,padY:12,radius:'@rounded',border:'@standard',shadow:'@none',textStyle:'button'},text:{name:'Text button',background:'transparent',color:'$primary',hoverBackground:'$surface',hoverColor:'$primary',focusColor:'$accent2',padX:8,padY:8,radius:'@square',border:'@none',shadow:'@none',textStyle:'button'}},
  spaces:{small:{name:'Small',value:10},medium:{name:'Medium',value:20},large:{name:'Large',value:40}},corners:{square:{name:'Square',value:0},subtle:{name:'Subtle',value:4},rounded:{name:'Rounded',value:radius},pill:{name:'Pill',value:999}},borders:{none:{name:'None',value:0,line:'solid',color:'$primary'},standard:{name:'Standard',value:1,line:'solid',color:'$primary'}},shadows:{none:{name:'None',value:'none'},light:{name:'Light',value:'0 4px 14px #00000012'},strong:{name:'Strong',value:'0 12px 32px #00000026'}},layout:{width:1440,side:40,top:48,bottom:48,gap:24,imageRadius:'@rounded',cardRadius:'@rounded'},responsive:{tablet:{side:24,top:48,bottom:48,gap:20},mobile:{side:20,top:36,bottom:36,gap:16}},sectionSpacing:{hero:{desktop:{top:80,bottom:80},tablet:{top:64,bottom:64},mobile:{top:48,bottom:48}},compact:{desktop:{top:48,bottom:48},tablet:{top:40,bottom:40},mobile:{top:32,bottom:32}}}}
}
const PRESETS={
 'Runa Clean':design(),
 'Refined':design({primary:'#28324a',accent:'#b79462',accent2:'#7e6f91',bg:'#fbfaf7',surface:'#f0eee8',text:'#242424',secondary:'#696663',dark:'#202535',onPrimary:'#ffffff',onDark:'#ffffff',font:'Playfair Display',radius:4}),
 'Bold Graphic':design({primary:'#1746d1',accent:'#ffcc33',accent2:'#e24a68',bg:'#ffffff',surface:'#eef2ff',text:'#111318',secondary:'#5b6170',dark:'#111827',onPrimary:'#ffffff',onDark:'#ffffff',font:'Montserrat',radius:2}),
 'Dark Modern':design({primary:'#a8d5c9',accent:'#d7b46a',accent2:'#8ea6ff',bg:'#171a1b',surface:'#222728',text:'#f3f4f2',secondary:'#b8c0bd',dark:'#0f1212',onPrimary:'#101615',onDark:'#f3f4f2',font:'Manrope',radius:12})
};
for(const preset of Object.values(PRESETS))ensureStyleContract(preset);
let P=fresh(), selection=null, device='desktop', activeScope='style', inspectorMode='quick';
function nodeMotion(n){
  const m=n?.motion||{};
  return{reveal:m.reveal||'none',delay:Number(m.delay)||0,hover:m.hover||'none'};
}
function nodeInteraction(n){
  const i=n?.interaction||{};
  return{recipe:i.recipe||'none',role:i.role||'none',key:i.key||'',defaultKey:i.defaultKey||'',lightboxGroup:i.lightboxGroup||''};
}

const HISTORY_LIMIT=50;
let undoStack=[],redoStack=[],historyCurrent='',historyRestoring=false,historyLastControl='',historyLastAt=0;

const EDITOR_VIEWPORTS={desktop:1440,tablet:768,mobile:390};
let editorScale=1;
function logicalViewportWidth(mode=device){return EDITOR_VIEWPORTS[mode]||EDITOR_VIEWPORTS.desktop}
function previewDeviceForWidth(width){return width<640?'mobile':width<1024?'tablet':'desktop'}
function syncDeviceUI(){
  $$('[data-device]').forEach(x=>x.classList.toggle('active',x.dataset.device===device));
  $('#deviceNote').textContent=device==='desktop'?'Editing 1440px desktop defaults':device==='tablet'?'Editing 768px tablet overrides':'Editing 390px mobile overrides';
}
function syncEditorViewport(){
  if(previewMode)return;
  const viewport=$('#scroll'),shell=$('#stageShell'),stage=$('#stage');
  if(!viewport||!shell||!stage)return;
  const width=logicalViewportWidth();
  const styles=getComputedStyle(viewport);
  const available=Math.max(220,viewport.clientWidth-(parseFloat(styles.paddingLeft)||0)-(parseFloat(styles.paddingRight)||0));
  editorScale=Math.min(1,available/width);
  stage.style.width=width+'px';
  stage.style.maxWidth='none';
  stage.style.transformOrigin='top left';
  stage.style.transform=`scale(${editorScale})`;
  shell.style.width=(width*editorScale)+'px';
  shell.style.height=Math.max(650*editorScale,stage.scrollHeight*editorScale)+'px';
  syncNavbarScrollState(viewport);
}
function setEditorDevice(next,{renderNow=true}={}){
  if(!EDITOR_VIEWPORTS[next])return;
  device=next;
  syncDeviceUI();
  if(renderNow){render();inspect()}
  requestAnimationFrame(syncEditorViewport);
}
function makePage(name='Home',slug='/'){return{id:uid('page'),name,slug,sections:[]}}
function fresh(){const page=makePage();return{id:uid('project'),name:'Untitled website',version:'3.14.4',design:clone(PRESETS['Runa Clean']),stylePreset:'Runa Clean',assets:[],sharedSections:{navbar:null,footer:null},activePageId:page.id,pages:[page]}}
function activePage(){
  if(!Array.isArray(P.pages)||!P.pages.length){const page=makePage();P.pages=[page];P.activePageId=page.id;return page}
  let page=P.pages.find(x=>x.id===P.activePageId)||P.pages[0];
  if(P.activePageId!==page.id)P.activePageId=page.id;
  return page;
}
function currentSections(){return activePage().sections}
const ASSET_DB_NAME='runa-builder-assets-v1';
const ASSET_STORE_NAME='assets';
const assetRuntime=new Map();
let assetDbPromise=null;

function openAssetDB(){
  if(assetDbPromise)return assetDbPromise;
  assetDbPromise=new Promise((resolve,reject)=>{
    if(!window.indexedDB){reject(Error('IndexedDB is not available in this browser.'));return}
    const req=indexedDB.open(ASSET_DB_NAME,1);
    req.onupgradeneeded=()=>{
      const db=req.result;
      if(!db.objectStoreNames.contains(ASSET_STORE_NAME))db.createObjectStore(ASSET_STORE_NAME,{keyPath:'id'});
    };
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error||Error('Could not open asset storage.'));
  });
  return assetDbPromise;
}
async function putAssetBytes(assetId,data){
  if(!assetId||!data)return false;
  assetRuntime.set(assetId,data);
  try{
    const db=await openAssetDB();
    await new Promise((resolve,reject)=>{
      const tx=db.transaction(ASSET_STORE_NAME,'readwrite');
      tx.objectStore(ASSET_STORE_NAME).put({id:assetId,data,updatedAt:new Date().toISOString()});
      tx.oncomplete=resolve;
      tx.onerror=()=>reject(tx.error||Error('Could not store asset.'));
      tx.onabort=()=>reject(tx.error||Error('Could not store asset.'));
    });
    return true;
  }catch{return false}
}
async function getAssetBytes(assetId){
  if(assetRuntime.has(assetId))return assetRuntime.get(assetId);
  try{
    const db=await openAssetDB();
    const result=await new Promise((resolve,reject)=>{
      const tx=db.transaction(ASSET_STORE_NAME,'readonly');
      const req=tx.objectStore(ASSET_STORE_NAME).get(assetId);
      req.onsuccess=()=>resolve(req.result||null);
      req.onerror=()=>reject(req.error||Error('Could not read asset.'));
    });
    if(result?.data)assetRuntime.set(assetId,result.data);
    return result?.data||'';
  }catch{return ''}
}
async function deleteAssetBytes(assetId){
  assetRuntime.delete(assetId);
  try{
    const db=await openAssetDB();
    await new Promise((resolve,reject)=>{
      const tx=db.transaction(ASSET_STORE_NAME,'readwrite');
      tx.objectStore(ASSET_STORE_NAME).delete(assetId);
      tx.oncomplete=resolve;
      tx.onerror=()=>reject(tx.error||Error('Could not delete asset.'));
    });
  }catch{}
}
function assetFingerprint(data=''){
  let hash=2166136261;
  for(let i=0;i<data.length;i+=Math.max(1,Math.floor(data.length/4096))){
    hash^=data.charCodeAt(i);
    hash=Math.imul(hash,16777619);
  }
  return (hash>>>0).toString(36)+'-'+data.length;
}
function ensureAssets(project=P){
  if(!Array.isArray(project.assets))project.assets=[];
  return project.assets;
}
function assetById(id,project=P){return ensureAssets(project).find(a=>a.id===id)||null}
function assetUrl(id,project=P){
  if(!id)return'';
  return assetRuntime.get(id)||assetById(id,project)?.data||assetById(id,project)?.remoteUrl||'';
}
function assetNameFromFile(name='Image'){
  return String(name||'Image').replace(/\.[a-z0-9]+$/i,'').trim()||'Image';
}
function uniqueAssetName(base,project=P,excludeId=null){
  const clean=String(base||'Image').trim()||'Image';
  const names=new Set(ensureAssets(project).filter(a=>a.id!==excludeId).map(a=>String(a.name||'').toLowerCase()));
  if(!names.has(clean.toLowerCase()))return clean;
  let i=2;
  while(names.has((clean+' '+i).toLowerCase()))i++;
  return clean+' '+i;
}
function addProjectAsset({name='Image',data='',mime='',size=0,source='upload'}={},project=P){
  if(!data)return null;
  const assets=ensureAssets(project),fingerprint=assetFingerprint(data);
  const existing=assets.find(a=>a.type==='image'&&(a.fingerprint===fingerprint||a.data===data));
  if(existing){
    if(data)assetRuntime.set(existing.id,data);
    return existing;
  }
  const asset={
    id:uid('asset'),
    type:'image',
    name:uniqueAssetName(name,project),
    mime:mime||(/^data:([^;,]+)/.exec(data)?.[1]||''),
    size:Number(size)||0,
    source,
    fingerprint,
    data,
    createdAt:new Date().toISOString()
  };
  assets.push(asset);
  assetRuntime.set(asset.id,data);
  return asset;
}
async function hydrateProjectAssets(project=P){
  const assets=ensureAssets(project);
  await Promise.all(assets.map(async asset=>{
    if(asset.data||asset.remoteUrl){assetRuntime.set(asset.id,asset.data||asset.remoteUrl);return}
    await getAssetBytes(asset.id);
  }));
}
async function persistProjectAssetBytes(project=P){
  for(const asset of ensureAssets(project)){
    const data=asset.data||assetRuntime.get(asset.id)||'';
    if(!data)continue;
    asset.fingerprint=asset.fingerprint||assetFingerprint(data);
    const ok=await putAssetBytes(asset.id,data);
    if(!ok)return false;
    delete asset.data;
  }
  return true;
}
function projectForStorage(project=P){
  const cp=clone(project);
  for(const asset of ensureAssets(cp))delete asset.data;
  return cp;
}
async function exportableProject(project=P){
  const cp=clone(project);
  for(const asset of ensureAssets(cp)){
    asset.data=assetRuntime.get(asset.id)||assetById(asset.id,project)?.data||asset.remoteUrl||await getAssetBytes(asset.id);
    if(!asset.data)throw Error('Asset data is unavailable for '+(asset.name||asset.id)+'.');
  }
  return cp;
}
async function compactSavedProjectAssets(){
  const all=read(KEYS.projects),projects=Object.values(all);
  if(!projects.length)return;
  let changed=false;
  for(const project of projects){
    if(!Array.isArray(project.assets))continue;
    for(const asset of project.assets){
      if(!asset?.id||!asset.data)continue;
      asset.fingerprint=asset.fingerprint||assetFingerprint(asset.data);
      if(await putAssetBytes(asset.id,asset.data)){
        delete asset.data;
        changed=true;
      }
    }
  }
  if(changed)persist(KEYS.projects,all,{quiet:true});
}
function assetUsage(assetId,project=P){
  let count=0;
  for(const {section} of projectSectionEntries(project)){
    function layer(obj){
      if(!obj||typeof obj!=='object')return;
      if(obj.bgAssetId===assetId)count++;
    }
    layer(section.baseStyle);layer(section.style);
    for(const v of Object.values(section.responsive||{}))layer(v);
    walk(section.elements,n=>{
      if(n.type==='image'&&n.assetId===assetId)count++;
      layer(n.baseStyle);layer(n.style);
      for(const v of Object.values(n.responsive||{}))layer(v);
    });
  }
  return count;
}
function migrateProjectAssets(project){
  ensureAssets(project);
  for(const asset of ensureAssets(project)){
    if(asset.data){
      asset.fingerprint=asset.fingerprint||assetFingerprint(asset.data);
      assetRuntime.set(asset.id,asset.data);
    }
  }
  const fromLegacy=(data,name='Imported image')=>{
    if(!data)return '';
    return addProjectAsset({name,data,source:'legacy'},project)?.id||'';
  };
  const migrateLayer=(layer,name)=>{
    if(!layer||typeof layer!=='object')return;
    if(layer.bgImage&&!layer.bgAssetId){
      layer.bgAssetId=fromLegacy(layer.bgImage,name);
      delete layer.bgImage;
    }
  };
  for(const {section} of projectSectionEntries(project)){
    migrateLayer(section.baseStyle,(section.name||'Section')+' background');
    migrateLayer(section.style,(section.name||'Section')+' background');
    for(const [deviceName,layer] of Object.entries(section.responsive||{}))migrateLayer(layer,(section.name||'Section')+' '+deviceName+' background');
    walk(section.elements,n=>{
      if(n.type==='image'&&n.src&&!n.assetId){
        n.assetId=fromLegacy(n.src,n.name||n.alt||'Image');
        delete n.src;
      }
      migrateLayer(n.baseStyle,(n.name||'Layer')+' background');
      migrateLayer(n.style,(n.name||'Layer')+' background');
      for(const [deviceName,layer] of Object.entries(n.responsive||{}))migrateLayer(layer,(n.name||'Layer')+' '+deviceName+' background');
    });
  }
}
function ensureSharedMap(project=P){
  if(!project.sharedSections||typeof project.sharedSections!=='object'||Array.isArray(project.sharedSections)){
    project.sharedSections={navbar:null,footer:null};
  }
  if(!Object.hasOwn(project.sharedSections,'navbar'))project.sharedSections.navbar=null;
  if(!Object.hasOwn(project.sharedSections,'footer'))project.sharedSections.footer=null;
  return project.sharedSections;
}
function sharedSectionList(project=P){
  const shared=ensureSharedMap(project);
  return [shared.navbar,shared.footer].filter(Boolean);
}
function renderedSections(page=activePage(),project=P){
  const shared=ensureSharedMap(project);
  return [shared.navbar,...(page?.sections||[]),shared.footer].filter(Boolean);
}
function isSharedSection(section,project=P){
  if(!section)return false;
  const shared=ensureSharedMap(project);
  return shared.navbar===section||shared.footer===section;
}
function sharedSectionKind(section,project=P){
  const shared=ensureSharedMap(project);
  if(shared.navbar===section)return'navbar';
  if(shared.footer===section)return'footer';
  return null;
}
function sharedComponentKind(comp){
  const family=String(comp?.family||'').toLowerCase();
  return family==='navbar'||family==='footer'?family:null;
}
function projectSectionEntries(project=P){
  const out=[];
  const shared=ensureSharedMap(project);
  if(shared.navbar)out.push({section:shared.navbar,page:null,shared:true,kind:'navbar'});
  for(const page of project.pages||[])for(const section of page.sections||[])out.push({section,page,shared:false,kind:null});
  if(shared.footer)out.push({section:shared.footer,page:null,shared:true,kind:'footer'});
  return out;
}

function projectHasRecoverableState(p=P){
  if(!p||!Array.isArray(p.pages)||!p.pages.length)return false;
  if(p.pages.some(page=>Array.isArray(page.sections)&&page.sections.length))return true;
  if(sharedSectionList(p).length)return true;
  if(p.pages.length!==1)return true;
  const page=p.pages[0];
  if((p.name||'Untitled website')!=='Untitled website')return true;
  if((page.name||'Home')!=='Home'||(page.slug||'/')!=='/')return true;
  if((p.stylePreset||'Runa Clean')!=='Runa Clean')return true;
  try{return JSON.stringify(p.design)!==JSON.stringify(PRESETS['Runa Clean'])}catch{return true}
}
function layoutTopologySignature(node){
  if(!node||node.type!=='group')return '';
  if(node.isLayoutSlot)return 'L';
  if(!node.isLayoutScaffold)return '';
  return 'S('+((node.children||[]).map(layoutTopologySignature).join(','))+')';
}
function validateBuilderLayoutRoot(root){
  if(!root?.builderLayout)return;
  const layout=CONTAINER_LAYOUTS.find(x=>x.id===root.layoutPreset);
  if(!layout)throw Error('Unknown Container layout preset: '+String(root.layoutPreset||''));
  if(!Array.isArray(root.children)||root.children.length!==1||!root.children[0]?.isLayoutScaffold)throw Error('Invalid stock Container layout structure.');
  const expected=layoutTopologySignature(buildLayoutStructure(root.layoutPreset));
  const actual=layoutTopologySignature(root.children[0]);
  if(!actual||actual!==expected)throw Error('Invalid stock Container layout structure.');
  let slots=0;
  function checkStructural(node,insideSlot=false){
    if(!node||node.type!=='group')return;
    if(node.isLayoutSlot){slots++;return;}
    if(!node.isLayoutScaffold)throw Error('Invalid stock Container layout structure.');
    for(const child of node.children||[]){
      if(!child?.isLayoutSlot&&!child?.isLayoutScaffold)throw Error('Stock layout content must be inside a layout slot.');
      checkStructural(child,false);
    }
  }
  checkStructural(root.children[0]);
  if(slots!==layout.slots)throw Error('Invalid stock Container layout slot count.');
}
function validateProject(p){
  if(!p||typeof p!=='object')throw Error('This is not a Runa project.');
  if(!Array.isArray(p.pages)||!p.pages.length)throw Error('Project must contain at least one page.');
  if(!p.design||typeof p.design!=='object')throw Error('Incomplete Style data.');
  if(p.assets!==undefined&&!Array.isArray(p.assets))throw Error('Project assets must be an array.');
  const requiredMaps={
    colours:['primary','accent','accent2','bg','surface','text','secondary','dark','onPrimary','onDark'],
    texts:['display','displayTight','h1','h2','h3','h4','h5','h6','body','lead','emphasis','leadEmphasis','small','label','brand','button','link'],
    buttons:['main','alternative','text'],
    spaces:['small','medium','large'],
    corners:['square','subtle','rounded','pill'],
    borders:['none','standard'],
    shadows:['none','light','strong']
  };
  for(const [kind,ids] of Object.entries(requiredMaps)){
    const map=p.design[kind];
    if(!map||typeof map!=='object'||Array.isArray(map))throw Error('Incomplete Style data: missing '+kind+'.');
    for(const id of ids)if(!map[id]||typeof map[id]!=='object')throw Error('Incomplete Style data: missing '+kind+'.'+id+'.');
  }
  if(!p.design.layout||typeof p.design.layout!=='object')throw Error('Incomplete Style data: missing layout.');
  for(const key of ['width','side','top','bottom','gap','imageRadius','cardRadius'])if(!Object.hasOwn(p.design.layout,key))throw Error('Incomplete Style data: missing layout.'+key+'.');
  if(!p.design.responsive||typeof p.design.responsive!=='object'||!p.design.responsive.tablet||!p.design.responsive.mobile)throw Error('Incomplete Style data: missing responsive defaults.');
  const assetIds=new Set();
  for(const asset of ensureAssets(p)){
    if(!asset||typeof asset!=='object')throw Error('Invalid asset data.');
    if(typeof asset.id!=='string'||!asset.id)throw Error('Asset is missing an ID.');
    if(assetIds.has(asset.id))throw Error('Duplicate asset ID: '+asset.id);
    assetIds.add(asset.id);
    if(asset.type!=='image')throw Error('Unsupported asset type: '+String(asset.type||''));
    if(asset.data!==undefined&&(typeof asset.data!=='string'||!asset.data))throw Error('Image asset data is invalid.');
  }
  const ids=new Set();
  const claim=(id,what)=>{if(typeof id!=='string'||!id)throw Error(what+' is missing an ID.');if(ids.has(id))throw Error('Duplicate ID in imported project: '+id);ids.add(id)};
  const checkNode=(n)=>{
    if(!n||typeof n!=='object')throw Error('Invalid layer data.');
    claim(n.id,'Layer');
    if(typeof n.type!=='string'||!n.type)throw Error('Layer is missing a type.');
    if(n.type==='group'&&n.children!==undefined&&!Array.isArray(n.children))throw Error('Container children must be an array.');
    if(n.children!==undefined){if(!Array.isArray(n.children))throw Error('Layer children must be an array.');for(const child of n.children)checkNode(child)}
  };
  const checkSection=(section,what='Section')=>{
    if(!section||typeof section!=='object')throw Error('Invalid '+what+' data.');
    claim(section.id,what);
    if(!Array.isArray(section.elements))throw Error(what+' elements must be an array.');
    for(const node of section.elements)checkNode(node);
  };
  const shared=ensureSharedMap(p);
  if(shared.navbar){
    if(shared.navbar.type!=='navbar')throw Error('Shared Navbar has an invalid type.');
    checkSection(shared.navbar,'Shared Navbar');
  }
  if(shared.footer){
    if(shared.footer.type!=='footer')throw Error('Shared Footer has an invalid type.');
    checkSection(shared.footer,'Shared Footer');
  }

  const pageIds=new Set();
  for(const page of p.pages){
    if(!page||typeof page!=='object')throw Error('Invalid page data.');
    if(typeof page.id!=='string'||!page.id)throw Error('Page is missing an ID.');
    if(pageIds.has(page.id))throw Error('Duplicate page ID in imported project: '+page.id);pageIds.add(page.id);
    if(!Array.isArray(page.sections))throw Error('Page sections must be an array.');
    for(const section of page.sections)checkSection(section,'Section');
  }
  if(!p.pages.some(page=>page.id===p.activePageId))throw Error('Active page is invalid.');
  return p;
}
function commitProject(next){
  const previous=P,previousSelection=selection,previousScope=activeScope,previousHistory=historyCurrent;
  try{
    P=next;selection=null;activeScope='style';$('#projectName').value=P.name;resetHistory(P);render();inspect();
  }catch(err){
    P=previous;selection=previousSelection;activeScope=previousScope;historyCurrent=previousHistory;$('#projectName').value=P.name;render();inspect();throw err;
  }
}

function renderPaintOnly(){
  window.__runaSitePaintOnly=true;
  try{render()}
  finally{window.__runaSitePaintOnly=false}
}
function historySnapshot(project=P){
  try{return JSON.stringify(projectForStorage(project))}catch{return ''}
}
function historyControlKey(){
  const el=document.activeElement;
  if(!el||!el.matches?.('input,textarea,select'))return '';
  const type=(el.type||el.tagName||'').toLowerCase();
  if(!['color','range','text','search','number','textarea'].includes(type))return '';
  return (selection||activeScope||'style')+'|'+(el.id||el.getAttribute('aria-label')||type);
}
function updateHistoryControls(){
  const undo=$('#undoBtn'),redo=$('#redoBtn');
  if(undo)undo.disabled=!undoStack.length;
  if(redo)redo.disabled=!redoStack.length;
}
function resetHistory(project=P){
  undoStack=[];
  redoStack=[];
  historyCurrent=historySnapshot(project);
  historyLastControl='';
  historyLastAt=0;
  updateHistoryControls();
}
function captureHistoryOnRender(){
  if(historyRestoring)return;
  const next=historySnapshot(P);
  if(!next)return;
  if(!historyCurrent){
    historyCurrent=next;
    updateHistoryControls();
    return;
  }
  if(next===historyCurrent)return;

  const now=Date.now();
  const key=historyControlKey();
  const coalesce=!!key&&key===historyLastControl&&(now-historyLastAt)<750;

  if(!coalesce){
    undoStack.push(historyCurrent);
    if(undoStack.length>HISTORY_LIMIT)undoStack.shift();
  }
  redoStack=[];
  historyCurrent=next;
  historyLastControl=key;
  historyLastAt=now;
  updateHistoryControls();
}
function restoreHistoryState(serialized,direction){
  if(!serialized)return;
  const current=historySnapshot(P);
  const next=JSON.parse(serialized);

  historyRestoring=true;
  try{
    if(direction==='undo'){
      if(current)redoStack.push(current);
    }else{
      if(current){
        undoStack.push(current);
        if(undoStack.length>HISTORY_LIMIT)undoStack.shift();
      }
    }
    P=next;
    selection=null;
    activeScope='style';
    $('#projectName').value=P.name||'Untitled website';
    historyCurrent=serialized;
    historyLastControl='';
    historyLastAt=0;
    syncAllLinkHrefs();
    render();
    renderAssets();
    renderLibrary($('#componentSearch')?.value||'');
    inspect();
  }finally{
    historyRestoring=false;
    updateHistoryControls();
  }
}
function undo(){
  if(!undoStack.length)return;
  const state=undoStack.pop();
  restoreHistoryState(state,'undo');
  toast('Undone');
}
function redo(){
  if(!redoStack.length)return;
  const state=redoStack.pop();
  restoreHistoryState(state,'redo');
  toast('Redone');
}

function slugify(value){
  const raw=String(value||'').trim().toLowerCase();
  if(raw==='/'||raw==='home')return '/';
  const clean=raw.replace(/^\/+/,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  return '/'+(clean||'page');
}
function uniqueSlug(base,excludeId=null){
  let slug=slugify(base),stem=slug==='/'?'/page':slug,i=2;
  const used=()=>P.pages.some(p=>p.id!==excludeId&&p.slug===slug);
  while(used()){slug=stem+'-'+i++}
  return slug;
}
function regenerateNodeIds(items,map=null){
  for(const n of items||[]){
    const oldId=n.id;
    n.id=uid(n.type==='group'?'group':'el');
    if(map&&oldId)map.set(oldId,n.id);
    regenerateNodeIds(n.children,map);
  }
}
function clonePage(page){
  const cp=clone(page);
  const oldPageId=page.id,sectionMap=new Map(),nodeMap=new Map();
  cp.id=uid('page');
  cp.name=page.name+' Copy';
  cp.slug=uniqueSlug(page.slug==='/'?'/home-copy':page.slug+'-copy');
  for(const s of cp.sections){
    const oldSectionId=s.id;
    s.id=uid('section');
    if(oldSectionId)sectionMap.set(oldSectionId,s.id);
    if(s.anchor)s.anchor=s.anchor+'-copy';
    regenerateNodeIds(s.elements,nodeMap);
  }
  for(const s of cp.sections)walk(s.elements,n=>{
    if(n.linkType==='page'&&n.linkPageId===oldPageId)n.linkPageId=cp.id;
    if(n.linkType==='section'&&sectionMap.has(n.linkSectionId))n.linkSectionId=sectionMap.get(n.linkSectionId);
  });
  return cp;
}
function switchPage(pageId){
  if(!P.pages.some(p=>p.id===pageId))return;
  P.activePageId=pageId;
  selection=null;activeScope='style';
  render();inspect();
}
function pageEditorDialog(page,{isNew=false}={}){
  const d=showDialog(isNew?'Add page':'Page settings');
  let name=page.name||'Untitled page',slug=page.slug||slugify(name);
  let autoSlug=isNew||(slug!=='/'&&slug===slugify(name));

  const nameField=field(d,'Page name',name,'text',v=>{name=v});
  const nameInput=nameField.querySelector('input');
  nameInput.oninput=()=>{
    name=nameInput.value;
    if(autoSlug){
      slug=slugify(name);
      slugInput.value=slug==='/'?'':slug.replace(/^\/+/,'');
    }
  };

  const slugField=document.createElement('div');
  slugField.className='field';
  const slugHead=document.createElement('div');
  slugHead.className='field-head';
  const slugLabel=document.createElement('label');
  slugLabel.textContent='URL';
  slugHead.append(slugLabel);
  const slugControl=document.createElement('div');
  slugControl.className='slug-control';
  const prefix=document.createElement('span');
  prefix.className='slug-prefix';
  prefix.textContent='/';
  const slugInput=document.createElement('input');
  slugInput.type='text';
  slugInput.value=slug==='/'?'':slug.replace(/^\/+/,'');
  slugInput.placeholder='page-name';
  slugInput.setAttribute('aria-label','Page URL');
  slugInput.oninput=()=>{
    autoSlug=false;
    slug='/'+slugInput.value.replace(/^\/+/,'');
  };
  slugControl.append(prefix,slugInput);
  slugField.append(slugHead,slugControl);
  d.append(slugField);

  const note=document.createElement('p');
  note.className='card-note';
  note.textContent='The URL is generated from the page name until you edit it. Home uses /.';
  d.append(note);

  const a=document.createElement('div');a.className='actions';d.append(a);
  action(a,'Cancel',closeDialog);
  action(a,isNew?'Add page':'Save',()=>{
    name=name.trim()||'Untitled page';
    const typed=slugInput.value.trim();
    const requested=autoSlug?slugify(name):(typed?'/'+typed:name);
    slug=uniqueSlug(requested,isNew?null:page.id);
    if(isNew){
      const created=makePage(name,slug);P.pages.push(created);P.activePageId=created.id;
      selection=null;activeScope='style';closeDialog();syncAllLinkHrefs();render();inspect();toast(name+' added');
    }else{
      page.name=name;page.slug=slug;closeDialog();syncAllLinkHrefs();render();inspect();toast('Page updated');
    }
  },'primary');
}
function deletePage(page){
  if(P.pages.length===1){toast('A project must keep at least one page');return}
  const d=showDialog('Delete '+page.name+'?',`<p>This removes the page and all of its Sections.</p>`);
  action(d,'Cancel',closeDialog);
  action(d,'Delete page',()=>{
    const idx=P.pages.indexOf(page);P.pages.splice(idx,1);
    if(P.activePageId===page.id)P.activePageId=P.pages[Math.min(idx,P.pages.length-1)].id;
    selection=null;activeScope='style';closeDialog();render();inspect();toast('Page deleted');
  },'danger');
}
function duplicatePage(page){
  const cp=clonePage(page);const idx=P.pages.indexOf(page);
  P.pages.splice(idx+1,0,cp);P.activePageId=cp.id;
  selection=null;activeScope='style';render();inspect();toast(cp.name+' created');
}
function renderPages(){
  const root=$('#pagesList');if(!root)return;
  root.replaceChildren();$('#pageCount').textContent=P.pages.length+' '+(P.pages.length===1?'page':'pages');
  const current=activePage();
  $('#activePageName').textContent=current.name;$('#activePageSlug').textContent=current.slug;
  for(const page of P.pages){
    const row=document.createElement('div');row.className='page-list-item'+(page.id===P.activePageId?' active':'');
    const main=document.createElement('button');main.className='page-list-main';main.onclick=()=>switchPage(page.id);
    main.innerHTML=`<span class="page-icon">▱</span><span><b>${esc(page.name)}</b><small>${esc(page.slug)}</small></span>`;
    const menu=document.createElement('details');menu.className='page-actions';
    const summary=document.createElement('summary');summary.textContent='•••';summary.title='Page actions';menu.append(summary);
    const box=document.createElement('div');box.className='page-actions-menu';
    action(box,'Rename / path',()=>{menu.open=false;pageEditorDialog(page)});
    action(box,'Duplicate',()=>{menu.open=false;duplicatePage(page)});
    action(box,'Delete',()=>{menu.open=false;deletePage(page)},'danger');
    menu.append(box);row.append(main,menu);root.append(row);
  }
}

function walk(items,fn){for(const n of items||[]){fn(n);walk(n.children,fn)}}
function find(id){let result;for(const s of renderedSections()){if(s.id===id)return s;walk(s.elements,n=>{if(n.id===id)result=n})}return result}
function pathTo(id){function dive(nodes,path){for(const n of nodes||[]){if(n.id===id)return [...path,n];const r=dive(n.children,[...path,n]);if(r)return r}}for(const s of renderedSections()){if(s.id===id)return[s];const p=dive(s.elements,[s]);if(p)return p}return[]}

function parentInfo(id){
  for(const s of renderedSections()){
    if(s.id===id)return isSharedSection(s)
      ?{parent:null,array:null,index:-1,section:s,shared:true}
      :{parent:null,array:currentSections(),index:currentSections().indexOf(s),section:s,shared:false};
    function dive(arr,parent){
      for(let i=0;i<(arr||[]).length;i++){
        const n=arr[i];
        if(n.id===id)return{parent,array:arr,index:i,section:s};
        const hit=dive(n.children,n);
        if(hit)return hit;
      }
    }
    const hit=dive(s.elements,s);
    if(hit)return hit;
  }
  return null;
}
function canReorderElement(id){
  const info=parentInfo(id), n=find(id);
  return !!(n&&n.type!=='group'&&info?.parent?.type==='group');
}

function canReorderContainer(id){
  const info=parentInfo(id),n=find(id);
  return !!(n&&n.type==='group'&&!n.isSectionRoot&&info?.parent?.type==='group');
}

function isSection(n){return renderedSections().includes(n)}
function label(n){return n.name||({heroLayout:'Hero columns',aboutLayout:'About columns',contentGroup:'Content',displayCtaWrap:'Display CTA content',navLayout:'Navigation',navLinks:'Navigation links',cards:'Service cards',card:'Service card',servicesWrap:'Services content',ctaLayout:'Call to action',footerLayout:'Footer layout',footerLinks:'Footer links',kicker:'Small heading',body:'Paragraph',visual:'Image',cta:'Button',brand:'Brand',navlink:'Navigation link'}[n.role])||n.role?.toUpperCase()||n.type}
function defaultText(n){return n.textStyleRole||(n.type==='heading'?n.role:n.role==='kicker'?'label':n.role==='small'?'small':n.role==='brand'?'brand':n.role==='lead'?'lead':n.role==='navlink'?'link':'body')}
function layout(){return{...P.design.layout,...(device!=='desktop'?P.design.responsive[device]:{})}}
function colour(v){if(v==='$background')v='$bg';return typeof v==='string'&&v.startsWith('$')?(P.design.colours[v.slice(1)]?.value||P.design.colours.text.value):v}
function named(v,kind){return typeof v==='string'&&v.startsWith('@')?P.design[kind][v.slice(1)]?.value:v}
const layoutKeys=['direction','justify','alignItems','width','basis','firstColumn','columns','wrap','stack','order','visible','gap','padding','background','radius','border','shadow','marginTop','marginRight','marginBottom','marginLeft','offsetX','offsetY','zIndex','overflow'];
function defaults(n){const l=layout();if(isSection(n)){const spacing=sectionSpacing(n,l);return{...sectionSemanticStyle(n),top:n.type==='navbar'?18:spacing.top,bottom:n.type==='navbar'?18:spacing.bottom,side:l.side,contentWidth:l.width,minHeight:0,vAlign:'top',radius:'@square',border:'@none',shadow:'@none',visible:true,bgFit:'cover',bgPos:'center',overlayColor:'$dark',overlayOpacity:.35,...(n.baseStyle||{})};}const b={...(n.baseStyle||{})};if(n.type==='group')return{direction:'column',gap:l.gap,justify:'start',alignItems:'stretch',width:100,firstColumn:50,columns:3,wrap:'nowrap',stack:'mobile',order:0,marginTop:0,marginRight:0,marginBottom:0,marginLeft:0,offsetX:0,offsetY:0,zIndex:0,padding:n.role==='card'?'@medium':0,background:'transparent',radius:n.role==='card'?l.cardRadius:'@square',border:'@none',shadow:'@none',overflow:'visible',visible:true,...nodeSemanticStyle(n),...b,...(['navLayout','navLinks','footerLinks'].includes(n.role)?{stack:'never',wrap:'wrap'}:{})};const type=n.style?.textStyle||defaultText(n),t=P.design.texts[type]||P.design.texts.body;let d={align:'left',...t,textStyle:type,...nodeSemanticStyle(n),maxWidth:0,marginTop:0,marginRight:0,marginBottom:0,marginLeft:0,visible:true,order:0,offsetX:0,offsetY:0,zIndex:0,fluidSize:false,fluidMin:32,fluidMax:180,fluidVw:10,whiteSpace:'normal',...b};if(n.type==='button'){const bs=n.style?.buttonStyle||n.buttonVariant||'main';const button=P.design.buttons[bs]||P.design.buttons.main;d={...d,...(P.design.texts[n.style?.textStyle||button.textStyle]||{}),...button,...nodeSemanticStyle(n),...b,buttonStyle:bs,buttonWidth:'auto'}}return d}
function sectionSpacingKind(n){
 if(n.type==='hero')return'hero';
 if(n.type==='cta'||n.type==='footer')return'compact';
 return'standard';
}
function sectionSpacing(n,l){
 const kind=sectionSpacingKind(n);
 if(kind==='standard')return{top:l.top,bottom:l.bottom};
 const mode=device==='desktop'?'desktop':device;
 const preset=P.design.sectionSpacing?.[kind]?.[mode];
 return preset?{top:preset.top,bottom:preset.bottom}:{top:l.top,bottom:l.bottom};
}
const OUTER_SPACING_KEYS=['marginTop','marginRight','marginBottom','marginLeft'];
const VISUAL_POSITION_KEYS=['offsetX','offsetY'];
function outerSpacingMode(n){return ['adaptive','preserve','custom'].includes(n.outerSpacingMode)?n.outerSpacingMode:'adaptive'}
function visualPositionMode(n){return ['adaptive','preserve','custom'].includes(n.visualPositionMode)?n.visualPositionMode:'adaptive'}
function desktopOuterSpacing(n,key){
 if(Object.hasOwn(n.style||{},key))return Number(n.style[key])||0;
 if(Object.hasOwn(n.baseStyle||{},key))return Number(n.baseStyle[key])||0;
 return 0;
}
function groupDirectionAtBreakpoint(groupNode,mode){
 if(!groupNode||groupNode.type!=='group')return'';
 const base=groupNode.baseStyle||{},desktop=groupNode.style||{},baseResp=mode==='desktop'?{}:(groupNode.baseResponsive?.[mode]||{}),resp=mode==='desktop'?{}:(groupNode.responsive?.[mode]||{});
 const merged={direction:'column',stack:'mobile',...base,...baseResp,...desktop,...resp};
 const stack=mode!=='desktop'&&((merged.stack==='tablet')||(merged.stack==='mobile'&&mode==='mobile'));
 return stack?'column':merged.direction;
}
function parentReflowsAtBreakpoint(n,mode){
 if(mode==='desktop')return false;
 let parent=parentInfo(n.id)?.parent;
 while(parent&&parent.type==='group'){
  const desktopDir=groupDirectionAtBreakpoint(parent,'desktop');
  const breakpointDir=groupDirectionAtBreakpoint(parent,mode);
  if(desktopDir!==breakpointDir&&breakpointDir==='column'&&(desktopDir==='row'||desktopDir==='grid'))return true;
  parent=parentInfo(parent.id)?.parent;
 }
 return false;
}
function adaptiveOuterSpacingValue(n,key,mode){
 const desktopValue=desktopOuterSpacing(n,key);
 if(desktopValue>=0||mode==='desktop')return desktopValue;
 if(parentReflowsAtBreakpoint(n,mode))return 0;
 if(mode==='tablet')return Math.round(desktopValue*.5);
 return 0;
}
function applyResponsiveOuterSpacing(n,st){
 if(device==='desktop')return st;
 const mode=outerSpacingMode(n),responsive=n.responsive?.[device]||{};
 for(const key of OUTER_SPACING_KEYS){
  if(Object.hasOwn(responsive,key))continue;
  const desktopValue=desktopOuterSpacing(n,key);
  if(desktopValue>=0)continue;
  if(mode==='adaptive')st[key]=adaptiveOuterSpacingValue(n,key,device);
  else st[key]=desktopValue;
 }
 return st;
}
function desktopVisualPosition(n,key){
 if(Object.hasOwn(n.style||{},key))return Number(n.style[key])||0;
 if(Object.hasOwn(n.baseStyle||{},key))return Number(n.baseStyle[key])||0;
 return 0;
}
function adaptiveVisualPositionValue(n,key,mode){
 const desktopValue=desktopVisualPosition(n,key);
 if(mode==='desktop'||desktopValue===0)return desktopValue;
 if(parentReflowsAtBreakpoint(n,mode))return 0;
 if(mode==='tablet')return Math.round(desktopValue*.5);
 return 0;
}
function applyResponsiveVisualPosition(n,st){
 if(device==='desktop')return st;
 const mode=visualPositionMode(n),responsive=n.responsive?.[device]||{},baseResponsive=n.baseResponsive?.[device]||{};
 for(const key of VISUAL_POSITION_KEYS){
  if(Object.hasOwn(responsive,key))continue;
  const desktopValue=desktopVisualPosition(n,key);
  if(mode==='adaptive'){
   if(Object.hasOwn(baseResponsive,key))continue;
   st[key]=adaptiveVisualPositionValue(n,key,device);
  }else if(mode==='preserve')st[key]=desktopValue;
 }
 return st;
}
function effective(n){let st={...defaults(n),...(device!=='desktop'?n.baseResponsive?.[device]:{}),...boundStyle(n),...n.style,...(device!=='desktop'?n.responsive?.[device]:{})};st=applyResponsiveOuterSpacing(n,st);return applyResponsiveVisualPosition(n,st)}
function prepareNode(n){n.baseStyle=n.baseStyle||clone(n.style||{});n.style=n.baseStyle===n.style?{}:(n.style||{});n.baseResponsive=n.baseResponsive||{};n.responsive=n.responsive||{};if(n.type==='group'){n.baseStyle=Object.fromEntries(Object.entries(n.baseStyle).filter(([k])=>layoutKeys.includes(k)));for(const mode of Object.keys(n.baseResponsive))n.baseResponsive[mode]=Object.fromEntries(Object.entries(n.baseResponsive[mode]||{}).filter(([k])=>layoutKeys.includes(k)));if(['heroLayout','aboutLayout','cards'].includes(n.role))n.baseStyle.stack='tablet';}n.children?.forEach(prepareNode);return n}
function makeSection(comp){const s=comp.create();normalizeNavbar(s);s.baseStyle=clone(s.baseStyle||{});s.baseResponsive=clone(s.baseResponsive||{});s.style={};s.responsive={};s.componentId=comp.meta?.stableId||comp.id||'';s.componentVersion=comp.meta?.version||1;s.componentCategory=comp.meta?.category||comp.category||comp.family||s.type;s.componentFamily=comp.family||s.type;s.componentVariant=comp.name;if(s.type==='blank')ensureBlankSectionRoot(s);walk(s.elements,n=>{n.baseStyle=clone(n.style);n.style={}});s.elements.forEach(prepareNode);applyStockDefaults(s);applyComponentMotion(s);connectComponentStyle(s);return s}


function makeBlankSectionRoot(existing=[]){
  const root=blankChildContainer('Root Container',{
    isSectionRoot:true,
    role:'sectionRoot',
    baseStyle:{
      direction:'column',
      gap:'@medium',
      justify:'start',
      alignItems:'stretch',
      width:100,
      stack:'never'
    }
  });
  root.children=[...(existing||[])];
  return root;
}
function ensureBlankSectionRoot(section){
  if(!section||section.type!=='blank')return section;
  section.elements=Array.isArray(section.elements)?section.elements:[];
  if(section.elements.length===1&&section.elements[0]?.type==='group'&&section.elements[0].isSectionRoot)return section;
  section.elements=[makeBlankSectionRoot(section.elements)];
  return section;
}
function makeBlankSection(){
  return{
    id:uid('sec'),
    type:'blank',
    name:'Blank Section',
    style:{},
    responsive:{},
    componentId:'blank-section',
    componentFamily:'blank',
    componentVariant:'Blank Section',
    elements:[makeBlankSectionRoot()]
  };
}

const CONTAINER_LAYOUTS=[
  {id:'stack',name:'Full Width Stack',description:'One full-width content slot',slots:1},
  {id:'split50',name:'2 Columns 50/50',description:'Two equal columns',slots:2},
  {id:'split6040',name:'2 Columns 60/40',description:'Wide left column',slots:2},
  {id:'split4060',name:'2 Columns 40/60',description:'Wide right column',slots:2},
  {id:'three',name:'3 Equal Columns',description:'Three equal columns',slots:3},
  {id:'full-split',name:'Full Width + 50/50',description:'Full-width row above two columns',slots:3},
  {id:'split-full',name:'50/50 + Full Width',description:'Two columns above a full-width row',slots:3},
  {id:'full-three',name:'Full Width + 3 Columns',description:'Full-width row above three columns',slots:4},
  {id:'left-right-stack',name:'Left + Right Stack',description:'Large left slot with two stacked slots on the right',slots:3}
];

const BUILDER_CONTAINERS=[
  {id:'container-blank',name:'Blank Container',description:'Empty editable Container',kind:'blank'},
  ...CONTAINER_LAYOUTS.map(layout=>({
    id:'container-'+layout.id,
    name:layout.name,
    description:layout.description,
    kind:layout.id
  }))
];

const BUILDER_ELEMENTS=[
  {id:'element-heading',name:'Heading',description:'Heading text',kind:'heading'},
  {id:'element-text',name:'Text',description:'Paragraph text',kind:'text'},
  {id:'element-button',name:'Button',description:'Call-to-action button',kind:'button'},
  {id:'element-image',name:'Image',description:'Image placeholder',kind:'image'}
];

function blankChildContainer(name='Container',extra={}){
  return{
    id:uid('group'),
    type:'group',
    role:'contentGroup',
    name,
    baseStyle:{direction:'column',justify:'start',alignItems:'stretch',width:100,stack:'mobile'},
    style:{},
    responsive:{},
    children:[],
    ...extra
  };
}

function layoutSlot(name){
  return blankChildContainer(name,{isLayoutSlot:true});
}
function layoutScaffold(name,baseStyle,children=[]){
  return{
    id:uid('group'),
    type:'group',
    role:'layoutScaffold',
    name,
    isLayoutScaffold:true,
    baseStyle,
    style:{},
    responsive:{},
    children
  };
}

function buildLayoutStructure(kind){
  const slot=(name)=>layoutSlot(name);
  const row=(name,children,firstColumn=50)=>layoutScaffold(name,{
    direction:'row',justify:'start',alignItems:'stretch',width:100,stack:'tablet',firstColumn
  },children);
  const column=(name,children)=>layoutScaffold(name,{
    direction:'column',justify:'start',alignItems:'stretch',width:100,stack:'mobile'
  },children);

  if(kind==='split50')return row('50/50 Layout',[slot('Left'),slot('Right')],50);
  if(kind==='split6040')return row('60/40 Layout',[slot('Left 60%'),slot('Right 40%')],60);
  if(kind==='split4060')return row('40/60 Layout',[slot('Left 40%'),slot('Right 60%')],40);
  if(kind==='three')return layoutScaffold('3 Column Layout',{
    direction:'grid',columns:3,justify:'start',alignItems:'stretch',width:100,stack:'tablet'
  },[slot('Column 1'),slot('Column 2'),slot('Column 3')]);
  if(kind==='full-split')return column('Full + Split Layout',[
    slot('Full Width Top'),
    row('Bottom Row',[slot('Bottom Left'),slot('Bottom Right')],50)
  ]);
  if(kind==='split-full')return column('Split + Full Layout',[
    row('Top Row',[slot('Top Left'),slot('Top Right')],50),
    slot('Full Width Bottom')
  ]);
  if(kind==='full-three')return column('Full + 3 Layout',[
    slot('Full Width Top'),
    layoutScaffold('Bottom 3 Columns',{
      direction:'grid',columns:3,justify:'start',alignItems:'stretch',width:100,stack:'tablet'
    },[slot('Bottom 1'),slot('Bottom 2'),slot('Bottom 3')])
  ]);
  if(kind==='left-right-stack')return row('Left + Right Stack',[
    slot('Left'),
    column('Right Stack',[slot('Right Top'),slot('Right Bottom')])
  ],58);
  return slot('Full Width');
}

function stripLayoutFlags(node){
  if(!node||typeof node!=='object')return node;
  delete node.isLayoutScaffold;
  delete node.isLayoutSlot;
  delete node.builderLayout;
  if(node.layoutPreset&&!node.sourceLayoutPreset)node.sourceLayoutPreset=node.layoutPreset;
  delete node.layoutPreset;
  node.isCustomContainer=true;
  for(const child of node.children||[])stripLayoutFlags(child);
  return node;
}
function makeBuilderContainer(kind='blank'){
  if(kind==='blank')return blankChildContainer('Container',{isCustomContainer:true});
  const layout=CONTAINER_LAYOUTS.find(x=>x.id===kind)||CONTAINER_LAYOUTS[0];
  const root=stripLayoutFlags(buildLayoutStructure(layout.id));
  root.name=layout.name;
  root.sourceLayoutPreset=layout.id;
  root.isCustomContainer=true;
  return root;
}

function layoutContent(container){
  const out=[];
  function collect(nodes){
    for(const node of nodes||[]){
      if(node.isLayoutScaffold||node.isLayoutSlot)collect(node.children);
      else out.push(node);
    }
  }
  collect(container.children);
  return out;
}

function layoutSlots(container){
  const out=[];
  walk(container.children,node=>{if(node.isLayoutSlot)out.push(node)});
  return out;
}

function distributeLayoutContent(container,content){
  const slots=layoutSlots(container);
  if(!slots.length)return;
  for(const slot of slots)slot.children=[];
  content.forEach((node,index)=>{
    const slot=slots[Math.min(index,slots.length-1)];
    slot.children.push(node);
  });
}

function changeContainerLayout(container,kind){
  if(!container?.builderLayout)return;
  const layout=CONTAINER_LAYOUTS.find(x=>x.id===kind);
  if(!layout||layout.id===container.layoutPreset)return;
  const content=layoutContent(container);
  container.layoutPreset=layout.id;
  container.name=layout.name;
  container.children=[buildLayoutStructure(layout.id)];
  distributeLayoutContent(container,content);
  selection=container.id;
  render();inspect();
  toast('Layout changed to '+layout.name);
}

function makeBuilderElement(kind){
  if(kind==='heading')return{
    id:uid('el'),type:'heading',role:'h2',name:'Heading',
    text:'New heading',tag:'h2',baseStyle:{},style:{},responsive:{}
  };
  if(kind==='text')return{
    id:uid('el'),type:'text',role:'body',name:'Text',
    text:'Your text here.',baseStyle:{},style:{},responsive:{}
  };
  if(kind==='button')return{
    id:uid('el'),type:'button',role:'cta',name:'Button',
    text:'Learn more',href:'#',linkType:'url',linkValue:'#',
    baseStyle:{},style:{},responsive:{}
  };
  return{
    id:uid('el'),type:'image',role:'visual',name:'Image',
    src:'',alt:'',baseStyle:{frameMode:'fill',aspectRatio:'4 / 3'},style:{},responsive:{}
  };
}

function resolvedInsertionTarget(targetNode){
  if(!targetNode||(!isSection(targetNode)&&targetNode.type!=='group'))return null;
  if(isSection(targetNode)){
    if(targetNode.type==='blank')ensureBlankSectionRoot(targetNode);
    return targetNode.type==='blank'?(targetNode.elements?.[0]||null):targetNode;
  }
  return targetNode;
}
function builderInsertTarget(){return resolvedInsertionTarget(find(selection))}
function appendToBuilderTarget(targetNode,child){
  const targetNodeResolved=resolvedInsertionTarget(targetNode);
  if(!targetNodeResolved)return false;
  (isSection(targetNodeResolved)?targetNodeResolved.elements:targetNodeResolved.children).push(child);
  return true;
}

function addBuilderContainer(kind){
  const parent=builderInsertTarget();
  if(!parent){
    toast('Select a Section or Container first');
    return;
  }
  const node=makeBuilderContainer(kind);
  if(!appendToBuilderTarget(parent,node)){toast('Choose a content Container first');return}
  select(node.id);
  toast(label(node)+' added');
}

function addBuilderElement(kind){
  const parent=builderInsertTarget();
  if(!parent){
    toast('Select a Section or Container first');
    return;
  }
  const node=makeBuilderElement(kind);
  if(!appendToBuilderTarget(parent,node)){toast('Choose a content Container first');return}
  select(node.id);
  toast(label(node)+' added');
}

function addBlankSection(){
  const section=makeBlankSection();
  currentSections().push(section);
  select(section.id);
  toast('Blank Section added');
}


function normalizeNavbar(section,{legacy=false}={}){
  if(!section||section.type!=='navbar')return section;
  if(!['normal','sticky','smart','overlay'].includes(section.navMode))section.navMode=legacy?'normal':'sticky';
  if(typeof section.navTransparent!=='boolean')section.navTransparent=false;
  if(!['full','hamburger'].includes(section.mobileMenu))section.mobileMenu='hamburger';
  if(!section.navTopColor)section.navTopColor='$onDark';
  if(!section.navScrolledBackground)section.navScrolledBackground='$bg';
  if(!section.navScrolledColor)section.navScrolledColor='$text';
  if(!['hero','sticky'].includes(section.smartInitial))section.smartInitial='hero';
  return section;
}
function navbarPlacement(section){
  return section?.type==='navbar'&&['normal','sticky','smart','overlay'].includes(section.navMode)?section.navMode:'normal';
}
const navbarSmartActivated=new Set();
function addNavbarControls(parent,n){
  field(parent,'Placement',navbarPlacement(n),'select',v=>{n.navMode=v;navbarSmartActivated.delete(n.id);render();inspect()},{
    choices:[['sticky','Sticky'],['smart','Smart Sticky'],['overlay','Overlay'],['normal','Normal']]
  });
  if(navbarPlacement(n)==='smart'){
    field(parent,'Initial downward scroll',n.smartInitial||'hero','select',v=>{n.smartInitial=v;navbarSmartActivated.delete(n.id);render();inspect()},{
      choices:[['hero','Scroll away with Hero'],['sticky','Stick immediately']]
    });
  }
  field(parent,'Transparent over first section',!!n.navTransparent,'checkbox',v=>{n.navTransparent=v;render();inspect()});
  if(n.navTransparent){
    paletteField(parent,'Top text colour',n.navTopColor||'$onDark',v=>{n.navTopColor=v;render();inspect()});
    if(['sticky','smart'].includes(navbarPlacement(n))){
      paletteField(parent,'Scrolled background',n.navScrolledBackground||'$bg',v=>{n.navScrolledBackground=v;render();inspect()});
      paletteField(parent,'Scrolled text colour',n.navScrolledColor||'$text',v=>{n.navScrolledColor=v;render();inspect()});
    }
  }
  field(parent,'Mobile navigation',n.mobileMenu||'hamburger','select',v=>{n.mobileMenu=v;render();inspect()},{
    choices:[['hamburger','Hamburger menu'],['full','Full navigation']]
  });
}
let navbarLastScrollTop=0;
let navbarScrollDirection='up';
let editorNavbarOverlay=null;

function clearEditorNavbarOverlay(){
  if(editorNavbarOverlay){
    editorNavbarOverlay.remove();
    editorNavbarOverlay=null;
  }
}

function syncEditorNavbarOverlay(source,{hidden=false}={}){
  if(previewMode||!source){
    clearEditorNavbarOverlay();
    return;
  }

  const surface=$('#pageEditorSurface'),shell=$('#stageShell');
  if(!surface||!shell||surface.hidden){
    clearEditorNavbarOverlay();
    return;
  }

  const surfaceRect=surface.getBoundingClientRect();
  const shellRect=shell.getBoundingClientRect();
  const sourceRect=source.getBoundingClientRect();
  if(!shellRect.width||!sourceRect.height){
    clearEditorNavbarOverlay();
    return;
  }

  if(!editorNavbarOverlay){
    editorNavbarOverlay=document.createElement('div');
    editorNavbarOverlay.id='editorNavbarOverlay';
    surface.append(editorNavbarOverlay);
  }

  const overlay=editorNavbarOverlay;
  overlay.replaceChildren();

  const frame=document.createElement('div');
  frame.className='editor-navbar-overlay-frame';

  const cloneEl=source.cloneNode(true);
  cloneEl.removeAttribute('id');
  cloneEl.classList.remove('selected','navbar-hidden','navbar-smart-initial');
  cloneEl.querySelectorAll('.section-name').forEach(x=>x.remove());

  // The overlay lives outside the transformed stage. Keep the Navbar rendered
  // at the logical page width, then scale only the visual clone to exactly the
  // same size as the page canvas.
  cloneEl.style.position='relative';
  cloneEl.style.top='auto';
  cloneEl.style.left='auto';
  cloneEl.style.right='auto';
  cloneEl.style.margin='0';
  cloneEl.style.marginBottom='0';
  cloneEl.style.width=logicalViewportWidth()+'px';
  cloneEl.style.transformOrigin='top left';
  cloneEl.style.transform=`scale(${Math.max(editorScale||1,.01)})`;
  cloneEl.style.pointerEvents='none';

  frame.style.width=shellRect.width+'px';
  frame.style.height=sourceRect.height+'px';
  frame.append(cloneEl);

  overlay.append(frame);
  overlay.style.left=(shellRect.left-surfaceRect.left)+'px';
  overlay.style.width=shellRect.width+'px';
  overlay.style.height=sourceRect.height+'px';
  overlay.classList.toggle('editor-navbar-overlay-hidden',!!hidden);
}

function syncNavbarScrollState(viewport=$('#scroll')){
  if(!viewport)return;
  const padTop=parseFloat(getComputedStyle(viewport).paddingTop)||0;
  const y=viewport.scrollTop;
  const scrolled=y>8;
  if(!scrolled){navbarSmartActivated.clear();navbarLastScrollTop=y;}

  let overlaySource=null;
  let overlayHidden=false;

  document.querySelectorAll('#canvas .navbar-section').forEach(el=>{
    const mode=el.dataset.navMode||'normal';
    const sectionId=el.dataset.navSectionId||'';
    const transparent=el.dataset.navTransparent==='true';
    const smartInitial=el.dataset.smartInitial||'hero';
    const h=el.getBoundingClientRect().height||el.offsetHeight||0;
    const logicalH=previewMode?h:h/Math.max(editorScale||1,.01);
    const smartActivated=mode==='smart'&&(smartInitial==='sticky'||navbarSmartActivated.has(sectionId));
    const stickyActive=mode==='sticky'||(mode==='smart'&&smartActivated);

    if(previewMode){
      // Full-browser Preview is an ordinary untransformed page. Native sticky
      // is the correct model here and matches eventual production output.
      if(stickyActive){
        el.style.position='sticky';
        el.style.top=(-padTop)+'px';
      }else if(mode==='smart'){
        el.style.position='relative';
        el.style.top='auto';
      }
    }else{
      // Page View is a transformed logical canvas. Never try to pin the real
      // Navbar inside it. Leave the source in document flow and pin a visual
      // copy to the untransformed editor surface instead.
      if(mode==='sticky'||mode==='smart'){
        el.style.position='relative';
        el.style.top='auto';
      }
    }

    if(mode==='sticky'||mode==='smart')el.style.marginBottom=transparent?(-logicalH)+'px':'';
    else el.style.marginBottom='';

    const useScrolledAppearance=transparent&&scrolled&&(mode==='sticky'||(mode==='smart'&&smartActivated));
    el.classList.toggle('navbar-scrolled',useScrolledAppearance);
    el.classList.toggle('navbar-smart-initial',mode==='smart'&&smartInitial==='hero'&&!smartActivated);

    const hideSmart=mode==='smart'&&smartActivated&&scrolled&&y>Math.max(48,h*.65)&&navbarScrollDirection==='down';
    el.classList.toggle('navbar-hidden',previewMode&&hideSmart);

    if(!previewMode&&stickyActive&&scrolled&&!overlaySource){
      overlaySource=el;
      overlayHidden=hideSmart;
    }
  });

  if(previewMode){
    clearEditorNavbarOverlay();
  }else if(overlaySource){
    syncEditorNavbarOverlay(overlaySource,{hidden:overlayHidden});
  }else{
    clearEditorNavbarOverlay();
  }
}
function handleNavbarScroll(viewport=$('#scroll')){
  if(!viewport)return;
  const y=viewport.scrollTop,delta=y-navbarLastScrollTop;
  if(y<=8){navbarScrollDirection='up';navbarSmartActivated.clear();}
  else if(delta>3)navbarScrollDirection='down';
  else if(delta<-3){
    navbarScrollDirection='up';
    document.querySelectorAll('#canvas .navbar-smart[data-smart-initial="hero"]').forEach(el=>{
      if(el.dataset.navSectionId)navbarSmartActivated.add(el.dataset.navSectionId);
    });
  }
  navbarLastScrollTop=y;syncNavbarScrollState(viewport);
}
function enhanceMobileNavbar(section,wrap){
  if(section?.type!=='navbar'||device!=='mobile'||section.mobileMenu==='full')return;
  const navLayout=wrap.querySelector('.node[data-role="navLayout"]');
  if(!navLayout)return;
  const children=[...navLayout.children].filter(el=>el.classList.contains('node'));
  const brand=children.find(el=>el.dataset.role==='brand');
  const links=children.find(el=>el.dataset.role==='navLinks');
  const cta=children.find(el=>el.dataset.role==='cta');
  if(!links&&!cta)return;

  navLayout.classList.add('mobile-navbar-layout');
  navLayout.style.position='relative';
  navLayout.style.flexDirection='row';
  navLayout.style.alignItems='center';
  navLayout.style.justifyContent='space-between';
  navLayout.style.width='100%';

  const toggle=document.createElement('button');
  toggle.type='button';
  toggle.className='nav-hamburger-toggle';
  toggle.setAttribute('aria-label','Toggle navigation menu');
  toggle.setAttribute('aria-expanded','false');
  toggle.innerHTML='<span></span><span></span><span></span>';

  const panel=document.createElement('div');
  panel.className='nav-mobile-panel';
  panel.hidden=true;

  if(links){
    links.style.display='flex';
    links.style.flexDirection='column';
    links.style.alignItems='stretch';
    links.style.width='100%';
    links.style.gap='0';
    panel.append(links);
  }
  if(cta){
    cta.style.width='100%';
    cta.style.alignSelf='stretch';
    panel.append(cta);
  }

  toggle.addEventListener('pointerdown',ev=>ev.stopPropagation());
  toggle.addEventListener('click',ev=>{
    ev.preventDefault();
    ev.stopPropagation();
    panel.hidden=!panel.hidden;
    toggle.classList.toggle('open',!panel.hidden);
    toggle.setAttribute('aria-expanded',String(!panel.hidden));
  });

  if(brand)brand.after(toggle);
  else navLayout.prepend(toggle);
  navLayout.append(panel);
}
function componentFamilyOf(s){return s.componentFamily||s.type}
function variantsFor(s){const family=componentFamilyOf(s);return COMPONENTS.filter(c=>(c.family||c.category||'').toLowerCase()===String(family).toLowerCase()||(c.family||'')===family)}
function leaves(section){const out=[];walk(section.elements,n=>{if(n.type!=='group')out.push(n)});return out}
function swapSectionVariant(section,comp){
 if(!section||!comp)return;
 const oldLeaves=leaves(section), next=makeSection(comp), buckets={};
 for(const n of oldLeaves){const k=n.type+'|'+(n.role||'');(buckets[k]??=[]).push(n)}
 const seen={};
 walk(next.elements,n=>{if(n.type==='group')return;const k=n.type+'|'+(n.role||''),i=seen[k]||0,old=buckets[k]?.[i];seen[k]=i+1;if(!old)return;if(n.type==='image'){delete n.src;delete n.assetId}for(const key of ['assetId','text','href','linkType','linkPageId','linkSectionId','linkValue','src','alt','tag','disabled'])if(old[key]!==undefined)n[key]=clone(old[key]);n.style=clone(old.style||{});n.responsive=clone(old.responsive||{});});
 next.id=section.id;next.anchor=section.anchor;next.style=clone(section.style||{});next.responsive=clone(section.responsive||{});next.componentFamily=comp.family||next.type;next.componentId=comp.meta?.stableId||comp.id||'';next.componentVersion=comp.meta?.version||1;next.componentCategory=comp.meta?.category||comp.category||comp.family||next.type;next.componentVariant=comp.name;
 if(isSharedSection(section)){
   const kind=sharedSectionKind(section);
   next.siteShared=true;
   ensureSharedMap(P)[kind]=next;
 }else{
   const sections=currentSections(),i=sections.indexOf(section);
   if(i>=0)sections[i]=next;
 }
 selection=next.id;render();renderLibrary();inspect();toast(comp.name+' applied');
}
function componentPreview(comp){
 const cls=esc(comp.preview||'generic');
 const common='<i></i><i></i><i></i>';
 if(cls==='hero-split')return `<div class="component-thumb ${cls}"><span class="mini-copy">${common}<b></b></span><span class="mini-image"></span></div>`;
 if(cls==='hero-centred')return `<div class="component-thumb ${cls}"><span class="mini-copy">${common}<b></b></span><span class="mini-image"></span></div>`;
 if(cls==='hero-reverse')return `<div class="component-thumb ${cls}"><span class="mini-image"></span><span class="mini-copy">${common}<b></b></span></div>`;
 if(cls==='hero-editorial')return `<div class="component-thumb ${cls}"><span class="mini-copy">${common}<b></b></span><span class="mini-image"></span></div>`;
 if(cls==='hero-minimal')return `<div class="component-thumb ${cls}"><span class="mini-copy">${common}<b></b></span><span class="mini-image"></span></div>`;
 if(cls==='blank-section')return `<div class="component-thumb builder-thumb blank-section-thumb"><span></span></div>`;
 if(cls==='nav-clean')return `<div class="component-thumb ${cls}"><b></b><span></span><em></em></div>`;
 if(cls==='services-cards')return `<div class="component-thumb ${cls}"><i></i><span></span><span></span><span></span></div>`;
 if(cls==='about-split')return `<div class="component-thumb ${cls}"><span class="mini-image"></span><span class="mini-copy">${common}</span></div>`;
 if(cls==='cta-simple')return `<div class="component-thumb ${cls}"><i></i><b></b></div>`;
 if(cls==='footer-clean')return `<div class="component-thumb ${cls}"><b></b><span></span></div>`;
 if(cls==='timetable-grid')return `<div class="component-thumb ${cls}"><i></i><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>`;
 if(cls==='coaches-grid')return `<div class="component-thumb ${cls}"><i></i><span><b></b><em></em></span><span><b></b><em></em></span><span><b></b><em></em></span></div>`;
 if(cls==='academy-story')return `<div class="component-thumb ${cls}"><span class="mini-image"></span><span class="mini-copy">${common}<b></b></span></div>`;
 if(cls==='academy-gallery')return `<div class="component-thumb ${cls}"><i></i><span></span><span></span><span></span><span></span><span></span><span></span></div>`;
 if(cls==='coach-feature')return `<div class="component-thumb ${cls}"><span class="mini-image"></span><span class="mini-copy">${common}<b></b></span></div>`;
 if(cls==='trust-reviews')return `<div class="component-thumb ${cls}"><i></i><b></b><span></span><span></span></div>`;
 if(cls==='faq-accordion')return `<div class="component-thumb ${cls}"><i></i><span></span><span></span><span></span><span></span></div>`;
 if(cls==='display-cta')return `<div class="component-thumb ${cls}"><i></i><b></b><span></span></div>`;
 if(cls==='programs-image')return `<div class="component-thumb ${cls}"><i></i><span></span><span></span><span></span></div>`;
 if(cls==='location-split')return `<div class="component-thumb ${cls}"><span class="mini-copy">${common}<b></b></span><span class="mini-image"></span></div>`;
 return `<div class="component-thumb generic"></div>`;
}

function builderPreview(kind,type){
  if(type==='section')return '<div class="component-thumb builder-thumb blank-section-thumb"><span></span></div>';
  if(type==='container'){
    const slot='<span></span>';
    if(kind==='split50')return `<div class="component-thumb builder-thumb layout-thumb split50">${slot}${slot}</div>`;
    if(kind==='split6040')return `<div class="component-thumb builder-thumb layout-thumb split6040"><span class="wide"></span>${slot}</div>`;
    if(kind==='split4060')return `<div class="component-thumb builder-thumb layout-thumb split4060">${slot}<span class="wide"></span></div>`;
    if(kind==='three')return `<div class="component-thumb builder-thumb layout-thumb three">${slot}${slot}${slot}</div>`;
    if(kind==='full-split')return `<div class="component-thumb builder-thumb layout-thumb composite"><span class="full"></span><i>${slot}${slot}</i></div>`;
    if(kind==='split-full')return `<div class="component-thumb builder-thumb layout-thumb composite"><i>${slot}${slot}</i><span class="full"></span></div>`;
    if(kind==='full-three')return `<div class="component-thumb builder-thumb layout-thumb composite"><span class="full"></span><i class="three">${slot}${slot}${slot}</i></div>`;
    if(kind==='left-right-stack')return `<div class="component-thumb builder-thumb layout-thumb left-stack"><span class="wide"></span><i>${slot}${slot}</i></div>`;
    return `<div class="component-thumb builder-thumb layout-thumb stack"><span class="full"></span></div>`;
  }
  return `<div class="component-thumb builder-thumb element-thumb ${esc(kind)}"><span></span></div>`;
}
function builderLibraryCard(item,type,onAdd){
  const d=document.createElement('article');
  d.className='library-item visual-card builder-library-card';
  d.dataset.builderType=type;
  d.dataset.builderId=item.id;
  const draggable=type==='container';
  d.draggable=draggable;
  d.title=type==='section'?'Add a blank Section':draggable?'Drag into the page or click Add':'Adds to the selected Section or Container';
  if(draggable){
    d.addEventListener('dragstart',ev=>startBuilderContainerDrag(ev,item.kind));
    d.addEventListener('dragend',finishDrag);
  }
  d.innerHTML=`${builderPreview(item.kind||'blank',type)}<div class="component-card-meta"><div><b>${esc(item.name)}</b><small>${esc(item.description||'')}</small></div></div>`;
  const a=document.createElement('button');
  a.className='component-add';
  a.textContent='Add';
  a.onclick=onAdd;
  d.append(a);
  return d;
}

function appendBuilderBlock(root,title,items,type,onAdd){
  if(!items.length)return false;
  const block=document.createElement('section');
  block.className='component-category builder-category';
  const h=document.createElement('div');
  h.className='component-category-title';
  h.textContent=title;
  block.append(h);
  for(const item of items)block.append(builderLibraryCard(item,type,()=>onAdd(item)));
  root.append(block);
  return true;
}


function installSharedComponent(comp){
  const kind=sharedComponentKind(comp);
  if(!kind)return false;
  const shared=ensureSharedMap(P),existing=shared[kind];

  if(existing&&existing.componentId===comp.id){
    select(existing.id);
    toast((kind==='navbar'?'Navbar':'Footer')+' is already site-wide');
    return true;
  }

  const apply=()=>{
    const section=makeSection(comp);
    section.siteShared=true;
    if(existing){
      section.id=existing.id;
      section.anchor=existing.anchor;
    }
    shared[kind]=section;
    selection=section.id;
    activeScope='node';
    syncAllLinkHrefs();
    render();
    renderLibrary($('#componentSearch')?.value||'');
    inspect();
    toast((kind==='navbar'?'Navbar':'Footer')+' applied site-wide');
  };

  if(existing){
    const d=showDialog('Replace site-wide '+(kind==='navbar'?'Navbar':'Footer')+'?',`<p>This replaces the shared ${kind==='navbar'?'Navbar':'Footer'} on every page. The Section ID is preserved so Section links remain valid.</p>`);
    action(d,'Cancel',closeDialog);
    action(d,'Replace',()=>{closeDialog();apply()},'primary');
  }else apply();
  return true;
}

let libraryOpenRoot='Sections';
let libraryOpenCategory='Heroes';

function libraryDisclosure(title,cls='',open=false){
  const d=document.createElement('details');
  d.className=('library-disclosure '+cls).trim();
  d.open=open;
  const s=document.createElement('summary');
  s.textContent=title;
  d.append(s);
  return d;
}
function enforceLibraryAccordion(parent,current){
  for(const sibling of parent.querySelectorAll(':scope > details.library-category'))if(sibling!==current)sibling.open=false;
}
function componentCard(comp){
  const d=document.createElement('article');
  d.className='library-item visual-card';
  const sharedKind=sharedComponentKind(comp);
  const canDrag=comp.id!=='blank-section'&&!sharedKind;
  d.draggable=canDrag;
  d.dataset.componentId=comp.id;d.dataset.componentVersion=String(comp.meta?.version||1);d.dataset.verificationStatus=comp.meta?.verificationStatus||'';
  d.title=sharedKind?'Site-wide Section — click Add or Select':(canDrag?'Drag onto the page or click Add':'Click Add to create a blank Section');
  if(canDrag){
    d.addEventListener('dragstart',ev=>startComponentDrag(ev,comp));
    d.addEventListener('dragend',finishDrag);
  }
  d.innerHTML=`${componentPreview(comp)}<div class="component-card-meta"><div><b>${esc(comp.name)}</b><small>${esc(comp.description||comp.category)}</small></div></div>`;
  const a=document.createElement('button');
  a.className='component-add';
  const existingShared=sharedKind?ensureSharedMap(P)[sharedKind]:null;
  a.textContent=existingShared&&existingShared.componentId===comp.id?'Select':existingShared?'Replace':'Add';
  a.draggable=false;
  a.addEventListener('mousedown',ev=>ev.stopPropagation());
  a.onclick=()=>{
    if(sharedKind){installSharedComponent(comp);return}
    const s=makeSection(comp);
    currentSections().push(s);
    select(s.id);
    renderLibrary($('#componentSearch')?.value||'');
  };
  d.append(a);
  return d;
}
function renderLibrary(filter=''){
  const root=$('#library');if(!root)return;
  root.replaceChildren();
  const q=filter.trim().toLowerCase();
  const matches=item=>{if(!q)return true;const meta=item.meta||{};const hay=[item.name,item.category,item.description,...(meta.visualFamilies||[]),...(meta.useCases||[]),...(meta.tags||[])].filter(Boolean).join(' ').toLowerCase();return hay.includes(q)};
  let shown=false;

  const comps=COMPONENTS.filter(matches);
  if(comps.length){
    const sectionsRoot=libraryDisclosure('Sections','library-root',q?true:libraryOpenRoot==='Sections');
    const body=document.createElement('div');body.className='library-root-body';
    sectionsRoot.append(body);
    sectionsRoot.addEventListener('toggle',()=>{
      if(sectionsRoot.open){libraryOpenRoot='Sections';}
    });

    const blankSections=comps.filter(c=>c.id==='blank-section');
    if(blankSections.length){
      const details=libraryDisclosure('Blank','library-category',q?true:libraryOpenCategory==='Blank');
      const content=document.createElement('div');content.className='library-category-body';
      for(const comp of blankSections)content.append(componentCard(comp));
      details.append(content);
      details.addEventListener('toggle',()=>{
        if(!details.open)return;
        libraryOpenCategory='Blank';
        libraryOpenRoot='Sections';
        if(!q)enforceLibraryAccordion(body,details);
      });
      body.append(details);
    }

    const cats=[...new Set(comps.filter(c=>c.id!=='blank-section').map(c=>c.category))];
    for(const cat of cats){
      const items=comps.filter(c=>c.category===cat);
      const details=libraryDisclosure(cat,'library-category',q?true:libraryOpenCategory===cat);
      const content=document.createElement('div');content.className='library-category-body';
      for(const comp of items)content.append(componentCard(comp));
      details.append(content);
      details.addEventListener('toggle',()=>{
        if(!details.open)return;
        libraryOpenCategory=cat;
        libraryOpenRoot='Sections';
        if(!q)enforceLibraryAccordion(body,details);
      });
      body.append(details);
    }
    root.append(sectionsRoot);
    shown=true;
  }

  const containers=BUILDER_CONTAINERS.filter(matches);
  const elements=BUILDER_ELEMENTS.filter(matches);
  if(containers.length||elements.length){
    const buildRoot=libraryDisclosure('Build','library-root',q?true:libraryOpenRoot==='Build');
    const body=document.createElement('div');body.className='library-root-body';
    buildRoot.append(body);
    buildRoot.addEventListener('toggle',()=>{if(buildRoot.open)libraryOpenRoot='Build'});

    const addBuilderCategory=(title,items,type,onAdd)=>{
      if(!items.length)return;
      const details=libraryDisclosure(title,'library-category',q?true:libraryOpenCategory===title);
      const content=document.createElement('div');content.className='library-category-body';
      for(const item of items)content.append(builderLibraryCard(item,type,()=>onAdd(item)));
      details.append(content);
      details.addEventListener('toggle',()=>{
        if(!details.open)return;
        libraryOpenCategory=title;
        libraryOpenRoot='Build';
        if(!q)enforceLibraryAccordion(body,details);
      });
      body.append(details);
    };
    addBuilderCategory('Containers',containers,'container',item=>addBuilderContainer(item.kind));
    addBuilderCategory('Elements',elements,'element',item=>addBuilderElement(item.kind));
    root.append(buildRoot);
    shown=true;
  }

  if(!shown)root.innerHTML='<p class="library-empty">No matching components.</p>';
}

function migrateImageFrames(project){
  for(const {section} of projectSectionEntries(project)){
    function scan(nodes,parent=null){
      for(const node of nodes||[]){
        if(node?.type==='image'){
          node.baseStyle=node.baseStyle||{};
          if(!Object.hasOwn(node.baseStyle,'frameMode')&&!Object.hasOwn(node.style||{},'frameMode')){
            const legacy=node.heightMode||(parent?.isLayoutSlot?'fill':'fixed');
            node.baseStyle.frameMode=['fill','fixed','ratio'].includes(legacy)?legacy:'fixed';
          }
          if(!Object.hasOwn(node.baseStyle,'aspectRatio')&&!Object.hasOwn(node.style||{},'aspectRatio'))node.baseStyle.aspectRatio='4 / 3';
          delete node.heightMode;
          delete node.frameMode;
        }
        scan(node?.children,node);
      }
    }
    scan(section.elements,null);
  }
}

function migrateLegacyContainerGaps(project,sourceVersion=''){
  if(/^6 beta2\.7(?:\.|$)/.test(String(sourceVersion||'')))return;
  const rules={
    'nav-01':{navLayout:24,navLinks:22},
    'hero-01':{heroLayout:48,contentGroup:18},
    'hero-02':{heroLayout:34,contentGroup:16},
    'hero-03':{heroLayout:56,contentGroup:18},
    'hero-04':{heroLayout:28,contentGroup:20},
    'hero-05':{heroLayout:28,contentGroup:18},
    'about-01':{aboutLayout:48,contentGroup:18},
    'services-01':{servicesWrap:34,contentGroup:14,cards:20,card:10},
    'cta-01':{ctaLayout:30,contentGroup:10},
    'footer-01':{footerLayout:30,contentGroup:8,footerLinks:20}
  };
  for(const {section} of projectSectionEntries(project)){
    const map=rules[section.componentId];
    if(!map)continue;
    walk(section.elements,node=>{
      if(node.type!=='group'||map[node.role]===undefined)return;
      node.baseStyle=node.baseStyle||{};
      const responsiveHasGap=Object.values(node.responsive||{}).some(st=>Object.hasOwn(st||{},'gap'));
      if(!Object.hasOwn(node.baseStyle,'gap')&&!Object.hasOwn(node.style||{},'gap')&&!responsiveHasGap)node.baseStyle.gap=map[node.role];
    });
  }
}
function migrateBuilderLayouts(project,sourceVersion){
  if(!['6 beta2.3a','6 beta2.3a.1','6 beta2.3b'].includes(sourceVersion))return;
  const nameMap={
    'Blank Container':'stack',
    'Vertical Stack':'stack',
    '2 Columns 50/50':'split50',
    '2 Columns 60/40':'split6040',
    '2 Columns 40/60':'split4060',
    '3 Columns':'three',
    '3 Equal Columns':'three',
    'Centred Content':'stack'
  };
  for(const {section} of projectSectionEntries(project))walk(section.elements,node=>{
    if(node.type!=='group'||node.builderLayout||node.isLayoutSlot||node.isLayoutScaffold)return;
    const kind=nameMap[node.name];
    if(!kind)return;
    const content=[];
    function collect(children){
      for(const child of children||[]){
        const looksLikeOldColumn=child.type==='group'&&/^Column \d+$/.test(child.name||'');
        if(looksLikeOldColumn)collect(child.children);
        else content.push(child);
      }
    }
    collect(node.children);
    node.builderLayout=true;
    node.layoutPreset=kind;
    node.children=[buildLayoutStructure(kind)];
    distributeLayoutContent(node,content);
  });
}
function normalizeBuilderLayouts(project){
  let customised=0;

  function stripStockFlags(node){
    if(!node||typeof node!=='object')return;
    delete node.isLayoutScaffold;
    delete node.isLayoutSlot;
    for(const child of node.children||[])stripStockFlags(child);
  }

  function demoteToCustom(node){
    if(!node||node.type!=='group')return;
    if(node.layoutPreset&&!node.sourceLayoutPreset)node.sourceLayoutPreset=node.layoutPreset;
    delete node.builderLayout;
    delete node.layoutPreset;
    stripStockFlags(node);
    customised++;
  }

  function scan(children){
    for(const node of children||[]){
      if(!node||node.type!=='group')continue;

      if(node.builderLayout){
        const layout=CONTAINER_LAYOUTS.find(x=>x.id===node.layoutPreset);
        let matchesPreset=false;

        if(layout){
          try{
            validateBuilderLayoutRoot(node);
            matchesPreset=true;
          }catch{}
        }

        if(!matchesPreset)demoteToCustom(node);
      }

      scan(node.children);
    }
  }

  for(const {section} of projectSectionEntries(project))scan(section.elements);

  return{customised};
}
function validateProjectShell(p){
  if(!p||typeof p!=='object')throw Error('This is not a Runa project.');
  if(p.pages!==undefined&&!Array.isArray(p.pages))throw Error('Project pages must be an array.');
  if(p.sharedSections!==undefined&&(!p.sharedSections||typeof p.sharedSections!=='object'||Array.isArray(p.sharedSections)))throw Error('Shared Sections must be an object.');
  if(p.sharedSections&&p.sharedSections.navbar!==undefined&&p.sharedSections.navbar!==null&&!Array.isArray(p.sharedSections.navbar.elements))throw Error('Shared Navbar elements must be an array.');
  if(p.sharedSections&&p.sharedSections.footer!==undefined&&p.sharedSections.footer!==null&&!Array.isArray(p.sharedSections.footer.elements))throw Error('Shared Footer elements must be an array.');
  if(Array.isArray(p.pages)){
    for(const page of p.pages){
      if(!page||typeof page!=='object')throw Error('Invalid page data.');
      if(page.sections!==undefined&&!Array.isArray(page.sections))throw Error('Page sections must be an array.');
      for(const section of page.sections||[]){
        if(!section||typeof section!=='object')throw Error('Invalid Section data.');
        if(section.elements!==undefined&&!Array.isArray(section.elements))throw Error('Section elements must be an array.');
      }
    }
  }
  return p;
}

function sharedSectionFingerprint(section){
  const cp=clone(section);
  function scrub(value){
    if(Array.isArray(value)){value.forEach(scrub);return}
    if(!value||typeof value!=='object')return;
    for(const key of Object.keys(value)){
      if(['id','href','linkPageId','linkSectionId','siteShared','pageScopedLegacy'].includes(key)){delete value[key];continue}
      scrub(value[key]);
    }
  }
  scrub(cp);
  delete cp.anchor;
  return JSON.stringify(cp);
}
function migrateSharedSections(project){
  const shared=ensureSharedMap(project);
  const active=project.pages.find(p=>p.id===project.activePageId);
  const ordered=[active,...project.pages.filter(p=>p!==active)].filter(Boolean);

  for(const kind of ['navbar','footer']){
    let canonical=shared[kind];
    if(canonical&&canonical.type!==kind)canonical=null;

    if(!canonical){
      for(const page of ordered){
        const hit=(page.sections||[]).find(s=>s?.type===kind&&!s.pageScopedLegacy);
        if(hit){canonical=hit;break}
      }
      shared[kind]=canonical||null;
    }

    if(canonical){
      canonical.siteShared=true;
      const fingerprint=sharedSectionFingerprint(canonical);
      for(const page of project.pages){
        page.sections=(page.sections||[]).filter(section=>{
          if(section===canonical)return false;
          if(section?.type!==kind||section.pageScopedLegacy)return true;
          if(sharedSectionFingerprint(section)===fingerprint)return false;
          section.pageScopedLegacy=true;
          section.name=section.name||('Legacy Page '+(kind==='navbar'?'Navbar':'Footer'));
          return true;
        });
      }
    }
  }
  return shared;
}
function migrateDesktopWidthDefaults(project,sourceVersion=''){
  const lay=project?.design?.layout,res=project?.design?.responsive;
  if(!lay||!res)return;

  // 2.6.3 incorrectly tightened vertical spacing. If a project still has
  // those exact temporary defaults, restore the original vertical rhythm.
  if(lay.top===48&&lay.bottom===48){
    lay.top=68;
    lay.bottom=68;
  }
  if(res.tablet?.top===40&&res.tablet?.bottom===40){
    res.tablet.top=48;
    res.tablet.bottom=48;
  }
  if(res.mobile?.top===28&&res.mobile?.bottom===28){
    res.mobile.top=36;
    res.mobile.bottom=36;
  }

  // The real desktop issue was the old 1100px content cap.
  // Only migrate the untouched historical default; custom widths remain.
  if(lay.width===1100)lay.width=1320;
}

function ensureSectionSpacingDesign(project){
 const d=project.design;
 d.sectionSpacing=d.sectionSpacing||{};
 const fallback={
   hero:{desktop:{top:80,bottom:80},tablet:{top:64,bottom:64},mobile:{top:48,bottom:48}},
   compact:{desktop:{top:48,bottom:48},tablet:{top:40,bottom:40},mobile:{top:32,bottom:32}}
 };
 for(const kind of Object.keys(fallback)){
   d.sectionSpacing[kind]=d.sectionSpacing[kind]||{};
   for(const mode of ['desktop','tablet','mobile'])d.sectionSpacing[kind][mode]={...fallback[kind][mode],...(d.sectionSpacing[kind][mode]||{})};
 }
}
function migrateLayoutCalibration(project,sourceVersion=''){
 const d=project.design;if(!d)return;
 ensureSectionSpacingDesign(project);
 if(/^6 beta2\.8(?:\.|$)/.test(String(sourceVersion||'')))return;
 const lay=d.layout||{};
 const res=d.responsive||(d.responsive={tablet:{},mobile:{}});
 res.tablet=res.tablet||{};res.mobile=res.mobile||{};
 if(lay.width===1320)lay.width=1440;
 if(lay.side===24)lay.side=40;
 if(lay.top===68&&lay.bottom===68){lay.top=64;lay.bottom=64}
 if(lay.gap==='@medium')lay.gap=24;
 if(!Object.hasOwn(res.tablet,'gap'))res.tablet.gap=20;
 if(res.mobile.side===16)res.mobile.side=20;
 if(!Object.hasOwn(res.mobile,'gap'))res.mobile.gap=16;
}
function migrateHeroCalibration(project,sourceVersion=''){
 if(/^6 beta2\.8(?:\.|$)/.test(String(sourceVersion||'')))return;
 const old={
  'hero-01':{layout:{gap:48,firstColumn:55},content:{gap:18},image:{height:440}},
  'hero-02':{layout:{gap:34},content:{gap:16,width:76},image:{height:390}},
  'hero-03':{layout:{gap:56,firstColumn:52},content:{gap:18},image:{height:500}},
  'hero-04':{layout:{gap:28,firstColumn:64},content:{gap:20},image:{height:330},heading:{size:68}},
  'hero-05':{layout:{gap:28},content:{gap:18,width:82},image:{height:300},heading:{size:64,maxWidth:880}}
 };
 const next={
  'hero-01':{layout:{gap:56,firstColumn:50},layoutResp:{tablet:{gap:36},mobile:{gap:24}},content:{gap:18},contentResp:{tablet:{gap:16},mobile:{gap:14}},image:{frameMode:'fill',height:460},imageResp:{tablet:{frameMode:'ratio',aspectRatio:'16 / 9'},mobile:{frameMode:'ratio',aspectRatio:'4 / 3'}},heading:{maxWidth:620},body:{maxWidth:560}},
  'hero-02':{layout:{gap:40},layoutResp:{tablet:{gap:32},mobile:{gap:24}},content:{gap:16,width:72},contentResp:{tablet:{width:100,gap:16},mobile:{width:100,gap:14}},image:{frameMode:'ratio',aspectRatio:'3 / 1',height:390},imageResp:{tablet:{frameMode:'ratio',aspectRatio:'16 / 9'},mobile:{frameMode:'ratio',aspectRatio:'4 / 3'}},heading:{maxWidth:920},body:{maxWidth:720}},
  'hero-03':{layout:{gap:56,firstColumn:50},layoutResp:{tablet:{gap:36},mobile:{gap:24}},content:{gap:18},contentResp:{tablet:{gap:16},mobile:{gap:14}},image:{frameMode:'fill',height:500},imageResp:{tablet:{frameMode:'ratio',aspectRatio:'16 / 9'},mobile:{frameMode:'ratio',aspectRatio:'4 / 3'}},heading:{maxWidth:620},body:{maxWidth:560}},
  'hero-04':{layout:{gap:48,firstColumn:60},layoutResp:{tablet:{gap:36},mobile:{gap:24}},content:{gap:20},contentResp:{tablet:{gap:18},mobile:{gap:14}},image:{frameMode:'fill',height:360},imageResp:{tablet:{frameMode:'ratio',aspectRatio:'16 / 9'},mobile:{frameMode:'ratio',aspectRatio:'4 / 3'}},heading:{size:68,maxWidth:820},headingResp:{tablet:{size:56},mobile:{size:42}},body:{maxWidth:620}},
  'hero-05':{layout:{gap:36},layoutResp:{tablet:{gap:28},mobile:{gap:24}},content:{gap:18,width:72},contentResp:{tablet:{width:100,gap:16},mobile:{width:100,gap:14}},image:{frameMode:'ratio',aspectRatio:'3 / 1',height:300},imageResp:{tablet:{frameMode:'ratio',aspectRatio:'16 / 9'},mobile:{frameMode:'ratio',aspectRatio:'4 / 3'}},heading:{size:64,maxWidth:920},headingResp:{tablet:{size:52},mobile:{size:40}},body:{maxWidth:650}}
 };
 const applyBase=(node,key,oldValue,newValue)=>{
   node.baseStyle=node.baseStyle||{};
   if(Object.hasOwn(node.style||{},key))return;
   if(oldValue===undefined){
     if(!Object.hasOwn(node.baseStyle,key))node.baseStyle[key]=newValue;
   }else if(node.baseStyle[key]===oldValue)node.baseStyle[key]=newValue;
 };
 const applyResp=(node,spec)=>{
   if(!spec)return;
   node.baseResponsive=node.baseResponsive||{};
   for(const [mode,vals] of Object.entries(spec)){
     node.baseResponsive[mode]=node.baseResponsive[mode]||{};
     for(const [key,value] of Object.entries(vals)){
       if(!Object.hasOwn(node.baseResponsive[mode],key))node.baseResponsive[mode][key]=value;
     }
   }
 };
 for(const {section} of projectSectionEntries(project)){
   const prev=old[section.componentId],spec=next[section.componentId];
   if(!prev||!spec)continue;
   let layoutNode=null,contentNode=null,imageNode=null,headingNode=null,bodyNode=null;
   walk(section.elements,node=>{
     if(node.role==='heroLayout')layoutNode=node;
     else if(node.role==='contentGroup'&&!contentNode)contentNode=node;
     else if(node.type==='image'&&node.role==='visual'&&!imageNode)imageNode=node;
     else if(node.type==='heading'&&node.role==='h1'&&!headingNode)headingNode=node;
     else if(node.type==='text'&&node.role==='body'&&!bodyNode)bodyNode=node;
   });
   if(layoutNode){
     for(const [k,v] of Object.entries(spec.layout||{}))applyBase(layoutNode,k,prev.layout?.[k],v);
     applyResp(layoutNode,spec.layoutResp);
   }
   if(contentNode){
     for(const [k,v] of Object.entries(spec.content||{}))applyBase(contentNode,k,prev.content?.[k],v);
     applyResp(contentNode,spec.contentResp);
   }
   if(imageNode){
     for(const [k,v] of Object.entries(spec.image||{})){
       if(k==='frameMode'||k==='aspectRatio'){
         if(!Object.hasOwn(imageNode.style||{},k)&&!Object.hasOwn(imageNode.baseStyle||{},k))imageNode.baseStyle[k]=v;
         else if(k==='frameMode'&&imageNode.baseStyle?.frameMode==='fixed'&&!Object.hasOwn(imageNode.style||{},k))imageNode.baseStyle[k]=v;
       }else applyBase(imageNode,k,prev.image?.[k],v);
     }
     if(spec.image.frameMode)imageNode.baseStyle.frameMode=Object.hasOwn(imageNode.style||{},'frameMode')?imageNode.baseStyle.frameMode:spec.image.frameMode;
     if(spec.image.aspectRatio&&!Object.hasOwn(imageNode.style||{},'aspectRatio'))imageNode.baseStyle.aspectRatio=spec.image.aspectRatio;
     applyResp(imageNode,spec.imageResp);
   }
   if(headingNode){
     for(const [k,v] of Object.entries(spec.heading||{}))applyBase(headingNode,k,prev.heading?.[k],v);
     applyResp(headingNode,spec.headingResp);
   }
   if(bodyNode)for(const [k,v] of Object.entries(spec.body||{}))applyBase(bodyNode,k,prev.body?.[k],v);
 }
}

function migrateStockCalibration281(project,sourceVersion=''){
 if(/^6 beta2\.8\.1(?:\.|$)/.test(String(sourceVersion||'')))return;

 const applyBase=(node,key,oldValue,newValue)=>{
   if(!node)return;
   node.baseStyle=node.baseStyle||{};
   if(Object.hasOwn(node.style||{},key))return;
   if(oldValue===undefined){
     if(!Object.hasOwn(node.baseStyle,key))node.baseStyle[key]=newValue;
   }else if(node.baseStyle[key]===oldValue)node.baseStyle[key]=newValue;
 };
 const applyResp=(node,spec)=>{
   if(!node||!spec)return;
   node.baseResponsive=node.baseResponsive||{};
   node.responsive=node.responsive||{};
   for(const [mode,vals] of Object.entries(spec)){
     node.baseResponsive[mode]=node.baseResponsive[mode]||{};
     for(const [key,value] of Object.entries(vals)){
       if(Object.hasOwn(node.responsive[mode]||{},key))continue;
       if(!Object.hasOwn(node.baseResponsive[mode],key))node.baseResponsive[mode][key]=value;
     }
   }
 };
 const find=(section,predicate)=>{
   let hit=null;walk(section.elements,n=>{if(!hit&&predicate(n))hit=n});return hit;
 };
 const all=(section,predicate)=>{
   const hits=[];walk(section.elements,n=>{if(predicate(n))hits.push(n)});return hits;
 };

 for(const {section} of projectSectionEntries(project)){
   if(section.componentId==='about-01'){
     const layoutNode=find(section,n=>n.role==='aboutLayout');
     const contentNode=find(section,n=>n.role==='contentGroup');
     const imageNode=find(section,n=>n.type==='image'&&n.role==='visual');
     const headingNode=find(section,n=>n.type==='heading'&&n.role==='h2');
     const bodyNode=find(section,n=>n.type==='text'&&n.role==='body');
     applyBase(layoutNode,'gap',48,56);applyBase(layoutNode,'firstColumn',48,50);
     applyResp(layoutNode,{tablet:{gap:36},mobile:{gap:24}});
     applyBase(contentNode,'gap',18,18);applyResp(contentNode,{tablet:{gap:16},mobile:{gap:14}});
     if(imageNode){
       applyBase(imageNode,'height',420,460);
       if(!Object.hasOwn(imageNode.style||{},'frameMode')&&(imageNode.baseStyle?.frameMode==='fixed'||!imageNode.baseStyle?.frameMode))imageNode.baseStyle.frameMode='fill';
       applyResp(imageNode,{tablet:{frameMode:'ratio',aspectRatio:'16 / 9'},mobile:{frameMode:'ratio',aspectRatio:'4 / 3'}});
     }
     applyBase(headingNode,'maxWidth',undefined,640);
     applyBase(bodyNode,'maxWidth',undefined,600);
   }

   if(section.componentId==='services-01'){
     const wrap=find(section,n=>n.role==='servicesWrap');
     const intro=find(section,n=>n.role==='contentGroup');
     const cards=find(section,n=>n.role==='cards');
     const heading=find(section,n=>n.type==='heading'&&n.role==='h2');
     const body=find(section,n=>n.type==='text'&&n.role==='body');
     applyBase(wrap,'gap',34,40);applyResp(wrap,{tablet:{gap:32},mobile:{gap:28}});
     applyBase(intro,'gap',14,14);applyBase(intro,'width',70,60);applyResp(intro,{tablet:{width:80,gap:14},mobile:{width:100,gap:12}});
     applyBase(cards,'gap',20,24);applyResp(cards,{tablet:{gap:20},mobile:{gap:16}});
     applyBase(heading,'maxWidth',undefined,760);applyBase(body,'maxWidth',undefined,620);
     for(const card of all(section,n=>n.role==='card')){
       applyBase(card,'gap',10,12);
       applyBase(card,'padding',undefined,28);
       applyBase(card,'background',undefined,'$bg');
       applyBase(card,'radius',undefined,'@rounded');
       applyResp(card,{tablet:{padding:24},mobile:{padding:20}});
     }
   }

   if(section.componentId==='cta-01'){
     const layoutNode=find(section,n=>n.role==='ctaLayout');
     const contentNode=find(section,n=>n.role==='contentGroup');
     const headingNode=find(section,n=>n.type==='heading'&&n.role==='h2');
     const bodyNode=find(section,n=>n.type==='text'&&n.role==='body');
     applyBase(layoutNode,'gap',30,40);applyBase(layoutNode,'stack',undefined,'mobile');
     applyResp(layoutNode,{tablet:{gap:32},mobile:{gap:24,alignItems:'start'}});
     applyBase(contentNode,'gap',10,12);applyBase(contentNode,'width',70,72);
     applyResp(contentNode,{mobile:{width:100,gap:10}});
     applyBase(headingNode,'maxWidth',undefined,800);applyBase(bodyNode,'maxWidth',undefined,680);
   }

   if(section.componentId==='footer-01'){
     const layoutNode=find(section,n=>n.role==='footerLayout');
     const contentNode=find(section,n=>n.role==='contentGroup');
     const linksNode=find(section,n=>n.role==='footerLinks');
     const bodyNode=find(section,n=>n.type==='text'&&n.role==='body');
     applyBase(layoutNode,'gap',30,40);applyBase(layoutNode,'stack',undefined,'mobile');
     applyResp(layoutNode,{tablet:{gap:32},mobile:{gap:24,alignItems:'start'}});
     applyBase(contentNode,'gap',8,8);applyResp(contentNode,{mobile:{width:100,gap:6}});
     applyBase(linksNode,'gap',20,24);applyResp(linksNode,{mobile:{width:100,gap:18,justify:'start'}});
     applyBase(bodyNode,'maxWidth',undefined,560);
   }
 }
}


function migrateUnifiedContainers284(project,sourceVersion=''){
  if(/^6 beta2\.8\.4(?:\.|$)/.test(String(sourceVersion||'')))return;

  function flattenBuilderRoot(node){
    if(!node||node.type!=='group')return;
    if(node.builderLayout&&Array.isArray(node.children)&&node.children.length===1){
      const child=node.children[0];
      if(child?.type==='group'&&(child.isLayoutScaffold||child.isLayoutSlot)){
        node.baseStyle={...(node.baseStyle||{}),...(child.baseStyle||{})};
        node.style={...(node.style||{}),...(child.style||{})};
        node.baseResponsive={...(node.baseResponsive||{}),...(child.baseResponsive||{})};
        node.responsive={...(node.responsive||{}),...(child.responsive||{})};
        node.children=child.children||[];
      }
    }
    if(node.layoutPreset&&!node.sourceLayoutPreset)node.sourceLayoutPreset=node.layoutPreset;
    delete node.builderLayout;
    delete node.layoutPreset;
    delete node.isLayoutScaffold;
    delete node.isLayoutSlot;
    for(const child of node.children||[])if(child?.type==='group')flattenBuilderRoot(child);
  }

  for(const {section} of projectSectionEntries(project)){
    if(section.type==='blank'){
      section.elements=Array.isArray(section.elements)?section.elements:[];
      if(!(section.elements.length===1&&section.elements[0]?.type==='group'&&section.elements[0].isSectionRoot)){
        section.elements=[makeBlankSectionRoot(section.elements)];
      }
    }
    for(const node of section.elements||[])if(node?.type==='group')flattenBuilderRoot(node);
  }
}

function ensureVisualToolkitDesign(project){
  const texts=project?.design?.texts;
  if(texts&&!texts.display){
    const source=texts.h1||texts.body||{font:'DM Sans',size:56,lineHeight:1.05,weight:700,letterSpacing:0,color:'inherit',underline:'none',hoverColor:'$accent'};
    texts.display={...clone(source),name:'Display',size:96,lineHeight:.92,weight:700};
  }
}

function migrate(p){
 if(!p||typeof p!=='object')throw Error('This is not a Runa project.');
 const sourceVersion=String(p.version||'');

 // Validate the outer shape first. Stock Container topology is repaired before
 // strict validation so older damaged saves can actually reach the repair pass.
 validateProjectShell(p);

 // Legacy 1.x projects stored sections directly on the project.
 if(!Array.isArray(p.pages)){
   if(!Array.isArray(p.sections))throw Error('This is not a Runa project.');
   const legacySections=p.sections;
   const page={id:uid('page'),name:'Home',slug:'/',sections:legacySections};
   p.pages=[page];p.activePageId=page.id;delete p.sections;
 }
 if(!p.pages.length)throw Error('Project must contain at least one page.');
 for(let i=0;i<p.pages.length;i++){
   const page=p.pages[i];
   if(!page||typeof page!=='object')throw Error('Invalid page data.');
   page.id=page.id||uid('page');
   page.name=page.name||('Page '+(i+1));
   page.slug=page.slug??(i===0?'/':'/'+String(page.name).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''));
   if(page.sections===undefined)page.sections=[];
   else if(!Array.isArray(page.sections))throw Error('Page sections must be an array.');
 }
 if(!p.pages.some(x=>x.id===p.activePageId))p.activePageId=p.pages[0].id;
 migrateSharedSections(p);
 ensureAssets(p);

 if(p.design){
   if(!p.design.colours||!p.design.texts||!p.design.buttons)throw Error('Incomplete Style data.');
   ensureVisualToolkitDesign(p);
   for(const {section:s} of projectSectionEntries(p)){
     normalizeNavbar(s,{legacy:!/^6 beta2\.(?:4|5)(?:\.|$)/.test(sourceVersion)});
     s.componentFamily=s.componentFamily||s.type;
     s.componentVariant=s.componentVariant||s.name;
     s.componentId=s.componentId||'';
     s.style=s.style||{};
     s.responsive=s.responsive||{};
     (s.elements||[]).forEach(prepareNode);
   }
   migrateBuilderLayouts(p,sourceVersion);
   migrateUnifiedContainers284(p,sourceVersion);
   normalizeBuilderLayouts(p);
   migrateImageFrames(p);
   migrateLegacyContainerGaps(p,sourceVersion);
   migrateProjectAssets(p);
   migrateDesktopWidthDefaults(p,sourceVersion);
   migrateLayoutCalibration(p,sourceVersion);
   migrateHeroCalibration(p,sourceVersion);
   migrateStockCalibration281(p,sourceVersion);
   migrateLinks(p);
   ensureStyleContract(p.design);for(const {section} of projectSectionEntries(p))connectComponentStyle(section);
 p.version='3.14.4';
   return validateProject(p);
 }

 // Older pre-design projects.
 p.design=clone(PRESETS[p.stylePreset]||PRESETS['Runa Clean']);
 const old=p.styleOverrides||p.theme||{};
 for(const k of Object.keys(colourNames))if(old[k])p.design.colours[k].value=old[k];
 for(const k of ['h1','h2','h3'])if(old[k])p.design.texts[k].size=old[k];
 if(old.heading)for(const k of ['h1','h2','h3'])p.design.texts[k].font=old.heading;
 if(old.body)p.design.texts.body.font=old.body;
 if(old.width)p.design.layout.width=old.width;
 if(old.spacing)p.design.layout.top=p.design.layout.bottom=old.spacing;
 for(const {section:s} of projectSectionEntries(p)){
   normalizeNavbar(s,{legacy:true});
   s.style=s.style||{};
   if(s.style.bg)s.style.background=({surface:'$surface',primary:'$primary',dark:'$dark'}[s.style.bg])||'$bg';
   s.responsive={};
   (s.elements||[]).forEach(prepareNode);
 }
 migrateBuilderLayouts(p,sourceVersion);
 migrateUnifiedContainers284(p,sourceVersion);
 normalizeBuilderLayouts(p);
 migrateImageFrames(p);
 migrateLegacyContainerGaps(p,sourceVersion);
 migrateProjectAssets(p);
 migrateDesktopWidthDefaults(p,sourceVersion);
 migrateLayoutCalibration(p,sourceVersion);
 migrateHeroCalibration(p,sourceVersion);
 migrateStockCalibration281(p,sourceVersion);
 migrateLinks(p);
 ensureStyleContract(p.design);for(const {section} of projectSectionEntries(p))connectComponentStyle(section);
 p.version='3.14.4';
 return validateProject(p);
}
function findSectionTarget(project,sectionId,sourcePage=null){
  for(const section of sharedSectionList(project))if(section.id===sectionId)return{page:sourcePage||project.pages?.[0]||null,section,shared:true};
  for(const page of project.pages||[])for(const section of page.sections||[])if(section.id===sectionId)return{page,section,shared:false};
  return null;
}
function uniqueSectionAnchor(page,preferred='section',excludeId=null){
  const raw=String(preferred||'section').replace(/^#+/,'').trim().toLowerCase();
  const stem=raw.replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'section';
  let anchor=stem,i=2;
  const used=()=>[...(page.sections||[]),...sharedSectionList(P)].some(s=>s.id!==excludeId&&s.anchor===anchor);
  while(used())anchor=stem+'-'+i++;
  return anchor;
}
function ensureSectionAnchor(section,page){
  section.anchor=uniqueSectionAnchor(page,section.anchor||section.name||section.type||'section',section.id);
  return section.anchor;
}
function inferLinkModel(n,sourcePage=activePage(),project=P){
  if(n.linkType)return;
  const raw=String(n.href||'').trim();
  if(!raw&&n.role==='navlink'){
    const wanted=String(n.text||'').trim().toLowerCase();
    const matched=project.pages.find(page=>page.name.trim().toLowerCase()===wanted||page.slug===slugify(n.text||''));
    n.linkType='page';
    n.linkPageId=matched?.id||'';
    return;
  }
  if(/^mailto:/i.test(raw)){n.linkType='email';n.linkValue=raw.replace(/^mailto:/i,'');return}
  if(/^tel:/i.test(raw)){n.linkType='phone';n.linkValue=raw.replace(/^tel:/i,'');return}
  const page=project.pages.find(p=>p.slug===raw);
  if(page){n.linkType='page';n.linkPageId=page.id;return}
  if(raw.startsWith('#')&&raw.length>1){
    const anchor=raw.slice(1);
    let hit=(sourcePage.sections||[]).find(s=>s.anchor===anchor);
    let hitPage=sourcePage;
    if(!hit){
      for(const pageCandidate of project.pages){
        hit=(pageCandidate.sections||[]).find(s=>s.anchor===anchor);
        if(hit){hitPage=pageCandidate;break}
      }
    }
    if(hit){n.linkType='section';n.linkSectionId=hit.id;return}
  }
  n.linkType='url';
  n.linkValue=raw;
}
function resolvedLink(n,sourcePage=activePage(),project=P){
  if(!n.linkType)return n.href||'';
  if(n.linkType==='page'){
    const page=project.pages.find(p=>p.id===n.linkPageId);
    return page?.slug||'#';
  }
  if(n.linkType==='section'){
    const target=findSectionTarget(project,n.linkSectionId,sourcePage);
    if(!target)return '#';
    const anchor=ensureSectionAnchor(target.section,target.page);
    if(target.shared)return '#'+anchor;
    return target.page.id===sourcePage.id?'#'+anchor:(target.page.slug==='/'?'/':target.page.slug)+'#'+anchor;
  }
  if(n.linkType==='email'){
    const value=String(n.linkValue||'').replace(/^mailto:/i,'').trim();
    return value?'mailto:'+value:'#';
  }
  if(n.linkType==='phone'){
    const value=String(n.linkValue||'').replace(/^tel:/i,'').trim();
    return value?'tel:'+value:'#';
  }
  return n.linkValue||n.href||'#';
}
function syncLinkHref(n,sourcePage=activePage(),project=P){
  if(n.linkType)n.href=resolvedLink(n,sourcePage,project);
}
function syncAllLinkHrefs(project=P){
  const fallbackPage=project.pages?.find(p=>p.id===project.activePageId)||project.pages?.[0]||null;
  for(const {section,page} of projectSectionEntries(project))walk(section.elements,n=>syncLinkHref(n,page||fallbackPage,project));
}
function migrateLinks(project){
  const fallbackPage=project.pages?.find(p=>p.id===project.activePageId)||project.pages?.[0]||null;
  for(const {section,page} of projectSectionEntries(project))walk(section.elements,n=>{
    if(n.linkType){
      if(!['page','section','url','email','phone'].includes(n.linkType))n.linkType='url';
      if(n.linkType==='url'&&n.linkValue===undefined)n.linkValue=n.href||'';
      if(n.linkType==='email'&&n.linkValue===undefined)n.linkValue=String(n.href||'').replace(/^mailto:/i,'');
      if(n.linkType==='phone'&&n.linkValue===undefined)n.linkValue=String(n.href||'').replace(/^tel:/i,'');
    }else if(n.href){
      inferLinkModel(n,page||fallbackPage,project);
    }
  });
  syncAllLinkHrefs(project);
}
const HERO_ACTION_LAYOUT_CHOICES=[
  ['none','None'],
  ['primary','Primary button'],
  ['two','Primary + secondary buttons'],
  ['primaryText','Primary button + text link'],
  ['links','Two text links']
];
function heroActionGroupFor(root){
  let found=null;
  const visit=nodes=>{for(const node of nodes||[]){if(node?.type==='group'&&node.role==='heroActions'){found=node;return true}if(visit(node?.children))return true}return false};
  if(isSection(root))visit(root.elements);else if(root?.type==='group'&&root.role==='heroActions')found=root;else visit(root?.children);
  return found;
}
function captureHeroActionContent(group){
  if(!group)return null;
  group.actionContent=group.actionContent||{
    primary:{text:'Book a trial class',href:'#contact'},
    secondary:{text:'View timetable',href:'#timetable'}
  };
  for(const slot of ['primary','secondary'])group.actionContent[slot]=group.actionContent[slot]||{text:slot==='primary'?'Book a trial class':'View timetable',href:slot==='primary'?'#contact':'#timetable'};
  const buttons=(group.children||[]).filter(child=>child?.type==='button');
  buttons.forEach((child,index)=>{
    const slot=child.actionSlot||(index===0?'primary':'secondary');
    if(!group.actionContent[slot])return;
    group.actionContent[slot].text=child.text??group.actionContent[slot].text;
    group.actionContent[slot].href=child.href||child.linkValue||group.actionContent[slot].href;
  });
  return group.actionContent;
}
function heroActionButton(group,slot,variant){
  const content=captureHeroActionContent(group)[slot];
  return{id:uid('el'),type:'button',role:'cta',name:slot==='primary'?'Primary action':'Secondary action',actionSlot:slot,text:content.text,href:content.href,buttonVariant:variant,baseStyle:{},style:{},responsive:{}};
}
function setHeroActionLayout(group,layout){
  if(!group)return;
  captureHeroActionContent(group);
  group.actionLayout=layout;
  group.children=layout==='none'?[]:
    layout==='primary'?[heroActionButton(group,'primary','main')]:
    layout==='two'?[heroActionButton(group,'primary','main'),heroActionButton(group,'secondary','alternative')]:
    layout==='primaryText'?[heroActionButton(group,'primary','main'),heroActionButton(group,'secondary','text')]:
    [heroActionButton(group,'primary','text'),heroActionButton(group,'secondary','text')];
  render();inspect();
}
function updateHeroActionContent(group,slot,key,value){
  const content=captureHeroActionContent(group);
  content[slot][key]=value;
  const child=(group.children||[]).find(node=>node.actionSlot===slot);
  if(child){
    if(key==='text')child.text=value;
    else{
      child.href=value;
      delete child.linkType;delete child.linkValue;delete child.linkPageId;delete child.linkSectionId;
    }
  }
  render();
}
function heroActionControls(parent,group){
  if(!group)return;
  const content=captureHeroActionContent(group),layout=group.actionLayout||((group.children||[]).length>1?'primaryText':(group.children||[]).length===1?'primary':'none');
  field(parent,'CTA layout',layout,'select',v=>setHeroActionLayout(group,v),{choices:HERO_ACTION_LAYOUT_CHOICES});
  if(layout==='none'){
    const note=document.createElement('p');note.className='card-note';note.textContent='Action labels and links are retained and will return when another CTA layout is selected.';parent.append(note);return;
  }
  field(parent,'Primary label',content.primary.text,'text',v=>updateHeroActionContent(group,'primary','text',v));
  field(parent,'Primary link',content.primary.href,'text',v=>updateHeroActionContent(group,'primary','href',v));
  if(layout!=='primary'){
    field(parent,'Secondary label',content.secondary.text,'text',v=>updateHeroActionContent(group,'secondary','text',v));
    field(parent,'Secondary link',content.secondary.href,'text',v=>updateHeroActionContent(group,'secondary','href',v));
  }
}

function heroWideMediaFor(root){
  if(root?.heroWideMedia)return root;
  let found=null;
  const nodes=isSection(root)?root.elements:root?.children;
  walk(nodes||[],node=>{if(!found&&node?.heroWideMedia)found=node});
  return found;
}
function heroMediaControls(parent,root){
  const image=heroWideMediaFor(root);if(!image)return;
  field(parent,'Wide image width',image.mediaWidth||'full','select',v=>{image.mediaWidth=v;render();inspect()},{choices:[['full','Full width'],['contained','Contained']]});
  const note=document.createElement('p');note.className='card-note';note.textContent='Full width lets wide hero photography run edge-to-edge while the hero copy remains contained.';parent.append(note);
}


const ACADEMY_CTA_CHOICES=[['none','None'],['text','Text link'],['button','Button']];
function academyModuleNode(section,slot){
  let found=null;
  walk(section?.elements||[],node=>{if(!found&&node.academySlot===slot)found=node});
  return found;
}
function ensureAcademyConfig(section){
  if(!section?.academyModule)return null;
  const caps=section.academyCapabilities||{};
  section.academyConfig={
    eyebrow:caps.eyebrow?true:false,
    cta:caps.cta?'none':'none',
    image:caps.image?true:false,
    imagePosition:caps.imagePosition?'left':'left',
    stats:caps.stats?true:false,
    support:caps.support?true:false,
    ...(section.academyConfig||{})
  };
  return section.academyConfig;
}
function academySetVisible(node,visible){if(!node)return;node.baseStyle=node.baseStyle||{};node.baseStyle.visible=!!visible}
function syncAcademySection(section){
  if(!section?.academyModule)return;
  const cfg=ensureAcademyConfig(section),caps=section.academyCapabilities||{};
  const eyebrow=academyModuleNode(section,'eyebrow');if(eyebrow)academySetVisible(eyebrow,cfg.eyebrow!==false);
  const cta=academyModuleNode(section,'cta');if(cta){academySetVisible(cta,cfg.cta!=='none');cta.buttonVariant=cfg.cta==='button'?'main':'text';if(cta.style)delete cta.style.buttonStyle}
  const image=academyModuleNode(section,'image');if(image)academySetVisible(image,cfg.image!==false);
  const stats=academyModuleNode(section,'stats');if(stats)academySetVisible(stats,cfg.stats!==false);
  const support=academyModuleNode(section,'support');if(support)academySetVisible(support,cfg.support!==false);
  if(caps.imagePosition){
    const layout=academyModuleNode(section,'layout'),copy=academyModuleNode(section,'copy');
    if(layout&&image&&copy){
      const left=cfg.imagePosition!=='right',share=Math.max(30,Math.min(70,Number(section.academyImageShare)||50));
      const others=(layout.children||[]).filter(ch=>ch!==image&&ch!==copy);
      layout.children=left?[image,copy,...others]:[copy,image,...others];
      layout.baseStyle=layout.baseStyle||{};layout.baseStyle.firstColumn=left?share:100-share;
      image.baseResponsive=image.baseResponsive||{};image.baseResponsive.tablet={...(image.baseResponsive.tablet||{}),order:-1};image.baseResponsive.mobile={...(image.baseResponsive.mobile||{}),order:-1};
      copy.baseResponsive=copy.baseResponsive||{};copy.baseResponsive.tablet={...(copy.baseResponsive.tablet||{}),order:0};copy.baseResponsive.mobile={...(copy.baseResponsive.mobile||{}),order:0};
    }
  }
}
function syncAcademySections(){for(const {section} of projectSectionEntries(P))if(section?.academyModule)syncAcademySection(section)}
function setAcademyConfig(section,key,value){const cfg=ensureAcademyConfig(section);if(!cfg)return;cfg[key]=value;syncAcademySection(section);render();inspect()}
function academyControls(parent,section){
  if(!section?.academyModule)return;
  const cfg=ensureAcademyConfig(section),caps=section.academyCapabilities||{};
  const note=document.createElement('p');note.className='card-note';note.textContent='These controls change the composition without replacing your academy copy or images.';parent.append(note);
  if(caps.eyebrow){field(parent,'Eyebrow',cfg.eyebrow!==false,'checkbox',v=>setAcademyConfig(section,'eyebrow',v));if(cfg.eyebrow!==false){const eyebrow=academyModuleNode(section,'eyebrow');if(eyebrow)field(parent,'Eyebrow text',eyebrow.text||'','text',v=>{eyebrow.text=v;render()})}}
  if(caps.image){field(parent,'Image',cfg.image!==false,'checkbox',v=>setAcademyConfig(section,'image',v));if(caps.imagePosition&&cfg.image!==false)field(parent,'Image position',cfg.imagePosition||'left','select',v=>setAcademyConfig(section,'imagePosition',v),{choices:[['left','Left'],['right','Right']]})}
  if(caps.stats)field(parent,'Stats / proof',cfg.stats!==false,'checkbox',v=>setAcademyConfig(section,'stats',v));
  if(caps.support)field(parent,'Supporting quote / proof',cfg.support!==false,'checkbox',v=>setAcademyConfig(section,'support',v));
  if(caps.cta){field(parent,'CTA',cfg.cta||'none','select',v=>setAcademyConfig(section,'cta',v),{choices:ACADEMY_CTA_CHOICES});if(cfg.cta!=='none'){const cta=academyModuleNode(section,'cta');if(cta){field(parent,'CTA label',cta.text||'','text',v=>{cta.text=v;render()});field(parent,'CTA link',cta.href||'#','text',v=>{cta.href=v;delete cta.linkType;delete cta.linkValue;delete cta.linkPageId;delete cta.linkSectionId;render()})}}}
}


const GALLERY_GAP_VALUES={compact:10,standard:18,generous:28};
const GALLERY_LEAD_SHAPES={landscape:'3 / 2',wide:'16 / 9',cinematic:'21 / 9',tall:'4 / 3'};
function galleryCollectionFor(root){
  let found=null;
  const visit=nodes=>{for(const node of nodes||[]){if(node?.type==='group'&&node.galleryCollection){found=node;return true}if(visit(node?.children))return true}return false};
  if(isSection(root))visit(root.elements);else if(root?.type==='group'&&root.galleryCollection)found=root;else visit(root?.children);
  return found;
}
function gallerySectionFor(node){
  let current=node;
  while(current){if(isSection(current)&&current.type==='gallery')return current;current=parentInfo(current.id)?.parent}
  return null;
}
function galleryIntroFor(section){let found=null;walk(section?.elements||[],node=>{if(!found&&node.gallerySlot==='intro')found=node});return found}
function galleryImageParent(image){const info=parentInfo(image?.id);return info?.parent?.galleryCollection?info.parent:null}
function galleryImageAncestor(node){let current=node;while(current){if(current.type==='image'&&galleryImageParent(current))return current;current=parentInfo(current.id)?.parent}return null}
function ensureGalleryConfig(collection){
  if(!collection?.galleryCollection)return null;
  collection.galleryConfig={intro:true,lightbox:true,captions:true,hover:'zoom',entrance:'rise',corners:'square',gap:'standard',autoscroll:false,scrollSpeed:'slow',leadWidth:'contained',railWidth:'contained',leadShape:'cinematic',...(collection.galleryConfig||{})};
  collection.galleryLightboxGroup=collection.galleryLightboxGroup||uid('gallery_lightbox');
  return collection.galleryConfig;
}
function gallerySpanPattern(layout,index,mode){
  if(layout==='mosaic'){
    if(mode==='desktop'){const p=[{col:7,row:2},{col:5,row:1},{col:5,row:1},{col:4,row:1},{col:4,row:1},{col:4,row:1}];return p[index]||{col:4,row:1}}
    if(mode==='tablet')return index===0?{col:6,row:2}:{col:3,row:1};
    return{col:1,row:1};
  }
  if(layout==='feature'){
    if(mode==='desktop'){if(index===0)return{col:8,row:2};if(index<3)return{col:4,row:1};return{col:6,row:1}}
    if(mode==='tablet')return index===0?{col:6,row:2}:{col:3,row:1};
    return{col:1,row:1};
  }
  return null;
}
function syncGalleryCollection(collection,section=gallerySectionFor(collection)){
  if(!collection?.galleryCollection)return;
  const cfg=ensureGalleryConfig(collection),images=(collection.children||[]).filter(n=>n?.type==='image');
  if(section){const intro=galleryIntroFor(section);if(intro){intro.baseStyle=intro.baseStyle||{};intro.baseStyle.visible=cfg.intro!==false}}
  collection.baseStyle=collection.baseStyle||{};collection.baseResponsive=collection.baseResponsive||{};
  collection.baseStyle.gap=GALLERY_GAP_VALUES[cfg.gap]??18;
  collection.baseResponsive.tablet={...(collection.baseResponsive.tablet||{}),gap:Math.max(10,(GALLERY_GAP_VALUES[cfg.gap]??18)-2)};
  collection.baseResponsive.mobile={...(collection.baseResponsive.mobile||{}),gap:Math.max(8,(GALLERY_GAP_VALUES[cfg.gap]??18)-4)};
  const layout=collection.galleryLayout||'grid',count=Math.max(1,images.length);
  collection.galleryRowHeight=null;
  if(layout==='grid'){
    collection.baseStyle.direction='grid';collection.baseStyle.columns=Math.min(3,count);collection.baseStyle.overflow='visible';
    collection.baseResponsive.tablet={...(collection.baseResponsive.tablet||{}),columns:Math.min(2,count)};
    collection.baseResponsive.mobile={...(collection.baseResponsive.mobile||{}),columns:1};
  }else if(layout==='strip'){
    collection.baseStyle.direction='grid';collection.baseStyle.columns=Math.min(4,count);collection.baseStyle.overflow='visible';
    collection.baseResponsive.tablet={...(collection.baseResponsive.tablet||{}),columns:Math.min(2,count)};
    collection.baseResponsive.mobile={...(collection.baseResponsive.mobile||{}),columns:1};
  }else if(layout==='rail'){
    collection.baseStyle.direction='row';collection.baseStyle.columns=1;collection.baseStyle.overflow='visible';
    collection.baseResponsive.tablet={...(collection.baseResponsive.tablet||{}),direction:'row',columns:1};
    collection.baseResponsive.mobile={...(collection.baseResponsive.mobile||{}),direction:'row',columns:1};
  }else if(layout==='featureRail'){
    collection.baseStyle.direction='column';collection.baseStyle.columns=1;collection.baseStyle.overflow='visible';
    collection.baseResponsive.tablet={...(collection.baseResponsive.tablet||{}),direction:'column',columns:1};
    collection.baseResponsive.mobile={...(collection.baseResponsive.mobile||{}),direction:'column',columns:1};
  }else if(layout==='mosaic'||layout==='feature'){
    collection.baseStyle.direction='grid';collection.baseStyle.columns=12;collection.baseStyle.overflow='visible';
    collection.baseResponsive.tablet={...(collection.baseResponsive.tablet||{}),columns:6};
    collection.baseResponsive.mobile={...(collection.baseResponsive.mobile||{}),columns:1};
    collection.galleryRowHeight={desktop:layout==='mosaic'?190:185,tablet:165,mobile:0};
  }
  images.forEach((img,index)=>{
    img.name=img.galleryCaption||img.alt||`Gallery image ${index+1}`;
    img.motion=img.motion||{};img.motion.hover=cfg.hover||'none';img.motion.reveal=cfg.entrance||'none';img.motion.delay=img.motion.reveal==='none'?0:Math.min(index*70,350);
    img.interaction=img.interaction||{};img.interaction.lightboxGroup=cfg.lightbox!==false?collection.galleryLightboxGroup:'';
    img.galleryShowCaption=cfg.captions!==false;
    img.styleBindings=img.styleBindings||{};img.baseStyle=img.baseStyle||{};
    if(cfg.corners==='square'){delete img.styleBindings.radius;img.baseStyle.radius='@square'}else img.styleBindings.radius={kind:'imageRadius'};
    if(layout==='mosaic'||layout==='feature'){
      img.galleryFillCell=true;
      img.gallerySpan={desktop:gallerySpanPattern(layout,index,'desktop'),tablet:gallerySpanPattern(layout,index,'tablet'),mobile:gallerySpanPattern(layout,index,'mobile')};
      img.baseStyle.frameMode='fill';img.baseStyle.height=160;
      img.baseResponsive=img.baseResponsive||{};img.baseResponsive.mobile={...(img.baseResponsive.mobile||{}),frameMode:'ratio',aspectRatio:'4 / 3',height:220};
    }else{
      img.galleryFillCell=false;img.gallerySpan=null;
      img.baseStyle.frameMode='ratio';
      if(layout==='strip')img.baseStyle.aspectRatio='3 / 4';
      else if(layout==='featureRail'&&index===0)img.baseStyle.aspectRatio=GALLERY_LEAD_SHAPES[cfg.leadShape]||GALLERY_LEAD_SHAPES.cinematic;
      else if(layout==='rail'||layout==='featureRail')img.baseStyle.aspectRatio='3 / 2';
      else img.baseStyle.aspectRatio='4 / 3';
      img.baseResponsive=img.baseResponsive||{};
      const mobileRatio=layout==='featureRail'&&index===0?'16 / 10':layout==='rail'||layout==='featureRail'?'3 / 2':'4 / 3';
      img.baseResponsive.mobile={...(img.baseResponsive.mobile||{}),frameMode:'ratio',aspectRatio:mobileRatio,height:220};
      if(layout==='featureRail'&&index===0&&cfg.leadWidth==='full'){delete img.styleBindings.radius;img.baseStyle.radius='@square'}
    }
  });
}
function syncGallerySections(){for(const {section} of projectSectionEntries(P))if(section?.type==='gallery'){const collection=galleryCollectionFor(section);if(collection)syncGalleryCollection(collection,section)}}
function setGalleryConfig(collection,key,value){const cfg=ensureGalleryConfig(collection);if(!cfg)return;cfg[key]=value;syncGalleryCollection(collection);render();inspect()}
function addGalleryImage(collection){
  const images=(collection.children||[]).filter(n=>n?.type==='image');
  let cp;
  if(images.length){cp=clone(images[images.length-1]);regenerateNodeIds([cp]);delete cp.assetId;delete cp.src;cp.alt='New gallery image';cp.galleryCaption='New gallery image';cp.name='New gallery image'}
  else cp={id:uid('el'),type:'image',role:'galleryImage',name:'New gallery image',alt:'New gallery image',galleryCaption:'New gallery image',style:{frameMode:'ratio',aspectRatio:'4 / 3',height:260,focalX:50,focalY:50,radius:'@square'},baseStyle:{},responsive:{},baseResponsive:{mobile:{frameMode:'ratio',aspectRatio:'4 / 3',height:220}},motion:{reveal:'rise',delay:0,hover:'zoom'},interaction:{lightboxGroup:collection.galleryLightboxGroup||''}};
  collection.children.push(cp);syncGalleryCollection(collection);selection=cp.id;activeScope='node';render();inspect();assetPicker(cp,'src');
}
function duplicateGalleryImage(image){const collection=galleryImageParent(image);if(!collection)return;const i=collection.children.indexOf(image),cp=clone(image);regenerateNodeIds([cp]);collection.children.splice(i+1,0,cp);syncGalleryCollection(collection);selection=cp.id;activeScope='node';render();inspect();toast('Gallery image duplicated')}
function removeGalleryImage(image){const collection=galleryImageParent(image);if(!collection)return;const images=collection.children.filter(n=>n?.type==='image');if(images.length<=1){toast('A gallery needs at least one image.');return}collection.children.splice(collection.children.indexOf(image),1);syncGalleryCollection(collection);selection=collection.id;activeScope='node';render();inspect();toast('Gallery image removed')}
function moveGalleryImage(image,delta){const collection=galleryImageParent(image);if(!collection)return;const i=collection.children.indexOf(image),j=i+delta;if(i<0||j<0||j>=collection.children.length)return;[collection.children[i],collection.children[j]]=[collection.children[j],collection.children[i]];syncGalleryCollection(collection);render();inspect()}
function makeGalleryLead(image){const collection=galleryImageParent(image);if(!collection||!['mosaic','feature','featureRail'].includes(collection.galleryLayout))return;const i=collection.children.indexOf(image);if(i<=0)return;collection.children.splice(i,1);collection.children.unshift(image);syncGalleryCollection(collection);render();inspect();toast('Lead gallery image updated')}
function gallerySupportsAutoscroll(collection){
  if(!collection)return false;
  if(['rail','featureRail'].includes(collection.galleryLayout))return true;
  const section=gallerySectionFor(collection);
  const id=section?.componentId||'';
  const name=section?.componentVariant||section?.name||'';
  return id==='bjj-gallery-scroll-rail-01'||id==='bjj-gallery-feature-rail-01'||/Scroll Rail/i.test(name);
}
function galleryControls(parent,collection){
  if(!collection)return;syncGalleryCollection(collection);
  const cfg=ensureGalleryConfig(collection),images=(collection.children||[]).filter(n=>n?.type==='image');
  const note=document.createElement('p');note.className='card-note';note.textContent=`${images.length} image${images.length===1?'':'s'} · Add, remove or reorder images without changing the gallery composition.`;parent.append(note);
  if(collection.galleryLayout==='featureRail'){
    const widthNote=document.createElement('p');widthNote.className='card-note';widthNote.textContent='Feature + rail · The lead image and lower gallery can independently stay contained or extend to the full section width.';parent.append(widthNote);
    field(parent,'Primary image width',cfg.leadWidth||'contained','select',v=>setGalleryConfig(collection,'leadWidth',v),{choices:[['contained','Contained'],['full','Full width']]});
    field(parent,'Lower gallery width',cfg.railWidth||'contained','select',v=>setGalleryConfig(collection,'railWidth',v),{choices:[['contained','Contained'],['full','Full width']]});
    field(parent,'Primary image shape',cfg.leadShape||'cinematic','select',v=>setGalleryConfig(collection,'leadShape',v),{choices:[['landscape','Landscape 3:2'],['wide','Wide 16:9'],['cinematic','Cinematic 21:9'],['tall','Tall 4:3']]});
  }
  if(gallerySupportsAutoscroll(collection)){
    const scrollNote=document.createElement('p');scrollNote.className='card-note';scrollNote.textContent='Horizontal rail · Autoscroll runs in Preview/live output. Vertical mouse-wheel scrolling continues down the page normally; use trackpad, touch or the scrollbar for manual horizontal browsing.';parent.append(scrollNote);
    field(parent,'Autoscroll',cfg.autoscroll===true,'checkbox',v=>setGalleryConfig(collection,'autoscroll',v));
    field(parent,'Autoscroll speed',cfg.scrollSpeed||'slow','select',v=>setGalleryConfig(collection,'scrollSpeed',v),{choices:[['slow','Slow'],['standard','Standard'],['fast','Fast']]});
  }
  field(parent,'Intro',cfg.intro!==false,'checkbox',v=>setGalleryConfig(collection,'intro',v));
  field(parent,'Lightbox',cfg.lightbox!==false,'checkbox',v=>setGalleryConfig(collection,'lightbox',v));
  if(cfg.lightbox!==false)field(parent,'Lightbox captions',cfg.captions!==false,'checkbox',v=>setGalleryConfig(collection,'captions',v));
  field(parent,'Image corners',cfg.corners||'style','select',v=>setGalleryConfig(collection,'corners',v),{choices:[['style','Use Style image corners'],['square','Square']]});
  field(parent,'Gallery gap',cfg.gap||'standard','select',v=>setGalleryConfig(collection,'gap',v),{choices:[['compact','Compact'],['standard','Standard'],['generous','Generous']]});
  field(parent,'Entrance',cfg.entrance||'none','select',v=>setGalleryConfig(collection,'entrance',v),{choices:[['none','None'],['fade','Fade in'],['rise','Fade + rise']]});
  field(parent,'Hover',cfg.hover||'none','select',v=>setGalleryConfig(collection,'hover',v),{choices:[['none','None'],['zoom','Image zoom'],['lift','Lift']]});
  action(parent,'+ Add image',()=>addGalleryImage(collection),'primary full');
  images.forEach((img,index)=>action(parent,`${String(index+1).padStart(2,'0')} · ${img.galleryCaption||img.alt||'Gallery image'}`,()=>select(img.id),'full'));
}
function galleryImageControls(parent,image){
  const collection=galleryImageParent(image);if(!collection)return;
  field(parent,'Caption',image.galleryCaption||image.alt||'','text',v=>{image.galleryCaption=v;image.name=v||image.alt||'Gallery image';render();inspect()});
  action(parent,'Duplicate image',()=>duplicateGalleryImage(image),'full');
  if(['mosaic','feature','featureRail'].includes(collection.galleryLayout)&&collection.children[0]!==image)action(parent,'Make lead image',()=>makeGalleryLead(image),'full');
  const row=document.createElement('div');row.className='quick-pair';parent.append(row);action(row,'Move up',()=>moveGalleryImage(image,-1));action(row,'Move down',()=>moveGalleryImage(image,1));
  action(parent,'Remove image',()=>removeGalleryImage(image),'danger full');
}


const CARD_PRESETS={
  imageOverview:{name:'Image overview',media:'balanced',topDetail:'label',body:'paragraph',cta:'text',title:'standard',alignment:'left',surface:'alternative',border:'style',corners:'style',entrance:'rise',hover:'liftZoom'},
  textOverview:{name:'Text overview',media:'none',topDetail:'number',body:'paragraph',cta:'text',title:'strong',alignment:'left',surface:'alternative',border:'style',corners:'style',entrance:'rise',hover:'lift'},
  highlight:{name:'Highlight',media:'imageLed',topDetail:'number',body:'bullets',cta:'none',title:'strong',alignment:'left',surface:'alternative',border:'none',corners:'style',entrance:'rise',hover:'liftZoom'},
  minimal:{name:'Minimal',media:'none',topDetail:'none',body:'bullets',cta:'none',title:'strong',alignment:'left',surface:'background',border:'none',corners:'square',entrance:'fade',hover:'none'},
  conversion:{name:'Conversion',media:'balanced',topDetail:'label',body:'bullets',cta:'button',title:'strong',alignment:'left',surface:'alternative',border:'none',corners:'style',entrance:'rise',hover:'lift'}
};
const CARD_PRESET_CHOICES=[...Object.entries(CARD_PRESETS).map(([id,p])=>[id,p.name]),['custom','Custom']];
const CARD_DEFAULT={preset:'highlight',...CARD_PRESETS.highlight};
function cardCollectionFor(root){
  let found=null;
  const visit=nodes=>{for(const node of nodes||[]){if(node?.type==='group'&&node.cardCollection){found=node;return true}if(visit(node?.children))return true}return false};
  if(isSection(root))visit(root.elements);else if(root?.type==='group'&&root.cardCollection)found=root;else visit(root?.children);
  return found;
}
function cardCollectionContext(node){
  if(!node)return null;
  if(isSection(node))return cardCollectionFor(node);
  if(node.type==='group'&&node.cardCollection)return node;
  const card=cardPrimitiveAncestor(node),info=card?parentInfo(card.id):null,collection=info?.parent;
  return collection?.cardCollection?collection:null;
}
function ensureCardConfig(collection){
  if(!collection)return clone(CARD_DEFAULT);
  const preset=collection.cardPreset&&CARD_PRESETS[collection.cardPreset]?collection.cardPreset:(collection.cardConfig?.preset&&CARD_PRESETS[collection.cardConfig.preset]?collection.cardConfig.preset:'highlight');
  collection.cardConfig={...CARD_DEFAULT,...(CARD_PRESETS[preset]||{}),...(collection.cardConfig||{})};
  collection.cardPreset=collection.cardPreset||collection.cardConfig.preset||preset;
  collection.cardConfig.preset=collection.cardPreset;
  return collection.cardConfig;
}
function cardNode(card,slot){let found=null;walk(card?.children,node=>{if(!found&&node.cardSlot===slot)found=node});return found}
function cardPrimitiveAncestor(node){let current=node;while(current){if(current.cardPrimitive)return current;current=parentInfo(current.id)?.parent}return null}
function programItemNodes(item,role){const out=[];walk(item?.children,node=>{if(node.role===role)out.push(node)});return out}
function setCardNodeVisible(node,visible){if(!node)return;node.baseStyle=node.baseStyle||{};node.baseStyle.visible=!!visible}
function syncCardCollection(collection){
  if(!collection?.cardCollection)return;
  const cfg=ensureCardConfig(collection),items=(collection.children||[]).filter(n=>n?.cardPrimitive);
  const mediaMap={compact:['16 / 9',220],balanced:['4 / 3',280],imageLed:['5 / 4',320]};
  for(const [cardIndex,item] of items.entries()){
    item.baseStyle=item.baseStyle||{};item.styleBindings=item.styleBindings||{};
    item.motion=item.motion||{};
    item.motion.reveal=cfg.entrance||'none';
    item.motion.delay=item.motion.reveal==='none'?0:Math.min(cardIndex*80,320);
    item.motion.hover=cfg.hover||'none';
    item.surfaceRole=cfg.surface==='background'?'background':'alternative';
    item.baseStyle.border=cfg.border==='style'?'@standard':'@none';
    item.baseStyle.overflow='hidden';
    if(cfg.corners==='style')item.styleBindings.radius={kind:'cardRadius'};else{delete item.styleBindings.radius;item.baseStyle.radius='@square'}
    const image=cardNode(item,'media');
    if(image){
      image.baseStyle=image.baseStyle||{};image.baseResponsive=image.baseResponsive||{};image.styleBindings=image.styleBindings||{};
      const show=cfg.media!=='none',spec=mediaMap[cfg.media]||mediaMap.balanced;setCardNodeVisible(image,show);
      image.baseStyle.frameMode='ratio';image.baseStyle.aspectRatio=spec[0];image.baseStyle.height=spec[1];image.baseStyle.radius='@square';
      image.baseResponsive.mobile={...(image.baseResponsive.mobile||{}),aspectRatio:'16 / 10',height:220};
      if(cfg.corners==='style'){
        image.styleBindings.radiusTopLeft={kind:'cardRadius'};image.styleBindings.radiusTopRight={kind:'cardRadius'};
      }else{
        delete image.styleBindings.radiusTopLeft;delete image.styleBindings.radiusTopRight;image.baseStyle.radiusTopLeft='@square';image.baseStyle.radiusTopRight='@square';
      }
      image.styleBindings.radiusBottomLeft={kind:'bleedImageRadius'};image.styleBindings.radiusBottomRight={kind:'bleedImageRadius'};
      image.baseStyle.radiusBottomLeft='@square';image.baseStyle.radiusBottomRight='@square';
    }
    const meta=cardNode(item,'meta'),index=cardNode(item,'index'),labelNode=cardNode(item,'label');
    const detail=cfg.topDetail||'none';setCardNodeVisible(meta,detail!=='none');setCardNodeVisible(index,detail==='number'||detail==='both');setCardNodeVisible(labelNode,detail==='label'||detail==='both');
    if(meta){meta.baseStyle=meta.baseStyle||{};meta.baseStyle.justify=cfg.alignment==='center'?'center':'start';meta.baseStyle.alignItems='baseline'}
    if(labelNode){labelNode.textStyleRole='emphasis';labelNode.baseStyle=labelNode.baseStyle||{};labelNode.baseStyle.align=cfg.alignment==='center'?'center':'left'}
    const title=cardNode(item,'title');
    if(title){title.textStyleRole='h3';title.textScale=cfg.title==='strong'?{desktop:1.2,tablet:1.12,mobile:1.04}:cfg.title==='oversized'?{desktop:1.42,tablet:1.26,mobile:1.12}:{desktop:1,tablet:.96,mobile:.92};title.baseStyle=title.baseStyle||{};title.baseStyle.align=cfg.alignment==='center'?'center':'left'}
    const desc=cardNode(item,'paragraph'),bullets=cardNode(item,'bullets');
    setCardNodeVisible(desc,cfg.body==='paragraph');setCardNodeVisible(bullets,cfg.body==='bullets');
    if(desc){desc.baseStyle=desc.baseStyle||{};desc.baseStyle.align=cfg.alignment==='center'?'center':'left'}
    const content=cardNode(item,'content'),main=cardNode(item,'main');
    if(content){content.baseStyle=content.baseStyle||{};content.baseStyle.alignItems=cfg.alignment==='center'?'center':'stretch';content.baseStyle.justify='space-between'}
    if(main){main.baseStyle=main.baseStyle||{};main.baseStyle.alignItems=cfg.alignment==='center'?'center':'stretch'}
    const footer=cardNode(item,'footer'),cta=cardNode(item,'cta');
    setCardNodeVisible(footer,cfg.cta!=='none');
    if(footer){footer.baseStyle=footer.baseStyle||{};footer.baseStyle.justify=cfg.alignment==='center'?'center':'start'}
    if(cta)cta.buttonVariant=cfg.cta==='button'?'main':'text';
  }
}
function setCardPreset(collection,preset){
  if(!collection||!CARD_PRESETS[preset])return;
  collection.cardPreset=preset;collection.cardConfig={preset,...clone(CARD_PRESETS[preset])};syncCardCollection(collection);render();inspect();
}
function setCardConfigValue(collection,key,value){
  const cfg=ensureCardConfig(collection);cfg[key]=value;collection.cardPreset='custom';cfg.preset='custom';syncCardCollection(collection);render();inspect();
}
function cardCollectionControls(parent,collection){
  if(!collection?.cardCollection)return;
  const cfg=ensureCardConfig(collection);
  const note=document.createElement('p');note.className='card-note';note.textContent='These controls apply to every card in this section so the grid stays visually consistent. Card content remains editable individually.';parent.append(note);
  field(parent,'Card preset',collection.cardPreset||'custom','select',v=>v==='custom'?null:setCardPreset(collection,v),{choices:CARD_PRESET_CHOICES});
  field(parent,'Image',cfg.media,'select',v=>setCardConfigValue(collection,'media',v),{choices:[['none','No image'],['compact','Top image · compact'],['balanced','Top image · balanced'],['imageLed','Top image · image-led']]});
  field(parent,'Top detail',cfg.topDetail,'select',v=>setCardConfigValue(collection,'topDetail',v),{choices:[['none','None'],['number','Number'],['label','Eyebrow / qualifier'],['both','Number + qualifier']]});
  field(parent,'Body',cfg.body,'select',v=>setCardConfigValue(collection,'body',v),{choices:[['none','None'],['paragraph','Paragraph'],['bullets','Bullet points']]});
  field(parent,'CTA',cfg.cta,'select',v=>setCardConfigValue(collection,'cta',v),{choices:[['none','None'],['text','Text link'],['button','Button']]});
  field(parent,'Title emphasis',cfg.title,'select',v=>setCardConfigValue(collection,'title',v),{choices:[['standard','Standard'],['strong','Strong'],['oversized','Oversized']]});
  field(parent,'Content alignment',cfg.alignment,'select',v=>setCardConfigValue(collection,'alignment',v),{choices:[['left','Left'],['center','Centre']]});
  field(parent,'Surface',cfg.surface,'select',v=>setCardConfigValue(collection,'surface',v),{choices:[['alternative','Alternative background'],['background','Page background']]});
  field(parent,'Border',cfg.border,'select',v=>setCardConfigValue(collection,'border',v),{choices:[['none','None'],['style','Style border']]});
  field(parent,'Corners',cfg.corners,'select',v=>setCardConfigValue(collection,'corners',v),{choices:[['style','Use Style card corners'],['square','Square']]});
  field(parent,'Entrance',cfg.entrance||'none','select',v=>setCardConfigValue(collection,'entrance',v),{choices:[['none','None'],['fade','Fade in'],['rise','Fade + rise']]});
  field(parent,'Hover behaviour',cfg.hover||'none','select',v=>setCardConfigValue(collection,'hover',v),{choices:[['none','None'],['lift','Lift'],['zoom','Image zoom'],['liftZoom','Lift + image zoom'],['scale','Subtle scale']]});
}

const PROGRAM_LAYOUT_GUIDANCE={
  rows:'Best with roughly 2–6 programs.',
  index:'Handles larger lists well — roughly 2–8+ programs.',
  strip:'Most effective with 2–4 programs; larger lists wrap into additional rows.',
  'cards-image':'Best with roughly 2–6 programs; cards wrap automatically.',
  'cards-text':'Handles roughly 2–8 programs well as a compact overview.',
  'cards-highlight':'Designed for 2–4 programs; large cards prioritise fast scanning and clear audience fit.',
  alternating:'Most effective with roughly 2–5 programs.'
};
function programCollectionFor(root){
  let found=null;
  const visit=nodes=>{for(const node of nodes||[]){if(node?.type==='group'&&node.role==='programCollection'){found=node;return true}if(visit(node?.children))return true}return false};
  if(isSection(root))visit(root.elements);else if(root?.type==='group'&&root.role==='programCollection')found=root;else visit(root?.children);
  return found;
}
function programItemAncestor(node){
  let current=node;
  while(current){if(current.role==='programItem')return current;current=parentInfo(current.id)?.parent}
  return null;
}
function programItemTitle(item){
  let title='Program';
  walk(item?.children,node=>{if(node.role==='programTitle'&&node.text)title=node.text});
  return title;
}
function programItemNode(item,role){
  let found=null;walk(item?.children,node=>{if(!found&&node.role===role)found=node});return found;
}
function syncProgramCollection(collection){
  if(!collection||collection.role!=='programCollection')return;
  const items=(collection.children||[]).filter(n=>n?.role==='programItem');
  items.forEach((item,index)=>{
    const idx=programItemNode(item,'programIndex');if(idx)idx.text=String(index+1).padStart(2,'0');
    item.name=programItemTitle(item);
  });
  const layout=collection.programLayout||'rows';
  collection.baseStyle=collection.baseStyle||{};collection.baseResponsive=collection.baseResponsive||{};
  if(layout==='strip'){
    const count=Math.max(1,items.length);
    collection.baseStyle.direction='grid';
    collection.baseStyle.columns=count<=4?count:3;
    collection.baseResponsive.tablet={...(collection.baseResponsive.tablet||{}),columns:count===1?1:2};
    collection.baseResponsive.mobile={...(collection.baseResponsive.mobile||{}),direction:'column'};
  }
  if(layout==='cards-image'||layout==='cards-text'||layout==='cards-highlight'){
    const count=Math.max(1,items.length);
    collection.baseStyle.direction='grid';
    collection.baseStyle.columns=count<=4?count:3;
    collection.baseResponsive.tablet={...(collection.baseResponsive.tablet||{}),columns:count===1?1:2};
    collection.baseResponsive.mobile={...(collection.baseResponsive.mobile||{}),direction:'column'};
  }
  if(layout==='alternating'){
    items.forEach((item,index)=>{
      const image=programItemNode(item,'programImage'),copy=programItemNode(item,'programAltCopy');
      if(!image||!copy)return;
      item.children=index%2===0?[image,copy]:[copy,image];
      image.baseResponsive=image.baseResponsive||{};copy.baseResponsive=copy.baseResponsive||{};
      image.baseResponsive.mobile={...(image.baseResponsive.mobile||{}),order:0};
      copy.baseResponsive.mobile={...(copy.baseResponsive.mobile||{}),order:1};
    });
  }
  if(layout==='featured'){
    items.forEach((item,index)=>{
      const featured=index===0,image=programItemNode(item,'programImage'),title=programItemNode(item,'programTitle');
      item.isFeatured=featured;
      item.baseStyle=item.baseStyle||{};
      Object.assign(item.baseStyle,{direction:'row',gap:featured?34:22,alignItems:'center',width:100,firstColumn:featured?48:24});
      item.baseResponsive=item.baseResponsive||{};
      item.baseResponsive.mobile={...(item.baseResponsive.mobile||{}),direction:'column',gap:16};
      if(image){image.baseStyle=image.baseStyle||{};image.baseStyle.height=featured?340:170;image.baseStyle.aspectRatio='4 / 3'}
      if(title)title.textScale=featured?{desktop:1,tablet:.92,mobile:.8}:{desktop:.76,tablet:.74,mobile:.72};
    });
  }  if(collection.cardCollection)syncCardCollection(collection);
}

function syncProgramCollections(){
  for(const {section} of projectSectionEntries(P))walk(section.elements,node=>{if(node.role==='programCollection')syncProgramCollection(node)});
}
function programCollectionParent(item){const info=parentInfo(item?.id);return info?.parent?.role==='programCollection'?info.parent:null}
function addProgramItem(collection){
  const items=(collection.children||[]).filter(n=>n?.role==='programItem');
  if(!items.length){toast('Keep at least one program item so a new one can inherit this layout.');return}
  const cp=clone(items[items.length-1]);regenerateNodeIds([cp]);
  const title=programItemNode(cp,'programTitle'),labelNode=programItemNode(cp,'programLabel'),desc=programItemNode(cp,'programDescription'),bulletTexts=programItemNodes(cp,'programBulletText');
  if(title)title.text='New program';if(labelNode)labelNode.text='NEW';if(desc)desc.text='Describe this program and who it is for.';bulletTexts.forEach((node,index)=>node.text=['Key benefit or outcome','Who this program is for','What the student can expect'][index]||'Program detail');
  cp.name='New program';collection.children.push(cp);syncProgramCollection(collection);selection=cp.id;activeScope='node';render();inspect();toast('Program added');
}
function duplicateProgramItem(item){
  const collection=programCollectionParent(item);if(!collection)return;
  const i=collection.children.indexOf(item),cp=clone(item);regenerateNodeIds([cp]);collection.children.splice(i+1,0,cp);syncProgramCollection(collection);selection=cp.id;activeScope='node';render();inspect();toast('Program duplicated');
}
function removeProgramItem(item){
  const collection=programCollectionParent(item);if(!collection)return;
  const items=collection.children.filter(n=>n?.role==='programItem');if(items.length<=1){toast('A Programs section needs at least one program.');return}
  const i=collection.children.indexOf(item);collection.children.splice(i,1);syncProgramCollection(collection);selection=collection.id;activeScope='node';render();inspect();toast('Program removed');
}
function moveProgramItem(item,delta){
  const collection=programCollectionParent(item);if(!collection)return;
  const i=collection.children.indexOf(item),j=i+delta;if(i<0||j<0||j>=collection.children.length)return;
  [collection.children[i],collection.children[j]]=[collection.children[j],collection.children[i]];syncProgramCollection(collection);render();inspect();
}
function featureProgramItem(item){
  const collection=programCollectionParent(item);if(!collection||collection.programLayout!=='featured')return;
  const i=collection.children.indexOf(item);if(i<=0)return;collection.children.splice(i,1);collection.children.unshift(item);syncProgramCollection(collection);render();inspect();toast(programItemTitle(item)+' is now featured');
}
function programCollectionControls(parent,collection){
  if(!collection)return;syncProgramCollection(collection);
  const items=(collection.children||[]).filter(n=>n?.role==='programItem');
  const note=document.createElement('p');note.className='card-note';note.textContent=`${items.length} program${items.length===1?'':'s'} · ${PROGRAM_LAYOUT_GUIDANCE[collection.programLayout]||'Add, remove and reorder programs as needed.'}`;parent.append(note);
  action(parent,'+ Add program',()=>addProgramItem(collection),'primary full');
  items.forEach((item,index)=>action(parent,`${String(index+1).padStart(2,'0')} · ${programItemTitle(item)}`,()=>select(item.id),'full'));
}
function programItemControls(parent,item){
  const collection=programCollectionParent(item);if(!collection)return;
  const note=document.createElement('p');note.className='card-note';note.textContent=collection.programLayout==='featured'&&collection.children[0]===item?'Featured program':'Program item';parent.append(note);
  action(parent,'Duplicate program',()=>duplicateProgramItem(item),'full');
  if(collection.programLayout==='featured'&&collection.children[0]!==item)action(parent,'Make featured',()=>featureProgramItem(item),'full');
  const row=document.createElement('div');row.className='quick-pair';parent.append(row);action(row,'Move up',()=>moveProgramItem(item,-1));action(row,'Move down',()=>moveProgramItem(item,1));
  action(parent,'Remove program',()=>removeProgramItem(item),'danger full');
}



const COACH_CONFIG_DEFAULT={intro:true,image:true,rank:true,bioMode:'short',credentials:false,cta:'none',social:false};
function coachCollectionFor(root){
  let found=null;
  const visit=nodes=>{for(const node of nodes||[]){if(node?.type==='group'&&node.coachCollection){found=node;return true}if(visit(node?.children))return true}return false};
  if(isSection(root))visit(root.elements);else if(root?.type==='group'&&root.coachCollection)found=root;else visit(root?.children);
  return found;
}
function coachCollectionParent(item){const info=parentInfo(item?.id);return info?.parent?.coachCollection?info.parent:null}
function coachItemAncestor(node){let current=node;while(current){if(current.role==='coachItem')return current;current=parentInfo(current.id)?.parent}return null}
function coachItemNode(item,role){let found=null;walk(item?.children,node=>{if(!found&&node.role===role)found=node});return found}
function coachItemNodes(item,role){const out=[];walk(item?.children,node=>{if(node.role===role)out.push(node)});return out}
function coachItemName(item){return coachItemNode(item,'coachName')?.text||item?.name||'Coach'}
function coachSectionFor(collection){let cur=collection;while(cur){if(isSection(cur))return cur;cur=parentInfo(cur.id)?.parent}return null}
function ensureCoachConfig(collection){if(!collection)return clone(COACH_CONFIG_DEFAULT);collection.coachConfig={...COACH_CONFIG_DEFAULT,...(collection.coachConfig||{})};return collection.coachConfig}
function setCoachVisible(node,visible){if(!node)return;node.baseStyle=node.baseStyle||{};node.baseStyle.visible=!!visible}
function syncCoachCollection(collection){
  if(!collection?.coachCollection)return;
  const cfg=ensureCoachConfig(collection),layout=collection.coachLayout||'cards',items=(collection.children||[]).filter(n=>n?.role==='coachItem');
  if(collection.cardCollection)syncCardCollection(collection);
  const section=coachSectionFor(collection),intro=section?(()=>{let x=null;walk(section.elements,n=>{if(!x&&n.role==='coachIntro')x=n});return x})():null;
  setCoachVisible(intro,cfg.intro!==false);
  items.forEach((item,index)=>{
    item.name=coachItemName(item);
    const image=coachItemNode(item,'coachImage'),rank=coachItemNode(item,'coachRank'),bio=coachItemNode(item,'coachBio'),credentials=coachItemNodes(item,'coachCredentials'),cta=coachItemNode(item,'coachCta'),social=coachItemNode(item,'coachSocial'),actions=coachItemNode(item,'coachActions'),idx=coachItemNode(item,'coachIndex');
    if(idx)idx.text=String(index+1).padStart(2,'0');
    if(layout!=='cards'){
      setCoachVisible(image,cfg.image!==false);setCoachVisible(rank,cfg.rank!==false);
      if(bio){bio.text=cfg.bioMode==='long'?(bio.coachBioLong||bio.text):(bio.coachBioShort||bio.text);setCoachVisible(bio,cfg.bioMode!=='none')}
      credentials.forEach(n=>setCoachVisible(n,cfg.credentials===true));
      setCoachVisible(cta,cfg.cta!=='none');if(cta)cta.buttonVariant=cfg.cta==='button'?'main':'text';
      setCoachVisible(social,cfg.social===true);if(actions)setCoachVisible(actions,cfg.cta!=='none'||cfg.social===true);
    }else{
      // Card media/body/CTA/rank are intentionally controlled by the shared Card primitive.
      credentials.forEach(n=>setCoachVisible(n,false));
      setCoachVisible(social,cfg.social===true);
    }
  });
  collection.baseStyle=collection.baseStyle||{};collection.baseResponsive=collection.baseResponsive||{};
  if(layout==='fullFeature'){
    collection.baseStyle.direction='column';collection.baseStyle.gap=0;
    items.forEach((item,index)=>{
      const image=coachItemNode(item,'coachImage'),panel=coachItemNode(item,'coachFeaturePanel');
      item.baseStyle=item.baseStyle||{};item.baseStyle.direction=cfg.image===false?'column':'row';item.baseStyle.firstColumn=58;
      if(image&&panel&&cfg.image!==false){item.children=index%2===0?[image,panel]:[panel,image];image.baseResponsive=image.baseResponsive||{};panel.baseResponsive=panel.baseResponsive||{};image.baseResponsive.tablet={...(image.baseResponsive.tablet||{}),order:0};panel.baseResponsive.tablet={...(panel.baseResponsive.tablet||{}),order:1};image.baseResponsive.mobile={...(image.baseResponsive.mobile||{}),order:0};panel.baseResponsive.mobile={...(panel.baseResponsive.mobile||{}),order:1}}
      if(panel&&cfg.image===false){panel.baseStyle=panel.baseStyle||{};panel.baseStyle.width=100}
    });
  }
  if(layout==='editorialProfile'){
    collection.baseStyle.direction='column';collection.baseStyle.gap=56;
    items.forEach(item=>{const body=coachItemNode(item,'coachEditorialBody');if(body){body.baseStyle=body.baseStyle||{};body.baseStyle.direction=cfg.image===false?'column':'row';body.baseStyle.firstColumn=38}});
  }
  if(layout==='cards'){
    const count=Math.max(1,items.length);collection.baseStyle.direction='grid';collection.baseStyle.columns=count<=4?count:3;collection.baseResponsive.tablet={...(collection.baseResponsive.tablet||{}),columns:count===1?1:2};collection.baseResponsive.mobile={...(collection.baseResponsive.mobile||{}),direction:'column'};
  }
  if(layout==='leadTeam'){
    const count=Math.max(1,items.length);collection.baseStyle.direction='grid';collection.baseStyle.columns=Math.min(3,Math.max(1,count-1||1));collection.baseResponsive.tablet={...(collection.baseResponsive.tablet||{}),columns:count<=2?1:2};collection.baseResponsive.mobile={...(collection.baseResponsive.mobile||{}),direction:'column'};
    items.forEach((item,index)=>{
      const image=coachItemNode(item,'coachImage'),copy=coachItemNode(item,'coachLeadCopy'),featured=index===0;item.isFeatured=featured;item.baseStyle=item.baseStyle||{};
      item.baseStyle.direction=cfg.image===false?'column':featured?'row':'column';item.baseStyle.gap=0;item.baseStyle.firstColumn=featured?50:50;item.baseResponsive=item.baseResponsive||{};if(featured){item.baseResponsive.tablet={...(item.baseResponsive.tablet||{}),direction:'column'};item.baseResponsive.mobile={...(item.baseResponsive.mobile||{}),direction:'column'}}
      if(image){image.baseStyle=image.baseStyle||{};image.baseStyle.height=featured?460:300;image.baseStyle.aspectRatio=featured?'4 / 3':'4 / 5'}
      if(copy){copy.baseStyle=copy.baseStyle||{};copy.baseStyle.padding=featured?40:22}
    });
  }
  if(layout==='minimalRoster'){
    const count=Math.max(1,items.length);collection.baseStyle.direction='grid';collection.baseStyle.columns=count<=2?count:2;collection.baseResponsive.tablet={...(collection.baseResponsive.tablet||{}),columns:2};collection.baseResponsive.mobile={...(collection.baseResponsive.mobile||{}),direction:'column'};
    items.forEach(item=>{item.baseStyle=item.baseStyle||{};item.baseStyle.direction=cfg.image===false?'column':'row';item.baseStyle.firstColumn=28});
  }
}
function syncCoachCollections(){for(const {section} of projectSectionEntries(P))if(section?.type==='team'){const collection=coachCollectionFor(section);if(collection)syncCoachCollection(collection)}}
function setCoachConfig(collection,key,value){const cfg=ensureCoachConfig(collection);cfg[key]=value;syncCoachCollection(collection);render();inspect()}
function addCoachItem(collection){
  const items=(collection.children||[]).filter(n=>n?.role==='coachItem');if(!items.length){toast('Keep at least one coach so a new one can inherit this layout.');return}
  const cp=clone(items[items.length-1]);regenerateNodeIds([cp]);const name=coachItemNode(cp,'coachName'),rank=coachItemNode(cp,'coachRank'),bio=coachItemNode(cp,'coachBio'),social=coachItemNode(cp,'coachSocial');
  if(name)name.text='New Coach';if(rank)rank.text='Coach · Rank';if(bio){bio.coachBioShort='Short introduction to this coach and what they teach.';bio.coachBioLong='Add a longer coaching story here when this layout calls for more detail about experience, teaching style and role at the academy.';bio.text=bio.coachBioShort}if(social)social.text='Instagram ↗';cp.name='New Coach';
  collection.children.push(cp);syncCoachCollection(collection);selection=cp.id;activeScope='node';render();inspect();toast('Coach added');
}
function duplicateCoachItem(item){const collection=coachCollectionParent(item);if(!collection)return;const i=collection.children.indexOf(item),cp=clone(item);regenerateNodeIds([cp]);collection.children.splice(i+1,0,cp);syncCoachCollection(collection);selection=cp.id;activeScope='node';render();inspect();toast('Coach duplicated')}
function removeCoachItem(item){const collection=coachCollectionParent(item);if(!collection)return;const items=collection.children.filter(n=>n?.role==='coachItem');if(items.length<=1){toast('A Coaches section needs at least one coach.');return}collection.children.splice(collection.children.indexOf(item),1);syncCoachCollection(collection);selection=collection.id;activeScope='node';render();inspect();toast('Coach removed')}
function moveCoachItem(item,delta){const collection=coachCollectionParent(item);if(!collection)return;const i=collection.children.indexOf(item),j=i+delta;if(i<0||j<0||j>=collection.children.length)return;[collection.children[i],collection.children[j]]=[collection.children[j],collection.children[i]];syncCoachCollection(collection);render();inspect()}
function featureCoachItem(item){const collection=coachCollectionParent(item);if(!collection||collection.coachLayout!=='leadTeam')return;const i=collection.children.indexOf(item);if(i<=0)return;collection.children.splice(i,1);collection.children.unshift(item);syncCoachCollection(collection);render();inspect();toast(coachItemName(item)+' is now featured')}
function coachCollectionControls(parent,collection){
  if(!collection)return;syncCoachCollection(collection);const cfg=ensureCoachConfig(collection),items=(collection.children||[]).filter(n=>n?.role==='coachItem'),cards=collection.coachLayout==='cards';
  const note=document.createElement('p');note.className='card-note';note.textContent=`${items.length} coach${items.length===1?'':'es'} · Add, remove and reorder coaches without changing the composition.`;parent.append(note);
  const section=coachSectionFor(collection);let hasIntro=false;if(section)walk(section.elements,node=>{if(node.role==='coachIntro')hasIntro=true});if(hasIntro)field(parent,'Section intro',cfg.intro!==false,'checkbox',v=>setCoachConfig(collection,'intro',v));
  if(!cards){field(parent,'Coach images',cfg.image!==false,'checkbox',v=>setCoachConfig(collection,'image',v));field(parent,'Rank / role',cfg.rank!==false,'checkbox',v=>setCoachConfig(collection,'rank',v));field(parent,'Bio',cfg.bioMode||'short','select',v=>setCoachConfig(collection,'bioMode',v),{choices:[['none','None'],['short','Short bio'],['long','Long bio']]});field(parent,'Credentials',cfg.credentials===true,'checkbox',v=>setCoachConfig(collection,'credentials',v));field(parent,'CTA',cfg.cta||'none','select',v=>setCoachConfig(collection,'cta',v),{choices:[['none','None'],['text','Text link'],['button','Button']]})}else{const info=document.createElement('p');info.className='hint';info.textContent='Image, rank/top detail, body and CTA are controlled by Card design for this layout.';parent.append(info)}
  field(parent,'Social link',cfg.social===true,'checkbox',v=>setCoachConfig(collection,'social',v));
  action(parent,'+ Add coach',()=>addCoachItem(collection),'primary full');
  items.forEach((item,index)=>action(parent,`${String(index+1).padStart(2,'0')} · ${coachItemName(item)}`,()=>select(item.id),'full'));
}
function coachItemControls(parent,item){
  const collection=coachCollectionParent(item);if(!collection)return;const featured=collection.coachLayout==='leadTeam'&&collection.children[0]===item;
  const note=document.createElement('p');note.className='card-note';note.textContent=featured?'Featured coach':'Coach item';parent.append(note);
  action(parent,'Duplicate coach',()=>duplicateCoachItem(item),'full');if(collection.coachLayout==='leadTeam'&&!featured)action(parent,'Make featured',()=>featureCoachItem(item),'full');
  const row=document.createElement('div');row.className='quick-pair';parent.append(row);action(row,'Move up',()=>moveCoachItem(item,-1));action(row,'Move down',()=>moveCoachItem(item,1));action(parent,'Remove coach',()=>removeCoachItem(item),'danger full');
}

function linkField(parent,n){
  inferLinkModel(n);
  const type=n.linkType||'page';
  field(parent,'Link target',type,'select',v=>{
    n.linkType=v;
    if(v==='page'&&!n.linkPageId)n.linkPageId='';
    if(v==='section'&&!n.linkSectionId)n.linkSectionId='';
    if(['url','email','phone'].includes(v)&&n.linkValue===undefined)n.linkValue='';
    syncLinkHref(n);
    render();inspect();
  },{choices:[
    ['page','Page'],
    ['section','Section / anchor'],
    ['url','External / custom URL'],
    ['email','Email'],
    ['phone','Phone']
  ]});

  if(type==='page'){
    field(parent,'Page',n.linkPageId||'','select',v=>{
      n.linkPageId=v;
      syncLinkHref(n);render();inspect();
    },{choices:[['','Choose a page'],...P.pages.map(page=>[page.id,page.name+' — '+page.slug])]});
  }else if(type==='section'){
    const choices=[['','Choose a Section']];
    for(const page of P.pages)for(const section of page.sections)choices.push([section.id,page.name+' — '+label(section)]);
    field(parent,'Section',n.linkSectionId||'','select',v=>{
      n.linkSectionId=v;
      if(v){
        const target=findSectionTarget(P,v);
        if(target)ensureSectionAnchor(target.section,target.page);
      }
      syncLinkHref(n);render();inspect();
    },{choices});
  }else if(type==='url'){
    field(parent,'URL',n.linkValue||'','text',v=>{n.linkValue=v;syncLinkHref(n);render()});
  }else if(type==='email'){
    field(parent,'Email address',n.linkValue||'','email',v=>{n.linkValue=v;syncLinkHref(n);render()});
  }else if(type==='phone'){
    field(parent,'Phone number',n.linkValue||'','tel',v=>{n.linkValue=v;syncLinkHref(n);render()});
  }

  const preview=document.createElement('p');
  preview.className='card-note link-preview';
  preview.textContent='Resolves to: '+resolvedLink(n);
  parent.append(preview);
}
function safeLink(v){return /^(https?:|mailto:|tel:|#|\/|\.\/)/i.test(v||'')?v:'#'}
function box(el,st){const fallback=named(st.radius,'corners')||0;const corner=v=>{if(v===undefined||v===null||v==='')return fallback;if(typeof v==='string'&&v.startsWith('@'))return named(v,'corners')||0;const n=Number(v);return Number.isFinite(n)?n:fallback};const tl=corner(st.radiusTopLeft),tr=corner(st.radiusTopRight),br=corner(st.radiusBottomRight),bl=corner(st.radiusBottomLeft);el.style.borderRadius=`${tl}px ${tr}px ${br}px ${bl}px`;const b=typeof st.border==='string'&&st.border.startsWith('@')?P.design.borders[st.border.slice(1)]:null;el.style.border=b?`${b.value}px ${b.line} ${colour(b.color)}`:typeof st.border==='number'?`${st.border}px solid ${P.design.colours.primary.value}`:'none';el.style.boxShadow=named(st.shadow,'shadows')||'none';if(st.background)el.style.background=colour(st.background);if(st.visible===false)el.style.display='none'}

function rowChildShares(parent,st=effective(parent)){
  const children=(parent?.children||[]).filter(Boolean);
  if(!children.length)return[];
  const explicit=children.map(ch=>{
    const v=effective(ch).basis;
    return Number.isFinite(Number(v))&&Number(v)>0?Number(v):null;
  });
  if(explicit.some(v=>v!==null)){
    const fallback=100/children.length;
    const raw=explicit.map(v=>v??fallback);
    const total=raw.reduce((a,b)=>a+b,0)||100;
    return raw.map(v=>v*100/total);
  }
  if(children.length===2&&Number.isFinite(Number(st.firstColumn))){
    const first=Math.max(5,Math.min(95,Number(st.firstColumn)));
    return[first,100-first];
  }
  return children.map(()=>100/children.length);
}
function rowChildShare(parent,child,st=effective(parent)){
  const index=(parent?.children||[]).indexOf(child);
  const shares=rowChildShares(parent,st);
  return shares[index]??(100/Math.max(1,(parent?.children||[]).length));
}
function writeChildBasis(child,value){
  const layer=target(child,'basis');
  // Keep enough precision for cross-row edge alignment to survive rerendering.
  // Inspector/readout presentation still rounds for humans.
  layer.basis=Math.round(value*100000)/100000;
}
function setRowChildShare(child,value){
  const info=parentInfo(child.id),parent=info?.parent;
  if(!parent||parent.type!=='group'||effective(parent).direction!=='row')return;
  const children=parent.children||[],index=children.indexOf(child);
  if(index<0||children.length<2)return;
  value=Math.max(10,Math.min(90,Number(value)||50));
  const shares=rowChildShares(parent);
  const others=shares.reduce((sum,v,i)=>sum+(i===index?0:v),0)||1;
  shares[index]=value;
  const remaining=100-value;
  for(let i=0;i<shares.length;i++)if(i!==index)shares[i]=remaining*(shares[i]/others);
  children.forEach((ch,i)=>writeChildBasis(ch,shares[i]));
  if(children.length===2){
    const layer=target(parent,'firstColumn');
    layer.firstColumn=shares[0];
  }
  render();inspect();
}
const ROW_SNAP_THRESHOLD_PX=12;
const ROW_STANDARD_SNAPS=[20,25,100/3,40,50,60,200/3,75,80];
let rowResizeState=null;

function rowSnapUI(){
  let guide=document.querySelector('#rowResizeSnapGuide');
  let readout=document.querySelector('#rowResizeReadout');
  if(!guide){
    guide=document.createElement('div');
    guide.id='rowResizeSnapGuide';
    guide.className='row-resize-snap-guide';
    document.body.append(guide);
  }
  if(!readout){
    readout=document.createElement('div');
    readout.id='rowResizeReadout';
    readout.className='row-resize-readout';
    document.body.append(readout);
  }
  return{guide,readout};
}
function clearRowSnapUI(){
  document.querySelector('#rowResizeSnapGuide')?.remove();
  document.querySelector('#rowResizeReadout')?.remove();
}
function rowGapCenterX(state,cumulative){
  // Canonical resize coordinate: centre of the actual rendered gap.
  // `available` and all gap values are measured from getBoundingClientRect(),
  // so editor scaling cannot introduce mixed coordinate systems.
  return state.contentStart+(cumulative/100)*state.available+state.gapBefore+state.dividerGap/2;
}
function rowCumulativeForGapCenter(state,x){
  return ((x-state.contentStart-state.gapBefore-state.dividerGap/2)/state.available)*100;
}

function rowGridGapCenterX(state,fraction){
  // Shared-grid geometry:
  // A grid fraction refers to the boundary between equal tracks separated by
  // this row's gutter. This produces the same physical gutter position for
  // 1/3 whether the row is 1/3+2/3 or 1/3+1/3+1/3.
  return state.contentStart+fraction*(state.contentSpan+state.dividerGap)-state.dividerGap/2;
}
function rowGridLabel(fraction){
  const known=[
    [1/5,'1/5'],[1/4,'1/4'],[1/3,'1/3'],[2/5,'2/5'],[1/2,'1/2'],
    [3/5,'3/5'],[2/3,'2/3'],[3/4,'3/4'],[4/5,'4/5']
  ];
  const hit=known.find(([v])=>Math.abs(v-fraction)<.0001);
  return hit?hit[1]+' grid':Math.round(fraction*1000)/10+'% grid';
}

function rowStandardSnapTargets(parent){
  const children=parent?.children||[];
  const targets=[...ROW_STANDARD_SNAPS];
  for(let i=1;i<children.length;i++)targets.push(100*i/children.length);
  return [...new Set(targets.map(v=>Math.round(v*1000)/1000))]
    .filter(v=>v>0&&v<100)
    .sort((a,b)=>a-b);
}
function rowCrossSnapCandidates(state){
  const currentInfo=parentInfo(state.parentId);
  const sectionId=currentInfo?.section?.id;
  const currentMidY=state.rect.top+state.rect.height/2;
  if(!sectionId)return[];

  const candidates=[];
  document.querySelectorAll('#canvas .row-resize-handle').forEach(handle=>{
    const otherParentId=handle.dataset.rowParentId;
    const dividerIndex=Number(handle.dataset.dividerIndex);
    if(!otherParentId||otherParentId===state.parentId||!Number.isInteger(dividerIndex))return;

    const info=parentInfo(otherParentId);
    if(info?.section?.id!==sectionId)return;

    const otherParent=find(otherParentId);
    const leftChild=otherParent?.children?.[dividerIndex];
    const rightChild=otherParent?.children?.[dividerIndex+1];
    if(!leftChild||!rightChild)return;

    const leftEl=document.querySelector(`#canvas .node[data-id="${CSS.escape(leftChild.id)}"]`);
    const rightEl=document.querySelector(`#canvas .node[data-id="${CSS.escape(rightChild.id)}"]`);
    const parentEl=document.querySelector(`#canvas .node[data-id="${CSS.escape(otherParentId)}"]`);
    if(!leftEl||!rightEl||!parentEl)return;

    const leftRect=leftEl.getBoundingClientRect();
    const rightRect=rightEl.getBoundingClientRect();
    const parentRect=parentEl.getBoundingClientRect();
    const gap=Math.max(0,rightRect.left-leftRect.right);
    const gapCentre=(leftRect.right+rightRect.left)/2;
    const midY=parentRect.top+parentRect.height/2;

    if(Math.abs(midY-currentMidY)>600)return;

    // A gap only aligns to another gap of the same rendered width.
    // Small tolerance is for browser sub-pixel rounding only.
    if(Math.abs(gap-state.dividerGap)>0.75)return;

    candidates.push({
      x:gapCentre,
      gap,
      type:'gap',
      label:'Align gap'
    });
  });
  return candidates;
}
function formatRowShares(shares){
  return shares.map(v=>{
    const rounded=Math.round(v*10)/10;
    return Math.abs(rounded-Math.round(rounded))<.05
      ?String(Math.round(rounded))
      :rounded.toFixed(1);
  }).join(' / ');
}
function showRowResizeUI(state,shares,{snapX=null,snapType='',snapLabel='',alt=false}={}){
  const {guide,readout}=rowSnapUI();
  const cumulative=shares.slice(0,state.index+1).reduce((a,b)=>a+b,0);
  const x=snapX??rowGapCenterX(state,cumulative);
  const sectionEl=document.querySelector(`#canvas .page-section[data-id="${CSS.escape(parentInfo(state.parentId)?.section?.id||'')}"]`);
  const sectionRect=sectionEl?.getBoundingClientRect();
  const top=sectionRect?.top??state.rect.top;
  const bottom=sectionRect?.bottom??state.rect.bottom;

  guide.style.left=x+'px';
  guide.style.top=top+'px';
  guide.style.height=Math.max(1,bottom-top)+'px';
  guide.classList.toggle('active',snapX!=null&&!alt);
  guide.classList.toggle('alignment',snapType==='gap');

  readout.style.left=x+'px';
  readout.style.top=Math.max(8,state.rect.top-34)+'px';
  const suffix=alt?' · free':snapType==='gap'?' · gap aligned':snapType==='grid'&&snapLabel?' · '+snapLabel:snapX!=null?' · snap':'';
  readout.textContent=formatRowShares(shares)+suffix;
  readout.classList.toggle('snapped',snapX!=null&&!alt);
}
function beginRowResize(ev,parentId,index){
  const parent=find(parentId);
  if(!parent||effective(parent).direction!=='row')return;
  const el=ev.currentTarget.closest('.node[data-kind="group"]');
  const children=parent.children||[],shares=rowChildShares(parent);
  if(!el||index<0||index>=children.length-1)return;
  const rect=el.getBoundingClientRect();
  const childRects=children.map(ch=>
    document.querySelector(`#canvas .node[data-id="${CSS.escape(ch.id)}"]`)?.getBoundingClientRect()
  );
  if(childRects.some(r=>!r))return;

  const gaps=[];
  for(let i=0;i<childRects.length-1;i++){
    gaps.push(Math.max(0,childRects[i+1].left-childRects[i].right));
  }
  const available=Math.max(1,childRects.reduce((sum,r)=>sum+r.width,0));
  const gapBefore=gaps.slice(0,index).reduce((a,b)=>a+b,0);

  rowResizeState={
    pointerId:ev.pointerId,parentId,index,rect,
    contentStart:childRects[0].left,
    contentSpan:childRects.at(-1).right-childRects[0].left,
    available,
    gapBefore,
    dividerGap:gaps[index]||0,
    startX:ev.clientX,
    left:shares[index],right:shares[index+1],
    before:shares.slice(0,index).reduce((a,b)=>a+b,0),
    leftId:children[index].id,rightId:children[index+1].id,
    handle:ev.currentTarget
  };
  ev.currentTarget.setPointerCapture?.(ev.pointerId);
  document.body.classList.add('is-row-resizing');
  showRowResizeUI(rowResizeState,shares);
  ev.preventDefault();ev.stopPropagation();
}
function moveRowResize(ev){
  const s=rowResizeState;
  if(!s||ev.pointerId!==s.pointerId)return;
  const parent=find(s.parentId),left=find(s.leftId),right=find(s.rightId);
  if(!parent||!left||!right)return;

  const total=s.left+s.right;
  const delta=(ev.clientX-s.startX)/s.available*100;
  const min=Math.min(10,total/3);
  let nextLeft=Math.max(min,Math.min(total-min,s.left+delta));
  let snapX=null,snapType='',snapLabel='';

  if(!ev.altKey){
    const rawCumulative=s.before+nextLeft;
    const rawX=rowGapCenterX(s,rawCumulative);
    const minCumulative=s.before+min;
    const maxCumulative=s.before+total-min;
    const candidates=[];

    for(const percent of rowStandardSnapTargets(parent)){
      const fraction=percent/100;
      const x=rowGridGapCenterX(s,fraction);
      const target=rowCumulativeForGapCenter(s,x);
      if(target<minCumulative||target>maxCumulative)continue;
      candidates.push({
        distance:Math.abs(x-rawX),
        target,
        x,
        type:'grid',
        label:rowGridLabel(fraction)
      });
    }

    for(const other of rowCrossSnapCandidates(s)){
      const target=rowCumulativeForGapCenter(s,other.x);
      if(target<minCumulative||target>maxCumulative)continue;
      candidates.push({
        distance:Math.abs(other.x-rawX),
        target,
        x:other.x,
        type:'gap'
      });
    }

    // Prefer true gap alignment when it is equally close to a ratio snap.
    candidates.sort((a,b)=>a.distance-b.distance||(a.type==='gap'?-1:1));
    const snap=candidates[0];
    if(snap&&snap.distance<=ROW_SNAP_THRESHOLD_PX){
      nextLeft=snap.target-s.before;
      snapX=snap.x;
      snapType=snap.type;
      snapLabel=snap.label||'';
    }
  }

  nextLeft=Math.max(min,Math.min(total-min,nextLeft));
  const nextRight=total-nextLeft;
  writeChildBasis(left,nextLeft);
  writeChildBasis(right,nextRight);

  if((parent.children||[]).length===2){
    const layer=target(parent,'firstColumn');
    layer.firstColumn=nextLeft;
  }

  const leftEl=document.querySelector(`#canvas .node[data-id="${CSS.escape(left.id)}"]`);
  const rightEl=document.querySelector(`#canvas .node[data-id="${CSS.escape(right.id)}"]`);
  if(leftEl){leftEl.style.flexGrow=String(nextLeft);leftEl.style.flexBasis='0px'}
  if(rightEl){rightEl.style.flexGrow=String(nextRight);rightEl.style.flexBasis='0px'}

  const shares=rowChildShares(parent);
  showRowResizeUI(s,shares,{snapX,snapType,snapLabel,alt:ev.altKey});
  ev.preventDefault();
}
function finishRowResize(ev){
  if(!rowResizeState||ev.pointerId!==rowResizeState.pointerId)return;
  rowResizeState=null;
  clearRowSnapUI();
  document.body.classList.remove('is-row-resizing');
  render();inspect();
}
document.addEventListener('pointermove',moveRowResize);
document.addEventListener('pointerup',finishRowResize);
document.addEventListener('pointercancel',finishRowResize);

function addRowResizeHandles(el,parent,st,stack){
  const children=parent.children||[];
  if(previewMode||stack||st.direction!=='row'||children.length<2)return;
  if(['navLayout','navLinks','footerLinks'].includes(parent.role))return;
  if(children.some(ch=>ch.type==='button'||ch.role==='brand'||ch.role==='navlink'))return;
  const shares=rowChildShares(parent,st),total=shares.reduce((a,b)=>a+b,0)||100;
  const gap=Number(named(st.gap,'spaces')??20)||0;
  let cumulative=0;
  for(let i=0;i<children.length-1;i++){
    cumulative+=shares[i];
    const ratio=cumulative/total;
    const handle=document.createElement('button');
    handle.type='button';
    handle.className='row-resize-handle';
    handle.title='Drag to resize columns · shared-grid and matching-gap snaps · hold Alt/Option for free movement';
    handle.setAttribute('aria-label','Resize columns');
    handle.dataset.rowParentId=parent.id;
    handle.dataset.dividerIndex=String(i);
    handle.style.left=`calc(${ratio*100}% - ${ratio*gap*(children.length-1)}px + ${gap*(i+.5)}px)`;
    handle.addEventListener('pointerdown',ev=>beginRowResize(ev,parent.id,i));
    handle.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation()});
    el.append(handle);
  }
}

function hasExplicitLayerOrder(n){
  const layers=[n?.style,n?.baseStyle,n?.responsive?.[device],n?.baseResponsive?.[device]];
  return layers.some(layer=>layer&&Object.prototype.hasOwnProperty.call(layer,'zIndex'));
}
function resolvedNodeLayerOrder(n,st){
  if(hasExplicitLayerOrder(n))return Number(st.zIndex)||0;
  return (Number(st.offsetX)||Number(st.offsetY))?2:(Number(st.zIndex)||0);
}

function resolvedTextSize(st,n){
  if(st.fluidSize){
    const min=Math.max(8,Number(st.fluidMin)||32);
    const max=Math.max(min,Number(st.fluidMax)||180);
    const vw=Math.max(.5,Number(st.fluidVw)||10);
    if(previewMode)return `clamp(${min}px, ${vw}vw, ${max}px)`;
    const width=logicalViewportWidth();
    return Math.max(min,Math.min(max,width*vw/100))+'px';
  }
  const size=Number(st.size)||16;
  const resolved=device==='mobile'&&!n.styleBindings?.size&&!n.responsive?.mobile?.size&&!n.baseResponsive?.mobile?.size?Math.min(size,n.type==='heading'?38:size):size;
  return resolved+'px';
}

function renderNode(n){const st=effective(n),group=n.type==='group';let el=document.createElement(group?'div':n.type==='heading'?((/^h[1-6]$/.test(n.tag)?n.tag:(/^h[1-6]$/.test(n.role)?n.role:'h2'))):n.type==='button'||n.href||n.linkType?'a':'div');el.className='node'+(selection===n.id?' selected':'');el.dataset.id=n.id;el.dataset.kind=n.type;el.dataset.role=n.role||'';if(n.cardPrimitive)el.dataset.cardPrimitive='true';if(n.cardHeaderMedia)el.dataset.cardHeaderMedia='true';if(n.galleryCollection){el.dataset.galleryCollection='true';el.dataset.galleryLayout=n.galleryLayout||'';const gc=n.galleryConfig||{};el.dataset.galleryAutoscroll=String(gc.autoscroll===true);el.dataset.galleryScrollSpeed=gc.scrollSpeed||'slow'}if(n.galleryCaption!==undefined)el.dataset.galleryCaption=n.galleryCaption||'';if(n.galleryShowCaption!==undefined)el.dataset.galleryShowCaption=String(n.galleryShowCaption!==false);const interaction=nodeInteraction(n);if(interaction.recipe!=='none')el.dataset.interactionRecipe=interaction.recipe;if(interaction.role!=='none')el.dataset.interactionRole=interaction.role;if(interaction.key)el.dataset.interactionKey=interaction.key;if(interaction.defaultKey)el.dataset.interactionDefault=interaction.defaultKey;if(interaction.lightboxGroup)el.dataset.lightboxGroup=interaction.lightboxGroup;const motion=nodeMotion(n);if(motion.reveal!=='none')el.dataset.motionReveal=motion.reveal;if(motion.hover!=='none')el.dataset.motionHover=motion.hover;el.style.setProperty('--motion-node-delay',Math.max(0,motion.delay)+'ms');el.style.order=String(Number.isFinite(Number(st.order))?Number(st.order):0);el.style.margin=`${Number(st.marginTop)||0}px ${Number(st.marginRight)||0}px ${Number(st.marginBottom)||0}px ${Number(st.marginLeft)||0}px`;const moved=!!(Number(st.offsetX)||Number(st.offsetY)),resolvedLayer=resolvedNodeLayerOrder(n,st);if(moved||resolvedLayer||hasExplicitLayerOrder(n)){el.style.position='relative';el.style.left=(Number(st.offsetX)||0)+'px';el.style.top=(Number(st.offsetY)||0)+'px';el.style.zIndex=String(resolvedLayer)}if(n.isLayoutSlot)el.classList.add('layout-slot');if(n.isLayoutScaffold)el.classList.add('layout-scaffold');if(n.builderLayout)el.classList.add('builder-layout-root');if(!group&&canReorderElement(n.id)){el.draggable=true;el.classList.add('element-draggable');el.title='Drag to reorder within '+label(parentInfo(n.id).parent);el.addEventListener('dragstart',ev=>{ev.stopPropagation();startElementDrag(ev,n.id)});el.addEventListener('dragend',finishDrag)}if(group&&canReorderContainer(n.id)){el.draggable=true;el.classList.add('container-draggable');el.title='Drag to reorder Container within '+label(parentInfo(n.id).parent);el.addEventListener('dragstart',ev=>{ev.stopPropagation();startContainerDrag(ev,n.id)});el.addEventListener('dragend',finishDrag)}box(el,st);if(n.accentMarker){el.dataset.styleAccent='true';el.style.setProperty('--site-accent',colour('$accent'))}if(group){
 const sectionInfo=parentInfo(n.id);
 if(!previewMode){
   const handle=document.createElement('button');
   handle.type='button';
   handle.className='container-select-handle';
   const handleDepth=Math.max(0,pathTo(n.id).filter(x=>x.type==='group'&&!x.isLayoutScaffold).length-1);
   handle.style.setProperty('--container-handle-offset',(4+Math.min(handleDepth,6)*26)+'px');
   handle.textContent='▧';
   handle.title='Select Container';
   handle.draggable=false;
   handle.addEventListener('pointerdown',ev=>{ev.preventDefault();ev.stopPropagation()});
   handle.addEventListener('dragstart',ev=>ev.preventDefault());
   handle.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();select(n.id)});
   el.append(handle);
 }
 el.style.display=st.visible===false?'none':st.direction==='grid'?'grid':'flex';let dir=st.direction;const stack=st.stack==='tablet'&&device!=='desktop'||st.stack==='mobile'&&device==='mobile';if(stack)dir='column';if(dir==='grid'){el.style.gridTemplateColumns=`repeat(${st.columns||3},minmax(0,1fr))`}else {if(stack)el.style.display='flex';el.style.flexDirection=dir==='row'?'row':'column'}el.style.gap=(named(st.gap,'spaces')??20)+'px';el.style.justifyContent=({start:'flex-start',end:'flex-end'}[st.justify]||st.justify);el.style.alignItems=({start:'flex-start',end:'flex-end'}[st.alignItems]||st.alignItems);el.style.flexWrap=st.wrap||'nowrap';el.style.width=st.width+'%';el.style.padding=(named(st.padding,'spaces')||0)+'px';el.style.overflow=st.overflow||'visible';if(n.role==='galleryFeatureIntroOuter'||n.containedModule){const inset=device==='desktop'?48:device==='tablet'?32:20;el.style.width=`calc(100% - ${inset*2}px)`;el.style.maxWidth='1440px';el.style.marginLeft='auto';el.style.marginRight='auto';if(n.role==='galleryFeatureIntroOuter')el.style.padding='0'}if(n.galleryCollection&&n.galleryRowHeight){const rh=n.galleryRowHeight?.[device]??n.galleryRowHeight?.desktop??0;if(rh)el.style.gridAutoRows=rh+'px'}for(const ch of n.children||[]){const child=renderNode(ch);if(n.coachCollection&&n.coachLayout==='leadTeam'&&dir==='grid'&&n.children?.[0]===ch)child.style.gridColumn='1 / -1';if(n.galleryCollection&&ch.gallerySpan){const span=ch.gallerySpan?.[device]||ch.gallerySpan?.desktop;if(span){child.style.gridColumn='span '+Math.max(1,Number(span.col)||1);child.style.gridRow='span '+Math.max(1,Number(span.row)||1)}}if(n.galleryCollection&&ch.galleryFillCell&&device!=='mobile'){child.style.height='100%';child.style.minHeight='0';child.style.alignSelf='stretch'}if(stack&&!Object.hasOwn(ch.responsive?.[device]||{},'width'))child.style.width='100%';if(dir==='row'){
 const inlineLinks=['navLinks','footerLinks'].includes(n.role);
 if(inlineLinks||ch.type==='button'||ch.role==='brand'){child.style.flex='0 0 auto';child.style.width='auto';child.style.whiteSpace='nowrap'}
 else if(n.role==='navLayout'){child.style.flex='1 0 auto';child.style.width='auto';child.style.minWidth='max-content'}
 else{
   const share=rowChildShare(n,ch,st);
   child.style.flex=`${share} 1 0`;
   child.style.flexBasis='0px';
   child.style.width='0';
   child.style.minWidth='0';
 }
 }el.append(child)}
 if(n.galleryCollection&&n.galleryLayout==='rail'){
   el.classList.add('gallery-scroll-rail');el.style.display='flex';el.style.flexDirection='row';el.style.flexWrap='nowrap';el.style.overflowX='auto';el.style.overflowY='hidden';el.style.scrollSnapType='x mandatory';el.style.webkitOverflowScrolling='touch';
   const basis=device==='desktop'?'29%':device==='tablet'?'44%':'82%';
   for(const child of [...el.children].filter(x=>x.classList?.contains('image-node'))){child.style.flex=`0 0 ${basis}`;child.style.width=basis;child.style.minWidth='0';child.style.scrollSnapAlign='start'}
 }else if(n.galleryCollection&&n.galleryLayout==='featureRail'){
   el.classList.add('gallery-feature-rail');el.style.display='flex';el.style.flexDirection='column';el.style.overflow='visible';
   const cfg=n.galleryConfig||{},inset=device==='desktop'?48:device==='tablet'?32:20;
   const applyModuleWidth=(node,mode)=>{node.style.boxSizing='border-box';if(mode==='full'){node.style.width='100%';node.style.maxWidth='none';node.style.marginLeft='0';node.style.marginRight='0'}else{node.style.width=`calc(100% - ${inset*2}px)`;node.style.maxWidth='1440px';node.style.marginLeft='auto';node.style.marginRight='auto'}};
   const images=[...el.children].filter(x=>x.classList?.contains('image-node'));
   if(images.length){const lead=images[0];lead.classList.add('gallery-feature-lead');lead.style.flex='0 0 auto';applyModuleWidth(lead,cfg.leadWidth||'contained');if(images.length>1){const rail=document.createElement('div');rail.className='gallery-scroll-rail gallery-supporting-rail';rail.dataset.galleryAutoscroll=String(cfg.autoscroll===true);rail.dataset.galleryScrollSpeed=cfg.scrollSpeed||'slow';rail.style.gap=(named(st.gap,'spaces')??20)+'px';applyModuleWidth(rail,cfg.railWidth||'contained');const basis=device==='desktop'?'30%':device==='tablet'?'45%':'82%';for(const child of images.slice(1)){child.style.flex=`0 0 ${basis}`;child.style.width=basis;child.style.minWidth='0';child.style.scrollSnapAlign='start';rail.append(child)}el.append(rail)}}
 }
 addRowResizeHandles(el,n,st,stack);
 if(!(n.children||[]).length){
   const empty=document.createElement('div');
   empty.className='empty-container-placeholder';
   empty.innerHTML=n.isLayoutSlot?'<b>'+esc(n.name||'Empty Slot')+'</b><span>Add content here</span>':'<b>Empty Container</b><span>Add a Container or Element from the library</span>';
   el.append(empty);
 }
 return el}
if(n.type==='image'){
 el.classList.add('image-node');
 const mode=['fill','fixed','ratio'].includes(st.frameMode)?st.frameMode:'fixed';
 el.dataset.frameMode=mode;
 el.classList.toggle('image-fill',mode==='fill');
 el.classList.toggle('image-ratio',mode==='ratio');
 el.classList.toggle('image-fixed',mode==='fixed');
 el.style.opacity=st.opacity;
 el.style.width='100%';
 if(n.heroWideMedia){const inset=device==='desktop'?48:device==='tablet'?32:20;if((n.mediaWidth||'full')==='contained'){el.style.width=`calc(100% - ${inset*2}px)`;el.style.maxWidth='1440px';el.style.marginLeft='auto';el.style.marginRight='auto'}else{el.style.width='100%';el.style.maxWidth='none';el.style.marginLeft='0';el.style.marginRight='0';el.style.borderRadius='0px'}}
 el.style.aspectRatio='';
 el.style.alignSelf='';
 if(mode==='fixed'){
   el.style.height=st.height+'px';
   el.style.minHeight=st.height+'px';
   el.style.flex='0 0 auto';
 }else if(mode==='ratio'){
   el.style.height='auto';
   el.style.minHeight='0';
   el.style.aspectRatio=st.aspectRatio||'4 / 3';
   el.style.flex='0 0 auto';
 }else{
   el.style.height='auto';
   el.style.minHeight=st.height+'px';
   el.style.flex='1 1 '+st.height+'px';
   el.style.alignSelf='stretch';
 }
 const src=assetUrl(n.assetId)||n.src||'';
 if(src){
   const img=document.createElement('img');
   img.src=src;img.alt=n.alt||'';
   img.style.objectFit=st.fit;img.style.objectPosition=(Number.isFinite(Number(st.focalX))&&st.focalX!==null&&st.focalX!==''&&Number.isFinite(Number(st.focalY))&&st.focalY!==null&&st.focalY!=='')?`${Number(st.focalX)}% ${Number(st.focalY)}%`:st.position;
   el.append(img);
 }else el.innerHTML='<div class="image-placeholder">Select to add an image</div>';
 return el
}
el.textContent=n.text||'';el.style.fontFamily=st.font||'Arial';el.style.fontSize=resolvedTextSize(st,n);el.style.fontWeight=st.weight;el.style.lineHeight=st.lineHeight;el.style.letterSpacing=(st.letterSpacing||0)+'px';el.style.color=colour(st.color);el.style.textAlign=st.align;el.style.textDecoration=st.underline||'none';el.style.maxWidth=st.maxWidth?st.maxWidth+'px':'100%';el.style.whiteSpace=st.whiteSpace||'normal';el.style.overflowWrap=st.whiteSpace==='nowrap'?'normal':'break-word';if(n.href||n.linkType){el.href=safeLink(resolvedLink(n));el.onmouseenter=()=>el.style.color=colour(st.hoverColor||st.color);el.onmouseleave=()=>el.style.color=colour(st.color)};
if(n.type==='button'){el.classList.add('button-node');el.href=safeLink(resolvedLink(n));el.style.padding=`${named(st.padY,'spaces')}px ${named(st.padX,'spaces')}px`;el.style.alignSelf=st.buttonWidth==='full'?'stretch':'flex-start';el.style.width=st.buttonWidth==='full'?'100%':'fit-content';el.style.setProperty('--hover-bg',colour(st.hoverBackground));el.style.setProperty('--hover-color',colour(st.hoverColor));el.style.setProperty('--focus-color',colour(st.focusColor));el.setAttribute('aria-disabled',n.disabled?'true':'false')}return el}

let dragState=null;
let activeDropIndex=null;
let elementDrop={parentId:null,index:null};

function clearDropMarker(){
  document.querySelectorAll('.section-drop-marker,.element-drop-marker,.container-drop-marker,.element-promote-zone,.container-promote-zone').forEach(x=>x.remove());
  document.querySelectorAll('.element-drop-target,.element-promote-parent,.container-drop-target,.container-promote-parent,.tree-drop-before,.tree-drop-after').forEach(x=>x.classList.remove('element-drop-target','element-promote-parent','container-drop-target','container-promote-parent','tree-drop-before','tree-drop-after'));
  activeDropIndex=null;elementDrop={parentId:null,index:null};
  document.body.classList.remove('is-section-dragging','is-element-dragging','is-container-dragging');
}
function placeDropMarker(index){
  const c=$('#canvas'); if(!c)return;
  document.querySelectorAll('.section-drop-marker').forEach(x=>x.remove());
  const marker=document.createElement('div');
  marker.className='section-drop-marker';
  marker.setAttribute('aria-hidden','true');
  marker.innerHTML='<span></span>';
  const sections=[...c.querySelectorAll('.page-section:not(.shared-section)')];
  const before=sections.find(x=>Number(x.dataset.sectionIndex)>=index);
  const footer=c.querySelector('.page-section.shared-section[data-shared-kind="footer"]');
  if(before)c.insertBefore(marker,before); else if(footer)c.insertBefore(marker,footer); else c.append(marker);
  activeDropIndex=index;
}
function dropIndexFromPointer(clientY){
  const sections=[...document.querySelectorAll('#canvas .page-section:not(.shared-section)')]
    .filter(x=>getComputedStyle(x).display!=='none');
  if(!sections.length)return currentSections().length;
  for(const el of sections){
    const r=el.getBoundingClientRect();
    if(clientY<r.top+r.height/2)return Number(el.dataset.sectionIndex);
  }
  return Number(sections.at(-1).dataset.sectionIndex)+1;
}

function sameSectionDropTarget(parent,sectionId){
  if(!parent||parent.type!=='group')return false;
  const info=parentInfo(parent.id);
  return !!(info?.section?.id&&info.section.id===sectionId);
}
function nodeContainsId(node,id){
  if(!node||!id)return false;
  let hit=false;
  walk(node.children||[],child=>{if(child.id===id)hit=true});
  return hit;
}
function dropParentElementFromEvent(target,kind){
  let el=target?.closest?.('.node[data-kind="group"]')||null;
  while(el){
    const parent=find(el.dataset.id);
    if(kind==='element'){
      if(sameSectionDropTarget(parent,dragState?.sectionId))return el;
    }else if(kind==='container'){
      const dragged=find(dragState?.containerId);
      if(dragged?.isLayoutSlot){
        if(parent?.id===dragState.sourceParentId)return el;
      }else if(
        sameSectionDropTarget(parent,dragState?.sectionId) &&
        parent.id!==dragState?.containerId &&
        !nodeContainsId(dragged,parent.id)
      ){
        return el;
      }
    }
    el=el.parentElement?.closest?.('.node[data-kind="group"]')||null;
  }
  return null;
}


function elementPromoteParent(){
  if(dragState?.kind!=='element')return null;
  const sourceInfo=parentInfo(dragState.sourceParentId);
  const parent=sourceInfo?.parent;
  if(!parent||parent.type!=='group'||!sameSectionDropTarget(parent,dragState.sectionId))return null;
  return parent;
}
function elementPromoteGeometry(){
  const parent=elementPromoteParent();
  if(!parent)return null;
  const el=document.querySelector(`#canvas .node[data-kind="group"][data-id="${CSS.escape(parent.id)}"]`);
  if(!el)return null;
  const r=el.getBoundingClientRect();
  const cs=getComputedStyle(el);
  const row=cs.display==='flex'&&cs.flexDirection.startsWith('row');
  const thickness=row
    ?Math.max(30,Math.min(78,r.width*.12))
    :Math.max(26,Math.min(62,r.height*.12));
  return{parent,el,r,row,thickness};
}
function clearElementPromoteZones(){
  document.querySelectorAll('.element-promote-zone').forEach(x=>x.remove());
  document.querySelectorAll('.element-promote-parent').forEach(x=>x.classList.remove('element-promote-parent'));
}
function renderElementPromoteZones(){
  clearElementPromoteZones();
  const g=elementPromoteGeometry();
  if(!g)return;
  const {parent,el,r,row,thickness}=g;
  el.classList.add('element-promote-parent');

  const make=(side,index,labelText)=>{
    const zone=document.createElement('div');
    zone.className='element-promote-zone '+side;
    zone.dataset.parentId=parent.id;
    zone.dataset.index=String(index);
    zone.setAttribute('aria-hidden','true');
    zone.innerHTML=`<span>${labelText}</span>`;
    if(row){
      zone.style.top=r.top+'px';
      zone.style.height=r.height+'px';
      zone.style.width=thickness+'px';
      zone.style.left=(side==='leading'?r.left:r.right-thickness)+'px';
    }else{
      zone.style.left=r.left+'px';
      zone.style.width=r.width+'px';
      zone.style.height=thickness+'px';
      zone.style.top=(side==='leading'?r.top:r.bottom-thickness)+'px';
    }
    document.body.append(zone);
  };
  make('leading',0,row?'Move out · left':'Move out · above');
  make('trailing',(parent.children||[]).length,row?'Move out · right':'Move out · below');
}
function elementPromoteDropFromPointer(clientX,clientY){
  const g=elementPromoteGeometry();
  if(!g)return null;
  const {parent,r,row,thickness}=g;
  const inside=clientX>=r.left&&clientX<=r.right&&clientY>=r.top&&clientY<=r.bottom;
  if(!inside)return null;

  if(row){
    if(clientX<=r.left+thickness)return{container:g.el,parentId:parent.id,index:0,side:'leading'};
    if(clientX>=r.right-thickness)return{container:g.el,parentId:parent.id,index:(parent.children||[]).length,side:'trailing'};
  }else{
    if(clientY<=r.top+thickness)return{container:g.el,parentId:parent.id,index:0,side:'leading'};
    if(clientY>=r.bottom-thickness)return{container:g.el,parentId:parent.id,index:(parent.children||[]).length,side:'trailing'};
  }
  return null;
}
function startElementDrag(ev,elementId){
  const info=parentInfo(elementId);
  if(!info||info.parent?.type!=='group'){ev.preventDefault();return}
  dragState={
    kind:'element',
    elementId,
    sourceParentId:info.parent.id,
    parentId:info.parent.id,
    sectionId:info.section.id
  };
  document.body.classList.add('is-element-dragging');
  ev.dataTransfer.effectAllowed='move';
  ev.dataTransfer.setData('text/plain','runa-element:'+elementId);
  requestAnimationFrame(()=>{
    document.querySelector(`[data-id="${CSS.escape(elementId)}"]`)?.classList.add('dragging-source');
    renderElementPromoteZones();
  });
}
function elementDropIndex(containerEl,parentId,clientX,clientY){
  const parent=find(parentId);
  if(!parent)return 0;
  const children=[...containerEl.children].filter(x=>x.classList.contains('node')&&x.dataset.id!==dragState.elementId&&getComputedStyle(x).display!=='none');
  const cs=getComputedStyle(containerEl);
  const row=cs.display==='flex'&&cs.flexDirection.startsWith('row');
  if(!children.length)return 0;
  for(const child of children){
    const r=child.getBoundingClientRect();
    const before=row?clientX<r.left+r.width/2:clientY<r.top+r.height/2;
    if(before){
      const id=child.dataset.id;
      const idx=(parent.children||[]).findIndex(n=>n.id===id);
      return idx<0?0:idx;
    }
  }
  return (parent.children||[]).length;
}
function placeElementDropMarker(containerEl,parentId,index){
  document.querySelectorAll('.element-drop-marker').forEach(x=>x.remove());
  document.querySelectorAll('.element-drop-target').forEach(x=>x.classList.remove('element-drop-target'));
  containerEl.classList.add('element-drop-target');
  const parent=find(parentId), original=(parent?.children||[]);
  const visible=[...containerEl.children].filter(x=>x.classList.contains('node')&&x.dataset.id!==dragState.elementId&&getComputedStyle(x).display!=='none');
  const cs=getComputedStyle(containerEl),row=cs.display==='flex'&&cs.flexDirection.startsWith('row');
  const marker=document.createElement('div');marker.className='element-drop-marker '+(row?'vertical':'horizontal');
  let refNode=null;
  if(index<original.length){
    const refId=original[index]?.id;
    if(refId!==dragState.elementId)refNode=visible.find(x=>x.dataset.id===refId)||null;
    else{
      const next=original.slice(index+1).find(x=>x.id!==dragState.elementId);
      refNode=next?visible.find(x=>x.dataset.id===next.id)||null:null;
    }
  }
  const r=(refNode||containerEl).getBoundingClientRect();
  if(row){
    const x=refNode?r.left:r.right;
    marker.style.left=(x-2)+'px';marker.style.top=r.top+'px';marker.style.height=r.height+'px';
  }else{
    const y=refNode?r.top:r.bottom;
    marker.style.left=r.left+'px';marker.style.top=(y-2)+'px';marker.style.width=r.width+'px';
  }
  document.body.append(marker);
  elementDrop={parentId,index};
}
function performElementDrop(parentId,index){
  if(dragState?.kind!=='element')return;
  const source=find(dragState.sourceParentId),target=find(parentId);
  const sourceChildren=source?.children,targetChildren=target?.children;
  if(!Array.isArray(sourceChildren)||!Array.isArray(targetChildren))return;
  if(!sameSectionDropTarget(target,dragState.sectionId))return;

  const from=sourceChildren.findIndex(n=>n.id===dragState.elementId);
  if(from<0)return;
  const [moved]=sourceChildren.splice(from,1);

  if(source===target&&index>from)index--;
  index=Math.max(0,Math.min(index,targetChildren.length));
  targetChildren.splice(index,0,moved);

  selection=moved.id;activeScope='node';
  const movedOut=source!==target&&target.id===elementPromoteParent()?.id;
  render();inspect();toast(label(moved)+(source===target?' moved':movedOut?' moved out one level':' moved to Container'));
}


function containerPromoteParent(){
  if(dragState?.kind!=='container')return null;
  const sourceParentInfo=parentInfo(dragState.sourceParentId);
  const parent=sourceParentInfo?.parent;
  if(!parent||parent.type!=='group'||!sameSectionDropTarget(parent,dragState.sectionId))return null;
  return parent;
}
function clearContainerPromoteZones(){
  document.querySelectorAll('.container-promote-zone').forEach(x=>x.remove());
  document.querySelectorAll('.container-promote-parent').forEach(x=>x.classList.remove('container-promote-parent'));
}
function renderContainerPromoteZones(){
  clearContainerPromoteZones();
  const parent=containerPromoteParent();
  if(!parent)return;
  const el=document.querySelector(`#canvas .node[data-kind="group"][data-id="${CSS.escape(parent.id)}"]`);
  if(!el)return;
  const r=el.getBoundingClientRect(),cs=getComputedStyle(el);
  const row=cs.display==='flex'&&cs.flexDirection.startsWith('row');
  const thickness=row?Math.max(30,Math.min(78,r.width*.12)):Math.max(26,Math.min(62,r.height*.12));
  el.classList.add('container-promote-parent');
  const make=(side,index,text)=>{
    const zone=document.createElement('div');
    zone.className='container-promote-zone '+side;
    zone.dataset.parentId=parent.id;zone.dataset.index=String(index);
    zone.innerHTML=`<span>${text}</span>`;
    if(row){
      zone.style.top=r.top+'px';zone.style.height=r.height+'px';zone.style.width=thickness+'px';
      zone.style.left=(side==='leading'?r.left:r.right-thickness)+'px';
    }else{
      zone.style.left=r.left+'px';zone.style.width=r.width+'px';zone.style.height=thickness+'px';
      zone.style.top=(side==='leading'?r.top:r.bottom-thickness)+'px';
    }
    document.body.append(zone);
  };
  make('leading',0,row?'Move out · left':'Move out · above');
  make('trailing',(parent.children||[]).length,row?'Move out · right':'Move out · below');
}
function containerPromoteDropFromPointer(clientX,clientY){
  const parent=containerPromoteParent();
  if(!parent)return null;
  const el=document.querySelector(`#canvas .node[data-kind="group"][data-id="${CSS.escape(parent.id)}"]`);
  if(!el)return null;
  const r=el.getBoundingClientRect(),cs=getComputedStyle(el);
  const row=cs.display==='flex'&&cs.flexDirection.startsWith('row');
  const thickness=row?Math.max(30,Math.min(78,r.width*.12)):Math.max(26,Math.min(62,r.height*.12));
  if(clientX<r.left||clientX>r.right||clientY<r.top||clientY>r.bottom)return null;
  if(row){
    if(clientX<=r.left+thickness)return{container:el,parentId:parent.id,index:0};
    if(clientX>=r.right-thickness)return{container:el,parentId:parent.id,index:(parent.children||[]).length};
  }else{
    if(clientY<=r.top+thickness)return{container:el,parentId:parent.id,index:0};
    if(clientY>=r.bottom-thickness)return{container:el,parentId:parent.id,index:(parent.children||[]).length};
  }
  return null;
}
function validContainerDropTarget(parent){
  if(!parent||parent.type!=='group')return false;
  const info=parentInfo(parent.id);
  if(!info?.section?.id)return false;
  if(dragState?.kind==='builder-container')return !!activePage()?.sections?.some(s=>s.id===info.section.id);
  if(dragState?.kind!=='container')return false;
  const moved=find(dragState.containerId);
  return sameSectionDropTarget(parent,dragState.sectionId)&&parent.id!==moved?.id&&!nodeContainsId(moved,parent.id);
}
function containerParentInsertTarget(parent,child,before=true){
  if(!parent||!child)return null;
  const info=parentInfo(parent.id),grand=info?.parent;
  if(!grand||grand.type!=='group'||!validContainerDropTarget(grand))return null;
  const grandEl=document.querySelector(`#canvas .node[data-kind="group"][data-id="${CSS.escape(grand.id)}"]`);
  if(!grandEl)return null;
  const parentIndex=(grand.children||[]).findIndex(n=>n.id===parent.id);
  if(parentIndex<0)return null;
  return{
    container:grandEl,
    parentId:grand.id,
    index:parentIndex+(before?0:1),
    level:'parent'
  };
}
function resolveContainerDropTarget(target,clientX,clientY){
  let candidateEl=target?.closest?.('.node[data-kind="group"]')||null;
  while(candidateEl){
    const candidate=find(candidateEl.dataset.id);
    if(validContainerDropTarget(candidate)){
      const info=parentInfo(candidate.id),parent=info?.parent;

      if(parent?.type==='group'&&validContainerDropTarget(parent)){
        const parentEl=document.querySelector(`#canvas .node[data-kind="group"][data-id="${CSS.escape(parent.id)}"]`);
        if(parentEl){
          const r=candidateEl.getBoundingClientRect();
          const pcs=getComputedStyle(parentEl);
          const row=pcs.display==='flex'&&pcs.flexDirection.startsWith('row');
          const childIndex=(parent.children||[]).findIndex(n=>n.id===candidate.id);

          // Main-axis edge = sibling inside the current parent.
          // Cross-axis edge = leave the current row/column and insert the
          // whole layout before/after that parent in the next level up.
          //
          // Example:
          // Root(column)
          //   Row(three columns)
          //
          // Dragging a 50/50 preset to the BOTTOM of any of those three
          // columns now means "below the Row", not "a fourth child in Row".
          const mainEdge=row
            ?Math.max(22,Math.min(55,r.width*.18))
            :Math.max(20,Math.min(48,r.height*.18));
          const crossEdge=row
            ?Math.max(18,Math.min(44,r.height*.22))
            :Math.max(18,Math.min(44,r.width*.22));

          if(row){
            const beforeParent=clientY<=r.top+crossEdge
              ?containerParentInsertTarget(parent,candidate,true)
              :null;
            if(beforeParent)return beforeParent;

            const afterParent=clientY>=r.bottom-crossEdge
              ?containerParentInsertTarget(parent,candidate,false)
              :null;
            if(afterParent)return afterParent;

            if(clientX<=r.left+mainEdge)return{
              container:parentEl,parentId:parent.id,index:Math.max(0,childIndex),level:'sibling'
            };
            if(clientX>=r.right-mainEdge)return{
              container:parentEl,parentId:parent.id,index:Math.max(0,childIndex+1),level:'sibling'
            };
          }else{
            const beforeParent=clientX<=r.left+crossEdge
              ?containerParentInsertTarget(parent,candidate,true)
              :null;
            if(beforeParent)return beforeParent;

            const afterParent=clientX>=r.right-crossEdge
              ?containerParentInsertTarget(parent,candidate,false)
              :null;
            if(afterParent)return afterParent;

            if(clientY<=r.top+mainEdge)return{
              container:parentEl,parentId:parent.id,index:Math.max(0,childIndex),level:'sibling'
            };
            if(clientY>=r.bottom-mainEdge)return{
              container:parentEl,parentId:parent.id,index:Math.max(0,childIndex+1),level:'sibling'
            };
          }
        }
      }

      // Centre of a Container means nest inside it.
      const index=containerDropIndex(candidateEl,candidate.id,clientX,clientY);
      return{container:candidateEl,parentId:candidate.id,index,level:'inside'};
    }
    candidateEl=candidateEl.parentElement?.closest?.('.node[data-kind="group"]')||null;
  }
  return null;
}
function startBuilderContainerDrag(ev,kind){
  dragState={kind:'builder-container',builderKind:kind,sectionId:activePage()?.id||''};
  document.body.classList.add('is-container-dragging');
  ev.dataTransfer.effectAllowed='copy';
  ev.dataTransfer.setData('text/plain','runa-builder-container:'+kind);
  requestAnimationFrame(()=>ev.currentTarget?.classList.add('dragging-source'));
}
function performBuilderContainerDrop(parentId,index){
  if(dragState?.kind!=='builder-container')return;
  const target=find(parentId);
  if(!target||target.type!=='group')return;
  const node=makeBuilderContainer(dragState.builderKind);
  index=Math.max(0,Math.min(index,(target.children||[]).length));
  target.children.splice(index,0,node);
  selection=node.id;activeScope='node';
  render();inspect();toast(label(node)+' added');
}

function startContainerDrag(ev,containerId){
  const info=parentInfo(containerId),node=find(containerId);
  if(!info||info.parent?.type!=='group'||!node){ev.preventDefault();return}
  dragState={
    kind:'container',
    containerId,
    sourceParentId:info.parent.id,
    parentId:info.parent.id,
    sectionId:info.section.id,
    layoutSlot:!!node.isLayoutSlot
  };
  document.body.classList.add('is-container-dragging');
  ev.dataTransfer.effectAllowed='move';
  ev.dataTransfer.setData('text/plain','runa-container:'+containerId);
  requestAnimationFrame(()=>{
    document.querySelector(`[data-id="${CSS.escape(containerId)}"]`)?.classList.add('dragging-source');
    renderContainerPromoteZones();
  });
}
function containerDropIndex(parentEl,parentId,clientX,clientY){
  const parent=find(parentId);
  if(!parent)return 0;
  const children=[...parentEl.children].filter(x=>x.classList.contains('node')&&x.dataset.id!==dragState.containerId&&getComputedStyle(x).display!=='none');
  const cs=getComputedStyle(parentEl);
  const row=cs.display==='flex'&&cs.flexDirection.startsWith('row');
  if(!children.length)return 0;
  for(const child of children){
    const r=child.getBoundingClientRect();
    const before=row?clientX<r.left+r.width/2:clientY<r.top+r.height/2;
    if(before){
      const id=child.dataset.id;
      const idx=(parent.children||[]).findIndex(n=>n.id===id);
      return idx<0?0:idx;
    }
  }
  return (parent.children||[]).length;
}
function placeContainerDropMarker(parentEl,parentId,index){
  document.querySelectorAll('.container-drop-marker').forEach(x=>x.remove());
  document.querySelectorAll('.container-drop-target').forEach(x=>x.classList.remove('container-drop-target'));
  parentEl.classList.add('container-drop-target');
  const parent=find(parentId),original=(parent?.children||[]);
  const visible=[...parentEl.children].filter(x=>x.classList.contains('node')&&x.dataset.id!==dragState.containerId&&getComputedStyle(x).display!=='none');
  const cs=getComputedStyle(parentEl),row=cs.display==='flex'&&cs.flexDirection.startsWith('row');
  const marker=document.createElement('div');marker.className='container-drop-marker '+(row?'vertical':'horizontal');
  let refNode=null;
  if(index<original.length){
    const refId=original[index]?.id;
    if(refId!==dragState.containerId)refNode=visible.find(x=>x.dataset.id===refId)||null;
    else{
      const next=original.slice(index+1).find(x=>x.id!==dragState.containerId);
      refNode=next?visible.find(x=>x.dataset.id===next.id)||null:null;
    }
  }
  const r=(refNode||parentEl).getBoundingClientRect();
  if(row){
    const x=refNode?r.left:r.right;
    marker.style.left=(x-2)+'px';marker.style.top=r.top+'px';marker.style.height=r.height+'px';
  }else{
    const y=refNode?r.top:r.bottom;
    marker.style.left=r.left+'px';marker.style.top=(y-2)+'px';marker.style.width=r.width+'px';
  }
  document.body.append(marker);
  elementDrop={parentId,index};
}
function performContainerDrop(parentId,index){
  if(dragState?.kind!=='container')return;
  const moved=find(dragState.containerId),source=find(dragState.sourceParentId),target=find(parentId);
  const sourceChildren=source?.children,targetChildren=target?.children;
  if(!moved||!Array.isArray(sourceChildren)||!Array.isArray(targetChildren))return;

  if(moved.isLayoutSlot){
    if(parentId!==dragState.sourceParentId)return;
  }else{
    if(!sameSectionDropTarget(target,dragState.sectionId)||target.id===moved.id||nodeContainsId(moved,target.id))return;
  }

  const from=sourceChildren.findIndex(n=>n.id===dragState.containerId);
  if(from<0)return;
  const [node]=sourceChildren.splice(from,1);

  if(source===target&&index>from)index--;
  index=Math.max(0,Math.min(index,targetChildren.length));
  targetChildren.splice(index,0,node);

  selection=node.id;activeScope='node';
  render();inspect();toast(label(node)+(source===target?' moved':' moved to Container'));
}

function startComponentDrag(ev,comp){
  dragState={kind:'component',componentId:comp.id};
  document.body.classList.add('is-section-dragging');
  ev.dataTransfer.effectAllowed='copy';
  ev.dataTransfer.setData('text/plain','runa-component:'+comp.id);
  requestAnimationFrame(()=>ev.currentTarget?.classList.add('dragging-source'));
}
function startSectionDrag(ev,sectionId){
  const section=find(sectionId);
  if(isSharedSection(section)){ev.preventDefault();toast('Site-wide Sections stay in their fixed region');return}
  dragState={kind:'section',sectionId};
  document.body.classList.add('is-section-dragging');
  ev.dataTransfer.effectAllowed='move';
  ev.dataTransfer.setData('text/plain','runa-section:'+sectionId);
  requestAnimationFrame(()=>ev.currentTarget?.closest('.page-section')?.classList.add('dragging-source'));
}
function finishDrag(){
  document.querySelectorAll('.dragging-source').forEach(x=>x.classList.remove('dragging-source'));
  dragState=null;
  clearDropMarker();
}
function performDrop(index){
  if(!dragState)return;
  const sections=currentSections();
  index=Math.max(0,Math.min(index,sections.length));
  if(dragState.kind==='component'){
    const comp=COMPONENTS.find(c=>c.id===dragState.componentId);
    if(!comp)return;
    if(sharedComponentKind(comp)){installSharedComponent(comp);return}
    const s=makeSection(comp);
    sections.splice(index,0,s);
    selection=s.id;
    activeScope='node';
    render();
    inspect();
    toast(comp.name+' added');
    return;
  }
  if(dragState.kind==='section'){
    const from=sections.findIndex(s=>s.id===dragState.sectionId);
    if(from<0)return;
    const [moved]=sections.splice(from,1);
    if(index>from)index--;
    index=Math.max(0,Math.min(index,sections.length));
    sections.splice(index,0,moved);
    selection=moved.id;
    activeScope='node';
    render();
    inspect();
    toast(moved.name+' moved');
  }
}

$('#canvas').addEventListener('dragover',ev=>{
  if(!dragState)return;
  ev.preventDefault();

  if(dragState.kind==='element'){
    ev.dataTransfer.dropEffect='move';

    // The edge bands of the source Container's parent explicitly mean
    // "move this Element out one level". This lets a nested Element become
    // a sibling again (for example restoring a Hero image beside its text).
    const promoted=elementPromoteDropFromPointer(ev.clientX,ev.clientY);
    if(promoted){
      placeElementDropMarker(promoted.container,promoted.parentId,promoted.index);
      document.querySelectorAll('.element-promote-zone').forEach(zone=>{
        zone.classList.toggle('active',zone.dataset.parentId===promoted.parentId&&Number(zone.dataset.index)===promoted.index);
      });
      return;
    }
    document.querySelectorAll('.element-promote-zone.active').forEach(x=>x.classList.remove('active'));

    const container=dropParentElementFromEvent(ev.target,'element');
    if(!container){
      document.querySelectorAll('.element-drop-marker').forEach(x=>x.remove());
      document.querySelectorAll('.element-drop-target').forEach(x=>x.classList.remove('element-drop-target'));
      elementDrop={parentId:null,index:null};
      return;
    }
    const parentId=container.dataset.id;
    const index=elementDropIndex(container,parentId,ev.clientX,ev.clientY);
    placeElementDropMarker(container,parentId,index);
    return;
  }

  if(dragState.kind==='container'){
    ev.dataTransfer.dropEffect='move';
    const promoted=containerPromoteDropFromPointer(ev.clientX,ev.clientY);
    if(promoted){
      placeContainerDropMarker(promoted.container,promoted.parentId,promoted.index);
      document.querySelectorAll('.container-promote-zone').forEach(zone=>{
        zone.classList.toggle('active',zone.dataset.parentId===promoted.parentId&&Number(zone.dataset.index)===promoted.index);
      });
      return;
    }
    document.querySelectorAll('.container-promote-zone.active').forEach(x=>x.classList.remove('active'));
    const target=resolveContainerDropTarget(ev.target,ev.clientX,ev.clientY);
    if(!target){
      document.querySelectorAll('.container-drop-marker').forEach(x=>x.remove());
      document.querySelectorAll('.container-drop-target').forEach(x=>x.classList.remove('container-drop-target'));
      elementDrop={parentId:null,index:null};
      return;
    }
    placeContainerDropMarker(target.container,target.parentId,target.index);
    return;
  }

  if(dragState.kind==='builder-container'){
    ev.dataTransfer.dropEffect='copy';
    const target=resolveContainerDropTarget(ev.target,ev.clientX,ev.clientY);
    if(!target){
      document.querySelectorAll('.container-drop-marker').forEach(x=>x.remove());
      document.querySelectorAll('.container-drop-target').forEach(x=>x.classList.remove('container-drop-target'));
      elementDrop={parentId:null,index:null};
      return;
    }
    placeContainerDropMarker(target.container,target.parentId,target.index);
    return;
  }

  ev.dataTransfer.dropEffect=dragState.kind==='component'?'copy':'move';
  placeDropMarker(dropIndexFromPointer(ev.clientY));
});
$('#canvas').addEventListener('drop',ev=>{
  if(!dragState)return;
  ev.preventDefault();
  if(dragState.kind==='element'){
    const pid=elementDrop.parentId,idx=elementDrop.index;
    if(pid!=null&&idx!=null)performElementDrop(pid,idx);
    finishDrag();return;
  }
  if(dragState.kind==='container'){
    const pid=elementDrop.parentId,idx=elementDrop.index;
    if(pid!=null&&idx!=null)performContainerDrop(pid,idx);
    finishDrag();return;
  }
  if(dragState.kind==='builder-container'){
    const pid=elementDrop.parentId,idx=elementDrop.index;
    if(pid!=null&&idx!=null)performBuilderContainerDrop(pid,idx);
    finishDrag();return;
  }
  const index=activeDropIndex??dropIndexFromPointer(ev.clientY);
  performDrop(index);
  finishDrag();
});
$('#canvas').addEventListener('dragleave',ev=>{
  if(!dragState)return;
  const r=$('#canvas').getBoundingClientRect();
  if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom){
    document.querySelectorAll('.section-drop-marker').forEach(x=>x.remove());
    activeDropIndex=null;
  }
});
document.addEventListener('dragend',finishDrag);

function render(){
  syncAcademySections();
  syncProgramCollections();
  syncGallerySections();
  syncCoachCollections();
  captureHistoryOnRender();
  syncAllLinkHrefs();
  renderPages();
  const viewport=$('#scroll'),previewTop=viewport.scrollTop,previewLeft=viewport.scrollLeft;
  const c=$('#canvas');
  c.replaceChildren();
  c.style.position='relative';
  c.style.background=P.design.colours.bg.value;
  c.style.color=P.design.colours.text.value;

  const sections=renderedSections();
  if(!sections.length)c.innerHTML='<div class="empty"><h2>Your next website starts here.</h2><p>Add a component from the left to start building.</p></div>';

  let pageSectionIndex=0;
  for(const s of sections){
    const st=effective(s),shared=isSharedSection(s),sharedKind=sharedSectionKind(s);
    const el=document.createElement('section');
    el.className='page-section'+(shared?' shared-section':'')+(selection===s.id?' selected':'');
    el.dataset.id=s.id;
    if(shared)el.dataset.sharedKind=sharedKind;
    else el.dataset.sectionIndex=pageSectionIndex++;
    if(s.anchor)el.id=s.anchor;
    box(el,st);
    el.style.color=colour(st.color);
    el.style.padding=`${named(st.top,'spaces')}px ${named(st.side,'spaces')}px ${named(st.bottom,'spaces')}px`;
    el.style.minHeight=st.minHeight==='screen'?Math.max(500,$('#scroll').clientHeight-24)+'px':st.minHeight+'px';

    const sectionBgImage=assetUrl(st.bgAssetId)||st.bgImage||'';
    if(sectionBgImage){
      el.style.backgroundImage=`linear-gradient(${rgba(colour(st.overlayColor),st.overlayOpacity)},${rgba(colour(st.overlayColor),st.overlayOpacity)}),url("${sectionBgImage}")`;
      el.style.backgroundSize=st.bgFit;
      el.style.backgroundPosition=st.bgPos;
      el.style.backgroundRepeat='no-repeat';
    }

    if(s.type==='navbar'){
      normalizeNavbar(s,{legacy:true});
      const mode=navbarPlacement(s);
      el.classList.add('navbar-section','navbar-'+mode);
      el.dataset.navMode=mode;
      el.dataset.navSectionId=s.id;
      el.dataset.smartInitial=s.smartInitial||'hero';
      el.dataset.navTransparent=String(!!s.navTransparent);
      el.style.setProperty('--nav-top-color',colour(s.navTopColor));
      el.style.setProperty('--nav-solid-bg',colour(s.navTransparent?s.navScrolledBackground:st.background));
      el.style.setProperty('--nav-solid-color',colour(s.navTransparent?s.navScrolledColor:st.color));
      el.style.zIndex='40';
      if(mode==='sticky'||mode==='smart')el.style.position='sticky';
      else if(mode==='overlay'){
        el.style.position='absolute';
        el.style.top='0';el.style.left='0';el.style.right='0';el.style.width='100%';
      }
      if(s.navTransparent)el.classList.add('navbar-transparent-top');
    }

    el.style.display=st.visible===false?'none':'flex';
    el.style.flexDirection='column';
    el.style.justifyContent=({top:'flex-start',center:'center',bottom:'flex-end'}[st.vAlign]);

    const wrap=document.createElement('div');
    wrap.style.width='100%';
    wrap.style.maxWidth=st.contentWidth?st.contentWidth+'px':'none';
    wrap.style.margin='0 auto';
    s.elements.forEach(n=>wrap.append(renderNode(n)));
    if(s.type==='navbar')enhanceMobileNavbar(s,wrap);
    if(!s.elements.length){
      const empty=document.createElement('div');
      empty.className='empty-section-placeholder';
      empty.innerHTML='<b>Empty Section</b><span>Add a Container or Element from the library</span>';
      wrap.append(empty);
    }

    const title=document.createElement('span');
    title.className='section-name'+(shared?' shared-section-name':' section-drag-handle');
    title.textContent=shared?'◆ SITE-WIDE · '+s.name:'⋮⋮  '+s.name;
    title.title=shared?'This Section is shared across every page':'Drag to reorder section';
    if(!shared){
      title.draggable=true;
      title.addEventListener('dragstart',ev=>{ev.stopPropagation();startSectionDrag(ev,s.id)});
      title.addEventListener('dragend',finishDrag);
    }
    el.append(title,wrap);
    c.append(el);
  }

  renderTree();
  viewport.scrollTop=previewTop;
  viewport.scrollLeft=previewLeft;
  syncNavbarScrollState(viewport);
  if(previewMode)requestAnimationFrame(setupSimplePreviewInteractions);
  else requestAnimationFrame(syncEditorViewport);
}
function rgba(hex,a){if(!/^#[0-9a-f]{6}$/i.test(hex))hex='#000000';return`rgba(${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)},${a})`}
function select(id){selection=id;activeScope=id?'node':'style';render();inspect()}

let canvasContextMenu=null;

function closeCanvasContextMenu(){
  if(canvasContextMenu){canvasContextMenu.remove();canvasContextMenu=null}
}
function closeCanvasContextUI(){closeCanvasContextMenu()}
function clampContextMenu(menu,x,y){
  const r=menu.getBoundingClientRect();
  menu.style.left=Math.max(8,Math.min(x,window.innerWidth-r.width-8))+'px';
  menu.style.top=Math.max(8,Math.min(y,window.innerHeight-r.height-8))+'px';
}

function fitContextSubmenu(branch){
  if(!branch||branch.classList.contains('disabled'))return;
  const sub=branch.querySelector(':scope > .canvas-context-submenu');
  const trigger=branch.querySelector(':scope > .canvas-context-branch-trigger');
  if(!sub||!trigger)return;

  // Reset first so measurements reflect the natural submenu size.
  sub.classList.remove('open-left');
  sub.style.top='-6px';
  sub.style.maxHeight='';
  sub.style.overflowY='';

  const triggerRect=trigger.getBoundingClientRect();
  const natural=sub.getBoundingClientRect();

  // Horizontal fit: prefer opening right, flip left only when necessary.
  if(triggerRect.right+5+natural.width>window.innerWidth-8){
    sub.classList.add('open-left');
  }

  // Re-measure after horizontal placement class is applied.
  const placed=sub.getBoundingClientRect();
  let top=-6;

  // If the submenu would fall below the viewport, shift it upward relative
  // to the branch so its bottom remains visible.
  const overflowBottom=placed.bottom-(window.innerHeight-8);
  if(overflowBottom>0)top-=overflowBottom;

  // Do not allow the top to escape above the viewport.
  const predictedTop=placed.top+(top+6);
  if(predictedTop<8)top+=8-predictedTop;

  sub.style.top=top+'px';

  // Extremely short windows: keep the menu usable with internal scrolling.
  const after=sub.getBoundingClientRect();
  const maxHeight=Math.max(120,window.innerHeight-16);
  if(after.height>maxHeight){
    sub.style.maxHeight=maxHeight+'px';
    sub.style.overflowY='auto';
    const rect=sub.getBoundingClientRect();
    if(rect.top<8)sub.style.top=(top+(8-rect.top))+'px';
    const rect2=sub.getBoundingClientRect();
    if(rect2.bottom>window.innerHeight-8){
      sub.style.top=(parseFloat(sub.style.top||'0')-(rect2.bottom-(window.innerHeight-8)))+'px';
    }
  }
}
function bindContextSubmenuPosition(branch){
  const run=()=>requestAnimationFrame(()=>fitContextSubmenu(branch));
  branch.addEventListener('mouseenter',run);
  branch.addEventListener('focusin',run);
}
function contextSeparator(parent){
  const line=document.createElement('div');
  line.className='canvas-context-separator';
  parent.append(line);
}
function contextLeaf(parent,label,fn,{disabled=false,danger=false}={}){
  const b=document.createElement('button');
  b.type='button';
  b.className='canvas-context-leaf'+(danger?' danger':'');
  b.textContent=label;
  b.disabled=disabled;
  b.onclick=ev=>{
    ev.preventDefault();ev.stopPropagation();
    if(disabled)return;
    closeCanvasContextMenu();
    fn();
  };
  parent.append(b);
  return b;
}
function contextBranch(parent,label,{disabled=false}={}){
  const wrap=document.createElement('div');
  wrap.className='canvas-context-branch'+(disabled?' disabled':'');
  const trigger=document.createElement('button');
  trigger.type='button';
  trigger.className='canvas-context-branch-trigger';
  trigger.disabled=disabled;
  trigger.innerHTML=`<span>${esc(label)}</span><span class="canvas-context-arrow">›</span>`;
  const sub=document.createElement('div');
  sub.className='canvas-context-submenu';
  wrap.append(trigger,sub);
  parent.append(wrap);
  bindContextSubmenuPosition(wrap);
  return sub;
}
function contextAddTarget(n){
  if(!n)return null;
  if(n.type==='group')return n;
  if(isSection(n))return resolvedInsertionTarget(n);
  const info=parentInfo(n.id);
  return info?.parent?.type==='group'?info.parent:null;
}
function addFromContext(target,kind){
  const parent=contextAddTarget(target);
  if(!parent){toast('Choose a Section or Container first');return}
  let node;
  if(kind==='container')node=makeBuilderContainer('blank');
  else node=makeBuilderElement(kind);
  if(!appendToBuilderTarget(parent,node)){toast('Choose a content Container first');return}
  select(node.id);
  toast(label(node)+' added');
}
function addSectionFromContext(n,after=true){
  const section=isSection(n)?n:parentInfo(n.id)?.section;
  if(!section||isSharedSection(section)){toast('Choose a normal Section first');return}
  const arr=currentSections(),i=arr.indexOf(section);
  if(i<0)return;
  const next=makeBlankSection();
  arr.splice(i+(after?1:0),0,next);
  select(next.id);
  toast('Blank Section added');
}
function showCanvasContextMenu(n,x,y){
  closeCanvasContextMenu();

  const menu=document.createElement('div');
  menu.className='canvas-context-menu';

  const title=document.createElement('div');
  title.className='canvas-context-title';
  title.innerHTML=`<strong>${esc(label(n))}</strong><small>${isSection(n)?'Section':n.type==='group'?'Container':n.type==='image'?'Image':n.type==='button'?'Button':'Element'}</small>`;
  menu.append(title);
  contextSeparator(menu);

  const add=contextBranch(menu,'Add');
  contextLeaf(add,'Container',()=>addFromContext(n,'container'));
  contextLeaf(add,'Heading',()=>addFromContext(n,'heading'));
  contextLeaf(add,'Text',()=>addFromContext(n,'text'));
  contextLeaf(add,'Image',()=>addFromContext(n,'image'));
  contextLeaf(add,'Button',()=>addFromContext(n,'button'));
  const section=isSection(n)?n:parentInfo(n.id)?.section;
  if(section&&!isSharedSection(section)){
    contextSeparator(add);
    contextLeaf(add,'Section above',()=>addSectionFromContext(n,false));
    contextLeaf(add,'Section below',()=>addSectionFromContext(n,true));
  }

  // Intentionally present but disabled in this first pass. The next release
  // will build the nested modification commands onto this same menu system.
  contextBranch(menu,'Modify',{disabled:true});

  document.body.append(menu);
  canvasContextMenu=menu;
  clampContextMenu(menu,x,y);
  requestAnimationFrame(()=>clampContextMenu(menu,x,y));
}
function canvasContextTarget(target){
  const layer=target.closest?.('.node[data-id],.page-section[data-id]');
  return layer?find(layer.dataset.id):null;
}
$('#canvas').addEventListener('contextmenu',ev=>{
  if(previewMode)return;
  const n=canvasContextTarget(ev.target);
  if(!n)return;
  ev.preventDefault();ev.stopPropagation();
  if(selection!==n.id){
    selection=n.id;activeScope='node';render();inspect();
  }
  showCanvasContextMenu(n,ev.clientX,ev.clientY);
});
document.addEventListener('pointerdown',ev=>{
  if(ev.button===2)return;
  if(canvasContextMenu&&!ev.target.closest('.canvas-context-menu'))closeCanvasContextMenu();
},true);
document.addEventListener('keydown',ev=>{
  if(ev.key==='Escape'&&canvasContextMenu){
    closeCanvasContextMenu();
    ev.preventDefault();
  }
});
window.addEventListener('blur',closeCanvasContextMenu);
window.addEventListener('resize',()=>{
  if(!canvasContextMenu)return;
  closeCanvasContextMenu();
});

$('#canvas').onclick=e=>{
  if(previewMode){
    const el=e.target.closest('[data-id]'),n=el?find(el.dataset.id):null;
    if(n?.linkType==='page'&&n.linkPageId){
      e.preventDefault();
      if(P.pages.some(p=>p.id===n.linkPageId)){P.activePageId=n.linkPageId;selection=null;render();$('#scroll').scrollTop=0}
    }
    return;
  }
  e.preventDefault();
  const n=e.target.closest('[data-id]');
  select(n?.dataset.id||null);
};
$('#scroll').addEventListener('scroll',()=>handleNavbarScroll($('#scroll')));
function renderTree(){
 const t=$('#tree');t.replaceChildren();
 function row(n,depth){
   const wrap=document.createElement('div');wrap.className='tree-row-wrap';wrap.dataset.treeId=n.id;
   const b=document.createElement('button');b.className='tree-row'+(selection===n.id?' active':'');b.style.paddingLeft=(8+depth*12)+'px';
   b.textContent=(isSharedSection(n)?'◆ ':isSection(n)?'▤ ':n.type==='group'?'▧ ':'· ')+label(n)+(isSharedSection(n)?' · site-wide':'')+(effective(n).visible===false?' (hidden)':'');
   b.onclick=()=>select(n.id);wrap.append(b);

   const reorderElement=canReorderElement(n.id),reorderContainer=canReorderContainer(n.id);
   if(reorderElement||reorderContainer){
     const h=document.createElement('span');h.className='tree-drag-handle';h.textContent='⋮⋮';
     h.title=reorderContainer?'Drag to reorder Container inside '+label(parentInfo(n.id).parent):'Drag to reorder inside '+label(parentInfo(n.id).parent);
     h.draggable=true;
     h.addEventListener('dragstart',ev=>{
       ev.stopPropagation();
       if(reorderContainer)startContainerDrag(ev,n.id);else startElementDrag(ev,n.id);
       wrap.classList.add('dragging-source');
     });
     h.addEventListener('dragend',finishDrag);wrap.append(h);

     wrap.addEventListener('dragover',ev=>{
       if(!['element','container'].includes(dragState?.kind))return;
       const info=parentInfo(n.id);
       const draggedId=dragState.kind==='container'?dragState.containerId:dragState.elementId;
       if(!info||info.parent?.id!==dragState.parentId||n.id===draggedId)return;
       ev.preventDefault();ev.stopPropagation();
       const r=wrap.getBoundingClientRect(),before=ev.clientY<r.top+r.height/2;
       document.querySelectorAll('.tree-drop-before,.tree-drop-after').forEach(x=>x.classList.remove('tree-drop-before','tree-drop-after'));
       wrap.classList.add(before?'tree-drop-before':'tree-drop-after');
       elementDrop={parentId:dragState.parentId,index:info.index+(before?0:1)};
     });

     wrap.addEventListener('drop',ev=>{
       if(!['element','container'].includes(dragState?.kind)||elementDrop.parentId!==dragState.parentId)return;
       ev.preventDefault();ev.stopPropagation();
       if(dragState.kind==='container')performContainerDrop(elementDrop.parentId,elementDrop.index);
       else performElementDrop(elementDrop.parentId,elementDrop.index);
       finishDrag();
     });
   }
   t.append(wrap);
   for(const child of n.elements||n.children||[])row(child,depth+1);
 }
 currentSections().forEach(s=>row(s,0));
}
function toast(s){$('#toast').textContent=s;$('#toast').classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2800)}
function group(title,open=true){const d=document.createElement('details');d.className='group';d.open=open;d.innerHTML=`<summary>${esc(title)}</summary>`;$('#inspector').append(d);return d}
function action(parent,title,fn,cls=''){const b=document.createElement('button');b.textContent=title;b.className=cls;b.onclick=fn;parent.append(b);return b}
const options=(o)=>Array.isArray(o)?o.map(x=>Array.isArray(x)?x:[x,x]):Object.entries(o);
function field(parent,label,value,type,onChange,{choices=[],state='',reset,min,max,step=1}={}){const w=document.createElement('div');w.className='field';const h=document.createElement('div');h.className='field-head';const l=document.createElement('label');l.textContent=label;h.append(l);if(state){const s=document.createElement('span');s.className='state'+(['Customised','Custom override','Desktop override'].includes(state)?' override':'');s.textContent=state;h.append(s)}if(reset)action(h,'↶',reset,'reset').title='Reset '+label+' to '+(reset.origin||'its default');w.append(h);let i;if(type==='select'){i=document.createElement('select');i.innerHTML=options(choices).map(([v,n])=>`<option value="${esc(v)}">${esc(n)}</option>`).join('')}else i=document.createElement(type==='textarea'?'textarea':'input');if(i.tagName==='INPUT')i.type=type;const id=uid('field');i.id=id;l.htmlFor=id;i.setAttribute('aria-label',label);if(min!==undefined)i.min=min;if(max!==undefined)i.max=max;i.step=step;if(type==='checkbox')i.checked=value;else i.value=value??'';i.onchange=()=>{let v=type==='checkbox'?i.checked:type==='number'?Number(i.value):i.value;if(type==='number'&&(!Number.isFinite(v)||(min!==undefined&&v<min)||(max!==undefined&&v>max))){i.reportValidity();return}onChange(v)};w.append(i);parent.append(w);return w}
function paletteField(parent,label,value,change,state='',reset){const choices=[['inherit','Inherited text colour'],['transparent','Transparent'],...Object.entries(P.design.colours).map(([id,c])=>['$'+id,c.name]),['custom','Custom colour']];const v=choices.some(([id])=>id===value)?value:'custom';const w=field(parent,label,v,'select',x=>{change(x==='custom'?'#555555':x);inspect()}, {choices,state,reset});if(v==='custom')field(w,'Custom '+label,value||'#555555','color',change);return w}
function refField(parent,label,v,kind,change,state,reset){const ch=Object.entries(P.design[kind]).map(([id,o])=>['@'+id,o.name]);ch.push(['custom','Custom value']);const w=field(parent,label,typeof v==='string'&&v.startsWith('@')?v:'custom','select',x=>{change(x==='custom'?0:x);inspect()},{choices:ch,state,reset});if(!(typeof v==='string'&&v.startsWith('@')))field(w,label+' value',v??0,kind==='shadows'?'text':'number',change,{min:0});return w}
function target(n,k){return device!=='desktop'&&!['textStyle','buttonStyle'].includes(k)?(n.responsive[device]??={}):n.style}
function setProp(n,k,v){target(n,k)[k]=v;render();inspect()}
function prop(parent,n,k,label,type='number',opts={}){const obj=target(n,k),own=Object.hasOwn(obj,k),state=styleOrigin(n,k);const reset=own?()=>{delete obj[k];render();inspect()}:null;if(reset)reset.origin=resetStyleOrigin(n,k);let value=effective(n)[k];if(type==='number'&&typeof value==='string'&&value.startsWith('@')){for(const kind of ['spaces','corners']){const resolved=named(value,kind);if(typeof resolved==='number'){value=resolved;break}}}if(type==='colour')return paletteField(parent,label,value,v=>setProp(n,k,v),state,reset);if(['spaces','corners','borders','shadows'].includes(type))return refField(parent,label,value,type,v=>setProp(n,k,v),state,reset);return field(parent,label,value,type,v=>setProp(n,k,v),{...opts,state,reset})}
function setOuterSpacingPair(n,keys,value){const obj=target(n,keys[0]);for(const key of keys)obj[key]=value;render();inspect()}
function setOuterSpacingMode(n,mode){
 n.outerSpacingMode=mode;
 if(mode==='custom'){
  n.responsive??={};
  for(const bp of ['tablet','mobile']){
   const layer=n.responsive[bp]??={};
   for(const key of OUTER_SPACING_KEYS)if(!Object.hasOwn(layer,key))layer[key]=adaptiveOuterSpacingValue(n,key,bp);
  }
 }
 render();inspect();
}
function outerSpacingAdaptiveSummary(n){
 const key=OUTER_SPACING_KEYS.find(k=>desktopOuterSpacing(n,k)<0);
 if(!key)return'';
 const names={marginTop:'top',marginRight:'right',marginBottom:'bottom',marginLeft:'left'};
 const desktopValue=desktopOuterSpacing(n,key),tablet=adaptiveOuterSpacingValue(n,key,'tablet'),mobile=adaptiveOuterSpacingValue(n,key,'mobile');
 const stackNote=parentReflowsAtBreakpoint(n,'tablet')||parentReflowsAtBreakpoint(n,'mobile')?' Stacked layouts remove inherited overlap automatically.':'';
 return `Adaptive example · ${names[key]} ${desktopValue}px desktop → ${tablet}px tablet → ${mobile}px mobile.${stackNote}`;
}
function outerSpacingControls(n){
  const g=group('Outer spacing');
  const st=effective(n);
  const vertical=Number(st.marginTop)===Number(st.marginBottom)?Number(st.marginTop)||0:Number(st.marginTop)||0;
  const horizontal=Number(st.marginLeft)===Number(st.marginRight)?Number(st.marginLeft)||0:Number(st.marginLeft)||0;
  const note=document.createElement('p');note.className='hint';note.textContent='Changes layout flow. Use negative Top spacing to pull an element toward the section above; surrounding content will reflow.';g.append(note);
  field(g,'Responsive overlap',outerSpacingMode(n),'select',v=>setOuterSpacingMode(n,v),{choices:[['adaptive','Adaptive (recommended)'],['preserve','Preserve desktop overlap'],['custom','Custom breakpoints']]});
  const summary=outerSpacingAdaptiveSummary(n);if(summary&&outerSpacingMode(n)==='adaptive'){const p=document.createElement('p');p.className='hint';p.textContent=summary;g.append(p)}
  const state=device==='desktop'?'':Object.keys(n.responsive?.[device]||{}).some(k=>OUTER_SPACING_KEYS.includes(k))?'Custom override':outerSpacingMode(n)==='adaptive'?'Adaptive':'Desktop';
  const pair=document.createElement('div');pair.className='quick-pair';g.append(pair);
  field(pair,'Vertical',vertical,'number',v=>setOuterSpacingPair(n,['marginTop','marginBottom'],v),{min:-200,max:400,step:1,state});
  field(pair,'Horizontal',horizontal,'number',v=>setOuterSpacingPair(n,['marginLeft','marginRight'],v),{min:-200,max:400,step:1,state});
  const verticalSides=document.createElement('div');verticalSides.className='quick-pair';g.append(verticalSides);
  prop(verticalSides,n,'marginTop','Top','number',{min:-200,max:400,step:1});
  prop(verticalSides,n,'marginBottom','Bottom','number',{min:-200,max:400,step:1});
  const horizontalSides=document.createElement('div');horizontalSides.className='quick-pair';g.append(horizontalSides);
  prop(horizontalSides,n,'marginLeft','Left','number',{min:-200,max:400,step:1});
  prop(horizontalSides,n,'marginRight','Right','number',{min:-200,max:400,step:1});
  return g;
}
function setVisualPositionMode(n,mode){
 n.visualPositionMode=mode;
 if(mode==='custom'){
  n.responsive??={};
  for(const bp of ['tablet','mobile']){
   const layer=n.responsive[bp]??={};
   for(const key of VISUAL_POSITION_KEYS)if(!Object.hasOwn(layer,key))layer[key]=Object.hasOwn(n.baseResponsive?.[bp]||{},key)?Number(n.baseResponsive[bp][key])||0:adaptiveVisualPositionValue(n,key,bp);
  }
 }
 render();inspect();
}
function visualPositionAdaptiveSummary(n){
 const key=VISUAL_POSITION_KEYS.find(k=>desktopVisualPosition(n,k)!==0);
 if(!key)return'';
 const names={offsetX:'X',offsetY:'Y'},desktopValue=desktopVisualPosition(n,key),tablet=adaptiveVisualPositionValue(n,key,'tablet'),mobile=adaptiveVisualPositionValue(n,key,'mobile');
 const stackNote=parentReflowsAtBreakpoint(n,'tablet')||parentReflowsAtBreakpoint(n,'mobile')?' Stacked layouts remove inherited movement automatically.':'';
 return `Adaptive example · ${names[key]} ${desktopValue}px desktop → ${tablet}px tablet → ${mobile}px mobile.${stackNote}`;
}
function visualClippingAncestor(n){
 const path=pathTo(n.id).slice(0,-1);
 for(let i=path.length-1;i>=0;i--){
  const ancestor=path[i];
  if(ancestor?.type==='group'&&effective(ancestor).overflow==='hidden')return ancestor;
 }
 return null;
}
function visualClippingNotice(parent,n){
 const clip=visualClippingAncestor(n);
 if(!clip)return;
 const p=document.createElement('p');p.className='card-note';p.textContent=`Movement outside ${label(clip)} is currently clipped. This is why the layer can disappear when you move it across the Container boundary.`;parent.append(p);
 action(parent,'Allow overlap outside this Container',()=>setProp(clip,'overflow','visible'),'full');
}
function visualPositionControls(n){
 const g=group('Visual position');const layerHint=document.createElement('p');layerHint.className='hint';layerHint.textContent='Moved layers automatically sit above ordinary adjacent-section content. Set Layer order in Advanced to override.';g.append(layerHint);
 const st=effective(n);
 const note=document.createElement('p');note.className='hint';note.textContent='Moves only the selected layer. Surrounding content stays in place, so this is the control for deliberate overlaps and editorial positioning.';g.append(note);
 field(g,'Responsive position',visualPositionMode(n),'select',v=>setVisualPositionMode(n,v),{choices:[['adaptive','Adaptive (recommended)'],['preserve','Preserve desktop position'],['custom','Custom breakpoints']]});
 const pair=document.createElement('div');pair.className='quick-pair';g.append(pair);
 const state=device==='desktop'?'':Object.keys(n.responsive?.[device]||{}).some(k=>VISUAL_POSITION_KEYS.includes(k))?'Custom override':visualPositionMode(n)==='adaptive'?'Adaptive':'Desktop';
 field(pair,'Horizontal X',Number(st.offsetX)||0,'number',v=>setProp(n,'offsetX',v),{min:-400,max:400,step:1,state});
 field(pair,'Vertical Y',Number(st.offsetY)||0,'number',v=>setProp(n,'offsetY',v),{min:-400,max:400,step:1,state});
 const summary=visualPositionAdaptiveSummary(n);if(summary&&visualPositionMode(n)==='adaptive'){const p=document.createElement('p');p.className='hint';p.textContent=summary;g.append(p)}
 visualClippingNotice(g,n);
 return g;
}
function direct(parent,n,k,label,type='text',opts={}){return field(parent,label,n[k]||(k==='tag'?n.role:''),type,v=>{n[k]=v;if(k==='text'&&n.role==='coachBio'){const item=coachItemAncestor(n),collection=item?coachCollectionParent(item):null,mode=collection?ensureCoachConfig(collection).bioMode:'short';if(mode==='long')n.coachBioLong=v;else n.coachBioShort=v}render();if(k==='name')inspect()},opts)}
function removeSectionBackground(n){
  const layer=target(n,'bgAssetId');
  layer.bgAssetId='';
  layer.bgImage='';
  render();
  inspect();
  renderAssets();
  toast(device==='desktop'?'Background image removed':'Background image removed for '+device);
}
function backgroundImageSummary(parent,n){
  const st=effective(n);
  const src=assetUrl(st.bgAssetId)||st.bgImage||'';
  if(!src)return false;

  const card=document.createElement('div');
  card.className='background-image-summary';
  const thumb=document.createElement('img');
  thumb.src=src;thumb.alt='';
  const info=document.createElement('div');
  info.className='background-image-summary-info';
  const asset=st.bgAssetId?assetById(st.bgAssetId):null;
  info.innerHTML=`<b>Current background</b><span>${esc(asset?.name||'Background image')}</span>`;
  const buttons=document.createElement('div');
  buttons.className='background-image-summary-actions';
  action(buttons,'Replace',()=>assetPicker(n,'bgImage'));
  action(buttons,'Remove background',()=>removeSectionBackground(n),'danger');
  card.append(thumb,info,buttons);
  parent.append(card);
  return true;
}

function buildAdvancedInspector(){const area=$('#inspector');area.replaceChildren();const bc=$('#breadcrumb');bc.replaceChildren();action(bc,'Style',()=>select(null));const n=find(selection);for(const item of pathTo(selection))action(bc,label(item),()=>select(item.id));$('#scopeName').textContent=n?(isSharedSection(n)?'Site-wide Section':isSection(n)?'Section':n.type==='group'?'Container':'Element'):'Page defaults';$('#styleTab').classList.toggle('active',!n);if(!n){inspectStyle();return}const title=document.createElement('h2');title.className='inspector-title';title.textContent=label(n);area.append(title);const hint=document.createElement('p');hint.className='hint';hint.textContent=`${device==='desktop'?'Base settings':device+' overrides'} · ↶ resets one property.`;area.append(hint);quickSectionBackground(area,n);scopePresets(n);let g=group('Content & identity');direct(g,n,'name','Layer name');if(isSection(n))direct(g,n,'anchor','Anchor name');else {outerSpacingControls(n);visualPositionControls(n)}if(!isSection(n)&&n.type!=='group'){if(n.type!=='image')direct(g,n,'text','Text','textarea');if(n.type==='button')field(g,'Disabled button',!!n.disabled,'checkbox',v=>{n.disabled=v;render()});if(n.type==='button'||n.role==='navlink'||n.href||n.linkType)linkField(g,n);if(n.type==='heading')direct(g,n,'tag','HTML heading level','select',{choices:['h1','h2','h3','h4','h5','h6']});if(n.type==='image'){direct(g,n,'alt','Image description');action(g,'Choose from Assets',()=>assetPicker(n,'src'),'full');action(g,'Upload new image',()=>uploadImage(n,'src'),'full');if(n.assetId||n.src)action(g,'Remove image',()=>{delete n.assetId;delete n.src;render();inspect();renderAssets()},'full')}}
const heroActions=(isSection(n)&&n.type==='hero')?heroActionGroupFor(n):(n.type==='group'&&n.role==='heroActions'?n:null);if(heroActions){g=group('Hero actions');heroActionControls(g,heroActions)}const heroMedia=(isSection(n)&&n.type==='hero')?heroWideMediaFor(n):(n.heroWideMedia?n:null);if(heroMedia){g=group('Hero media');heroMediaControls(g,heroMedia)}
if(isSection(n)&&n.academyModule){g=group('Academy modules');academyControls(g,n)}
const programCollection=(isSection(n)&&n.type==='services')?programCollectionFor(n):(n.type==='group'&&n.role==='programCollection'?n:null);if(programCollection){g=group('Programs');programCollectionControls(g,programCollection)}const coachCollection=(isSection(n)&&n.type==='team')?coachCollectionFor(n):(n.type==='group'&&n.coachCollection?n:null);if(coachCollection){g=group('Coaches');coachCollectionControls(g,coachCollection)}const cardCollection=cardCollectionContext(n);if(cardCollection){g=group('Card design');cardCollectionControls(g,cardCollection)}const programItem=programItemAncestor(n);if(programItem){g=group('Program item');programItemControls(g,programItem)}const coachItem=coachItemAncestor(n);if(coachItem){g=group('Coach item');coachItemControls(g,coachItem)}const galleryCollection=(isSection(n)&&n.type==='gallery')?galleryCollectionFor(n):(n.type==='group'&&n.galleryCollection?n:null);if(galleryCollection){g=group('Gallery');galleryControls(g,galleryCollection)}const galleryImage=galleryImageAncestor(n);if(galleryImage){g=group('Gallery image');galleryImageControls(g,galleryImage)}
if(isSection(n)){if(n.type==='navbar'){g=group('Navbar behaviour');addNavbarControls(g,n)}g=group('Background');prop(g,n,'background','Background colour','colour');prop(g,n,'color','Section text colour','colour');const hasBackgroundImage=backgroundImageSummary(g,n);if(!hasBackgroundImage)action(g,'Choose background from Assets',()=>assetPicker(n,'bgImage'),'full');action(g,hasBackgroundImage?'Upload replacement':'Upload new background image',()=>uploadImage(n,'bgImage'),'full');if(effective(n).bgAssetId||effective(n).bgImage){prop(g,n,'bgFit','Image fit','select',{choices:['cover','contain']});prop(g,n,'bgPos','Image position','select',{choices:['center','top','bottom','left','right']});prop(g,n,'overlayColor','Overlay colour','colour');prop(g,n,'overlayOpacity','Overlay opacity','number',{min:0,max:1,step:.05})}g=group('Size & spacing');for(const [k,l]of[['top','Top padding'],['bottom','Bottom padding'],['side','Side padding']])prop(g,n,k,l,'spaces');prop(g,n,'contentWidth','Content maximum width (0 = full)','number',{min:0,max:3000});field(g,'Height mode',effective(n).minHeight==='screen'?'screen':'custom','select',v=>setProp(n,'minHeight',v==='screen'?'screen':0),{choices:[['custom','Auto / minimum pixels'],['screen','Fill preview screen']]});if(effective(n).minHeight!=='screen')prop(g,n,'minHeight','Minimum height (0 = auto)','number',{min:0,max:3000});prop(g,n,'vAlign','Content vertical position','select',{choices:['top','center','bottom']})}
else if(n.type==='group'){g=group('Layout');prop(g,n,'direction','Arrange children','select',{choices:[['row','Horizontal row'],['column','Vertical stack'],['grid','Grid']]});prop(g,n,'gap','Gap between children','spaces');prop(g,n,'justify','Distribution along layout','select',{choices:[['start','Start'],['center','Centre'],['end','End'],['space-between','Space between'],['space-around','Space around']]});prop(g,n,'alignItems','Alignment across layout','select',{choices:['start','center','end','stretch']});if(effective(n).direction==='grid')prop(g,n,'columns','Grid columns','number',{min:1,max:6});prop(g,n,'wrap','Allow wrapping','select',{choices:[['nowrap','No wrapping'],['wrap','Wrap']]});prop(g,n,'stack','Stack vertically on','select',{choices:[['never','Keep layout'],['tablet','Tablet and mobile'],['mobile','Mobile only']]});const pInfo=parentInfo(n.id),pNode=pInfo?.parent;if(pNode?.type==='group'&&effective(pNode).direction==='row'){field(g,'Column share (%)',Math.round(rowChildShare(pNode,n)*10)/10,'number',v=>setRowChildShare(n,v),{min:10,max:90,step:1})}prop(g,n,'width','Width (%)','number',{min:10,max:100});g=group('Container appearance',false);prop(g,n,'padding','Inner padding','spaces');prop(g,n,'background','Background colour','colour');prop(g,n,'overflow','Overflow','select',{choices:[['visible','Visible'],['hidden','Clip to Container']]})}
else if(n.type==='image'){g=group('Image');prop(g,n,'frameMode','Frame mode','select',{choices:[['fill','Fill container'],['ratio','Aspect ratio'],['fixed','Fixed height']]});if(effective(n).frameMode==='ratio')prop(g,n,'aspectRatio','Aspect ratio','select',{choices:[['1 / 1','1:1 Square'],['4 / 3','4:3'],['3 / 2','3:2'],['16 / 9','16:9'],['3 / 1','3:1 Wide'],['21 / 9','21:9 Wide'],['2 / 3','2:3 Portrait'],['3 / 4','3:4 Portrait']]});prop(g,n,'fit','Image fit','select',{choices:['cover','contain']});prop(g,n,'position','Image position','select',{choices:['center','top','bottom','left','right']});const focal=document.createElement('div');focal.className='quick-pair';g.append(focal);prop(focal,n,'focalX','Focal X (%)','number',{min:0,max:100,step:1});prop(focal,n,'focalY','Focal Y (%)','number',{min:0,max:100,step:1});if(effective(n).frameMode!=='ratio')prop(g,n,'height',effective(n).frameMode==='fill'?'Minimum height':'Height','number',{min:40,max:1600});prop(g,n,'opacity','Opacity','number',{min:0,max:1,step:.05})}
else{g=group('Typography');prop(g,n,'textStyle','Text style','select',{choices:Object.entries(P.design.texts).map(([id,t])=>[id,t.name])});textControls(g,(k,l,t,o)=>prop(g,n,k,l,t,o));prop(g,n,'underline','Underline','select',{choices:['none','underline']});if(n.type!=='button'){const display=group('Display typography',false);prop(display,n,'fluidSize','Fluid size','checkbox');if(effective(n).fluidSize){prop(display,n,'fluidMin','Minimum size','number',{min:8,max:240,step:1});prop(display,n,'fluidMax','Maximum size','number',{min:16,max:360,step:1});prop(display,n,'fluidVw','Viewport scale (vw)','number',{min:.5,max:30,step:.1})}prop(display,n,'whiteSpace','Text wrapping','select',{choices:[['normal','Normal wrapping'],['nowrap','No wrap / display word']]})}if(n.type==='button'){g=group('Button');prop(g,n,'buttonStyle','Button style','select',{choices:Object.entries(P.design.buttons).map(([id,t])=>[id,t.name])});prop(g,n,'background','Background colour','colour');prop(g,n,'color','Text colour','colour');prop(g,n,'padX','Horizontal padding','spaces');prop(g,n,'padY','Vertical padding','spaces');prop(g,n,'buttonWidth','Button width','select',{choices:[['auto','Fit content'],['full','Full width']]});prop(g,n,'hoverBackground','Hover background','colour');prop(g,n,'hoverColor','Hover text colour','colour');prop(g,n,'focusColor','Keyboard focus colour','colour')}}
if(isSection(n)||n.type==='group'||n.type==='image'||n.type==='button'){g=group('Borders, corners & shadow',false);for(const[k,l,t]of[['radius','Corners','corners'],['border','Border','borders'],['shadow','Shadow','shadows']])prop(g,n,k,l,t)}
g=group('Advanced',false);prop(g,n,'visible','Visible','checkbox');if(!isSection(n)){prop(g,n,'zIndex','Layer order','number',{min:-5,max:20,step:1})}const orderParent=parentInfo(n.id)?.parent;if(device!=='desktop'&&orderParent?.type==='group')prop(g,n,'order','Visual order (lower appears first)','number',{min:-20,max:20,step:1});if(!isSection(n)&&n.type!=='group'&&n.type!=='image'){prop(g,n,'maxWidth','Maximum width (0 = auto)','number',{min:0,max:2400})}if(!isSection(n)){const mg=group('Motion',false);n.motion=n.motion||{};field(mg,'Entrance',n.motion.reveal||'none','select',v=>{n.motion.reveal=v;render();inspect()},{choices:[['none','None'],['fade','Fade'],['rise','Fade + rise'],['mask','Mask reveal']]});if((n.motion.reveal||'none')!=='none')field(mg,'Entrance delay (ms)',Number(n.motion.delay)||0,'number',v=>{n.motion.delay=v;render()},{min:0,max:1200,step:20});if(n.type==='image'||n.type==='group')field(mg,'Hover response',n.motion.hover||'none','select',v=>{n.motion.hover=v;render();inspect()},{choices:[['none','None'],['zoom','Image zoom'],['lift','Lift']]})}const a=document.createElement('div');a.className='actions';area.append(a);if(!(isSection(n)&&isSharedSection(n))){action(a,'Duplicate',()=>mutateNode(n,'duplicate'));action(a,'Move up',()=>mutateNode(n,'up'));action(a,'Move down',()=>mutateNode(n,'down'));if(isSection(n)&&P.pages.length>1){action(a,'Move to page…',()=>sectionPageTransferDialog(n,'move'));action(a,'Copy to page…',()=>sectionPageTransferDialog(n,'copy'))}}action(a,'Delete',()=>mutateNode(n,'delete'),'danger');action(area,'Reset appearance overrides',()=>{clearAppearance(n);render();inspect()},'full');if(n.type==='group'||isSection(n)){g=group('Add child',false);for(const t of ['group','heading','text','button','image'])action(g,t==='group'?'Container':t,()=>{const child=t==='group'?blankChildContainer('Container'):makeBuilderElement(t);if(!appendToBuilderTarget(n,child)){toast('Choose a content Container first');return}select(child.id)},'full')}}

function quickProp(parent,n,k,label,type='number',opts={}){return prop(parent,n,k,label,type,opts)}
function quickOuterSpacingControls(n){return outerSpacingControls(n)}
function quickVisualPositionControls(n){return visualPositionControls(n)}
function quickTop(n){const area=$('#inspector');area.replaceChildren();area.className='quick-inspector';const bc=$('#breadcrumb');bc.replaceChildren();action(bc,'Style',()=>select(null));for(const item of pathTo(selection))action(bc,label(item),()=>select(item.id));$('#scopeName').textContent=n?(isSharedSection(n)?'Site-wide Section':isSection(n)?'Section':n.type==='group'?'Container':'Element'):'Page defaults';$('#styleTab').classList.toggle('active',!n);return area}
function quickSectionBackground(area,n){
  if(!isSection(n))return;
  const st=effective(n);
  if(!(st.bgAssetId||st.bgImage))return;
  const g=group('Background image');
  backgroundImageSummary(g,n);
}
function quickAdvancedButton(area){action(area,'Open advanced controls',()=>{inspectorMode='advanced';syncInspectorMode();inspect()},'advanced-open')}
function buildQuickStyle(){const area=quickTop(null);area.innerHTML+='<h2 class="inspector-title">Style</h2><p class="hint">Set the overall look once. Components inherit these defaults automatically.</p>';let g=group('Style preset');const presets={...PRESETS,...read(KEYS.presets)};field(g,'Preset',P.stylePreset,'select',name=>confirmPreset(name),{choices:Object.keys(presets)});g=group('Colours');buildPaletteControls(g);g=group('Typography');field(g,'Heading font',P.design.texts.h1.font,'select',v=>{for(const id of ['display','displayTight','h1','h2','h3','h4','h5','h6','brand'])if(P.design.texts[id])P.design.texts[id].font=v;render()},{choices:['Inter','DM Sans','Manrope','Montserrat','Playfair Display','Georgia']});field(g,'Body font',P.design.texts.body.font,'select',v=>{for(const id of ['body','lead','emphasis','leadEmphasis','small','label','button','link'])if(P.design.texts[id])P.design.texts[id].font=v;render()},{choices:['Inter','DM Sans','Manrope','Montserrat','Playfair Display','Georgia']});const pair=document.createElement('div');pair.className='quick-pair';g.append(pair);field(pair,'H1 size',P.design.texts.h1.size,'number',v=>{P.design.texts.h1.size=v;render()},{min:24,max:120});field(pair,'Body size',P.design.texts.body.size,'number',v=>{P.design.texts.body.size=v;render()},{min:10,max:28});g=group('Spacing & corners');field(g,'Text spacing',P.design.spaces.textGap.value,'number',v=>{P.design.spaces.textGap.value=v;render()},{min:0,max:80});field(g,'Card padding',P.design.spaces.cardPadding.value,'number',v=>{P.design.spaces.cardPadding.value=v;render()},{min:0,max:100});field(g,'Section / column gap',layout().gap,'number',v=>{(device==='desktop'?P.design.layout:P.design.responsive[device]).gap=v;render()},{min:0,max:160});for(const [k,label]of [['imageRadius','Image corners'],['cardRadius','Card corners']])refField(g,label,P.design.layout[k],'corners',v=>{P.design.layout[k]=v;render()});quickAdvancedButton(area)}
function buildQuickInspector(){const n=find(selection);if(!n){buildQuickStyle();return}const area=quickTop(n);const title=document.createElement('h2');title.className='inspector-title';title.textContent=label(n);area.append(title);const hint=document.createElement('p');hint.className='hint';hint.textContent=device==='desktop'?'Quick edits · inherited Style stays intact.':'Quick '+device+' overrides.';area.append(hint);
 let g;
 if(isSection(n)){
   const variants=variantsFor(n);if(variants.length>1){g=group('Variant');field(g,'Section layout',n.componentVariant||n.name,'select',name=>{const comp=variants.find(c=>c.name===name);if(comp&&name!==(n.componentVariant||n.name))swapSectionVariant(n,comp)},{choices:variants.map(c=>[c.name,c.name+' — '+(c.description||'')])})}
   if(n.type==='hero'){const heroActions=heroActionGroupFor(n);if(heroActions){g=group('Hero actions');heroActionControls(g,heroActions)}const heroMedia=heroWideMediaFor(n);if(heroMedia){g=group('Hero media');heroMediaControls(g,heroMedia)}}
   if(n.academyModule){g=group('Academy modules');academyControls(g,n)}
   if(n.type==='services'){const programCollection=programCollectionFor(n);if(programCollection){g=group('Programs');programCollectionControls(g,programCollection)}}
   if(n.type==='team'){const coachCollection=coachCollectionFor(n);if(coachCollection){g=group('Coaches');coachCollectionControls(g,coachCollection)}}
   if(n.type==='gallery'){const galleryCollection=galleryCollectionFor(n);if(galleryCollection){g=group('Gallery');galleryControls(g,galleryCollection)}}
   {const cardCollection=cardCollectionContext(n);if(cardCollection){g=group('Card design');cardCollectionControls(g,cardCollection)}}
   if(n.type==='navbar'){g=group('Navbar behaviour');addNavbarControls(g,n)}
   g=group('Section');quickProp(g,n,'background','Background','colour');const quickHasBackground=backgroundImageSummary(g,n);const spacing=document.createElement('div');spacing.className='quick-pair';g.append(spacing);quickProp(spacing,n,'top','Top spacing','number',{min:0,max:300,step:4});quickProp(spacing,n,'bottom','Bottom spacing','number',{min:0,max:300,step:4});quickProp(g,n,'contentWidth','Content width','number',{min:0,max:2400});quickProp(g,n,'vAlign','Vertical position','select',{choices:['top','center','bottom']});if(!quickHasBackground)action(g,'Choose background from Assets',()=>assetPicker(n,'bgImage'),'full');action(g,quickHasBackground?'Upload replacement':'Upload new background image',()=>uploadImage(n,'bgImage'),'full');
 } else if(n.type==='group'){
   if(n.role==='heroActions'){g=group('Hero actions');heroActionControls(g,n)}
   if(n.role==='programCollection'){g=group('Programs');programCollectionControls(g,n)}
   if(n.coachCollection){g=group('Coaches');coachCollectionControls(g,n)}
   if(n.galleryCollection){g=group('Gallery');galleryControls(g,n)}
   {const cardCollection=cardCollectionContext(n);if(cardCollection){g=group('Card design');cardCollectionControls(g,cardCollection)}}
   const programItem=programItemAncestor(n);if(programItem){g=group('Program item');programItemControls(g,programItem)}
   const coachItem=coachItemAncestor(n);if(coachItem){g=group('Coach item');coachItemControls(g,coachItem)}
   g=group('Layout');
   if(n.builderLayout){
     field(g,'Layout preset',n.layoutPreset||'stack','select',v=>changeContainerLayout(n,v),{choices:CONTAINER_LAYOUTS.map(x=>[x.id,x.name])});
     const note=document.createElement('p');note.className='card-note';note.textContent='Changing the stock preset rebuilds this Container intentionally. Otherwise, its current saved structure is preserved exactly.';g.append(note);
   }else{
     quickProp(g,n,'direction','Layout','select',{choices:[['row','Horizontal'],['column','Vertical'],['grid','Grid']]});
     quickProp(g,n,'gap','Gap','number',{min:0,max:120,step:2});
     const pair=document.createElement('div');pair.className='quick-pair';g.append(pair);
     quickProp(pair,n,'justify','Distribution','select',{choices:[['start','Start'],['center','Centre'],['end','End'],['space-between','Space between']]});
     quickProp(pair,n,'alignItems','Alignment','select',{choices:['start','center','end','stretch']});
     if(n.children?.length===2&&effective(n).direction==='row')quickProp(g,n,'firstColumn','First column (%)','number',{min:20,max:80});
     quickProp(g,n,'stack','Stack on','select',{choices:[['never','Never'],['tablet','Tablet + mobile'],['mobile','Mobile only']]});
     quickProp(g,n,'overflow','Children outside Container','select',{choices:[['visible','Allow overlap'],['hidden','Clip children']]});
   }
 } else if(n.type==='image'){
   g=group('Image');action(g,(n.assetId||n.src)?'Choose another asset':'Choose from Assets',()=>assetPicker(n,'src'),'primary full');action(g,'Upload new image',()=>uploadImage(n,'src'),'full');quickProp(g,n,'frameMode','Frame','select',{choices:[['fill','Fill container'],['ratio','Aspect ratio'],['fixed','Fixed height']]});if(effective(n).frameMode==='ratio')quickProp(g,n,'aspectRatio','Ratio','select',{choices:[['1 / 1','1:1'],['4 / 3','4:3'],['3 / 2','3:2'],['16 / 9','16:9'],['3 / 1','3:1'],['21 / 9','21:9'],['2 / 3','2:3'],['3 / 4','3:4']]});const pair=document.createElement('div');pair.className='quick-pair';g.append(pair);quickProp(pair,n,'fit','Fit','select',{choices:['cover','contain']});quickProp(pair,n,'position','Position','select',{choices:['center','top','bottom','left','right']});const focal=document.createElement('div');focal.className='quick-pair';g.append(focal);quickProp(focal,n,'focalX','Focal X','number',{min:0,max:100,step:1});quickProp(focal,n,'focalY','Focal Y','number',{min:0,max:100,step:1});if(effective(n).frameMode!=='ratio')quickProp(g,n,'height',effective(n).frameMode==='fill'?'Min height':'Height','number',{min:100,max:1200});
 } else {
   g=group('Content');if(n.type!=='image')direct(g,n,'text','Text','textarea');if(n.type==='button'||n.role==='navlink'||n.href||n.linkType)linkField(g,n);
   if(n.type==='button'){g=group('Button');quickProp(g,n,'buttonStyle','Button style','select',{choices:Object.entries(P.design.buttons).map(([id,t])=>[id,t.name])});quickProp(g,n,'buttonWidth','Width','select',{choices:[['auto','Fit content'],['full','Full width']]});}
   else {g=group('Typography');quickProp(g,n,'textStyle','Text style','select',{choices:Object.entries(P.design.texts).map(([id,t])=>[id,t.name])});const pair=document.createElement('div');pair.className='quick-pair';g.append(pair);quickProp(pair,n,'size','Size','number',{min:8,max:140});quickProp(pair,n,'align','Align','select',{choices:['left','center','right']});quickProp(g,n,'color','Colour','colour');}
 }
 if(!isSection(n)){quickOuterSpacingControls(n);quickVisualPositionControls(n)}
 const currentCardCollection=cardCollectionContext(n);if(currentCardCollection&&!isSection(n)&&n.type!=='group'){g=group('Card design');cardCollectionControls(g,currentCardCollection)}
 const currentProgramItem=programItemAncestor(n);if(currentProgramItem&&n.role!=='programItem'){g=group('Program item');programItemControls(g,currentProgramItem)}
 const currentGalleryImage=galleryImageAncestor(n);if(currentGalleryImage){g=group('Gallery image');galleryImageControls(g,currentGalleryImage)}
 const currentGalleryCollection=(n.type!=='group'&&n.type!=='image')?galleryCollectionFor(gallerySectionFor(n)||n):null;if(currentGalleryCollection&&!isSection(n)){g=group('Gallery');galleryControls(g,currentGalleryCollection)}
 const a=document.createElement('div');a.className='quick-actions';area.append(a);if(isSection(n)&&!isSharedSection(n)){action(a,'Duplicate',()=>mutateNode(n,'duplicate'));action(a,'Move up',()=>mutateNode(n,'up'));action(a,'Move down',()=>mutateNode(n,'down'));if(P.pages.length>1){action(a,'Move to page…',()=>sectionPageTransferDialog(n,'move'));action(a,'Copy to page…',()=>sectionPageTransferDialog(n,'copy'))}}action(a,'Delete',()=>mutateNode(n,'delete'),'danger');quickAdvancedButton(area)
}
function buildInspector(){if(inspectorMode==='quick')buildQuickInspector();else {$('#inspector').className='advanced-inspector';buildAdvancedInspector()}}
function syncInspectorMode(){$('#quickMode').classList.toggle('active',inspectorMode==='quick');$('#advancedMode').classList.toggle('active',inspectorMode==='advanced')}

let lastInspectorKey='', inspectorGroups={};
function inspect(){
 const key=selection||'style', old=$('#inspector'), scroll=$('#right').scrollTop;
 if(lastInspectorKey){inspectorGroups[lastInspectorKey]=[...old.querySelectorAll('details')].map(d=>({title:d.querySelector('summary')?.textContent,open:d.open}));}
 buildInspector();
 componentPolishInspector();
 for(const d of old.querySelectorAll('details')){const prev=inspectorGroups[key]?.find(x=>x.title===d.querySelector('summary')?.textContent);if(prev)d.open=prev.open;}
 if(lastInspectorKey===key)$('#right').scrollTop=scroll;else $('#right').scrollTop=0;
 lastInspectorKey=key;
}
function scopePresets(n){
 const kind=isSection(n)?'section':n.type;
 const built=kind==='section'?{Surface:{background:'$surface'},Brand:{background:'$primary',color:'$onPrimary'},Dark:{background:'$dark',color:'$onDark'},Compact:{top:36,bottom:36},Spacious:{top:104,bottom:104}}:kind==='group'?{Tight:{gap:'@small'},Spacious:{gap:'@large'},Centred:{justify:'center',alignItems:'center'},'Equal columns':{direction:'row',firstColumn:50}}:kind==='image'?{'Soft corners':{radius:'@rounded'},Square:{radius:'@square'},Contain:{fit:'contain'}}:{};
 const key='runa-v106-layer-presets', custom=read(key), saved=custom[kind]||{}, presets={...built,...saved};
 if(kind==='button')return;
 const g=group('Selection presets',false);
 field(g,'Apply selection preset','','select',v=>{if(!v)return;const d=showDialog('Apply '+v+'?','<p>Replaces this selection’s styling for the current device. Content and child layers remain.</p>');action(d,'Cancel',()=>{closeDialog();inspect()});action(d,'Apply',()=>{if(device==='desktop')n.style=clone(presets[v]);else n.responsive[device]=clone(presets[v]);closeDialog();render();inspect()});},{choices:[['','Choose a preset'],...Object.keys(presets).map(k=>[k,k])]});
 action(g,'Save selection as preset',()=>{const d=showDialog('Save selection preset');let name='My '+kind+' style';field(d,'Preset name',name,'text',v=>name=v);action(d,'Cancel',closeDialog);action(d,'Save',()=>{if(!name.trim())return;const all=read(key);all[kind]??={};if(all[kind][name]||built[name]){toast('Choose a new name.');return}const st=effective(n);delete st.bgImage;delete st.bgAssetId;all[kind][name]=st;if(persist(key,all)){closeDialog();inspect();toast('Selection preset saved')}})},'full');
}
function textControls(g,fn){fn('font','Font','select',{choices:['Arial','Georgia','Verdana','Trebuchet MS','Times New Roman','Inter','DM Sans','Manrope','Montserrat','Playfair Display']});fn('size','Font size','number',{min:8,max:160});fn('weight','Weight','select',{choices:['300','400','500','600','700','800','900']});fn('lineHeight','Line height','number',{min:.8,max:3,step:.05});fn('letterSpacing','Letter spacing','number',{min:-5,max:20,step:.25});fn('color','Text colour','colour');fn('align','Text alignment','select',{choices:['left','center','right']})}
function inspectStyle(){const area=$('#inspector');area.innerHTML='<h2 class="inspector-title">Page Style</h2><p class="hint">Shared design rules. Edit a default here to update everything that inherits it.</p>';let g=group('Style presets');const presets={...PRESETS,...read(KEYS.presets)};field(g,'Current preset',P.stylePreset,'select',name=>confirmPreset(name),{choices:Object.keys(presets)});action(g,'Save Style as new preset',saveStyleDialog,'full');g=group('Colours');buildPaletteControls(g,{editableCustom:true});
g=group('Typography',false);for(const[id,t]of Object.entries(P.design.texts)){const d=document.createElement('details');d.className='group';d.innerHTML=`<summary>${esc(t.name)}</summary>`;g.append(d);field(d,'Style name',t.name,'text',v=>{t.name=v;inspect()});const update=(k,v)=>{t[k]=v;render()};textControls(d,(k,l,ty,o)=>{if(ty==='colour')paletteField(d,l,t[k],v=>update(k,v));else field(d,l,t[k],ty,v=>update(k,v),o)});field(d,'Underline',t.underline,'select',v=>update('underline',v),{choices:['none','underline']});paletteField(d,'Hover colour',t.hoverColor,v=>update('hoverColor',v))}action(g,'+ Add text style',()=>{P.design.texts[uid('text')]={...clone(P.design.texts.body),name:'New text style'};inspect()},'full');
g=group('Buttons',false);for(const[id,b]of Object.entries(P.design.buttons)){const d=document.createElement('details');d.className='group';d.innerHTML=`<summary>${esc(b.name)}</summary>`;g.append(d);const update=(k,v)=>{b[k]=v;render()};field(d,'Button style name',b.name,'text',v=>update('name',v));field(d,'Button text style',b.textStyle,'select',v=>update('textStyle',v),{choices:Object.entries(P.design.texts).map(([id,t])=>[id,t.name])});for(const[k,l]of[['background','Background'],['color','Text colour'],['hoverBackground','Hover background'],['hoverColor','Hover text colour'],['focusColor','Keyboard focus colour']])paletteField(d,l,b[k],v=>update(k,v));for(const[k,l]of[['padX','Horizontal padding'],['padY','Vertical padding']])refField(d,l,b[k],'spaces',v=>update(k,v));for(const[k,l,kind]of[['radius','Corners','corners'],['border','Border','borders'],['shadow','Shadow','shadows']])refField(d,l,b[k],kind,v=>update(k,v));const note=document.createElement('p');note.className='hint';note.textContent='Disabled buttons use 45% opacity. Keyboard focus uses a visible outline.';d.append(note)}action(g,'+ Add button style',()=>{P.design.buttons[uid('button')]={...clone(P.design.buttons.main),name:'New button style'};inspect()},'full');
g=group('Responsive layout defaults',false);const lay=device==='desktop'?P.design.layout:(P.design.responsive[device]??={});for(const[k,l]of[['width','Content maximum width'],['side','Page side padding'],['top','Standard Section top padding'],['bottom','Standard Section bottom padding']])field(g,l,layout()[k],'number',v=>{lay[k]=v;render()},{min:0,max:3000,state:device==='desktop'?'Default':Object.hasOwn(lay,k)?'Customised':'Desktop',reset:device!=='desktop'&&Object.hasOwn(lay,k)?()=>{delete lay[k];render();inspect()}:null});field(g,'Section / column gap',layout().gap,'number',v=>{lay.gap=v;render()},{min:0,max:200,state:device==='desktop'?'Default':Object.hasOwn(lay,'gap')?'Customised':'Desktop',reset:device!=='desktop'&&Object.hasOwn(lay,'gap')?()=>{delete lay.gap;render();inspect()}:null});for(const[k,l]of[['imageRadius','Image corners'],['cardRadius','Card corners']])refField(g,l,P.design.layout[k],'corners',v=>{P.design.layout[k]=v;render()});
g=group('Section spacing presets',false);ensureSectionSpacingDesign(P);const spacingMode=device==='desktop'?'desktop':device;for(const[kind,title]of[['hero','Hero Sections'],['compact','Compact Sections (CTA / Footer)']]){const preset=P.design.sectionSpacing[kind][spacingMode];const d=document.createElement('details');d.className='group';d.innerHTML=`<summary>${title}</summary>`;g.append(d);field(d,'Top padding',preset.top,'number',v=>{preset.top=v;render()},{min:0,max:300});field(d,'Bottom padding',preset.bottom,'number',v=>{preset.bottom=v;render()},{min:0,max:300})}
for(const[kind,title]of[['spaces','Spacing sizes'],['corners','Corner styles'],['borders','Border styles'],['shadows','Shadow styles']]){g=group(title,false);if(kind==='spaces'){const note=document.createElement('p');note.className='hint';note.textContent='Text spacing and Card padding control stock components. Other named sizes are available for local assignment.';g.append(note)}for(const[id,o]of Object.entries(P.design[kind])){const d=document.createElement('details');d.className='group';d.innerHTML=`<summary>${esc(o.name)}</summary>`;g.append(d);field(d,'Name',o.name,'text',v=>{o.name=v;inspect()});field(d,kind==='shadows'?'CSS shadow':'Value (px)',o.value,kind==='shadows'?'text':'number',v=>{o.value=v;render()},{min:0,max:1000});if(kind==='borders'){field(d,'Border line',o.line,'select',v=>{o.line=v;render()},{choices:['solid','dashed','dotted']});paletteField(d,'Border colour',o.color,v=>{o.color=v;render()})}}action(g,'+ Add '+title.toLowerCase().replace(/s$/,''),()=>{P.design[kind][uid(kind)]={name:'New style',value:kind==='shadows'?'0 4px 16px #00000020':8,...(kind==='borders'?{line:'solid',color:'$primary'}:{})};inspect()},'full')}}
function deleteColour(id){const c=P.design.colours[id];const d=showDialog('Replace colour',`<p>Choose a replacement for <b>${esc(c.name)}</b>. Every reference to this colour will be updated.</p>`);let replacement=Object.keys(P.design.colours).find(k=>k!==id);field(d,'Replacement colour',replacement,'select',v=>replacement=v,{choices:Object.entries(P.design.colours).filter(([k])=>k!==id).map(([k,v])=>[k,v.name])});const a=document.createElement('div');a.className='actions';d.append(a);action(a,'Cancel',closeDialog);action(a,'Replace and remove',()=>{if(!replacement)return;function replace(o){for(const k of Object.keys(o)){if(o[k]==='$'+id)o[k]='$'+replacement;else if(o[k]&&typeof o[k]==='object')replace(o[k])}}replace(P);if(Object.hasOwn(colourNames,id)){P.design.colours[id]={name:colourNames[id],value:P.design.colours[replacement].value};toast('Required role retained using replacement colour')}else delete P.design.colours[id];closeDialog();render();inspect()},'primary')}
function showDialog(title,html=''){const d=$('#dialogContent');d.innerHTML=`<h2>${esc(title)}</h2>${html}`;if(!$('#dialog').open)$('#dialog').showModal();return d}
function closeDialog(){$('#dialog').close()}
function saveStyle(name){if(!name.trim())return false;const styles=read(KEYS.presets);if(Object.hasOwn(PRESETS,name)||Object.hasOwn(styles,name)){toast('Choose a new preset name.');return false}styles[name]=clone(P.design);return persist(KEYS.presets,styles)}
function saveStyleDialog(){const d=showDialog('Save reusable Style','<p>Saves shared design rules so they can be reused in other projects.</p>');let name='My Style';field(d,'Preset name',name,'text',v=>name=v);const a=document.createElement('div');a.className='actions';d.append(a);action(a,'Cancel',closeDialog);action(a,'Save preset',()=>{if(saveStyle(name)){closeDialog();inspect();toast('Style preset saved')}},'primary')}
function clearAppearance(n){
 const keep=st=>Object.fromEntries(Object.entries(st||{}).filter(([k])=>compositionKeys.includes(k)));
 n.style=keep(n.style);n.responsive=Object.fromEntries(Object.entries(n.responsive||{}).map(([mode,st])=>[mode,keep(st)]));delete n.preset;
}
function applyPreset(name){const preset=({...PRESETS,...read(KEYS.presets)})[name];if(!preset)return false;P.design=ensureStyleContract(clone(preset));P.stylePreset=name;for(const {section:s} of projectSectionEntries(P)){connectComponentStyle(s);clearAppearance(s);walk(s.elements,clearAppearance)}render();inspect();return true}
function confirmPreset(name){const d=showDialog('Apply '+name+'?',`<p>This replaces your current styling, including local colours, typography sizes, spacing, corners, borders and shadows.</p><p><b>Your content, image crops, component composition and local layout choices remain.</b> Section background images are styling and will be removed.</p>`);let saveName='My Style '+new Date().toLocaleDateString();field(d,'Optional name for current Style',saveName,'text',v=>saveName=v);const a=document.createElement('div');a.className='actions';d.append(a);action(a,'Cancel',()=>{closeDialog();inspect()});action(a,'Save Style & apply',()=>{if(saveStyle(saveName)&&applyPreset(name)){closeDialog();toast('Preset applied')}});action(a,'Apply preset',()=>{if(applyPreset(name)){closeDialog();toast('Preset applied')}},'primary')}
function cloneSectionForPage(section,targetPage){
  const cp=clone(section),oldSectionId=section.id;
  cp.id=uid('section');
  regenerateNodeIds(cp.elements);
  if(targetPage)cp.anchor=uniqueSectionAnchor(targetPage,cp.anchor||cp.name||cp.type||'section');
  walk(cp.elements,n=>{if(n.linkType==='section'&&n.linkSectionId===oldSectionId)n.linkSectionId=cp.id});
  return cp;
}

function sectionPageTransferDialog(section,mode){
  if(!isSection(section))return;
  if(isSharedSection(section)){toast('Site-wide Sections already appear on every page');return}
  const source=activePage();
  const targets=P.pages.filter(page=>page.id!==source.id);
  if(!targets.length){toast('Add another page first');return}

  const moving=mode==='move';
  const title=(moving?'Move ':'Copy ')+label(section)+' to page';
  const d=showDialog(title,`<p>${moving?'Moves':'Copies'} the complete Section, including its Containers, Elements, content, styling and responsive overrides.</p>`);
  let targetId=targets[0].id;

  field(d,'Destination page',targetId,'select',v=>targetId=v,{
    choices:targets.map(page=>[page.id,page.name+' — '+page.slug])
  });

  const note=document.createElement('p');
  note.className='card-note';
  note.textContent=moving
    ?'The existing Section and IDs are preserved. It will be removed from '+source.name+'.'
    :'The copied Section receives new IDs so the two copies remain independent.';
  d.append(note);

  const actions=document.createElement('div');
  actions.className='actions';
  d.append(actions);
  action(actions,'Cancel',closeDialog);
  action(actions,moving?'Move Section':'Copy Section',()=>{
    const targetPage=P.pages.find(page=>page.id===targetId);
    if(!targetPage||targetPage.id===source.id)return;

    const sourceIndex=source.sections.indexOf(section);
    if(sourceIndex<0){closeDialog();toast('Section could not be found');return}

    if(moving){
      source.sections.splice(sourceIndex,1);
      section.anchor=uniqueSectionAnchor(targetPage,section.anchor||section.name||section.type||'section');
      targetPage.sections.push(section);
      selection=null;
      activeScope='style';
    }else{
      targetPage.sections.push(cloneSectionForPage(section,targetPage));
    }
    syncAllLinkHrefs();

    closeDialog();
    render();
    inspect();
    toast(label(section)+' '+(moving?'moved':'copied')+' to '+targetPage.name);
  },'primary');
}

function protectedLayoutMutation(n,op){
  return !!n?.isSectionRoot;
}
function mutateNode(n,op){
  if(n?.role==='programItem'&&op==='delete'){const collection=programCollectionParent(n);if(collection&&collection.children.filter(x=>x?.role==='programItem').length<=1){toast('A Programs section needs at least one program.');return}}
  if(n?.role==='coachItem'&&op==='delete'){const collection=coachCollectionParent(n);if(collection&&collection.children.filter(x=>x?.role==='coachItem').length<=1){toast('A Coaches section needs at least one coach.');return}}
  if(n?.type==='image'&&galleryImageParent(n)&&op==='delete'){const collection=galleryImageParent(n);if(collection.children.filter(x=>x?.type==='image').length<=1){toast('A Gallery section needs at least one image.');return}}
  const path=pathTo(n.id),parent=path.at(-2),sharedTop=isSharedSection(n),arr=parent?(parent.children||parent.elements):(sharedTop?null:currentSections()),i=arr?arr.indexOf(n):-1;
  if(sharedTop){
    const kind=sharedSectionKind(n);
    if(op==='delete'){
      const d=showDialog('Delete site-wide '+(kind==='navbar'?'Navbar':'Footer')+'?',`<p>This removes the shared ${kind==='navbar'?'Navbar':'Footer'} from every page.</p>`);
      action(d,'Cancel',closeDialog);
      action(d,'Delete',()=>{ensureSharedMap(P)[kind]=null;closeDialog();selection=null;activeScope='style';render();renderLibrary($('#componentSearch')?.value||'');inspect();toast('Site-wide '+(kind==='navbar'?'Navbar':'Footer')+' removed')},'danger');
    }else toast('Site-wide Sections stay in their fixed region');
    return;
  }
  if(protectedLayoutMutation(n,op)){
    if(op==='delete'){
      const d=showDialog('Protected layout structure','<p>This Container defines the stock layout and cannot be deleted independently. Change the layout preset or delete the outer Container instead.</p>');
      action(d,'Cancel',closeDialog);action(d,'Delete',()=>{closeDialog();toast('Stock layout structure was preserved')},'danger');
    }else toast('Stock layout structure is protected');
    return;
  }
  if(op==='delete'){
    const d=showDialog('Delete '+label(n)+'?','<p>This removes the selected layer and its contents.</p>');
    action(d,'Cancel',closeDialog);
    action(d,'Delete',()=>{arr.splice(i,1);closeDialog();select(parent?.id||null)},'danger');return;
  }
  if(op==='duplicate'){
    const cp=clone(n),oldId=n.id;cp.id=uid(isSection(n)?'section':'copy');
    regenerateNodeIds(cp.children||cp.elements);
    if(isSection(n)){
      cp.anchor=uniqueSectionAnchor(activePage(),cp.anchor||cp.name||cp.type||'section');
      walk(cp.elements,x=>{if(x.linkType==='section'&&x.linkSectionId===oldId)x.linkSectionId=cp.id});
    }
    arr.splice(i+1,0,cp);select(cp.id);syncAllLinkHrefs();
  }else{
    const j=op==='up'?i-1:i+1;if(j>=0&&j<arr.length)[arr[i],arr[j]]=[arr[j],arr[i]];render();inspect();
  }
}
function readImageFile(file,onReady){
  if(!file)return;
  if(file.size>6*1024*1024){toast('Choose an image smaller than 6 MB.');return}
  if(!/^image\//i.test(file.type||'')){toast('Choose a valid image file.');return}
  const r=new FileReader();
  r.onerror=()=>toast('That image could not be read.');
  r.onload=()=>{
    const candidate=r.result,probe=new Image();
    probe.onload=()=>onReady(candidate,file);
    probe.onerror=()=>toast('That file is not a valid image.');
    probe.src=candidate;
  };
  r.readAsDataURL(file);
}
function assignAsset(n,key,assetId){
  if(key==='src'){
    n.assetId=assetId||'';
    delete n.src;
  }else{
    const layer=target(n,key);
    layer.bgAssetId=assetId||'';
    delete layer.bgImage;
  }
  render();inspect();renderAssets();
}
function uploadImage(n,key){
  const pick=document.createElement('input');pick.type='file';pick.accept='image/*';
  pick.onchange=()=>readImageFile(pick.files[0],(candidate,file)=>{
    const asset=addProjectAsset({name:assetNameFromFile(file.name),data:candidate,mime:file.type,size:file.size,source:'upload'});
    if(asset)assignAsset(n,key,asset.id);
  });
  pick.click();
}
// Stock remains a shared catalogue; only chosen references enter a project.
function stockProjectAsset(photo){
  const asset=addProjectAsset({name:photo.title,data:photo.url,source:'stock',mime:'image/jpeg'});
  if(asset){asset.stockId=photo.id;asset.sourceUrl=photo.sourceUrl;asset.photographer=photo.photographer;asset.licenseUrl=photo.licenseUrl;asset.remoteUrl=photo.url}
  return asset;
}
function applyStockDefaults(section){
  const defaults={
    'hero-01':[38678659],'hero-02':[11392013],'hero-03':[38674471],
    'hero-04':[11392044],'hero-05':[38718030],'about-01':[8612498],
    'bjj-academy-story-01':[11391978],
    'bjj-academy-gallery-01':[38678659,11391989,8612531,11392335,38718030,11392013],
    'bjj-programs-image-01':[38732379,11392044,28945401],
    'bjj-coaches-01':[8611971,29956727,38678667],
    'bjj-head-coach-01':[8611971]
  };
  const ids=defaults[section.componentId];if(!ids)return;
  let i=0;
  walk(section.elements,node=>{
    if(node.type!=='image')return;
    const id=ids[i++%ids.length];if(node.assetId||node.src)return;
    const photo=RUNA_STOCK.find(x=>x.id===String(id));if(!photo)return;
    const asset=stockProjectAsset(photo);if(!asset)return;
    node.assetId=asset.id;delete node.src;node.alt=photo.title;
    node.baseStyle={...node.baseStyle,fit:'cover',focalX:50,focalY:50};
  });
}
function applyComponentMotion(section){
  // Enrich the original templates without changing authored motion settings.
  const supported=['hero-01','hero-02','hero-03','hero-04','hero-05','services-01','about-01','cta-01','bjj-coaches-01','footer-01'];
  if(!supported.includes(section.componentId))return false;
  let cardIndex=0;
  const visit=(nodes,insideReveal=false)=>{
    for(const node of nodes||[]){
      let defaults={};
      if(node.type==='group'&&node.role==='card')defaults={reveal:'rise',delay:Math.min(cardIndex++*80,240),hover:'lift'};
      else if(node.type==='group'&&node.role==='contentGroup'&&!insideReveal)defaults={reveal:'rise',delay:0};
      else if(node.type==='image')defaults={...(!insideReveal?{reveal:'rise',delay:80}:{}),hover:'zoom'};
      else if(node.type==='button'&&!insideReveal)defaults={reveal:'fade',delay:120};
      if(Object.keys(defaults).length)node.motion={...defaults,...node.motion};
      visit(node.children,insideReveal||!!(node.motion?.reveal&&node.motion.reveal!=='none'));
    }
  };
  visit(section.elements);return true;
}
function componentPolishInspector(){
  const selected=find(selection);if(!selected)return;
  const section=pathTo(selected.id).find(isSection);if(!section)return;
  const isCoach=['bjj-coaches-01','bjj-head-coach-01'].includes(section.componentId);
  if(isCoach){
    const images=[];walk(section.elements,node=>{if(node.type==='image')images.push(node)});
    if(images.some(node=>assetById(node.assetId)?.source==='stock')){
      const note=document.createElement('p');note.className='card-note coach-stock-reminder';
      note.textContent='Stock coach photos in this section — replace with actual coach photos before publishing. Check sample names, ranks and biographies too.';
      $('#inspector').prepend(note);
    }
    if(isSection(selected)&&images.some(node=>!node.assetId&&!node.src))action($('#inspector'),'Add stock coach placeholders',()=>{applyStockDefaults(section);render();inspect();renderAssets()},'full');
  }
  if(isSection(selected)&&['hero-01','hero-02','hero-03','hero-04','hero-05','services-01','about-01','cta-01','bjj-coaches-01','footer-01'].includes(section.componentId)){
    action($('#inspector'),'Apply motion defaults',()=>{applyComponentMotion(section);render();inspect();toast('Motion defaults applied. Use Preview to see them.')},'full');
  }
}
function assetPicker(n,key){
  const d=showDialog(n?'Choose image':'Stock collection','<p>Use an academy photo or choose a stock image. Stock previews need internet access.</p>');
  const tabs=document.createElement('div');tabs.className='stock-tabs';d.append(tabs);
  let mode=n&&ensureAssets(P).length?'project':'stock';
  const search=document.createElement('input');search.type='search';search.placeholder='Search images, photographer or role';search.setAttribute('aria-label','Search images');d.append(search);
  const filters=document.createElement('div');filters.className='stock-filters';
  const discipline=document.createElement('select');discipline.setAttribute('aria-label','Stock collection filter');
  for(const [v,l] of [['all','All stock images'],['nogi','No-gi']]){const o=document.createElement('option');o.value=v;o.textContent=l;discipline.append(o)}
  const role=document.createElement('select');role.setAttribute('aria-label','Image role');
  for(const r of ['All roles',...new Set(RUNA_STOCK.flatMap(x=>x.roles))]){const o=document.createElement('option');o.value=r;o.textContent=r;role.append(o)}
  filters.append(discipline,role);d.append(filters);
  const note=document.createElement('p');note.className='hint';note.textContent='Use real academy photos for coaches, members and facilities.';d.append(note);
  const count=document.createElement('p');count.className='hint';count.setAttribute('aria-live','polite');d.append(count);
  const grid=document.createElement('div');grid.className='asset-picker-grid stock-grid';d.append(grid);
  function choose(asset,photo){
    if(!asset)return;
    if(n){if(key==='src'&&photo)n.alt=photo.title;assignAsset(n,key,asset.id)}
    else{renderAssets();toast('Image added to project assets')}
    closeDialog();
  }
  function draw(){
    tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
    filters.hidden=mode!=='stock';note.hidden=mode!=='stock';grid.replaceChildren();
    const q=search.value.trim().toLowerCase();
    const list=mode==='stock'?RUNA_STOCK.filter(x=>(discipline.value!=='nogi'||x.noGi)&&(role.value==='All roles'||x.roles.includes(role.value))&&[x.title,x.photographer,...x.roles,x.id].join(' ').toLowerCase().includes(q)):ensureAssets(P).filter(x=>x.type==='image'&&x.name.toLowerCase().includes(q));
    count.textContent=list.length+' images';
    if(!list.length){const empty=document.createElement('p');empty.textContent='No matching images.';grid.append(empty)}
    for(const item of list){
      const photo=mode==='stock'?item:null;
      const wrap=document.createElement('div');wrap.className='stock-choice';
      const card=document.createElement('button');card.type='button';card.className='asset-picker-card';card.setAttribute('aria-label',(n?'Use ':'Add ')+(photo?photo.title:item.name));
      const img=document.createElement('img');img.loading='lazy';img.src=photo?photo.url:assetUrl(item.id);img.alt='';
      img.onerror=()=>{img.hidden=true;card.classList.add('preview-unavailable')};
      const title=document.createElement('span');title.textContent=photo?photo.title:item.name;
      card.append(img,title);card.onclick=()=>choose(photo?stockProjectAsset(photo):item,photo);wrap.append(card);
      if(photo){const info=document.createElement('small');info.textContent=photo.photographer+(photo.noGi?' · No-gi':'');wrap.append(info);
        const source=document.createElement('a');source.href=photo.sourceUrl;source.target='_blank';source.rel='noopener';source.textContent='Source ↗';wrap.append(source);
        const licence=document.createElement('a');licence.href=photo.licenseUrl;licence.target='_blank';licence.rel='noopener';licence.textContent='Licence ↗';wrap.append(licence)}
      grid.append(wrap);
    }
  }
  if(n)for(const [value,label] of [['project','Project images'],['stock','Stock collection']]){const b=document.createElement('button');b.type='button';b.dataset.mode=value;b.textContent=label;b.onclick=()=>{mode=value;draw()};tabs.append(b)}
  search.oninput=draw;discipline.onchange=draw;role.onchange=draw;
  const actions=document.createElement('div');actions.className='actions';d.append(actions);
  if(n)action(actions,'Upload academy photo',()=>{closeDialog();uploadImage(n,key)});
  action(actions,'Close',closeDialog);draw();
}
function uploadAssetOnly(){
  const pick=document.createElement('input');pick.type='file';pick.accept='image/*';pick.multiple=true;
  pick.onchange=()=>{
    const files=[...pick.files];let remaining=files.length,added=0;
    if(!remaining)return;
    files.forEach(file=>readImageFile(file,(candidate,f)=>{
      if(addProjectAsset({name:assetNameFromFile(f.name),data:candidate,mime:f.type,size:f.size,source:'upload'}))added++;
      remaining--;
      if(remaining<=0){renderAssets();toast(added===1?'1 asset added':added+' assets added')}
    }));
  };
  pick.click();
}
function replaceAsset(asset){
  const pick=document.createElement('input');pick.type='file';pick.accept='image/*';
  pick.onchange=()=>readImageFile(pick.files[0],async(candidate,file)=>{
    delete asset.remoteUrl;delete asset.stockId;delete asset.sourceUrl;delete asset.photographer;delete asset.licenseUrl;asset.source='upload';asset.data=candidate;assetRuntime.set(asset.id,candidate);asset.fingerprint=assetFingerprint(candidate);asset.mime=file.type||asset.mime;asset.size=file.size||0;asset.updatedAt=new Date().toISOString();
    if(await putAssetBytes(asset.id,candidate))delete asset.data;
    renderAssets();render();inspect();toast(asset.name+' replaced everywhere');
  });
  pick.click();
}
function renderAssets(){
  const root=$('#assetsList');if(!root)return;
  root.replaceChildren();
  action(root,'Browse stock collection (42)',()=>assetPicker(null,'src'),'full');
  const assets=ensureAssets(P);
  $('#assetCount').textContent=assets.length+' '+(assets.length===1?'asset':'assets');
  if(!assets.length){
    root.insertAdjacentHTML('beforeend','<div class="asset-empty"><b>No project assets yet</b><span>Upload academy photos or choose from the stock collection.</span></div>');
    return;
  }
  for(const asset of assets){
    const card=document.createElement('div');card.className='asset-card';
    const img=document.createElement('img');img.src=assetUrl(asset.id);img.alt='';
    const body=document.createElement('div');body.className='asset-card-body';
    const name=document.createElement('input');name.type='text';name.value=asset.name||'Image';
    name.setAttribute('aria-label','Asset name');
    name.onchange=()=>{asset.name=uniqueAssetName(name.value,P,asset.id);name.value=asset.name};
    const meta=document.createElement('small');const uses=assetUsage(asset.id);meta.textContent=uses+' '+(uses===1?'use':'uses');
    const actions=document.createElement('div');actions.className='asset-card-actions';
    action(actions,'Replace',()=>replaceAsset(asset));
    action(actions,'Delete',()=>{
      const count=assetUsage(asset.id);
      if(count){toast('This asset is used '+count+' '+(count===1?'time':'times')+'. Replace or remove those uses first.');return}
      P.assets=P.assets.filter(a=>a.id!==asset.id);render();renderAssets();toast('Asset deleted');
    },'danger');
    body.append(name,meta,actions);card.append(img,body);root.append(card);
  }
}
async function saveCurrentProject(name=P.name){
  const clean=String(name||'').trim();
  if(!clean||clean.toLowerCase()==='untitled website'){toast('Give this project a name before saving.');return false}
  const all=read(KEYS.projects);
  if(Object.values(all).some(p=>p?.id!==P.id&&String(p?.name||'').trim().toLowerCase()===clean.toLowerCase())){toast('A saved project already uses that name.');return false}
  P.name=clean;P.savedAt=new Date().toISOString();P.version='3.14.4';$('#projectName').value=P.name;syncAllLinkHrefs();
  if(!(await persistProjectAssetBytes(P))){toast('Image storage could not be written. Your project was not saved.');return false}
  all[P.id]=projectForStorage(P);
  if(!persist(KEYS.projects,all))return false;
  toast('Project saved as '+P.name);
  return true;
}
function saveProjectDialog(){
  const d=showDialog('Save project','<p>Name this site so saved versions are easy to identify.</p>');let name=(P.name&&P.name!=='Untitled website')?P.name:'';
  field(d,'Project name',name,'text',v=>name=v);const a=document.createElement('div');a.className='actions';d.append(a);action(a,'Cancel',closeDialog);action(a,'Save',async()=>{if(await saveCurrentProject(name))closeDialog()},'primary');
}
function download(name,data){const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
let simpleRevealObserver=null;
let simpleRevealMaskTargets=new Map();
let previewInteractionKeyHandler=null;
function closeLightbox(){
  document.querySelector('.runa-lightbox')?.remove();
  document.body.classList.remove('lightbox-open');
  if(previewInteractionKeyHandler){document.removeEventListener('keydown',previewInteractionKeyHandler);previewInteractionKeyHandler=null}
}
function openLightbox(source){
  const group=source.dataset.lightboxGroup||'';
  if(!group)return;
  const images=[...document.querySelectorAll(`#canvas .image-node[data-lightbox-group="${CSS.escape(group)}"]`)];
  if(!images.length)return;
  let index=Math.max(0,images.indexOf(source)),touchStartX=null;
  closeLightbox();
  const overlay=document.createElement('div');overlay.className='runa-lightbox';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Image gallery');
  const frame=document.createElement('div');frame.className='runa-lightbox-frame';
  const image=document.createElement('img');image.className='runa-lightbox-image';
  const footer=document.createElement('div');footer.className='runa-lightbox-footer';
  const caption=document.createElement('div');caption.className='runa-lightbox-caption';
  const count=document.createElement('div');count.className='runa-lightbox-count';
  const close=document.createElement('button');close.type='button';close.className='runa-lightbox-close';close.textContent='×';close.setAttribute('aria-label','Close gallery');
  const prev=document.createElement('button');prev.type='button';prev.className='runa-lightbox-prev';prev.textContent='←';prev.setAttribute('aria-label','Previous image');
  const next=document.createElement('button');next.type='button';next.className='runa-lightbox-next';next.textContent='→';next.setAttribute('aria-label','Next image');
  const paint=()=>{
    const sourceEl=images[index],src=sourceEl.querySelector('img');image.src=src?.src||'';image.alt=src?.alt||'';
    const showCaption=sourceEl.dataset.galleryShowCaption!=='false';caption.textContent=showCaption?(sourceEl.dataset.galleryCaption||src?.alt||''):'';caption.hidden=!caption.textContent;
    count.textContent=`${index+1} / ${images.length}`;prev.hidden=next.hidden=images.length<2;
  };
  prev.onclick=e=>{e.stopPropagation();index=(index-1+images.length)%images.length;paint()};
  next.onclick=e=>{e.stopPropagation();index=(index+1)%images.length;paint()};
  close.onclick=closeLightbox;overlay.onclick=e=>{if(e.target===overlay)closeLightbox()};
  overlay.addEventListener('touchstart',e=>{touchStartX=e.changedTouches?.[0]?.clientX??null},{passive:true});
  overlay.addEventListener('touchend',e=>{if(touchStartX===null)return;const end=e.changedTouches?.[0]?.clientX??touchStartX,dx=end-touchStartX;touchStartX=null;if(Math.abs(dx)<48)return;if(dx<0)next.click();else prev.click()},{passive:true});
  footer.append(caption,count);frame.append(image,footer);overlay.append(frame,close,prev,next);document.body.append(overlay);document.body.classList.add('lightbox-open');paint();close.focus();
  previewInteractionKeyHandler=e=>{if(e.key==='Escape')closeLightbox();else if(e.key==='ArrowLeft')prev.click();else if(e.key==='ArrowRight')next.click()};
  document.addEventListener('keydown',previewInteractionKeyHandler);
}
function setupAccordion(root){
  if(root.dataset.interactionBound==='1')return;root.dataset.interactionBound='1';
  const triggers=[...root.querySelectorAll('[data-interaction-role="trigger"][data-interaction-key]')];
  const panels=[...root.querySelectorAll('[data-interaction-role="panel"][data-interaction-key]')];
  if(!triggers.length||!panels.length)return;
  const setOpen=key=>{root.dataset.interactionActive=key||'';triggers.forEach(t=>{const open=t.dataset.interactionKey===key;t.classList.toggle('is-accordion-open',open);t.setAttribute('aria-expanded',String(open))});panels.forEach(p=>{const open=p.dataset.interactionKey===key;p.classList.toggle('is-accordion-open',open);p.setAttribute('aria-hidden',String(!open));p.style.maxHeight=open?p.scrollHeight+'px':'0px'})};
  triggers.forEach(t=>{t.tabIndex=0;t.setAttribute('role','button');t.onclick=()=>setOpen(root.dataset.interactionActive===t.dataset.interactionKey?'':t.dataset.interactionKey);t.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t.click()}}});
  setOpen(root.dataset.interactionDefault||'');
}
let galleryAutoScrollHandles=[];
function clearGalleryAutoScroll(){
  for(const stop of galleryAutoScrollHandles.splice(0)){try{stop()}catch{}}
  document.querySelectorAll('#canvas .gallery-auto-clone').forEach(el=>el.remove());
  document.querySelectorAll('#canvas .gallery-carousel-track').forEach(track=>{
    const rail=track.parentElement;
    if(!rail)return;
    [...track.children].filter(el=>!el.classList.contains('gallery-auto-clone')).forEach(el=>rail.append(el));
    track.remove();
  });
}
function setupGalleryRailInteractions(reduceMotion=false){
  clearGalleryAutoScroll();
  document.querySelectorAll('#canvas .gallery-scroll-rail').forEach(rail=>{
    const autoscroll=!reduceMotion&&rail.dataset.galleryAutoscroll==='true';
    const originals=[...rail.children].filter(el=>el.classList?.contains('image-node')&&!el.classList.contains('gallery-auto-clone'));
    if(originals.length<2||!autoscroll)return;

    // Autoplay is a continuous marquee/conveyor, not a stepped carousel.
    // Build one logical sequence of the real images, then repeat that exact
    // sequence enough times to keep the viewport filled. Move the track at a
    // constant px/sec rate and wrap the translation by the measured distance
    // from sequence 1's first item to sequence 2's first item. At the wrap
    // point both visual states are identical, so there is no visible reset.
    const railStyle=rail.getAttribute('style');
    const originalStyles=new Map(originals.map(el=>[el,el.getAttribute('style')]));
    const computed=getComputedStyle(rail);
    const gap=parseFloat(computed.columnGap||computed.gap)||0;
    const itemWidth=originals[0].getBoundingClientRect().width;
    if(!(itemWidth>0))return;

    rail.scrollLeft=0;
    rail.classList.add('gallery-carousel-active');
    rail.style.setProperty('overflow-x','hidden','important');
    rail.style.scrollSnapType='none';
    rail.style.scrollBehavior='auto';
    rail.style.paddingBottom='0';

    const track=document.createElement('div');
    track.className='gallery-carousel-track';
    track.style.display='flex';
    track.style.flexDirection='row';
    track.style.flexWrap='nowrap';
    track.style.gap=gap+'px';
    track.style.width='max-content';
    track.style.minWidth='max-content';
    track.style.willChange='transform';
    track.style.transform='translate3d(0,0,0)';

    const prepareItem=(item,isClone=false)=>{
      item.style.flex=`0 0 ${itemWidth}px`;
      item.style.width=itemWidth+'px';
      item.style.minWidth=itemWidth+'px';
      item.style.scrollSnapAlign='none';
      if(isClone){
        item.classList.add('gallery-auto-clone');
        item.removeAttribute('data-id');
        item.removeAttribute('data-lightbox-group');
        item.removeAttribute('tabindex');
        item.removeAttribute('role');
        item.draggable=false;
        item.setAttribute('aria-hidden','true');
        item.querySelectorAll('[data-lightbox-group]').forEach(el=>el.removeAttribute('data-lightbox-group'));
        item.querySelectorAll('[data-id]').forEach(el=>el.removeAttribute('data-id'));
      }
      return item;
    };
    const makeClone=source=>{
      const clone=prepareItem(source.cloneNode(true),true);
      clone.style.pointerEvents='auto';
      clone.onclick=e=>{e.preventDefault();e.stopPropagation();openLightbox(source)};
      return clone;
    };

    // Sequence 1 is the real gallery content.
    for(const source of originals)track.append(prepareItem(source,false));
    // Sequence 2 establishes the exact cycle stride, including the normal gap
    // between the last image and the first image of the next sequence.
    const secondStart=makeClone(originals[0]);
    track.append(secondStart);
    for(const source of originals.slice(1))track.append(makeClone(source));
    rail.append(track);

    // Use actual laid-out coordinates instead of reconstructing widths. This
    // makes the loop robust to any future card width/gap changes.
    const cycleWidth=secondStart.offsetLeft-originals[0].offsetLeft;
    if(!(cycleWidth>0)){
      for(const source of originals)rail.append(source);
      track.remove();
      rail.classList.remove('gallery-carousel-active');
      if(railStyle===null)rail.removeAttribute('style');else rail.setAttribute('style',railStyle);
      for(const source of originals){const prior=originalStyles.get(source);if(prior===null)source.removeAttribute('style');else source.setAttribute('style',prior)}
      return;
    }

    // Two sequences are enough whenever one full sequence is at least as wide
    // as the viewport. For unusually small galleries, keep appending complete
    // sequences until there is always at least one viewport of content beyond
    // the loop boundary. This guarantees there can never be exposed dead space.
    while(track.scrollWidth < rail.clientWidth + cycleWidth){
      for(const source of originals)track.append(makeClone(source));
    }

    const speed={slow:28,standard:44,fast:68}[rail.dataset.galleryScrollSpeed||'slow']||28; // px/sec
    let offset=0;
    let lastTime=performance.now();
    let raf=0;
    let stopped=false;
    const tick=now=>{
      if(stopped)return;
      const dt=Math.min(64,Math.max(0,now-lastTime));
      lastTime=now;
      if(!document.hidden){
        offset=(offset+speed*dt/1000)%cycleWidth;
        track.style.transform=`translate3d(${-offset}px,0,0)`;
      }
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);

    galleryAutoScrollHandles.push(()=>{
      stopped=true;
      cancelAnimationFrame(raf);
      for(const source of originals){
        rail.append(source);
        const prior=originalStyles.get(source);
        if(prior===null)source.removeAttribute('style');else source.setAttribute('style',prior);
      }
      track.remove();
      rail.classList.remove('gallery-carousel-active');
      if(railStyle===null)rail.removeAttribute('style');else rail.setAttribute('style',railStyle);
    });
  });
}
function setupSimplePreviewInteractions(){
  simpleRevealObserver?.disconnect();simpleRevealObserver=null;simpleRevealMaskTargets.clear();clearGalleryAutoScroll();
  if(!previewMode)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.toggle('motion-reduced',reduce);document.body.classList.toggle('motion-enabled',!reduce);
  const reveal=[...document.querySelectorAll('#canvas [data-motion-reveal]')];
  if(reduce)reveal.forEach(el=>el.classList.add('is-revealed'));
  else if('IntersectionObserver'in window){
    simpleRevealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const mapped=simpleRevealMaskTargets.get(entry.target)||[];
      const targets=entry.target.matches?.('[data-motion-reveal]')?[entry.target,...mapped]:mapped.length?mapped:[entry.target];
      targets.forEach(el=>el.classList.add('is-revealed'));
      simpleRevealObserver?.unobserve(entry.target);simpleRevealMaskTargets.delete(entry.target);
    }),{root:$('#scroll'),threshold:.12,rootMargin:'0px 0px -6% 0px'});
    reveal.forEach(el=>{
      if(el.dataset.motionReveal==='mask'&&el.parentElement){
        const sentinel=el.parentElement;
        const targets=simpleRevealMaskTargets.get(sentinel)||[];
        targets.push(el);simpleRevealMaskTargets.set(sentinel,targets);simpleRevealObserver.observe(sentinel);
      }else simpleRevealObserver.observe(el);
    });
  }else reveal.forEach(el=>el.classList.add('is-revealed'));
  document.querySelectorAll('#canvas .image-node[data-lightbox-group]').forEach(el=>{el.tabIndex=0;el.setAttribute('role','button');el.onclick=()=>openLightbox(el);el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLightbox(el)}}});
  document.querySelectorAll('#canvas [data-interaction-recipe="accordion"]').forEach(setupAccordion);
  setupGalleryRailInteractions(reduce);
}

let previewMode=false;
let previewReturnState=null;
function syncPanelButtons(){
  $('#toggleLeft').textContent=document.body.classList.contains('left-collapsed')?'Show left':'Hide left';
  $('#toggleRight').textContent=document.body.classList.contains('right-collapsed')?'Show right':'Hide right';
}
function syncPreviewDeviceFromWidth({force=false}={}){
  if(!previewMode)return;
  const next=previewDeviceForWidth(window.innerWidth);
  if(!force&&next===device)return;
  device=next;
  render();
}
function setPreviewMode(on){
  const next=!!on;
  if(next===previewMode)return;
  if(next){
    previewReturnState={device,selection,activeScope,scrollTop:$('#scroll')?.scrollTop||0};
    previewMode=true;
    clearEditorNavbarOverlay();
    document.body.classList.add('preview-mode');
    $('#exitPreview').hidden=false;
    device=previewDeviceForWidth(window.innerWidth);
    selection=null;activeScope='style';
    const stage=$('#stage'),shell=$('#stageShell');
    if(stage){stage.style.transform='none';stage.style.width='100%';stage.style.maxWidth='none'}
    if(shell){shell.style.width='100%';shell.style.height='auto'}
    render();
    $('#scroll').scrollTop=0;
  }else{
    previewMode=false;
    simpleRevealObserver?.disconnect();simpleRevealObserver=null;simpleRevealMaskTargets.clear();closeLightbox();
    document.body.classList.remove('preview-mode','motion-enabled','motion-reduced');
    $('#exitPreview').hidden=true;
    const prior=previewReturnState||{};
    device=EDITOR_VIEWPORTS[prior.device]?prior.device:'desktop';
    selection=prior.selection&&find(prior.selection)?prior.selection:null;
    activeScope=selection?'node':(prior.activeScope||'style');
    previewReturnState=null;
    syncDeviceUI();
    render();inspect();
    requestAnimationFrame(()=>{
      syncEditorViewport();
      if($('#scroll')&&Number.isFinite(prior.scrollTop))$('#scroll').scrollTop=prior.scrollTop;
    });
  }
}
$('#toggleLeft').onclick=()=>{document.body.classList.toggle('left-collapsed');syncPanelButtons()};
$('#toggleRight').onclick=()=>{document.body.classList.toggle('right-collapsed');syncPanelButtons()};
$('#previewPage').onclick=()=>setPreviewMode(true);
$('#exitPreview').onclick=()=>setPreviewMode(false);
syncPanelButtons();
$('#styleTab').onclick=()=>select(null);$('#quickMode').onclick=()=>{inspectorMode='quick';syncInspectorMode();inspect()};$('#advancedMode').onclick=()=>{inspectorMode='advanced';syncInspectorMode();inspect()};
function setLeftPanel(which){
  const map={pages:'#pagesPanel',library:'#libraryPanel',assets:'#assetsPanel',tree:'#treePanel'};
  for(const [key,sel] of Object.entries(map))$(sel).hidden=key!==which;
  $('#pagesTab').classList.toggle('active',which==='pages');
  $('#libraryTab').classList.toggle('active',which==='library');
  $('#assetsTab').classList.toggle('active',which==='assets');
  $('#treeTab').classList.toggle('active',which==='tree');
  if(which==='assets')renderAssets();
}
$('#pagesTab').onclick=()=>setLeftPanel('pages');
$('#libraryTab').onclick=()=>setLeftPanel('library');
$('#assetsTab').onclick=()=>setLeftPanel('assets');
$('#treeTab').onclick=()=>setLeftPanel('tree');
$('#addAsset').onclick=uploadAssetOnly;
$('#addPage').onclick=()=>pageEditorDialog({name:'New page',slug:'/new-page'},{isNew:true});
function loadEditorialBjjPrototype(){
  const page=activePage();
  const apply=()=>{
    const byId=id=>COMPONENTS.find(c=>c.id===id);
    const missing=EDITORIAL_HOME_COMPONENT_IDS.filter(id=>!byId(id));
    if(missing.length){toast('Editorial prototype components are unavailable.');return}
    page.name='Home';page.slug='/';page.sections=EDITORIAL_HOME_COMPONENT_IDS.map(id=>makeSection(byId(id)));
    const shared=ensureSharedMap(P),nav=byId('bjj-nav-editorial-01'),footer=byId('bjj-footer-editorial-01');
    if(nav)shared.navbar=makeSection(nav);
    if(footer)shared.footer=makeSection(footer);
    P.name='Editorial BJJ prototype';$('#projectName').value=P.name;
    selection=null;activeScope='style';renderPages();render();renderLibrary($('#componentSearch')?.value||'');inspect();
    toast('Editorial BJJ prototype loaded');
  };
  if(page.sections.length||ensureSharedMap(P).navbar||ensureSharedMap(P).footer){
    const d=showDialog('Load editorial BJJ prototype?','<p>This replaces the Sections on the current page and the site-wide Navbar/Footer so the complete composition can be reviewed as designed.</p>');
    action(d,'Cancel',closeDialog);action(d,'Load prototype',()=>{closeDialog();apply()},'primary');
  }else apply();
}
$('#editorialStarter').onclick=loadEditorialBjjPrototype;
renderLibrary();$('#addBlankSectionBtn').onclick=()=>addBlankSection();
$('#componentSearch').oninput=e=>renderLibrary(e.target.value);
$$('[data-device]').forEach(b=>b.onclick=()=>setEditorDevice(b.dataset.device));
$('#projectName').oninput=e=>P.name=e.target.value||'Untitled website';
$('#save').onclick=async()=>{const all=read(KEYS.projects);if(!all[P.id]||!P.name.trim()||P.name==='Untitled website')saveProjectDialog();else await saveCurrentProject(P.name)};
$('#export').onclick=async()=>{try{syncAllLinkHrefs();const safeName=(P.name&&P.name!=='Untitled website'?P.name:'runa-project').replace(/[^a-z0-9-]/gi,'-');const project=await exportableProject(P);download(safeName+'.json',{...project,exportedLayerStyles:read('runa-v106-layer-presets'),exportedStyles:read(KEYS.presets)})}catch(err){toast('Cannot export: '+err.message)}};
$('#import').onclick=()=>$('#fileImport').click();
$('#fileImport').onchange=async e=>{const file=e.target.files[0];if(!file)return;const touched=['runa-v106-layer-presets',KEYS.presets],beforeStorage=Object.fromEntries(touched.map(k=>[k,localStorage.getItem(k)]));const rollback=()=>{for(const [k,v] of Object.entries(beforeStorage)){try{if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch{}}};try{const p=migrate(JSON.parse(await file.text()));if(p.exportedLayerStyles&&!persist('runa-v106-layer-presets',{...read('runa-v106-layer-presets'),...p.exportedLayerStyles})){rollback();return}delete p.exportedLayerStyles;if(p.exportedStyles&&!persist(KEYS.presets,{...read(KEYS.presets),...p.exportedStyles})){rollback();return}delete p.exportedStyles;delete p.exportedSnapshots;try{commitProject(p);if(!(await persistProjectAssetBytes(P)))throw Error('Imported images could not be stored.');await hydrateProjectAssets(P);render();renderAssets()}catch(err){rollback();throw err}toast('Project imported')}catch(err){rollback();toast('Cannot import: '+err.message)}e.target.value=''};
$('#open').onclick=()=>{
  const all=read(KEYS.projects),d=showDialog('Saved projects','<p>Projects are stored in this browser.</p>');
  const projects=Object.values(all).sort((a,b)=>String(b.savedAt||'').localeCompare(String(a.savedAt||'')));
  if(!projects.length)d.insertAdjacentHTML('beforeend','<p>No saved projects yet.</p>');
  for(const p of projects){
    const r=document.createElement('div');r.className='dialog-row';const meta=p.savedAt?new Date(p.savedAt).toLocaleString():(p.version||'Older project');
    r.innerHTML=`<span>${esc(p.name||'Untitled website')}<small>${esc(meta)}</small></span>`;
    action(r,'Open',async()=>{try{
      const originalVersion=p.version,next=migrate(clone(p));
      commitProject(next);
      await hydrateProjectAssets(P);
      render();renderAssets();
      const saved=read(KEYS.projects);
      const compact=projectForStorage(next);
      compact.savedAt=p.savedAt||new Date().toISOString();
      saved[next.id]=compact;
      persist(KEYS.projects,saved,{quiet:true});
      closeDialog();
      if(originalVersion!==next.version)toast('Older project repaired and opened');
    }catch(e){toast('Cannot open: '+e.message)}});
    action(r,'Delete',()=>{const c=showDialog('Delete saved project?','<p>This removes the saved browser copy. It does not delete the project currently open in the editor.</p>');action(c,'Cancel',()=>{closeDialog();$('#open').click()});action(c,'Delete',()=>{const next=read(KEYS.projects);delete next[p.id];if(persist(KEYS.projects,next)){closeDialog();$('#open').click()}},'danger')},'danger');d.append(r);
  }
  action(d,'Close',closeDialog,'full');
};

$('#undoBtn').onclick=undo;
$('#redoBtn').onclick=redo;
document.addEventListener('keydown',e=>{
  if(!(e.ctrlKey||e.metaKey)||e.altKey||String(e.key).toLowerCase()!=='z')return;
  const target=e.target;
  const editable=target?.isContentEditable||target?.matches?.('textarea,input[type="text"],input[type="search"],input[type="number"]');
  if(editable)return;
  e.preventDefault();
  if(e.shiftKey)redo();else undo();
});
$('#new').onclick=()=>{const d=showDialog('Start a new project?','<p>Unsaved changes to the current project will be lost.</p>');action(d,'Cancel',closeDialog);action(d,'New project',()=>{commitProject(fresh());closeDialog()})};
$('#dialog').addEventListener('cancel',()=>setTimeout(inspect,0));
window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();$('#save').click()}});
clearLegacySnapshotStorage();compactSavedProjectAssets();syncInspectorMode();renderLibrary();syncDeviceUI();render();inspect();
if(window.ResizeObserver){
  const editorObserver=new ResizeObserver(()=>{if(!previewMode)syncEditorViewport()});
  editorObserver.observe($('#stage'));
  editorObserver.observe($('#scroll'));
}
window.addEventListener('resize',()=>{if(previewMode)syncPreviewDeviceFromWidth();else syncEditorViewport()});
requestAnimationFrame(syncEditorViewport);
