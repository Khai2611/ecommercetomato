import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/ui/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import ProductDeets from "../src/pages/ProductDeets"
import Shop from "../src/pages/Shop";
import Profile from "../src/pages/Profile";
import Footer from "./components/ui/Footer/Footer";


const App: React.FC = () => { // Specify the return type as React.FC

  return (
    <>
      <Navbar />
      <div className="app">
        <ToastContainer />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/products/:id" element={<ProductDeets />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};


export default App;
