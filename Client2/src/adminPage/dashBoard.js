import React, { useEffect, useState } from 'react'

import Header from "../admin/header";
import axios from 'axios';
const DashBoard = () => {

  const [count,setCount] = useState("")

  const fetch = async()=>{
    const res = await axios.get("http://localhost:8000/dashboard/count")
    console.log(res.data)
    setCount(res.data)
  }
useEffect(()=>{
  fetch();
},[])
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
    </div>
  )
}
export default DashBoard;