import { Box } from "@chakra-ui/react";
import React from "react"; // Import React for JSX
import Data from "./Data";
import Profile from "./Profile";

const Sidebar: React.FC = () => {
  return (
    <Box
      as="aside"
      mr={{ base: 0, md: 5 }}
      mb={{ base: 5, md: 0 }}
      bg="white"
      rounded="10px"
      borderWidth={1}
      borderColor="brand.light"
      style={{
        transform: "translateY(-100px)",
        marginTop: "90px",
        marginBottom: "0px",
        flexShrink: 0,
        width: '300px', // Fixed width
      }}
      className="shadow-xl shadow-Orange/30" // Adjusted width
    >
      {/* Pics and info */}
      <Profile />
      <Data />
    </Box>
  );
};

export default Sidebar;
