import { Container } from "@chakra-ui/layout";
import Content from "../components/Profile/Content/Content";
import Sidebar from "../components/Profile/Sidebar/Sidebar";
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../components/Profile/style';
import  Cover from '../components/Profile/Cover';

import React from "react";

const Profile: React.FC = () => {
  return (
      <ChakraProvider theme={theme}>
        <Cover />
        <Container 
          display={{ base: "block", md: "flex" }} 
          maxW="container.xl"
          height="650px" // Set to your desired height
          >
          <Sidebar />
          <Content />
        </Container>
      </ChakraProvider>
  );
};

export default Profile;
