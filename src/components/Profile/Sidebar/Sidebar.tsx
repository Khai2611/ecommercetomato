import { Box } from '@chakra-ui/react';
import React from 'react'; // Import React for JSX
import Data from './Data';
import Profile from './Profile';

const Sidebar: React.FC = () => {
  return (
    <Box
      as="aside"
      flex="0 0 auto" // To control flex behavior and prevent sidebar from stretching
      mr={{ base: 0, md: 5 }}
      mb={{ base: 5, md: 0 }}
      bg="white"
      rounded="10px"
      borderWidth={1}
      borderColor="brand.light"
      style={{ transform: 'translateY(-100px)', marginTop:'90px', marginBottom:'0px'}}
      className="shadow-xl shadow-Orange/30 lg:w-1/4 w-full" // Adjusted width
    >
      {/* Pics and info */}
      <Profile />
      <Data />
    </Box>
  );
};

export default Sidebar;
