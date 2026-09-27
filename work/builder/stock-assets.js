'use strict';
// Curated Runa references; remote photos require an internet connection.
const RUNA_STOCK = [
  {
    "id": "38678659",
    "title": "Intense BJJ training session",
    "url": "https://images.pexels.com/photos/38678659/pexels-photo-38678659.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/brazilian-jiu-jitsu-training-session-in-action-38678659/",
    "photographer": "Eduard Perez",
    "roles": [
      "Hero / Action"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "15545735",
    "title": "BJJ match from above",
    "url": "https://images.pexels.com/photos/15545735/pexels-photo-15545735.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/men-fighting-in-martial-arts-competition-15545735/",
    "photographer": "Jonathan Borba",
    "roles": [
      "Competition",
      "Hero / Action"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "5424743",
    "title": "Grappling from full guard",
    "url": "https://images.pexels.com/photos/5424743/pexels-photo-5424743.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/a-grappler-in-full-guard-5424743/",
    "photographer": "Bruno Bueno",
    "roles": [
      "Hero / Action"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "38674471",
    "title": "Women training BJJ dynamically",
    "url": "https://images.pexels.com/photos/38674471/pexels-photo-38674471.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/two-women-practicing-brazilian-jiu-jitsu-in-gym-38674471/",
    "photographer": "Alex Dos Santos",
    "roles": [
      "Hero / Action"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "11391987",
    "title": "Group BJJ / no-gi training",
    "url": "https://images.pexels.com/photos/11391987/pexels-photo-11391987.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/two-men-wrestling-11391987/",
    "photographer": "Duren Williams",
    "roles": [
      "Hero / Action"
    ],
    "noGi": true,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "13811060",
    "title": "Grappling on gym mats",
    "url": "https://images.pexels.com/photos/13811060/pexels-photo-13811060.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/people-practising-martial-arts-13811060/",
    "photographer": "Luke Miller",
    "roles": [
      "Hero / Action"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "38732379",
    "title": "Friendly BJJ training session",
    "url": "https://images.pexels.com/photos/38732379/pexels-photo-38732379.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/friendly-brazilian-jiu-jitsu-training-session-38732379/",
    "photographer": "Mica Bassa",
    "roles": [
      "Beginner / Instruction",
      "Community"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "38732382",
    "title": "Focused partners training",
    "url": "https://images.pexels.com/photos/38732382/pexels-photo-38732382.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/two-jiu-jitsu-practitioners-in-training-session-38732382/",
    "photographer": "Mica Bassa",
    "roles": [
      "Beginner / Instruction"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "8612042",
    "title": "Two men practising BJJ",
    "url": "https://images.pexels.com/photos/8612042/pexels-photo-8612042.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/men-practising-martial-arts-at-the-gym-8612042/",
    "photographer": "RDNE Stock project",
    "roles": [
      "Beginner / Instruction"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "11391867",
    "title": "Adults training on mats",
    "url": "https://images.pexels.com/photos/11391867/pexels-photo-11391867.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/people-training-martial-arts-11391867/",
    "photographer": "Duren Williams",
    "roles": [
      "Beginner / Instruction"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "3310166",
    "title": "Instructor teaching a child",
    "url": "https://images.pexels.com/photos/3310166/pexels-photo-3310166.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/photo-of-man-sitting-in-front-of-boy-3310166/",
    "photographer": "Erik Santos",
    "roles": [
      "Beginner / Instruction"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": true
  },
  {
    "id": "28945401",
    "title": "Children practising BJJ in class",
    "url": "https://images.pexels.com/photos/28945401/pexels-photo-28945401.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/children-practicing-brazilian-jiu-jitsu-in-class-28945401/",
    "photographer": "SAULO LEITE",
    "roles": [
      "Kids"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": true
  },
  {
    "id": "7988965",
    "title": "Dynamic youth BJJ throw",
    "url": "https://images.pexels.com/photos/7988965/pexels-photo-7988965.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/boys-practicing-jiu-jitsu-7988965/",
    "photographer": "cottonbro studio",
    "roles": [
      "Kids"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": true
  },
  {
    "id": "7988768",
    "title": "Kids handshake on mats",
    "url": "https://images.pexels.com/photos/7988768/pexels-photo-7988768.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/boys-sparring-on-black-mat-7988768/",
    "photographer": "cottonbro studio",
    "roles": [
      "Kids"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": true
  },
  {
    "id": "7988774",
    "title": "Kids sparring while teammate watches",
    "url": "https://images.pexels.com/photos/7988774/pexels-photo-7988774.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/boys-sparring-on-black-mat-7988774/",
    "photographer": "cottonbro studio",
    "roles": [
      "Kids"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": true
  },
  {
    "id": "7988956",
    "title": "Youth BJJ throwing technique",
    "url": "https://images.pexels.com/photos/7988956/pexels-photo-7988956.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/boys-practicing-jiu-jitsu-7988956/",
    "photographer": "cottonbro studio",
    "roles": [
      "Kids"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": true
  },
  {
    "id": "38674495",
    "title": "Women training on mats",
    "url": "https://images.pexels.com/photos/38674495/pexels-photo-38674495.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/women-practicing-jiu-jitsu-on-training-mats-38674495/",
    "photographer": "Alex Dos Santos",
    "roles": [
      "Women / Inclusive"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "38678615",
    "title": "Women training BJJ in gym",
    "url": "https://images.pexels.com/photos/38678615/pexels-photo-38678615.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/women-practicing-brazilian-jiu-jitsu-at-gym-38678615/",
    "photographer": "Eduard Perez",
    "roles": [
      "Women / Inclusive"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "38678722",
    "title": "Dynamic women grappling",
    "url": "https://images.pexels.com/photos/38678722/pexels-photo-38678722.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/two-women-practicing-brazilian-jiu-jitsu-grappling-38678722/",
    "photographer": "Eduard Perez",
    "roles": [
      "Women / Inclusive"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "38678747",
    "title": "Athlete preparing to train",
    "url": "https://images.pexels.com/photos/38678747/pexels-photo-38678747.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/woman-practicing-brazilian-jiu-jitsu-in-buenos-aires-38678747/",
    "photographer": "Eduard Perez",
    "roles": [
      "Women / Inclusive"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "6765044",
    "title": "Happy martial artists seated together",
    "url": "https://images.pexels.com/photos/6765044/pexels-photo-6765044.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/a-people-wearing-martial-arts-uniform-sitting-together-6765044/",
    "photographer": "Kampus Production",
    "roles": [
      "Community"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": true
  },
  {
    "id": "7045731",
    "title": "Group of martial artists in dojo",
    "url": "https://images.pexels.com/photos/7045731/pexels-photo-7045731.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/group-of-people-standing-on-floor-wearing-karategi-7045731/",
    "photographer": "RDNE Stock project",
    "roles": [
      "Community"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": true
  },
  {
    "id": "8611971",
    "title": "Brown-belt BJJ portrait",
    "url": "https://images.pexels.com/photos/8611971/pexels-photo-8611971.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/portrait-pf-a-man-in-a-brazilian-jiu-jitsu-gi-8611971/",
    "photographer": "RDNE Stock project",
    "roles": [
      "Coach / Portrait"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": true
  },
  {
    "id": "29956727",
    "title": "BJJ athlete in gi against brick wall",
    "url": "https://images.pexels.com/photos/29956727/pexels-photo-29956727.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/brazilian-jiu-jitsu-practitioner-in-gi-uniform-29956727/",
    "photographer": "Evandro Paula Alves",
    "roles": [
      "Coach / Portrait"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": true
  },
  {
    "id": "38678667",
    "title": "Woman in blue gi seated on mat",
    "url": "https://images.pexels.com/photos/38678667/pexels-photo-38678667.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/woman-practicing-brazilian-jiu-jitsu-in-blue-gi-38678667/",
    "photographer": "Eduard Perez",
    "roles": [
      "Coach / Portrait"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": true
  },
  {
    "id": "8612531",
    "title": "Close-up gi grip",
    "url": "https://images.pexels.com/photos/8612531/pexels-photo-8612531.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/close-up-of-people-doing-jiu-jitsu-8612531/",
    "photographer": "RDNE Stock project",
    "roles": [
      "Detail / Texture"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "6253312",
    "title": "Black belt being tied",
    "url": "https://images.pexels.com/photos/6253312/pexels-photo-6253312.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/close-up-shot-of-a-person-wearing-a-black-belt-6253312/",
    "photographer": "Artem Podrez",
    "roles": [
      "Detail / Texture"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "8612015",
    "title": "Brown belt close-up",
    "url": "https://images.pexels.com/photos/8612015/pexels-photo-8612015.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/close-up-of-a-brown-belt-8612015/",
    "photographer": "RDNE Stock project",
    "roles": [
      "Detail / Texture"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "38718030",
    "title": "Taping fingers before training",
    "url": "https://images.pexels.com/photos/38718030/pexels-photo-38718030.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/martial-arts-training-with-jiu-jitsu-tape-38718030/",
    "photographer": "Mica Bassa",
    "roles": [
      "Detail / Texture"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "38132444",
    "title": "BJJ match in action",
    "url": "https://images.pexels.com/photos/38132444/pexels-photo-38132444.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/intense-brazilian-jiu-jitsu-match-in-action-38132444/",
    "photographer": "Daniel Duarte",
    "roles": [
      "Competition"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "15545734",
    "title": "Gi grappling match/training",
    "url": "https://images.pexels.com/photos/15545734/pexels-photo-15545734.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/men-practising-judo-15545734/",
    "photographer": "Jonathan Borba",
    "roles": [
      "Competition"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "8612498",
    "title": "BJJ training in bright gym",
    "url": "https://images.pexels.com/photos/8612498/pexels-photo-8612498.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/two-men-practicing-brazilian-jiu-jitsu-8612498/",
    "photographer": "RDNE Stock project",
    "roles": [
      "Academy / Environment"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "6253349",
    "title": "High-angle training floor",
    "url": "https://images.pexels.com/photos/6253349/pexels-photo-6253349.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/exhausted-martial-artists-after-training-6253349/",
    "photographer": "Artem Podrez",
    "roles": [
      "Academy / Environment"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "8612068",
    "title": "Training inside equipped gym",
    "url": "https://images.pexels.com/photos/8612068/pexels-photo-8612068.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/man-in-black-shirt-training-in-the-gym-8612068/",
    "photographer": "RDNE Stock project",
    "roles": [
      "Academy / Environment"
    ],
    "noGi": false,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "11391989",
    "title": "Women training grappling",
    "url": "https://images.pexels.com/photos/11391989/pexels-photo-11391989.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/two-women-wrestling-11391989/",
    "photographer": "Duren Williams",
    "roles": [
      "Women / Inclusive",
      "Programs"
    ],
    "noGi": true,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "11392321",
    "title": "Mixed-pair grappling practice",
    "url": "https://images.pexels.com/photos/11392321/pexels-photo-11392321.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/a-woman-and-a-man-wrestling-on-a-mat-in-a-gym-11392321/",
    "photographer": "Duren Williams",
    "roles": [
      "Beginner / Instruction",
      "Programs"
    ],
    "noGi": true,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "11392044",
    "title": "Partner grappling on the mats",
    "url": "https://images.pexels.com/photos/11392044/pexels-photo-11392044.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/two-men-wrestling-11392044/",
    "photographer": "Duren Williams",
    "roles": [
      "Hero / Action",
      "Programs"
    ],
    "noGi": true,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "11392335",
    "title": "Women\u2019s ground grappling",
    "url": "https://images.pexels.com/photos/11392335/pexels-photo-11392335.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/two-women-wrestling-11392335/",
    "photographer": "Duren Williams",
    "roles": [
      "Women / Inclusive",
      "Programs"
    ],
    "noGi": true,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "11392013",
    "title": "Group grappling session",
    "url": "https://images.pexels.com/photos/11392013/pexels-photo-11392013.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/athletes-during-wrestling-workout-11392013/",
    "photographer": "Duren Williams",
    "roles": [
      "Academy / Environment",
      "Hero / Action"
    ],
    "noGi": true,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "11392006",
    "title": "Groundwork in the training room",
    "url": "https://images.pexels.com/photos/11392006/pexels-photo-11392006.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/two-men-wrestling-on-a-mat-11392006/",
    "photographer": "Duren Williams",
    "roles": [
      "Academy / Environment",
      "Programs"
    ],
    "noGi": true,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "11392224",
    "title": "Partner practice on grey mats",
    "url": "https://images.pexels.com/photos/11392224/pexels-photo-11392224.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/two-people-wrestling-on-a-gray-mat-11392224/",
    "photographer": "Duren Williams",
    "roles": [
      "Beginner / Instruction",
      "Programs"
    ],
    "noGi": true,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  },
  {
    "id": "11391978",
    "title": "Training together in the gym",
    "url": "https://images.pexels.com/photos/11391978/pexels-photo-11391978.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "sourceUrl": "https://www.pexels.com/photo/martial-arts-training-in-a-gym-11391978/",
    "photographer": "Duren Williams",
    "roles": [
      "Academy / Environment",
      "Hero / Action"
    ],
    "noGi": true,
    "licenseUrl": "https://www.pexels.com/license/",
    "clientPhoto": false
  }
];
