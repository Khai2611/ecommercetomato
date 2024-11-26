import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {assets} from '@/assets/frontend_assets/assets';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from 'firebase/auth';
import {auth, db} from '@/firebase/firebaseConfig';
import {collection, addDoc} from 'firebase/firestore';
import {doc, setDoc} from 'firebase/firestore';

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // To navigate after successful registration

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            // Create the user with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = userCredential.user;

            // Send email verification
            await sendEmailVerification(user);
            setError('Verification email sent! Please check your inbox.');

            const userRef = doc(db, 'Users', user.uid); // Specify the document ID as user.uid
            await setDoc(userRef, {
                email: user.email,
                firstName: name, // Store the name (or displayName)
                lastName: '',
                userID: user.uid, // Store the user's UID (same as document ID)
                phoneNo: '',
                Country: '',
                City: '',
            });

            console.log('User registered successfully');
            navigate('/login'); // Redirect to login page after successful registration
        } catch (err: any) {
            // Handle Firebase authentication errors
            console.error('Error during registration:', err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already in use');
            } else {
                setError('Error creating account. Please try again.');
            }
        }
    };

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <img
                    alt='Your Company'
                    src={assets.logo}
                    className='mx-auto h-full w-auto'
                />
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    Register an account
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label
                            htmlFor='name'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            Full Name
                        </label>
                        <div className='mt-2'>
                            <input
                                id='name'
                                name='name'
                                type='name'
                                required
                                autoComplete='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[tomato] sm:text-sm sm:leading-6'
                                // className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[tomato] sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            Email address
                        </label>
                        <div className='mt-2'>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                required
                                autoComplete='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[tomato] sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center justify-between'>
                            <label
                                htmlFor='password'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Password
                            </label>
                        </div>
                        <div className='mt-2'>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                required
                                autoComplete='new-password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[tomato] sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center justify-between'>
                            <label
                                htmlFor='confirm-password'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Confirm Password
                            </label>
                        </div>
                        <div className='mt-2'>
                            <input
                                id='confirm-password'
                                name='confirm-password'
                                type='password'
                                required
                                autoComplete='confirm-password'
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[tomato] sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        {/* <Link to={'/'}> */}
                        <button
                            type='submit'
                            className='flex w-[150px] justify-center rounded-md bg-[tomato] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[tomato] focus-visible:outline focus-visible:outline-2 focus-visible '
                        >
                            Register
                        </button>
                        {/* </Link> */}
                    </div>
                </form>
                {error && <p className='text-red-500 mt-4'>{error}</p>}{' '}
                {/* Display error if any */}
                <p className='mt-10 text-center text-sm text-gray-500'>
                    Already have an account?{' '}
                    <Link to={'/Login'}>
                        <a
                            href='#'
                            className='font-semibold text-[tomato] hover:text-[tomato] hover:text-opacity-80'
                        >
                            Log In
                        </a>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
