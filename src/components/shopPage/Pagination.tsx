import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import Products from '../shopPage/Products';

import {db} from '@/firebase/firebaseConfig';
import {collection, getDocs} from 'firebase/firestore';
import {assets} from '@/assets/frontend_assets/assets';

interface Product {
    prodID: string;
    prodName: string;
    prodPrice: number;
    p1: keyof typeof assets;
    badge?: boolean;
    desc: string;
    catID: string;
    genderID: string;
}

interface ItemsProps {
    currentItems: Product[];
}

function Items({currentItems}: ItemsProps) {
    return (
        <>
            {currentItems &&
                currentItems.map((item) => (
                    <div key={item.prodID} className='w-full'>
                        <Products
                            _id={item.prodID}
                            img={item.p1}
                            productName={item.prodName}
                            price={item.prodPrice}
                            badge={item.badge}
                            des={item.desc}
                            catID={item.catID}
                            genderID={item.genderID}
                        />
                    </div>
                ))}
        </>
    );
}

interface PaginationProps {
    itemsPerPage: number;
    products: Product[];
    // selectedCategory: string | null;
    // selectedGender: string | null;
}

const Pagination: React.FC<PaginationProps> = ({
    itemsPerPage,
    products,
    // selectedCategory,
    // selectedGender,
}) => {
    // const [products, setProducts] = useState<Product[]>([]);
    const [itemOffset, setItemOffset] = useState<number>(0);
    const [itemStart, setItemStart] = useState<number>(1);
    // const [selectedCategory, setSelectedCategory] = useState<string | null>(
    //     null,
    // );
    // const [selectedGender, setSelectedGender] = useState<string | null>(null);

    // const [loading, setLoading] = useState<boolean>(true); // Added loading state
    // const [error, setError] = useState<string | null>(null); // Added error state

    // // Fetch products from Firestore when the component mounts
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const productCollectionRef = collection(db, 'Products');
    //             const productSnapshot = await getDocs(productCollectionRef);
    //             const productList = productSnapshot.docs.map(
    //                 (doc) => doc.data() as Product,
    //             );
    //             setProducts(productList);
    //         } catch (error) {
    //             console.error('Error fetching products: ', error);
    //         }
    //     };

    //     fetchProducts();
    // }, []);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         setLoading(true); // Set loading state to true when fetching
    //         setError(null); // Reset error state
    //         try {
    //             const productCollectionRef = collection(db, 'Products');
    //             const productSnapshot = await getDocs(productCollectionRef);
    //             const productList = productSnapshot.docs.map(
    //                 (doc) => doc.data() as Product,
    //             );

    //             // Apply filters for category and gender
    //             let filteredProducts = productList;

    //             if (selectedCategory) {
    //                 filteredProducts = filteredProducts.filter(
    //                     (product) => product.catID === selectedCategory,
    //                 );
    //             }

    //             if (selectedGender) {
    //                 filteredProducts = filteredProducts.filter(
    //                     (product) => product.genderID === selectedGender,
    //                 );
    //             }

    //             setProducts(filteredProducts);
    //         } catch (error) {
    //             setError('Failed to fetch products. Please try again later.');
    //             console.error('Error fetching products: ', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchProducts();
    // }, [selectedCategory, selectedGender]); // Re-run the fetch when filters change

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event: {selected: number}) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
        setItemStart(newOffset + 1); // Adjusted to show correct item start
    };

    return (
        //1
        // <div>
        //     <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10'>
        //         <Items currentItems={currentItems} />
        //     </div>
        //     <div className='flex flex-col mdl:flex-row justify-center mdl:justify-between items-center'>
        //         <ReactPaginate
        //             nextLabel=''
        //             onPageChange={handlePageClick}
        //             pageRangeDisplayed={3}
        //             marginPagesDisplayed={2}
        //             pageCount={pageCount}
        //             previousLabel=''
        //             pageLinkClassName='w-9 h-9 border-[1px] border-lightColor hover:border-tomato duration-300 flex justify-center items-center'
        //             pageClassName='mr-6'
        //             containerClassName='flex text-base font-semibold font-titleFont py-10'
        //             activeClassName='bg-tomato text-white'
        //         />

        //         <p className='text-base font-normal text-lightText'>
        //             Products from {itemStart} to {endOffset} of{' '}
        //             {products.length}
        //         </p>
        //     </div>
        // </div>
        //2
        // <div>
        //     {loading ? (
        //         <div className='text-center'>Loading products...</div> // Loading message
        //     ) : error ? (
        //         <div className='text-center text-red-500'>{error}</div> // Error message
        //     ) : (
        //         <div>
        //             <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10'>
        //                 <Items currentItems={currentItems} />
        //             </div>
        //             <div className='flex flex-col mdl:flex-row justify-center mdl:justify-between items-center'>
        //                 <ReactPaginate
        //                     nextLabel=''
        //                     onPageChange={handlePageClick}
        //                     pageRangeDisplayed={3}
        //                     marginPagesDisplayed={2}
        //                     pageCount={pageCount}
        //                     previousLabel=''
        //                     pageLinkClassName='w-9 h-9 border-[1px] border-lightColor hover:border-tomato duration-300 flex justify-center items-center'
        //                     pageClassName='mr-6'
        //                     containerClassName='flex text-base font-semibold font-titleFont py-10'
        //                     activeClassName='bg-tomato text-white'
        //                 />

        //                 <p className='text-base font-normal text-lightText'>
        //                     Products from {itemStart} to {endOffset} of{' '}
        //                     {products.length}
        //                 </p>
        //             </div>
        //         </div>
        //     )}
        // </div>
        //3
        // <div>
        //     <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10'>
        //         {currentItems.map((item) => (
        //             <div key={item.prodID} className='w-full'>
        //                 <Products
        //                     _id={item.prodID}
        //                     img={item.p1}
        //                     productName={item.prodName}
        //                     price={item.prodPrice.toString()}
        //                     badge={item.badge}
        //                     des={item.desc}
        //                     catID={item.catID}
        //                     genderID={item.genderID}
        //                 />
        //             </div>
        //         ))}
        //     </div>
        //     <div className='flex flex-col mdl:flex-row justify-center mdl:justify-between items-center'>
        //         <ReactPaginate
        //             nextLabel=''
        //             onPageChange={handlePageClick}
        //             pageRangeDisplayed={3}
        //             marginPagesDisplayed={2}
        //             pageCount={pageCount}
        //             previousLabel=''
        //             pageLinkClassName='w-9 h-9 border-[1px] border-lightColor hover:border-tomato duration-300 flex justify-center items-center'
        //             pageClassName='mr-6'
        //             containerClassName='flex text-base font-semibold font-titleFont py-10'
        //             activeClassName='bg-tomato text-white'
        //         />
        //         <p className='text-base font-normal text-lightText'>
        //             Products from {itemStart} to {endOffset} of{' '}
        //             {products.length}
        //         </p>
        //     </div>
        // </div>
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10'>
                <Items currentItems={currentItems} />
            </div>
            <div className='flex flex-col mdl:flex-row justify-center mdl:justify-between items-center'>
                <ReactPaginate
                    nextLabel=''
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel=''
                    pageLinkClassName='w-9 h-9 border-[1px] border-lightColor hover:border-tomato duration-300 flex justify-center items-center'
                    pageClassName='mr-6'
                    containerClassName='flex text-base font-semibold font-titleFont py-10'
                    activeClassName='bg-tomato text-white'
                />
                <p className='text-base font-normal text-lightText'>
                    Products from {itemStart} to {endOffset} of{' '}
                    {products.length}
                </p>
            </div>
        </div>
    );
};

export default Pagination;
