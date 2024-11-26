import {useEffect, useState} from 'react';
import {auth} from '@/firebase/firebaseConfig';
import {getUserData} from '@/utils/auth';

export const useAccountData = () => {
    const [accountCreationDate, setAccountCreationDate] = useState<Date | null>(
        null,
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is logged in, fetch the account creation time
                const creationTime = user.metadata.creationTime;
                if (creationTime) {
                    setAccountCreationDate(new Date(creationTime)); // Set the creation date
                } else {
                    setError('Account creation date not available');
                }
            } else {
                setError('No user logged in');
            }
            setLoading(false);
        });

        // Clean up the listener when component is unmounted
        return () => unsubscribe();
    }, []);

    // useEffect(() => {
    //     const fetchAccountData = async () => {
    //         const userData = getUserData(); // Get user data from localStorage (if exists)

    //         if (userData) {
    //             // If user data is available in localStorage, use it directly
    //             const user = auth.currentUser; // Get current logged-in user

    //             if (user) {
    //                 const creationTime = user.metadata.creationTime; // Get the account creation date from metadata
    //                 if (creationTime) {
    //                     setAccountCreationDate(new Date(creationTime)); // Set the creation date as a Date object
    //                 } else {
    //                     setError('Account creation date not available');
    //                 }
    //             } else {
    //                 setError('No user logged in');
    //             }
    //         } else {
    //             setError('No user session found in localStorage');
    //         }

    //         setLoading(false);
    //     };

    //     fetchAccountData();
    // }, []); // Only run on mount

    return {accountCreationDate, loading, error};
};
