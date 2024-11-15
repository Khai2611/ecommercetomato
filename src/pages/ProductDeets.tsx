import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '@/firebase/firebaseConfig';

import {ProductDetailss} from '../components/ProductDetails/ProductDetailss';
import {ProductCarousell} from '../components/ProductDetails/ProductCarousell';
import {assets} from '@/assets/frontend_assets/assets';

interface Product {
    prodID: string;
    prodName: string;
    prodPrice: number;
    p1: keyof typeof assets;
    p2: keyof typeof assets;
    p3: keyof typeof assets;
    p4: keyof typeof assets;
    badge?: boolean;
    desc: string;
}

const ProductDeets = () => {
    const {id} = useParams();
    const [productData, setProductData] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchProductData = async () => {
                try {
                    const productRef = doc(db, 'Products', id); // Firestore document reference
                    const docSnap = await getDoc(productRef); // Fetch the document from Firestore

                    if (docSnap.exists()) {
                        setProductData(docSnap.data() as Product); // Set the product data if document exists
                    } else {
                        setError('Product not found'); // Handle the case where the document doesn't exist
                    }
                } catch (error) {
                    setError('Error fetching product data'); // Handle any errors during fetching
                } finally {
                    setLoading(false); // Stop loading when done
                }
            };

            fetchProductData();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Display loading indicator while fetching data
    }

    if (error) {
        return <div>{error}</div>; // Display error message if any error occurs
    }

    if (!productData) {
        return <div>Product not found</div>; // Handle case where product data is not found
    }

    // Destructure productData for easier use
    const {p1, p2, p3, p4} = productData;

    return (
        <section className='grid-cols-2 lg:grid justify-items-center lg:my-40'>
            <style>
                {`
          :root {
            font-size: 60.5%;
            -webkit-tap-highlight-color: transparent;
          }
        `}
            </style>
            <ProductCarousell p1={p1} p2={p2} p3={p3} p4={p4} />
            <ProductDetailss product={productData} />
        </section>
    );
};

export default ProductDeets;
