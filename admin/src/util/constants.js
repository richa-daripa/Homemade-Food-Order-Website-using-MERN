import { LayoutDashboard, Utensils, ShoppingBag, Users, Star, } from "lucide-react";

export const menuItems = [
  //{
  //  name: "Dashboard",
  //  path: "/admin/dashboard",
  //  icon: LayoutDashboard,
  //},
  {
    name: "Foods",
    path: "/admin/foods",
    icon: Utensils,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingBag,
  },
  //{
  //  name: "Users",
  //  path: "/admin/users",
  //  icon: Users,
  //},
  //{
  //  name: "Reviews",
  //  path: "/admin/reviews",
  //  icon: Star,
  //},
];

export const FOOD_API_URL = 'http://localhost:5000/api/foods'
export const ALL_CUSTOMERS_ORDER_API_URL = 'http://localhost:5000/api/admin/orders'

export const IMAGE_URL = "http://localhost:5000/images"

export const foodCategory = ['Breakfast', 'Dessert', 'NonVeg', 'Snacks', 'Nutritious', 'Lunch', 'Dinner', 'Curry'];