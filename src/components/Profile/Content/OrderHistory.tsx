import React from "react";
import p1 from "../../../assets/frontend_assets/p1.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import ProductList from "../../orderHistory/ProductList";
import Title from "../../orderHistory/Title";

const OrderHistory: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Product 1 adsadas sadasdasd sadsadwa sdasdwad",
      category: "Category 1",
      price: "RM230",
      image: p1,
      quantity: 12,
      orderId: "abc123",
      date: "Oct 20, 2024",
    },
    {
      id: 2,
      name: "Product 2",
      category: "Category 2",
      price: "RM150",
      image: p1,
      quantity: 8,
      orderId: "abc123",
      date: "Oct 20, 2024",
    },
    {
      id: 3,
      name: "Product 3",
      category: "Category 3",
      price: "RM150",
      image: p1,
      quantity: 82,
      orderId: "abc234",
      date: "Oct 20, 2024",
    },
  ];

  const orders = [
    {
      orderId: "abc123",
      orderDate: "30 Oct 2024",
    },
    {
      orderId: "abc234",
      orderDate: "30 Nov 2025",
    },
    {
      orderId: "abc234",
      orderDate: "30 Nov 2025",
    },
    {
      orderId: "abc234",
      orderDate: "30 Nov 2025",
    },
  ];
  return (
    <div className="max-w-1xl mx-auto px-2 mb-10">
      <div className="space-y-5">
        {orders.map((order) => {
          // Filter products based on current orderId
          const filteredProducts = products.filter(
            (product) => product.orderId === order.orderId
          );

          return (
            <Accordion
              key={order.orderId}
              type="single"
              collapsible
              className="w-full border rounded-2xl shadow-md"
            >
              <AccordionItem value={order.orderId}>
                <AccordionTrigger className="mx-5">
                  <Title orderId={order.orderId} orderDate={order.orderDate} />
                </AccordionTrigger>
                <AccordionContent className="border">
                  <ProductList products={filteredProducts} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    
    </div>
  );
};

export default OrderHistory;
