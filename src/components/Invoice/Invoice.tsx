import React, {useState, useEffect} from 'react';
import './Invoice.css'; // Importing the CSS file
import {assets} from '../../assets/frontend_assets/assets';
import {useNavigate, useParams} from 'react-router-dom';
import {useInvoiceData} from '@/hooks/useInvoiceData';
import {useUserData} from '@/hooks/useUserData';
import {useOrderDetailsData} from '@/hooks/useOrderDetailsData';
import {useProductData} from '@/hooks/useProductData';

const Invoice: React.FC = () => {
    const {orderId} = useParams<{orderId: any}>(); // Get orderId from URL params (ensure your routing provides this)
    // console.log('orderId:', orderId);

    // const {invoiceData, loading, error} = useInvoiceData(orderId); // Use the invoice data hook

    const [userFullName, setUserFullName] = useState<string>('');

    const {orderData, shippingAddress2, loading, error} =
        useInvoiceData(orderId);
    const {user, error: userError} = useUserData(orderData?.userID || '');
    // Use the orderDetails hook
    const {
        orderDetails,
        loading: orderDetailsLoading,
        error: orderDetailsError,
        productPurchaseCount,
    } = useOrderDetailsData({
        orders: orderData ? [orderData] : [], // Pass the order data to the hook
    });

    // Extract the product IDs from orderDetails to fetch product data
    const prodIDs = orderDetails.map((orderDetail) => orderDetail.prodID);
    const products = useProductData(prodIDs);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const fullName = `${user.firstName} ${user.lastName}`;
            setUserFullName(fullName);
        }
    }, [user]); // This effect only runs when 'user' data changes

    // Handle case when orderId is not provided (undefined)
    if (!orderId) {
        return <div>Error: Order ID is missing!</div>;
    }
    // Return early while loading or if there's an error
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || orderDetailsError) {
        return <div>Error: {error || orderDetailsError}</div>;
    }

    // Navigate to the home page ("/") when logo or back button is clicked
    const handleNavigateHome = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className='app-container'>
            {/* Container */}
            <div className='content-container'>
                {/* Header Section */}
                <div className='header'>
                    <div className='logo' onClick={handleNavigateHome}>
                        <img src={assets.logo} alt='Logo' />
                    </div>
                    <div className='back-to-home'>
                        <button
                            className='back-button'
                            onClick={handleNavigateHome}
                        >
                            Back to Home
                        </button>
                    </div>
                </div>

                {/* Purchase Section */}
                <div className='purchase-section'>
                    {/* Text Column */}
                    <div className='purchase-text'>
                        <h1>
                            <strong>Thanks for your purchase!</strong>
                        </h1>
                        <p className='order-id'>Order ID: {orderId}</p>
                        <p>Date Purchased: {orderData?.date}</p>
                    </div>

                    {/* Image Column */}
                    <div className='purchase-image'>
                        <img src={assets.autumnn} alt='Purchase' />
                    </div>
                </div>
            </div>

            {/* Invoice Section */}
            <div className='invoice-section'>
                <h1>
                    <strong>Here's your purchase:</strong>
                </h1>

                {/* Invoice Card */}
                <div className='invoice-card'>
                    <p className='invoice-for'>Invoice for:</p>
                    <p className='invoice-name'>{userFullName}</p>
                    <p className='invoice-address'>{shippingAddress2}</p>

                    {/* Scrollable Product Items */}
                    <div
                        className='product-items-container mt-5'
                        style={{
                            maxHeight: '600px',
                            overflowY: 'auto',
                        }}
                    >
                        {orderDetails.length > 0 ? (
                            orderDetails.map((orderDetail) => {
                                const product = products.find(
                                    (prod) =>
                                        prod.prodID === orderDetail.prodID,
                                );
                                return (
                                    <div
                                        className='product-item'
                                        key={orderDetail.orderDeetsID}
                                    >
                                        <div className='product-image'>
                                            <img
                                                src={assets[product?.p1 || '']}
                                                alt={product?.prodName}
                                            />
                                        </div>

                                        <div className='product-text'>
                                            <h3>
                                                {product?.prodName} x
                                                {orderDetail.qty}
                                            </h3>
                                            <p>{product?.desc}</p>
                                        </div>

                                        <div className='product-price'>
                                            <p>RM {product?.prodPrice}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>No products found for this order.</div>
                        )}
                    </div>

                    <div className='subtotal1'>
                        <p className='subtotal-text'>Subtotal</p>
                        <p className='subtotal-text'>
                            RM{' '}
                            {orderData?.totalPrice
                                ? (orderData.totalPrice - 15).toFixed(2)
                                : '0.00'}
                        </p>
                    </div>

                    <div className='subtotal1 no-border'>
                        <p className='subtotal-text'>Shipping fee</p>
                        <p className='subtotal-text'>RM 15.00</p>
                    </div>

                    <div className='subtotal1 no-border'>
                        <p className='subtotal-text'>Total</p>
                        <p className='subtotal-text'>
                            RM {orderData?.totalPrice?.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* <div className="thank-you alignment">
                <a
                  href="http://example.com"
                  className="thank-you-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Thanks for shopping with us!<br />Sincerely, Deloitte ❤️</span>
                </a>
              </div>
              <div className="social-follow">
                <p>
                  Stay up-to-date with our latest collection by following us on your
                  favorite social media channels.
                </p>
              </div> */}

                <div className='thank-you alignment'>
                    <p className='thank-you-text'>
                        Thanks for shopping with us!
                        <br />
                        Sincerely, TOMATO ❤️
                    </p>
                </div>
                <div className='social-follow'>
                    <p>
                        Stay up-to-date with our latest collection by following
                        us on your favorite social media channels.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
