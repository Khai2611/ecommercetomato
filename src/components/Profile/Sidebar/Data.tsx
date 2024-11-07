import React from "react";
import { Box, Text, VStack, Button } from "@chakra-ui/react";

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
    color: "yellow",
  },
  {
    id: 2,
    name: "Online Purchase",
    value: 26,
    color: "green",
  },
  {
    id: 3,
    name: "Store Purchase",
    value: 6,
    color: "blue",
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
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          <Text color="brand.dark">{item.name}</Text>
          <Text color={`brand.${item.color}`} fontWeight="bold">
            {item.value}
          </Text>
        </Box>
      ))}

      <Box mt={5} py={10} px={8}>
        {/* <Box mt={5} py={10} px={8} borderTopWidth={1} borderColor="brand.light"> */}
        <Button
          bg="tomato" // Set the background color to tomato
          color="white" // Optional: change text color for better contrast
          _hover={{
            bg: "white", // Background color on hover
            color: "tomato", // Text color on hover
            border: "1px solid tomato", // Optional: add a border for better visibility
          }}
        >
          Log Out
        </Button>
      </Box>
    </VStack>
  );
};

export default Data;
