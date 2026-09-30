'use strict';
// Style is the source of visual appearance. Stock components only choose semantic roles
// and retain composition/layout decisions plus deliberate scale modifiers.
const THEME_COLOUR_ROLES=['base','contrast','accent'];
const THEME_ROLE_INFO={
 base:{name:'Base',description:'The dominant site surface. This colour establishes the overall atmosphere of the page.'},
 contrast:{name:'Contrast',description:'The opposing structural colour used for large alternate sections, navigation/footer treatments and strong visual breaks.'},
 accent:{name:'Accent',description:'The high-emphasis colour used for primary actions, key highlights and selected feature surfaces.'}
};
// Internal compatibility roles. Components still resolve through these tokens, but they are
// derived from the three structural theme colours rather than edited as an independent palette.
const CORE_PALETTE_ROLES=['bg','surface','primary','accent','accent2','text','secondary'];
const SUPPORTING_PALETTE_ROLES=['dark','onPrimary','onPrimaryMuted','onDark','onDarkMuted','baseInset','baseElevated','contrastInset','contrastElevated','accentInset','accentElevated'];
const PALETTE_ROLE_INFO={
 bg:{name:'Base surface',description:'Derived from Base.'},
 surface:{name:'Soft surface',description:'A subtle Base/Contrast blend for cards and inset panels.'},
 primary:{name:'Accent',description:'Derived from the Accent theme colour.'},
 accent:{name:'Accent',description:'Derived from the Accent theme colour.'},
 accent2:{name:'Contrast detail',description:'Derived from Contrast for secondary emphasis and focus states.'},
 text:{name:'Text on Base',description:'Automatically chosen for legibility on Base.'},
 secondary:{name:'Muted text on Base',description:'Automatically derived from Text on Base.'},
 dark:{name:'Contrast surface',description:'Derived from the Contrast theme colour.'},
 onPrimary:{name:'Text on Accent',description:'Automatically chosen for legibility on Accent.'},
 onPrimaryMuted:{name:'Muted text on Accent',description:'Automatically derived for supporting copy on Accent.'},
 onDark:{name:'Text on Contrast',description:'Automatically chosen for legibility on Contrast.'},
 onDarkMuted:{name:'Muted text on Contrast',description:'Automatically derived for supporting copy on Contrast.'},
 baseInset:{name:'Base inset',description:'Contextual inset surface derived from Base.'},
 baseElevated:{name:'Base elevated',description:'Contextual elevated surface derived from Base.'},
 contrastInset:{name:'Contrast inset',description:'Contextual inset surface derived from Contrast.'},
 contrastElevated:{name:'Contrast elevated',description:'Contextual elevated surface derived from Contrast.'},
 accentInset:{name:'Accent inset',description:'Contextual inset surface derived from Accent.'},
 accentElevated:{name:'Accent elevated',description:'Contextual elevated surface derived from Accent.'}
};
const SECTION_SURFACE_TOKENS={base:'$bg',contrast:'$dark',accent:'$primary',image:'$dark',transparent:'transparent'};
const SURFACE_TOKENS={
 base:'$bg',contrast:'$dark',accent:'$primary',image:'$dark',transparent:'transparent'
};
const CONTEXTUAL_SURFACE_TOKENS={
 base:{inset:'$baseInset',elevated:'$baseElevated'},
 contrast:{inset:'$contrastInset',elevated:'$contrastElevated'},
 accent:{inset:'$accentInset',elevated:'$accentElevated'},
 image:{inset:'$contrastInset',elevated:'$contrastElevated'}
};
function canonicalSurfaceRole(role){
 return({background:'elevated',alternative:'inset',dark:'opposing',brand:'accent',transparent:'inherit'})[role]||(['inherit','inset','elevated','opposing','base','contrast','accent'].includes(role)?role:'inherit');
}
function opposingSurfaceTone(tone){return tone==='base'?'contrast':'base'}
function surfaceContentTone(role,parentTone='base'){
 role=canonicalSurfaceRole(role);
 if(role==='opposing')return opposingSurfaceTone(parentTone);
 if(['base','contrast','accent'].includes(role))return role;
 return parentTone;
}
function contextualSurfaceToken(role,parentTone='base'){
 role=canonicalSurfaceRole(role);
 if(role==='inherit')return'transparent';
 if(role==='opposing')return SURFACE_TOKENS[opposingSurfaceTone(parentTone)]||'$bg';
 if(['base','contrast','accent'].includes(role))return SURFACE_TOKENS[role];
 const tone=['base','contrast','accent','image'].includes(parentTone)?parentTone:'base';
 return CONTEXTUAL_SURFACE_TOKENS[tone]?.[role]||'$surface';
}
const TEXT_TOKENS={main:'$text',secondary:'$secondary',brand:'$primary',accent1:'$accent',accent2:'$accent2',onBrand:'$onPrimary',onDark:'$onDark'};
function canonicalSectionStyleRole(role){
 return({background:'base',alternative:'contrast',brand:'accent',dark:'contrast'})[role]||(['base','contrast','accent','image','transparent'].includes(role)?role:'base');
}
function canonicalColourTreatment(treatment){return treatment==='alternate'?'alternate':'standard'}
function alternateSectionStyleRole(role){
 role=canonicalSectionStyleRole(role);
 if(role==='base')return'contrast';
 if(role==='contrast')return'base';
 // Accent is a deliberately high-emphasis structural surface. Its alternate
 // treatment becomes Contrast, while Accent remains available to actions,
 // kickers and other emphasis inside the section.
 if(role==='accent')return'contrast';
 // Image / transparent surfaces are not recoloured by theme treatments.
 return role;
}
function resolvedSectionStyleRole(section){
 const role=canonicalSectionStyleRole(section?.styleRole||legacySectionStyleRole(section||{}));
 return canonicalColourTreatment(section?.colourTreatment)==='alternate'?alternateSectionStyleRole(role):role;
}
function legacySectionStyleRole(section){return section.type==='services'?'contrast':section.type==='cta'?'accent':section.type==='footer'?'contrast':'base'}
function sectionSemanticStyle(section){
 const role=resolvedSectionStyleRole(section),background=SECTION_SURFACE_TOKENS[role]||'$bg';
 return{background,color:role==='accent'?'$onPrimary':(['contrast','image'].includes(role)?'$onDark':'$text')};
}
function nodeSemanticStyle(n){
 const out={},tone=n.sectionTone||'base',surfaceContext=n.surfaceContextTone||tone;
 if(n.type==='group'&&n.surfaceRole)out.background=contextualSurfaceToken(n.surfaceRole,surfaceContext);
 if(n.textRole==='main')out.color=tone==='accent'?'$onPrimary':(['contrast','image'].includes(tone)?'$onDark':'$text');
 else if(n.textRole==='secondary')out.color=tone==='accent'?'$onPrimaryMuted':(['contrast','image'].includes(tone)?'$onDarkMuted':'$secondary');
 else if(n.textRole&&TEXT_TOKENS[n.textRole])out.color=TEXT_TOKENS[n.textRole];
 else if(n.role==='kicker')out.color=tone==='accent'?'$onPrimary':(['contrast','image'].includes(tone)?'$onDark':'$primary');
 else if(n.role==='small')out.color=tone==='accent'?'$onPrimaryMuted':(['contrast','image'].includes(tone)?'$onDarkMuted':'$secondary');
 else if(n.role==='navlink'&&['contrast','image'].includes(tone))out.color='$onDark';
 const buttonStyle=n.style?.buttonStyle||n.buttonVariant;
 if(n.type==='button'&&['contrast','image'].includes(tone)&&['text','alternative'].includes(buttonStyle)){
  out.color='$onDark';out.hoverBackground='$onDark';out.hoverColor='$dark';
  if(buttonStyle==='alternative')out.border='@none';
 }
 return out;
}
function themeHex(value,fallback='#555555'){
 const v=String(value||'').trim();
 if(/^#[0-9a-f]{6}$/i.test(v))return v.toLowerCase();
 if(/^#[0-9a-f]{3}$/i.test(v))return '#'+v.slice(1).split('').map(x=>x+x).join('').toLowerCase();
 return fallback;
}
function themeRgb(hex){const h=themeHex(hex).slice(1);return[0,2,4].map(i=>parseInt(h.slice(i,i+2),16))}
function themeRgbHex(rgb){return '#'+rgb.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('')}
function themeMix(a,b,amount=.5){const A=themeRgb(a),B=themeRgb(b),t=Math.max(0,Math.min(1,Number(amount)||0));return themeRgbHex(A.map((v,i)=>v+(B[i]-v)*t))}
function themeLuminance(hex){return themeRgb(hex).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0)}
function themeContrast(a,b){const x=themeLuminance(a),y=themeLuminance(b),hi=Math.max(x,y),lo=Math.min(x,y);return(hi+.05)/(lo+.05)}
function themeReadable(background){const candidates=['#f8f8f5','#151817'];return candidates.sort((a,b)=>themeContrast(b,background)-themeContrast(a,background))[0]}
function themeMuted(text,background){
 for(const amount of [.28,.22,.16,.10]){const c=themeMix(text,background,amount);if(themeContrast(c,background)>=4.5)return c}
 return text;
}
function themeSafeSurfaceMix(surface,partner,amount){
 const text=themeReadable(surface);let t=amount,c=themeMix(surface,partner,t);
 while(t>.015&&themeContrast(text,c)<4.5){t*=.72;c=themeMix(surface,partner,t)}
 return c;
}
function ensureThemeColourSystem(d){
 d.themeColours??={};
 const legacy=d.colours||{};
 d.themeColours.base=themeHex(d.themeColours.base||legacy.bg?.value||'#ffffff','#ffffff');
 d.themeColours.contrast=themeHex(d.themeColours.contrast||legacy.dark?.value||legacy.surface?.value||'#151817','#151817');
 d.themeColours.accent=themeHex(d.themeColours.accent||legacy.primary?.value||legacy.accent?.value||'#174a42','#174a42');
 d.themeDistribution=['balanced','bold','minimal'].includes(d.themeDistribution)?d.themeDistribution:'balanced';
 const base=d.themeColours.base,contrast=d.themeColours.contrast,accent=d.themeColours.accent;
 d.colours??={};
 const derived={
  bg:base,
  surface:themeMix(base,contrast,.10),
  primary:accent,
  accent,
  accent2:themeMix(accent,contrast,.48),
  text:themeReadable(base),
  secondary:themeMuted(themeReadable(base),base),
  dark:contrast,
  onPrimary:themeReadable(accent),
  onPrimaryMuted:themeMuted(themeReadable(accent),accent),
  onDark:themeReadable(contrast),
  onDarkMuted:themeMuted(themeReadable(contrast),contrast),
  baseInset:themeSafeSurfaceMix(base,contrast,.11),
  baseElevated:themeSafeSurfaceMix(base,contrast,.045),
  contrastInset:themeSafeSurfaceMix(contrast,base,.14),
  contrastElevated:themeSafeSurfaceMix(contrast,base,.06),
  accentInset:themeSafeSurfaceMix(accent,base,.15),
  accentElevated:themeSafeSurfaceMix(accent,base,.07)
 };
 for(const [id,value] of Object.entries(derived)){
  d.colours[id]??={name:PALETTE_ROLE_INFO[id].name,value};
  d.colours[id].name=PALETTE_ROLE_INFO[id].name;
  d.colours[id].value=value;
 }
 d.themeColourVersion=2;
 return d;
}
function buildPaletteControls(parent,{editableCustom=false}={}){
 ensureThemeColourSystem(P.design);
 const addThemeRole=(id)=>{
  const info=THEME_ROLE_INFO[id],row=document.createElement('label');row.className='palette-role';
  const input=document.createElement('input');input.type='color';input.value=P.design.themeColours[id];input.setAttribute('aria-label',info.name+' colour');
  input.oninput=()=>{P.design.themeColours[id]=input.value;ensureThemeColourSystem(P.design);const w=P.design.paletteWorkspace;if(w?.swatches?.length===3){const i=THEME_COLOUR_ROLES.indexOf(id);if(i>=0)w.swatches[i]=input.value}renderPaintOnly()};
  const copy=document.createElement('span'),title=document.createElement('strong'),hint=document.createElement('small');title.textContent=info.name;hint.textContent=info.description;copy.append(title,hint);row.append(input,copy);parent.append(row);
 };
 THEME_COLOUR_ROLES.forEach(addThemeRole);
 const note=document.createElement('p');note.className='hint';note.textContent='Text, muted text, card surfaces and interaction colours are derived automatically from these three colours.';parent.append(note);
 action(parent,'Open Palette Tool',openPaletteTool,'primary full');
 if(!editableCustom)return;
 const custom=document.createElement('details');custom.className='group';custom.innerHTML='<summary>Advanced custom colours</summary>';
 const customIds=Object.keys(P.design.colours).filter(id=>!CORE_PALETTE_ROLES.includes(id)&&!SUPPORTING_PALETTE_ROLES.includes(id));
 if(!customIds.length){const copy=document.createElement('p');copy.className='hint';copy.textContent='Custom colours are optional one-off overrides. The structural theme remains Base / Contrast / Accent.';custom.append(copy)}
 for(const id of customIds){const c=P.design.colours[id],row=document.createElement('div');row.className='colour-line';const pick=document.createElement('input');pick.type='color';pick.value=c.value;pick.setAttribute('aria-label',c.name+' colour');pick.oninput=()=>{c.value=pick.value;renderPaintOnly()};const name=document.createElement('input');name.type='text';name.value=c.name;name.setAttribute('aria-label','Name for '+c.name);name.onchange=()=>{c.name=name.value.trim()||c.name};row.append(pick,name);action(row,'×',()=>deleteColour(id),'danger').title='Delete '+c.name;custom.append(row)}
 action(custom,'+ Add custom colour',()=>{const id=uid('colour');P.design.colours[id]={name:'Custom colour',value:'#7a65b1'};inspect()},'full');parent.append(custom);
}
function ensureStyleContract(d){
 d.colours??={};d.texts??={};d.buttons??={};
 ensureThemeColourSystem(d);
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
 d.paletteRolesVersion=5;
 return d;
}
function roleFromSurfaceToken(v){return({'$bg':'elevated','$background':'elevated','$surface':'inset','$primary':'accent','$dark':'opposing','transparent':'inherit'})[v]||''}
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
 section.styleRole=canonicalSectionStyleRole(section.styleRole||legacySectionStyleRole(section));
 section.colourTreatment=canonicalColourTreatment(section.colourTreatment);
 const sectionTone=resolvedSectionStyleRole(section);
 const stockStyled=COMPONENTS.some(c=>c.id===section.componentId)&&section.componentId!=='blank-section';
 const visit=(n,parentTone)=>{
  if(stockStyled&&Number(n.styleContractVersion||0)<2)migrateComponentAppearance(section,n);
  if(n.type==='group'&&n.surfaceRole)n.surfaceRole=canonicalSurfaceRole(n.surfaceRole);
  n.surfaceContextTone=parentTone;
  const tone=n.type==='group'?surfaceContentTone(n.surfaceRole,parentTone):parentTone;
  n.sectionTone=tone;
  if(stockStyled){
   n.styleContractVersion=3;n.styleBindings={};
   const b=n.baseStyle||{},bindings=n.styleBindings;
   if(n.type==='group'){
    if(typeof b.gap==='number')bindings.gap={kind:['contentGroup','coachCopy','programCopy'].includes(n.role)?'textGap':'layoutGap'};
    if(typeof b.padding==='number'&&b.padding>0)bindings.padding={kind:'cardPadding'};
    if(n.role==='card'||n.role==='leadQuote'||n.role==='testimonialItem'||n.cardPrimitive)bindings.radius={kind:'cardRadius'};
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
   if(n.type==='heading'&&n.role==='programTitle'&&!n.textStyleRole)n.textStyleRole='h3';
   if(n.role==='kicker')n.accentMarker=true;
  }
  if(n.type==='button'&&!Object.hasOwn(n.style||{},'buttonStyle')){
   if(tone==='accent'){
    if(!n.autoThemeInverse)n.themePreviousButtonVariant=n.buttonVariant||'main';
    n.buttonVariant='inverse';n.autoThemeInverse=true;
   }else if(n.autoThemeInverse){
    n.buttonVariant=n.themePreviousButtonVariant||(stockStyled&&section.componentId==='bjj-programs-image-01'?'alternative':'main');
    delete n.themePreviousButtonVariant;delete n.autoThemeInverse;
   }
  }
  for(const child of n.children||[])visit(child,tone);
 };
 for(const n of section.elements||[])visit(n,sectionTone);
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
