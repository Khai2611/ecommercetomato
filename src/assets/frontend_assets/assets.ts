
import basket_icon from './basket_icon.png'
import logo from './logo.png'
import search_icon from './search_icon.png'


import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

//categories' pics 
import autumn from './autumn.jpg'
import summer from './summer.jpg'
import spring from './spring.jpg'

import cardigan from './cardigan.jpg'
import sneakers from './sneakers.jpg'
import pants from './pants.jpg'


import databizLogo from './client-databiz.svg';
import audiophileLogo from './client-audiophile.svg';
import meetLogo from './client-meet.svg';
import makerLogo from './client-maker.svg';

import p1 from './p1-1000.jpg';
import p2 from './p2-1000.jpg';
import p3 from './p3-1000.jpg';
import p4 from './p4-1000.jpg';

import p11 from './p1-176.jpg';
import p22 from './p2-176.jpg';
import p33 from './p3-176.jpg';
import p44 from './p4-176.jpg';


//profile pics 
import lul from './lul.jpg';
import screen from './screen.png';

//profile list's page 
import cardigan2 from './clothes/cardigan2.jpg';
import cardigan3 from './clothes/kidcardigan.jpg';
import shirt1 from './clothes/turtleneck.jpg';
import shirt2 from './clothes/tshirt.jpg';
import shirt3 from './clothes/flannel.jpg';
import shirt4 from './clothes/sweatshirt.jpg';
import shirt5 from './clothes/crewnecktee.jpg';
import shirt6 from './clothes/shirt.jpg';

import dress from './clothes/dress.jpg';
import hoodie from './clothes/hoodie2.jpg';
import souffle from './clothes/souffle.jpg';
import pants1 from './clothes/drapeypants.jpg';
import pants2 from './clothes/kidsweatpants.jpg';
import pants3 from './clothes/taperedpants.jpg';
import pants4 from './clothes/widepants.jpg';
import shoe1 from './clothes/shoe1.png';
import shoe22 from './clothes/shoe2.png';
import shoe3 from './clothes/shoe3.png';
import shoe4 from './clothes/samba.jpg';


export const assets = {
    
    //product lists 
    cardigan2,
    cardigan3,
    shirt1,
    shirt2,
    shirt3,
    shirt4,
    shirt5,
    shirt6,
    dress,
    hoodie,
    souffle,
    pants1,
    pants2,
    pants3, 
    pants4,
    shoe1,
    shoe22,
    shoe3,
    shoe4,
    

    //cat pics
    autumn,
    summer, 
    spring,
    cardigan, 
    sneakers, 
    pants, 
    
    //brands
    databizLogo, 
    audiophileLogo, 
    meetLogo,
    makerLogo,

    //sneakers 
    p1,
    p2,
    p3,
    p4,
    p11,
    p22,
    p33,
    p44,
   
    logo,
    basket_icon,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon,

  //profile
  lul, 
  screen, 
}

export const header = [
    {
        image: autumn,
        title: "Autumn Collection",
        desc: "Embrace the season with our cozy autumn collection. From warm layers to stylish accessories, find the perfect pieces to elevate your fall wardrobe."
    },
    {
        image: summer,
        title: "Summer Collection",
        desc: "Embrace the warmth with our vibrant summer clothes collection. From breezy dresses to stylish shorts, find the perfect pieces to keep you cool and chic all season long."
    },
    {
        image: spring,
        title: "Spring Collection",
        desc: "Refresh your wardrobe with our vibrant spring styles, featuring light fabrics and playful designs."
    },
];

// =================== Types Start here ====================

interface Product {
  _id: string;
  img: string;
  productName: string;
  price: string;
  color: string;
  badge: boolean;
  des: string;
}


//=================== Landing Page's Product Display Starts here

export const productData = [
  {
    _id: "1001",
    img: cardigan2,
    productName: "Fleece Turtleneck",
    price: 135.00,
    color: "Beige and Orange",
    badge: true,
    des: "Fine 100% cotton brushed for a smooth feel.",
  },
  {
    _id: "1002",
    img: cardigan3,
    productName: "Fleece Cardigan",
    price: 180.00,
    color: "Cream and Orange",
    badge: true,
    des: "Fine 100% cotton brushed for a smooth feel.",
  },
  {
    _id: "1003",
    img: shirt4,
    productName: "Flannel Shirt",
    price: 220.00,
    color: "Black and White",
    badge: true,
    des: "Fine 100% cotton brushed for a smooth feel.",
  },
  {
    _id: "1004",
    img: souffle,
    productName: "Souffle Sweater",
    price: 260.00,
    color: "Green",
    badge: false,
    des: "Fine 100% cotton brushed for a smooth feel.",
  },
  {
    _id: "1005",
    img: pants4,
    productName: "Wide Pants",
    price: 180.00,
    color: "Olive",
    badge: true,
    des: "Fine 100% cotton brushed for a smooth feel.",
  },
  {
    _id: "1006",
    img: shirt1,
    productName: "Flannel Shirt",
    price: 220.00,
    color: "Black and White",
    badge: true,
    des: "Fine 100% cotton brushed for a smooth feel.",
  },
];



// =================== PaginationItems Start here ===============

export const paginationItems: Product[] = [
  {
    _id: "1001",
    img: shirt1,
    productName: "Fleece Turtleneck",
    price: "35.00",
    color: "Beige and Orange",
    badge: true,
    des: "The sleeves and body have been redesigned for better range of motion.",
  },
  {
    _id: "1002",
    img: cardigan2,
    productName: "Fleece Cardigan",
    price: "180.00",
    color: "Cream and Orange",
    badge: true,
    des: "The design combines a fun pattern with a solid color at the body and placket to make styling easy. Buttons feature the Marimekko logos.",
  },
  {
    _id: "1003",
    img: cardigan3,
    productName: "Greece Cardigan",
    price: "125.00",
    color: "Cream and Orange",
    badge: true,
    des: "The design combines a fun pattern with a solid color at the body and placket to make styling easy. Buttons feature the Marimekko logos.",
  },
  {
    _id: "1004",
    img: shirt3,
    productName: "Flannel Shirt",
    price: "220.00",
    color: "Black and White",
    badge: true,
    des: "Fine 100% cotton brushed for a smooth feel on the outside and soft and cozy warmth on the inside.",
  },
  {
    _id: "1005",
    img: shoe4,
    productName: "Fall Sneakers",
    price: "35.00",
    color: "Beige and Orange",
    badge: true,
    des: "These low-profile sneakers are your perfect casual wear companion.",
  },
  {
    _id: "1006",
    img: shirt6,
    productName: "Polo Shirt",
    price: "220.00",
    color: "Black and White",
    badge: true,
    des: "Smooth 'AIRism' fabric with the look of cotton.",
  },
  {
    _id: "1007",
    img: hoodie,
    productName: "Sweat Hoodie",
    price: "125.00",
    color: "Pastel Green",
    badge: true,
    des: "The famous scene of Winnie the Pooh, Piglet, Tigger, and Christopher Robin marching happily is designed with embroidery in a monochrome color palette",
  },
  {
    _id: "1008",
    img: shirt4,
    productName: "Sweatshirt",
    price: "180.00",
    color: "Green",
    badge: false,
    des: "Classic V-insert and long ribbing at the neckline. Neck tape helps the collar keep its shape even after repeated washing.",
  },
  {
    _id: "1009",
    img: shirt2,
    productName: "Crew Neck Tee",
    price: "180.00",
    color: "White",
    badge: false,
    des: "The Uniqlo U collection is the realization of a dedicated and skilled team of international designers based at our Paris Research and Development Center led by Artistic Director Christophe Lemaire.",
  },
  {
    _id: "1010",
    img: dress,
    productName: "Fleece Dress",
    price: "250.00",
    color: "Cream and Orange",
    badge: true,
    des: "Marimekko print in an all-over design.",
  },
  {
    _id: "1011",
    img: shirt5,
    productName: "Kids Crew TShirt",
    price: "80.00",
    color: "Mixed",
    badge: true,
    des: "Smooth 'AIRism' fabric with the look of cotton.",
  },
  {
    _id: "1012",
    img: souffle,
    productName: "Souffle Sweater",
    price: "260.00",
    color: "Green",
    badge: false,
    des: "Sumptuously Soft, non-itchy fabric.Cocoon silhouette with a longer hem at The back.",
  },
  {
    _id: "1013",
    img: pants3,
    productName: "Tapered Pants",
    price: "60.00",
    color: "Black",
    badge: true,
    des: "Sleek, tapered silhouette that is suitable for work as well as for sports and casual wear.",
  },
  {
    _id: "1014",
    img: pants1,
    productName: "Drapey Pants",
    price: "250.00",
    color: "Cream",
    badge: true,
    des: "Incredibly soft denim made from a lyocell and cotton blend.",
  },
  {
    _id: "1015",
    img: pants2,
    productName: "Kid Sweatpants",
    price: "60.00",
    color: "Gray",
    badge: false,
    des: "A unique collaboration has come to life between Andy Warhol, a seminal figure in 20th-century art, and KAWS, a leading artist in contemporary art.",
  },
  {
    _id: "1016",
    img: shoe22,
    productName: "Lebron Jewel",
    price: "250.00",
    color: "Mixed",
    badge: true,
    des: "This version is inspired by LeBron's relationship with his youngest son and the sense of clarity it brings. With its extra-durable rubber outsole, this version gives you traction for outdoor courts.",
  },
  {
    _id: "1017",
    img: shoe1,
    productName: "Pegasus Plus",
    price: "220.00",
    color: "Mixed",
    badge: false,
    des: "Take responsive cushioning to the next level with the Pegasus Plus. It energises your ride with full-length, super-light ZoomX foam to give you a high level of energy return for everyday runs.",
  },
  {
    _id: "1018",
    img: shoe3,
    productName: "Victory Streakfly",
    price: "144.00",
    color: "Mixed",
    badge: true,
    des: "Low profile with sleek details, it feels like it disappears on your foot to help you better connect with the road on the way to your personal best.",
  },
  {
    _id: "1019",
    img: pants4,
    productName: "Wide Pants",
    price: "250.00",
    color: "Olive",
    badge: true,
    des: "Smooth yet silhouette-retaining fabric with elastic waistband.",
  },

];


