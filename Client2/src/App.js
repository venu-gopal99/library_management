import React from "react";
import { Routes, Route } from "react-router-dom";
import Adminlogin from "./adminPage/adminLogin";
import DashBoard from './adminPage/dashBoard';
import AllOrders from "./adminPage/allOrders";
import Header from "./admin/header";
import "./App.css"
// import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { StudentList } from "./adminPage/studentList";
import { ProductList } from "./adminPage/productList";
import { AddProduct } from "./adminPage/addProduct";
import Register from "./user/Register";
import Login from "./user/Login";
import { Home } from "./user/Home";
import { Due } from "./user/Due";
import { Books } from "./user/Books";
import { History } from "./user/History";


import {useGetPokemonByNameQuery,usePostMethodMutation} from "../src/Rtk/Rtkquery"
function App() {
  const {data}=useGetPokemonByNameQuery("pokemonApi")
  console.log(data)
  
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/admin/dashboard" element={<DashBoard />} />
        <Route path="/admin/allorders" element={<AllOrders />} />
        <Route path="/admin/students" element={<StudentList />} />
        <Route path="/admin/allproducts" element={<ProductList />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/addproduct/:id" element={<AddProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/due" element={<Due/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/books" element={<Books/>}/>
        {/* <Route path="/" element={<Header />} /> */}
      </Routes>

    </div>
  );
}

export default App;
