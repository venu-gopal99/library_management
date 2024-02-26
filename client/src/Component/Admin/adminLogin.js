import React from 'react'
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const Loginadmin = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_url}admin/adminLogin`, {
                email: email,
                password: password,
            });
            if (response.status == 200) {
                const token = response.data.token
                localStorage.setItem('admin-auth', (token))
                navigate('/admin/dashboard')
            }
        } catch (error) {
            console.error('Error during POST request:', error.response.data.Message);
            alert(error.response.data.Message)
        }
    };

    return (
        <>
            <div className='dashboard'>
                <div className="form-container">
                    <p className="title">Admin Login</p>

                    <form className="form" onSubmit={handleSubmit}>
                        <input type="email" name="email" className="input" placeholder="Email" required />
                        <input type="password" name="password" className="input" placeholder="Password" required />
                        <button type='submit' className="form-btn">Submit</button>
                    </form>


                </div>
            </div>
        </>
    )
}

export default Loginadmin;