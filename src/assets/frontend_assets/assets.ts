
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

import newArrOne from "./newArrival/newArrOne.webp";
import newArrTwo from "./newArrival/newArrTwo.webp";
import newArrThree from "./newArrival/newArrThree.webp";
import newArrFour from "./newArrival/newArrFour.webp";

// Best Sellers
import bestSellerOne from "./bestSeller/bestSellerOne.webp";
import bestSellerTwo from "./bestSeller/bestSellerTwo.webp";
import bestSellerThree from "./bestSeller/bestSellerThree.webp";
import bestSellerFour from "./bestSeller/bestSellerFour.webp";

// Special Offers
import spfOne from "./specialOffer/spfOne.webp";
import spfTwo from "./specialOffer/spfTwo.webp";
import spfThree from "./specialOffer/spfThree.webp";
import spfFour from "./specialOffer/spfFour.webp";

//profile pics 
import lul from './lul.jpg';
import screen from './screen.png';
// import cover from './cover.jpg';

export const assets = {
    
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

	//product list 
	newArrOne,
	newArrTwo,
	newArrThree,
	newArrFour,
  
	// Best Sellers
	bestSellerOne,
	bestSellerTwo,
	bestSellerThree,
	bestSellerFour,
  
	// Sprcial Offers
	spfOne,
	spfTwo,
	spfThree,
	spfFour,

  //profile
  lul, 
  screen, 
  // cover
}

export const header = [
    {
        image: autumn,
        title: "Autumn Collection",
        desc: "Embrace the season with our cozy autumn collection. From warm layers to stylish accessories, find the perfect pieces to elevate your fall wardrobe."
    },
    {
        image: summer,
        title: "Summer Collectioan",
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

// =================== PaginationItems Start here ===============

export const paginationItems: Product[] = [
  {
    _id: "1001",
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1002",
    img: spfTwo,
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1003",
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1004",
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1005",
    img: bestSellerOne,
    productName: "Flower Base",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1006",
    img: bestSellerTwo,
    productName: "New Backpack",
    price: "180.00",
    color: "Gray",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1007",
    img: bestSellerThree,
    productName: "Household materials",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1008",
    img: bestSellerFour,
    productName: "Travel Bag",
    price: "220.00",
    color: "Black",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1009",
    img: newArrOne,
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1010",
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1011",
    img: newArrThree,
    productName: "cloth Basket",
    price: "80.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1012",
    img: newArrFour,
    productName: "Funny toys for babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1013",
    img: newArrTwo,
    productName: "Funny toys for babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1014",
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1015",
    img: newArrFour,
    productName: "Funny toys for babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1016",
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1017",
    img: bestSellerFour,
    productName: "Travel Bag",
    price: "220.00",
    color: "Black",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1018",
    img: newArrOne,
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1019",
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1020",
    img: newArrThree,
    productName: "cloth Basket",
    price: "80.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1021",
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1022",
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1023",
    img: bestSellerOne,
    productName: "Flower Base",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1024",
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1025",
    img: spfTwo,
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1026",
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1027",
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1028",
    img: bestSellerOne,
    productName: "Flower Base",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1029",
    img: bestSellerTwo,
    productName: "New Backpack",
    price: "180.00",
    color: "Gray",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1030",
    img: bestSellerThree,
    productName: "Household materials",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1031",
    img: bestSellerFour,
    productName: "Travel Bag",
    price: "220.00",
    color: "Black",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1032",
    img: newArrOne,
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1033",
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1034",
    img: newArrThree,
    productName: "cloth Basket",
    price: "80.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1035",
    img: newArrFour,
    productName: "Funny toys for babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1036",
    img: newArrTwo,
    productName: "Funny toys for babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1037",
    img: newArrFour,
    productName: "Funny toys for babies",
    price: "60.00",
    color: "Mixed",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1038",
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1039",
    img: bestSellerFour,
    productName: "Travel Bag",
    price: "220.00",
    color: "Black",
    badge: false,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1040",
    img: newArrOne,
    productName: "Round Table Clock",
    price: "44.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1041",
    img: newArrTwo,
    productName: "Smart Watch",
    price: "250.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1042",
    img: newArrThree,
    productName: "cloth Basket",
    price: "80.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1043",
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1044",
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1045",
    img: bestSellerOne,
    productName: "Flower Base",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "1046",
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];

// =================== PaginationItems End here =================



// export const products: TProduct[] = [
// 	{
// 		id: 1,
// 		title: 'Nike Air Max 90',
// 		image: { full: '', thumb: p1 },
// 		size: '10',
// 		color: 'White',
// 		price: 120,
// 		description:
// 			'The Nike Air Max 90 is a classic sneaker with modern updates that provide comfort and style.',
// 		availableQty: 8,
// 		discountPercentage: 17,
// 		category: 'sports',
// 		discountedPrice: 99.6
// 	},
// 	{
// 		id: 2,
// 		title: 'Adidas Ultraboost 21',
// 		image: { full: '', thumb: p2 },
// 		size: '9.5',
// 		color: 'Black',
// 		price: 180,
// 		description:
// 			'The Adidas Ultraboost 21 is a high-performance running shoe with a responsive Boost midsole.',
// 		availableQty: 5,
// 		discountPercentage: 11,
// 		category: 'running',
// 		discountedPrice: 160.2
// 	},
// 	{
// 		id: 3,
// 		title: 'Puma Calibrate Runner',
// 		image: { full: '', thumb: p3 },
// 		size: '11',
// 		color: 'Blue',
// 		price: 90,
// 		description:
// 			'The Puma Calibrate Runner is a comfortable and stylish sneaker that is perfect for casual wear.',
// 		availableQty: 10,
// 		discountPercentage: 25,
// 		category: 'running',
// 		discountedPrice: 67.5
// 	},
// 	{
// 		id: 4,
// 		title: 'New Balance 990v5',
// 		image: { full: '', thumb: p4 },
// 		size: '12',
// 		color: 'Grey',
// 		price: 175,
// 		description:
// 			'The New Balance 990v5 is a comfortable and versatile sneaker that can be worn for running or everyday activities.',
// 		availableQty: 3,
// 		discountPercentage: 15,
// 		category: 'sports',
// 		discountedPrice: 148.75
// 	}];