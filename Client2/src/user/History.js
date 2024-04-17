import React, { useEffect, useState } from 'react'
import Header from './Header'
import DataTable from "react-data-table-component"
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export const History = () => {

  const token = localStorage.getItem('user');
  const user = JSON.parse(localStorage.getItem('user_detail'))
  const id = user.student_ID
  const [data, setData] = useState([])

  
  const fetch = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}order/history/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );
    console.log(response.data.orderOneUser, "res")
    setData(response.data.orderOneUser)
    toast.success(response.data.message)
  };
  useEffect(() => {
    fetch();
  }, [])


  const data1 = [];

  for (let i = 0; i < data.length; i++) {
    data1.push({
      id: i + 1,
      student_rollno: data[i]?.student_rollno,
      book_id: data[i]?.book_id,
      booked_date: data[i]?.booked_date,
      due_date: data[i]?.due_date,
      status: data[i]?.status,
      returned_date:data[i]?.returned_date,
      book_count:data[i]?.book_count,
    })
  }



  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
    },
  
    {
      name: "book_id",
      selector: (row) => row.book_id,
    },
    {
     name:"booked_date",
     selector:(row)=>row.booked_date,
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
     name:"returned_date",
     selector:(row)=>row.returned_date,
    },
   {
    name:"count",
    selector:(row)=>row.book_count,
   },
   
   
  ]

  return (
    <div className='container-fluid'>
    <Header />
    <div className="container mt-5">

      <div className="row w-100">

        <div className="col-lg-12 ">
          <div className='d-flex justify-content-between'>
            <h4>Book Taken History</h4>
         
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
