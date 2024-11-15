"use client";
import React, { useState } from "react";
import { Button } from "../ui/Button2";
import { MinusIcon, PlusIcon, CartIcon } from "../ui/Icons";
import { Accordion } from "../ui/Accordion2";

interface ProductDetailssProps {
  product: {
    prodID: string;
    prodName: string;
    prodPrice: number;
    desc: string;
    badge?: boolean;
  };
}

export const ProductDetailss: React.FC<ProductDetailssProps> = ({
  product,
}) => {
  const { prodID, prodName, prodPrice, desc, badge } = product;
  const [itemQty, setItemQty] = useState(0); // Manage quantity locally
  const [showMsg, setShowMsg] = useState(false); // Show update message

  const handleAddToCart = () => {
    console.log(`Added ${itemQty} ${prodName} ${prodID}`);
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2000);
  };

  return (
    <section
      style={{ marginTop: "90px"}}
      className="m-8 mb-40 justify-self-start lg:max-w-3xl lg:m-0"
    >
      <div className="grid gap-4 mb-8 mt-10">
        <h3 className="text-3xl font-bold tracking-wider text-Orange/100">
          Tomato.
        </h3>
        <h2 className="mb-4 text-5xl font-bold capitalize text-Very_dark_blue">
          {prodName}
        </h2>

        <Accordion header="Product Description">
          <p className="px-8 py-12 text-2xl lg:text-[1.6rem] text-Orange">
            {desc}
          </p>
        </Accordion>
      </div>

      <div className="grid gap-8">
        <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-8">
          <div className="flex items-center gap-8">
            <span className="text-4xl font-bold">
              RM {prodPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <span className="font-semibold bg-Pale_orange text-Orange px-3 py-1 rounded-md text-3xl">
          10 products ready for purchase
        </span>
      </div>

      <div className="lg:flex lg:items-center lg:gap-6">
        {/* Add or minus cart button */}
        <div className="relative flex items-center justify-between gap-4 px-4 py-6 my-16 bg-Very_light_grayish_blue rounded-xl lg:w-1/2">
          <Button
            title="decrease quantity"
            onClick={() => {
              setItemQty((prevQty) => (prevQty > 0 ? prevQty - 1 : 0)); // Decrease quantity
              setShowMsg(false); // Hide message when adjusting quantity
            }}
            rounded={"full"}
            className="p-2 focus-visible:outline-dotted active:translate-y-px hover:bg-Very_light_grayish_blue"
          >
            <MinusIcon className="stroke-Orange w-7 h-7" />
          </Button>

          <span className="text-2xl font-bold lg:text-2xl">{itemQty}</span>

          <Button
            title="increase quantity"
            onClick={() => {
              setItemQty((prevQty) => (prevQty < 10 ? prevQty + 1 : 10)); // Increase quantity
              setShowMsg(false); // Hide message when adjusting quantity
            }}
            rounded={"full"}
            className="p-2 focus-visible:outline-dotted active:translate-y-px hover:bg-Very_light_grayish_blue"
          >
            <PlusIcon className="stroke-Orange w-7 h-7" />
          </Button>

          <p
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 pt-4 text-2xl text-green-500 font-bold capitalize ${
              showMsg
                ? "translate-y-10 opacity-100 visible"
                : "opacity-0 invisible"
            } transition-[transform,opacity] duration-300`}
          >
            cart updated
          </p>
        </div>

        <Button
          hasRipple
          fullWidth
          title="add item to cart"
          variant={"secondary_orange"}
          className="flex items-center justify-center gap-8 shadow-xl shadow-Orange/30 lg:w-2/3"
        >
          <CartIcon className="w-8 h-8 lg:w-10 lg:w-10 fill-Very_light_grayish_blue" />
          <span>Add to cart</span>
        </Button>
      </div>
    </section>
  );
};
