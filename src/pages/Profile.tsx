import Content from "../components/Profile/Content/Content";
import Sidebar from "../components/Profile/Sidebar/Sidebar";
import Cover from "../components/Profile/Cover";
import React from "react";

const Profile: React.FC = () => {
  return (
    <div>
      <Cover />
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row mt-1">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default Profile;