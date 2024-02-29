import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component"

import Header from "../admin/header";
import axios from 'axios';
const DashBoard = () => {
  const token = localStorage.getItem("user");

  const [count, setCount] = useState("")
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const fetch = async () => {
    const res = await axios.get("http://localhost:8000/dashboard/count")
    console.log(res.data)
    setCount(res.data)
  }


  const fetch1 = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}order/getorder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.orderOneUser); // Verify the structure of the response
      setData(response.data.orderOneUser); // Set data to the response if available, otherwise set to an empty array
    } catch (error) {
      console.error('Error fetching orders:', error);
      setData([]); // Set data to an empty array in case of an error
    }
  };
  useEffect(() => {
    fetch();
    fetch1();
  }, [])



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
      student_idstudent_rollno: searchorder[i]?.student_rollno,
      book_id: searchorder[i]?.book_id,
      booked_date: searchorder[i]?.booked_date,
      due_date: searchorder[i]?.due_date,

      fine_amount: searchorder[i]?.fine_amount,
      status: searchorder[i]?.status,
      book_count: searchorder[i]?.book_count,

    })
  }


  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
    },
    {
      name: "student_rollno",
      selector: (row) => row.student_rollno,
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

  ]












  return (
    <div>
      <Header />
      <div className="right-content d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary" style={{ top: "100px" }}>
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
          <main className="py-6 bg-surface-secondary">
            <div className="container-fluid">
              <div className="row g-6 mb-6">
                <div className="col-xl-3 col-sm-6 col-12">
                  {/* <div className="card shadow border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total sells</span>
                          <span className="h3 font-bold mb-0">${totalPrice}</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                            <i className="bi bi-credit-card"></i>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-success text-success me-2">
                          <i className="bi bi-arrow-up me-1"></i>13%
                        </span>
                        <span className="text-nowrap text-xs text-muted">Total sells</span>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total books taken</span>
                          <span className="h3 font-bold mb-0">{count.orderCount}</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                            <i className="bi bi-people"></i>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-success text-success me-2">
                          <i className="bi bi-arrow-up me-1"></i>30%
                        </span>
                        <span className="text-nowrap text-xs text-muted">Total Orders</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12 mb-5">
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total students</span>
                          <span className="h3 font-bold mb-0">{count.studentcount}</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                            <i className="bi bi-clock-history"></i>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-danger text-danger me-2">
                          <i className="bi bi-arrow-down me-1"></i>-5%
                        </span>
                        <span className="text-nowrap text-xs text-muted">Total student</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  {/* <div className="card shadow border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">Income Statistics</span>
                          <span className="h3 font-bold mb-0">95%</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-warning text-white text-lg rounded-circle">
                            <i className="bi bi-minecart-loaded"></i>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-success text-success me-2">
                          <i className="bi bi-arrow-up me-1"></i>10%
                        </span>
                        <span className="text-nowrap text-xs text-muted">Income Statistics</span>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
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
export default DashBoard;