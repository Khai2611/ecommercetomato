import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {assets} from '@/assets/frontend_assets/assets';
import {signInWithEmailAndPassword} from 'firebase/auth';
 import {auth} from "@/firebase/firebaseConfig";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = userCredential.user;

            // await signInWithEmailAndPassword(auth, email, password);

            // Check if the email is verified
            if (!user.emailVerified) {
                setError('Please verify your email before logging in.');
                return;
            }

            // If email is verified, navigate to the dashboard (or protected route)
            console.log('User signed in successfully');
            navigate('/');
        } catch (err: any) {
            if (err.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else if (err.code === 'auth/user-not-found') {
                setError('No user found with that email.');
            } else {
                setError('Login failed. Please try again.');
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
                    Sign in to your account
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form onSubmit={handleSubmit} className='space-y-6'>
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
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                            <div className='text-sm'>
                                <a
                                    href='#'
                                    className='font-semibold text-[tomato] hover:text-[tomato] hover:text-opacity-80'
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                required
                                autoComplete='current-password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div>
                        {/* <Link to={'/'}> */}
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-[tomato] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[tomato] focus-visible:outline focus-visible:outline-2 focus-visible'
                        >
                            Sign in
                        </button>
                        {/* </Link> */}
                    </div>
                </form>
                {error && <p className='text-red-500 mt-4'>{error}</p>}{' '}
                {/* Display error if any */}
                <p className='mt-10 text-center text-sm text-gray-500'>
                    Not a member?{' '}
                    <Link to={'/Register'}>
                        <a
                            href='#'
                            className='font-semibold text-[tomato] hover:text-[tomato] hover:text-opacity-80'
                        >
                            Register
                        </a>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
