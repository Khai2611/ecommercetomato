import {useEffect, useState} from 'react';
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '@/firebase/firebaseConfig';

interface User {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    Country: string;
    City: string;
}

export const useUserData = (userID: string) => {
    const [user, setUser] = useState<User | null>(null); // State to store user data
    const [error, setError] = useState<string | null>(null); // State to store error message

    useEffect(() => {
        if (userID) {
            const fetchUserData = async () => {
                try {
                    const userQuery = query(
                        collection(db, 'Users'),
                        where('userID', '==', userID),
                    );
                    const userSnapshot = await getDocs(userQuery);
                    const userData = userSnapshot.docs.map(
                        (doc) => doc.data() as User,
                    );

                    if (userData.length > 0) {
                        setUser(userData[0]); // Set the first user (if found)
                    } else {
                        setUser(null); // No user found, set to null
                    }
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    setError('Failed to fetch user data.');
                }
            };

            fetchUserData();
        }
    }, [userID]);

    return {user, error};
};
