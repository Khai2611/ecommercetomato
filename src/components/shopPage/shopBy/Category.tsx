import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";

interface Item {
  _id: number;
  title: string;
  icons?: boolean;
}

interface CategoryProps {
  icons?: boolean;  // Add this line to accept the 'icons' prop
}

const Category: React.FC<CategoryProps> = ({ icons }) => {
  
  const [showItems] = useState<boolean>(true);
  const items: Item[] = [
    { _id: 990, title: "Shirts", icons: true },
    { _id: 991, title: "Pants" },
    { _id: 992, title: "Hoodies", icons: true },
    { _id: 993, title: "Sneakers" },
  ];


  return (
    <div>
       <div className="cursor-pointer" style={{marginTop:"70px"}}>
          <NavTitle title="Shop by Category" icons={false} />
       </div>
      {showItems && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {items.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-tomato hover:border-tomato duration-300"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Category;
