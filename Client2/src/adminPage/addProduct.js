// import React from 'react'
import Header from '../admin/header'
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import $ from "jquery";

export const AddProduct = () => {
    
    const token = localStorage.getItem("admin-auth");
     const navigate = useNavigate();
    const { id } = useParams;
    const [editProduct, setEditProduct] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        // Get the selected file from the input element
        const file = event.target.files[0];
        // Update the selectedFile state with the new file
        setSelectedFile(file);
    };

   

    const {
        values,
        errors,
        handleChange,
        handleBlur,
        touched,
        handleSubmit,
        resetForm

    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            book_name: "",
            book_author: "",
            book_quantity: "",
            ISBN: "",
            book_genre: "",
        },
        validationSchema: Yup.object().shape({
            book_name: Yup.string().required("Book Name is required"),
            book_author: Yup.string().required("Book Author is required"),
            book_quantity: Yup.string().required("Book Quantity is required"),
            ISBN: Yup.string().required("ISBN number is required"),
            book_genre: Yup.string().required("Book Genre is required"),
        }),
        onSubmit:async(values)=>{

            const formData = new FormData();

            formData.append("images",selectedFile[0])

            Object.entries(values).forEach(([key,value])=>{
                formData.append(key,value);
            });
           if(!id){
            
            const response = await axios
            .post(`${import.meta.env.API_url}book/createbook`,formData,
            {
                headers:{
                    "Content-type":"multipart/form-data",
                    Authorization:`Bearer ${token}`,
                    Accept:"application/json"
                }
            }
            .then((response)=>{
                Swal.fire({
                    icon:"success",
                    title:"success",
                    text:"Book added sucessfully"
                });
                navigate("/admin/allproducts")
            })
            .catch((error)=>{
                console.log(error);
            })
           
           
           
            )
           } 
              
        }
    })
   




    return (
        <div>
            <Header />

            <div className='right-content'>
                <form>
                    <div className='row justify-content-center'>
                        <div className='col-lg-6'>
                            <div className="card card-product">
                                <div className="card-header pt-3 ps-3">
                                    <h5>Book Details</h5>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className="col-lg-12 mb-3">
                                            <label>Book Name</label>
                                            <input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="product_name"
                                                value={values.book_name}
                                                type="text"
                                                className={`form-control  ${errors.book_name && touched.book_name
                                                    ? "border_outline"
                                                    : ""
                                                    }`}
                                            />
                                            {errors.book_name && touched.book_name ? (
                                                <div className="product_name">
                                                    {errors.book_name}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>

                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className="col-lg-12 mb-3">
                                            <label>book author</label>
                                            <input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="product_name"
                                                value={values.book_author}
                                                type="text"
                                                className={`form-control  ${errors.book_author && touched.book_author
                                                    ? "border_outline"
                                                    : ""
                                                    }`}
                                            />
                                            {errors.book_author && touched.book_author ? (
                                                <div className="product_name">
                                                    {errors.book_author}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>

                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className="col-lg-12 mb-3">
                                            <label>book quantity</label>
                                            <input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="product_name"
                                                value={values.book_quantity}
                                                type="text"
                                                className={`form-control  ${errors.book_quantity && touched.book_quantity
                                                    ? "border_outline"
                                                    : ""
                                                    }`}
                                            />
                                            {errors.book_quantity && touched.book_quantity ? (
                                                <div className="product_name">
                                                    {errors.book_quantity}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>

                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className="col-lg-12 mb-3">
                                            <label>ISBN</label>
                                            <input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="product_name"
                                                value={values.ISBN}
                                                type="text"
                                                className={`form-control  ${errors.ISBN && touched.ISBN
                                                    ? "border_outline"
                                                    : ""
                                                    }`}
                                            />
                                            {errors.ISBN && touched.ISBN ? (
                                                <div className="product_name">
                                                    {errors.ISBN}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>

                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className="col-lg-12 mb-2">
                                            <label>book genre</label>
                                            <input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="product_name"
                                                value={values.book_genre}
                                                type="text"
                                                className={`form-control  ${errors.book_genre && touched.book_genre
                                                    ? "border_outline"
                                                    : ""
                                                    }`}
                                            />
                                            {errors.book_genre && touched.book_genre ? (
                                                <div className="product_name">
                                                    {errors.book_genre}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className="col-lg-12 mb-3">
                                                <label>Book image</label>
                                                {/* File input field for single file selection */}
                                                <input
                                                    type="file"
                                                    name="bookImage"
                                                    className="hidden"
                                                    onChange={handleFileChange} // Handle file selection
                                                />
                                               
                                            
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="text-center ">
                                    {id ? (
                                        <button
                                            style={{ backgroundColor: "#ae0000", color: "white" }}
                                            onClick={handleSubmit}
                                            className="btn  mt-3"
                                        >
                                            Update Product
                                        </button>
                                    ) : (
                                        <button
                                            style={{ backgroundColor: "#ae0000", color: "white" }}
                                            onClick={handleSubmit}
                                            className="btn  mt-3"
                                        >
                                            Add Product
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
