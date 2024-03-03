import React, { useState } from 'react'
import "./user.css"
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function Register() {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const handleShow = () => {
        setShow(!show);
    };

    const {
        values,
        errors,
        handleChange,
        touched,
        handleSubmit,
        resetForm

    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            student_ID: "",
            student_name: "",
            student_email: "",
            student_phoneNo: "",
            student_dept: "",
            student_password: "",
        },
        validationSchema: Yup.object().shape({
            student_ID: Yup.string()
                .required("Roll no is required"),
            student_name: Yup.string()
                .matches(
                    /^[A-Z][a-z]*$/,
                    "Name must start with a capital letter and be followed by lowercase letters"
                )
                .required("Name is required"),
            student_email: Yup.string()
                .required("Email is required")
                .matches(
                    /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    "Invalid email address"
                ),
            student_phoneNo: Yup.string()
                .matches(/^\d{10}$/, "Must be exactly 10 digits")
                .required("Mobile Number is required"),
            student_dept: Yup.string()
                .required("Department is required"),
            student_password: Yup.string()
                .min(8, "Password must be 8 characters long")
                .matches(/[0-9]/, "Password requires a number")
                .matches(/[a-z]/, "Password requires a lowercase letter")
                .matches(/[A-Z]/, "Password requires an uppercase letter")
                .matches(/[^\w]/, "Password requires a symbol")
                .required("Please enter new password"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}student/createuser`,
                    values,
                  
                )
                console.log(response,"response")
                if(response.status == 201){
                   const token =  response.data.token  ;
                   localStorage.setItem('user',(token));
                }
                const message = response.data.message;
              toast.success(message)
              navigate("/")
              resetForm();
            } catch (error) {
                console.log(error)
               toast.error(error.response.data.message)
            }
        }
    })


    return (
        <div>
            <div className="container container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={handleSubmit}>
                            <h1 className="mb-3">Register</h1>

                            <div className="form-group">
                                <label for="email_field">Roll No</label>
                                <input type="text"
                                    name="student_ID"
                                    onChange={handleChange}
                                    className={`form-control  ${errors.student_ID && touched.student_ID
                                        ? "login_error1"
                                        : ""
                                        }`}
                                    value={values.student_ID} />
                                {errors.student_ID && touched.student_ID ? (
                                    <div className="product_name">
                                        {errors.student_ID}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="form-group">
                                <label for="email_field">Name</label>
                                <input type="text"
                                    name="student_name"
                                    onChange={handleChange}
                                    className={`form-control  ${errors.student_name && touched.student_name
                                        ? "login_error1"
                                        : ""
                                        }`}
                                    value={values.student_name} />
                                {errors.student_name && touched.student_name ? (
                                    <div className="product_name">
                                        {errors.student_name}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="form-group">
                                <label for="email_field">Email</label>
                                <input type="text"
                                    name="student_email"
                                    onChange={handleChange}
                                    className={`form-control  ${errors.student_email && touched.student_email
                                        ? "login_error1"
                                        : ""
                                        }`}
                                    value={values.student_email} />
                                {errors.student_email && touched.student_email ? (
                                    <div className="product_name">
                                        {errors.student_email}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="form-group">
                                <label for="email_field">Phone No</label>
                                <input type="text"
                                    name="student_phoneNo"
                                    onChange={handleChange}
                                    className={`form-control  ${errors.student_phoneNo && touched.student_phoneNo
                                        ? "login_error1"
                                        : ""
                                        }`}
                                    value={values.student_phoneNo} />
                                {errors.student_phoneNo && touched.student_phoneNo ? (
                                    <div className="product_name">
                                        {errors.student_phoneNo}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>



                            <div className="form-group">
                                <label for="email_field">Deptartment</label>
                                <input type="text"
                                    name="student_dept"
                                    onChange={handleChange}
                                    className={`form-control  ${errors.student_dept && touched.student_dept
                                        ? "login_error1"
                                        : ""
                                        }`}
                                    value={values.student_dept} />
                                {errors.student_dept && touched.student_dept ? (
                                    <div className="product_name">
                                        {errors.student_dept}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>



                            <div className="form-group">
                                <label for="password_field">Password</label>
                                <input type={show ? "password" : "text"}
                                    name="student_password"
                                    onChange={handleChange}
                                    className={`form-control  ${errors.student_password && touched.student_password
                                        ? "login_error1"
                                        : ""
                                        }`}
                                    value={values.student_password} />
{/* 
                                <label className="fs-4" onClick={handleShow}>
                                    {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                                </label> */}



                                {errors.student_password && touched.student_password ? (
                                    <div className="product_name">
                                        {errors.student_password}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>




                            <div className='d-flex justify-content-center'>

                                <button
                                   
                                    type="submit"
                                    className="btn btn-block py-3 float-center"
                                >
                                    REGISTER
                                </button>
                               
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register