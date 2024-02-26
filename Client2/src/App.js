import React from "react";
import {  Routes, Route } from "react-router-dom";
import Home from "./adminPage/Home";
import About from "./adminPage/About";
import Service from "./adminPage/Service";

function App() {
  return (
    <div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
        </Routes>
   
    </div>
  );
}

export default App;
