const HERO={id:"hero-01",family:"hero",name:"Hero 01",category:"Hero",description:"Classic split hero",preview:"hero-split",create(){return{id:uid("sec"),type:"hero",name:"Hero 01",styleRole:"background",style:{},elements:[
{id:uid("el"),type:"group",role:"heroLayout",style:{direction:"row",gap:56,justify:"start",alignItems:"center",width:100,firstColumn:50},baseResponsive:{tablet:{gap:36},mobile:{gap:24}},children:[
{id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:18,justify:"center",alignItems:"start",width:100},baseResponsive:{tablet:{gap:16},mobile:{gap:14}},children:[
{id:uid("el"),type:"text",role:"kicker",text:"BRAZILIAN JIU-JITSU",style:{}},
{id:uid("el"),type:"heading",role:"h1",text:"Start training. Build confidence. Keep progressing.",style:{maxWidth:620}},
{id:uid("el"),type:"text",role:"body",text:"Beginner-friendly jiu-jitsu classes with structured coaching from your first session onwards.",style:{maxWidth:560}},
{id:uid("el"),type:"button",role:"cta",text:"Book a trial class",href:"#contact",style:{}}]},
{id:uid("el"),type:"image",role:"visual",src:"",style:{frameMode:"fill",height:460},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 9"},mobile:{frameMode:"ratio",aspectRatio:"4 / 3"}}}]}]}}};

const HERO2={id:"hero-02",family:"hero",name:"Hero 02",category:"Hero",description:"Centred statement + wide image",preview:"hero-centred",create(){return{id:uid("sec"),type:"hero",name:"Hero 02",styleRole:"background",style:{},elements:[
{id:uid("el"),type:"group",role:"heroLayout",style:{direction:"column",gap:40,justify:"center",alignItems:"center",width:100},baseResponsive:{tablet:{gap:32},mobile:{gap:24}},children:[
{id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:16,justify:"center",alignItems:"center",width:72},baseResponsive:{tablet:{width:100,gap:16},mobile:{width:100,gap:14}},children:[
{id:uid("el"),type:"text",role:"kicker",text:"NEW TO JIU-JITSU?",style:{align:"center"}},
{id:uid("el"),type:"heading",role:"h1",text:"Your first step onto the mats starts here.",style:{align:"center",maxWidth:920}},
{id:uid("el"),type:"text",role:"body",text:"No experience is needed. Learn the fundamentals in a welcoming academy where new students are expected and supported.",style:{align:"center",maxWidth:720}},
{id:uid("el"),type:"button",role:"cta",text:"Start training",href:"#contact",style:{}}]},
{id:uid("el"),type:"image",role:"visual",src:"",style:{frameMode:"ratio",aspectRatio:"3 / 1",height:390},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 9"},mobile:{frameMode:"ratio",aspectRatio:"4 / 3"}}}]}]}}};

const HERO3={id:"hero-03",family:"hero",name:"Hero 03",category:"Hero",description:"Image-led split, content right",preview:"hero-reverse",create(){return{id:uid("sec"),type:"hero",name:"Hero 03",styleRole:"background",style:{},elements:[
{id:uid("el"),type:"group",role:"heroLayout",style:{direction:"row",gap:56,justify:"start",alignItems:"center",width:100,firstColumn:50},baseResponsive:{tablet:{gap:36},mobile:{gap:24}},children:[
{id:uid("el"),type:"image",role:"visual",src:"",style:{frameMode:"fill",height:500},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 9"},mobile:{frameMode:"ratio",aspectRatio:"4 / 3"}}},
{id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:18,justify:"center",alignItems:"start",width:100},baseResponsive:{tablet:{gap:16},mobile:{gap:14}},children:[
{id:uid("el"),type:"text",role:"kicker",text:"TRAIN WITH PURPOSE",style:{}},
{id:uid("el"),type:"heading",role:"h1",text:"Technical jiu-jitsu in a room built for progress.",style:{maxWidth:620}},
{id:uid("el"),type:"text",role:"body",text:"Structured classes for beginners and experienced students, with coaching that gives you a clear path forward.",style:{maxWidth:560}},
{id:uid("el"),type:"button",role:"cta",text:"View timetable",href:"#contact",style:{}}]}]}]}}};

const HERO4={id:"hero-04",family:"hero",name:"Hero 04",category:"Hero",description:"Editorial wide-copy hero",preview:"hero-editorial",create(){return{id:uid("sec"),type:"hero",name:"Hero 04",styleRole:"background",style:{},elements:[
{id:uid("el"),type:"group",role:"heroLayout",style:{direction:"row",gap:48,justify:"space-between",alignItems:"end",width:100,firstColumn:60},baseResponsive:{tablet:{gap:36},mobile:{gap:24}},children:[
{id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:20,justify:"end",alignItems:"start",width:100},baseResponsive:{tablet:{gap:18},mobile:{gap:14}},children:[
{id:uid("el"),type:"text",role:"kicker",text:"JIU-JITSU FOR EVERY LEVEL",style:{}},
{id:uid("el"),type:"heading",role:"h1",text:"From your first class to your next breakthrough.",textScale:{desktop:1.2142857143,tablet:1,mobile:.75},style:{maxWidth:820}},
{id:uid("el"),type:"text",role:"body",text:"Train in an academy where fundamentals matter, coaching is structured and every student has room to improve.",style:{maxWidth:620}},
{id:uid("el"),type:"button",role:"cta",text:"Explore programs",href:"#contact",style:{}}]},
{id:uid("el"),type:"image",role:"visual",src:"",style:{frameMode:"fill",height:360},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 9"},mobile:{frameMode:"ratio",aspectRatio:"4 / 3"}}}]}]}}};

const HERO5={id:"hero-05",family:"hero",name:"Hero 05",category:"Hero",description:"Minimal statement + compact visual",preview:"hero-minimal",create(){return{id:uid("sec"),type:"hero",name:"Hero 05",styleRole:"background",style:{},elements:[
{id:uid("el"),type:"group",role:"heroLayout",style:{direction:"column",gap:36,justify:"center",alignItems:"start",width:100},baseResponsive:{tablet:{gap:28},mobile:{gap:24}},children:[
{id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:18,justify:"start",alignItems:"start",width:72},baseResponsive:{tablet:{width:100,gap:16},mobile:{width:100,gap:14}},children:[
{id:uid("el"),type:"text",role:"kicker",text:"WELCOME TO THE ACADEMY",style:{}},
{id:uid("el"),type:"heading",role:"h1",text:"Get stronger. Learn a skill. Join the room.",textScale:{desktop:1.1428571429,tablet:.9285714286,mobile:.7142857143},style:{maxWidth:920}},
{id:uid("el"),type:"text",role:"body",text:"Jiu-jitsu gives you something real to work at—one class, one round and one small improvement at a time.",style:{maxWidth:650}},
{id:uid("el"),type:"button",role:"cta",text:"Book your first class",href:"#contact",style:{}}]},
{id:uid("el"),type:"image",role:"visual",src:"",style:{frameMode:"ratio",aspectRatio:"3 / 1",height:300},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 9"},mobile:{frameMode:"ratio",aspectRatio:"4 / 3"}}}]}]}}};

const BLANK_SECTION={
  id:"blank-section",
  family:"blank",
  name:"Blank Section",
  category:"Start",
  description:"Start a Section from scratch",
  preview:"blank-section",
  create(){return{
    id:uid("sec"),
    type:"blank",
    name:"Blank Section",
    style:{},
    elements:[]
  }}
};

const NAVBAR={id:"nav-01",family:"navbar",name:"Navbar 01",category:"Nav",description:"Site-wide navigation, links + CTA",preview:"nav-clean",create(){return{id:uid("sec"),type:"navbar",name:"Navbar 01",styleRole:"background",navMode:"sticky",navTransparent:false,mobileMenu:"hamburger",style:{},elements:[
{id:uid("el"),type:"group",role:"navLayout",style:{direction:"row",gap:24,justify:"space-between",alignItems:"center",width:100},children:[
{id:uid("el"),type:"text",role:"brand",text:"APEX JIU-JITSU",textStyleRole:"brand",style:{}},
{id:uid("el"),type:"group",role:"navLinks",style:{direction:"row",gap:22,justify:"center",alignItems:"center",width:40},children:[
{id:uid("el"),type:"text",role:"navlink",text:"Programs",style:{}},{id:uid("el"),type:"text",role:"navlink",text:"Coaches",style:{}},{id:uid("el"),type:"text",role:"navlink",text:"Timetable",style:{}}]},
{id:uid("el"),type:"button",role:"cta",text:"Book a trial",href:"#contact",style:{}}]}]}}};

const ABOUT={id:"about-01",family:"about",name:"Academy 01",category:"Academy",description:"Image + academy story",preview:"about-split",create(){return{id:uid("sec"),type:"about",name:"Academy 01",styleRole:"background",style:{},elements:[
{id:uid("el"),type:"group",role:"aboutLayout",style:{direction:"row",gap:56,justify:"start",alignItems:"center",width:100,firstColumn:50},baseResponsive:{tablet:{gap:36},mobile:{gap:24}},children:[
{id:uid("el"),type:"image",role:"visual",src:"",style:{frameMode:"fill",height:460},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 9"},mobile:{frameMode:"ratio",aspectRatio:"4 / 3"}}},
{id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:18,justify:"start",alignItems:"start",width:100},baseResponsive:{tablet:{gap:16},mobile:{gap:14}},children:[
{id:uid("el"),type:"text",role:"kicker",text:"OUR ACADEMY",style:{}},
{id:uid("el"),type:"heading",role:"h2",text:"Serious coaching. A welcoming room to learn in.",style:{maxWidth:640}},
{id:uid("el"),type:"text",role:"body",text:"Whether you are brand new to jiu-jitsu or already experienced, our goal is simple: help you train consistently, improve your skills and enjoy the process.",style:{maxWidth:600}},
{id:uid("el"),type:"button",role:"cta",text:"Meet the coaches",href:"#",style:{}}]}]}]}}};

const SERVICES={id:"services-01",family:"services",name:"Programs 01",category:"Programs",description:"Intro + three program cards",preview:"services-cards",create(){return{id:uid("sec"),type:"services",name:"Programs 01",styleRole:"alternative",style:{},elements:[
{id:uid("el"),type:"group",role:"servicesWrap",style:{direction:"column",gap:40,justify:"start",alignItems:"stretch",width:100},baseResponsive:{tablet:{gap:32},mobile:{gap:28}},children:[
{id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:14,justify:"start",alignItems:"start",width:60},baseResponsive:{tablet:{width:80,gap:14},mobile:{width:100,gap:12}},children:[
{id:uid("el"),type:"text",role:"kicker",text:"PROGRAMS",style:{}},{id:uid("el"),type:"heading",role:"h2",text:"A clear path for every student.",style:{maxWidth:760}},{id:uid("el"),type:"text",role:"body",text:"Start from zero, build strong fundamentals and keep progressing at your own pace.",style:{maxWidth:620}}]},
{id:uid("el"),type:"group",role:"cards",style:{direction:"row",gap:24,justify:"start",alignItems:"stretch",width:100},baseResponsive:{tablet:{gap:20},mobile:{gap:16}},children:[
{id:uid("el"),type:"group",role:"card",surfaceRole:"background",style:{direction:"column",gap:12,justify:"start",alignItems:"start",width:100,padding:28,radius:"@square"},baseResponsive:{tablet:{padding:24},mobile:{padding:20}},children:[{id:uid("el"),type:"heading",role:"h3",text:"Beginner Program",style:{}},{id:uid("el"),type:"text",role:"body",text:"A structured introduction to jiu-jitsu for complete beginners. Learn the core positions, movements and habits in a supportive setting.",style:{}}]},
{id:uid("el"),type:"group",role:"card",surfaceRole:"background",style:{direction:"column",gap:12,justify:"start",alignItems:"start",width:100,padding:28,radius:"@rounded"},baseResponsive:{tablet:{padding:24},mobile:{padding:20}},children:[{id:uid("el"),type:"heading",role:"h3",text:"Adult Jiu-Jitsu",style:{}},{id:uid("el"),type:"text",role:"body",text:"Technical gi and no-gi training for students who want to improve fitness, skill and confidence on the mats.",style:{}}]},
{id:uid("el"),type:"group",role:"card",surfaceRole:"background",style:{direction:"column",gap:12,justify:"start",alignItems:"start",width:100,padding:28,radius:"@rounded"},baseResponsive:{tablet:{padding:24},mobile:{padding:20}},children:[{id:uid("el"),type:"heading",role:"h3",text:"Kids Jiu-Jitsu",style:{}},{id:uid("el"),type:"text",role:"body",text:"Fun, structured classes that develop movement, confidence, discipline and practical jiu-jitsu skills.",style:{}}]}]}]}]}}};

const CTA={id:"cta-01",family:"cta",name:"CTA 01",category:"Conversion",description:"Statement + button",preview:"cta-simple",create(){return{id:uid("sec"),type:"cta",name:"CTA 01",styleRole:"brand",style:{},elements:[
{id:uid("el"),type:"group",role:"ctaLayout",style:{direction:"row",gap:40,justify:"space-between",alignItems:"center",width:100,stack:"mobile"},baseResponsive:{tablet:{gap:32},mobile:{gap:24,alignItems:"start"}},children:[
{id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:12,justify:"start",alignItems:"start",width:72},baseResponsive:{mobile:{width:100,gap:10}},children:[
{id:uid("el"),type:"heading",role:"h2",text:"Ready to step onto the mats?",style:{maxWidth:800}},{id:uid("el"),type:"text",role:"body",text:"Book your first class and come see what training at the academy is really like.",style:{maxWidth:680}}]},
{id:uid("el"),type:"button",role:"cta",text:"Book a trial class",href:"#contact",style:{}}]}]}}};

const FOOTER={id:"footer-01",family:"footer",name:"Footer 01",category:"Footer",description:"Site-wide brand + links",preview:"footer-clean",create(){return{id:uid("sec"),type:"footer",name:"Footer 01",styleRole:"dark",style:{},elements:[
{id:uid("el"),type:"group",role:"footerLayout",style:{direction:"row",gap:40,justify:"space-between",alignItems:"center",width:100,stack:"mobile"},baseResponsive:{tablet:{gap:32},mobile:{gap:24,alignItems:"start"}},children:[
{id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:8,justify:"start",alignItems:"start",width:60},baseResponsive:{mobile:{width:100,gap:6}},children:[
{id:uid("el"),type:"text",role:"brand",text:"APEX JIU-JITSU",textStyleRole:"brand",style:{}},{id:uid("el"),type:"text",role:"body",text:"Brazilian Jiu-Jitsu for beginners, competitors and everyone in between.",style:{maxWidth:560}}]},
{id:uid("el"),type:"group",role:"footerLinks",style:{direction:"row",gap:24,justify:"end",alignItems:"center",width:40},baseResponsive:{mobile:{width:100,gap:18,justify:"start"}},children:[
{id:uid("el"),type:"text",role:"navlink",text:"Programs",style:{}},{id:uid("el"),type:"text",role:"navlink",text:"Coaches",style:{}},{id:uid("el"),type:"text",role:"navlink",text:"Timetable",style:{}}]}]}]}}};


const TIMETABLE={
  id:"bjj-timetable-01",
  family:"timetable",
  name:"Timetable 01",
  category:"Timetable",
  description:"Responsive weekly class timetable",
  preview:"timetable-grid",
  meta:{
    stableId:"bjj-timetable-01",
    version:1,
    category:"Timetable",
    visualFamilies:["Clean"],
    useCases:["BJJ academy","martial arts gym","class schedule"],
    tags:["timetable","schedule","classes","weekly","BJJ"],
    compositionRecipe:"Intro copy above a seven-day responsive schedule grid.",
    requiredSlots:["section heading","day headings","class times"],
    optionalSlots:["section introduction"],
    responsiveRecipe:"Four-column desktop grid, two columns on tablet, single stack on mobile.",
    minimumBuilderVersion:"3.0",
    capabilityRequirements:["grid containers","responsive columns"],
    provenance:{status:"Runa original",approach:"BJJ-specific stock component",source:"Runa V3.0",licence:"Runa"},
    verificationStatus:"browser-verified"
  },
  create(){
    const day=(name,classes)=>({
      id:uid("el"),type:"group",role:"card",
      surfaceRole:"alternative",style:{direction:"column",gap:10,justify:"start",alignItems:"stretch",width:100,padding:20,radius:"@rounded"},
      baseResponsive:{mobile:{padding:18,gap:8}},
      children:[
        {id:uid("el"),type:"heading",role:"h3",text:name,style:{}},
        ...classes.map(text=>({id:uid("el"),type:"text",role:"body",text,style:{}}))
      ]
    });
    return{
      id:uid("sec"),type:"timetable",name:"Timetable 01",styleRole:"background",style:{},elements:[
        {id:uid("el"),type:"group",role:"timetableWrap",style:{direction:"column",gap:36,justify:"start",alignItems:"stretch",width:100},baseResponsive:{tablet:{gap:30},mobile:{gap:24}},children:[
          {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:14,justify:"start",alignItems:"start",width:65},baseResponsive:{tablet:{width:80},mobile:{width:100,gap:12}},children:[
            {id:uid("el"),type:"text",role:"kicker",text:"CLASS TIMETABLE",style:{}},
            {id:uid("el"),type:"heading",role:"h2",text:"Train throughout the week.",style:{maxWidth:760}},
            {id:uid("el"),type:"text",role:"body",text:"Choose the session that suits your level and schedule.",style:{maxWidth:620}}
          ]},
          {id:uid("el"),type:"group",role:"timetableGrid",style:{direction:"grid",columns:4,gap:16,justify:"start",alignItems:"stretch",width:100,stack:"mobile"},baseResponsive:{tablet:{columns:2,gap:16},mobile:{gap:12}},children:[
            day("Monday",["6:30 AM · Fundamentals","6:00 PM · Beginners","7:00 PM · All Levels"]),
            day("Tuesday",["12:00 PM · Open Mat","6:00 PM · Kids BJJ","7:00 PM · No-Gi"]),
            day("Wednesday",["6:30 AM · Fundamentals","6:00 PM · Beginners","7:00 PM · All Levels"]),
            day("Thursday",["12:00 PM · Open Mat","6:00 PM · Kids BJJ","7:00 PM · No-Gi"]),
            day("Friday",["6:30 AM · Fundamentals","6:30 PM · All Levels"]),
            day("Saturday",["9:00 AM · Kids BJJ","10:00 AM · All Levels","11:30 AM · Open Mat"]),
            day("Sunday",["Open mat / academy events"])
          ]}
        ]}
      ]
    };
  }
};

const COACHES={
  id:"bjj-coaches-01",
  family:"coaches",
  name:"Coaches 01",
  category:"Coaches",
  description:"Three-coach profile section",
  preview:"coaches-grid",
  meta:{
    stableId:"bjj-coaches-01",
    version:1,
    category:"Coaches",
    visualFamilies:["Clean"],
    useCases:["BJJ academy","martial arts gym","coaching team"],
    tags:["coaches","instructors","team","black belt","BJJ"],
    compositionRecipe:"Intro copy above three image-led coach cards.",
    requiredSlots:["section heading","coach image","coach name","coach role"],
    optionalSlots:["section introduction","coach bio"],
    imageRoles:["coach portrait"],
    responsiveRecipe:"Three-column desktop, two-column tablet, single-column mobile.",
    minimumBuilderVersion:"3.0",
    capabilityRequirements:["grid containers","responsive columns","image ratio"],
    provenance:{status:"Runa original",approach:"BJJ-specific stock component",source:"Runa V3.0",licence:"Runa"},
    verificationStatus:"browser-verified"
  },
  create(){
    const coach=(name,role,bio)=>({
      id:uid("el"),type:"group",role:"card",
      surfaceRole:"alternative",style:{direction:"column",gap:14,justify:"start",alignItems:"stretch",width:100,padding:20,radius:"@rounded"},
      baseResponsive:{mobile:{padding:18,gap:12}},
      children:[
        {id:uid("el"),type:"image",role:"visual",src:"",alt:name,style:{frameMode:"ratio",aspectRatio:"4 / 5",height:360,radius:"@rounded"}},
        {id:uid("el"),type:"group",role:"coachCopy",style:{direction:"column",gap:7,justify:"start",alignItems:"start",width:100},children:[
          {id:uid("el"),type:"heading",role:"h3",text:name,style:{}},
          {id:uid("el"),type:"text",role:"body",text:role,textStyleRole:"emphasis",textRole:"accent2",style:{}},
          {id:uid("el"),type:"text",role:"body",text:bio,style:{}}
        ]}
      ]
    });
    return{
      id:uid("sec"),type:"team",name:"Coaches 01",styleRole:"background",style:{},elements:[
        {id:uid("el"),type:"group",role:"coachesWrap",style:{direction:"column",gap:36,justify:"start",alignItems:"stretch",width:100},baseResponsive:{tablet:{gap:30},mobile:{gap:24}},children:[
          {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:14,justify:"start",alignItems:"start",width:65},baseResponsive:{tablet:{width:80},mobile:{width:100,gap:12}},children:[
            {id:uid("el"),type:"text",role:"kicker",text:"MEET THE COACHES",style:{}},
            {id:uid("el"),type:"heading",role:"h2",text:"Learn from experienced coaches.",style:{maxWidth:760}},
            {id:uid("el"),type:"text",role:"body",text:"A strong academy starts with knowledgeable coaching and a room where people want to learn.",style:{maxWidth:660}}
          ]},
          {id:uid("el"),type:"group",role:"coachesGrid",style:{direction:"grid",columns:3,gap:24,justify:"start",alignItems:"stretch",width:100,stack:"mobile"},baseResponsive:{tablet:{columns:2,gap:20},mobile:{gap:16}},children:[
            coach("Alex Morgan","Head Coach · Black Belt","Leading the academy with a focus on technical fundamentals, steady progression and a strong training culture."),
            coach("Jamie Lee","Coach · Brown Belt","Helping newer students build confidence and giving experienced students the detail they need to keep improving."),
            coach("Chris Taylor","Kids Coach · Purple Belt","Creating structured, engaging classes that help young students learn discipline, movement and jiu-jitsu." )
          ]}
        ]}
      ]
    };
  }
};

const ACADEMY_STORY={
  id:"bjj-academy-story-01",
  family:"academy",
  name:"Academy Story 02",
  category:"Academy",
  description:"Image-led academy story with layered composition",
  preview:"academy-story",
  meta:{
    stableId:"bjj-academy-story-01",version:1,category:"Academy",visualFamilies:["Editorial","Warm"],
    useCases:["academy story","training culture","facilities"],tags:["academy","story","culture","image","BJJ"],
    compositionRecipe:"Asymmetric image-led split with a layered visual and restrained motion.",
    requiredSlots:["academy image","section heading","body copy"],optionalSlots:["kicker","CTA"],imageRoles:["training or academy atmosphere"],
    responsiveRecipe:"Two-column desktop composition stacks cleanly on tablet/mobile and removes decorative offsets.",
    minimumBuilderVersion:"3.1",capabilityRequirements:["visual offsets","image focal point","container clipping","simple reveal"],
    provenance:{status:"Runa original",approach:"BJJ-specific stock component",source:"Runa V3.1.1",licence:"Runa"},verificationStatus:"browser-verified"
  },
  create(){return{id:uid("sec"),type:"about",name:"Academy Story 02",styleRole:"background",style:{},elements:[
    {id:uid("el"),type:"group",role:"academyStoryLayout",style:{direction:"row",gap:64,justify:"start",alignItems:"center",width:100,firstColumn:52},baseResponsive:{tablet:{gap:36},mobile:{gap:24}},children:[
      {id:uid("el"),type:"group",role:"mediaFrame",style:{direction:"column",gap:0,justify:"start",alignItems:"stretch",width:100,overflow:"hidden",radius:"@rounded"},children:[
        {id:uid("el"),type:"image",role:"visual",src:"",alt:"Jiu-jitsu training at the academy",style:{frameMode:"fill",height:540,focalX:52,focalY:42,offsetX:16,offsetY:14},baseResponsive:{tablet:{height:440,offsetX:0,offsetY:0},mobile:{frameMode:"ratio",aspectRatio:"4 / 3",offsetX:0,offsetY:0}},motion:{reveal:"mask",hover:"zoom"}}
      ]},
      {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:18,justify:"center",alignItems:"start",width:100},baseResponsive:{tablet:{gap:16},mobile:{gap:14}},children:[
        {id:uid("el"),type:"text",role:"kicker",text:"MORE THAN A PLACE TO TRAIN",style:{},motion:{reveal:"fade",delay:60}},
        {id:uid("el"),type:"heading",role:"h2",text:"A room built around good training and steady progress.",style:{maxWidth:650},motion:{reveal:"rise",delay:100}},
        {id:uid("el"),type:"text",role:"body",text:"We want the academy to feel serious about jiu-jitsu without taking itself too seriously. Expect structured coaching, hard rounds, good people and an environment where beginners can settle in quickly.",style:{maxWidth:610},motion:{reveal:"rise",delay:160}},
        {id:uid("el"),type:"button",role:"cta",text:"Visit the academy",href:"#contact",style:{},motion:{reveal:"fade",delay:220}}
      ]}
    ]}
  ]}}
};

const GALLERY_IMG={
  sparring:"https://images.pexels.com/photos/38678659/pexels-photo-38678659.jpeg?auto=compress&cs=tinysrgb&w=1600",
  adults:"https://images.pexels.com/photos/11391989/pexels-photo-11391989.jpeg?auto=compress&cs=tinysrgb&w=1600",
  detail:"https://images.pexels.com/photos/8612531/pexels-photo-8612531.jpeg?auto=compress&cs=tinysrgb&w=1600",
  class:"https://images.pexels.com/photos/11392335/pexels-photo-11392335.jpeg?auto=compress&cs=tinysrgb&w=1600",
  comp:"https://images.pexels.com/photos/38718030/pexels-photo-38718030.jpeg?auto=compress&cs=tinysrgb&w=1600",
  room:"https://images.pexels.com/photos/11392013/pexels-photo-11392013.jpeg?auto=compress&cs=tinysrgb&w=1800"
};
function galleryPhoto(src,alt,caption=alt,opts={}){
  return{id:uid("el"),type:"image",role:"galleryImage",name:caption,src,alt,galleryCaption:caption,galleryFillCell:!!opts.fill,style:{frameMode:opts.fill?"fill":"ratio",aspectRatio:opts.ratio||"4 / 3",height:opts.height||260,focalX:opts.focalX??50,focalY:opts.focalY??46,radius:"@square"},baseResponsive:{mobile:{frameMode:"ratio",aspectRatio:"4 / 3",height:220}},motion:{reveal:"rise",delay:0,hover:"zoom"},interaction:{lightboxGroup:""}};
}
function galleryCollection(layout,children,config={}){
  const group=uid("gallery_lightbox");
  children.forEach(img=>{img.interaction=img.interaction||{};img.interaction.lightboxGroup=group});
  return{id:uid("el"),type:"group",role:"galleryCollection",name:"Gallery collection",galleryCollection:true,galleryLayout:layout,galleryLightboxGroup:group,galleryConfig:{intro:true,lightbox:true,captions:true,hover:"zoom",entrance:"rise",corners:"square",gap:"standard",autoscroll:false,scrollSpeed:"slow",...config},style:{direction:"grid",columns:3,gap:18,justify:"start",alignItems:"stretch",width:100},baseResponsive:{tablet:{columns:2,gap:16},mobile:{columns:1,gap:14}},children};
}
function galleryIntro(title,body,align="left"){
  return{id:uid("el"),type:"group",role:"galleryIntro",gallerySlot:"intro",style:{direction:"row",gap:28,justify:"space-between",alignItems:"end",width:100,firstColumn:64},baseResponsive:{tablet:{direction:"column",gap:10,alignItems:"start"},mobile:{direction:"column",gap:8}},children:[
    {id:uid("el"),type:"heading",role:"h2",text:title,style:{maxWidth:820,align}},
    {id:uid("el"),type:"text",role:"body",text:body,style:{maxWidth:470,align}}
  ]};
}

const GALLERY_EDITORIAL_MOSAIC={
  id:"bjj-gallery-editorial-mosaic-01",family:"gallery",name:"Gallery 01 · Editorial Mosaic",category:"Gallery",
  description:"Asymmetric image mosaic with one dominant lead photograph",preview:"academy-gallery",
  meta:{stableId:"bjj-gallery-editorial-mosaic-01",version:1,category:"Gallery",visualFamilies:["Editorial","Photography"],useCases:["academy atmosphere","training photography","facilities"],tags:["gallery","mosaic","lightbox","images"],compositionRecipe:"A dominant lead image anchors an asymmetric mosaic, followed by smaller supporting moments.",requiredSlots:["repeatable gallery images"],optionalSlots:["intro","captions","lightbox"],imageRoles:["training","team","facility","details"],responsiveRecipe:"Mosaic resolves to a two-column tablet layout and single-column mobile gallery.",minimumBuilderVersion:"3.11",capabilityRequirements:["gallery collection","lightbox","responsive mosaic"],provenance:{status:"Runa original",approach:"modular gallery family",source:"Runa V3.11",licence:"Runa"},verificationStatus:"prototype"},
  create(){const photos=[
    galleryPhoto(GALLERY_IMG.sparring,"Live sparring at the academy","Live training",{fill:true}),
    galleryPhoto(GALLERY_IMG.adults,"Adult jiu-jitsu class","Technical class",{fill:true}),
    galleryPhoto(GALLERY_IMG.detail,"Jiu-jitsu coaching detail","Coaching detail",{fill:true}),
    galleryPhoto(GALLERY_IMG.class,"Students training together","Regular class",{fill:true}),
    galleryPhoto(GALLERY_IMG.comp,"Competition round","Competition",{fill:true}),
    galleryPhoto(GALLERY_IMG.room,"Academy training room","The academy",{fill:true})
  ];return{id:uid("sec"),type:"gallery",name:"Gallery 01 · Editorial Mosaic",anchor:"gallery",styleRole:"background",galleryModule:true,baseStyle:{top:56,bottom:56,side:48,contentWidth:1440},baseResponsive:{tablet:{top:48,bottom:48,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"galleryWrap",style:{direction:"column",gap:28,justify:"start",alignItems:"stretch",width:100},children:[
      galleryIntro("Inside the room.","Training is easier to understand when you can see the people, pace and atmosphere for yourself."),
      galleryCollection("mosaic",photos,{gap:"standard"})
    ]}
  ]}}
};

const GALLERY_CLEAN_GRID={
  id:"bjj-gallery-clean-grid-01",family:"gallery",name:"Gallery 01 · Clean Grid",category:"Gallery",
  description:"Simple, disciplined image grid that works with almost any photo set",preview:"academy-gallery",
  meta:{stableId:"bjj-gallery-clean-grid-01",version:1,category:"Gallery",visualFamilies:["Clean","Editorial"],useCases:["general gallery","larger photo collections","academy overview"],tags:["gallery","grid","lightbox","repeatable"],compositionRecipe:"A consistent three-column grid lets photography do the work without extra visual treatment.",requiredSlots:["repeatable gallery images"],optionalSlots:["intro","captions","lightbox"],imageRoles:["training","people","facility"],responsiveRecipe:"Three columns on desktop, two on tablet, one on mobile.",minimumBuilderVersion:"3.11",capabilityRequirements:["gallery collection","lightbox","responsive grid"],provenance:{status:"Runa original",approach:"modular gallery family",source:"Runa V3.11",licence:"Runa"},verificationStatus:"prototype"},
  create(){const photos=[
    galleryPhoto(GALLERY_IMG.sparring,"Live sparring at the academy","Live rounds","4 / 3"),
    galleryPhoto(GALLERY_IMG.adults,"Adult jiu-jitsu class","Adult class","4 / 3"),
    galleryPhoto(GALLERY_IMG.detail,"Coach helping a student","Coaching","4 / 3"),
    galleryPhoto(GALLERY_IMG.class,"Students drilling together","Drilling","4 / 3"),
    galleryPhoto(GALLERY_IMG.comp,"Competition jiu-jitsu","Competition","4 / 3"),
    galleryPhoto(GALLERY_IMG.room,"Academy training room","Training space","4 / 3")
  ];return{id:uid("sec"),type:"gallery",name:"Gallery 01 · Clean Grid",anchor:"gallery",styleRole:"background",galleryModule:true,baseStyle:{top:52,bottom:52,side:48,contentWidth:1440},baseResponsive:{tablet:{top:46,bottom:46,side:32},mobile:{top:34,bottom:34,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"galleryWrap",style:{direction:"column",gap:26,justify:"start",alignItems:"stretch",width:100},children:[
      galleryIntro("A closer look at training.","A straightforward gallery for academies with a strong, consistent set of photographs."),
      galleryCollection("grid",photos,{gap:"standard",corners:"square"})
    ]}
  ]}}
};

const GALLERY_FEATURE_THUMBS={
  id:"bjj-gallery-feature-thumbs-01",family:"gallery",name:"Gallery 03 · Feature + Thumbnails",category:"Gallery",
  description:"One lead photograph supported by a compact set of secondary images",preview:"academy-gallery",
  meta:{stableId:"bjj-gallery-feature-thumbs-01",version:1,category:"Gallery",visualFamilies:["Editorial","Photography"],useCases:["hero photography","academy story","smaller curated gallery"],tags:["gallery","feature image","lightbox","thumbnails"],compositionRecipe:"A large lead image carries the section while smaller photographs provide supporting detail.",requiredSlots:["lead gallery image","supporting gallery images"],optionalSlots:["intro","captions","lightbox"],imageRoles:["lead atmosphere image","supporting training moments"],responsiveRecipe:"Feature composition collapses into a balanced two-column tablet layout and single-column mobile stack.",minimumBuilderVersion:"3.11",capabilityRequirements:["gallery collection","lightbox","feature grid"],provenance:{status:"Runa original",approach:"modular gallery family",source:"Runa V3.11",licence:"Runa"},verificationStatus:"prototype"},
  create(){const photos=[
    galleryPhoto(GALLERY_IMG.room,"The academy during training","Inside the academy",{fill:true}),
    galleryPhoto(GALLERY_IMG.sparring,"Students sparring","Live rounds",{fill:true}),
    galleryPhoto(GALLERY_IMG.detail,"Technical coaching","Coaching",{fill:true}),
    galleryPhoto(GALLERY_IMG.adults,"Adult class","Adult training",{fill:true}),
    galleryPhoto(GALLERY_IMG.class,"Students drilling","Drilling",{fill:true})
  ];return{id:uid("sec"),type:"gallery",name:"Gallery 03 · Feature + Thumbnails",anchor:"gallery",styleRole:"background",galleryModule:true,baseStyle:{top:56,bottom:56,side:48,contentWidth:1440},baseResponsive:{tablet:{top:48,bottom:48,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"galleryWrap",style:{direction:"column",gap:28,justify:"start",alignItems:"stretch",width:100},children:[
      galleryIntro("The room tells the story.","Lead with the strongest photograph, then let the smaller details show what daily training feels like."),
      galleryCollection("feature",photos,{gap:"standard"})
    ]}
  ]}}
};

const GALLERY_FULL_STRIP={
  id:"bjj-gallery-full-strip-01",family:"gallery",name:"Gallery 02 · Full-Width Strip",category:"Gallery",
  description:"A wide photographic band for a fast visual hit without a long gallery section",preview:"academy-gallery",
  meta:{stableId:"bjj-gallery-full-strip-01",version:1,category:"Gallery",visualFamilies:["Editorial","Immersive"],useCases:["visual break","training atmosphere","compact gallery"],tags:["gallery","strip","full width","lightbox"],compositionRecipe:"A compact full-width strip keeps multiple training moments visible simultaneously.",requiredSlots:["repeatable gallery images"],optionalSlots:["intro","captions","lightbox"],imageRoles:["training moments"],responsiveRecipe:"Four images sit across wide screens, two across tablet, and one per row on mobile.",minimumBuilderVersion:"3.11",capabilityRequirements:["gallery collection","lightbox","responsive strip"],provenance:{status:"Runa original",approach:"modular gallery family",source:"Runa V3.11",licence:"Runa"},verificationStatus:"prototype"},
  create(){const photos=[
    galleryPhoto(GALLERY_IMG.sparring,"Live rounds","Live rounds",{ratio:"3 / 4"}),
    galleryPhoto(GALLERY_IMG.detail,"Technical coaching","Coaching",{ratio:"3 / 4"}),
    galleryPhoto(GALLERY_IMG.adults,"Adult class","Adult class",{ratio:"3 / 4"}),
    galleryPhoto(GALLERY_IMG.comp,"Competition training","Competition",{ratio:"3 / 4"})
  ];return{id:uid("sec"),type:"gallery",name:"Gallery 02 · Full-Width Strip",anchor:"gallery",styleRole:"background",galleryModule:true,baseStyle:{top:48,bottom:48,side:0,contentWidth:0},baseResponsive:{tablet:{top:42,bottom:42,side:0},mobile:{top:32,bottom:32,side:0}},style:{},elements:[
    {id:uid("el"),type:"group",role:"galleryWrap",style:{direction:"column",gap:24,justify:"start",alignItems:"stretch",width:100},children:[
      {id:uid("el"),type:"group",role:"galleryIntroOuter",style:{direction:"column",gap:0,justify:"start",alignItems:"stretch",width:100,padding:48},baseResponsive:{tablet:{padding:32},mobile:{padding:20}},children:[galleryIntro("Training, up close.","A compact visual band when the page needs atmosphere without another long content section.")]},
      galleryCollection("strip",photos,{gap:"compact",corners:"square"})
    ]}
  ]}}
};


const GALLERY_SCROLL_RAIL={
  id:"bjj-gallery-scroll-rail-01",family:"gallery",name:"Gallery 03 · Scroll Rail",category:"Gallery",
  description:"Full-width horizontal image rail for larger galleries without increasing page length",preview:"academy-gallery",
  meta:{stableId:"bjj-gallery-scroll-rail-01",version:2,category:"Gallery",visualFamilies:["Editorial","Immersive"],useCases:["larger photo collection","training atmosphere","horizontal gallery"],tags:["gallery","scroll","rail","full width","lightbox","autoscroll"],compositionRecipe:"A wide horizontal rail keeps the gallery compact while allowing visitors to browse more photography in-place.",requiredSlots:["repeatable gallery images"],optionalSlots:["intro","captions","lightbox","autoscroll"],imageRoles:["training moments"],responsiveRecipe:"The rail shows several images on desktop and progressively larger cards on tablet/mobile, with horizontal scrolling at every size.",minimumBuilderVersion:"3.12",capabilityRequirements:["gallery collection","horizontal rail","lightbox","optional autoscroll"],provenance:{status:"Runa original",approach:"modular gallery family",source:"Runa V3.12.2",licence:"Runa"},verificationStatus:"prototype"},
  create(){const photos=[
    galleryPhoto(GALLERY_IMG.sparring,"Live rounds","Live rounds",{ratio:"3 / 2"}),
    galleryPhoto(GALLERY_IMG.detail,"Technical coaching","Coaching",{ratio:"3 / 2"}),
    galleryPhoto(GALLERY_IMG.adults,"Adult class","Adult class",{ratio:"3 / 2"}),
    galleryPhoto(GALLERY_IMG.comp,"Competition training","Competition",{ratio:"3 / 2"}),
    galleryPhoto(GALLERY_IMG.class,"Students drilling","Drilling",{ratio:"3 / 2"}),
    galleryPhoto(GALLERY_IMG.room,"Academy training room","The academy",{ratio:"3 / 2"})
  ];return{id:uid("sec"),type:"gallery",name:"Gallery 03 · Scroll Rail",anchor:"gallery",styleRole:"background",galleryModule:true,baseStyle:{top:48,bottom:48,side:0,contentWidth:0},baseResponsive:{tablet:{top:42,bottom:42,side:0},mobile:{top:32,bottom:32,side:0}},style:{},elements:[
    {id:uid("el"),type:"group",role:"galleryWrap",style:{direction:"column",gap:24,justify:"start",alignItems:"stretch",width:100},children:[
      {id:uid("el"),type:"group",role:"galleryIntroOuter",style:{direction:"column",gap:0,justify:"start",alignItems:"stretch",width:100,padding:48},baseResponsive:{tablet:{padding:32},mobile:{padding:20}},children:[galleryIntro("More of the room.","A horizontally browsable gallery keeps more photography available without turning the page into a long image wall.")]},
      galleryCollection("rail",photos,{gap:"compact",corners:"square",autoscroll:false,scrollSpeed:"slow"})
    ]}
  ]}}
};

const GALLERY_FEATURE_RAIL={
  id:"bjj-gallery-feature-rail-01",family:"gallery",name:"Gallery 04 · Feature + Scroll Rail",category:"Gallery",
  description:"One dominant image followed by a horizontally scrolling supporting gallery",preview:"academy-gallery",
  meta:{stableId:"bjj-gallery-feature-rail-01",version:3,category:"Gallery",visualFamilies:["Editorial","Photography"],useCases:["academy story","featured atmosphere image","larger photo collection"],tags:["gallery","feature image","scroll rail","lightbox","autoscroll"],compositionRecipe:"One strong image establishes the atmosphere, then a compact horizontal rail lets visitors browse the remaining photography.",requiredSlots:["lead gallery image","repeatable supporting images"],optionalSlots:["intro","captions","lightbox","autoscroll"],imageRoles:["lead atmosphere image","supporting training moments"],responsiveRecipe:"Lead image and supporting rail can independently run contained or full-width; the rail remains horizontally scrollable on desktop, tablet and mobile.",minimumBuilderVersion:"3.12",capabilityRequirements:["gallery collection","lead image","horizontal rail","lightbox","optional autoscroll"],provenance:{status:"Runa original",approach:"modular gallery family",source:"Runa V3.12.4",licence:"Runa"},verificationStatus:"prototype"},
  create(){const photos=[
    galleryPhoto(GALLERY_IMG.room,"The academy during training","Inside the academy",{ratio:"16 / 7",focalY:48}),
    galleryPhoto(GALLERY_IMG.sparring,"Students sparring","Live rounds",{ratio:"3 / 2"}),
    galleryPhoto(GALLERY_IMG.detail,"Technical coaching","Coaching",{ratio:"3 / 2"}),
    galleryPhoto(GALLERY_IMG.adults,"Adult class","Adult training",{ratio:"3 / 2"}),
    galleryPhoto(GALLERY_IMG.class,"Students drilling","Drilling",{ratio:"3 / 2"}),
    galleryPhoto(GALLERY_IMG.comp,"Competition training","Competition",{ratio:"3 / 2"})
  ];return{id:uid("sec"),type:"gallery",name:"Gallery 04 · Feature + Scroll Rail",anchor:"gallery",styleRole:"background",galleryModule:true,baseStyle:{top:56,bottom:56,side:0,contentWidth:0},baseResponsive:{tablet:{top:48,bottom:48,side:0},mobile:{top:36,bottom:36,side:0}},style:{},elements:[
    {id:uid("el"),type:"group",role:"galleryWrap",style:{direction:"column",gap:28,justify:"start",alignItems:"stretch",width:100},children:[
      {id:uid("el"),type:"group",role:"galleryFeatureIntroOuter",style:{direction:"column",gap:0,justify:"start",alignItems:"stretch",width:100},children:[galleryIntro("One strong moment. More just beneath it.","Lead with the photograph that best captures the academy, then let visitors browse the rest without adding another long section.")]},
      galleryCollection("featureRail",photos,{gap:"compact",corners:"square",autoscroll:false,scrollSpeed:"slow",leadWidth:"contained",railWidth:"contained",leadShape:"cinematic"})
    ]}
  ]}}
};

const HEAD_COACH={
  id:"bjj-head-coach-01",
  family:"coaches",
  name:"Head Coach 01",
  category:"Coaches",
  description:"Feature profile for the academy head coach",
  preview:"coach-feature",
  meta:{
    stableId:"bjj-head-coach-01",version:1,category:"Coaches",visualFamilies:["Editorial","Clean"],
    useCases:["head coach","professor profile","founder story"],tags:["coach","black belt","instructor","profile","BJJ"],
    compositionRecipe:"Large portrait paired with an oversized coach name and concise coaching philosophy.",
    requiredSlots:["coach portrait","coach name","rank or role","bio"],optionalSlots:["kicker","CTA"],imageRoles:["head coach portrait"],
    responsiveRecipe:"Two-column desktop layout stacks portrait-first on smaller screens.",minimumBuilderVersion:"3.1",
    capabilityRequirements:["fluid display typography","visual offsets","image focal point","simple reveal"],
    provenance:{status:"Runa original",approach:"BJJ-specific stock component",source:"Runa V3.1.1",licence:"Runa"},verificationStatus:"browser-verified"
  },
  create(){return{id:uid("sec"),type:"team",name:"Head Coach 01",styleRole:"background",style:{},elements:[
    {id:uid("el"),type:"group",role:"headCoachLayout",style:{direction:"row",gap:58,justify:"start",alignItems:"center",width:100,firstColumn:46},baseResponsive:{tablet:{gap:34},mobile:{gap:22}},children:[
      {id:uid("el"),type:"image",role:"visual",src:"",alt:"Head coach portrait",style:{frameMode:"ratio",aspectRatio:"4 / 5",focalX:50,focalY:34,offsetY:18,radius:"@rounded"},baseResponsive:{tablet:{offsetY:0},mobile:{offsetY:0}},motion:{reveal:"mask",hover:"zoom"}},
      {id:uid("el"),type:"group",role:"coachCopy",style:{direction:"column",gap:16,justify:"center",alignItems:"start",width:100},children:[
        {id:uid("el"),type:"text",role:"kicker",text:"HEAD COACH · BLACK BELT",style:{},motion:{reveal:"fade",delay:40}},
        {id:uid("el"),type:"heading",role:"display",text:"Alex Morgan",fluidScale:{desktop:{min:.5625,max:1.0833333333,vw:7.2},mobile:{min:.4583333333,max:.6875,vw:12}},style:{fluidSize:true,maxWidth:760},motion:{reveal:"rise",delay:90}},
        {id:uid("el"),type:"text",role:"lead",text:"Good jiu-jitsu is built through clear fundamentals, consistent training and a room where people help each other improve.",style:{maxWidth:660},motion:{reveal:"rise",delay:140}},
        {id:uid("el"),type:"text",role:"body",text:"Alex has coached students from their first class through competition and advanced training. The focus is always on understanding the position, making better decisions and building a game that holds up under pressure.",style:{maxWidth:620},motion:{reveal:"fade",delay:190}}
      ]}
    ]}
  ]}}
};

const TRUST_REVIEWS={
  id:"bjj-trust-reviews-01",
  family:"trust",
  name:"Member Reviews 01",
  category:"Trust",
  description:"Member proof with one lead quote and supporting reviews",
  preview:"trust-reviews",
  meta:{
    stableId:"bjj-trust-reviews-01",version:1,category:"Trust",visualFamilies:["Clean","Warm"],
    useCases:["member reviews","social proof","beginner reassurance"],tags:["reviews","testimonials","trust","members","BJJ"],
    compositionRecipe:"Large lead testimonial supported by two compact member quotes.",
    requiredSlots:["testimonial copy","member attribution"],optionalSlots:["section heading"],responsiveRecipe:"Lead quote and supporting proof stack naturally on mobile.",
    minimumBuilderVersion:"3.1",capabilityRequirements:["simple reveal","responsive containers"],
    provenance:{status:"Runa original",approach:"BJJ-specific stock component",source:"Runa V3.1.1",licence:"Runa"},verificationStatus:"browser-verified"
  },
  create(){const quote=(text,name,delay)=>({id:uid("el"),type:"group",role:"card",surfaceRole:"alternative",style:{direction:"column",gap:14,justify:"space-between",alignItems:"start",width:100,padding:24,radius:"@rounded"},motion:{reveal:"rise",delay},children:[
    {id:uid("el"),type:"text",role:"lead",text:"“"+text+"”",style:{}},
    {id:uid("el"),type:"text",role:"small",text:name,textStyleRole:"label",style:{}}
  ]});return{id:uid("sec"),type:"proof",name:"Member Reviews 01",styleRole:"background",style:{},elements:[
    {id:uid("el"),type:"group",role:"proofWrap",style:{direction:"column",gap:32,justify:"start",alignItems:"stretch",width:100},children:[
      {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:12,justify:"start",alignItems:"start",width:62},baseResponsive:{mobile:{width:100}},children:[
        {id:uid("el"),type:"text",role:"kicker",text:"WHY MEMBERS STAY",style:{}},
        {id:uid("el"),type:"heading",role:"h2",text:"The room matters as much as the training.",style:{maxWidth:760}}
      ]},
      {id:uid("el"),type:"group",role:"proofLayout",style:{direction:"row",gap:22,justify:"start",alignItems:"stretch",width:100,firstColumn:58},baseResponsive:{tablet:{gap:18},mobile:{gap:14}},children:[
        {id:uid("el"),type:"group",role:"leadQuote",surfaceRole:"dark",style:{direction:"column",gap:18,justify:"space-between",alignItems:"start",width:100,padding:32,radius:"@rounded"},baseResponsive:{mobile:{padding:24}},motion:{reveal:"mask"},children:[
          {id:uid("el"),type:"heading",role:"h3",text:"“I walked in knowing nobody and having never trained before. Within a few weeks the academy already felt like somewhere I belonged.”",textRole:"onDark",style:{maxWidth:760}},
          {id:uid("el"),type:"text",role:"small",text:"Sam · Member since 2024",textStyleRole:"label",textRole:"onDark",style:{}}
        ]},
        {id:uid("el"),type:"group",role:"supportingQuotes",style:{direction:"column",gap:16,justify:"start",alignItems:"stretch",width:100},children:[
          quote("The coaching is detailed without being overwhelming. You always know what you should be working on.","Maya · Blue belt",90),
          quote("Hard training, friendly people and no ego. Exactly what I was looking for.","Daniel · Member",150)
        ]}
      ]}
    ]}
  ]}}
};

const FAQ_BEGINNER={
  id:"bjj-faq-beginner-01",
  family:"faq",
  name:"Beginner FAQ 01",
  category:"FAQ",
  description:"Beginner-focused accordion FAQ",
  preview:"faq-accordion",
  meta:{
    stableId:"bjj-faq-beginner-01",version:1,category:"FAQ",visualFamilies:["Clean"],
    useCases:["beginner FAQ","first class","objection handling"],tags:["FAQ","accordion","beginners","first class","BJJ"],
    compositionRecipe:"Intro copy beside a compact accordion of common first-class questions.",
    requiredSlots:["questions","answers"],optionalSlots:["section heading","intro copy"],responsiveRecipe:"Two-column desktop; single-column mobile with accordion intact.",
    minimumBuilderVersion:"3.1",capabilityRequirements:["accordion runtime"],
    provenance:{status:"Runa original",approach:"BJJ-specific stock component",source:"Runa V3.1.1",licence:"Runa"},verificationStatus:"browser-verified"
  },
  create(){
    const item=(key,q,a)=>({id:uid("el"),type:"group",role:"faqItem",style:{direction:"column",gap:10,justify:"start",alignItems:"stretch",width:100,padding:18,border:"@standard",radius:"@subtle"},children:[
      {id:uid("el"),type:"heading",role:"h4",text:q,style:{},interaction:{role:"trigger",key}},
      {id:uid("el"),type:"text",role:"body",text:a,style:{maxWidth:760},interaction:{role:"panel",key}}
    ]});
    return{id:uid("sec"),type:"faq",name:"Beginner FAQ 01",styleRole:"background",style:{},elements:[
      {id:uid("el"),type:"group",role:"faqLayout",style:{direction:"row",gap:56,justify:"start",alignItems:"start",width:100,firstColumn:34},baseResponsive:{tablet:{gap:32},mobile:{gap:24}},children:[
        {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:14,justify:"start",alignItems:"start",width:100},children:[
          {id:uid("el"),type:"text",role:"kicker",text:"YOUR FIRST CLASS",style:{}},
          {id:uid("el"),type:"heading",role:"h2",text:"New to jiu-jitsu? Start here.",style:{}},
          {id:uid("el"),type:"text",role:"body",text:"Most people have the same questions before they walk through the door. Here are the answers that matter.",style:{maxWidth:520}}
        ]},
        {id:uid("el"),type:"group",role:"faqAccordion",style:{direction:"column",gap:10,justify:"start",alignItems:"stretch",width:100},interaction:{recipe:"accordion",defaultKey:"faq-1"},children:[
          item("faq-1","Do I need to be fit before I start?","No. Getting fitter is one of the reasons to train. Classes can be adjusted while you learn and build your conditioning."),
          item("faq-2","Do I need a gi for my first class?","Not necessarily. Contact the academy before your first session and we will tell you what to bring. A T-shirt and athletic shorts are often enough to get started."),
          item("faq-3","Will I have to spar immediately?","Beginners are introduced to live training gradually. You will learn the basic positions and rules before being expected to know what you are doing."),
          item("faq-4","Am I too old to start?","Adults begin jiu-jitsu at all ages. The important thing is training at a pace that suits you and staying consistent."),
          item("faq-5","How often should a beginner train?","Two or three sessions each week is a strong starting point for most people and gives you enough repetition to make steady progress.")
        ]}
      ]}
    ]};
  }
};

const CONVERSION_DISPLAY={
  id:"bjj-conversion-display-01",
  family:"cta",
  name:"Display CTA 02",
  category:"Conversion",
  description:"Oversized closing CTA with fluid display typography",
  preview:"display-cta",
  meta:{
    stableId:"bjj-conversion-display-01",version:1,category:"Conversion",visualFamilies:["Editorial","Commercial"],
    useCases:["closing CTA","trial booking","beginner conversion"],tags:["CTA","trial","display type","conversion","BJJ"],
    compositionRecipe:"Dark high-impact closing section with oversized responsive display copy.",
    requiredSlots:["display headline","CTA"],optionalSlots:["supporting copy"],responsiveRecipe:"Fluid display type scales continuously and remains clipped inside the section.",
    minimumBuilderVersion:"3.1",capabilityRequirements:["fluid display typography","container clipping","simple reveal"],
    provenance:{status:"Runa original",approach:"BJJ-specific stock component",source:"Runa V3.1.1",licence:"Runa"},verificationStatus:"browser-verified"
  },
  create(){return{id:uid("sec"),type:"cta",name:"Display CTA 02",styleRole:"brand",style:{},elements:[
    {id:uid("el"),type:"group",role:"displayCtaWrap",style:{direction:"column",gap:24,justify:"start",alignItems:"start",width:100,overflow:"visible"},children:[
      {id:uid("el"),type:"text",role:"kicker",text:"READY WHEN YOU ARE",style:{},motion:{reveal:"fade"}},
      {id:uid("el"),type:"heading",role:"display",text:"START TRAINING.",textStyleRole:"displayTight",fluidScale:{desktop:{min:.7083333333,max:1.7708333333,vw:11.5},mobile:{min:.3958333333,max:.4479166667,vw:10.8}},style:{fluidSize:true,whiteSpace:"nowrap",maxWidth:1800},baseResponsive:{mobile:{whiteSpace:"nowrap"}},motion:{reveal:"mask",delay:70}},
      {id:uid("el"),type:"group",role:"ctaRow",style:{direction:"row",gap:22,justify:"space-between",alignItems:"center",width:100},baseResponsive:{mobile:{direction:"column",alignItems:"start",gap:18}},children:[
        {id:uid("el"),type:"text",role:"lead",text:"Your first class is the hardest one to book. After that, you just have to turn up.",style:{maxWidth:650},motion:{reveal:"rise",delay:140}},
        {id:uid("el"),type:"button",role:"cta",text:"Book your first class",href:"#contact",style:{},motion:{reveal:"fade",delay:200}}
      ]}
    ]}
  ]}}
};

const PROGRAMS_IMAGE={
  id:"bjj-programs-image-01",
  family:"services",
  name:"Programs 02",
  category:"Programs",
  description:"Image-led Adults, Beginners and Kids programs",
  preview:"programs-image",
  meta:{
    stableId:"bjj-programs-image-01",version:1,category:"Programs",visualFamilies:["Commercial","Warm"],
    useCases:["program overview","adults","beginners","kids"],tags:["programs","beginners","kids","adults","BJJ"],
    compositionRecipe:"Three image-led program cards with clear audience routing.",
    requiredSlots:["program image","program name","program summary"],optionalSlots:["section intro","program CTA"],imageRoles:["adult training","beginner coaching","kids class"],
    responsiveRecipe:"Three columns desktop, two tablet, one mobile.",minimumBuilderVersion:"3.1",capabilityRequirements:["image hover","simple reveal","responsive grid"],
    provenance:{status:"Runa original",approach:"BJJ-specific stock component",source:"Runa V3.1.1",licence:"Runa"},verificationStatus:"browser-verified"
  },
  create(){
    const program=(title,kicker,body,alt,delay)=>({id:uid("el"),type:"group",role:"card",surfaceRole:"background",style:{direction:"column",gap:14,justify:"start",alignItems:"stretch",width:100,padding:0,radius:"@rounded",overflow:"hidden"},motion:{reveal:"rise",delay,hover:"lift"},children:[
      {id:uid("el"),type:"image",role:"visual",src:"",alt,style:{frameMode:"ratio",aspectRatio:"4 / 3",focalX:50,focalY:42,radius:"@square"},motion:{hover:"zoom"}},
      {id:uid("el"),type:"group",role:"programCopy",style:{direction:"column",gap:9,justify:"start",alignItems:"start",width:100,padding:20},children:[
        {id:uid("el"),type:"text",role:"small",text:kicker,textStyleRole:"label",textRole:"brand",style:{}},
        {id:uid("el"),type:"heading",role:"h3",text:title,style:{}},
        {id:uid("el"),type:"text",role:"body",text:body,style:{}},
        {id:uid("el"),type:"button",role:"cta",text:"Learn more",href:"#contact",style:{}}
      ]}
    ]});
    return{id:uid("sec"),type:"services",name:"Programs 02",styleRole:"alternative",style:{},elements:[
      {id:uid("el"),type:"group",role:"programsWrap",style:{direction:"column",gap:34,justify:"start",alignItems:"stretch",width:100},children:[
        {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:12,justify:"start",alignItems:"start",width:65},baseResponsive:{mobile:{width:100}},children:[
          {id:uid("el"),type:"text",role:"kicker",text:"FIND YOUR PLACE ON THE MAT",style:{}},
          {id:uid("el"),type:"heading",role:"h2",text:"Training for every stage of the journey.",style:{maxWidth:790}},
          {id:uid("el"),type:"text",role:"body",text:"Start from zero, build your fundamentals or keep developing an existing game.",style:{maxWidth:620}}
        ]},
        {id:uid("el"),type:"group",role:"programGrid",style:{direction:"grid",columns:3,gap:22,justify:"start",alignItems:"stretch",width:100,stack:"mobile"},baseResponsive:{tablet:{columns:2,gap:18},mobile:{gap:16}},children:[
          program("Beginner Jiu-Jitsu","START HERE","A clear introduction to the positions, movements and habits you need to begin training with confidence.","Beginner students learning jiu-jitsu",0),
          program("Adult BJJ","BUILD YOUR GAME","Structured gi and no-gi training for students who want to improve technique, fitness and live grappling.","Adult Brazilian Jiu-Jitsu class",80),
          program("Kids BJJ","LEARN. MOVE. GROW.","Age-appropriate classes that build coordination, confidence, problem solving and respect through jiu-jitsu.","Kids Brazilian Jiu-Jitsu class",160)
        ]}
      ]}
    ]};
  }
};

const LOCATION_SECTION={
  id:"bjj-location-01",
  family:"location",
  name:"Academy Location 01",
  category:"Location",
  description:"Address, practical details and location visual",
  preview:"location-split",
  meta:{
    stableId:"bjj-location-01",version:1,category:"Location",visualFamilies:["Clean","Commercial"],
    useCases:["academy location","contact","visit information"],tags:["location","address","parking","contact","BJJ"],
    compositionRecipe:"Practical visit information paired with a map or academy exterior image.",
    requiredSlots:["address","location visual","contact CTA"],optionalSlots:["parking","transport","opening note"],imageRoles:["map","academy exterior","local landmark"],
    responsiveRecipe:"Split desktop layout stacks information above map/image on smaller screens.",minimumBuilderVersion:"3.1",
    capabilityRequirements:["image focal point","simple reveal","responsive containers"],
    provenance:{status:"Runa original",approach:"BJJ-specific stock component",source:"Runa V3.1.1",licence:"Runa"},verificationStatus:"browser-verified"
  },
  create(){return{id:uid("sec"),type:"location",name:"Academy Location 01",styleRole:"background",style:{},elements:[
    {id:uid("el"),type:"group",role:"locationLayout",style:{direction:"row",gap:52,justify:"start",alignItems:"stretch",width:100,firstColumn:42},baseResponsive:{tablet:{gap:32},mobile:{gap:22}},children:[
      {id:uid("el"),type:"group",role:"locationCopy",style:{direction:"column",gap:16,justify:"center",alignItems:"start",width:100},children:[
        {id:uid("el"),type:"text",role:"kicker",text:"FIND THE ACADEMY",style:{}},
        {id:uid("el"),type:"heading",role:"h2",text:"Come in and see the room for yourself.",style:{maxWidth:620},motion:{reveal:"rise"}},
        {id:uid("el"),type:"text",role:"lead",text:"APEX JIU-JITSU · 24 Example Street · Your City",textStyleRole:"leadEmphasis",style:{maxWidth:560}},
        {id:uid("el"),type:"text",role:"body",text:"Easy to reach by car or public transport. Parking is available nearby and changing facilities are available inside the academy.",style:{maxWidth:560}},
        {id:uid("el"),type:"button",role:"cta",text:"Get directions",href:"#",style:{},motion:{reveal:"fade",delay:120}}
      ]},
      {id:uid("el"),type:"image",role:"visual",src:"",alt:"Academy location or map",style:{frameMode:"fill",height:430,focalX:50,focalY:50,radius:"@rounded"},baseResponsive:{mobile:{frameMode:"ratio",aspectRatio:"4 / 3"}},motion:{reveal:"mask",hover:"zoom"}}
    ]}
  ]}}
};


// --- Editorial BJJ prototype library -------------------------------------------------
// These variants deliberately avoid the default "background + cards" composition.
// They use full-bleed media, open typography, split-screen layouts and page-level rhythm.
const EDITORIAL_IMG={
  hero:"https://images.pexels.com/photos/11392044/pexels-photo-11392044.jpeg?auto=compress&cs=tinysrgb&w=1800",
  academy:"https://images.pexels.com/photos/8612498/pexels-photo-8612498.jpeg?auto=compress&cs=tinysrgb&w=1600",
  beginner:"https://images.pexels.com/photos/38732379/pexels-photo-38732379.jpeg?auto=compress&cs=tinysrgb&w=1400",
  adults:"https://images.pexels.com/photos/11391989/pexels-photo-11391989.jpeg?auto=compress&cs=tinysrgb&w=1400",
  kids:"https://images.pexels.com/photos/28945401/pexels-photo-28945401.jpeg?auto=compress&cs=tinysrgb&w=1400",
  room:"https://images.pexels.com/photos/11392013/pexels-photo-11392013.jpeg?auto=compress&cs=tinysrgb&w=1800",
  coach:"https://images.pexels.com/photos/8611971/pexels-photo-8611971.jpeg?auto=compress&cs=tinysrgb&w=1400",
  contact:"https://images.pexels.com/photos/6253349/pexels-photo-6253349.jpeg?auto=compress&cs=tinysrgb&w=1600"
};

function makeHeroActions(layout="primary",primaryText="Book a trial class",primaryHref="#contact",secondaryText="View timetable",secondaryHref="#timetable",justify="start"){
  const actionContent={primary:{text:primaryText,href:primaryHref},secondary:{text:secondaryText,href:secondaryHref}};
  const button=(slot,variant)=>({id:uid("el"),type:"button",role:"cta",actionSlot:slot,text:actionContent[slot].text,href:actionContent[slot].href,buttonVariant:variant,style:{}});
  const children=layout==="none"?[]:
    layout==="primary"?[button("primary","main")]:
    layout==="two"?[button("primary","main"),button("secondary","alternative")]:
    layout==="primaryText"?[button("primary","main"),button("secondary","text")]:
    [button("primary","text"),button("secondary","text")];
  return{id:uid("el"),type:"group",role:"heroActions",name:"Hero actions",actionLayout:layout,actionContent,style:{direction:"row",gap:16,justify,alignItems:"center",width:100},baseResponsive:{mobile:{direction:"column",gap:12,alignItems:justify==="center"?"center":"start"}},children};
}

const NAVBAR_EDITORIAL={
  id:"bjj-nav-editorial-01",family:"navbar",name:"Navbar 02 · Editorial",category:"Nav",
  description:"Transparent site-wide navigation for photographic heroes",preview:"nav-clean",
  meta:{stableId:"bjj-nav-editorial-01",version:1,category:"Nav",visualFamilies:["Editorial"],useCases:["image-led BJJ site"],tags:["navbar","transparent","editorial"],compositionRecipe:"Transparent navigation floats over the opening hero and becomes solid when scrolled.",requiredSlots:["brand","navigation","CTA"],optionalSlots:[],responsiveRecipe:"Desktop navigation becomes a hamburger menu on mobile.",minimumBuilderVersion:"3.5",capabilityRequirements:["transparent navbar"],provenance:{status:"Runa original",approach:"editorial BJJ prototype",source:"Runa V3.5",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"navbar",name:"Navbar 02 · Editorial",styleRole:"background",navMode:"smart",smartInitial:"hero",navTransparent:true,navTopColor:"$onDark",navScrolledBackground:"$bg",navScrolledColor:"$text",mobileMenu:"hamburger",style:{},elements:[
    {id:uid("el"),type:"group",role:"navLayout",style:{direction:"row",gap:28,justify:"space-between",alignItems:"center",width:100},children:[
      {id:uid("el"),type:"text",role:"brand",text:"APEX JIU-JITSU",textStyleRole:"brand",style:{}},
      {id:uid("el"),type:"group",role:"navLinks",style:{direction:"row",gap:28,justify:"center",alignItems:"center",width:40},children:[
        {id:uid("el"),type:"text",role:"navlink",text:"Programs",style:{}},
        {id:uid("el"),type:"text",role:"navlink",text:"Coaches",style:{}},
        {id:uid("el"),type:"text",role:"navlink",text:"Timetable",style:{}}
      ]},
      {id:uid("el"),type:"button",role:"cta",text:"Book a trial",href:"#contact",buttonVariant:"alternative",style:{}}
    ]}
  ]}}
};

const HERO_FULL_BLEED={
  id:"bjj-hero-full-bleed-01",family:"hero",name:"Hero 06 · Full Bleed",category:"Hero",
  description:"Full-screen photographic hero with open typography",preview:"hero-editorial",
  meta:{stableId:"bjj-hero-full-bleed-01",version:1,category:"Hero",visualFamilies:["Editorial"],useCases:["BJJ academy home page"],tags:["hero","full bleed","photography","editorial"],compositionRecipe:"Viewport-height background photography with a restrained lower-left content block.",requiredSlots:["hero image","headline","intro","CTA"],optionalSlots:["kicker"],imageRoles:["training action"],responsiveRecipe:"Keeps the image immersive while reducing headline scale and vertical space on smaller screens.",minimumBuilderVersion:"3.5",capabilityRequirements:["section background image","full-height section"],provenance:{status:"Runa original",approach:"editorial BJJ prototype",source:"Runa V3.5",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"hero",name:"Hero 06 · Full Bleed",styleRole:"dark",baseStyle:{top:150,bottom:84,side:48,contentWidth:1440,minHeight:"screen",vAlign:"bottom",bgImage:EDITORIAL_IMG.hero,bgFit:"cover",bgPos:"center",overlayColor:"$dark",overlayOpacity:.48},baseResponsive:{tablet:{top:120,bottom:64,side:32,minHeight:720},mobile:{top:110,bottom:48,side:20,minHeight:660}},style:{},elements:[
    {id:uid("el"),type:"group",role:"heroEditorialCopy",style:{direction:"column",gap:20,justify:"end",alignItems:"start",width:72},baseResponsive:{tablet:{width:86,gap:18},mobile:{width:100,gap:14}},children:[
      {id:uid("el"),type:"heading",role:"h1",text:"Train somewhere that makes you want to come back tomorrow.",textScale:{desktop:1.34,tablet:1.08,mobile:.76},style:{maxWidth:1040},motion:{reveal:"mask"}},
      {id:uid("el"),type:"text",role:"lead",text:"Technical training, good people and a clear place to start — whether this is your first class or your thousandth.",style:{maxWidth:700},motion:{reveal:"rise",delay:90}},
      makeHeroActions("primaryText","Book your first class","#contact","View timetable","#timetable","start")
    ]}
  ]}}
};

function academyEyebrow(text,visible=true){
  return{id:uid("el"),type:"text",role:"kicker",academySlot:"eyebrow",text,textRole:"accent1",baseStyle:{visible},style:{}};
}
function academyCta(text="Learn more",href="#contact",mode="text",visible=true){
  return{id:uid("el"),type:"button",role:"cta",academySlot:"cta",text,href,buttonVariant:mode==='button'?"main":"text",baseStyle:{visible},style:{}};
}
function academyImage(src,alt,{height=620,aspectRatio="4 / 3",visible=true,focalX=50,focalY=46}={}){
  return{id:uid("el"),type:"image",role:"visual",academySlot:"image",src,alt,imageShapeRole:"bleed",baseStyle:{visible},style:{frameMode:"fill",height,radius:"@square",focalX,focalY},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 10",height:420,order:-1},mobile:{frameMode:"ratio",aspectRatio,height:320,order:-1}},motion:{reveal:"mask"}};
}
function academyStat(value,label){
  return{id:uid("el"),type:"group",role:"academyStat",style:{direction:"column",gap:6,justify:"start",alignItems:"start",width:100},children:[
    {id:uid("el"),type:"heading",role:"display",text:value,textStyleRole:"displayTight",textScale:{desktop:.48,tablet:.42,mobile:.36},style:{maxWidth:260}},
    {id:uid("el"),type:"text",role:"small",text:label.toUpperCase(),textStyleRole:"label",textRole:"secondary",style:{maxWidth:220}}
  ]};
}

const INTRO_STATEMENT={
  id:"bjj-intro-statement-01",family:"academy",name:"Academy 01 · Open Statement",category:"Academy",
  description:"Large typographic academy statement with restrained supporting copy",preview:"display-cta",
  meta:{stableId:"bjj-intro-statement-01",version:2,category:"Academy",visualFamilies:["Editorial"],useCases:["academy introduction","brand statement"],tags:["intro","statement","typography","open"],compositionRecipe:"A large statement carries the identity of the academy while two short supporting thoughts sit independently beneath it.",requiredSlots:["statement","supporting copy"],optionalSlots:["eyebrow","CTA"],responsiveRecipe:"Typography scales down while support copy stacks cleanly on mobile.",minimumBuilderVersion:"3.10",capabilityRequirements:["academy modules","text scaling"],provenance:{status:"Runa original",approach:"modular academy family",source:"Runa V3.10",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"about",name:"Academy 01 · Open Statement",academyModule:true,academyCapabilities:{eyebrow:true,cta:true},academyConfig:{eyebrow:false,cta:"none"},styleRole:"background",baseStyle:{top:56,bottom:56,side:48,contentWidth:1440},baseResponsive:{tablet:{top:48,bottom:48,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"statementWrap",style:{direction:"column",gap:26,justify:"start",alignItems:"stretch",width:100},baseResponsive:{tablet:{gap:24},mobile:{gap:20}},children:[
      academyEyebrow("WELCOME TO THE ROOM",false),
      {id:uid("el"),type:"heading",role:"h2",text:"Jiu-jitsu is difficult. Finding a place where you can learn it shouldn’t be.",textScale:{desktop:1.35,tablet:1.12,mobile:.84},style:{maxWidth:1140},motion:{reveal:"rise"}},
      {id:uid("el"),type:"group",role:"statementSupport",style:{direction:"row",gap:32,justify:"space-between",alignItems:"start",width:100,firstColumn:52},baseResponsive:{tablet:{gap:24},mobile:{direction:"column",gap:14}},children:[
        {id:uid("el"),type:"text",role:"lead",text:"A serious place to learn without having to prove you belong first.",textRole:"secondary",style:{maxWidth:520}},
        {id:uid("el"),type:"text",role:"lead",text:"Our classes are structured, the coaching is direct and beginners are expected. You can walk in knowing nothing and still know exactly where to begin.",style:{maxWidth:610}}
      ]},
      academyCta("Meet the academy","#contact","text",false)
    ]}
  ]}}
};

const ACADEMY_FULL_SPLIT={
  id:"bjj-academy-full-split-01",family:"academy",name:"Academy 02 · Full Split",category:"Academy",
  description:"Edge-to-edge academy image beside a concise story",preview:"academy-story",
  meta:{stableId:"bjj-academy-full-split-01",version:2,category:"Academy",visualFamilies:["Editorial"],useCases:["academy story","culture"],tags:["split screen","full bleed","academy","image"],compositionRecipe:"Photography owns one side of the viewport while concise copy sits directly on the page rather than inside a card.",requiredSlots:["academy image","heading","body"],optionalSlots:["CTA","eyebrow"],imageRoles:["academy environment"],responsiveRecipe:"Split screen stacks with image first below desktop widths.",minimumBuilderVersion:"3.10",capabilityRequirements:["academy modules","zero-gutter section","edge-to-edge media"],provenance:{status:"Runa original",approach:"modular academy family",source:"Runa V3.10",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"about",name:"Academy 02 · Full Split",academyModule:true,academyCapabilities:{eyebrow:true,cta:true,image:true,imagePosition:true},academyImageShare:56,academyConfig:{eyebrow:true,cta:"text",image:true,imagePosition:"left"},styleRole:"background",baseStyle:{top:0,bottom:0,side:0,contentWidth:0},style:{},elements:[
    {id:uid("el"),type:"group",role:"academySplitLayout",academySlot:"layout",style:{direction:"row",gap:0,justify:"start",alignItems:"stretch",width:100,firstColumn:56},baseResponsive:{tablet:{direction:"column",gap:0},mobile:{direction:"column",gap:0}},children:[
      academyImage(EDITORIAL_IMG.academy,"Jiu-jitsu academy training space",{height:720,aspectRatio:"4 / 3",focalY:48}),
      {id:uid("el"),type:"group",role:"academyCopy",academySlot:"copy",style:{direction:"column",gap:20,justify:"center",alignItems:"start",width:100,padding:72},baseResponsive:{tablet:{padding:52,gap:18},mobile:{padding:28,gap:14}},children:[
        academyEyebrow("HOW WE TRAIN",true),
        {id:uid("el"),type:"heading",role:"h2",text:"Serious about the training. Relaxed about everything else.",style:{maxWidth:650}},
        {id:uid("el"),type:"text",role:"body",text:"You should be able to train hard without feeling like you have to prove you belong in the room. We teach the details, give you time to practise them and build live rounds into the process as your confidence grows.",style:{maxWidth:590}},
        academyCta("Meet the coaches","#coaches","text",true)
      ]}
    ]}
  ]}}
};

const PROGRAMS_EDITORIAL={
  id:"bjj-programs-editorial-01",family:"services",name:"Programs 03 · Editorial",category:"Programs",
  description:"Large image-led program rows without cards",preview:"programs-image",
  meta:{stableId:"bjj-programs-editorial-01",version:1,category:"Programs",visualFamilies:["Editorial"],useCases:["program overview","beginners","adults","kids"],tags:["programs","editorial","images","no cards"],compositionRecipe:"Programs read as three large editorial stories rather than a grid of cards.",requiredSlots:["program image","program heading","program copy"],optionalSlots:["CTA","kicker"],imageRoles:["beginner training","adult training","kids training"],responsiveRecipe:"Each wide row stacks image above copy on tablet/mobile.",minimumBuilderVersion:"3.5",capabilityRequirements:["editorial rows","responsive split"],provenance:{status:"Runa original",approach:"editorial BJJ prototype",source:"Runa V3.5",licence:"Runa"},verificationStatus:"prototype"},
  create(){
    const row=(number,title,body,img,alt)=>({id:uid("el"),type:"group",role:"programEditorialRow",style:{direction:"row",gap:56,justify:"start",alignItems:"center",width:100,firstColumn:54},baseResponsive:{tablet:{direction:"column",gap:28},mobile:{direction:"column",gap:20}},children:[
      {id:uid("el"),type:"image",role:"visual",src:img,alt,imageShapeRole:"editorial",style:{frameMode:"ratio",aspectRatio:"4 / 3",height:500,focalX:50,focalY:45},motion:{reveal:"mask",hover:"zoom"}},
      {id:uid("el"),type:"group",role:"programCopy",style:{direction:"column",gap:14,justify:"center",alignItems:"start",width:100},children:[
        {id:uid("el"),type:"text",role:"small",text:number+"  /  PROGRAM",textStyleRole:"label",textRole:"accent2",style:{}},
        {id:uid("el"),type:"heading",role:"h2",text:title,style:{maxWidth:570}},
        {id:uid("el"),type:"text",role:"body",text:body,style:{maxWidth:560}},
        {id:uid("el"),type:"button",role:"cta",text:"Learn about this program",href:"#contact",buttonVariant:"text",style:{}}
      ]}
    ]});
    return{id:uid("sec"),type:"services",name:"Programs 03 · Editorial",styleRole:"background",baseStyle:{top:120,bottom:120,side:48,contentWidth:1440},baseResponsive:{tablet:{top:88,bottom:88,side:32},mobile:{top:68,bottom:68,side:20}},style:{},elements:[
      {id:uid("el"),type:"group",role:"programsEditorialWrap",style:{direction:"column",gap:96,justify:"start",alignItems:"stretch",width:100},baseResponsive:{tablet:{gap:72},mobile:{gap:56}},children:[
        {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:14,justify:"start",alignItems:"start",width:72},baseResponsive:{tablet:{width:86},mobile:{width:100}},children:[
          {id:uid("el"),type:"text",role:"kicker",text:"WAYS TO TRAIN",textRole:"accent1",style:{}},
          {id:uid("el"),type:"heading",role:"h2",text:"Start where you are. There’s a class for that.",textScale:{desktop:1.12,tablet:1,mobile:.88},style:{maxWidth:900}}
        ]},
        row("01","Beginners","A proper starting point for people with no grappling experience. Learn the positions, movements and basic decisions before worrying about winning rounds.",EDITORIAL_IMG.beginner,"Beginner jiu-jitsu class"),
        row("02","Adult Gi + No-Gi","Technical classes with enough structure to keep you improving and enough live training to make the technique honest.",EDITORIAL_IMG.adults,"Adult no-gi jiu-jitsu training"),
        row("03","Kids Jiu-Jitsu","Movement, confidence and problem solving taught through a sport that gives children something real to get better at.",EDITORIAL_IMG.kids,"Kids Brazilian jiu-jitsu class")
      ]}
    ]};
  }
};

const TRAINING_FULL_BLEED={
  id:"bjj-training-full-bleed-01",family:"academy",name:"Academy 05 · Full Image",category:"Academy",
  description:"Immersive full-width training photograph",preview:"academy-gallery",
  meta:{stableId:"bjj-training-full-bleed-01",version:1,category:"Academy",visualFamilies:["Editorial"],useCases:["visual break","training atmosphere"],tags:["full bleed","image","atmosphere"],compositionRecipe:"A single edge-to-edge photograph creates rhythm between text-heavy sections.",requiredSlots:["training image"],optionalSlots:[],imageRoles:["academy atmosphere"],responsiveRecipe:"Wide crop on desktop becomes a more compact cinematic crop on mobile.",minimumBuilderVersion:"3.5",capabilityRequirements:["zero-gutter section"],provenance:{status:"Runa original",approach:"editorial BJJ prototype",source:"Runa V3.5",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"about",name:"Academy 05 · Full Image",styleRole:"background",baseStyle:{top:0,bottom:0,side:0,contentWidth:0},style:{},elements:[
    {id:uid("el"),type:"image",role:"visual",src:EDITORIAL_IMG.room,alt:"Jiu-jitsu students training together",imageShapeRole:"bleed",style:{frameMode:"fixed",height:640,radius:"@square",focalX:50,focalY:50},baseResponsive:{tablet:{height:480},mobile:{height:340}},motion:{reveal:"mask"}}
  ]}}
};

const HEAD_COACH_EDITORIAL={
  id:"bjj-coaches-lead-team-01",family:"coaches",name:"Head Coach 02 · Full Feature",category:"Coaches",
  description:"Full-width coach profile with dominant portrait and open editorial copy",preview:"coach-feature",
  meta:{stableId:"bjj-coaches-lead-team-01",version:2,category:"Coaches",visualFamilies:["Editorial"],useCases:["head coach","instructor profile","academy leadership"],tags:["coach","portrait","editorial","feature"],compositionRecipe:"A full-width split feature uses an oversized portrait as structure and a spacious open copy column with large name typography.",requiredSlots:["coach portrait","name","role","bio"],optionalSlots:["quote","credential line"],imageRoles:["coach portrait"],responsiveRecipe:"Large split-screen desktop layout becomes a generous image-over-copy stack on tablet/mobile.",minimumBuilderVersion:"3.6",capabilityRequirements:["zero-gutter section","responsive split"],provenance:{status:"Runa original",approach:"editorial BJJ prototype",source:"Runa V3.6",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"team",name:"Head Coach 02 · Full Feature",anchor:"coaches",styleRole:"background",baseStyle:{top:0,bottom:0,side:0,contentWidth:0},style:{},elements:[
    {id:uid("el"),type:"group",role:"coachFeatureLayout",style:{direction:"row",gap:0,justify:"start",alignItems:"stretch",width:100,firstColumn:58},baseResponsive:{tablet:{direction:"column",gap:0},mobile:{direction:"column",gap:0}},children:[
      {id:uid("el"),type:"image",role:"visual",src:EDITORIAL_IMG.coach,alt:"Head coach portrait",imageShapeRole:"bleed",style:{frameMode:"fill",height:760,radius:"@square",focalX:50,focalY:38},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 10",height:460},mobile:{frameMode:"ratio",aspectRatio:"4 / 5",height:420}},motion:{reveal:"mask"}},
      {id:uid("el"),type:"group",role:"coachFeatureCopy",style:{direction:"column",gap:18,justify:"center",alignItems:"start",width:100,padding:84},baseResponsive:{tablet:{padding:54,gap:16},mobile:{padding:28,gap:14}},children:[
        {id:uid("el"),type:"text",role:"kicker",text:"HEAD COACH",textRole:"accent1",style:{}},
        {id:uid("el"),type:"heading",role:"display",text:"ALEX\nMORGAN",textStyleRole:"displayTight",textScale:{desktop:.94,tablet:.72,mobile:.52},style:{maxWidth:680},motion:{reveal:"mask"}},
        {id:uid("el"),type:"text",role:"lead",text:"BJJ Black Belt · Head Coach",textStyleRole:"leadEmphasis",textRole:"accent2",style:{maxWidth:520}},
        {id:uid("el"),type:"text",role:"body",text:"Alex teaches with a simple goal: make progress obvious. Classes are built around clear technical themes, deliberate repetition and enough live training to make sure the details still work when somebody resists.",style:{maxWidth:610}},
        {id:uid("el"),type:"text",role:"body",text:"Students who are completely new can settle in quickly, and experienced students still get the detail they need to keep building a sharper game.",style:{maxWidth:610}},
        {id:uid("el"),type:"heading",role:"h3",text:"18 YEARS ON THE MAT",textStyleRole:"emphasis",textRole:"main",style:{maxWidth:420}},
        {id:uid("el"),type:"text",role:"lead",text:"“Good coaching should make difficult things easier to understand.”",style:{maxWidth:560}}
      ]}
    ]}
  ]}}
};



const COACH_IMG={
  lead:"https://images.pexels.com/photos/8611971/pexels-photo-8611971.jpeg?auto=compress&cs=tinysrgb&w=1600",
  second:"https://images.pexels.com/photos/29956727/pexels-photo-29956727.jpeg?auto=compress&cs=tinysrgb&w=1400",
  third:"https://images.pexels.com/photos/38678667/pexels-photo-38678667.jpeg?auto=compress&cs=tinysrgb&w=1400",
  fourth:"https://images.pexels.com/photos/11391989/pexels-photo-11391989.jpeg?auto=compress&cs=tinysrgb&w=1400"
};
function coachCredentialList(items=[]){
  return{id:uid("el"),type:"group",role:"coachCredentials",style:{direction:"column",gap:7,justify:"start",alignItems:"start",width:100},children:items.map(text=>({id:uid("el"),type:"text",role:"coachCredential",text:"• "+text,textStyleRole:"small",textRole:"secondary",style:{maxWidth:520}}))};
}
function coachActions(cta="View profile →",social="Instagram ↗"){
  return{id:uid("el"),type:"group",role:"coachActions",style:{direction:"row",gap:16,justify:"start",alignItems:"center",width:100,stack:"never",wrap:"wrap"},children:[
    {id:uid("el"),type:"button",role:"coachCta",buttonVariant:"text",text:cta,href:"#contact",style:{}},
    {id:uid("el"),type:"button",role:"coachSocial",buttonVariant:"text",text:social,href:"#",style:{}}
  ]};
}
function coachCopy(name,rank,shortBio,longBio,credentials=[],opts={}){
  return{id:uid("el"),type:"group",role:"coachCopy",style:{direction:"column",gap:14,justify:"center",alignItems:"start",width:100},children:[
    opts.kicker?{id:uid("el"),type:"text",role:"coachKicker",text:opts.kicker,textStyleRole:"label",textRole:"accent1",style:{}}:null,
    {id:uid("el"),type:"heading",role:"coachName",text:name,textStyleRole:opts.display?"displayTight":"h2",textScale:opts.display?{desktop:.82,tablet:.66,mobile:.5}:undefined,style:{maxWidth:720}},
    {id:uid("el"),type:"text",role:"coachRank",text:rank,textStyleRole:"leadEmphasis",textRole:"accent2",style:{maxWidth:520}},
    {id:uid("el"),type:"text",role:"coachBio",text:shortBio,coachBioShort:shortBio,coachBioLong:longBio,style:{maxWidth:620}},
    coachCredentialList(credentials),
    coachActions()
  ].filter(Boolean)};
}
function coachFeatureItem(name,rank,shortBio,longBio,credentials,src,alt){
  return{id:uid("el"),type:"group",role:"coachItem",name,style:{direction:"row",gap:0,justify:"start",alignItems:"stretch",width:100,firstColumn:58},baseResponsive:{tablet:{direction:"column",gap:0},mobile:{direction:"column",gap:0}},children:[
    {id:uid("el"),type:"image",role:"coachImage",src,alt,imageShapeRole:"bleed",style:{frameMode:"fill",height:720,radius:"@square",focalX:50,focalY:34},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 10",height:440,order:0},mobile:{frameMode:"ratio",aspectRatio:"4 / 5",height:400,order:0}},motion:{reveal:"mask"}},
    {id:uid("el"),type:"group",role:"coachFeaturePanel",surfaceRole:"alternative",style:{direction:"column",gap:18,justify:"center",alignItems:"start",width:100,padding:70},baseResponsive:{tablet:{padding:48,order:1},mobile:{padding:28,gap:14,order:1}},children:[coachCopy(name,rank,shortBio,longBio,credentials,{kicker:"COACH PROFILE",display:true})]}
  ]};
}
function coachEditorialItem(name,rank,shortBio,longBio,credentials,src,alt){
  return{id:uid("el"),type:"group",role:"coachItem",name,style:{direction:"column",gap:24,justify:"start",alignItems:"stretch",width:100},children:[
    {id:uid("el"),type:"heading",role:"coachName",text:name.toUpperCase(),textStyleRole:"displayTight",textScale:{desktop:.9,tablet:.68,mobile:.48},style:{maxWidth:1180}},
    {id:uid("el"),type:"group",role:"coachEditorialBody",style:{direction:"row",gap:38,justify:"start",alignItems:"stretch",width:100,firstColumn:38},baseResponsive:{tablet:{gap:28},mobile:{direction:"column",gap:18}},children:[
      {id:uid("el"),type:"image",role:"coachImage",src,alt,style:{frameMode:"ratio",aspectRatio:"4 / 5",height:520,radius:"@square",focalX:50,focalY:34},baseResponsive:{mobile:{aspectRatio:"4 / 5",height:380}},motion:{reveal:"mask"}},
      {id:uid("el"),type:"group",role:"coachCopy",style:{direction:"column",gap:15,justify:"center",alignItems:"start",width:100},children:[
        {id:uid("el"),type:"text",role:"coachRank",text:rank,textStyleRole:"leadEmphasis",textRole:"accent2",style:{}},
        {id:uid("el"),type:"text",role:"coachBio",text:shortBio,coachBioShort:shortBio,coachBioLong:longBio,style:{maxWidth:640}},
        coachCredentialList(credentials),
        coachActions("Read coaching story →","Instagram ↗")
      ]}
    ]}
  ]};
}
function coachCardItem(name,rank,shortBio,longBio,credentials,src,alt){
  return{id:uid("el"),type:"group",role:"coachItem",name,cardPrimitive:true,surfaceRole:"alternative",style:{direction:"column",gap:0,justify:"start",alignItems:"stretch",width:100,overflow:"hidden"},children:[
    {id:uid("el"),type:"image",role:"coachImage",cardSlot:"media",cardHeaderMedia:true,src,alt,style:{frameMode:"ratio",aspectRatio:"4 / 5",height:360,focalX:50,focalY:34,radius:"@square",radiusTopLeft:"@rounded",radiusTopRight:"@rounded",radiusBottomLeft:"@square",radiusBottomRight:"@square"}},
    {id:uid("el"),type:"group",role:"coachCardContent",cardSlot:"content",style:{direction:"column",gap:18,justify:"space-between",alignItems:"stretch",width:100,padding:24},children:[
      {id:uid("el"),type:"group",role:"coachCardMain",cardSlot:"main",style:{direction:"column",gap:12,justify:"start",alignItems:"stretch",width:100},children:[
        {id:uid("el"),type:"group",role:"coachMeta",cardSlot:"meta",style:{direction:"row",gap:10,justify:"start",alignItems:"baseline",width:100,stack:"never"},children:[
          {id:uid("el"),type:"heading",role:"coachIndex",cardSlot:"index",text:"01",textStyleRole:"displayTight",textRole:"accent2",textScale:{desktop:.38,tablet:.34,mobile:.3},style:{maxWidth:80}},
          {id:uid("el"),type:"text",role:"coachRank",cardSlot:"label",text:rank,textStyleRole:"emphasis",textRole:"accent1",style:{maxWidth:260}}
        ]},
        {id:uid("el"),type:"heading",role:"coachName",cardSlot:"title",text:name,textStyleRole:"h3",style:{maxWidth:420}},
        {id:uid("el"),type:"text",role:"coachBio",cardSlot:"paragraph",text:shortBio,coachBioShort:shortBio,coachBioLong:longBio,style:{maxWidth:440}},
        {id:uid("el"),type:"group",role:"coachCredentialCards",cardSlot:"bullets",style:{direction:"column",gap:7,justify:"start",alignItems:"stretch",width:100},children:credentials.map(text=>({id:uid("el"),type:"text",role:"coachCredential",text:"• "+text,textStyleRole:"small",textRole:"secondary",style:{maxWidth:420}}))},
        {id:uid("el"),type:"button",role:"coachSocial",buttonVariant:"text",text:"Instagram ↗",href:"#",style:{}}
      ]},
      {id:uid("el"),type:"group",role:"coachCardFooter",cardSlot:"footer",style:{direction:"row",gap:10,justify:"start",alignItems:"center",width:100,stack:"never"},children:[
        {id:uid("el"),type:"button",role:"coachCta",cardSlot:"cta",buttonVariant:"text",text:"View profile →",href:"#contact",style:{}}
      ]}
    ]}
  ]};
}
function coachLeadTeamItem(name,rank,shortBio,longBio,credentials,src,alt){
  return{id:uid("el"),type:"group",role:"coachItem",name,surfaceRole:"alternative",style:{direction:"column",gap:0,justify:"start",alignItems:"stretch",width:100,overflow:"hidden",radius:"@square"},children:[
    {id:uid("el"),type:"image",role:"coachImage",src,alt,style:{frameMode:"ratio",aspectRatio:"4 / 5",height:360,radius:"@square",focalX:50,focalY:34}},
    {id:uid("el"),type:"group",role:"coachLeadCopy",style:{direction:"column",gap:12,justify:"center",alignItems:"start",width:100,padding:24},children:[
      {id:uid("el"),type:"text",role:"coachRank",text:rank,textStyleRole:"emphasis",textRole:"accent2",style:{}},
      {id:uid("el"),type:"heading",role:"coachName",text:name,textStyleRole:"h3",style:{}},
      {id:uid("el"),type:"text",role:"coachBio",text:shortBio,coachBioShort:shortBio,coachBioLong:longBio,style:{}},
      coachCredentialList(credentials),coachActions()
    ]}
  ]};
}
function coachRosterItem(name,rank,shortBio,longBio,credentials,src,alt){
  return{id:uid("el"),type:"group",role:"coachItem",name,style:{direction:"row",gap:16,justify:"start",alignItems:"center",width:100,firstColumn:28},baseResponsive:{mobile:{gap:14}},children:[
    {id:uid("el"),type:"image",role:"coachImage",src,alt,style:{frameMode:"ratio",aspectRatio:"1 / 1",height:120,radius:"@square",focalX:50,focalY:32}},
    {id:uid("el"),type:"group",role:"coachRosterCopy",style:{direction:"column",gap:6,justify:"center",alignItems:"start",width:100},children:[
      {id:uid("el"),type:"heading",role:"coachName",text:name,textStyleRole:"h4",style:{}},
      {id:uid("el"),type:"text",role:"coachRank",text:rank,textStyleRole:"emphasis",textRole:"accent2",style:{}},
      {id:uid("el"),type:"text",role:"coachBio",text:shortBio,coachBioShort:shortBio,coachBioLong:longBio,textStyleRole:"small",style:{}},
      coachCredentialList(credentials),coachActions()
    ]}
  ]};
}
function coachCollection(layout,items,config={},style={},responsive={}){
  return{id:uid("el"),type:"group",role:"coachCollection",name:"Coach collection",coachCollection:true,coachLayout:layout,coachConfig:config,style:{direction:"column",gap:28,justify:"start",alignItems:"stretch",width:100,...style},baseResponsive:responsive,children:items};
}
function coachIntro(title,body){return{id:uid("el"),type:"group",role:"coachIntro",style:{direction:"row",gap:28,justify:"space-between",alignItems:"end",width:100,firstColumn:62},baseResponsive:{tablet:{direction:"column",gap:10,alignItems:"start"},mobile:{direction:"column",gap:8}},children:[
  {id:uid("el"),type:"heading",role:"h2",text:title,style:{maxWidth:820}},
  {id:uid("el"),type:"text",role:"body",text:body,style:{maxWidth:500}}
]};}
const COACH_DATA=[
  ["Alex Morgan","Head Coach · Black Belt","Technical coaching built around clear decisions, strong fundamentals and enough live work to make the details stick.","Alex has spent years coaching students from their first class through advanced training and competition. The focus is on making difficult positions understandable, building repeatable habits and giving every student a clear idea of what to work on next.",["BJJ Black Belt","18 years training","Adult & competition coaching"],COACH_IMG.lead,"Head coach portrait"],
  ["Jamie Lee","Coach · Brown Belt","A detail-focused coach who helps newer students settle in and experienced students sharpen the small things.","Jamie works across fundamentals and intermediate classes, with an emphasis on clean movement, positional awareness and helping students connect individual techniques into a coherent game.",["BJJ Brown Belt","Fundamentals coach","Gi & no-gi"],COACH_IMG.second,"Brazilian Jiu-Jitsu coach portrait"],
  ["Chris Taylor","Kids Coach · Purple Belt","Structured, patient coaching that gives younger students room to learn, move and build confidence.","Chris leads the kids programme with clear expectations, playful problem solving and age-appropriate technical work. The goal is to make classes engaging without losing the discipline that makes training valuable.",["BJJ Purple Belt","Kids programme lead","Youth coaching"],COACH_IMG.third,"Kids jiu-jitsu coach portrait"],
  ["Maya Chen","No-Gi Coach · Purple Belt","Direct, practical coaching for students who want to build a reliable no-gi game.","Maya focuses on wrestling transitions, positional control and submission chains that hold up in live rounds. Classes are structured around a clear theme so students can connect the session from drilling through sparring.",["BJJ Purple Belt","No-gi coach","Wrestling integration"],COACH_IMG.fourth,"No-gi coach portrait"]
];

const COACHES_FULL_FEATURE={
  id:"bjj-coaches-full-feature-01",family:"coaches",name:"Coaches 01 · Full Feature",category:"Coaches",description:"Large edge-to-edge coach profile for a head coach or small team",preview:"coach-feature",
  meta:{stableId:"bjj-coaches-full-feature-01",version:1,category:"Coaches",visualFamilies:["Editorial"],useCases:["head coach","founder","small coaching team"],tags:["coaches","feature","portrait","editorial"],compositionRecipe:"Large full-width portrait-and-story profiles stack vertically when more coaches are added.",requiredSlots:["coach image","name","rank","bio"],optionalSlots:["credentials","CTA","social link"],imageRoles:["coach portrait"],responsiveRecipe:"Split feature stacks image above copy on tablet and mobile.",minimumBuilderVersion:"3.13",capabilityRequirements:["repeatable coach collection"],provenance:{status:"Runa original",approach:"modular coach family",source:"Runa V3.13",licence:"Runa"},verificationStatus:"prototype"},
  create(){const d=COACH_DATA[0];return{id:uid("sec"),type:"team",name:"Coaches 01 · Full Feature",anchor:"coaches",styleRole:"background",baseStyle:{top:0,bottom:0,side:0,contentWidth:0},style:{},elements:[coachCollection("fullFeature",[coachFeatureItem(...d)],{intro:false,image:true,rank:true,bioMode:"long",credentials:true,cta:"text",social:false})]}}
};
const COACHES_EDITORIAL_PROFILE={
  id:"bjj-coaches-editorial-profile-01",family:"coaches",name:"Coaches 02 · Editorial Profile",category:"Coaches",description:"Typography-led coach story with contained portrait and open editorial copy",preview:"coach-feature",
  meta:{stableId:"bjj-coaches-editorial-profile-01",version:1,category:"Coaches",visualFamilies:["Editorial"],useCases:["head coach","coach story","academy leadership"],tags:["coaches","typography","profile","story"],compositionRecipe:"Oversized coach name leads into a contained portrait and narrative column.",requiredSlots:["coach name","portrait","bio"],optionalSlots:["rank","credentials","CTA","social"],imageRoles:["coach portrait"],responsiveRecipe:"Editorial split stacks on mobile while retaining strong name hierarchy.",minimumBuilderVersion:"3.13",capabilityRequirements:["repeatable coach collection"],provenance:{status:"Runa original",approach:"modular coach family",source:"Runa V3.13",licence:"Runa"},verificationStatus:"prototype"},
  create(){const d=COACH_DATA[0];return{id:uid("sec"),type:"team",name:"Coaches 02 · Editorial Profile",anchor:"coaches",styleRole:"background",baseStyle:{top:56,bottom:56,side:48,contentWidth:1440},baseResponsive:{tablet:{top:48,bottom:48,side:32},mobile:{top:38,bottom:38,side:20}},style:{},elements:[coachCollection("editorialProfile",[coachEditorialItem(...d)],{intro:false,image:true,rank:true,bioMode:"long",credentials:true,cta:"none",social:true},{gap:52})]}}
};
const COACHES_CARDS={
  id:"bjj-coaches-cards-01",family:"coaches",name:"Coaches 03 · Coach Cards",category:"Coaches",description:"Reusable card-based coaching team overview",preview:"coaches-grid",
  meta:{stableId:"bjj-coaches-cards-01",version:1,category:"Coaches",visualFamilies:["Editorial","Commercial"],useCases:["coaching team","multiple instructors"],tags:["coaches","cards","team","repeatable"],compositionRecipe:"Equal coach cards use the shared Card primitive for image, hierarchy and interaction controls.",requiredSlots:["repeatable coach items"],optionalSlots:["credentials","social links"],imageRoles:["coach portraits"],responsiveRecipe:"Three-column desktop grid becomes two columns and then one.",minimumBuilderVersion:"3.13",capabilityRequirements:["repeatable coach collection","card primitive"],provenance:{status:"Runa original",approach:"modular coach family",source:"Runa V3.13",licence:"Runa"},verificationStatus:"prototype"},
  create(){const items=COACH_DATA.slice(0,3).map(d=>coachCardItem(...d));const c=coachCollection("cards",items,{intro:true,credentials:false,social:false},{direction:"grid",columns:3,gap:22},{tablet:{columns:2,gap:18},mobile:{direction:"column",gap:16}});c.cardCollection=true;c.cardPreset="imageOverview";c.cardConfig={preset:"imageOverview",media:"imageLed",topDetail:"label",body:"paragraph",cta:"none",title:"strong",alignment:"left",surface:"alternative",border:"none",corners:"square",entrance:"rise",hover:"liftZoom"};return{id:uid("sec"),type:"team",name:"Coaches 03 · Coach Cards",anchor:"coaches",styleRole:"background",baseStyle:{top:52,bottom:52,side:48,contentWidth:1440},baseResponsive:{tablet:{top:44,bottom:44,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[{id:uid("el"),type:"group",role:"coachesWrap",style:{direction:"column",gap:30,justify:"start",alignItems:"stretch",width:100},children:[coachIntro("Meet the people on the mat.","Different coaches bring different strengths, but the standard should feel consistent across every class."),c]}]}}
};
const COACHES_LEAD_TEAM={
  id:"bjj-coaches-lead-team-01",family:"coaches",name:"Coaches 04 · Lead Coach + Team",category:"Coaches",description:"One featured head coach with a compact supporting team",preview:"coaches-grid",
  meta:{stableId:"bjj-coaches-lead-team-01",version:1,category:"Coaches",visualFamilies:["Editorial"],useCases:["head coach plus instructors","academy team"],tags:["coaches","featured","team","hierarchy"],compositionRecipe:"The first coach receives a full-width feature treatment while the remaining team sits in a compact grid beneath.",requiredSlots:["featured coach","secondary coaches"],optionalSlots:["bio","credentials","CTA","social"],imageRoles:["coach portraits"],responsiveRecipe:"Featured coach stacks on mobile; supporting coaches form a responsive grid.",minimumBuilderVersion:"3.13",capabilityRequirements:["repeatable coach collection","featured item"],provenance:{status:"Runa original",approach:"modular coach family",source:"Runa V3.13",licence:"Runa"},verificationStatus:"prototype"},
  create(){const items=COACH_DATA.map(d=>coachLeadTeamItem(...d));return{id:uid("sec"),type:"team",name:"Coaches 04 · Lead Coach + Team",anchor:"coaches",styleRole:"background",baseStyle:{top:52,bottom:52,side:48,contentWidth:1440},baseResponsive:{tablet:{top:44,bottom:44,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[{id:uid("el"),type:"group",role:"coachesWrap",style:{direction:"column",gap:30,justify:"start",alignItems:"stretch",width:100},children:[coachIntro("A clear coaching hierarchy without hiding the team.","Lead with the head coach, then let visitors understand who else they will actually train with."),coachCollection("leadTeam",items,{intro:true,image:true,rank:true,bioMode:"short",credentials:false,cta:"none",social:false},{direction:"grid",columns:3,gap:20},{tablet:{columns:2,gap:18},mobile:{direction:"column",gap:16}})]}]}}
};
const COACHES_MINIMAL_ROSTER={
  id:"bjj-coaches-minimal-roster-01",family:"coaches",name:"Coaches 05 · Minimal Roster",category:"Coaches",description:"Compact coach roster for larger instructor teams",preview:"coaches-grid",
  meta:{stableId:"bjj-coaches-minimal-roster-01",version:1,category:"Coaches",visualFamilies:["Clean","Editorial"],useCases:["large coaching team","assistant coaches","compact roster"],tags:["coaches","roster","compact","team"],compositionRecipe:"Small portraits and concise identity information let a larger coaching team fit into one compact section.",requiredSlots:["coach name","rank"],optionalSlots:["portrait","bio","credentials","social"],imageRoles:["coach portraits"],responsiveRecipe:"Four-column roster becomes two columns and then one.",minimumBuilderVersion:"3.13",capabilityRequirements:["repeatable coach collection"],provenance:{status:"Runa original",approach:"modular coach family",source:"Runa V3.13",licence:"Runa"},verificationStatus:"prototype"},
  create(){const items=COACH_DATA.map(d=>coachRosterItem(...d));return{id:uid("sec"),type:"team",name:"Coaches 05 · Minimal Roster",anchor:"coaches",styleRole:"background",baseStyle:{top:48,bottom:48,side:48,contentWidth:1440},baseResponsive:{tablet:{top:42,bottom:42,side:32},mobile:{top:34,bottom:34,side:20}},style:{},elements:[{id:uid("el"),type:"group",role:"coachesWrap",style:{direction:"column",gap:26,justify:"start",alignItems:"stretch",width:100},children:[coachIntro("Your coaching team.","A compact roster works best when visitors need to see the whole team without turning the section into half the page."),coachCollection("minimalRoster",items,{intro:true,image:true,rank:true,bioMode:"none",credentials:false,cta:"none",social:false},{direction:"grid",columns:2,gap:22},{tablet:{columns:2,gap:18},mobile:{direction:"column",gap:14}})]}]}}
};

const TIMETABLE_EDITORIAL={
  id:"bjj-timetable-editorial-01",family:"timetable",name:"Timetable 02 · Flow",category:"Timetable",
  description:"Open weekly schedule without timetable cards",preview:"timetable-grid",
  meta:{stableId:"bjj-timetable-editorial-01",version:1,category:"Timetable",visualFamilies:["Editorial"],useCases:["class schedule"],tags:["timetable","schedule","flow","no cards"],compositionRecipe:"A dark full-width anchor section using open columns instead of boxed timetable cards.",requiredSlots:["days","class times"],optionalSlots:["intro"],responsiveRecipe:"Four columns collapse to two and then one.",minimumBuilderVersion:"3.5",capabilityRequirements:["responsive grid"],provenance:{status:"Runa original",approach:"editorial BJJ prototype",source:"Runa V3.5",licence:"Runa"},verificationStatus:"prototype"},
  create(){
    const day=(name,classes)=>({id:uid("el"),type:"group",role:"scheduleDay",style:{direction:"column",gap:10,justify:"start",alignItems:"start",width:100,padding:0},children:[
      {id:uid("el"),type:"text",role:"small",text:name.toUpperCase(),textStyleRole:"label",textRole:"accent2",style:{}},
      ...classes.map(text=>({id:uid("el"),type:"text",role:"body",text,style:{}}))
    ]});
    return{id:uid("sec"),type:"timetable",name:"Timetable 02 · Flow",styleRole:"dark",baseStyle:{top:52,bottom:52,side:48,contentWidth:1440},baseResponsive:{tablet:{top:44,bottom:44,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
      {id:uid("el"),type:"group",role:"timetableEditorialWrap",style:{direction:"column",gap:54,justify:"start",alignItems:"stretch",width:100},baseResponsive:{tablet:{gap:42},mobile:{gap:34}},children:[
        {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:14,justify:"start",alignItems:"start",width:72},baseResponsive:{mobile:{width:100}},children:[
          {id:uid("el"),type:"text",role:"kicker",text:"TRAIN THROUGH THE WEEK",textRole:"accent1",style:{}},
          {id:uid("el"),type:"heading",role:"h2",text:"Make training part of the week, not an event you have to plan around.",style:{maxWidth:960}},
          {id:uid("el"),type:"text",role:"lead",text:"Morning, evening, gi and no-gi sessions across the week.",style:{maxWidth:660}}
        ]},
        {id:uid("el"),type:"group",role:"timetableFlowGrid",style:{direction:"grid",columns:4,gap:42,justify:"start",alignItems:"start",width:100,stack:"mobile"},baseResponsive:{tablet:{columns:2,gap:32},mobile:{gap:28}},children:[
          day("Monday",["6:30 AM · Fundamentals","6:00 PM · Beginners","7:00 PM · All Levels"]),
          day("Tuesday",["12:00 PM · Open Mat","6:00 PM · Kids BJJ","7:00 PM · No-Gi"]),
          day("Wednesday",["6:30 AM · Fundamentals","6:00 PM · Beginners","7:00 PM · All Levels"]),
          day("Thursday",["12:00 PM · Open Mat","6:00 PM · Kids BJJ","7:00 PM · No-Gi"]),
          day("Friday",["6:30 AM · Fundamentals","6:30 PM · All Levels"]),
          day("Saturday",["9:00 AM · Kids BJJ","10:00 AM · All Levels","11:30 AM · Open Mat"]),
          day("Sunday",["Open mat / academy events"])
        ]}
      ]}
    ]};
  }
};

const TRUST_STATEMENT={
  id:"bjj-trust-statement-01",family:"trust",name:"Trust 02 · Statement",category:"Trust",
  description:"Oversized testimonial statement without cards",preview:"trust-reviews",
  meta:{stableId:"bjj-trust-statement-01",version:1,category:"Trust",visualFamilies:["Editorial"],useCases:["testimonial","social proof"],tags:["quote","testimonial","statement"],compositionRecipe:"One confident testimonial is treated as editorial content rather than a review card grid.",requiredSlots:["quote","attribution"],optionalSlots:["rating"],responsiveRecipe:"Statement scale reduces while preserving a broad readable measure.",minimumBuilderVersion:"3.5",capabilityRequirements:["text scaling"],provenance:{status:"Runa original",approach:"editorial BJJ prototype",source:"Runa V3.5",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"trust",name:"Trust 02 · Statement",styleRole:"background",baseStyle:{top:64,bottom:64,side:48,contentWidth:1440},baseResponsive:{tablet:{top:52,bottom:52,side:32},mobile:{top:40,bottom:40,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"testimonialStatement",style:{direction:"column",gap:26,justify:"start",alignItems:"start",width:92},baseResponsive:{tablet:{width:100},mobile:{gap:20}},children:[
      {id:uid("el"),type:"text",role:"kicker",text:"FROM THE MAT",textRole:"accent1",style:{}},
      {id:uid("el"),type:"heading",role:"h2",text:"“I expected the training to be hard. I didn’t expect the room to feel this easy to walk into.”",textScale:{desktop:1.34,tablet:1.12,mobile:.84},style:{maxWidth:1180},motion:{reveal:"rise"}},
      {id:uid("el"),type:"text",role:"body",text:"— Sam · training 18 months",textRole:"secondary",style:{}}
    ]}
  ]}}
};

const LOCATION_EDITORIAL={
  id:"bjj-location-editorial-01",family:"location",name:"Location 02 · Full Split",category:"Location",
  description:"Full-width image and visit information",preview:"location-split",
  meta:{stableId:"bjj-location-editorial-01",version:1,category:"Location",visualFamilies:["Editorial"],useCases:["location","contact","final conversion"],tags:["location","contact","split screen"],compositionRecipe:"Contact details and an academy/environment image share the entire width without a card container.",requiredSlots:["location image","address","CTA"],optionalSlots:["practical details"],imageRoles:["academy environment"],responsiveRecipe:"Image-over-copy stack on smaller screens.",minimumBuilderVersion:"3.5",capabilityRequirements:["zero-gutter section","responsive split"],provenance:{status:"Runa original",approach:"editorial BJJ prototype",source:"Runa V3.5",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"location",name:"Location 02 · Full Split",anchor:"contact",styleRole:"alternative",baseStyle:{top:0,bottom:0,side:0,contentWidth:0},style:{},elements:[
    {id:uid("el"),type:"group",role:"contactEditorialSplit",style:{direction:"row",gap:0,justify:"start",alignItems:"stretch",width:100,firstColumn:54},baseResponsive:{tablet:{direction:"column",gap:0},mobile:{direction:"column",gap:0}},children:[
      {id:uid("el"),type:"image",role:"visual",src:EDITORIAL_IMG.contact,alt:"Academy training environment",imageShapeRole:"bleed",style:{frameMode:"fill",height:620,radius:"@square",focalX:50,focalY:50},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 9",height:420},mobile:{frameMode:"ratio",aspectRatio:"4 / 3",height:320}}},
      {id:uid("el"),type:"group",role:"locationCopy",style:{direction:"column",gap:18,justify:"center",alignItems:"start",width:100,padding:72},baseResponsive:{tablet:{padding:52},mobile:{padding:28,gap:14}},children:[
        {id:uid("el"),type:"text",role:"kicker",text:"COME SEE THE ROOM",textRole:"accent1",style:{}},
        {id:uid("el"),type:"heading",role:"h2",text:"Your first class can just be your first class.",style:{maxWidth:650}},
        {id:uid("el"),type:"text",role:"lead",text:"APEX JIU-JITSU · 24 Example Street · Penang",textStyleRole:"leadEmphasis",style:{maxWidth:580}},
        {id:uid("el"),type:"text",role:"body",text:"Message us before you come in and we’ll tell you exactly what to bring, which class to attend and what to expect when you arrive.",style:{maxWidth:570}},
        {id:uid("el"),type:"button",role:"cta",text:"Book a trial class",href:"#",style:{}}
      ]}
    ]}
  ]}}
};

const FOOTER_EDITORIAL={
  id:"bjj-footer-editorial-01",family:"footer",name:"Footer 02 · Editorial",category:"Footer",
  description:"Open site-wide footer with large brand statement",preview:"footer-clean",
  meta:{stableId:"bjj-footer-editorial-01",version:1,category:"Footer",visualFamilies:["Editorial"],useCases:["BJJ academy footer"],tags:["footer","editorial","brand"],compositionRecipe:"A sparse dark footer closes the page with a larger brand presence and a small practical link row.",requiredSlots:["brand","links"],optionalSlots:["tagline"],responsiveRecipe:"Stacks brand and links on mobile.",minimumBuilderVersion:"3.5",capabilityRequirements:[],provenance:{status:"Runa original",approach:"editorial BJJ prototype",source:"Runa V3.5",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"footer",name:"Footer 02 · Editorial",styleRole:"dark",baseStyle:{top:72,bottom:52,side:48,contentWidth:1440},baseResponsive:{tablet:{top:58,bottom:44,side:32},mobile:{top:44,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"footerEditorialWrap",style:{direction:"column",gap:42,justify:"start",alignItems:"stretch",width:100},baseResponsive:{mobile:{gap:30}},children:[
      {id:uid("el"),type:"heading",role:"h2",text:"APEX JIU-JITSU",textScale:{desktop:1.18,tablet:1,mobile:.78},style:{maxWidth:1000}},
      {id:uid("el"),type:"group",role:"footerLayout",style:{direction:"row",gap:30,justify:"space-between",alignItems:"end",width:100,stack:"mobile"},baseResponsive:{mobile:{gap:22,alignItems:"start"}},children:[
        {id:uid("el"),type:"text",role:"body",text:"Technical training. Good people. A clear place to start.",style:{maxWidth:520}},
        {id:uid("el"),type:"group",role:"footerLinks",style:{direction:"row",gap:24,justify:"end",alignItems:"center",width:42},baseResponsive:{mobile:{width:100,justify:"start",gap:18}},children:[
          {id:uid("el"),type:"text",role:"navlink",text:"Programs",style:{}},{id:uid("el"),type:"text",role:"navlink",text:"Coaches",style:{}},{id:uid("el"),type:"text",role:"navlink",text:"Timetable",style:{}}
        ]}
      ]}
    ]}
  ]}}
};


const HERO_SPLIT_EDITORIAL={
  id:"bjj-hero-split-editorial-01",family:"hero",name:"Hero 02 · Split Editorial",category:"Hero",
  description:"Large open copy paired with a full-height photographic split",preview:"hero-split",
  meta:{stableId:"bjj-hero-split-editorial-01",version:1,category:"Hero",visualFamilies:["Editorial"],useCases:["academy homepage","BJJ landing page"],tags:["hero","split","photography","editorial"],compositionRecipe:"A spacious copy panel and edge-to-edge portrait image share the viewport without a boxed container.",requiredSlots:["headline","supporting copy","hero image","CTA"],optionalSlots:["kicker"],imageRoles:["hero training image"],responsiveRecipe:"Desktop split hero becomes image-under-copy on smaller screens.",minimumBuilderVersion:"3.6",capabilityRequirements:["zero-gutter section","responsive split"],provenance:{status:"Runa original",approach:"editorial BJJ prototype",source:"Runa V3.6",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"hero",name:"Hero 02 · Split Editorial",styleRole:"background",baseStyle:{top:0,bottom:0,side:0,contentWidth:0,minHeight:0},style:{},elements:[
    {id:uid("el"),type:"group",role:"heroSplitLayout",style:{direction:"row",gap:0,justify:"start",alignItems:"stretch",width:100,firstColumn:44},baseResponsive:{tablet:{direction:"column",gap:0},mobile:{direction:"column",gap:0}},children:[
      {id:uid("el"),type:"group",role:"heroSplitCopy",style:{direction:"column",gap:18,justify:"center",alignItems:"start",width:100,padding:84},baseResponsive:{tablet:{padding:56,gap:16},mobile:{padding:28,gap:14}},children:[
        {id:uid("el"),type:"heading",role:"display",text:"START WELL.\nKEEP GOING.",textStyleRole:"displayTight",textScale:{desktop:.92,tablet:.72,mobile:.5},style:{maxWidth:680}},
        {id:uid("el"),type:"text",role:"lead",text:"Beginner-friendly classes, technical coaching and a room that rewards consistency.",style:{maxWidth:560}},
        makeHeroActions("two","Book a trial class","#contact","Beginner classes","#programs","start")
      ]},
      {id:uid("el"),type:"image",role:"visual",src:EDITORIAL_IMG.hero,alt:"Brazilian Jiu-Jitsu training session",imageShapeRole:"bleed",style:{frameMode:"fill",height:760,radius:"@square",focalX:58,focalY:42},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 10",height:460},mobile:{frameMode:"ratio",aspectRatio:"4 / 5",height:420}}}
    ]}
  ]}}
};



const HERO_TYPO_STATEMENT={
  id:"bjj-hero-typo-statement-01",family:"hero",name:"Hero 03 · Typographic Statement",category:"Hero",
  description:"Big typographic opening with a restrained supporting image",preview:"hero-minimal",
  meta:{stableId:"bjj-hero-typo-statement-01",version:1,category:"Hero",visualFamilies:["Editorial"],useCases:["academy homepage","campaign landing page"],tags:["hero","typography","statement","minimal"],compositionRecipe:"Large editorial typography leads the section, with supporting copy and CTA above a restrained panoramic image.",requiredSlots:["headline","supporting copy","CTA","image"],optionalSlots:[],imageRoles:["supporting training image"],responsiveRecipe:"Large type remains the focus while the supporting image condenses below on smaller screens.",minimumBuilderVersion:"3.7.1",capabilityRequirements:["responsive image","display typography"],provenance:{status:"Runa original",approach:"editorial hero expansion",source:"Runa V3.7.1",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"hero",name:"Hero 03 · Typographic Statement",styleRole:"background",baseStyle:{top:56,bottom:56,side:0,contentWidth:0},baseResponsive:{tablet:{top:48,bottom:48,side:0},mobile:{top:36,bottom:36,side:0}},style:{},elements:[
    {id:uid("el"),type:"group",role:"heroTypoWrap",style:{direction:"column",gap:28,justify:"start",alignItems:"stretch",width:100},baseResponsive:{tablet:{gap:24},mobile:{gap:18}},children:[
      {id:uid("el"),type:"group",role:"heroTypoTop",containedModule:true,style:{direction:"row",gap:42,justify:"space-between",alignItems:"end",width:100,firstColumn:62},baseResponsive:{tablet:{gap:28},mobile:{direction:"column",gap:18,alignItems:"start"}},children:[
        {id:uid("el"),type:"heading",role:"display",text:"START TRAINING.\nSTAY FOR THE LONG HAUL.",textStyleRole:"displayTight",textScale:{desktop:.88,tablet:.68,mobile:.5},style:{maxWidth:900},motion:{reveal:"mask"}},
        {id:uid("el"),type:"group",role:"heroTypoSupport",style:{direction:"column",gap:14,justify:"end",alignItems:"start",width:100},children:[
          {id:uid("el"),type:"text",role:"lead",text:"A serious academy for people who want clear coaching, good training partners and a place they can grow into.",style:{maxWidth:440}},
          makeHeroActions("links","View timetable","#timetable","How beginners start","#programs","start")
        ]}
      ]},
      {id:uid("el"),type:"image",role:"visual",src:EDITORIAL_IMG.room,alt:"Training room during class",heroWideMedia:true,mediaWidth:"full",style:{frameMode:"ratio",aspectRatio:"21 / 9",height:340,focalX:50,focalY:48,radius:"@square"},baseResponsive:{tablet:{aspectRatio:"16 / 8",height:280},mobile:{aspectRatio:"4 / 3",height:220}},motion:{reveal:"mask"}}
    ]}
  ]}}
};

const HERO_CENTERED_IMAGE={
  id:"bjj-hero-centered-image-01",family:"hero",name:"Hero 04 · Centered Statement",category:"Hero",
  description:"Centered statement hero followed by a wide full-width training image",preview:"hero-centred",
  meta:{stableId:"bjj-hero-centered-image-01",version:1,category:"Hero",visualFamilies:["Editorial"],useCases:["academy homepage","minimal landing page"],tags:["hero","centered","statement","image"],compositionRecipe:"A centred hero statement sits above a wide panoramic image, creating a calmer opening rhythm.",requiredSlots:["headline","supporting copy","CTA","wide image"],optionalSlots:["secondary CTA"],imageRoles:["wide training image"],responsiveRecipe:"Centred copy remains broad on desktop and narrows progressively while the image keeps a calm panorama feel.",minimumBuilderVersion:"3.7.1",capabilityRequirements:["responsive image"],provenance:{status:"Runa original",approach:"editorial hero expansion",source:"Runa V3.7.1",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"hero",name:"Hero 04 · Centered Statement",styleRole:"background",baseStyle:{top:64,bottom:48,side:0,contentWidth:0},baseResponsive:{tablet:{top:52,bottom:44,side:0},mobile:{top:40,bottom:32,side:0}},style:{},elements:[
    {id:uid("el"),type:"group",role:"heroCenteredWrap",style:{direction:"column",gap:26,justify:"start",alignItems:"center",width:100},baseResponsive:{tablet:{gap:22},mobile:{gap:18}},children:[
      {id:uid("el"),type:"group",role:"heroCenteredCopy",containedModule:true,style:{direction:"column",gap:18,justify:"start",alignItems:"center",width:100},baseResponsive:{mobile:{gap:14}},children:[
        {id:uid("el"),type:"heading",role:"h1",text:"Good coaching. Hard rounds. A place to start properly.",textScale:{desktop:1.18,tablet:1,mobile:.78},style:{align:"center",maxWidth:980},motion:{reveal:"rise"}},
        {id:uid("el"),type:"text",role:"lead",text:"Learn the fundamentals, sharpen your game and train in a room that expects beginners instead of merely tolerating them.",style:{align:"center",maxWidth:720}},
        makeHeroActions("primaryText","Book a trial class","#contact","See programs","#programs","center")
      ]},
      {id:uid("el"),type:"image",role:"visual",src:EDITORIAL_IMG.room,alt:"Wide training image",imageShapeRole:"bleed",heroWideMedia:true,mediaWidth:"full",style:{frameMode:"ratio",aspectRatio:"16 / 7",height:420,focalX:50,focalY:42,radius:"@square"},baseResponsive:{tablet:{aspectRatio:"16 / 9",height:320},mobile:{aspectRatio:"4 / 3",height:240}},motion:{reveal:"mask"}}
    ]}
  ]}}
};

const HERO_ASYMMETRIC_EDITORIAL={
  id:"bjj-hero-asymmetric-editorial-01",family:"hero",name:"Hero 05 · Asymmetric Editorial",category:"Hero",
  description:"Asymmetric hero with offset copy and a tall photographic panel",preview:"hero-editorial",
  meta:{stableId:"bjj-hero-asymmetric-editorial-01",version:1,category:"Hero",visualFamilies:["Editorial"],useCases:["academy homepage","brand-led opening"],tags:["hero","asymmetric","editorial","offset"],compositionRecipe:"An offset copy block, supporting note and a tall image panel create a more design-led, less conventional opening.",requiredSlots:["headline","supporting note","image","CTA"],optionalSlots:["eyebrow"],imageRoles:["hero portrait/action image"],responsiveRecipe:"Desktop uses an asymmetrical split; tablet/mobile simplify into a stack without losing the image-led feel.",minimumBuilderVersion:"3.7.1",capabilityRequirements:["responsive split","image focal point"],provenance:{status:"Runa original",approach:"editorial hero expansion",source:"Runa V3.7.1",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"hero",name:"Hero 05 · Asymmetric Editorial",styleRole:"background",baseStyle:{top:48,bottom:48,side:48,contentWidth:1440},baseResponsive:{tablet:{top:44,bottom:44,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"heroAsymmetricLayout",style:{direction:"row",gap:32,justify:"space-between",alignItems:"stretch",width:100,firstColumn:57},baseResponsive:{tablet:{direction:"column",gap:24},mobile:{direction:"column",gap:18}},children:[
      {id:uid("el"),type:"group",role:"heroAsymmetricCopy",style:{direction:"column",gap:18,justify:"space-between",alignItems:"start",width:100,paddingTop:24},baseResponsive:{mobile:{paddingTop:0,gap:16}},children:[
        {id:uid("el"),type:"heading",role:"display",text:"LEARN THE\nHARD THINGS\nPROPERLY.",textStyleRole:"displayTight",textScale:{desktop:.84,tablet:.68,mobile:.48},style:{maxWidth:760},motion:{reveal:"mask"}},
        {id:uid("el"),type:"group",role:"heroAsymmetricBottom",style:{direction:"row",gap:24,justify:"start",alignItems:"end",width:100,firstColumn:58},baseResponsive:{mobile:{direction:"column",gap:14,alignItems:"start"}},children:[
          {id:uid("el"),type:"text",role:"lead",text:"Small details, hard rounds and coaching that gives you something clear to work on next time you train.",style:{maxWidth:420}},
          makeHeroActions("primary","Start here","#contact","View timetable","#timetable","start")
        ]}
      ]},
      {id:uid("el"),type:"image",role:"visual",src:EDITORIAL_IMG.academy,alt:"Tall training image",imageShapeRole:"bleed",style:{frameMode:"fill",height:620,radius:"@square",focalX:50,focalY:46},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 10",height:360},mobile:{frameMode:"ratio",aspectRatio:"4 / 5",height:320}},motion:{reveal:"mask"}}
    ]}
  ]}}
};

const ACADEMY_VALUES_EDITORIAL={
  id:"bjj-academy-values-editorial-01",family:"academy",name:"Academy 03 · Values Flow",category:"Academy",
  description:"Open values grid for the principles that shape the room",preview:"about-split",
  meta:{stableId:"bjj-academy-values-editorial-01",version:2,category:"Academy",visualFamilies:["Editorial"],useCases:["academy values","culture","what to expect"],tags:["academy","values","editorial","columns"],compositionRecipe:"A concise introduction leads into three open principles with no card chrome.",requiredSlots:["section heading","value titles","value copy"],optionalSlots:["eyebrow","CTA"],responsiveRecipe:"Three columns on desktop collapse to an open stack on mobile.",minimumBuilderVersion:"3.10",capabilityRequirements:["academy modules","responsive grid"],provenance:{status:"Runa original",approach:"modular academy family",source:"Runa V3.10",licence:"Runa"},verificationStatus:"prototype"},
  create(){
    const pillar=(number,title,body)=>({id:uid("el"),type:"group",role:"valueColumn",style:{direction:"column",gap:12,justify:"start",alignItems:"start",width:100,padding:0},children:[
      {id:uid("el"),type:"text",role:"small",text:number,textStyleRole:"label",textRole:"accent2",style:{}},
      {id:uid("el"),type:"heading",role:"h3",text:title,textScale:{desktop:.9,tablet:.84,mobile:.78},style:{maxWidth:380}},
      {id:uid("el"),type:"text",role:"body",text:body,style:{maxWidth:390}}
    ]});
    return{id:uid("sec"),type:"about",name:"Academy 03 · Values Flow",academyModule:true,academyCapabilities:{eyebrow:true,cta:true},academyConfig:{eyebrow:false,cta:"none"},styleRole:"background",baseStyle:{top:52,bottom:52,side:48,contentWidth:1440},baseResponsive:{tablet:{top:44,bottom:44,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
      {id:uid("el"),type:"group",role:"academyValuesWrap",style:{direction:"column",gap:42,justify:"start",alignItems:"stretch",width:100},baseResponsive:{tablet:{gap:34},mobile:{gap:28}},children:[
        {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:14,justify:"start",alignItems:"start",width:70},baseResponsive:{tablet:{width:84},mobile:{width:100}},children:[
          academyEyebrow("WHAT THE ROOM IS BUILT AROUND",false),
          {id:uid("el"),type:"heading",role:"h2",text:"The culture should make good training easier to sustain.",style:{maxWidth:900}},
          {id:uid("el"),type:"text",role:"lead",text:"A few principles matter more than a long list of promises.",textRole:"secondary",style:{maxWidth:620}}
        ]},
        {id:uid("el"),type:"group",role:"academyValuesGrid",style:{direction:"grid",columns:3,gap:36,justify:"start",alignItems:"start",width:100,stack:"mobile"},baseResponsive:{tablet:{columns:2,gap:28},mobile:{gap:24}},children:[
          pillar("01","Clear coaching","Every class should give you something specific to understand, practise and take into live rounds."),
          pillar("02","A room people settle into","Training can be demanding without the culture being intimidating. Beginners should know they belong there."),
          pillar("03","Progress that lasts","The aim is not quick hype. It is building a game and a training habit that still works years from now.")
        ]},
        academyCta("See how we train","#programs","text",false)
      ]}
    ]};
  }
};

const ACADEMY_IMAGE_STORY={
  id:"bjj-academy-image-story-01",family:"academy",name:"Academy 04 · Image Story",category:"Academy",
  description:"Large academy photograph paired with a compact editorial story",preview:"academy-gallery",
  meta:{stableId:"bjj-academy-image-story-01",version:1,category:"Academy",visualFamilies:["Editorial"],useCases:["academy atmosphere","origin story","training culture"],tags:["academy","image-led","story","asymmetric"],compositionRecipe:"A generous photograph carries the atmosphere while a narrow story column gives the visitor only the context they need.",requiredSlots:["academy image","heading","story"],optionalSlots:["eyebrow","CTA"],imageRoles:["training atmosphere"],responsiveRecipe:"Asymmetric desktop split becomes image-first stack on tablet and mobile.",minimumBuilderVersion:"3.10",capabilityRequirements:["academy modules","responsive split"],provenance:{status:"Runa original",approach:"modular academy family",source:"Runa V3.10",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"about",name:"Academy 04 · Image Story",academyModule:true,academyCapabilities:{eyebrow:true,cta:true,image:true,imagePosition:true},academyImageShare:62,academyConfig:{eyebrow:false,cta:"text",image:true,imagePosition:"right"},styleRole:"background",baseStyle:{top:56,bottom:56,side:48,contentWidth:1440},baseResponsive:{tablet:{top:48,bottom:48,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"academySplitLayout",academySlot:"layout",style:{direction:"row",gap:40,justify:"space-between",alignItems:"stretch",width:100,firstColumn:38},baseResponsive:{tablet:{direction:"column",gap:26},mobile:{direction:"column",gap:20}},children:[
      {id:uid("el"),type:"group",role:"academyCopy",academySlot:"copy",style:{direction:"column",gap:18,justify:"center",alignItems:"start",width:100,padding:10},baseResponsive:{mobile:{padding:0,gap:14}},children:[
        academyEyebrow("OUR PLACE",false),
        {id:uid("el"),type:"heading",role:"h2",text:"A room built around the work, not the theatre around it.",style:{maxWidth:560}},
        {id:uid("el"),type:"text",role:"lead",text:"Good coaching, enough mat space to train properly and a culture that lets people concentrate on getting better.",style:{maxWidth:520}},
        {id:uid("el"),type:"text",role:"body",text:"The academy is deliberately straightforward. Turn up, learn the details, practise them with people who want you to improve, then come back and do it again.",textRole:"secondary",style:{maxWidth:520}},
        academyCta("See the timetable","#timetable","text",true)
      ]},
      academyImage(EDITORIAL_IMG.room,"Students training inside the academy",{height:650,aspectRatio:"4 / 3",focalY:48})
    ]}
  ]}}
};

const ACADEMY_STORY_PROOF={
  id:"bjj-academy-story-stats-01",family:"academy",name:"Academy 05 · Story + Proof",category:"Academy",
  description:"Academy story paired with a natural supporting quote rather than a statistics panel",preview:"about-split",
  meta:{stableId:"bjj-academy-story-stats-01",version:2,category:"Academy",visualFamilies:["Editorial","Commercial"],useCases:["academy story","social proof","established gym"],tags:["academy","story","quote","proof"],compositionRecipe:"A concise academy story sits beside an open pull quote, with a wide atmosphere image beneath for visual proof.",requiredSlots:["story","supporting quote"],optionalSlots:["eyebrow","CTA","image","supporting quote"],imageRoles:["academy atmosphere"],responsiveRecipe:"Story and quote sit side by side on desktop, stack naturally on mobile, followed by a wide image when enabled.",minimumBuilderVersion:"3.10",capabilityRequirements:["academy modules","responsive split"],provenance:{status:"Runa original",approach:"modular academy family",source:"Runa V3.10.1",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"about",name:"Academy 05 · Story + Proof",academyModule:true,academyCapabilities:{eyebrow:true,cta:true,image:true,support:true},academyConfig:{eyebrow:false,cta:"button",image:true,support:true},styleRole:"background",baseStyle:{top:56,bottom:56,side:48,contentWidth:1440},baseResponsive:{tablet:{top:48,bottom:48,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"academyProofWrap",style:{direction:"column",gap:34,justify:"start",alignItems:"stretch",width:100},baseResponsive:{mobile:{gap:24}},children:[
      {id:uid("el"),type:"group",role:"academyProofTop",style:{direction:"row",gap:56,justify:"space-between",alignItems:"end",width:100,firstColumn:58},baseResponsive:{tablet:{gap:38},mobile:{direction:"column",gap:28,alignItems:"start"}},children:[
        {id:uid("el"),type:"group",role:"academyCopy",academySlot:"copy",style:{direction:"column",gap:16,justify:"start",alignItems:"start",width:100},children:[
          academyEyebrow("THE ACADEMY",false),
          {id:uid("el"),type:"heading",role:"h2",text:"Built to be somewhere you can keep training.",style:{maxWidth:720}},
          {id:uid("el"),type:"text",role:"body",text:"The best academy is not the one with the longest list of claims. It is the one where the coaching is consistent, the room is healthy and people stay long enough to become genuinely good at jiu-jitsu.",style:{maxWidth:650}},
          academyCta("Start training","#contact","button",true)
        ]},
        {id:uid("el"),type:"group",role:"academySupport",academySlot:"support",style:{direction:"column",gap:14,justify:"end",alignItems:"start",width:100,paddingBottom:4},children:[
          {id:uid("el"),type:"text",role:"small",text:"FROM THE ROOM",textStyleRole:"label",textRole:"accent1",style:{}},
          {id:uid("el"),type:"heading",role:"h3",text:"“You notice the difference in the details — people know your name, coaches remember what you are working on, and nobody makes being new feel awkward.”",textScale:{desktop:.9,tablet:.84,mobile:.78},style:{maxWidth:520}},
          {id:uid("el"),type:"text",role:"small",text:"— Member since 2022",textRole:"secondary",style:{maxWidth:320}}
        ]}
      ]},
      {id:uid("el"),type:"image",role:"visual",academySlot:"image",src:EDITORIAL_IMG.academy,alt:"Academy training session",imageShapeRole:"bleed",style:{frameMode:"ratio",aspectRatio:"16 / 6",height:460,radius:"@square",focalX:50,focalY:50},baseResponsive:{tablet:{aspectRatio:"16 / 8",height:360},mobile:{aspectRatio:"4 / 3",height:280}},motion:{reveal:"mask"}}
    ]}
  ]}}
};

function programImage(src,alt,height=240,aspectRatio="4 / 3"){
  return{id:uid("el"),type:"image",role:"programImage",src,alt,style:{frameMode:"ratio",aspectRatio,height,focalX:50,focalY:42,radius:"@square"},baseResponsive:{mobile:{aspectRatio:"16 / 10",height:220}}};
}
function programCopy(title,label,body,cta="Explore program →"){
  return{id:uid("el"),type:"group",role:"programCopy",style:{direction:"column",gap:10,justify:"start",alignItems:"start",width:100},children:[
    {id:uid("el"),type:"text",role:"programLabel",text:label.toUpperCase(),textStyleRole:"label",textRole:"accent1",style:{}},
    {id:uid("el"),type:"heading",role:"programTitle",text:title,style:{maxWidth:620}},
    {id:uid("el"),type:"text",role:"programDescription",text:body,style:{maxWidth:620}},
    {id:uid("el"),type:"button",role:"programCta",buttonVariant:"text",text:cta,href:"#contact",style:{}}
  ]};
}
function programCollection(layout,children,style={},responsive={},cardConfig=null){
  return{id:uid("el"),type:"group",role:"programCollection",name:"Program collection",programLayout:layout,cardCollection:!!cardConfig,cardPreset:cardConfig?.preset||null,cardConfig:cardConfig?{...cardConfig}:null,style:{direction:"column",gap:24,justify:"start",alignItems:"stretch",width:100,...style},baseResponsive:responsive,children};
}
function programDenseItem(title,label,body,src,alt){
  return{id:uid("el"),type:"group",role:"programItem",name:title,style:{direction:"row",gap:28,justify:"start",alignItems:"center",width:100,firstColumn:26},baseResponsive:{tablet:{gap:22,firstColumn:34},mobile:{direction:"column",gap:16}},children:[
    programImage(src,alt,250),
    {id:uid("el"),type:"group",role:"programDenseCopy",style:{direction:"row",gap:28,justify:"space-between",alignItems:"start",width:100,firstColumn:48},baseResponsive:{tablet:{direction:"column",gap:10},mobile:{direction:"column",gap:10}},children:[
      {id:uid("el"),type:"group",role:"programDenseTitle",style:{direction:"column",gap:7,justify:"start",alignItems:"start",width:100},children:[
        {id:uid("el"),type:"group",role:"programMeta",style:{direction:"row",gap:8,justify:"start",alignItems:"center",width:100,stack:"never"},children:[
          {id:uid("el"),type:"text",role:"programIndex",text:"01",textStyleRole:"label",textRole:"accent2",style:{}},
          {id:uid("el"),type:"text",role:"programLabel",text:label.toUpperCase(),textStyleRole:"label",textRole:"accent1",style:{}}
        ]},
        {id:uid("el"),type:"heading",role:"programTitle",text:title,textScale:{desktop:.88,tablet:.82,mobile:.76},style:{maxWidth:520}}
      ]},
      {id:uid("el"),type:"group",role:"programDenseDetails",style:{direction:"column",gap:10,justify:"start",alignItems:"start",width:100},children:[
        {id:uid("el"),type:"text",role:"programDescription",text:body,style:{maxWidth:560}},
        {id:uid("el"),type:"button",role:"programCta",buttonVariant:"text",text:"Explore program →",href:"#contact",style:{}}
      ]}
    ]}
  ]};
}
function programIndexItem(title,label,body){
  return{id:uid("el"),type:"group",role:"programItem",name:title,style:{direction:"row",gap:28,justify:"space-between",alignItems:"start",width:100,firstColumn:54},baseResponsive:{mobile:{direction:"column",gap:10}},children:[
    {id:uid("el"),type:"group",role:"programIndexTitle",style:{direction:"row",gap:20,justify:"start",alignItems:"baseline",width:100,stack:"never"},children:[
      {id:uid("el"),type:"text",role:"programIndex",text:"01",textStyleRole:"label",textRole:"accent2",style:{}},
      {id:uid("el"),type:"heading",role:"programTitle",text:title,textScale:{desktop:1.05,tablet:.92,mobile:.78},style:{maxWidth:680}}
    ]},
    {id:uid("el"),type:"group",role:"programIndexDetails",style:{direction:"column",gap:8,justify:"start",alignItems:"start",width:100},children:[
      {id:uid("el"),type:"text",role:"programLabel",text:label.toUpperCase(),textStyleRole:"label",textRole:"accent1",style:{}},
      {id:uid("el"),type:"text",role:"programDescription",text:body,style:{maxWidth:520}},
      {id:uid("el"),type:"button",role:"programCta",buttonVariant:"text",text:"View program →",href:"#contact",style:{}}
    ]}
  ]};
}
function programStripItem(title,label,body,src,alt){
  return{id:uid("el"),type:"group",role:"programItem",name:title,style:{direction:"column",gap:14,justify:"start",alignItems:"stretch",width:100},children:[
    programImage(src,alt,390,"3 / 4"),
    {id:uid("el"),type:"group",role:"programStripCopy",style:{direction:"column",gap:8,justify:"start",alignItems:"start",width:100},children:[
      {id:uid("el"),type:"group",role:"programMeta",style:{direction:"row",gap:8,justify:"start",alignItems:"center",width:100,stack:"never"},children:[
        {id:uid("el"),type:"text",role:"programIndex",text:"01",textStyleRole:"label",textRole:"accent2",style:{}},
        {id:uid("el"),type:"text",role:"programLabel",text:label.toUpperCase(),textStyleRole:"label",textRole:"accent1",style:{}}
      ]},
      {id:uid("el"),type:"heading",role:"programTitle",text:title,textScale:{desktop:.82,tablet:.78,mobile:.74},style:{maxWidth:440}},
      {id:uid("el"),type:"text",role:"programDescription",text:body,style:{maxWidth:440}},
      {id:uid("el"),type:"button",role:"programCta",buttonVariant:"text",text:"Learn more →",href:"#contact",style:{}}
    ]}
  ]};
}
function programBullets(points){
  return{id:uid("el"),type:"group",role:"programBullets",cardSlot:"bullets",style:{direction:"column",gap:10,justify:"start",alignItems:"stretch",width:100},children:(points||[]).map(point=>({id:uid("el"),type:"group",role:"programBullet",style:{direction:"row",gap:10,justify:"start",alignItems:"start",width:100,stack:"never"},children:[
    {id:uid("el"),type:"text",role:"programBulletMark",text:"•",textStyleRole:"emphasis",textRole:"accent2",style:{maxWidth:12}},
    {id:uid("el"),type:"text",role:"programBulletText",text:point,style:{maxWidth:430}}
  ]}))};
}
function programCardItem(title,label,paragraph,points,src,alt,cta="Explore program →"){
  return{id:uid("el"),type:"group",role:"programItem",name:title,cardPrimitive:true,surfaceRole:"alternative",style:{direction:"column",gap:0,justify:"start",alignItems:"stretch",width:100,overflow:"hidden"},children:[
    {id:uid("el"),type:"image",role:"programImage",cardSlot:"media",cardHeaderMedia:true,src,alt,style:{frameMode:"ratio",aspectRatio:"4 / 3",height:280,focalX:50,focalY:42,radius:"@square",radiusTopLeft:"@rounded",radiusTopRight:"@rounded",radiusBottomLeft:"@square",radiusBottomRight:"@square"},baseResponsive:{mobile:{aspectRatio:"16 / 10",height:220}}},
    {id:uid("el"),type:"group",role:"programCardContent",cardSlot:"content",style:{direction:"column",gap:20,justify:"space-between",alignItems:"stretch",width:100,padding:26},baseResponsive:{tablet:{padding:24},mobile:{padding:20,gap:18}},children:[
      {id:uid("el"),type:"group",role:"programCardMain",cardSlot:"main",style:{direction:"column",gap:14,justify:"start",alignItems:"stretch",width:100},children:[
        {id:uid("el"),type:"group",role:"programMeta",cardSlot:"meta",style:{direction:"row",gap:12,justify:"start",alignItems:"baseline",width:100,stack:"never"},children:[
          {id:uid("el"),type:"heading",role:"programIndex",cardSlot:"index",text:"01",textStyleRole:"displayTight",textRole:"accent2",textScale:{desktop:.42,tablet:.38,mobile:.34},style:{maxWidth:100}},
          {id:uid("el"),type:"text",role:"programLabel",cardSlot:"label",text:label.toUpperCase(),textStyleRole:"emphasis",textRole:"accent1",style:{maxWidth:240}}
        ]},
        {id:uid("el"),type:"heading",role:"programTitle",cardSlot:"title",text:title,textStyleRole:"h3",textScale:{desktop:1.08,tablet:1,mobile:.94},style:{maxWidth:480}},
        {id:uid("el"),type:"text",role:"programDescription",cardSlot:"paragraph",text:paragraph,style:{maxWidth:480}},
        programBullets(points)
      ]},
      {id:uid("el"),type:"group",role:"programCardFooter",cardSlot:"footer",style:{direction:"row",gap:10,justify:"start",alignItems:"center",width:100,stack:"never"},children:[
        {id:uid("el"),type:"button",role:"programCta",cardSlot:"cta",buttonVariant:"text",text:cta,href:"#contact",style:{}}
      ]}
    ]}
  ]};
}
function programImageCardItem(title,label,body,src,alt,points=[]){
  return programCardItem(title,label,body,points.length?points:["Clear progression for your level","Coached technical training","Regular opportunities to practise"],src,alt,"Explore program →");
}
function programTextCardItem(title,label,body,points=[]){
  return programCardItem(title,label,body,points.length?points:["Clear focus and progression","Suitable for the intended student group","Simple route to the next step"],EDITORIAL_IMG.room,"Academy training session","Program details →");
}
function programHighlightCardItem(title,label,points,src,alt){
  const paragraph=Array.isArray(points)&&points.length?points.join(". ")+'.':'';
  return programCardItem(title,label,paragraph,points,src,alt,"Explore program →");
}
function programAlternatingItem(title,label,body,src,alt){
  return{id:uid("el"),type:"group",role:"programItem",name:title,style:{direction:"row",gap:36,justify:"start",alignItems:"center",width:100,firstColumn:46},baseResponsive:{tablet:{gap:28},mobile:{direction:"column",gap:16}},children:[
    programImage(src,alt,360,"5 / 4"),
    {id:uid("el"),type:"group",role:"programAltCopy",style:{direction:"column",gap:11,justify:"center",alignItems:"start",width:100},children:[
      {id:uid("el"),type:"group",role:"programMeta",style:{direction:"row",gap:8,justify:"start",alignItems:"center",width:100,stack:"never"},children:[
        {id:uid("el"),type:"text",role:"programIndex",text:"01",textStyleRole:"label",textRole:"accent2",style:{}},
        {id:uid("el"),type:"text",role:"programLabel",text:label.toUpperCase(),textStyleRole:"label",textRole:"accent1",style:{}}
      ]},
      {id:uid("el"),type:"heading",role:"programTitle",text:title,style:{maxWidth:620}},
      {id:uid("el"),type:"text",role:"programDescription",text:body,style:{maxWidth:580}},
      {id:uid("el"),type:"button",role:"programCta",buttonVariant:"text",text:"Explore program →",href:"#contact",style:{}}
    ]}
  ]};
}

const PROGRAMS_ROWS_EDITORIAL={
  id:"bjj-programs-rows-editorial-01",family:"services",name:"Programs 01 · Editorial Rows",category:"Programs",
  description:"Dense editorial rows for flexible program lists",preview:"programs-image",
  meta:{stableId:"bjj-programs-rows-editorial-01",version:3,category:"Programs",visualFamilies:["Editorial"],useCases:["program overview","multiple training paths"],tags:["programs","rows","repeatable","dense"],compositionRecipe:"Compact horizontal rows balance image, title and practical copy while scaling to several programs.",requiredSlots:["repeatable program items"],optionalSlots:["section intro"],imageRoles:["program image"],responsiveRecipe:"Rows stack image above copy on mobile.",minimumBuilderVersion:"3.8",capabilityRequirements:["repeatable program collection"],provenance:{status:"Runa original",approach:"modular editorial program system",source:"Runa V3.8",licence:"Runa"},verificationStatus:"prototype"},
  create(){const items=[
    programDenseItem("Beginner Jiu-Jitsu","Start here","A structured introduction to the positions, movements and habits you need to begin training with confidence — without being thrown straight into the deep end.",EDITORIAL_IMG.beginner,"Beginner students learning jiu-jitsu"),
    programDenseItem("Adult BJJ","Build your game","Gi and no-gi training for students who want to improve technique, fitness and live grappling while steadily developing a game that works under pressure.",EDITORIAL_IMG.adults,"Adult Brazilian Jiu-Jitsu class"),
    programDenseItem("Kids BJJ","Move, learn, grow","Age-appropriate classes that build coordination, confidence, discipline and problem solving through a clear jiu-jitsu curriculum.",EDITORIAL_IMG.kids,"Kids Brazilian Jiu-Jitsu class")
  ];return{id:uid("sec"),type:"services",name:"Programs 01 · Editorial Rows",anchor:"programs",styleRole:"background",baseStyle:{top:48,bottom:48,side:48,contentWidth:1440},baseResponsive:{tablet:{top:44,bottom:44,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"programsWrap",style:{direction:"column",gap:30,justify:"start",alignItems:"stretch",width:100},children:[
      {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"row",gap:30,justify:"space-between",alignItems:"end",width:100,firstColumn:58},baseResponsive:{tablet:{direction:"column",gap:12,alignItems:"start"},mobile:{direction:"column",gap:10}},children:[
        {id:uid("el"),type:"heading",role:"h2",text:"Find the right place to start.",style:{maxWidth:760}},
        {id:uid("el"),type:"text",role:"body",text:"Different programs, one training room. Choose the path that fits where you are now.",style:{maxWidth:520}}
      ]},
      programCollection("rows",items,{gap:24},{tablet:{gap:22},mobile:{gap:20}})
    ]}
  ]}}
};

const PROGRAMS_INDEX_EDITORIAL={
  id:"bjj-programs-index-editorial-01",family:"services",name:"Programs 02 · Typographic Index",category:"Programs",
  description:"Minimal typographic program index for larger program lists",preview:"programs-image",
  meta:{stableId:"bjj-programs-index-editorial-01",version:1,category:"Programs",visualFamilies:["Editorial"],useCases:["many programs","minimal academy site"],tags:["programs","index","typography","repeatable"],compositionRecipe:"Large program names and concise descriptions create a fast-scanning editorial index.",requiredSlots:["repeatable program items"],optionalSlots:["section intro"],responsiveRecipe:"Two-column rows collapse to stacked question-and-answer style items on mobile.",minimumBuilderVersion:"3.8",capabilityRequirements:["repeatable program collection"],provenance:{status:"Runa original",approach:"modular editorial program system",source:"Runa V3.8",licence:"Runa"},verificationStatus:"prototype"},
  create(){const items=[
    programIndexItem("Beginner Jiu-Jitsu","Start here","Learn the positions, movements and habits that make the first months of training easier to understand."),
    programIndexItem("Adult BJJ","Gi + no-gi","Technical classes and live training for adults at every stage of experience."),
    programIndexItem("Kids BJJ","Ages 7–13","Structured classes built around movement, confidence, discipline and problem solving."),
    programIndexItem("Open Mat","Train freely","Unstructured rounds and drilling time for members who want extra mat time.")
  ];return{id:uid("sec"),type:"services",name:"Programs 02 · Typographic Index",anchor:"programs",styleRole:"background",baseStyle:{top:48,bottom:48,side:48,contentWidth:1440},baseResponsive:{tablet:{top:44,bottom:44,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"programsWrap",style:{direction:"column",gap:28,justify:"start",alignItems:"stretch",width:100},children:[
      {id:uid("el"),type:"heading",role:"h2",text:"Training paths.",textScale:{desktop:1.08,tablet:.98,mobile:.82},style:{maxWidth:760}},
      programCollection("index",items,{gap:22},{mobile:{gap:18}})
    ]}
  ]}}
};

const PROGRAMS_IMAGE_STRIP={
  id:"bjj-programs-image-strip-01",family:"services",name:"Programs 03 · Image Strip",category:"Programs",
  description:"Highly visual program gallery with open copy beneath each image",preview:"programs-image",
  meta:{stableId:"bjj-programs-image-strip-01",version:1,category:"Programs",visualFamilies:["Editorial"],useCases:["2–4 programs","photography-led academy"],tags:["programs","images","gallery","repeatable"],compositionRecipe:"Tall program photography creates the primary rhythm while concise copy remains unboxed below.",requiredSlots:["repeatable program items"],optionalSlots:["section intro"],imageRoles:["program image"],responsiveRecipe:"Adaptive grid uses up to four columns and collapses on smaller screens.",minimumBuilderVersion:"3.8",capabilityRequirements:["repeatable program collection","responsive grid"],provenance:{status:"Runa original",approach:"modular editorial program system",source:"Runa V3.8",licence:"Runa"},verificationStatus:"prototype"},
  create(){const items=[
    programStripItem("Beginner Jiu-Jitsu","Start here","A clear, coached entry point for complete beginners.",EDITORIAL_IMG.beginner,"Beginner jiu-jitsu coaching"),
    programStripItem("Adult BJJ","Gi + no-gi","Technical training, positional work and live rounds for adults.",EDITORIAL_IMG.adults,"Adult BJJ training"),
    programStripItem("Kids BJJ","Move, learn, grow","Confident movement and age-appropriate jiu-jitsu in a structured class.",EDITORIAL_IMG.kids,"Kids BJJ class")
  ];return{id:uid("sec"),type:"services",name:"Programs 03 · Image Strip",anchor:"programs",styleRole:"background",baseStyle:{top:48,bottom:48,side:48,contentWidth:1440},baseResponsive:{tablet:{top:44,bottom:44,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"programsWrap",style:{direction:"column",gap:26,justify:"start",alignItems:"stretch",width:100},children:[
      {id:uid("el"),type:"heading",role:"h2",text:"Choose your training.",style:{maxWidth:820}},
      programCollection("strip",items,{direction:"grid",columns:3,gap:22},{tablet:{columns:2,gap:18},mobile:{direction:"column",gap:24}})
    ]}
  ]}}
};

const PROGRAMS_IMAGE_CARDS={
  id:"bjj-programs-image-cards-01",family:"services",name:"Programs 04 · Image Cards",category:"Programs",
  description:"Visual program cards for quick side-by-side scanning",preview:"services-cards",
  meta:{stableId:"bjj-programs-image-cards-01",version:2,category:"Programs",visualFamilies:["Editorial","Commercial"],useCases:["program overview","photography-led academy","3–6 programs"],tags:["programs","cards","images","repeatable","grid"],compositionRecipe:"A restrained responsive card grid gives every program equal visual weight while keeping all options easy to scan at once.",requiredSlots:["repeatable program items"],optionalSlots:["section intro"],imageRoles:["program image"],responsiveRecipe:"Three or four cards can sit side by side on wide screens, then resolve to two columns on tablet and one column on mobile.",minimumBuilderVersion:"3.8",capabilityRequirements:["repeatable program collection","responsive grid"],provenance:{status:"Runa original",approach:"modular editorial program system",source:"Runa V3.8.1",licence:"Runa"},verificationStatus:"prototype"},
  create(){const items=[
    programImageCardItem("Beginner Jiu-Jitsu","Start here","A clear introduction to the positions, movements and habits that make your first months of training easier to understand.",EDITORIAL_IMG.beginner,"Beginner students training jiu-jitsu",["Built for complete beginners","Structured fundamentals and positional basics","Clear progression into regular classes"]),
    programImageCardItem("Adult BJJ","Gi + no-gi","Technical classes and live training for adults who want to build skill, fitness and a game that holds up under pressure.",EDITORIAL_IMG.adults,"Adult Brazilian Jiu-Jitsu class",["Gi and no-gi training","Technique, drilling and live rounds","Progress at your own pace"]),
    programImageCardItem("Kids BJJ","Ages 6–12","Structured classes that develop movement, confidence, discipline and problem solving through jiu-jitsu.",EDITORIAL_IMG.kids,"Kids Brazilian Jiu-Jitsu class",["Age-appropriate technical coaching","Confidence, coordination and discipline","Safe classes with clear progression"])
  ];return{id:uid("sec"),type:"services",name:"Programs 04 · Image Cards",anchor:"programs",styleRole:"background",baseStyle:{top:48,bottom:48,side:48,contentWidth:1440},baseResponsive:{tablet:{top:44,bottom:44,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"programsWrap",style:{direction:"column",gap:26,justify:"start",alignItems:"stretch",width:100},children:[
      {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"row",gap:28,justify:"space-between",alignItems:"end",width:100,firstColumn:60},baseResponsive:{tablet:{direction:"column",gap:10,alignItems:"start"},mobile:{direction:"column",gap:8}},children:[
        {id:uid("el"),type:"heading",role:"h2",text:"Choose how you want to train.",style:{maxWidth:760}},
        {id:uid("el"),type:"text",role:"body",text:"A quick visual overview of the academy’s main programs.",style:{maxWidth:440}}
      ]},
      programCollection("cards-image",items,{direction:"grid",columns:3,gap:20},{tablet:{columns:2,gap:18},mobile:{direction:"column",gap:18}},{preset:"imageOverview",media:"balanced",topDetail:"label",body:"paragraph",cta:"text",title:"standard",alignment:"left",surface:"alternative",border:"style",corners:"style"})
    ]}
  ]}}
};

const PROGRAMS_TEXT_CARDS={
  id:"bjj-programs-text-cards-01",family:"services",name:"Programs 05 · Text Cards",category:"Programs",
  description:"Compact text-only cards for a lower-page program overview",preview:"services-cards",
  meta:{stableId:"bjj-programs-text-cards-01",version:2,category:"Programs",visualFamilies:["Editorial","Clean"],useCases:["lower-page program overview","information-dense program list","3–8 programs"],tags:["programs","cards","text","repeatable","overview"],compositionRecipe:"Text-only cards provide a compact secondary overview when the visitor has already seen the academy imagery elsewhere on the page.",requiredSlots:["repeatable program items"],optionalSlots:["section intro"],imageRoles:[],responsiveRecipe:"Cards form a responsive grid on desktop and tablet and a clean single-column stack on mobile.",minimumBuilderVersion:"3.8",capabilityRequirements:["repeatable program collection","responsive grid"],provenance:{status:"Runa original",approach:"modular editorial program system",source:"Runa V3.8.1",licence:"Runa"},verificationStatus:"prototype"},
  create(){const items=[
    programTextCardItem("Beginner Jiu-Jitsu","Start here","Learn the basic positions, movement and training habits in a structured environment designed for people with no previous grappling experience.",["No previous experience required","Learn the core positions and movements","Structured route into regular classes"]),
    programTextCardItem("Adult BJJ","Gi + no-gi","Ongoing technical classes and live rounds for adults developing a complete jiu-jitsu game at their own pace.",["Gi and no-gi sessions","Technical coaching plus live rounds","Suitable for a range of experience levels"]),
    programTextCardItem("Kids BJJ","Ages 6–12","Age-appropriate coaching focused on coordination, confidence, discipline and practical problem solving.",["Age-appropriate coaching","Build confidence and coordination","Clear expectations and progression"]),
    programTextCardItem("Competition Training","Experienced students","Focused rounds, competition strategy and higher-intensity training for students preparing to compete.",["Higher-intensity rounds","Competition strategy and preparation","For students actively planning to compete"])
  ];return{id:uid("sec"),type:"services",name:"Programs 05 · Text Cards",anchor:"programs",styleRole:"background",baseStyle:{top:48,bottom:48,side:48,contentWidth:1440},baseResponsive:{tablet:{top:44,bottom:44,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"programsWrap",style:{direction:"column",gap:24,justify:"start",alignItems:"stretch",width:100},children:[
      {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"row",gap:28,justify:"space-between",alignItems:"end",width:100,firstColumn:62},baseResponsive:{tablet:{direction:"column",gap:10,alignItems:"start"},mobile:{direction:"column",gap:8}},children:[
        {id:uid("el"),type:"heading",role:"h2",text:"Programs at a glance.",style:{maxWidth:760}},
        {id:uid("el"),type:"text",role:"body",text:"A compact overview for visitors who want the essentials without another large image section.",style:{maxWidth:470}}
      ]},
      programCollection("cards-text",items,{direction:"grid",columns:4,gap:16},{tablet:{columns:2,gap:16},mobile:{direction:"column",gap:14}},{preset:"textOverview",media:"none",topDetail:"number",body:"paragraph",cta:"text",title:"strong",alignment:"left",surface:"alternative",border:"style",corners:"style"})
    ]}
  ]}}
};

const PROGRAMS_HIGHLIGHT_CARDS={
  id:"bjj-programs-highlight-cards-01",family:"services",name:"Programs 06 · Highlight Cards",category:"Programs",
  description:"High-impact program cards built for fast scanning and stronger visual hierarchy",preview:"programs-image",
  meta:{stableId:"bjj-programs-highlight-cards-01",version:2,category:"Programs",visualFamilies:["Editorial","Commercial"],useCases:["primary program overview","3–4 programs","conversion-focused academy"],tags:["programs","cards","highlight","images","repeatable","scan"],compositionRecipe:"Large photography, oversized numbering, clear audience qualifiers and concise copy make every program read as a distinct path at a glance.",requiredSlots:["repeatable program items"],optionalSlots:["section intro"],imageRoles:["program image"],responsiveRecipe:"Up to four high-impact cards sit side by side on desktop, resolve to two columns on tablet and stack cleanly on mobile.",minimumBuilderVersion:"3.8",capabilityRequirements:["repeatable program collection","responsive grid"],provenance:{status:"Runa original",approach:"high-hierarchy program card system",source:"Runa V3.8.2",licence:"Runa"},verificationStatus:"prototype"},
  create(){const items=[
    programHighlightCardItem("Beginner Jiu-Jitsu","No experience needed",["Structured fundamentals from your first class","No previous grappling experience required","Clear route into regular adult training"],EDITORIAL_IMG.beginner,"Beginner BJJ students learning in class"),
    programHighlightCardItem("Adult BJJ","Gi + no-gi",["Gi and no-gi classes through the week","Technique, drilling and live rounds","Suitable for hobbyists and committed students"],EDITORIAL_IMG.adults,"Adult Brazilian Jiu-Jitsu training"),
    programHighlightCardItem("Kids BJJ","Ages 6–12",["Age-appropriate coaching for younger students","Build confidence, discipline and coordination","Safe classes with clear progression"],EDITORIAL_IMG.kids,"Kids Brazilian Jiu-Jitsu class")
  ];return{id:uid("sec"),type:"services",name:"Programs 06 · Highlight Cards",anchor:"programs",styleRole:"background",baseStyle:{top:56,bottom:56,side:48,contentWidth:1440},baseResponsive:{tablet:{top:48,bottom:48,side:32},mobile:{top:38,bottom:38,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"programsWrap",style:{direction:"column",gap:30,justify:"start",alignItems:"stretch",width:100},children:[
      {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"row",gap:28,justify:"space-between",alignItems:"end",width:100,firstColumn:62},baseResponsive:{tablet:{direction:"column",gap:10,alignItems:"start"},mobile:{direction:"column",gap:8}},children:[
        {id:uid("el"),type:"heading",role:"h2",text:"Choose the program that fits where you are now.",style:{maxWidth:820}},
        {id:uid("el"),type:"text",role:"body",text:"Each path has a clear starting point. Find the one that matches your experience, age and goals.",style:{maxWidth:470}}
      ]},
      programCollection("cards-highlight",items,{direction:"grid",columns:3,gap:24},{tablet:{columns:2,gap:18},mobile:{direction:"column",gap:18}},{preset:"highlight",media:"imageLed",topDetail:"number",body:"bullets",cta:"none",title:"strong",alignment:"left",surface:"alternative",border:"none",corners:"style"})
    ]}
  ]}}
};

const PROGRAMS_ALTERNATING_EDITORIAL={
  id:"bjj-programs-alternating-editorial-01",family:"services",name:"Programs 05 · Alternating Splits",category:"Programs",
  description:"Immersive alternating image-and-copy program features",preview:"programs-image",
  meta:{stableId:"bjj-programs-alternating-editorial-01",version:1,category:"Programs",visualFamilies:["Editorial"],useCases:["2–5 programs","strong program photography"],tags:["programs","alternating","split","repeatable"],compositionRecipe:"Each program gets a generous image-and-copy split, alternating visual direction as the user moves down the section.",requiredSlots:["repeatable program items"],optionalSlots:["section intro"],imageRoles:["program image"],responsiveRecipe:"Alternating desktop splits stack on mobile.",minimumBuilderVersion:"3.8",capabilityRequirements:["repeatable program collection","responsive split"],provenance:{status:"Runa original",approach:"modular editorial program system",source:"Runa V3.8",licence:"Runa"},verificationStatus:"prototype"},
  create(){const items=[
    programAlternatingItem("Beginner Jiu-Jitsu","Start here","A straightforward introduction to jiu-jitsu with enough structure to make the first few months feel clear rather than chaotic.",EDITORIAL_IMG.beginner,"Beginner BJJ class"),
    programAlternatingItem("Adult BJJ","Build your game","Technical gi and no-gi classes with live training for students who want to keep developing over the long term.",EDITORIAL_IMG.adults,"Adult BJJ class"),
    programAlternatingItem("Kids BJJ","Move, learn, grow","A structured class environment where young students can build movement skills, confidence and discipline.",EDITORIAL_IMG.kids,"Kids BJJ class")
  ];return{id:uid("sec"),type:"services",name:"Programs 05 · Alternating Splits",anchor:"programs",styleRole:"background",baseStyle:{top:48,bottom:48,side:48,contentWidth:1440},baseResponsive:{tablet:{top:44,bottom:44,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
    {id:uid("el"),type:"group",role:"programsWrap",style:{direction:"column",gap:30,justify:"start",alignItems:"stretch",width:100},children:[
      {id:uid("el"),type:"heading",role:"h2",text:"One room. Different ways to train.",style:{maxWidth:900}},
      programCollection("alternating",items,{gap:28},{mobile:{gap:24}})
    ]}
  ]}}
};


const TRUST_STORY_EDITORIAL={
  id:"bjj-trust-story-editorial-01",family:"trust",name:"Trust 03 · Student Story",category:"Trust",
  description:"Image-led testimonial feature with a longer student story",preview:"trust-reviews",
  meta:{stableId:"bjj-trust-story-editorial-01",version:1,category:"Trust",visualFamilies:["Editorial"],useCases:["testimonial","student story","social proof"],tags:["testimonial","story","image","trust"],compositionRecipe:"A full-width split pairs a training image with a longer first-person testimonial rather than review cards.",requiredSlots:["image","quote","attribution"],optionalSlots:["supporting copy"],imageRoles:["student training image"],responsiveRecipe:"Desktop split feature stacks image above quote on smaller screens.",minimumBuilderVersion:"3.6",capabilityRequirements:["zero-gutter section","responsive split"],provenance:{status:"Runa original",approach:"editorial BJJ prototype",source:"Runa V3.6",licence:"Runa"},verificationStatus:"prototype"},
  create(){return{id:uid("sec"),type:"trust",name:"Trust 03 · Student Story",styleRole:"alternative",baseStyle:{top:0,bottom:0,side:0,contentWidth:0},style:{},elements:[
    {id:uid("el"),type:"group",role:"trustStoryLayout",style:{direction:"row",gap:0,justify:"start",alignItems:"stretch",width:100,firstColumn:50},baseResponsive:{tablet:{direction:"column",gap:0},mobile:{direction:"column",gap:0}},children:[
      {id:uid("el"),type:"image",role:"visual",src:EDITORIAL_IMG.beginner,alt:"Student training during class",imageShapeRole:"bleed",style:{frameMode:"fill",height:620,radius:"@square",focalX:52,focalY:42},baseResponsive:{tablet:{frameMode:"ratio",aspectRatio:"16 / 10",height:420},mobile:{frameMode:"ratio",aspectRatio:"4 / 3",height:320}}},
      {id:uid("el"),type:"group",role:"trustStoryCopy",style:{direction:"column",gap:18,justify:"center",alignItems:"start",width:100,padding:72},baseResponsive:{tablet:{padding:52},mobile:{padding:28,gap:14}},children:[
        {id:uid("el"),type:"text",role:"kicker",text:"FROM A NEW STUDENT",textRole:"accent1",style:{}},
        {id:uid("el"),type:"heading",role:"h2",text:"“I came in expecting to feel out of place. By the end of the first week, I felt like I knew exactly where I stood and what to work on.”",style:{maxWidth:760}},
        {id:uid("el"),type:"text",role:"body",text:"The classes were hard in a good way, but the structure made a big difference. I didn’t feel like I had to guess what I was supposed to be learning.",style:{maxWidth:620}},
        {id:uid("el"),type:"text",role:"body",text:"— Sam · Beginner student",textRole:"secondary",style:{maxWidth:500}}
      ]}
    ]}
  ]}}
};

const FAQ_EDITORIAL={
  id:"bjj-faq-editorial-01",family:"faq",name:"FAQ 02 · Editorial Flow",category:"FAQ",
  description:"Open beginner FAQ in an editorial question-and-answer flow",preview:"faq-simple",
  meta:{stableId:"bjj-faq-editorial-01",version:1,category:"FAQ",visualFamilies:["Editorial"],useCases:["beginner FAQ","first class","new student questions"],tags:["faq","beginner","editorial","questions"],compositionRecipe:"A broad introductory block leads into open question-and-answer rows without boxed accordion cards.",requiredSlots:["questions","answers"],optionalSlots:["intro copy"],responsiveRecipe:"Question-and-answer pairs run as two-column rows on desktop and stack on mobile.",minimumBuilderVersion:"3.6",capabilityRequirements:["responsive split"],provenance:{status:"Runa original",approach:"editorial BJJ prototype",source:"Runa V3.6",licence:"Runa"},verificationStatus:"prototype"},
  create(){
    const item=(q,a)=>({id:uid("el"),type:"group",role:"faqFlowItem",style:{direction:"row",gap:34,justify:"start",alignItems:"start",width:100,firstColumn:40},baseResponsive:{mobile:{direction:"column",gap:10}},children:[
      {id:uid("el"),type:"heading",role:"h3",text:q,style:{maxWidth:460}},
      {id:uid("el"),type:"text",role:"body",text:a,style:{maxWidth:620}}
    ]});
    return{id:uid("sec"),type:"faq",name:"FAQ 02 · Editorial Flow",styleRole:"background",baseStyle:{top:48,bottom:48,side:48,contentWidth:1440},baseResponsive:{tablet:{top:44,bottom:44,side:32},mobile:{top:36,bottom:36,side:20}},style:{},elements:[
      {id:uid("el"),type:"group",role:"faqEditorialWrap",style:{direction:"column",gap:38,justify:"start",alignItems:"stretch",width:100},baseResponsive:{tablet:{gap:32},mobile:{gap:24}},children:[
        {id:uid("el"),type:"group",role:"contentGroup",style:{direction:"column",gap:14,justify:"start",alignItems:"start",width:68},baseResponsive:{tablet:{width:84},mobile:{width:100}},children:[
          {id:uid("el"),type:"text",role:"kicker",text:"YOUR FIRST CLASS",textRole:"accent1",style:{}},
          {id:uid("el"),type:"heading",role:"h2",text:"Most people ask the same questions before they start. These are the answers that matter.",style:{maxWidth:980}},
          {id:uid("el"),type:"text",role:"body",text:"The room should feel easier to walk into once you know what to expect.",style:{maxWidth:620}}
        ]},
        {id:uid("el"),type:"group",role:"faqFlowList",style:{direction:"column",gap:28,justify:"start",alignItems:"stretch",width:100},baseResponsive:{mobile:{gap:22}},children:[
          item("Do I need to be fit before I begin?","No. Getting fitter is one of the reasons people start. You can begin where you are and build up as you train."),
          item("Will I have to spar on day one?","Not immediately. Beginners are introduced to live training gradually so the first classes focus on positions, movement and understanding the room."),
          item("Do I need a gi for my first class?","Often not. Message the academy before you come in and you’ll be told exactly what to bring for the session you’re attending."),
          item("How often should a beginner train?","Two or three sessions each week is a strong starting point for most people. It’s enough to build consistency without overwhelming you.")
        ]}
      ]}
    ]};
  }
};

const EDITORIAL_HOME_COMPONENT_IDS=[
  "bjj-hero-full-bleed-01",
  "bjj-intro-statement-01",
  "bjj-academy-image-story-01",
  "bjj-programs-highlight-cards-01",
  "bjj-coaches-lead-team-01",
  "bjj-timetable-editorial-01",
  "bjj-trust-story-editorial-01",
  "bjj-faq-editorial-01",
  "bjj-conversion-display-01",
  "bjj-location-editorial-01"
];



const COMPONENT_LIBRARY_SCHEMA_VERSION=1;
const COMPONENT_VISUAL_FAMILIES=['Clean','Editorial','Commercial','Warm','Technical','Craft'];
const COMPONENT_PURPOSE_CATEGORIES=['Nav','Hero','Programs','Academy','Coaches','Trust','Timetable','FAQ','Conversion','Location','Footer'];

function defineComponent(def){
  const meta=def.meta||{};
  const provenance=meta.provenance||{};
  const stableId=meta.stableId||def.id;
  return{
    ...def,
    id:stableId,
    meta:{
      schemaVersion:COMPONENT_LIBRARY_SCHEMA_VERSION,
      stableId,
      version:Number(meta.version||1),
      category:meta.category||def.category||def.family||'Uncategorised',
      visualFamilies:Array.isArray(meta.visualFamilies)?meta.visualFamilies:[],
      useCases:Array.isArray(meta.useCases)?meta.useCases:[],
      tags:Array.isArray(meta.tags)?meta.tags:[],
      compositionRecipe:meta.compositionRecipe||'',
      requiredSlots:Array.isArray(meta.requiredSlots)?meta.requiredSlots:[],
      optionalSlots:Array.isArray(meta.optionalSlots)?meta.optionalSlots:[],
      imageRoles:Array.isArray(meta.imageRoles)?meta.imageRoles:[],
      responsiveRecipe:meta.responsiveRecipe||'',
      minimumBuilderVersion:meta.minimumBuilderVersion||'3.0',
      capabilityRequirements:Array.isArray(meta.capabilityRequirements)?meta.capabilityRequirements:[],
      provenance:{
        status:provenance.status||'prototype',
        approach:provenance.approach||'prototype',
        source:provenance.source||'Runa pre-research prototype',
        licence:provenance.licence||'n/a'
      },
      verificationStatus:meta.verificationStatus||'prototype'
    }
  };
}

// Editorial-first stock library. Legacy card-heavy stock sections have been removed from the
// picker so the Builder now presents one coherent design language while the new system expands.
const PROTOTYPE_COMPONENTS=[BLANK_SECTION,NAVBAR_EDITORIAL,HERO_FULL_BLEED,HERO_SPLIT_EDITORIAL,HERO_TYPO_STATEMENT,HERO_CENTERED_IMAGE,HERO_ASYMMETRIC_EDITORIAL,INTRO_STATEMENT,ACADEMY_FULL_SPLIT,ACADEMY_VALUES_EDITORIAL,ACADEMY_IMAGE_STORY,ACADEMY_STORY_PROOF,GALLERY_CLEAN_GRID,GALLERY_FULL_STRIP,GALLERY_SCROLL_RAIL,GALLERY_FEATURE_RAIL,PROGRAMS_ROWS_EDITORIAL,PROGRAMS_INDEX_EDITORIAL,PROGRAMS_IMAGE_STRIP,PROGRAMS_IMAGE_CARDS,PROGRAMS_TEXT_CARDS,PROGRAMS_HIGHLIGHT_CARDS,COACHES_FULL_FEATURE,COACHES_EDITORIAL_PROFILE,COACHES_CARDS,COACHES_LEAD_TEAM,TIMETABLE_EDITORIAL,FAQ_EDITORIAL,TRUST_STATEMENT,TRUST_STORY_EDITORIAL,CONVERSION_DISPLAY,LOCATION_EDITORIAL,FOOTER_EDITORIAL];
const COMPONENTS=PROTOTYPE_COMPONENTS.map(defineComponent);

