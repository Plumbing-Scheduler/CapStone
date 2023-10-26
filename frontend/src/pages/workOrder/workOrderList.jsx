import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddNewButton from '../../components/AddNewButton';
import axios from 'axios';
import Header from '../../components/Header';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, useTheme } from '@mui/material';
import Spinner from 'react-bootstrap/Spinner';
import { tokens } from "../../theme";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import DataList from '../../components/DataList';

export const WorkOrders = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [workOrders, setWorkOrders] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    dayjs(localizedFormat);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3500/workorders')
            .then((response) => {
                setWorkOrders(response.data.data);
                axios.get('http://localhost:3500/employees')
                    .then((responce) => {
                        setEmployees(responce.data.data);
                    })
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }, []);

    const columns = [
        { field: "no", headerName: "No.", width: 70, },
        { field: "title", headerName: "Title", width: 150, flex: 1 },
        { field: "cost", headerName: "Cost", width: 70, },
        { field: "startDate", headerName: "Date", width: 200, flex: 1 },
        { field: "customer", headerName: "Customer", width: 10, flex: 1 },
        { field: "employee", headerName: "Employee", width: 200, flex: 1 },
        { field: "address", headerName: "Address", width: 200, flex: 1 },
        {
            field: "Operations", headerName: "Operations", width: 200, renderCell: ({ row: id }) => {
                return (
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <Link to={`edit/${id.id}`} className='link mr-auto'>
                            <EditIcon />
                        </Link>
                        <Link to={`details/${id.id}`} className='link m-auto'>
                            <InfoOutlinedIcon />
                        </Link>
                        <Link to={`delete/${id.id}`} className='link m-auto'>
                            <DeleteOutlineIcon />
                        </Link>
                    </Box>
                )
            }
        },
    ]

    const getEmployee = (empId) => {
        for (let i = 0; employees.length > i; i++) {
            if (employees[i]._id == empId) {
                return employees[i].firstName + ' ' + employees[i].lastName
            }
        }
    }

    const rows = workOrders.map((wo, index) => ({
        id: wo._id,
        no: index + 1,
        title: wo.title,
        cost: "$" + wo.cost,
        startDate: dayjs(wo.startDate).format('LLL'),
        customer: wo.customerID,
        employee: getEmployee(wo.assignedEmp),
        address: wo.address
    }))

    return (
        <div>

            <Header title="WORK ORDER" subtitle="Show Work Orders" />
            <div >
                <AddNewButton destination="form" item="Work Order" className='bg-sky-900' />
            </div>

            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <DataList columnData={columns} rowData={rows} />
            )}
        </div>
    )
}

export default WorkOrders;