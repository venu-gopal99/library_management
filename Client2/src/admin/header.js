import React, { useEffect, useState } from 'react'
import logo from "../assests/logo.jpg"
import adminlogo from "../assests/admin.png"
import { useNavigate } from 'react-router-dom';
import {Link } from 'react-router-dom';
const Header = () => {
    const token = localStorage.getItem("user");
    
    const [logout, setLogout] = useState(false);
    const navigate = useNavigate();
    const handleclick = () => {
        setLogout(localStorage.removeItem("user"))
    }
    const [isSidebarActive, setSidebarActive] = useState(false);
   
    useEffect(()=>{
    if(!token){
        navigate("/admin")
    }
   },[])
   
    const toggleSubMenu = (event) => {
        // Find the submenu element
        const subMenu = event.target.nextElementSibling;
        
        // Check if the submenu element exists
        if (subMenu) {
            // Toggle the display property to show/hide the submenu
            subMenu.style.display = subMenu.style.display === 'none' ? 'block' : 'none';
    
            // Find the dropdown icon element inside the target
            const dropdownIcon = event.target.querySelector('.dropdown');
    
            // Check if the dropdown icon element exists
            if (dropdownIcon) {
                // Toggle the 'rotate' class to rotate the dropdown icon
                dropdownIcon.classList.toggle('rotate');
            } else {
                console.error('Dropdown icon element not found.');
            }
        } else {
            console.error('Submenu element not found.');
        }
    };
    

    const openSidebar = () => {
        setSidebarActive(true);
    };

    const closeSidebar = () => {
        setSidebarActive(false);
    };
    return (
        <>
            <header>
                <nav>
                    <div className='dashboard-header'>
                        <div className='menu-bar' onClick={openSidebar}>
                            <div className='bar'>
                                <span className='ms-3 bi bi-list'></span>
                            </div>

                        </div>
                        <div className='dash-logo'>
                            <div className='logo'>
                                <img src={logo} />
                            </div>

                        </div>
                        <div className='dash-search'>
                            <div className="searchBar">
                                <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search ..." value="" />
                                <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                                    <span className="bi bi-search"></span>
                                </button>
                            </div>

                        </div>
                        <div className='dash-menu'>
                            <div className=''>
                                <div className=''>
                                    <span className="bi bi-bell"></span>
                                </div>
                            </div>
                            <div className=''>
                                <div className=''>
                                    <span className="bi bi-gear-fill"></span>
                                </div>
                            </div>
                            <div className=''>
                                <div className=''>
                                    <span className="bi bi-grid"></span>

                                </div>
                            </div>
                            <div className='admin-profile'>
                                <img src={adminlogo} onClick={handleclick} />
                            </div>

                        </div>
                    </div>
                </nav>

                <div className={`logout ${logout ? 'active' : ''}`}>
                    <div className=''>
                        <button  className='mt-2'>Log out</button>
                    </div>
                </div>
            </header>

            <div className={`sidebar-dash ${isSidebarActive ? 'active' : ''}`}>
                <div className="menu">
                    <div className="item">
                        <Link to="/admin/dashboard">
                            <i className="bi bi-speedometer2"></i>Dashboard
                        </Link>
                    </div>
                    <div className="item">
                        <Link to="#" className="sub-btn" onClick={toggleSubMenu}>
                            <i className="bi bi-table"></i>Products<i className="fas fa-angle-right dropdown"></i>
                        </Link>
                        <div className="sub-menu">
                            <Link to="/admin/allproducts" className="sub-item"><span className="bi bi-record"></span> Products List</Link>
                            <Link to="/admin/addproduct" className="sub-item"><span className="bi bi-record"></span> Add Products</Link>
                            
                        </div>
                    </div>
                    <div className="item" onClick={toggleSubMenu}>
                        <Link to="#" className="sub-btn">
                            <i className="bi bi-cart4"></i>Orders<i className="fas fa-angle-right dropdown"></i>
                        </Link>
                        <div className="sub-menu">
                            <Link to="/admin/allorders" className="sub-item">All Orders</Link>
                        </div>
                    </div>
                    <div className="item" onClick={toggleSubMenu}>
                        <Link to="#" className="sub-btn">
                            <i className="bi bi-person"></i>Students<i className="fas fa-angle-right dropdown"></i>
                        </Link>
                        <div className="sub-menu">
                            <Link to="/admin/students" className="sub-item"><span className="bi bi-record"></span> Students List</Link>
                           
                        </div>
                    </div>
                   
                    
                 
                  
                </div>
            </div>

        </>
    )
}

export default Header