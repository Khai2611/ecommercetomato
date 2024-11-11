import React from 'react';
// import loginImage from '../assets/frontend_assets/auth.jpg';
import LoginForm from '../components/auth/LoginForm';
import {assets} from '../assets/frontend_assets/assets';

function Login() {
    return (
        <div className='flex  '>
            <div className='flex-none flex items-start justify-center w-[45%]'>
                <LoginForm></LoginForm>
            </div>
            <div className='flex-none flex items-center justify-center w-[55%] '>
                <img
                    // src={loginImage}
                    src={assets.autumn}
                    alt='Product'
                    className='w-full lg:h-[720px] xl:h-screen object-cover'
                ></img>
            </div>
        </div>
    );
}

export default Login;
