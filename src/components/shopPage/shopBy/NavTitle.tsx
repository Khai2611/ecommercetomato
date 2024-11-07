import React from 'react';
import { BiCaretDown } from 'react-icons/bi';
import '../../../components/LandingPage/ProductItem/ProductItem.css'

interface NavTitleProps {
  title: string;
  icons?: boolean; // Optional prop
}

const NavTitle: React.FC<NavTitleProps> = ({ title, icons }) => {
  return (
    <div className="flex items-center justify-between pb-5">
      <h3 className="prod-item-namee font-bold">{title}</h3>
      {icons && <BiCaretDown />}
    </div>
  );
};

export default NavTitle;
