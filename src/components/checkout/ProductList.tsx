import {useEffect, useState} from 'react';
import {getUserData} from '@/utils/auth';
import {useNavigate} from 'react-router-dom';
import {assets} from '@/assets/frontend_assets/assets';
import {useCategoryData} from '@/hooks/useCategoryData';

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

interface ProductListProps {
    products: (Product & Cart)[];
}

function ProductList({products}: ProductListProps) {
    const [userID, setUserID] = useState<string | null>(null);

    const navigate = useNavigate();
    const categories = useCategoryData();

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

    // Function to get category name by matching catID
    const getCategoryName = (catID: string) => {
        const category = categories.find((cat) => cat.catID === catID);
        return category ? category.category : 'Loading...'; // Return category name or fallback
    };

    return (
        <div className='space-y-4 p-4 divide-y divide-gray-300 max-w-xl'>
            <h2 className='text-3xl font-semibold mb-5'>Order Summary</h2>
            <div className='max-h-[350px] overflow-y-auto'>
                {products.map((item, index) => (
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
                                Category: {getCategoryName(item.catID)}
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
                        {products.reduce(
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
                    {products.reduce(
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
