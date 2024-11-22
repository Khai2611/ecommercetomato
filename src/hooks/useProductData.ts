import {useEffect, useState} from 'react';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '@/firebase/firebaseConfig';

import {assets} from '@/assets/frontend_assets/assets';

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

export const useProductData = (prodIDs: string[]) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (prodIDs.length > 0) {
            const fetchProductData = async () => {
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
    }, [prodIDs]);

    return products;
};
