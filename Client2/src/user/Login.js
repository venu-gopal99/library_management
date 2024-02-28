import React,{useState} from 'react'
import Header from './Header'
import "./user.css"
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function Login() {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const handleShow = () => {
        setShow(!show);
    };
    const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
        useFormik({
            initialValues: {
                student_ID: "",
                student_password: "",
            },
            validationSchema: Yup.object().shape({
                student_ID: Yup.string()
                    .required("Roll no is required"),
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
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}student/loginuser`,
                        values);
                    console.log(response.data.token, "response")
                    if (response.status == 200) {
                        const token = response.data.token;
                     localStorage.setItem('user', (token));
                        console.log(token,"sdvsdiuvgsdviu")
                    }
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Book added successfully",
                    });
                    const message = response.data.message;
                    toast.success(message)
                    navigate("/home")
                    //   resetForm();
                } catch (error) {
                    console.log(error)
                    toast.error(error.response.data.message)
                }
            }
        })




    return (
        <div className='container-fluid'>
            {/* <Header className="" /> */}
            <div className="container container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={handleSubmit} >
                            <h1 className="mb-3">Login</h1>
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
                                <label for="password_field">Password</label>
                                <input type={show ? "password" : "text"}
                                    name="student_password"
                                    onChange={handleChange}
                                    className={`form-control  ${errors.student_password && touched.student_password
                                        ? "login_error1"
                                        : ""
                                        }`}
                                    value={values.student_password}
                                    autocomplete="current-password" />

                                <label className="fs-4" onClick={handleShow}>
                                    {show ? <FaRegEyeSlash /> : <IoEyeOutline />}
                                </label>



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
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGIN
                                </button>
                            </div>


                            <Link to="/register" className="float-right mt-3">New User?</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login