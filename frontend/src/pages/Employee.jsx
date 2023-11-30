import { Box, useMediaQuery } from "@mui/material";
import Header from "../components/Header";
import AddNewButton from "../components/AddNewButton";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import Spinner from 'react-bootstrap/Spinner';
import DataList from '../components/DataList';

export const Employee = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const med = useMediaQuery("(min-width:1200px)");
    const small = useMediaQuery("(min-width:920px)");

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get('/employees')
            .then((responce) => {
                setEmployees(responce.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            })

    }, [])

    const columns = [
        {field: 'name', headerName: "Name", flex: 1},
        { field: 'phone', headerName: "Phone", flex: 1, 
        renderCell: (params) => {
            return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
        }},
        {field: 'email', headerName: "Email", flex: 1},
        {field: 'type', headerName: "Type", flex: 1},
        {field: 'status', headerName: "Status", flex: 1},
    ];

    const Medcolumns = [
        {field: 'name', headerName: "Name", flex: 1},
        { field: 'phone', headerName: "Phone", flex: 1, 
        renderCell: (params) => {
            return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
        }},
        {field: 'type', headerName: "Type", flex: 1},
        {field: 'status', headerName: "Status", flex: 1},
    ];

    const smallcolumns = [
        {field: 'name', headerName: "Name", flex: 1},
        { field: 'phone', headerName: "Phone", flex: 1, 
        renderCell: (params) => {
            return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
        }},
        {field: 'status', headerName: "Status", flex: 1},
    ];

    const rows = employees.map((emp, index) => ({
        id: emp._id,
        name: emp.firstName + " " + emp.lastName,
        phone: emp.phone,
        email: emp.email,
        type: emp.employmentType + " " + emp.role,
        status: emp.status
    }))


    return (
        <Box>
            <Header title="EMPLOYEE" subtitle="View Employees" />
            <div className='flex justify-end' >
                <AddNewButton destination="create" item="Employee" />
            </div>
            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <DataList columnData={med?columns:small?Medcolumns:smallcolumns} rowData={rows} />
            )}
        </Box>
    )
}

export default Employee;