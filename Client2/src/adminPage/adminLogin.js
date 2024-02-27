import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Loginadmin = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
  

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}admin/loginadmin`, {
                admin_mail: email,
                admin_password: password,
            });



            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('user',(token));
                console.log(token, "venu token")

                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.error('Error during POST request:', error);
            if (error.response) {
                // Server responded with a status code outside of 2xx range
                console.error('Server Error:', error.response.data);
                alert(error.response.data.message || 'An error occurred');
            } else if (error.request) {
                // Request made but no response received
                console.error('No response received:', error.request);
                alert('No response received from server');
            } else {
                // Something else went wrong
                console.error('Error:', error.message);
                alert('An error occurred');
            }
        }
    };

    return (
        <>
            <div className='dashboard'>
                <div className="form-container">
                    <p className="title">Admin Login</p>
                    <form className="form" onSubmit={handleSubmit} >
                        <input type="email" name="email" className="input" placeholder="Email" required  />
                        <input type="password" name="password" className="input" placeholder="Password" required />
                        <button type='submit' className="form-btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Loginadmin;
