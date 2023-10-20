import { Box, Paper } from "@mui/material";
import Header from "../components/Header";
import AddNewButton from "../components/AddNewButton";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';

export const Employee = () => {
const [ loading, setLoading ] = useState(false);
const [ employees, setEmployees] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3500/employees')
            .then((responce) => {
                setEmployees(responce.data.data)
                setLoading(false)
            })
            .catch((error) => { 
                console.log(error);
                setLoading(false)
            })
            
    }, [])
    return (
    <Box m="20px">
        <Header title="EMPLOYEE" subtitle="NEW EMPLOYEE" />
        <div className="">
            <AddNewButton destination="create" item="Employee" />
        </div>

        <Paper sx={{ width: '70%', margin: 'auto', border: "2px solid gray", borderRadius: '5px', bgcolor: "#141414", color: "#d0d1d5", }}>
            <table className='w-full text-xl'>
                <thead>
                    <tr className='border-b-4 border-slate-600 text-left pl-2'>
                        <th className='pl-2'>Name</th>
                        <th className='pl-2'>Phone #</th>
                        <th className='pl-2'>Employment Type</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp, index) => (
                        <tr key={emp._id} className='h-20 border-b border-slate-700'>
                            <td>{emp.firstName + ' ' + emp.lastName}</td>
                            <td>{emp.phone}</td>
                            <td>{emp.employmentType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Paper>
    </Box>
    )
}

export default Employee;