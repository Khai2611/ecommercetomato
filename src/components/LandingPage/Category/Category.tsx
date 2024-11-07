import React, { useState } from "react";
import { assets } from "../../../assets/frontend_assets/assets"; 
import { motion } from "framer-motion";
import { SlideLeft, SlideRight } from "../../../utils/animation";

const Category: React.FC = () => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setHoveredImage(prev => (prev === index ? null : index));
  };

  return (
    <section>
      <div className="container my-14">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
          <motion.div
            variants={SlideRight(0.2)}
            whileInView={"animate"}
            initial="initial"
            className="order-last md:order-first flex flex-col justify-center xl:pr-10"
          >
            <h1 style={{
              color: '#262626',
              fontWeight: 550,
              fontSize: 'max(2vw, 24px)',
              margin: '0 0 5px 1px'
            }}>
              Top Categories
            </h1>
            <p className="text-gray-400 mt-4">
              Explore a diverse selection of clothing tailored to your style. From trendy apparel to timeless pieces, our categories are designed to help you find exactly what you're looking for.
            </p>
          </motion.div>
          {[
            { src: assets.cardigan, alt: "Cardigan & Sweaters", label: "Cardigan & Sweaters" },
            { src: assets.pants, alt: "Pants", label: "Pants" },
            { src: assets.sneakers, alt: "Sneakers", label: "Sneakers" },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={SlideLeft(0.4 + index * 0.2)}
              whileInView={"animate"}
              initial="initial"
              onClick={() => handleImageClick(index)}
              className={`cursor-pointer transition-transform duration-300 ${hoveredImage === index ? "scale-105" : ""}`}
            >
              <img src={item.src} alt={item.alt} className="w-full rounded-3xl" style={{ height: '400px' }} />
            <p className="text-gray-400 mt-4">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
