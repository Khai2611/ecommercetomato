'use client';

import {useState, useEffect} from 'react';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {Link} from 'react-router-dom';
import React from 'react';
import {assets} from '@/assets/frontend_assets/assets';
import {db} from '@/firebase/firebaseConfig';
import {
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';
import {getUserData} from '@/utils/auth';
import {useCategoryData} from '@/hooks/useCategoryData';

// Define the carts interface
interface Cart {
    cartID: string;
    prodID: string;
    qty: number;
    userID: string;
}

// Define the products interface
interface Products {
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

// Define the Inventory interface
interface Inventory {
    inventoryID: string;
    prodQty: number;
    soldQty: number;
}

// Define the ProductCart interface
interface ProductCart {
    cartID: string;
    prodID: string;
    userID: string;
    prodName: string;
    category: string;
    productPrice: number;
    quantity: number;
    img: keyof typeof assets; // This makes img a key of the assets object
    genderID: string;
    inventory: Inventory;
}

const Example: React.FC<{
    open: boolean;
    setOpen: (open: boolean) => void;
}> = ({open, setOpen}) => {
    // const [open, setOpen] = useState(true);

    const [cartItems, setCartItems] = useState<ProductCart[]>([]);
    const [loading, setLoading] = useState(true);

    // const user = 'UD001';
    const [userID, setUserID] = useState<string | null>(null); // Local state for user ID
    const categories = useCategoryData(); // Get categories from the custom hook

    useEffect(() => {
        // Get the userID from the session (localStorage)
        const userData = getUserData();
        if (userData) {
            setUserID(userData.userID); // Set the userID from session data
        } else {
            setUserID(null); // No user logged in
        }
    }, []);

    useEffect(() => {
        console.log('Dialog state changed:', open);
    }, [open]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userID) {
                    setCartItems([]); // If no user is logged in, don't fetch the cart
                    return;
                }

                // Step 1: Fetch Cart Data
                const cartQuerySnapshot = await getDocs(collection(db, 'Cart'));
                const cartData: Cart[] = cartQuerySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    cartID: doc.id,
                })) as Cart[];

                // Filter cart items by userID
                const filteredCartData = cartData.filter(
                    (cartItem) => cartItem.userID === userID,
                );

                // Step 2: Fetch Products for each Cart Item
                const productPromises = filteredCartData.map(
                    async (cartItem) => {
                        const productDocRef = collection(db, 'Products');
                        const productQuerySnapshot = await getDocs(
                            query(
                                productDocRef,
                                where('prodID', '==', cartItem.prodID),
                            ),
                        );
                        const productData =
                            productQuerySnapshot.docs[0]?.data() as Products;

                        // Step 3: Fetch Inventory Data for the Product
                        const inventoryDocRef = collection(db, 'Inventory');
                        const inventoryQuerySnapshot = await getDocs(
                            query(
                                inventoryDocRef,
                                where(
                                    'inventoryID',
                                    '==',
                                    productData.inventoryID,
                                ),
                            ),
                        );
                        const inventoryData =
                            inventoryQuerySnapshot.docs[0]?.data() as Inventory;

                        // Step 4: Check and adjust quantity
                        let cartQuantity = cartItem.qty;
                        if (cartQuantity > inventoryData.prodQty) {
                            // If cart quantity is greater than available stock, update to available stock
                            cartQuantity = inventoryData.prodQty;

                            // Optionally, you can update the cart in Firestore here:
                            const cartDocRef = doc(db, 'Cart', cartItem.cartID);
                            await updateDoc(cartDocRef, {qty: cartQuantity});
                        }

                        // Step 4: Get only the first image (p1)
                        const imgKey = productData.p1; // Access the p1 image

                        // Get category name by matching catID with categories state
                        const category =
                            categories.find(
                                (cat) => cat.catID === productData.catID,
                            )?.category || 'Unknown Category';

                        // Create the final product cart object
                        return {
                            cartID: cartItem.cartID,
                            prodID: productData.prodID,
                            userID: cartItem.userID,
                            prodName: productData.prodName,
                            category: category,
                            productPrice: productData.prodPrice,
                            // quantity: cartQuantity,
                            quantity: cartItem.qty,
                            img: imgKey, // Use only p1 image
                            genderID: productData.genderID,
                            inventory: inventoryData,
                        };
                    },
                );

                // Wait for all promises to resolve and update the state
                const resolvedProducts = await Promise.all(productPromises);
                setCartItems(resolvedProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        if (open) {
            fetchData();
        }
    }, [userID, open]); // Re-run the effect whenever the userID changes

    // Function to handle removing an item from the cart
    const handleRemoveFromCart = async (cartID: string) => {
        try {
            // Delete the cart item from Firestore
            const cartDocRef = doc(db, 'Cart', cartID);
            await deleteDoc(cartDocRef);

            // Update the cart state to remove the item from the UI
            setCartItems((prevItems) =>
                prevItems.filter((item) => item.cartID !== cartID),
            );
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    // If data is loading, display a loading indicator
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            className='relative z-50'
        >
            <DialogBackdrop
                transition
                className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0 '
            />

            <div className='fixed inset-0 overflow-hidden'>
                <div className='absolute inset-0 overflow-hidden'>
                    <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                        <DialogPanel
                            transition
                            className='pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 z-50'
                        >
                            <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                                <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                                    <div className='flex items-start justify-between'>
                                        <DialogTitle className='text-lg font-medium text-gray-900'>
                                            Shopping cart
                                        </DialogTitle>
                                        <div className='ml-3 flex h-7 items-center'>
                                            <button
                                                type='button'
                                                onClick={() => setOpen(false)}
                                                className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                                            >
                                                <span className='absolute -inset-0.5' />
                                                <span className='sr-only'>
                                                    Close panel
                                                </span>
                                                <XMarkIcon
                                                    aria-hidden='true'
                                                    className='h-6 w-6'
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className='mt-8'>
                                        <div className='flow-root'>
                                            <ul
                                                role='list'
                                                className='-my-6 divide-y divide-gray-200'
                                            >
                                                {cartItems.map((item) => (
                                                    <li
                                                        key={item.cartID}
                                                        className='flex py-6'
                                                    >
                                                        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                                            <img
                                                                // alt={
                                                                //     product.imageAlt
                                                                // }
                                                                src={
                                                                    assets[
                                                                        item.img
                                                                    ]
                                                                }
                                                                className='h-full w-full object-cover object-center'
                                                            />
                                                        </div>

                                                        <div className='ml-4 flex flex-1 flex-col'>
                                                            <div>
                                                                <div className='flex justify-between text-base font-medium text-gray-900'>
                                                                    <h3>
                                                                        <a
                                                                        // href={
                                                                        //     product.href
                                                                        // }
                                                                        >
                                                                            {
                                                                                item.prodName
                                                                            }
                                                                        </a>
                                                                    </h3>
                                                                    <p className='ml-4'>
                                                                        RM
                                                                        {
                                                                            item.productPrice
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <p className='mt-1 text-sm text-gray-500'>
                                                                    {
                                                                        item.category
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className='flex flex-1 items-end justify-between text-sm'>
                                                                <p className='text-gray-500'>
                                                                    Qty{' '}
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </p>

                                                                <div className='flex'>
                                                                    <button
                                                                        type='button'
                                                                        onClick={() =>
                                                                            handleRemoveFromCart(
                                                                                item.cartID,
                                                                            )
                                                                        }
                                                                        className='font-medium text-[tomato] hover:font-semibold hover:text-[tomato]'
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                                    <div className='flex justify-between text-base font-medium text-gray-900'>
                                        <p>Subtotal</p>
                                        <p>
                                            RM{' '}
                                            {cartItems
                                                .reduce(
                                                    (total, item) =>
                                                        total +
                                                        item.productPrice *
                                                            item.quantity,
                                                    0,
                                                )
                                                .toFixed(2)}
                                        </p>
                                    </div>
                                    <p className='mt-0.5 text-sm text-gray-500'>
                                        Shipping and taxes calculated at
                                        checkout.
                                    </p>
                                    <div className='mt-6'>
                                        <Link to={'Checkout'}>
                                            <a
                                                href='#'
                                                onClick={() => setOpen(false)}
                                                className='flex items-center justify-center rounded-md border border-transparent bg-[tomato] px-6 py-3 text-base font-medium text-white shadow-sm hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out'
                                            >
                                                Checkout
                                            </a>
                                        </Link>
                                    </div>

                                    <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                                        <p>
                                            or{' '}
                                            <button
                                                type='button'
                                                onClick={() => setOpen(false)}
                                                className='font-medium text-[tomato] hover:font-semibold hover:text-[tomato]'
                                            >
                                                Continue Shopping
                                                <span aria-hidden='true'>
                                                    {' '}
                                                    &rarr;
                                                </span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default Example;
