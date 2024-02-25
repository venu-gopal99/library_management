import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './adminPage/Home'
import About from './adminPage/About'
import Service from './adminPage/Service'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/' element={<Service/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
