import React from 'react';
import Category from './shopBy/Category';
import Gender from './shopBy/Gender';


const ShopSideNav: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Category /> 
      <Gender /> 
      </div>
  );
};

export default ShopSideNav;
