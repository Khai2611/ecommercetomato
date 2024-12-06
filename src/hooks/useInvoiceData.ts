//useInvoice

import {useState, useEffect} from 'react';
import {getDoc, doc, Timestamp} from 'firebase/firestore';
import {db} from '@/firebase/firebaseConfig';

interface Order {
    address: string;
    city: string;
    country: string;
    date: String;
    orderID: string;
    postalCode: string;
    state: string;
    totalPrice: number;
    userID: string;
}

export const useInvoiceData = (orderId: string) => {
    const [orderData, setOrderData] = useState<Order | null>(null);
    const [shippingAddress2, setShippingAddress] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                // Reference to the specific order document
                const orderRef = doc(db, 'Order', orderId);
                const orderSnap = await getDoc(orderRef);

                if (orderSnap.exists()) {
                    const data = orderSnap.data() as Order;
                    // Check if 'date' is a Timestamp, if so, convert it to a Date string
                    let formattedDate = '';
                    if (data.date instanceof Timestamp) {
                        const orderDate = data.date.toDate(); // Convert Timestamp to Date object
                        formattedDate = orderDate.toLocaleString(); // Format the date as string
                    } else {
                        formattedDate = data.date as string; // If it's already a string, use it directly
                    }

                    // Combine the address fields into a single shipping address string
                    const shippingAddress = `${data.address}, ${data.city}, ${data.state}, ${data.postalCode}, ${data.country}`;

                    setShippingAddress(shippingAddress);

                    // Log the fetched order data with formatted date
                    console.log('Fetched Order Data:', {
                        ...data,
                        date: formattedDate,
                        shippingAddress,
                    });

                    // Set the order data with the formatted date
                    setOrderData({...data, date: formattedDate});
                } else {
                    setError('Order not found');
                    console.log('Order not found');
                }
            } catch (err) {
                setError('Failed to fetch order data');
                console.error('Error fetching order data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [orderId]); // This hook runs when the orderId changes

    return {orderData, shippingAddress2, loading, error};
};
