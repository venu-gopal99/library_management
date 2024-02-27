import React, { useEffect, useState } from 'react'
import Header from '../admin/header'
import DataTable from "react-data-table-component"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";

export const ProductList = () => {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const fetch = async () => {
    try {
      const res = await axios.get("http://localhost:8000/book/getall")
      const books = res.data.allBooks
      console.log(books[0]?._id, "boookss")
      setData(books)
      // console.log(res.data.allBooks,"bokkkkkksssss")
    } catch (error) {
      console.log(error, "dggfgh");
    }
  };

  useEffect(() => {
    fetch();
  }, [])

  const handleEdit = (row) => {
    console.log(row._id)
    const id = row._id;
    navigate(`/admin/addproduct/${id}`)
  };

  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return []; // Return an empty array or handle the error accordingly
  }
  
  // Proceed with filtering the array
  const searchGst = data.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );
  
  const data1 = []

  for (let i = 0; i < searchGst.length; i++) {
    data1.push({
      id: 1 + i,
      _id:searchGst[i]?._id,
      book_name: searchGst[i]?.book_name,
      book_author: searchGst[i]?.book_author,
      book_quantity: searchGst[i]?.book_quantity,
      ISBN: searchGst[i]?.ISBN,
      book_genre: searchGst[i]?.book_genre,
      action: (
        <>
          <button className='btn btn-sm btn-outline-success ms-1' onClick={()=>handleEdit(searchGst[i]._id)}>
            edit
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
        name:"book_id",
        selector:(row)=>row._id,
    },
    {
      name: "Book name",
      selector: (row) => row.book_name,

    },
    {
      name: "Book author",
      selector: (row) => row.book_author,
    },
    {
      name: "Quantity",
      selector: (row) => row.book_quantity,
    },
    {
      name: "ISBN",
      selector: (row) => row.ISBN,

    },
    {
      name: "book genre",
      selector: (row) => row.book_genre,
    },
    {
      name: "Action",
      cell: (row) => (
        <button className='btn btn-sm btn-outline-success ms-1' onClick={() => handleEdit(row)}>
        <span className="bi bi-pencil"></span>
        </button>
      )
    }


  ]



  return (
    <div>
      <Header />
      <div className="right-content">

        <div className="row w-100">

          <div className="col-lg-12 ">
           <div className='d-flex justify-content-between'>      
                  <h4>Book Details</h4>
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
