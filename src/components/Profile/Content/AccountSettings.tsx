import React, {useState, useEffect} from 'react';
import {useUserData} from '@/hooks/useUserData';
import {getUserData} from '@/utils/auth';
import {db} from '@/firebase/firebaseConfig';
import {setDoc, doc} from 'firebase/firestore';
import {useToast} from '@/hooks/use-toast';

const AccountSettings: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [city, setCity] = useState<string>('');
    // const [country, setCountry] = useState<string>('america');
    // const [city, setCity] = useState<string>('New York');
    // const [cityOptions, setCityOptions] = useState<string[]>([]);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // To manage loading state
    const [error, setError] = useState<string | null>(null); // To handle error messages

    const {toast} = useToast();

    // Check if user is logged in
    const userSession = getUserData();

    // If user is not logged in, show an error
    if (!userSession) {
        return <div>Please log in to view your account settings.</div>;
    }

    const {userID} = userSession;

    // Use the custom hook to fetch user data
    const {user, error: fetchError} = useUserData(userID);

    // Handle loading and errors
    useEffect(() => {
        if (fetchError) {
            setError(fetchError);
            setLoading(false);
        } else if (user) {
            setLoading(false);
            // Set initial values from fetched user data
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setPhoneNo(user.phoneNo);
            setEmail(user.email);
            setCountry(user.Country);
            setCity(user.City);
        }
    }, [user, fetchError]);

    // Define comprehensive city options for each country
    // const citiesByCountry: Record<string, string[]> = {
    //     america: [
    //         'New York',
    //         'Los Angeles',
    //         'Chicago',
    //         'Houston',
    //         'Phoenix',
    //         'Philadelphia',
    //         'San Antonio',
    //         'San Diego',
    //         'Dallas',
    //         'San Jose',
    //     ],
    //     england: [
    //         'London',
    //         'Manchester',
    //         'Birmingham',
    //         'Leeds',
    //         'Liverpool',
    //         'Sheffield',
    //         'Bristol',
    //         'Newcastle',
    //         'Leicester',
    //         'Nottingham',
    //     ],
    //     poland: [
    //         'Warsaw',
    //         'Krakow',
    //         'Gdansk',
    //         'Poznan',
    //         'Wroclaw',
    //         'Lodz',
    //         'Szczecin',
    //         'Bydgoszcz',
    //         'Lublin',
    //         'Katowice',
    //     ],
    //     malaysia: [
    //         'Kuala Lumpur',
    //         'George Town',
    //         'Johor Bahru',
    //         'Ipoh',
    //         'Shah Alam',
    //         'Petaling Jaya',
    //         'Kota Kinabalu',
    //         'Kuching',
    //         'Seremban',
    //         'Melaka',
    //     ],
    // };

    // const handleCountryChange = (
    //     event: React.ChangeEvent<HTMLSelectElement>,
    // ) => {
    //     const selectedCountry = event.target.value;
    //     setCountry(selectedCountry);
    //     setCityOptions(citiesByCountry[selectedCountry] || []);
    //     setCity(citiesByCountry[selectedCountry]?.[0] || '');
    // };

    const toggleEditMode = () => {
        setIsEditable(!isEditable);
    };

    const handleSave = async () => {
        try {
            // Get a reference to the user's document in Firestore
            const userRef = doc(db, 'Users', userID); // Assuming 'Users' collection and userID is the document ID

            // Save the user data to Firestore
            await setDoc(userRef, {
                firstName,
                lastName,
                phoneNo,
                email,
                Country: country,
                City: city,
                userID,
            });
            console.log('User data saved to Firestore');
            toast({
                title: 'Data Saved Successfully',
                description: 'Your account details have been updated.',
            });
            toggleEditMode(); // Exit edit mode
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError('Error saving data to Firestore: ' + error.message);
            } else {
                setError('An unknown error occured');
            }
        }
    };

    // useEffect(() => {
    //     setCityOptions(citiesByCountry[country] || []);
    //     setCity(citiesByCountry[country]?.[0] || '');
    // }, [country]);

    // Show loading spinner if data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Show error message if fetching data failed
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-1xl mx-auto px-2'>
            {/* First Name */}
            <div className='flex flex-col'>
                <label
                    htmlFor='firstName'
                    className='text-gray-700 font-medium'
                >
                    First Name
                </label>
                <input
                    id='firstName'
                    type='text'
                    placeholder='Your First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} // Set new value here
                    readOnly={!isEditable}
                    className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none focus:outline-none ${
                        !isEditable && 'bg-white'
                    }`}
                />
            </div>

            {/* Last Name */}
            <div className='flex flex-col'>
                <label htmlFor='lastName' className='text-gray-700 font-medium'>
                    Last Name
                </label>
                <input
                    id='lastName'
                    type='text'
                    placeholder='Your Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} // Set new value here
                    readOnly={!isEditable}
                    className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none ${
                        !isEditable && 'bg-white'
                    }`}
                />
            </div>

            {/* Phone Number */}
            <div className='flex flex-col'>
                <label
                    htmlFor='phoneNumber'
                    className='text-gray-700 font-medium'
                >
                    Phone Number
                </label>
                <input
                    id='phoneNumber'
                    type='tel'
                    placeholder='Your Phone Number'
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)} // Set new value here
                    readOnly={!isEditable}
                    className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none ${
                        !isEditable && 'bg-white'
                    }`}
                />
            </div>

            {/* Email Address */}
            <div className='flex flex-col'>
                <label
                    htmlFor='emailAddress'
                    className='text-gray-700 font-medium'
                >
                    Email Address
                </label>
                <input
                    id='emailAddress'
                    type='email'
                    placeholder='Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Set new value here
                    readOnly={!isEditable}
                    className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none ${
                        !isEditable && 'bg-white'
                    }`}
                />
            </div>

            {/* Country */}
            <div className='flex flex-col'>
                <label htmlFor='country' className='text-gray-700 font-medium'>
                    Country
                </label>
                <input
                    id='country'
                    type='text'
                    placeholder='Your Country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)} // Set new value here
                    readOnly={!isEditable}
                    className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none ${
                        !isEditable && 'bg-white'
                    }`}
                />
                {/* {isEditable ? (
                    <select
                        id='country'
                        value={country}
                        onChange={handleCountryChange}
                        className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none ${
                            isEditable ? 'bg-white' : 'bg-white'
                        }`}
                    >
                        <option value='america'>America</option>
                        <option value='england'>England</option>
                        <option value='poland'>Poland</option>
                        <option value='malaysia'>Malaysia</option>
                    </select>
                ) : (
                    <input
                        id='country'
                        type='text'
                        value={
                            country.charAt(0).toUpperCase() + country.slice(1)
                        }
                        readOnly
                        className='mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none'
                    />
                )} */}
            </div>

            {/* City */}
            <div className='flex flex-col'>
                <label htmlFor='city' className='text-gray-700 font-medium'>
                    City
                </label>
                <input
                    id='city'
                    type='text'
                    placeholder='Your City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)} // Set new value here
                    readOnly={!isEditable}
                    className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none ${
                        !isEditable && 'bg-white'
                    }`}
                />
                {/* {isEditable ? (
                    <select
                        id='city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none ${
                            !country && 'bg-white'
                        }`}
                        disabled={!country}
                    >
                        {cityOptions.map((cityOption) => (
                            <option key={cityOption} value={cityOption}>
                                {cityOption}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        id='city'
                        type='text'
                        value={city}
                        readOnly
                        className='mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none'
                    />
                )} */}
            </div>
            {/* Update/Save Button */}
            <div className='col-span-full mt-5 mb-10'>
                <button
                    onClick={isEditable ? handleSave : toggleEditMode}
                    className={`py-2 px-4 rounded text-white ${
                        isEditable
                            ? 'bg-tomato hover:bg-white hover:text-tomato hover:border hover:border-tomato'
                            : 'bg-tomato'
                    }`}
                >
                    {isEditable ? 'Save' : 'Update'}
                </button>
            </div>
        </div>
    );
};

export default AccountSettings;
