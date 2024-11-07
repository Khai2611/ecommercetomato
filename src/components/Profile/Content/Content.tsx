import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useState } from "react";

import AccountSettings from "./AccountSettings";
import CompanySettings from "./CompanySettings";

const Content: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const tabs: string[] = ["Account Settings", "Order History"];

  return (
    <Box
      as="main"
      flex={3}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      pt={5}
      bg="white"
      // bg="tomato"
      rounded="10px"
      borderWidth={1}
      borderColor="gray.200"
      style={{
        transform: "translateY(-100px)",
        marginTop: "90px",
        marginBottom: "0px",
      }}
      className="shadow-xl shadow-Orange/30 lg:w-2/3"
    >
      <Tabs index={index} onChange={setIndex}>
        <TabList px={5}>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              mx={3}
              px={0}
              py={3}
              fontWeight="semibold"
              color="brand.cadet"
              borderBottomWidth={1}
              _active={{ bg: "transparent" }}
              _selected={{ color: "tomato", borderColor: "tomato" }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <AccountSettings />
          </TabPanel>
          <TabPanel>
            <CompanySettings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Content;
