import React from "react";
import { ProductDetailss } from "../components/ProductDetails/ProductDetailss";
import { ProductCarousell } from "../components/ProductDetails/ProductCarousell";

const ProductDeets = () => {
  return (
    <section className='grid-cols-2 lg:grid justify-items-center lg:my-40'>
      <style>
        {`
          :root {
            font-size: 60.5%;
            -webkit-tap-highlight-color: transparent;
          }
        `}
      </style>
      <ProductCarousell />
      <ProductDetailss />
    </section>
  );
};

export default ProductDeets;
