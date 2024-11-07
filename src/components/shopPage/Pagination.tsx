import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Products from "../shopPage/Products";
import { paginationItems } from "../../assets/frontend_assets/assets";

const items = paginationItems;

interface Item {
  _id: string;
  img: string;
  productName: string;
  price: string;
  color: string;
  badge?: boolean; 
  des: string;
}

interface ItemsProps {
  currentItems: Item[];
}

function Items({ currentItems }: ItemsProps) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Products
              _id={item._id}
              img={item.img}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={item.badge}
              des={item.des}
            />
          </div>
        ))}
    </>
  );
}

interface PaginationProps {
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [itemStart, setItemStart] = useState<number>(1);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1); // Adjusted to show correct item start
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-tomato duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-tomato text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {endOffset} of {items.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
