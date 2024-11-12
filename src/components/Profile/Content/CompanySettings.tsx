import React from 'react';

const CompanySettings: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-1xl mx-auto px-2">
      {/* Company ID */}
      <div className="flex flex-col">
        <label htmlFor="companyId" className="text-gray-700 font-medium">Company ID</label>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-gray-500">
            <svg width="1em" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            id="companyId"
            type="text"
            placeholder="apple"
            className="pl-10 p-2 border rounded focus:ring-2 focus:ring-tomato w-full"
          />
        </div>
      </div>

      {/* Company Name */}
      <div className="flex flex-col">
        <label htmlFor="companyName" className="text-gray-700 font-medium">Name</label>
        <input
          id="companyName"
          type="text"
          placeholder="Apple"
          className="mt-1 p-2 border rounded focus:ring-2 focus:ring-tomato"
        />
      </div>

      {/* Company Email */}
      <div className="flex flex-col">
        <label htmlFor="emailCompany" className="text-gray-700 font-medium">Email Address</label>
        <input
          id="emailCompany"
          type="email"
          placeholder="info@apple.com"
          className="mt-1 p-2 border rounded focus:ring-2 focus:ring-tomato"
        />
      </div>

      {/* Company Size */}
      <div className="flex flex-col">
        <label htmlFor="companySize" className="text-gray-700 font-medium">Size</label>
        <div className="flex items-center border rounded">
          <button className="px-3 py-2 border-r focus:outline-none focus:ring-2 focus:ring-tomato">
            <span className="text-lg">+</span>
          </button>
          <input
            id="companySize"
            type="number"
            placeholder="6000"
            className="w-full px-4 py-2 focus:ring-2 focus:ring-tomato text-center"
          />
          <button className="px-3 py-2 border-l focus:outline-none focus:ring-2 focus:ring-tomato">
            <span className="text-lg">-</span>
          </button>
        </div>
      </div>


       {/* Update/Save Button */}
       <div className="col-span-full mt-5 mb-10">
        <button
          className="py-2 px-4 rounded text-white bg-tomato hover:bg-white hover:text-tomato hover:border hover:border-tomato"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CompanySettings;
