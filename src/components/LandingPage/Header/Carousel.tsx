import { useEffect, useState } from "react";
import "./Carousel.css";
import React from "react";
import { motion } from "framer-motion";

interface Image {
  image: string;
  title: string;
  desc:string;
}

interface CarouselProps {
  images: Image[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  let timeOut: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (autoPlay) {
      timeOut = setTimeout(() => {
        slideRight();
      }, 2500);
    }

    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [autoPlay, current]); // Add dependencies

  const slideRight = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.6 }}
  >
    <div
      className="carousel"
      onMouseEnter={() => {
        setAutoPlay(false);
        if (timeOut) {
          clearTimeout(timeOut);
        }
      }}
      onMouseLeave={() => {
        setAutoPlay(true);
      }}
    >
      <div className="carousel_wrapper">
        {images.map((image, index) => (
          <div
            key={index}
            className={
              index === current
                ? "carousel_card carousel_card-active"
                : "carousel_card"
            }
          >
            <img className="card_image" src={image.image} alt="" />
            <div className="card_overlay">
              <div className="headerr">
                  <h2>{image.title}</h2>
                  <p>{image.desc}</p>
              </div>
             
            </div>
          </div>
        ))}
       
        <div className="carousel_pagination">
          {images.map((_, index) => (
            <div
              key={index}
              className={
                index === current
                  ? "pagination_dot pagination_dot-active"
                  : "pagination_dot"
              }
              onClick={() => setCurrent(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
    </motion.div>

  );
};

export default Carousel;
