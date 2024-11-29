import React, {useState} from 'react';
import {assets} from '../../../assets/frontend_assets/assets';
import {motion} from 'framer-motion';
import {SlideLeft, SlideRight} from '../../../utils/animation';
import {useNavigate} from 'react-router-dom';

interface CategoryItem {
    id: string; // ID for each category
    src: string;
    alt: string;
    label: string;
}

interface CategoryProps {
    onCategoryClick: (categoryID: string) => void;
}

const Category: React.FC<CategoryProps> = ({onCategoryClick}) => {
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleImageClick = (id: string) => {
        setHoveredImage((prev) => (prev === id ? null : id));
        onCategoryClick(id);
        navigate('/shop');
    };

    const categories: CategoryItem[] = [
        {
            id: 'CT006',
            src: assets.cardigan,
            alt: 'Cardigan & Sweaters',
            label: 'Cardigan & Sweaters',
        },
        {
            id: 'CT005',
            src: assets.pants,
            alt: 'Pants',
            label: 'Pants',
        },
        {
            id: 'CT004',
            src: assets.shirt,
            alt: 'Shirt',
            label: 'Shirt',
        },
    ];

    return (
        <section>
            <div className='container my-14'>
                <div className='grid grid-cols-2 xl:grid-cols-4 gap-6'>
                    <motion.div
                        variants={SlideRight(0.2)}
                        whileInView={'animate'}
                        initial='initial'
                        className='order-last md:order-first flex flex-col justify-center xl:pr-10'
                    >
                        <h1
                            style={{
                                color: '#262626',
                                fontWeight: 550,
                                fontSize: 'max(2vw, 24px)',
                                margin: '0 0 5px 1px',
                            }}
                        >
                            Top Categories
                        </h1>
                        <p className='text-gray-400 mt-4'>
                            Explore a diverse selection of clothing tailored to
                            your style. From trendy apparel to timeless pieces,
                            our categories are designed to help you find exactly
                            what you're looking for.
                        </p>
                    </motion.div>
                    {/* {[
                        {
                            src: assets.cardigan,
                            alt: 'Cardigan & Sweaters',
                            label: 'Cardigan & Sweaters',
                        },
                        {src: assets.pants, alt: 'Pants', label: 'Pants'},
                        {src: assets.shirt, alt: 'Shirt', label: 'Shirt'},
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={SlideLeft(0.4 + index * 0.2)}
                            whileInView={'animate'}
                            initial='initial'
                            onClick={() => handleImageClick(index)}
                            className={`cursor-pointer transition-transform duration-300 ${
                                hoveredImage === index ? 'scale-105' : ''
                            }`}
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className='w-full rounded-3xl'
                                style={{height: '400px'}}
                            />
                            <p className='text-gray-400 mt-4'>{item.label}</p>
                        </motion.div>
                    ))} */}
                    {categories.map((item, index) => (
                        <motion.div
                            key={item.id}
                            variants={SlideLeft(0.4 + index * 0.2)}
                            whileInView={'animate'}
                            initial='initial'
                            onClick={() => handleImageClick(item.id)} // Pass the ID to the handler
                            className={`cursor-pointer transition-transform duration-300 ${
                                hoveredImage === item.id ? 'scale-105' : ''
                            }`}
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className='w-full rounded-3xl'
                                style={{height: '400px'}}
                            />
                            <p className='text-gray-400 mt-4'>{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
