import RegisterForm from '../components/auth/RegisterForm';
import registerImage from '../assets/frontend_assets/auth.jpg';
import React from 'react';

function Register() {
    return (
        <div className='flex  '>
            <div className='flex-none flex items-start justify-center w-[45%]'>
                <RegisterForm></RegisterForm>
            </div>
            <div className='flex-none flex items-center justify-center w-[55%]'>
                <img
                    src={registerImage}
                    alt='Product'
                    className='w-full lg:h-[770px] object-cover'
                ></img>
            </div>
        </div>
    );
}

export default Register;
