import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'
import Foods from './pages/ManageFoods'
import Orders from './pages/ManageOrders'
import AddFood from './pages/AddFood'
import EditFood from './pages/EditFood'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="foods" replace />} />
        <Route path="foods" element={<Foods />} />
        <Route path="foods/add" element={<AddFood />} />
        <Route path="foods/edit/:id" element={<EditFood />} />
        <Route path="orders" element={<Orders />} />
      </Route>
      {/* Catch-all: show custom 404 page for invalid route*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App