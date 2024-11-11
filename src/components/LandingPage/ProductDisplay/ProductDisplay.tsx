import React, { useContext } from "react";
import "./ProductDisplay.css";
import ProductItem from "../ProductItem/ProductItem";
import { motion } from "framer-motion";
import { SlideRight } from "../../../utils/animation";
import {productData} from "../../../assets/frontend_assets/assets";

// Define the props interface
interface ProductDisplayProps {
  category: string;
}

const ProductDisplay: React.FC<ProductDisplayProps> =  () => {
  return (
    <div className="product-display" id="product-display">
      
      {/* bestsellers */}
       <motion.div
        variants={SlideRight(0.2)}
        whileInView={"animate"}
        initial="initial"
      >
      <div className="product-display-title">
        <h1>Explore our bestsellers</h1>
      </div>
      </motion.div>


        <div className="product-display-list">
             {productData
              .slice(0, 6) // Limit to the first 6 items
              .map((item) => (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  name={item.productName}
                  description={item.des}
                  price={item.price}
                  image={item.img}
                />
              ))}
      </div>


      {/* latest arrivals       */}
      <motion.div
        variants={SlideRight(0.2)}
        whileInView={"animate"}
        initial="initial"
      >
      <div className="product-display-title">
        <h1>Latest Arrivals</h1>
      </div>
      </motion.div>
            
      <div className="product-display-list">
            {productData
              .slice(0, 6) // Limit to the first 6 items
              .map((item) => (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  name={item.productName}
                  description={item.des}
                  price={item.price}
                  image={item.img}
                />
              ))}
      </div>

    </div>
  );
};

export default ProductDisplay;
