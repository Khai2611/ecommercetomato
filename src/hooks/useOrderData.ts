import {useEffect, useState} from 'react';
import {getDocs, collection, query, where, Timestamp} from 'firebase/firestore';
import {db} from '@/firebase/firebaseConfig';
import {getUserData} from '@/utils/auth';

interface Order {
    orderID: string;
    userID: string;
    date: Timestamp;
}

export const useOrderData = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [userID, setUserID] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const userData = getUserData(); // Get user data from localStorage or context
        if (userData) {
            setUserID(userData.userID); // Set userID if user is logged in
        }
    }, []);

    useEffect(() => {
        if (userID) {
            const fetchOrderData = async () => {
                setLoading(true);
                setError(null); // Reset error state before fetching
                try {
                    const orderQuery = query(
                        collection(db, 'Order'),
                        where('userID', '==', userID),
                    );
                    const orderSnapshot = await getDocs(orderQuery);
                    const orderData = orderSnapshot.docs.map(
                        (doc) => doc.data() as Order,
                    );
                    setOrders(orderData);
                } catch (err) {
                    console.error('Error fetching order data:', err);
                    setError('Failed to fetch orders');
                } finally {
                    setLoading(false);
                }
            };

            fetchOrderData();
        }
    }, [userID]);

    // console.log(orders);
    return {orders, loading, error};
};
