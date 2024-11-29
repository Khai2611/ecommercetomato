import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import NavTitle from './NavTitle';
import {db} from '@/firebase/firebaseConfig';
import {collection, getDocs} from 'firebase/firestore';

interface Category {
    _id: string;
    title: string;
    icons?: boolean;
}

interface CategoryProps {
    icons?: boolean;
    setSelectedCategory: (category: string) => void;
    selectedCategoryId: string | null;
}

const Category: React.FC<CategoryProps> = ({
    selectedCategoryId,
    setSelectedCategory,
    icons,
}) => {
    const [showItems] = useState<boolean>(true);
    const [selectedItem, setSelectedItem] = useState<string | null>(
        selectedCategoryId,
    ); // State to track selected item
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    // const items: Item[] = [
    //     {_id: 990, title: 'Shirts', icons: true},
    //     {_id: 991, title: 'Pants'},
    //     {_id: 992, title: 'Sweaters', icons: true},
    // ];

    useEffect(() => {
        // Fetch categories from Firestore when component mounts
        const fetchCategories = async () => {
            setLoading(true); // Start loading
            setError(null); // Clear any previous errors
            try {
                const querySnapshot = await getDocs(collection(db, 'Category'));
                const categoryList: Category[] = [];
                querySnapshot.forEach((doc) => {
                    categoryList.push({
                        _id: doc.id, // Firestore document ID is used as _id
                        title: doc.data().category, // Assuming 'category' is the attribute in Firestore
                    });
                });
                setCategories(categoryList);
            } catch (error) {
                setError('Error fetching categories. Please try again later.');
                console.error('Error fetching categories: ', error);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchCategories();
    }, []);

    const handleClick = (id: string) => {
        setSelectedItem(id); // Update the selected item ID
        setSelectedCategory(id); // Pass the selected category to the parent
    };

    return (
        <div>
            <div className='cursor-pointer' style={{marginTop: '70px'}}>
                <NavTitle title='Shop by Category' icons={false} />
            </div>
            {loading && <div>Loading categories...</div>} {/* Loading state */}
            {error && <div className='text-red-500'>{error}</div>}{' '}
            {/* Error state */}
            {showItems && (
                <motion.div
                    initial={{y: -20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.5}}
                >
                    <ul className='flex flex-col gap-4 text-sm lg:text-base text-[#767676]'>
                        {categories.map((item) => (
                            <li
                                key={item._id}
                                onClick={() => handleClick(item._id)}
                                className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 duration-300 cursor-pointer
                  ${
                      selectedItem === item._id
                          ? 'text-tomato border-tomato scale-95'
                          : 'hover:text-tomato hover:border-tomato'
                  }
                `}
                                style={{
                                    transform:
                                        selectedItem === item._id
                                            ? 'scale(0.95)'
                                            : 'scale(1)',
                                    transition: 'transform 0.2s',
                                }}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default Category;
