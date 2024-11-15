import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "./Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import "../LandingPage/ProductItem/ProductItem.css";
import { assets } from "@/assets/frontend_assets/assets";

// Define the props interface
interface ProductProps {
  _id: string;
  // img: string;
  img: keyof typeof assets; // This makes img a key of the assets object
  productName: string;
  price: string; // Change to number if needed
  // color: string;
  badge?: boolean; // Make badge a boolean
  des: string;
}

const Products: React.FC<ProductProps> = (props) => {
  const _id = props._id;

  const idString = (_id: string) => {
    return String(_id).toLowerCase().split(" ").join("");
  };

  const rootId = idString(_id);
  const navigate = useNavigate();
  // const productItem = props;

  const handleProductDetails = () => {
    navigate(`/products/${_id}`);
  };

  return (
    <div className="prod-item relative group">
      {/* the popup of options */}
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div
          onClick={handleProductDetails}
          className="hover:cursor-pointer prod-item-img-container"
        >
          <Image
            className="w-[235px] h-[298px] lg:w-full lg:h-full"
            // className='w-full h-full'
            imgSrc={assets[props.img]}
          />
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
        </div>
      </div>

      <div className="prod-item-info">
        <div className="flex items-center justify-between font-titleFont">
          <p className="prod-item-namee">{props.productName}</p>
          <p className="prod-item-pricee">RM{props.price}</p>
        </div>
        {/* <div>
                    <p className='text-[#767676] text-[14px]'>{props.color}</p>
                </div> */}
      </div>
    </div>
  );
};

export default Products;
