// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import './ProductItem.css'; // Import the CSS file
import {motion} from 'framer-motion';
import {SlideLeft} from '../../../utils/animation';
import {assets} from '@/assets/frontend_assets/assets';

// Define the props interface
interface ProdItemProps {
    id: string;
    name: string;
    price: number;
    description: string;
    image: keyof typeof assets;
}

const ProductItem: React.FC<ProdItemProps> = ({
    id,
    name,
    price,
    description,
    image,
}) => {
    const [hoveredImage, setHoveredImage] = useState<number | null>(null);

    const handleImageClick = (index: number) => {
        setHoveredImage((prev) => (prev === index ? null : index));
    };

    return (
        <div>
            <motion.div
                variants={SlideLeft(0.4 + 4 * 0.2)}
                whileInView={'animate'}
                initial='initial'
                onClick={() => handleImageClick(3)}
                className={`cursor-pointer transition-transform duration-300 scale-105`}
            >
                <div className='prod-item'>
                    <div className='prod-item-img-container'>
                        <img
                            src={assets[image]}
                            alt={name}
                            className='prod-item-image'
                        />
                    </div>
                    <div className='prod-item-info'>
                        <div className='prod-item-name-rating'>
                            <p className='prod-item-namee'>{name}</p>
                            {/* <img src={assets.rating_starts} alt="Rating stars" /> */}
                        </div>
                        {/* or category instead of desciription */}
                        {/* <p className='prod-item-desc'>{description}</p> */}
                        <p className='prod-item-pricee'>RM{price.toFixed(2)}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductItem;
