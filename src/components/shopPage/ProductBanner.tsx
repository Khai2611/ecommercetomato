import React, { useEffect, useState } from "react";
import { GoTriangleDown } from "react-icons/go";

interface ProductBannerProps {
  itemsPerPageFromBanner: (itemsPerPage: number) => void;
}

const ProductBanner: React.FC<ProductBannerProps> = ({ itemsPerPageFromBanner }) => {
  const [gridViewActive, setGridViewActive] = useState(true);
  const [listViewActive, setListViewActive] = useState(false);

  useEffect(() => {
    const gridView = document.querySelector(".gridView");
    const listView = document.querySelector(".listView");

    const handleGridViewClick = () => {
      setListViewActive(false);
      setGridViewActive(true);
    };

    const handleListViewClick = () => {
      setGridViewActive(false);
      setListViewActive(true);
    };

    gridView?.addEventListener("click", handleGridViewClick);
    listView?.addEventListener("click", handleListViewClick);

    return () => {
      gridView?.removeEventListener("click", handleGridViewClick);
      listView?.removeEventListener("click", handleListViewClick);
    };
  }, [gridViewActive, listViewActive]);

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
      {/* =========================================================
                            Left Part Start here
        ======================================================== */}
      <div className="flex items-center gap-4">
      </div>
      {/* =========================================================
                            Left Part End here
        ======================================================== */}
      {/* =========================================================
                            Right Part Start here
        ======================================================== */}
      <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
        <div className="flex items-center gap-2 text-base text-[#767676] relative">
          <label className="block">Sort by Price :</label>
          <select
            id="sortOptions"
            className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="HighLow" className="hover:bg-tomato">High to Low</option>
            <option value="LowHigh">Low to High</option>
          </select>
          <span className="absolute text-sm right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#767676] relative">
          <label className="block">Show:</label>
          <select
            onChange={(e) => itemsPerPageFromBanner(+e.target.value)}
            id="itemsPerPage"
            className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
          <span className="absolute text-sm right-3 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
      </div>
      {/* =========================================================
                            Right Part End here
        ======================================================== */}
    </div>
  );
};

export default ProductBanner;
