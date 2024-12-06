import React, {useEffect, useState} from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/Accordion';
import ProductList from '../../orderHistory/ProductList';
import Title from '../../orderHistory/Title';

import {useProductData} from '@/hooks/useProductData';
import {useOrderData} from '@/hooks/useOrderData';
import {useOrderDetailsData} from '@/hooks/useOrderDetailsData';
import {Button} from '@/components/ui/Button';

const OrderHistory: React.FC = () => {
    const {orders, loading: ordersLoading, error: ordersError} = useOrderData();
    const [orderDetailss, setOrderDetails] = useState<any[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<any[]>([]);

    // Using useOrderDetailsData hook
    const {
        orderDetails: fetchedOrderDetails,
        loading: detailsLoading,
        error: detailsError,
    } = useOrderDetailsData({
        orders,
    });

    // Extract product IDs from orderDetails to fetch product data after orderDetails is fetched
    const prodIDs = fetchedOrderDetails.map((detail) => detail.prodID);

    // Fetch product data based on product IDs
    const products = useProductData(prodIDs);

    // Fetch and process the data once
    useEffect(() => {
        if (fetchedOrderDetails.length > 0) {
            // Set order details after fetching
            setOrderDetails(fetchedOrderDetails);

            // Now, filter the orders and combine with their respective products
            const combinedOrders = orders.map((order) => {
                const filteredOrderDetails = fetchedOrderDetails.filter(
                    (detail) => detail.orderID === order.orderID,
                );

                // Map the order details to their corresponding products
                const filteredProducts = filteredOrderDetails.map(
                    (orderDetail) => {
                        const product = products.find(
                            (prod) => prod.prodID === orderDetail.prodID,
                        );
                        return {
                            ...orderDetail,
                            product,
                        };
                    },
                );

                return {
                    ...order,
                    products: filteredProducts,
                };
            });

            // Sort the combinedOrders by date in descending order (newest first)
            const sortedOrders = combinedOrders.sort((a, b) => {
                // Make sure the date is converted to a comparable format
                const dateA = a.date.toDate(); // Convert Firestore Timestamp to Date
                const dateB = b.date.toDate();
                return dateB.getTime() - dateA.getTime(); // Sort in descending order
            });

            // setFilteredOrders(combinedOrders);
            setFilteredOrders(sortedOrders);
        }
    }, [fetchedOrderDetails, orders, products]);

    // Handle loading and error states
    if (ordersLoading || detailsLoading) {
        return <div>Loading...</div>;
    }

    if (ordersError || detailsError) {
        return <div>Error: {ordersError || detailsError}</div>;
    }

    // Handle button click to navigate to Invoice page with orderId
    const handleViewReceipt = (orderId: string) => {
        const invoiceUrl = `/invoice/${orderId}`;
        window.open(invoiceUrl, '_blank');
    };

    return (
        <div className='max-w-1xl mx-auto px-2 mb-10'>
            <div className='space-y-5'>
                {filteredOrders.map((order) => (
                    <Accordion
                        key={order.orderID}
                        type='single'
                        collapsible
                        className='w-full border rounded-2xl shadow-md'
                    >
                        <AccordionItem value={order.orderID}>
                            <AccordionTrigger className='mx-5'>
                                <Title
                                    orderId={order.orderID}
                                    orderDate={order.date
                                        .toDate()
                                        .toLocaleDateString()}
                                />
                            </AccordionTrigger>
                            <AccordionContent className='border'>
                                <ProductList
                                    products={order.products.map(
                                        (detail: {product: any; qty: any}) => ({
                                            ...detail.product,
                                            quantity: detail.qty,
                                        }),
                                    )}
                                />
                                <hr></hr>
                                <div className='flex justify-end mt-4'>
                                    <Button
                                        onClick={() =>
                                            handleViewReceipt(order.orderID)
                                        }
                                        className='text-white bg-tomato hover:bg-white hover:text-tomato hover:border hover:border-tomato ml-auto mr-4'
                                    >
                                        View Receipt
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
