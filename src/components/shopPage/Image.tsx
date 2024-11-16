import React from "react";

// Define the props interface
interface ImageProps {
  imgSrc: string;
  className?: string; // Make className optional
}

const Image: React.FC<ImageProps> = ({ imgSrc, className }) => {
  return (
    <img
      className={className}
      src={imgSrc}
      alt={imgSrc}
    />
  );
};

export default Image;
