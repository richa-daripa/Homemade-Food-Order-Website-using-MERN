import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FoodForm from '../components/FoodForm';
import { FOOD_API_URL } from '../util/constants';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

const EditFood = () => {
  const { id } = useParams();
  const [foodData, setFoodData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleFood = async () => {

      try {
        const response = await axios.get(`${FOOD_API_URL}/${id}`);
        setFoodData(response.data);

      } catch (err) {
        toast.error("Unable to load the food details");
      }
    }
    fetchSingleFood();
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", foodData.name)
      formData.append("price", foodData.price);
      formData.append("description", foodData.description);
      formData.append("category", foodData.category);

      // if new image is selected 
      if (foodData.image instanceof File) {
        formData.append("image", foodData.image);
      }
      const response = await axios.put(`${FOOD_API_URL}/${id}`, formData);

      toast.success(response.data.message);
      navigate("/admin/foods");

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  if (!foodData) {
    return (
      <div className='text-center mt-5'>
        <Spinner animation='border' variant='primary' />
      </div>
    )
  }

  return (
    <FoodForm foodData={foodData} setFoodData={setFoodData} onSubmit={handleSubmit} submitText="UPDATE MENU" />
  )
}

export default EditFood