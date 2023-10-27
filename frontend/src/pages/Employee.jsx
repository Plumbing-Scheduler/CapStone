import { Box, Paper } from "@mui/material";
import Header from "../components/Header";
import AddNewButton from "../components/AddNewButton";
import { useState, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

export const Employee = () => {
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

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
        <Box m="px">
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
                            <th className='pl-2 text-center'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp._id} className='h-20 border-b border-slate-700'  >
                                <td className='pl-2'>{emp.firstName + ' ' + emp.lastName}</td>
                                <td className='pl-2'>{emp.phone}</td>
                                <td className='pl-2'>{emp.employmentType}</td>
                                <td className="flex justify-evenly items-center  h-20">
                                    <Link to={`edit/${emp._id}`} className="link">
                                        <EditIcon/>
                                    </Link>
                                    <Link to={`details/${emp._id}`} className="link">
                                        <InfoOutlinedIcon/>
                                    </Link>
                                    <Link to={`delete/${emp._id}`} className="link">
                                        <DeleteOutlineIcon/>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Paper>
            {/* <Outlet/> */}
        </Box>
    )
}

export default Employee;