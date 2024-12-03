import p1 from '../../assets/frontend_assets/p1.jpg';
import {Button} from '../ui/Button';
import {assets} from '@/assets/frontend_assets/assets';
import {useCategoryData} from '@/hooks/useCategoryData';

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
    quantity: number;
}

interface ProductListProps {
    products: Product[];
}

function ProductList({products}: ProductListProps) {
    // Fetch categories using the custom hook
    const categories = useCategoryData();

    // Function to find category name based on catID
    const getCategoryName = (catID: string) => {
        const category = categories.find(
            (category) => category.catID === catID,
        );
        return category ? category.category : 'Unknown Category'; // Return category name or 'Unknown Category' if not found
    };

    return (
        <div className='space-y-4 p-4 divide-y divide-gray-300 '>
            {products.map((product) => (
                <div key={product.prodID} className='flex items-start p-4'>
                    <img
                        src={assets[product.p1]}
                        alt='Product'
                        className='w-24 h-24 object-cover mr-4 rounded'
                    />

                    <div className='flex-grow text-left'>
                        <h2 className='text-lg font-semibold'>
                            {product.prodName}
                        </h2>
                        <div className='mt-6'>
                            <p className='text-gray-500'>
                                Variation: {getCategoryName(product.catID)}
                            </p>
                            <p className='text-gray-500'>
                                Quantity: {product.quantity}
                            </p>
                        </div>
                    </div>

                    <div className='text-center'>
                        <p className='text-lg font-semibold'>
                            RM{product.prodPrice}
                        </p>
                        <Button className='mt-8 text-white bg-tomato hover:bg-white hover:text-tomato hover:border hover:border-tomato'>
                            Buy Again
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
