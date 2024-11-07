import axios from "axios";
import React, { createContext, useEffect, useState, ReactNode } from "react";

// Define types for context state
interface CartItems {
  [key: string]: number; // itemId as key and quantity as value
}

interface ProdItem {
  category: string;
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface StoreContextType {
  prod_list: ProdItem[];
  cartItems: CartItems;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  // addToCart: (itemId: string) => Promise<void>;
  // removeFromCart: (itemId: string) => Promise<void>;
  // getTotalCartAmount: () => number;
  url: string;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

// Create context
export const StoreContext = createContext<StoreContextType | null>(null);

const StoreContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItems>({});
  const url = "https://food-delivery-backend-5b6g.onrender.com";
  const [token, setToken] = useState<string>("");
  const [prod_list, setProdList] = useState<ProdItem[]>([]);

  // const addToCart = async (itemId: string) => {
  //   if (!cartItems[itemId]) {
  //     setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  //   } else {
  //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   }
  //   if (token) {
  //     const response = await axios.post(
  //       `${url}/api/cart/add`,
  //       { itemId },
  //       { headers: { token } }
  //     );
  //     if (response.data.success) {
  //       toast.success("Item added to cart");
  //     } else {
  //       toast.error("Something went wrong");
  //     }
  //   }
  // };

  // const removeFromCart = async (itemId: string) => {
  //   if (cartItems[itemId] > 1) {
  //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  //   } else {
  //     setCartItems((prev) => {
  //       const newCart = { ...prev };
  //       delete newCart[itemId];
  //       return newCart;
  //     });
  //   }
  //   if (token) {
  //     const response = await axios.post(
  //       `${url}/api/cart/remove`,
  //       { itemId },
  //       { headers: { token } }
  //     );
  //     if (response.data.success) {
  //       toast.success("Item removed from cart");
  //     } else {
  //       toast.error("Something went wrong");
  //     }
  //   }
  // };

  // const getTotalCartAmount = () => {
  //   return Object.keys(cartItems).reduce((totalAmount, item) => {
  //     if (cartItems[item] > 0) {
  //       const itemInfo = prod_list.find((product) => product._id === item);
  //       return totalAmount + (itemInfo ? itemInfo.price * cartItems[item] : 0);
  //     }
  //     return totalAmount;
  //   }, 0);
  // };

  const fetchProdList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setProdList(response.data.data);
    } else {
      alert("Error! Products are not fetching.");
    }
  };

  const loadCartData = async (token: string) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchProdList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };
    loadData();
  }, []);

  const contextValue: StoreContextType = {
    prod_list,
    cartItems,
    setCartItems,
    // addToCart,
    // removeFromCart,
    // getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
