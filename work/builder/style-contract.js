'use strict';
// Style is the source of visual appearance. Stock components only choose semantic roles
// and retain composition/layout decisions plus deliberate scale modifiers.
const CORE_PALETTE_ROLES=['bg','surface','primary','accent','accent2','text','secondary'];
const SUPPORTING_PALETTE_ROLES=['dark','onPrimary','onDark'];
const PALETTE_ROLE_INFO={
 bg:{name:'Background',description:'Main page and standard section background.'},
 surface:{name:'Alternative background',description:'Alternating sections, cards and secondary surfaces.'},
 primary:{name:'Brand',description:'Primary buttons, links and strongly branded elements.'},
 accent:{name:'Accent 1',description:'Eyebrows, markers and decorative emphasis.'},
 accent2:{name:'Accent 2',description:'A second independent accent for supporting highlights and interaction states.'},
 text:{name:'Main text',description:'Primary headings and body copy.'},
 secondary:{name:'Secondary text',description:'Supporting copy, captions and metadata.'},
 dark:{name:'Dark surface',description:'Footers and deliberately dark feature surfaces.'},
 onPrimary:{name:'Text on brand',description:'Text and icons placed on the Brand colour.'},
 onDark:{name:'Text on dark',description:'Text and icons placed on the Dark surface.'}
};
const SURFACE_TOKENS={background:'$bg',alternative:'$surface',brand:'$primary',dark:'$dark',transparent:'transparent'};
const TEXT_TOKENS={main:'$text',secondary:'$secondary',brand:'$primary',accent1:'$accent',accent2:'$accent2',onBrand:'$onPrimary',onDark:'$onDark'};
function legacySectionStyleRole(section){return section.type==='services'?'alternative':section.type==='cta'?'brand':section.type==='footer'?'dark':'background'}
function sectionSemanticStyle(section){
 const role=section.styleRole||legacySectionStyleRole(section),background=SURFACE_TOKENS[role]||'$bg';
 return{background,color:role==='brand'?'$onPrimary':role==='dark'?'$onDark':'$text'};
}
function nodeSemanticStyle(n){
 const out={};
 if(n.surfaceRole&&SURFACE_TOKENS[n.surfaceRole])out.background=SURFACE_TOKENS[n.surfaceRole];
 if(n.textRole&&TEXT_TOKENS[n.textRole])out.color=TEXT_TOKENS[n.textRole];
 else if(n.role==='kicker')out.color=n.sectionTone==='brand'?'$onPrimary':n.sectionTone==='dark'?'$onDark':'$primary';
 else if(n.role==='small')out.color='$secondary';
 else if(n.role==='navlink'&&n.sectionTone==='dark')out.color='$onDark';
 return out;
}
function buildPaletteControls(parent,{editableCustom=false}={}){
 const addRole=(host,id)=>{
  const c=P.design.colours[id],info=PALETTE_ROLE_INFO[id];if(!c||!info)return;
  const row=document.createElement('label');row.className='palette-role';
  const input=document.createElement('input');input.type='color';input.value=c.value;input.setAttribute('aria-label',info.name+' colour');input.oninput=()=>{c.value=input.value;renderPaintOnly()};
  const copy=document.createElement('span'),title=document.createElement('strong'),hint=document.createElement('small');title.textContent=info.name;hint.textContent=info.description;copy.append(title,hint);row.append(input,copy);host.append(row);
 };
 CORE_PALETTE_ROLES.forEach(id=>addRole(parent,id));
 const supporting=document.createElement('details');supporting.className='group';supporting.innerHTML='<summary>Supporting colours</summary>';SUPPORTING_PALETTE_ROLES.forEach(id=>addRole(supporting,id));parent.append(supporting);
 if(!editableCustom)return;
 const custom=document.createElement('details');custom.className='group';custom.innerHTML='<summary>Custom colours</summary>';
 const customIds=Object.keys(P.design.colours).filter(id=>!CORE_PALETTE_ROLES.includes(id)&&!SUPPORTING_PALETTE_ROLES.includes(id));
 if(!customIds.length){const note=document.createElement('p');note.className='hint';note.textContent='Use custom colours only when a local design needs something outside the site palette.';custom.append(note)}
 for(const id of customIds){const c=P.design.colours[id],row=document.createElement('div');row.className='colour-line';const pick=document.createElement('input');pick.type='color';pick.value=c.value;pick.setAttribute('aria-label',c.name+' colour');pick.oninput=()=>{c.value=pick.value;renderPaintOnly()};const name=document.createElement('input');name.type='text';name.value=c.name;name.setAttribute('aria-label','Name for '+c.name);name.onchange=()=>{c.name=name.value.trim()||c.name};row.append(pick,name);action(row,'×',()=>deleteColour(id),'danger').title='Delete '+c.name;custom.append(row)}
 action(custom,'+ Add custom colour',()=>{const id=uid('colour');P.design.colours[id]={name:'Custom colour',value:'#7a65b1'};inspect()},'full');parent.append(custom);
}
function ensureStyleContract(d){
 d.colours??={};d.texts??={};d.buttons??={};
 const oldVersion=Number(d.paletteRolesVersion||0);
 const colourFallback={primary:'#174a42',accent:'#d4aa62',accent2:'#60758f',bg:'#ffffff',surface:'#f4f2ed',text:'#1b1d1c',secondary:'#66706c',dark:'#151817',onPrimary:'#ffffff',onDark:'#ffffff'};
 for(const id of [...CORE_PALETTE_ROLES,...SUPPORTING_PALETTE_ROLES]){
  if(!d.colours[id])d.colours[id]={name:PALETTE_ROLE_INFO[id].name,value:colourFallback[id]};
  d.colours[id].name=PALETTE_ROLE_INFO[id].name;
 }
 if(oldVersion<2){
  if(d.colours.accent2.value===d.colours.primary.value)d.colours.accent2.value='#60758f';
  if(d.colours.secondary.value===d.colours.text.value)d.colours.secondary.value='#66706c';
 }
 const body=d.texts.body||{name:'Body',font:'DM Sans',size:16,lineHeight:1.65,weight:400,letterSpacing:0,color:'inherit',underline:'none',hoverColor:'inherit'};
 const display=d.texts.display||{...body,name:'Display',size:96,lineHeight:.92,weight:700};
 const small=d.texts.small||{...body,name:'Small text',size:12,lineHeight:1.5};
 const lead=d.texts.lead||{...body,name:'Lead paragraph',size:20,lineHeight:1.6};
 d.texts.displayTight??={...clone(display),name:'Oversized display',lineHeight:.84,letterSpacing:-2};
 d.texts.emphasis??={...clone(body),name:'Emphasis',weight:700,lineHeight:1.5};
 d.texts.leadEmphasis??={...clone(lead),name:'Lead emphasis',weight:700};
 d.texts.label??={...clone(small),name:'Label / eyebrow',weight:700,lineHeight:1.4,letterSpacing:.8};
 d.texts.brand??={...clone(body),name:'Brand text',size:22,lineHeight:1.1,weight:800};
 d.texts.button??={...clone(body),name:'Button text',size:16,lineHeight:1.2,weight:700};
 for(const t of Object.values(d.texts)){if(t.align===undefined)t.align='left';if(t.hoverColor==='$accent')t.hoverColor='$accent2'}
 for(const b of Object.values(d.buttons)){if(b.focusColor==='$accent')b.focusColor='$accent2';if(b.textStyle==='body'||!b.textStyle)b.textStyle='button';delete b.weight}
 d.buttons.inverse??={...clone(d.buttons.main),name:'Inverse action',background:'$onPrimary',color:'$primary',hoverBackground:'$bg',hoverColor:'$text',focusColor:'$accent2',textStyle:'button'};
 d.spaces??={};d.spaces.textGap??={name:'Text spacing',value:16};d.spaces.cardPadding??={name:'Card padding',value:20};
 d.paletteRolesVersion=2;
 return d;
}
function roleFromSurfaceToken(v){return({'$bg':'background','$background':'background','$surface':'alternative','$primary':'brand','$dark':'dark','transparent':'transparent'})[v]||''}
function roleFromTextToken(v){return({'$text':'main','$secondary':'secondary','$primary':'brand','$accent':'accent1','$accent2':'accent2','$onPrimary':'onBrand','$onDark':'onDark'})[v]||''}
function migrateComponentAppearance(section,n){
 const b=n.baseStyle||{};
 if(n.type==='group'&&b.background){const role=roleFromSurfaceToken(b.background);if(role){n.surfaceRole=n.surfaceRole||role;delete b.background}}
 if(n.type!=='group'&&b.color){const role=roleFromTextToken(b.color);if(role){n.textRole=n.textRole||role;delete b.color}}
 if(n.type==='button'){for(const key of ['background','color','hoverBackground','hoverColor','focusColor','weight'])delete b[key]}
 if(n.role==='brand'){n.textStyleRole='brand';delete b.size;delete b.weight}
 if(n.role==='kicker')n.textStyleRole='label';
 if(n.role==='small'&&b.weight===700){n.textStyleRole='label';delete b.weight}
 if(n.role==='body'&&b.weight===700){n.textStyleRole='emphasis';delete b.weight}
 if(n.role==='lead'&&b.weight===700){n.textStyleRole='leadEmphasis';delete b.weight}
 if(section.componentId==='bjj-conversion-display-01'&&n.type==='heading'&&n.role==='display'){
  n.textStyleRole='displayTight';n.fluidScale=n.fluidScale||{desktop:{min:68/96,max:170/96,vw:11.5},mobile:{min:38/96,max:43/96,vw:10.8}};delete b.fluidMin;delete b.fluidMax;delete b.fluidVw;delete b.lineHeight;delete b.letterSpacing;if(n.baseResponsive?.mobile){delete n.baseResponsive.mobile.fluidMin;delete n.baseResponsive.mobile.fluidMax;delete n.baseResponsive.mobile.fluidVw;delete n.baseResponsive.mobile.letterSpacing}
 }
 if(section.componentId==='bjj-head-coach-01'&&n.type==='heading'&&n.role==='display'){
  n.fluidScale=n.fluidScale||{desktop:{min:54/96,max:104/96,vw:7.2},mobile:{min:44/96,max:66/96,vw:12}};delete b.fluidMin;delete b.fluidMax;delete b.fluidVw;delete b.lineHeight;delete b.letterSpacing;if(n.baseResponsive?.mobile){delete n.baseResponsive.mobile.fluidMin;delete n.baseResponsive.mobile.fluidMax;delete n.baseResponsive.mobile.fluidVw}
 }
 const h1Scales={'hero-04':{desktop:68/56,tablet:1,mobile:42/56},'hero-05':{desktop:64/56,tablet:52/56,mobile:40/56}};
 if(n.type==='heading'&&n.role==='h1'&&h1Scales[section.componentId]){n.textScale=n.textScale||h1Scales[section.componentId];delete b.size;for(const mode of ['tablet','mobile'])if(n.baseResponsive?.[mode])delete n.baseResponsive[mode].size}
}
function connectComponentStyle(section){
 if(!COMPONENTS.some(c=>c.id===section.componentId)||section.componentId==='blank-section')return;
 section.styleRole=section.styleRole||legacySectionStyleRole(section);
 walk(section.elements,n=>{
  if(Number(n.styleContractVersion||0)<2)migrateComponentAppearance(section,n);
  n.styleContractVersion=2;n.styleBindings={};
  const b=n.baseStyle||{},bindings=n.styleBindings;
  n.sectionTone=section.styleRole==='brand'?'brand':section.styleRole==='dark'?'dark':'normal';
  if(n.type==='group'){
   if(typeof b.gap==='number')bindings.gap={kind:['contentGroup','coachCopy','programCopy'].includes(n.role)?'textGap':'layoutGap'};
   if(typeof b.padding==='number'&&b.padding>0)bindings.padding={kind:'cardPadding'};
   if(n.role==='card'||n.role==='leadQuote'||n.cardPrimitive)bindings.radius={kind:'cardRadius'};
  }
  if(n.type==='image'){
   bindings.radius={kind:n.imageShapeRole==='bleed'?'bleedImageRadius':'imageRadius'};
   if(n.cardHeaderMedia){
    bindings.radiusTopLeft={kind:'cardRadius'};bindings.radiusTopRight={kind:'cardRadius'};
    bindings.radiusBottomLeft={kind:'bleedImageRadius'};bindings.radiusBottomRight={kind:'bleedImageRadius'};
   }
  }
  if(n.textScale)bindings.size={kind:'textScale'};
  if(n.fluidScale)for(const key of ['fluidMin','fluidMax','fluidVw'])bindings[key]={kind:'fluidScale'};
  if(n.type==='button')n.buttonVariant=section.styleRole==='brand'?'inverse':section.componentId==='bjj-programs-image-01'?'alternative':(n.buttonVariant||'main');
  if(n.role==='kicker')n.accentMarker=true;
 });
}
function boundStyle(n){
 const out={};
 for(const [key,binding]of Object.entries(n.styleBindings||{})){
  const kind=binding.kind,b=n.baseStyle||{},r=device==='desktop'?{}:n.baseResponsive?.[device]||{},value=Object.hasOwn(r,key)?r[key]:b[key];
  if(kind==='cardRadius')out[key]=P.design.layout.cardRadius;
  else if(kind==='bleedImageRadius')out[key]='@square';
  else if(kind==='imageRadius')out[key]=P.design.layout.imageRadius;
  else if(kind==='textGap'&&typeof value==='number')out[key]=value*(P.design.spaces.textGap?.value??16)/16;
  else if(kind==='cardPadding'&&typeof value==='number')out[key]=value*(P.design.spaces.cardPadding?.value??20)/20;
  else if(kind==='layoutGap'&&typeof value==='number')out[key]=value*layout().gap/({desktop:24,tablet:20,mobile:16}[device]||24);
  else if(kind==='textScale'){
   const type=n.style?.textStyle||defaultText(n),base=P.design.texts[type]?.size||16,scale=typeof n.textScale==='number'?n.textScale:(n.textScale?.[device]??n.textScale?.desktop??1);out.size=base*scale;
  }else if(kind==='fluidScale'){
   const type=n.style?.textStyle||defaultText(n),base=P.design.texts[type]?.size||96,spec=n.fluidScale?.[device]||n.fluidScale?.desktop||{};
   if(key==='fluidMin')out[key]=base*(spec.min??.6);else if(key==='fluidMax')out[key]=base*(spec.max??1.7);else out[key]=spec.vw??10;
  }
 }
 return out;
}
function styleOrigin(n,key){
 if(device!=='desktop'&&Object.hasOwn(n.responsive?.[device]||{},key))return'Custom override';
 if(Object.hasOwn(n.style||{},key))return device==='desktop'?'Custom override':'Desktop override';
 if(n.styleBindings?.[key]||['textStyle','buttonStyle'].includes(key)&&n.textStyleRole)return'Site Style';
 const b=device!=='desktop'&&Object.hasOwn(n.baseResponsive?.[device]||{},key)?n.baseResponsive[device]:n.baseStyle||{};
 if(Object.hasOwn(b,key))return typeof b[key]==='string'&&/^[$@]/.test(b[key])?'Site Style':'Component default';
 if(['direction','justify','alignItems','width','columns','wrap','stack','frameMode','aspectRatio','height','fluidSize','fluidMin','fluidMax','fluidVw'].includes(key))return'Component default';
 return'Site Style';
}
const compositionKeys=['direction','justify','alignItems','width','basis','firstColumn','columns','wrap','stack','order','visible','marginTop','marginRight','marginBottom','marginLeft','offsetX','offsetY','zIndex','overflow','frameMode','aspectRatio','height','minHeight','fit','position','focalX','focalY','align','maxWidth','fluidSize','fluidMin','fluidMax','fluidVw','whiteSpace','contentWidth'];
function resetStyleOrigin(n,key){
 const copy=clone(n),layer=device!=='desktop'&&!['textStyle','buttonStyle'].includes(key)?copy.responsive?.[device]:copy.style;
 if(layer)delete layer[key];return styleOrigin(copy,key);
}
