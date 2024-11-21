import {useEffect, useState} from 'react';
import {ProfileForm} from '../components/checkout/ProfileForm';
import ProductList from '../components/checkout/ProductList';

import {useCartData} from '@/hooks/useCartData';
import {useProductData} from '@/hooks/useProductData';

const CheckoutForm = () => {
    // Get cart data using the useCartData hook
    const cart = useCartData();

    // Extract all the product IDs from the cart to fetch the product details
    const prodIDs = cart.map((item) => item.prodID);

    // Get product data using the useProductData hook with the product IDs
    const products = useProductData(prodIDs);

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
        <div className='flex flex-col space-y-4 lg:flex-row lg:space-x-4 mt-10'>
            <div className='flex-1 flex items-start justify-center bg-zinc-100 rounded'>
                <div
                    className='w-full max-w-xl mt-4'
                    style={{marginTop: '110px'}}
                >
                    <ProductList products={cartProductDetails} />
                </div>
            </div>
            <div
                className='flex-1 flex items-start justify-center'
                style={{marginTop: '110px'}}
            >
                <div className='w-full max-w-xl '>
                    <ProfileForm cart={cartProductDetails} />
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
