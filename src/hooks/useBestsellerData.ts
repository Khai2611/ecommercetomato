import {useEffect, useState} from 'react';
import {getDocs, collection} from 'firebase/firestore';
import {db} from '@/firebase/firebaseConfig'; // Firestore config

import {assets} from '@/assets/frontend_assets/assets'; // Asset references

// Define Product and Inventory Types
interface Product {
    prodID: string;
    p1: keyof typeof assets;
    p2: keyof typeof assets;
    p3: keyof typeof assets;
    p4: keyof typeof assets;
    desc: string;
    prodName: string;
    prodPrice: number;
    catID: string;
    genderID: string;
    inventoryID: string;
}

interface Inventory {
    inventoryID: string;
    prodID: string;
    prodQty: number;
    soldQty: number;
}

export const useBestsellerData = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [inventoryData, setInventoryData] = useState<Inventory[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all products
                const productsSnapshot = await getDocs(
                    collection(db, 'Products'),
                );
                const productData = productsSnapshot.docs.map(
                    (doc) => doc.data() as Product,
                );

                // Fetch all inventory data
                const inventorySnapshot = await getDocs(
                    collection(db, 'Inventory'),
                );
                const inventoryData = inventorySnapshot.docs.map(
                    (doc) => doc.data() as Inventory,
                );

                // Combine product data with inventory soldQty
                const combinedData = productData.map((product) => {
                    const inventory = inventoryData.find(
                        (item) => item.prodID === product.prodID,
                    );
                    return {
                        ...product,
                        soldQty: inventory ? inventory.soldQty : 0, // Default to 0 if no inventory record
                    };
                });

                // Sort products by soldQty in descending order to get bestsellers
                const sortedProducts = combinedData.sort(
                    (a, b) => b.soldQty - a.soldQty,
                );

                // Set the sorted bestsellers
                setProducts(sortedProducts);
            } catch (error) {
                console.error(
                    'Error fetching product or inventory data: ',
                    error,
                );
            }
        };

        fetchData();
    }, []);

    return products; // Return sorted bestsellers
};
