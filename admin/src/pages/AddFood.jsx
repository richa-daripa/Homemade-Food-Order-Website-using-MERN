
import React, { useState } from 'react'
import axios from 'axios'
import { FOOD_API_URL} from '../util/constants'
import { toast } from 'react-toastify'
import FoodForm from '../components/FoodForm'

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
      //console.log(foodData);

      const formData = new FormData();

      Object.entries(foodData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(`${FOOD_API_URL}/`, formData)

      //if (response.status === 201 || response.status === 200) {
      //  // Reset form
      //  setFoodData(initialState);
      //  setImagePreview(null);
      //
      //  // Reset file input
      //  fileInputRef.current.value = "";
      //
      //  toast.success(response.data.message);
      //}
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