
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import FoodForm from '../components/FoodForm'
import { ADMIN_FOOD_API_URL } from '../util/api'

const initialState = {
  name: "",
  image: null,
  price: "",
  description: "",
  category: ""
}

const AddFood = () => {

  const [foodData, setFoodData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!foodData.image) {
      toast.error("Please upload a food image!");
      return;
    }

    try {
      const formData = new FormData();

      Object.entries(foodData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(`${ADMIN_FOOD_API_URL}/`, formData)

      setFoodData(initialState);
      toast.success(response.data.message);

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <FoodForm foodData={foodData} setFoodData={setFoodData} onSubmit={handleSubmit} submitText="ADD TO MENU" />
  )
}

export default AddFood