import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { CART_API_URL, FOOD_API_URL } from "../utils/constants";
import { getAuthConfig } from "../utils/authAxios";
import { useAuth } from "../hooks/useAuth";

export const StoreContext = createContext();

const StoreProvider = (props) => {

  const [foodList, setFoodList] = useState([]);
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);

  const fetchFoods = async () => {
    try {
      const response = await axios.get(`${FOOD_API_URL}/`);
      setFoodList(response.data.data);
    } catch (err) {
      console.log("Error fetching food data from backend");
    }
  }

  useEffect(() => {
    fetchFoods();
  }, [])

  const fetchUserCart = async () => {
    try {
      const config = await getAuthConfig(user);

      const response = await axios.get(`${CART_API_URL}/`,
        config
      );
      setCartItems(response.data.data || []);
    } catch (error) {
      console.log("Error fetching cart from backend");
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserCart();
    }
  }, [user]);

  const addToCart = async (itemId) => {

    //Save previous state for rollback
    const previousCart = cartItems;

    //update UI
    //if (!cartItems[itemId]) {
    //  setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    //}
    //else {
    //  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    //}

    setCartItems((prev) => {
      const existingItem = prev.find(item => item.foodId === itemId );

      if (existingItem) {
        return prev.map(item =>
          item.foodId === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Get food information for optimistic UI
      const food = foodList.find( item => item._id === itemId);

      return [
        ...prev,
        {
          foodId: itemId,
          name: food.name,
          unitPrice: food.price,
          quantity: 1
        }
      ];
    });

    //update database: axios.post(url, data, config);
    try {
      const config = await getAuthConfig(user);
      await axios.post(`${CART_API_URL}/add`,
        { foodId: itemId },
        config
      )
    } catch (error) {
      //If API fails rollback
      setCartItems(previousCart);
      console.log("Error adding item to plate", error);
    }
  }

  const removeFromCart = async (itemId) => {
    const previousCart = cartItems;

    //setCartItems((prev) => {
    //  const newCart = { ...prev };

    //  if (newCart[itemId] > 1) {
    //    newCart[itemId]--;
    //  }
    //  return newCart;
    //})

     setCartItems((prev) =>
        prev.map(item =>
            item.foodId === itemId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
    );

    try {
      const config = await getAuthConfig(user);
      await axios.put(`${CART_API_URL}/remove/${itemId}`,
        {},
        config
      )
    } catch (error) {
      setCartItems(previousCart);
      console.log("Error removing item from plate", error);
    }
  }

  const handleDelete = async () => {
    const previousCart = cartItems;

    const itemId = deleteItem._id;

    //setCartItems((prev) => {
    //  const newCart = { ...prev };
    //  delete newCart[itemId];
    //  return newCart;
    //});

    //const itemId = deleteItem.foodId;

    setCartItems((prev) =>
        prev.filter(item => item.foodId.toString() !== itemId)
    );

    setDeleteItem(null);

    try {
      const config = await getAuthConfig(user);
      await axios.delete(`${CART_API_URL}/delete/${itemId}`,
        config
      )
    } catch (error) {
      setCartItems(previousCart);
      console.log("Error deleting item from plate");
    }
  };

  const handleDeleteConfirm = (item) => {
    setDeleteItem(item);
  }

  const handleDeleteCancel = () => {
    setDeleteItem(null);
  };

  const getTotalAmount = () => {
    //let totalAmount = 0;
    //for (const i in cartItems) {
    //  if (cartItems[i] > 0) {
    //    let info = foodList.find((dish) => dish._id === i)
    //    totalAmount += info.price * cartItems[i];
    //  }
    //}
    //return totalAmount;
    return cartItems.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0
    );
  }

  const totalQuantity = () => {
    //let qtotal = 0;
    //for (const i in cartItems) {
    //  if (cartItems[i] > 0) {
    //    qtotal += cartItems[i];
    //  }
    //}
    //return qtotal;
     return cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );
  }

  const contextValue = {
    foodList,
    cartItems, setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    handleDelete, handleDeleteConfirm, deleteItem, handleDeleteCancel,
    totalQuantity
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;