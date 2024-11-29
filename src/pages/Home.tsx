// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import Category from '../components/LandingPage/Category/Category';
import ProductDisplay from '../components/LandingPage/ProductDisplay/ProductDisplay';
import Brands from '../components/LandingPage/Brands/Brands';
import Carousel from '../components/LandingPage/Header/Carousel';
import {header} from '../assets/frontend_assets/assets';

interface HomeProps {
    onCategoryClick: (categoryId: string) => void; // Prop type for category click handler
}

const Home: React.FC<HomeProps> = ({onCategoryClick}) => {
    const [category] = useState<string>('All');

    return (
        <div>
            <Carousel images={header} />
            <Category onCategoryClick={onCategoryClick} />
            <ProductDisplay category={category} />
            <Brands />
        </div>
    );
};

export default Home;
