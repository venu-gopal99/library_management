import React, { useEffect, useState } from 'react'
import Header from '../admin/header'
import DataTable from "react-data-table-component"
import axios from 'axios';

export const StudentList = () => {
  const token = localStorage.getItem("user");

  const[search,setSearch]= useState("");
   const [data,setData]=useState("");

  const fetch = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}student/getall`,
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
      console.log(response.data.allStudent,"res")
      const student = response.data.allStudent;
      setData(student)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetch();
  },[])

  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return []; // Return an empty array or handle the error accordingly
  }
  
  // Proceed with filtering the array
  const searchstudent = data.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );
const data1=[];

 for(let i =0;i<searchstudent.length;i++){
     data1.push({
      id : i+1,
      student_name:searchstudent[i]?.student_name,
      student_ID:searchstudent[i]?.student_ID,
      student_dept:searchstudent[i]?.student_dept,
      student_email:searchstudent[i]?.student_email,

     })    
 }

const columns = [
{
  name:"id",
  selector:(row)=>row.id
},
{
  name:"student_name",
  selector:(row)=>row.student_name,

},
{
  name:"student_ID",
  selector:(row)=>row.student_ID,
},
{
  name:"student_dept",
  selector:(row)=>row.student_dept,
},
{
  name:"student_email",
  selector:(row)=>row.student_email,
}

]
  return (
    <div>
    <Header />
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
