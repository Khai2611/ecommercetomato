import {useEffect, useState} from 'react';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '@/firebase/firebaseConfig';
import {getUserData} from '@/utils/auth';

interface Cart {
    cartID: string;
    prodID: string;
    qty: number;
    userID: string;
}

export const useCartData = () => {
    const [cart, setCart] = useState<Cart[]>([]);
    const [userID, setUserID] = useState<string | null>(null);

    useEffect(() => {
        const userData = getUserData(); // Get user data from localStorage or context
        if (userData) {
            setUserID(userData.userID); // Set userID if user is logged in
        }
    }, []);

    useEffect(() => {
        if (userID) {
            const fetchCartData = async () => {
                const cartQuery = query(
                    collection(db, 'Cart'),
                    where('userID', '==', userID),
                );
                const cartSnapshot = await getDocs(cartQuery);
                const cartData = cartSnapshot.docs.map(
                    (doc) => doc.data() as Cart,
                );
                setCart(cartData);
            };

            fetchCartData();
        }
    }, [userID]);

    return cart;
};
