import {useEffect, useState} from 'react';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '@/firebase/firebaseConfig';
import {isUserLoggedIn, getUserData} from '@/utils/auth';
import {useNavigate} from 'react-router-dom';

import p1 from '../../assets/frontend_assets/p1.jpg';
import {assets} from '@/assets/frontend_assets/assets';

// Define the carts interface
interface Cart {
    cartID: string;
    prodID: string;
    qty: number;
    userID: string;
}

// Define the products interface
interface Product {
    prodID: string;
    p1: keyof typeof assets;
    p2: keyof typeof assets;
    p3: keyof typeof assets;
    p4: keyof typeof assets;
    prodName: string;
    prodPrice: number;
    catID: string;
    genderID: string;
    inventoryID: string;
}

// const products = [
//     {
//         id: 1,
//         name: 'Product 1',
//         category: 'Category 1',
//         price: 'RM230',
//         image: p1,
//         quantity: 12,
//     },
//     {
//         id: 2,
//         name: 'Product 2',
//         category: 'Category 2',
//         price: 'RM150',
//         image: p1, // Replace with the correct image
//         quantity: 8,
//     },
//     // Add more products as needed
//     {
//         id: 2,
//         name: 'Product 2',
//         category: 'Category 2',
//         price: 'RM150',
//         image: p1, // Replace with the correct image
//         quantity: 8,
//     },
//     {
//         id: 2,
//         name: 'Product 2',
//         category: 'Category 2',
//         price: 'RM150',
//         image: p1, // Replace with the correct image
//         quantity: 8,
//     },
//     {
//         id: 2,
//         name: 'Product 2',
//         category: 'Category 2',
//         price: 'RM150',
//         image: p1, // Replace with the correct image
//         quantity: 8,
//     },
// ];

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Cart[]>([]);
    const [userID, setUserID] = useState<string | null>(null);
    const navigate = useNavigate();

    // Check if the user is logged in and retrieve user data
    useEffect(() => {
        const userData = getUserData(); // Get user data from localStorage
        if (userData) {
            setUserID(userData.userID); // Set the userID if the user is logged in
        } else {
            // If the user is not logged in, redirect to the homepage
            navigate('/'); // Navigate to the homepage
        }
    }, [navigate]);

    // Fetch cart data and products data from Firestore
    useEffect(() => {
        const fetchCartData = async () => {
            // Get all items from the Cart collection
            const cartQuery = query(
                collection(db, 'Cart'),
                where('userID', '==', userID),
            );
            const cartSnapshot = await getDocs(cartQuery);
            const cartData = cartSnapshot.docs.map((doc) => doc.data() as Cart);
            setCart(cartData);
        };

        // Fetch the cart data first
        fetchCartData();
    }, [userID]); // Only run once on mount

    useEffect(() => {
        // Fetch products only if cart is available
        if (cart.length > 0) {
            const prodIDs = cart.map((item) => item.prodID);

            const fetchProductData = async () => {
                // Get products based on prodID from Cart
                const productsQuery = query(
                    collection(db, 'Products'),
                    where('prodID', 'in', prodIDs),
                );
                const productSnapshot = await getDocs(productsQuery);
                const productData = productSnapshot.docs.map(
                    (doc) => doc.data() as Product,
                );
                setProducts(productData);
            };

            fetchProductData();
        }
    }, [cart]); // Only run when cart changes

    // Filter products based on prodID in the cart
    const cartProductDetails = cart
        .map((cartItem) => {
            const product = products.find(
                (product) => product.prodID === cartItem.prodID,
            );
            return product ? {...cartItem, ...product} : null;
        })
        .filter((item) => item !== null);

    return (
        <div className='space-y-4 p-4 divide-y divide-gray-300 max-w-xl'>
            <h2 className='text-3xl font-semibold mb-5'>Order Summary</h2>
            <div className='max-h-[350px] overflow-y-auto'>
                {cartProductDetails.map((item, index) => (
                    <div key={index} className='flex items-center p-4'>
                        <img
                            src={assets[item?.p1]}
                            alt='Product'
                            className='w-24 h-24 object-cover mr-4 rounded'
                        />
                        <div className='flex-grow text-left'>
                            <h2 className='text-lg font-semibold'>
                                {item.prodName}
                            </h2>
                            <p className='text-gray-500'>
                                Category: {item.catID}
                            </p>
                            <p className='text-gray-500'>
                                Quantity: {item.qty}
                            </p>
                        </div>
                        <div className='text-center'>
                            <p className='text-lg font-semibold'>
                                RM{item.prodPrice}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='p-4 '>
                <div className='flex  justify-between '>
                    <p className='font-semibold'>Subtotal</p>
                    <p>
                        RM
                        {cartProductDetails.reduce(
                            (acc, item) =>
                                acc + (item?.prodPrice ?? 0) * (item?.qty ?? 0),
                            0,
                        )}
                    </p>
                </div>
                <div className='flex pt-4 justify-between'>
                    <p className='font-semibold'>Shipping</p>
                    <p>RM15</p>
                </div>
            </div>

            <div className='flex p-4 justify-between'>
                <p className='font-semibold'>Total</p>
                <p className=''>
                    RM
                    {cartProductDetails.reduce(
                        (acc, item) =>
                            acc + (item?.prodPrice ?? 0) * (item?.qty ?? 0),
                        0,
                    ) + 15}
                </p>
            </div>
        </div>
    );
}

export default ProductList;
