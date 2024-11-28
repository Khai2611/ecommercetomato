import React, {useState, useEffect} from 'react';
import Pagination from '../components/shopPage/Pagination';
import ProductBanner from '../components/shopPage/ProductBanner';
import ShopSideNav from '../components/shopPage/ShopSideNav';
import '../index.css';
import {db} from '@/firebase/firebaseConfig';
import {collection, getDocs} from 'firebase/firestore';
import {assets} from '@/assets/frontend_assets/assets';

interface Product {
    prodID: string;
    prodName: string;
    prodPrice: number;
    p1: keyof typeof assets; // Assuming this is the image URL or reference
    badge?: boolean;
    desc: string;
    catID: string;
    genderID: string;
}

const Shop: React.FC = () => {
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [sortOption, setSortOption] = useState<string>('HighLow');

    const itemsPerPageFromBanner = (itemsPerPage: number) => {
        setItemsPerPage(itemsPerPage);
    };

    const onSortChange = (sortOption: string) => {
        setSortOption(sortOption);
    };

    // // Fetch products from Firestore based on selected filters (category and gender)
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const productCollectionRef = collection(db, 'Products');
    //             const productSnapshot = await getDocs(productCollectionRef);
    //             let productList = productSnapshot.docs.map((doc) => doc.data());

    //             // Apply category filter if selected
    //             if (selectedCategory) {
    //                 productList = productList.filter(
    //                     (product) => product.catID === selectedCategory,
    //                 );
    //             }

    //             // Apply gender filter if selected
    //             if (selectedGender) {
    //                 productList = productList.filter(
    //                     (product) => product.genderID === selectedGender,
    //                 );
    //             }

    //             setProducts(productList);
    //         } catch (error) {
    //             console.error('Error fetching products: ', error);
    //         }
    //     };

    //     fetchProducts();
    // }, [selectedCategory, selectedGender]); // Re-run when filters change

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productCollectionRef = collection(db, 'Products');
                const querySnapshot = await getDocs(productCollectionRef);
                const productList: Product[] = [];

                querySnapshot.forEach((doc) => {
                    productList.push({
                        prodID: doc.id,
                        prodName: doc.data().prodName,
                        prodPrice: doc.data().prodPrice,
                        p1: doc.data().p1,
                        badge: doc.data().badge,
                        desc: doc.data().desc,
                        catID: doc.data().catID,
                        genderID: doc.data().genderID,
                    });
                });
                setProducts(productList);
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
        };

        fetchProducts();
    }, []); // Fetch products on mount

    // Filter products based on selected category and gender
    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory
            ? product.catID === selectedCategory
            : true;
        const matchesGender = selectedGender
            ? product.genderID === selectedGender
            : true;
        return matchesCategory && matchesGender;
    });

    // Sort the products based on selected sort option
    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOption === 'HighLow') {
            return b.prodPrice - a.prodPrice;
        } else if (sortOption === 'LowHigh') {
            return a.prodPrice - b.prodPrice;
        }
        return 0;
    });

    return (
        <div
            className='max-w-container mx-auto px-4'
            style={{marginTop: '150px'}}
        >
            {/* ================= Products Start here =================== */}
            <div className='w-full h-full flex pb-20 gap-10'>
                <div className='w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full'>
                    <ShopSideNav
                        setSelectedCategory={setSelectedCategory}
                        setSelectedGender={setSelectedGender}
                    />
                </div>
                <div className='w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10'>
                    <ProductBanner
                        itemsPerPageFromBanner={itemsPerPageFromBanner}
                        onSortChange={onSortChange}
                    />
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        products={sortedProducts}
                    />
                </div>
            </div>
            {/* ================= Products End here ===================== */}
        </div>
    );
};

export default Shop;
