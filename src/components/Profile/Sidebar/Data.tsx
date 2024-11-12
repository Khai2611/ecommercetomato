import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

// Define the type for the items in the list
interface ListItem {
  id: number;
  name: string;
  value: number;
  color: string;
}

const list: ListItem[] = [
  {
    id: 1,
    name: "Points",
    value: 32,
    color: "#ed9b13",
  },
  {
    id: 2,
    name: "Online Purchase",
    value: 26,
    color: "#36c537",
  },
  {
    id: 3,
    name: "Store Purchase",
    value: 6,
    color: "#4164e3",
  },
];

const Data: React.FC = () => {
  return (
    <VStack as="ul" spacing={0} listStyleType="none">
    {list.map((item) => (
        <Box
          key={item.id}
          as="li"
          w="full"
          py={3}
          px={5}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          <Text color="brand.dark">{item.name}</Text>
          <Text color={`${item.color}`} fontWeight="bold">
            {item.value}
          </Text>
        </Box>
      ))}

     <div className="col-span-full mt-5 mb-10">
        <button
          className="py-2 px-4 rounded text-white bg-tomato hover:bg-white hover:text-tomato hover:border hover:border-tomato">
          Log Out
        </button>
      </div>
    </VStack>
  );
};

export default Data;
