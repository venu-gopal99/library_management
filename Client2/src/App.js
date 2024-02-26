import React from "react";
import { Routes, Route } from "react-router-dom";
import Adminlogin from "./adminPage/adminLogin";
import DashBoard from './adminPage/dashBoard';
import AllOrders from "./adminPage/allOrders";
import Header from "./admin/header";
import "./App.css"
// import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { StudentList } from "./adminPage/studentList";
import { ProductList } from "./adminPage/productList";
import { AddProduct } from "./adminPage/addProduct";
function App() {
  return (
    <div>

      <Routes>
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/admin/dashboard" element={<DashBoard />} />
        <Route path="/admin/allorders" element={<AllOrders />} />
        <Route path="/admin/students" element={<StudentList />} />
        <Route path="/admin/allproducts" element={<ProductList/>} />
        <Route path="/admin/addproduct" element={<AddProduct/>} />

        <Route path="/" element={<Header />} />
      </Routes>

    </div>
  );
}

export default App;
