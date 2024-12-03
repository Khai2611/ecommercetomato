import {useEffect, useState} from 'react';
import {getDocs, collection} from 'firebase/firestore';
import {db} from '@/firebase/firebaseConfig';

interface Category {
    catID: string;
    category: string;
}

export const useCategoryData = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                // Retrieve all categories from the Category collection
                const categorySnapshot = await getDocs(
                    collection(db, 'Category'),
                );
                const categoryData = categorySnapshot.docs.map(
                    (doc) => doc.data() as Category,
                );
                setCategories(categoryData); // Update state with the fetched data
            } catch (error) {
                console.error('Error fetching category data: ', error);
            }
        };

        fetchCategoryData();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return categories;
};
