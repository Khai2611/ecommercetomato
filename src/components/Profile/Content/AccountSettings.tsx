import React, { useState, useEffect } from "react";

const AccountSettings: React.FC = () => {
  const [country, setCountry] = useState<string>("america");
  const [city, setCity] = useState<string>("New York");
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  // Define comprehensive city options for each country
  const citiesByCountry: Record<string, string[]> = {
    america: [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose",
    ],
    england: [
      "London",
      "Manchester",
      "Birmingham",
      "Leeds",
      "Liverpool",
      "Sheffield",
      "Bristol",
      "Newcastle",
      "Leicester",
      "Nottingham",
    ],
    poland: [
      "Warsaw",
      "Krakow",
      "Gdansk",
      "Poznan",
      "Wroclaw",
      "Lodz",
      "Szczecin",
      "Bydgoszcz",
      "Lublin",
      "Katowice",
    ],
    malaysia: [
      "Kuala Lumpur",
      "George Town",
      "Johor Bahru",
      "Ipoh",
      "Shah Alam",
      "Petaling Jaya",
      "Kota Kinabalu",
      "Kuching",
      "Seremban",
      "Melaka",
    ],
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    setCityOptions(citiesByCountry[selectedCountry] || []);
    setCity(citiesByCountry[selectedCountry]?.[0] || "");
  };

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    setCityOptions(citiesByCountry[country] || []);
    setCity(citiesByCountry[country]?.[0] || "");
  }, [country]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-1xl mx-auto px-2">
      {/* First Name */}
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-gray-700 font-medium">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          placeholder="Tim"
          readOnly={!isEditable}
          className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none focus:outline-none ${
            !isEditable && "bg-white"
          }`}
        />
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-gray-700 font-medium">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="Cook"
          readOnly={!isEditable}
          className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none ${
            !isEditable && "bg-white"
          }`}
        />
      </div>

      {/* Phone Number */}
      <div className="flex flex-col">
        <label htmlFor="phoneNumber" className="text-gray-700 font-medium">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          placeholder="(408) 996–1010"
          readOnly={!isEditable}
          className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none ${
            !isEditable && "bg-white"
          }`}
        />
      </div>

      {/* Email Address */}
      <div className="flex flex-col">
        <label htmlFor="emailAddress" className="text-gray-700 font-medium">
          Email Address
        </label>
        <input
          id="emailAddress"
          type="email"
          placeholder="tcook@apple.com"
          readOnly={!isEditable}
          className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none ${
            !isEditable && "bg-white"
          }`}
        />
      </div>

      {/* Country */}
      <div className="flex flex-col">
        <label htmlFor="country" className="text-gray-700 font-medium">
          Country
        </label>
        {isEditable ? (
          <select
            id="country"
            value={country}
            onChange={handleCountryChange}
            className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none ${
              isEditable ? "bg-white" : "bg-white"
            }`}
          >
            <option value="america">America</option>
            <option value="england">England</option>
            <option value="poland">Poland</option>
            <option value="malaysia">Malaysia</option>
          </select>
        ) : (
          <input
            id="country"
            type="text"
            value={country.charAt(0).toUpperCase() + country.slice(1)}
            readOnly
            className="mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none"
          />
        )}
      </div>

      {/* City */}
      <div className="flex flex-col">
        <label htmlFor="city" className="text-gray-700 font-medium">
          City
        </label>
        {isEditable ? (
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none ${
              !country && "bg-white"
            }`}
            disabled={!country}
          >
            {cityOptions.map((cityOption) => (
              <option key={cityOption} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </select>
        ) : (
          <input
            id="city"
            type="text"
            value={city}
            readOnly
            className="mt-1 p-2 border rounded focus:ring-1 focus:ring-tomato focus:outline-none"
          />
        )}
      </div>
      {/* Update/Save Button */}
      <div className="col-span-full mt-5 mb-10">
        <button
          onClick={toggleEditMode}
          className={`py-2 px-4 rounded text-white ${
            isEditable
              ? "bg-tomato hover:bg-white hover:text-tomato hover:border hover:border-tomato"
              : "bg-tomato"
          }`}
        >
          {isEditable ? "Save" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
