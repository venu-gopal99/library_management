import React, { useEffect, useState } from 'react'
import Header from './Header'
import DataTable from "react-data-table-component"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const Books = () => {
  const token = localStorage.getItem("user");
//  console.log(localStorage.getItem(user)) 
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");

  const fetch = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}order/one-order`,
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
      );
      console.log(response)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetch()
  },[])
  const data1 = [];

  // for (let i = 0; i < searchorder.length; i++) {
  //   data1.push({
  //     id: i + 1,

  //     book_id: searchorder[i]?.book_id,
  //     booked_date: searchorder[i]?.booked_date,
  //     due_date: searchorder[i]?.due_date,
    
  //     status: searchorder[i]?.status,
  //     book_count: searchorder[i]?.book_count,
  //     action: (
  //       <>
  //         <button className='btn btn-sm btn-outline-success ms-1' onClick={handleSubmit}>
  //           Return Book
  //         </button>
  //       </>
  //     )
  //   })
  // }




const columns = [
  {
    name:"id",
    selector:(row)=>row.id
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
    <div className='container-fluid'>
    <Header/>
    <div className="right-content">

<div className="row w-100">

  <div className="col-lg-12 ">
   <div className='d-flex justify-content-between'>      
          <h4>student Details</h4>
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
