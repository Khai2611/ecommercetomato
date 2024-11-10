import Example from '../components/cart/Slide';

import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const AddToCart: React.FC = () => {
    const [isVisible, setVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        setVisible(!isVisible);
    };

    return (
        <div className='grid grid-cols-3 gap-4'>
            <button
                className='col-span-3 bg-blue-500 text-white p-2 rounded'
                onClick={() => setVisible(true)}
            >
                Open Shopping Cart
            </button>
            <Example open={isVisible} setOpen={setVisible} />
        </div>
    );
};

export default AddToCart;
