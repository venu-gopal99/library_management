import React, { useEffect, useState } from 'react'
import Header from './Header'
import DataTable from "react-data-table-component"
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Books = () => {
  const token = localStorage.getItem('user');
  const user = JSON.parse(localStorage.getItem('user_detail'))
  const id = user.student_ID
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  const fetch = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}order/one-order/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );
    console.log(response.data.orderOneUser, "res")
    setData(response.data.orderOneUser)
  }
  useEffect(() => {
    fetch();
  }, [])

  const returned_date = Date.now();

  const handleSubmit = async (orderId, book_count) => {



    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}order/update-order/${orderId}`,
        { returned_date, book_count },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); console.log(typeof(book_count), "fgvihearoighieugh")

      const message = response.data.message;
      toast.success(message);
      window.location.reload();

    } catch (error) {
      toast.error(error.response.data.message)
    }


  }

  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return []; // Return an empty array or handle the error accordingly
  }

  // Proceed with filtering the array
  const searchorder = data.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const data1 = [];

  for (let i = 0; i < searchorder.length; i++) {
    data1.push({
      id: i + 1,
      student_rollno: searchorder[i]?.student_rollno,
      book_id: searchorder[i]?.book_id,
      booked_date: searchorder[i]?.booked_date,
      due_date: searchorder[i]?.due_date,
      status: searchorder[i]?.status,
      book_count: searchorder[i]?.book_count,
      action: (
        <>
          <button className='btn btn-sm btn-outline-success ms-1' onClick={() => handleSubmit(searchorder[i]?._id, searchorder[i]?.book_count)} >
            return
          </button>
        </>
      )
    })
  }


  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
    },
    {
      name: "Student_roll_no",
      selector: (row) => row.student_rollno,
    },
    {
      name: "Book_id",
      selector: (row) => row.book_id,
    },
    {
      name: "Booked_date",
      selector: (row) => row.booked_date,
    },
    {
      name: "Due_date",
      selector: (row) => row.due_date,
    },

    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Book_count",
      selector: (row) => row.book_count
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ]



  return (
    <div className='container-fluid'>
      <Header />
      <div className="container mt-5">

        <div className="row w-100">

          <div className="col-lg-12 ">
            <div className='d-flex justify-content-between'>
              <h4>Order Details</h4>
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

            <div className="card  w-100 mt-5">


              <div>
                <DataTable
                  columns={columns}
                  data={data1}
                  selectableRows

                  pagination
                ></DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
