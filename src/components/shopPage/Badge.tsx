import React from 'react';

interface BadgeProps {
  text: string; // Required prop
}

const Badge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <div 
      className="bg-tomato w-[92px] h-[35px] text-white flex justify-center items-center font-semibold hover:bg-black duration-300 cursor-pointer rounded-md">  
    {text}
    </div>
  );
};

export default Badge;
