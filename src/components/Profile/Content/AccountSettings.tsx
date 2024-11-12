import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Grid, Input, Select, Box, Button } from "@chakra-ui/react";

const AccountSettings: React.FC = () => {
  const [country, setCountry] = useState<string>("america");
  const [city, setCity] = useState<string>("New York");
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(false); // Track if inputs are editable

  // Define comprehensive city options for each country
  const citiesByCountry: Record<string, string[]> = {
    america: [
      "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
      "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"
    ],
    england: [
      "London", "Manchester", "Birmingham", "Leeds", "Liverpool",
      "Sheffield", "Bristol", "Newcastle", "Leicester", "Nottingham"
    ],
    poland: [
      "Warsaw", "Krakow", "Gdansk", "Poznan", "Wroclaw",
      "Lodz", "Szczecin", "Bydgoszcz", "Lublin", "Katowice"
    ],
    malaysia: [
      "Kuala Lumpur", "George Town", "Johor Bahru", "Ipoh", "Shah Alam",
      "Petaling Jaya", "Kota Kinabalu", "Kuching", "Seremban", "Melaka"
    ],
  };

  // Update city options when the country changes
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    setCityOptions(citiesByCountry[selectedCountry] || []);
    setCity(citiesByCountry[selectedCountry]?.[0] || ""); // Set the first city as default when country changes
  };

  // Toggle between read-only and editable mode
  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    // Set initial city options based on the default country
    setCityOptions(citiesByCountry[country] || []);
    setCity(citiesByCountry[country]?.[0] || ""); // Default first city
  }, [country]);

  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
      {/* First Name */}
      <FormControl id="firstName">
        <FormLabel>First Name</FormLabel>
        <Input
          focusBorderColor="tomato"
          type="text"
          placeholder="Tim"
          isReadOnly={!isEditable} // Make read-only when not editable
        />
      </FormControl>

      {/* Last Name */}
      <FormControl id="lastName">
        <FormLabel>Last Name</FormLabel>
        <Input
          focusBorderColor="tomato"
          type="text"
          placeholder="Cook"
          isReadOnly={!isEditable} // Make read-only when not editable
        />
      </FormControl>

      {/* Phone Number */}
      <FormControl id="phoneNumber">
        <FormLabel>Phone Number</FormLabel>
        <Input
          focusBorderColor="tomato"
          type="tel"
          placeholder="(408) 996–1010"
          isReadOnly={!isEditable} // Make read-only when not editable
        />
      </FormControl>

      {/* Email Address */}
      <FormControl id="emailAddress">
        <FormLabel>Email Address</FormLabel>
        <Input
          focusBorderColor="tomato"
          type="email"
          placeholder="tcook@apple.com"
          isReadOnly={!isEditable} // Make read-only when not editable
        />
      </FormControl>

      {/* Country */}
      <FormControl id="country">
        <FormLabel>Country</FormLabel>
        {isEditable ? (
          <Select
            focusBorderColor="tomato"
            placeholder="Select country"
            value={country}
            onChange={handleCountryChange}
          >
            <option value="america">America</option>
            <option value="england">England</option>
            <option value="poland">Poland</option>
            <option value="malaysia">Malaysia</option>
          </Select>
        ) : (
          <Input
            focusBorderColor="tomato"
            value={country.charAt(0).toUpperCase() + country.slice(1)} // Capitalize the first letter
            isReadOnly
          />
        )}
      </FormControl>

      {/* City */}
      <FormControl id="city">
        <FormLabel>City</FormLabel>
        {isEditable ? (
          <Select
            focusBorderColor="tomato"
            placeholder="Select city"
            value={city}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCity(e.target.value)}
            disabled={!country} // Disable city selection if no country is selected
          >
            {cityOptions.map((cityOption) => (
              <option key={cityOption} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </Select>
        ) : (
          <Input
            focusBorderColor="tomato"
            value={city}
            isReadOnly
          />
        )}
      </FormControl>

      {/* Update/Save Button */}
      <Box mt={5} py={5}>
        <Button
          bg="tomato" // Tomato when editable, gray when not
          color="white"
          _hover={{
            bg: "white",
            color: "tomato",
            border: "1px solid tomato"
          }}
          _active={{
            bg: "white", // Active state background color
            color: "tomato", // Active state text color
            border: "1px solid tomato", // Active state border
          }}
          onClick={toggleEditMode} // Toggle between editable and read-only
        >
          {isEditable ? "Save" : "Update"} {/* Button text */}
        </Button>
      </Box>
    </Grid>
  );
};

export default AccountSettings;
