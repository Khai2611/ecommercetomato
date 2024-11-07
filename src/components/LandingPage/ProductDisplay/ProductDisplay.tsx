import React, { useContext } from "react";
import "./ProductDisplay.css";
import { StoreContext } from "../../../context/StoreContext";
import ProductItem from "../ProductItem/ProductItem";
import { motion } from "framer-motion";
import { SlideRight } from "../../../utils/animation";
// Define the props interface
interface ProductDisplayProps {
  category: string;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ category }) => {

  const context = useContext(StoreContext);
  // Check if context is null
  if (!context) {
    return null; // Or return a loading spinner or similar
  }
  const { prod_list } = context;

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
          {prod_list
            .filter(item => category === "All" || category === item.category) // Filter items based on category
            .slice(0, 6) // Limit to the first 8 items
            .map((item) => (
              <ProductItem
                key={item._id} // Use unique identifier as key
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
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
          {prod_list
            .filter(item => category === "All" || category === item.category) // Filter items based on category
            .slice(0, 6) // Limit to the first 8 items
            .map((item) => (
              <ProductItem
                key={item._id} // Use unique identifier as key
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
      </div>

    </div>
  );
};

export default ProductDisplay;
