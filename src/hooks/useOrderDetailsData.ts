import {useEffect, useState} from 'react';
import {getDocs, collection, query, where, Timestamp} from 'firebase/firestore';
import {db} from '@/firebase/firebaseConfig';

interface OrderDetail {
    orderDeetsID: string;
    orderID: string;
    price: number;
    prodID: string;
    qty: number;
}

interface Order {
    orderID: string;
    userID: string;
    date: Timestamp;
}

interface useOrderDetailsDataProps {
    orders: Order[];
}

export const useOrderDetailsData = ({orders}: useOrderDetailsDataProps) => {
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (orders.length > 0) {
            const fetchOrderDetails = async () => {
                setLoading(true);
                setError(null); // Reset error state before fetching
                try {
                    // Fetch details for each order
                    const orderDetailPromises = orders.map(async (order) => {
                        // console.log(
                        //     'Fetching order details for orderID:',
                        //     order.orderID,
                        // );
                        const orderDetailQuery = query(
                            collection(db, 'OrderDetails'),
                            where('orderID', '==', order.orderID),
                        );
                        const orderDetailSnapshot = await getDocs(
                            orderDetailQuery,
                        );
                        return orderDetailSnapshot.docs.map(
                            (doc) => doc.data() as OrderDetail,
                        );
                    });

                    // Wait for all order details to be fetched
                    const allOrderDetails = await Promise.all(
                        orderDetailPromises,
                    );
                    setOrderDetails(allOrderDetails.flat()); // Flatten the array
                } catch (err) {
                    console.error('Error fetching order details:', err);
                    setError('Failed to fetch order details');
                } finally {
                    setLoading(false);
                }
            };

            fetchOrderDetails();
        }
    }, [orders]);

    return {orderDetails, loading, error};
};
