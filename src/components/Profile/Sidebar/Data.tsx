import React, {useState, useEffect} from 'react';
import {Box, Text, VStack} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {logoutUser} from '@/utils/auth';
import {useOrderData} from '@/hooks/useOrderData';
import {useAccountData} from '@/hooks/useAccountData';
import {useOrderDetailsData} from '@/hooks/useOrderDetailsData';
import {Spinner} from '@chakra-ui/react';

// Define the type for the items in the list
interface ListItem {
    id: number;
    name: string;
    value: number | string;
    color: string;
}

const Data: React.FC = () => {
    const navigate = useNavigate(); // To navigate to the login page after logout

    // Fetch order data using useOrderData hook
    const {orders, loading: orderLoading, error: orderError} = useOrderData();

    // Fetch account creation date using useAccountData hook
    const {
        accountCreationDate,
        loading: accountLoading,
        error: accountError,
    } = useAccountData();

    // Fetch order details and calculate product purchases using useOrderDetailsData hook
    const {
        productPurchaseCount,
        loading: orderDetailsLoading,
        error: orderDetailsError,
    } = useOrderDetailsData({orders});

    // Combine loading states from all hooks
    const isLoading = orderLoading || accountLoading || orderDetailsLoading;
    const hasError = orderError || accountError || orderDetailsError;

    const list: ListItem[] = [
        {
            id: 1,
            name: 'Product Purchase',
            value: productPurchaseCount,
            color: '#ed9b13',
        },
        {
            id: 2,
            name: 'Total Orders',
            value: orders.length,
            color: '#36c537',
        },
        {
            id: 3,
            name: 'Account created on',
            value: accountCreationDate
                ? accountCreationDate.toLocaleDateString()
                : 'N/A',
            color: '#4164e3',
        },
    ];

    // Handle the logout action
    const handleLogout = () => {
        logoutUser(); // Clear session data from localStorage
        navigate('/'); // Redirect user to the login page
    };
    return (
        <VStack as='ul' spacing={0} listStyleType='none'>
            {/* Display loading spinner if any hook is loading */}
            {isLoading ? (
                <Box w='full' display='flex' justifyContent='center' py={5}>
                    <Spinner size='lg' />
                </Box>
            ) : hasError ? (
                // Display error message if any hook has an error
                <Text color='red.500' fontSize='lg' textAlign='center' py={5}>
                    Error: {orderError || accountError || orderDetailsError}
                </Text>
            ) : (
                // Display the list only when data is successfully loaded
                list.map((item) => (
                    <Box
                        key={item.id}
                        as='li'
                        w='full'
                        py={3}
                        px={5}
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        borderBottomWidth={1}
                        borderColor='brand.light'
                    >
                        <Text color='brand.dark'>{item.name}</Text>
                        <Text color={item.color} fontWeight='bold'>
                            {item.value}
                        </Text>
                    </Box>
                ))
            )}

            <div className='col-span-full mt-5 mb-10' onClick={handleLogout}>
                <button className='py-2 px-4 rounded text-white bg-tomato hover:bg-white hover:text-tomato hover:border hover:border-tomato'>
                    Log Out
                </button>
            </div>
        </VStack>
    );
};

export default Data;
