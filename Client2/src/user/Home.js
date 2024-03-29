import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { json } from 'react-router-dom';

export const Home = () => {
    const token = localStorage.getItem('user');
    const user = JSON.parse(localStorage.getItem('user_detail'))
    console.log(user.student_ID, "user")
    console.log(token, "wiuvgdiuvg")
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState({}); // State to store the order
    const [bookCount, setBookCount] = useState("");
    const [id, setId] = useState("");

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}book/getall`,

            );
            // console.log(response.data.allBooks);
            setBooks(response.data.allBooks);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);
    // console.log(books[0]?.images[0])

    const handleAddToOrder = (bookId) => {
        const bookToAdd = books.find(book => book._id === bookId);
        // console.log(bookToAdd, "egegegebe")
        if (bookToAdd) {
            const updatedOrder = { ...order };
            if (updatedOrder[bookId]) {
                updatedOrder[bookId].Book_count += 1; // Increment quantity if already in order
            } else {
                updatedOrder[bookId] = { ...bookToAdd, Book_count: 1 }; // Add book to order with quantity 1
            }
            setOrder(updatedOrder);
            setBookCount(updatedOrder[bookId].Book_count)
            setId(updatedOrder[bookId]._id)
        }
    };

    const handleRemoveFromOrder = (bookId) => {
        const updatedOrder = { ...order };
        if (updatedOrder[bookId]) {
            updatedOrder[bookId].Book_count -= 1;
            if (updatedOrder[bookId].Book_count <= 0) {
                delete updatedOrder[bookId];
            }
            setOrder(updatedOrder);
            setBookCount(updatedOrder[bookId].Book_count)
        }
    };

    const book_count = bookCount;
    const book_id = id;

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}order/order-create`,
                { book_count, book_id }, // Include data in the request body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Swal.fire({
            //     icon: "success",
            //     title: "Success",
            //     text: "Book taken successfully",
            // });
            toast.success(response.data.message)
            console.log(response, "message");
        } catch (error) {
            toast.error(error.response.data.message)
            console.error("Error:", error.response.data.message);
        }
    };
    const filteredBooks = books.filter(book =>
        book.book_name.toLowerCase().includes(search.toLowerCase()) ||
        book.book_genre.toLowerCase().includes(search.toLowerCase()) ||
        book.book_author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='container-fluid'>
            <Header />

            <div className='mt-4 d-flex justify-content-end'>
                <div className="col-lg-4">
                    <form class="d-flex">
                        <div className="input-group w-75">
                            {/* <span className="input-group-text"><IoIosSearch /></span> */}
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value) }}
                            />

                        </div>

                    </form>
                </div>
            </div>
            <div className='container mt-4'>
                <div className='row'>
                    {filteredBooks?.map(book => (
                        <div key={book._id} className='col-sm-3'>
                            <div className='card text-center mt-3 '>

                                <img src={`http://localhost:8000/${book.images[0]}`} width="60" height="80%" className='card-img-top ' alt={book.book_name} />
                                <div className='card-body'>
                                    <h5 className='card-title fs-10'>Book Name: {book.book_name}</h5>
                                    <p className='card-text'> Author: {book.book_author}</p>
                                    <p className='card-text'>Genre: {book.book_genre}</p>
                                    <p className='card-text'>Quantity: {book.book_quantity}</p>
                                    <p>
                                        <button className='btn btn-sm btn-outline-success ' onClick={() => handleRemoveFromOrder(book._id)}>-</button>
                                        {order[book._id] ? order[book._id].Book_count : 0}
                                        <button className='btn btn-sm btn-outline-success ms-1' onClick={() => handleAddToOrder(book._id)}>+</button>
                                    </p>
                                    <button className='btn btn-sm btn-outline-success ms-1' onClick={handleSubmit}>Take Book</button>

                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};
