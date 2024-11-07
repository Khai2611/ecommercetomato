import React from 'react';
import './Brands.css';
import { assets } from '../../../assets/frontend_assets/assets';
import { motion } from "framer-motion";
import { SlideUp } from "../../../utils/animation";

const Brands: React.FC = () => {
  return (

  <div className='brands' id='brands'>
      <motion.div
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView="animate"
          >
        <div className='brands-display'>
            <h1>Brands in Store</h1>
        </div>
        </motion.div>
        <motion.div
            variants={SlideUp(0.6)}
            initial="initial"
            whileInView="animate"
          >
       <section className="partners">
          <img src={assets.databizLogo} alt="Databiz logo" />
          <img src={assets.audiophileLogo} alt="Audiophile logo" />
          <img src={assets.meetLogo} alt="Meet logo" />
          <img src={assets.makerLogo} alt="Maker logo" />
          <img src={assets.databizLogo} alt="Databiz logo" />
        </section>
        </motion.div>
    </div>
  );
};

export default Brands;
