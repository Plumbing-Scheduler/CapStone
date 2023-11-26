import React, { useEffect, useState } from 'react'
import { Box, useMediaQuery } from "@mui/material";
import Header from "../components/Header";
import AddNewButton from "../components/AddNewButton";
import DataList from '../components/DataList';
import Spinner from 'react-bootstrap/esm/Spinner';
import axiosInstance from "../axiosInstance";

const Customer = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const small = useMediaQuery("(min-width:1000px)");

  useEffect( () => {
    setLoading(true);
    axiosInstance
      .get('/customer')
      .then((responce) => {
        setCustomers(responce.data.data);
      })
      .catch((error) => {
        console.log(error);
        
      });
      setLoading(false);
  }, []);

  const columns = [
    { field: 'name', headerName: "Name", flex: 1 },
    { field: 'phone', headerName: "Phone", flex: 1 },
    { field: 'email', headerName: "Email", flex: 1 },
    { field: 'address', headerName: "Address", flex: 1 },
  ]

  const smallcolumns = [
    { field: 'name', headerName: "Name", flex: 1 },
    { field: 'phone', headerName: "Phone", flex: 1 },
    { field: 'email', headerName: "Email", flex: 1 },
  ]

  const rows = customers.map((cust, index) => ({
    id: cust._id,
    name: cust.firstName + ' ' + cust.lastName,
    phone: cust.phone,
    email: cust.email,
    address: cust.address.street
  }))

  return (

    <Box>
      <Header title={"CUSTOMERS"} subtitle={"View Customers"}/>
      <div className='flex justify-end' >
        <AddNewButton destination="create" item="Customer" />
      </div>
      {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
        <DataList columnData={small?columns:smallcolumns} rowData={rows} />
      )}
    </Box>

  )
}

export default Customer