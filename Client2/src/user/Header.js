import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assests/logo.jpg"


function Header() {
   const navigate = useNavigate();
   const token = localStorage.getItem('user');

    useEffect(()=>{
        if(!token){
         navigate("/")
        }
    })

    const handleClick = ()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("user_detail")
        navigate("/")
    }
    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <a className="navbar-brand" href="#">
                    <a className="navbar-brand" href="#">
                        <img src={logo} width="30" height="30"  className="d-inline-block align-top mx-2" alt="" />
                        Library
                    </a>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
                    <ul className="navbar-nav listss">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/home">HOME </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/books">BOOKS</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/due">DUE</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/history">HISTORY</Link>
                        </li>
                        
                    </ul>
                </div>
                <div>
                    <ul className="navbar-nav listss">
                    <li className="nav-item pl-4">
                            <button className="nav-link" onClick={handleClick}>LOGOUT</button>
                        </li> 
                    </ul>
                    
                </div>
            </nav>
        </div>
    )
}

export default Header