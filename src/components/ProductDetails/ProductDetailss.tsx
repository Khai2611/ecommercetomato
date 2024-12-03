'use client';
import React, {useState, useEffect} from 'react';
import {Button} from '../ui/Button2';
import {MinusIcon, PlusIcon, CartIcon} from '../ui/Icons';
import {Accordion} from '../ui/Accordion2';
import {doc, getDoc, collection, addDoc, updateDoc} from 'firebase/firestore';
import {db} from '@/firebase/firebaseConfig';
import {getUserData, isUserLoggedIn} from '@/utils/auth';
import {useToast} from '@/hooks/use-toast';
import {useNavigate} from 'react-router-dom';
import {BsWindowSidebar} from 'react-icons/bs';
import {useCartData} from '@/hooks/useCartData';

interface ProductDetailssProps {
    product: {
        prodID: string;
        prodName: string;
        prodPrice: number;
        desc: string;
        badge?: boolean;
        inventoryID: string;
    };
}

export const ProductDetailss: React.FC<ProductDetailssProps> = ({product}) => {
    const {prodID, prodName, prodPrice, desc, badge, inventoryID} = product;
    const [itemQty, setItemQty] = useState(1); // Manage quantity locally
    const [prodQty, setProdQty] = useState<number | null>(null); // Track product quantity
    const [showMsg, setShowMsg] = useState(false); // Show update message
    const [loading, setLoading] = useState(true); // Track loading state for product quantity
    const [error, setError] = useState<string | null>(null); // Track any errors
    const {toast} = useToast();

    const navigate = useNavigate();
    const cart = useCartData();

    // Fetch product quantity from Firestore
    useEffect(() => {
        const fetchProdQty = async () => {
            try {
                const inventoryRef = doc(db, 'Inventory', inventoryID);
                const inventorySnap = await getDoc(inventoryRef);

                if (inventorySnap.exists()) {
                    setProdQty(inventorySnap.data()?.prodQty || 0); // Set quantity from Firestore
                } else {
                    setError('Product not found in inventory');
                }
            } catch (error) {
                setError('Error fetching product quantity');
                console.error('Error fetching prodQty: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProdQty();
    }, [inventoryID]);

    // const handleAddToCart = () => {
    //     console.log(`Added ${itemQty} ${prodName} ${prodID}`);
    //     setShowMsg(true);
    //     setTimeout(() => setShowMsg(false), 2000);
    // };
    const handleAddToCart = async () => {
        // Check if the user is logged in
        const userData = getUserData();
        if (!isUserLoggedIn() || !userData) {
            // If not logged in, show toast asking to login
            toast({
                title: 'Login Required',
                description: 'Please log in first to add items to your cart.',
            });
            return; // Exit the function
        }

        // If user is logged in, add the item to the cart
        const {userID} = userData;

        // Check if the product already exists in the cart
        const existingProductInCart = cart.find(
            (item) => item.prodID === prodID,
        );
        console.log(existingProductInCart);
        if (existingProductInCart) {
            // Product exists in the cart, update the quantity
            const newQty = existingProductInCart.qty + itemQty;

            try {
                if (!existingProductInCart.cartID) {
                    throw new Error('CartID is missing.');
                }
                // Update the cart with the new quantity
                const cartDocRef = doc(
                    db,
                    'Cart',
                    existingProductInCart.cartID,
                );
                await updateDoc(cartDocRef, {qty: newQty});

                // Show success message
                toast({
                    title: 'Quantity Updated',
                    description: `${itemQty} more ${prodName} added to your cart!`,
                });
            } catch (error) {
                console.error(
                    'Error updating product quantity in cart:',
                    error,
                );
                toast({
                    title: 'Error',
                    description:
                        'There was an error updating the product quantity.',
                });
            }
        } else {
            // Product does not exist in the cart, add a new entry
            try {
                // Add product to the cart
                const cartDocRef = await addDoc(collection(db, 'Cart'), {
                    prodID,
                    userID,
                    qty: itemQty,
                    createdAt: new Date(),
                });

                // Get the generated cartID (Firestore auto-generated document ID)
                const cartID = cartDocRef.id;

                // Update the new product entry with cartID
                await updateDoc(cartDocRef, {
                    cartID, // Add the cartID field to the document
                });

                // Show success message
                toast({
                    title: 'Item Added',
                    description: `${itemQty} ${prodName} added to your cart!`,
                });
            } catch (error) {
                console.error('Error adding product to cart:', error);
                toast({
                    title: 'Error',
                    description:
                        'There was an error adding the product to the cart.',
                });
            }
        }

        // Show the cart updated message
        setShowMsg(true);
        setTimeout(() => setShowMsg(false), 2000);

        navigate('/'); // Redirect to homepage or cart page

        // try {
        //     // Add product data to Cart collection
        //     await addDoc(collection(db, 'Cart'), {
        //         prodID,
        //         userID,
        //         qty: itemQty,
        //         createdAt: new Date(),
        //     });

        //     // Show success message
        //     toast({
        //         title: 'Item Added',
        //         description: `${itemQty} ${prodName} added to cart!`,
        //     });
        //     setShowMsg(true);
        //     setTimeout(() => setShowMsg(false), 2000);

        //     navigate('/');
        // } catch (error) {
        //     console.error('Error adding product to cart: ', error);
        //     toast({
        //         title: 'Error',
        //         description:
        //             'There was an error adding the product to the cart.',
        //     });
        // }
    };

    return (
        <section
            style={{marginTop: '90px'}}
            className='m-8 mb-40 justify-self-start lg:max-w-3xl lg:m-0'
        >
            <div className='grid gap-4 mb-8 mt-10'>
                <h3 className='text-3xl font-bold tracking-wider text-Orange/100'>
                    Tomato.
                </h3>
                <h2 className='mb-4 text-5xl font-bold capitalize text-Very_dark_blue'>
                    {prodName}
                </h2>

                <Accordion header='Product Description'>
                    <p className='px-8 py-12 text-2xl lg:text-[1.6rem] text-Orange'>
                        {desc}
                    </p>
                </Accordion>
            </div>

            <div className='grid gap-8'>
                <div className='flex items-center justify-between lg:flex-col lg:items-start lg:gap-8'>
                    <div className='flex items-center gap-8'>
                        <span className='text-4xl font-bold'>
                            RM {prodPrice.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* <div className='mt-10'>
                <span className='font-semibold bg-Pale_orange text-Orange px-3 py-1 rounded-md text-3xl'>
                    {inventoryID}
                    10 products ready for purchase
                </span>
            </div> */}

            <div className='mt-10'>
                {loading ? (
                    <span className='font-semibold bg-Pale_orange text-Orange px-3 py-1 rounded-md text-3xl'>
                        Loading product availability...
                    </span>
                ) : error ? (
                    <span className='font-semibold bg-red-500 text-white px-3 py-1 rounded-md text-3xl'>
                        Error: {error}
                    </span>
                ) : (
                    <span className='font-semibold bg-Pale_orange text-Orange px-3 py-1 rounded-md text-3xl'>
                        {prodQty} products ready for purchase
                    </span>
                )}
            </div>

            <div className='lg:flex lg:items-center lg:gap-6'>
                {/* Add or minus cart button */}
                <div className='relative flex items-center justify-between gap-4 px-4 py-6 my-16 bg-Very_light_grayish_blue rounded-xl lg:w-1/2'>
                    <Button
                        title='decrease quantity'
                        onClick={() => {
                            setItemQty((prevQty) =>
                                prevQty > 1 ? prevQty - 1 : 1,
                            ); // Decrease quantity
                            setShowMsg(false); // Hide message when adjusting quantity
                        }}
                        rounded={'full'}
                        className='p-2 focus-visible:outline-dotted active:translate-y-px hover:bg-Very_light_grayish_blue'
                    >
                        <MinusIcon className='stroke-Orange w-7 h-7' />
                    </Button>

                    <span className='text-2xl font-bold lg:text-2xl'>
                        {itemQty}
                    </span>

                    <Button
                        title='increase quantity'
                        onClick={() => {
                            setItemQty(
                                (prevQty) =>
                                    prevQty < prodQty! ? prevQty + 1 : prodQty!, // Prevent exceeding stock quantity
                            ); // Increase quantity
                            setShowMsg(false); // Hide message when adjusting quantity
                        }}
                        rounded={'full'}
                        className='p-2 focus-visible:outline-dotted active:translate-y-px hover:bg-Very_light_grayish_blue'
                    >
                        <PlusIcon className='stroke-Orange w-7 h-7' />
                    </Button>

                    <p
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 pt-4 text-2xl text-green-500 font-bold capitalize ${
                            showMsg
                                ? 'translate-y-10 opacity-100 visible'
                                : 'opacity-0 invisible'
                        } transition-[transform,opacity] duration-300`}
                    >
                        cart updated
                    </p>
                </div>

                <Button
                    hasRipple
                    fullWidth
                    title='add item to cart'
                    variant={'secondary_orange'}
                    className='flex items-center justify-center gap-8 shadow-xl shadow-Orange/30 lg:w-2/3'
                    onClick={handleAddToCart}
                >
                    <CartIcon className='w-8 h-8 lg:w-10 lg:w-10 fill-Very_light_grayish_blue' />
                    <span>Add to cart</span>
                </Button>
            </div>
        </section>
    );
};
