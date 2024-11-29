import React, {useState, useRef, useEffect} from 'react';
import {assets} from '../../../assets/frontend_assets/assets';

import {useUserData} from '@/hooks/useUserData';
import {getUserData} from '@/utils/auth';

const Profile: React.FC = () => {
    const [userID, setUserID] = useState<string | null>(null);
    const {user, error} = useUserData(userID || ''); // Fetch user data by userID

    useEffect(() => {
        const userData = getUserData();
        if (userData) {
            setUserID(userData.userID); // Set the userID from the session
        }
    }, []);

    const [userProfile, setUserProfile] = useState<string | null>(null);
    const profileImage = useRef<HTMLInputElement | null>(null);

    const openChooseImage = () => {
        profileImage.current?.click();
    };

    const changeProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
        const selected = event.target.files?.[0];

        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            const reader = new FileReader();
            reader.onloadend = () => setUserProfile(reader.result as string);
            return reader.readAsDataURL(selected);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (


        <div className='flex flex-col items-center py-5 border-b border-gray-300 space-y-3'>
            <div className='relative'>
                <img
                    className='w-32 h-32 rounded-full cursor-pointer'
                    src={userProfile ? userProfile : assets.profile}
                    alt='User Profile'
                    onClick={openChooseImage}
                />
                <div className='absolute bottom-0 right-0 bg-tomato rounded-full w-6 h-6 flex items-center justify-center'>
                    <svg
                        className='w-4 h-4 text-white'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                    >
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                        />
                    </svg>
                </div>
            </div>

            <input
                hidden
                type='file'
                ref={profileImage}
                onChange={changeProfileImage}
            />

            {/* Modal for unsupported file types */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${
                    userProfile === null
                        ? 'opacity-0 pointer-events-none'
                        : 'opacity-100 pointer-events-auto'
                }`}
            >
                <div className='bg-white p-6 rounded-lg w-96'>
                    <h3 className='text-lg font-semibold text-gray-800'>
                        Something went wrong
                    </h3>
                    <p className='mt-2 text-gray-600'>File not supported!</p>
                    <div className='mt-3 flex space-x-2'>
                        <span className='text-sm text-gray-500'>
                            Supported types:
                        </span>
                        <span className='px-2 py-1 text-xs font-semibold text-white bg-tomato rounded'>
                            PNG
                        </span>
                        <span className='px-2 py-1 text-xs font-semibold text-white bg-tomato rounded'>
                            JPG
                        </span>
                        <span className='px-2 py-1 text-xs font-semibold text-white bg-tomato rounded'>
                            JPEG
                        </span>
                    </div>
                    <div className='mt-5 flex justify-end'>
                        <button
                            className='px-4 py-2 text-white bg-tomato rounded'
                            onClick={() => setUserProfile(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center space-y-1'>
                <h3 className='text-xl text-gray-800'>
                    {user?.firstName} {user?.lastName}
                </h3>
                <p className='text-sm text-gray-500'>{user?.email}</p>
            </div>
            
        </div>
    );
};

export default Profile;
