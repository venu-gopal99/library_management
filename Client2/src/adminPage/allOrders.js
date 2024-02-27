import React, { useEffect, useState } from 'react'
import Header from "../admin/header";
import DataTable from "react-data-table-component"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import DataTable from "react-data-table-component"

const AllOrders = () => {
  // const {orderId} = useParams();
  // console.log(orderId,"order")
  const token = localStorage.getItem("user");

  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [orderId, setOrderId] = useState("");
  console.log(orderId, "sdoushdvgv")
  const fetch = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}order/get-all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(response.data.allorder[0]?._id)
    const order = response.data.allorder
    setData(order)
    setOrderId(response.data.allorder[0]?._id)
  }

  useEffect(() => {

    fetch();
  }, [])

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(`http://localhost:8000/order/update-fine/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },)

      if (res) {
        window.location.reload();
      }
    } catch (error) {

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
      student_id: searchorder[i]?.student_id,
      book_id: searchorder[i]?.book_id,
      booked_date: searchorder[i]?.booked_date,
      due_date: searchorder[i]?.due_date,
      returned_date: searchorder[i]?.returned_date,
      fine_amount: searchorder[i]?.fine_amount,
      status: searchorder[i]?.status,
      book_count: searchorder[i]?.book_count,
      action: (
        <>
          <button className='btn btn-sm btn-outline-success ms-1' onClick={handleSubmit}>
            clear Fine
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
      name: "student_id",
      selector: (row) => row.student_id,
    },
    {
      name: "book_id",
      selector: (row) => row.book_id,
    },
    {
      name: "booked_date",
      selector: (row) => row.booked_date,
    },
    {
      name: "due_date",
      selector: (row) => row.due_date,
    },
    {
      name: "returned_date",
      selector: (row) => row.returned_date,
    },
    {
      name: "fine_amount",
      selector: (row) => row.fine_amount,
    },
    {
      name: "status",
      selector: (row) => row.status,
    },
    {
      name: "book_count",
      selector: (row) => row.book_count
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ]
  return (
    <div>
      <Header />
      <div className="right-content">

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

export default AllOrders;
