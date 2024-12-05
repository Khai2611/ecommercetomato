import React from "react";
import "./Invoice.css"; // Importing the CSS file
import { assets } from "../../assets/frontend_assets/assets";

const Invoice: React.FC = () => {
  return (
    <div className="app-container">
      {/* Container */}
      <div className="content-container">
        {/* Header Section */}
        <div className="header">
          <div className="logo">
            <a
              href="http://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.logo} alt="Logo" />
            </a>
          </div>
          <div className="back-to-home">
            <a
              href="http://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="back-button"
            >
              Back to Home
            </a>
          </div>
        </div>

        {/* Purchase Section */}
        <div className="purchase-section">
          {/* Text Column */}
          <div className="purchase-text">
            <h1>
              <strong>Thanks for your purchase!</strong>
            </h1>
            <p className="order-id">Order ID: 2A4B25</p>
            <p>Date Purchased: 29 Oct 2024</p>
          </div>

          {/* Image Column */}
          <div className="purchase-image">
            <img src={assets.autumnn} alt="Purchase" />
          </div>
        </div>
      </div>

      {/* Invoice Section */}
      <div className="invoice-section">
        <h1>
          <strong>Here's your purchase:</strong>
        </h1>

        {/* Invoice Card */}
        <div className="invoice-card">
          <p className="invoice-for">Invoice for:</p>
          <p className="invoice-name">John Marsh</p>
          <p className="invoice-address">
            2754 Lucy Lane, East Enterprise, Indiana, United States 89898
          </p>

          {/* Scrollable */}
          <div
            className="product-items-container mt-5"
            style={{
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            {/* Product Image and Details */}
            <div className="product-item">
              {/* Image Column */}
              <div className="product-image">
                <img src={assets.shirt1a} alt="Shirt" />
              </div>

              {/* Invoice Orders */}
              <div className="product-text">
                <h3>Pink Scarf</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor.
                </p>
              </div>

              {/* Price Column */}
              <div className="product-price">
                <p>RM 145.90</p>
              </div>
            </div>

            {/* Repeat product items as needed */}
            <div className="product-item">
              {/* Image Column */}
              <div className="product-image">
                <img src={assets.shirt1a} alt="Shirt" />
              </div>

              {/* Invoice Orders */}
              <div className="product-text">
                <h3>Pink Scarf</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor.
                </p>
              </div>

              {/* Price Column */}
              <div className="product-price">
                <p>RM 145.90</p>
              </div>
            </div>

            <div className="product-item">
              {/* Image Column */}
              <div className="product-image">
                <img src={assets.shirt1a} alt="Shirt" />
              </div>

              {/* Invoice Orders */}
              <div className="product-text">
                <h3>Pink Scarf</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor.
                </p>
              </div>

              {/* Price Column */}
              <div className="product-price">
                <p>RM 145.90</p>
              </div>
            </div>

            {/* Add more products as necessary */}
          </div>

          <div className="subtotal1">
            <p className="subtotal-text">Subtotal</p>
            <p className="subtotal-text">RM 145.90</p>
          </div>

          <div className="subtotal1 no-border">
            <p className="subtotal-text">Shipping fee</p>
            <p className="subtotal-text">RM 291.80</p>
          </div>

          <div className="subtotal1 no-border">
            <p className="subtotal-text">Total</p>
            <p className="subtotal-text">RM 400.80</p>
          </div>
        </div>

        {/* <div className="thank-you alignment">
            <a
              href="http://example.com"
              className="thank-you-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Thanks for shopping with us!<br />Sincerely, Deloitte ❤️</span>
            </a>
          </div>
          <div className="social-follow">
            <p>
              Stay up-to-date with our latest collection by following us on your
              favorite social media channels.
            </p>
          </div> */}

        <div className="thank-you alignment">
          <p className="thank-you-text">
            Thanks for shopping with us!
            <br />
            Sincerely, Deloitte ❤️
          </p>
        </div>
        <div className="social-follow">
          <p>
            Stay up-to-date with our latest collection by following us on your
            favorite social media channels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
