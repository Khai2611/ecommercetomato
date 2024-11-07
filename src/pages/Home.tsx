// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Category from '../components/LandingPage/Category/Category';
import ProductDisplay from '../components/LandingPage/ProductDisplay/ProductDisplay';
import Brands from '../components/LandingPage/Brands/Brands';
import Carousel from '../components/LandingPage/Header/Carousel';
import { header } from "../assets/frontend_assets/assets";

const Home: React.FC = () => {
  const [category] = useState<string>("All");

  return (
    <div>
      <Carousel images={header} /> 
      <Category/>
      <ProductDisplay category={category} />
      <Brands />
    </div>
  );
}

export default Home;
