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
                            price={item.prodPrice.toString()}
                            badge={item.badge}
                            des={item.desc}
                        />
                    </div>
                ))}
        </>
    );
}

interface PaginationProps {
    itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({itemsPerPage}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [itemOffset, setItemOffset] = useState<number>(0);
    const [itemStart, setItemStart] = useState<number>(1);

    // Fetch products from Firestore when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productCollectionRef = collection(db, 'Products');
                const productSnapshot = await getDocs(productCollectionRef);
                const productList = productSnapshot.docs.map(
                    (doc) => doc.data() as Product,
                );
                setProducts(productList);
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
        };

        fetchProducts();
    }, []);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event: {selected: number}) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
        setItemStart(newOffset + 1); // Adjusted to show correct item start
    };

    return (
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
