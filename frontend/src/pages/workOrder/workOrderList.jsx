import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddNewButton from '../../components/AddNewButton';
import axios from 'axios';
import Header from '../../components/Header';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Paper, useTheme } from '@mui/material';
import Spinner from 'react-bootstrap/Spinner';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

export const WorkOrders = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [workOrders, setWorkOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    dayjs(localizedFormat);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3500/workorders')
            .then((response) => {
                setWorkOrders(response.data.data);
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }, []);

    const columns = [
        { field: "no", headerName: "No.", width: 70, },
        { field: "title", headerName: "Title", width: 150, flex: 1},
        { field: "cost", headerName: "Cost", width: 70,},
        { field: "startDate", headerName: "Date", width: 200, flex: 1},
        { field: "customer", headerName: "Customer", width: 10, flex: 1},
        { field: "employee", headerName: "Employee", width: 200, flex: 1},
        { field: "address", headerName: "Address", width: 200, flex: 1},
        {
            field: "Operations", headerName: "Operations", width: 150, flex: 1, renderCell: ({ row: id }) => {
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

    const rows = workOrders.map((wo, index) => ({
        id: wo._id,
        no: index + 1,
        title: wo.title,
        cost: "$" + wo.cost,
        startDate: dayjs(wo.startDate).format('LLL'),
        customer: wo.customerID,
        employee: wo.assignedEmp,
        address: wo.address
    }))

    return (
        <div>

            <Header title="WORK ORDER" subtitle="Show Work Orders" />
            <div >
                <AddNewButton destination="form" item="Work Order" className='bg-sky-900' />
            </div>

            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <Box m="40px"
                    height="55vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "ActiveBorder",
                        },
                        "& .MuiDataGrid-cell:focus": {
                            outline: "none",
                        },
                        "& .MuiDataGrid-row:selected": {
                            backgroundColor: colors.redAccent[400],
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "solid 1px grey",
                            fontSize: "14px",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.redAccent[400],
                            borderBottom: "none",
                            fontSize: "20px",
                            color: "black"
                        },
                        "& .MuiDataGrid-VirtualScroller": {
                            backgroundColor: colors.primary[400]
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.redAccent[400]
                        },
                        width: "90%",
                        margin: "0 auto"
                    }}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        rowHeight={60}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } }
                        }}
                        pageSizeOptions={[10, 25, 50, 100]}

                    />

                    {/* <Paper sx={{ width: '70%', margin: 'auto', border: "2px solid gray", borderRadius: '5px', bgcolor: "#141414", color: "#d0d1d5", }}>
                        <table className='w-full text-xl'>
                            <thead>
                                <tr className='border-b-4 border-slate-600 text-left pl-2'>
                                    <th className='pl-2'>No.</th>
                                    <th className='pl-2'>Title</th>
                                    <th className='pl-2'>Cost</th>
                                    <th className='pl-2'>Emp</th>
                                    <th className='pl-2'>Customer</th>
                                    <th className='pl-2'>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workOrders.map((wo, index) => (
                                    <tr key={wo._id} className='h-20 border-b border-slate-700'>
                                        <td className='pl-2'>
                                            {index + 1}
                                        </td>
                                        <td className='pl-2'>
                                            {wo.title}
                                        </td>
                                        <td className='pl-2'>
                                            {wo.cost}
                                        </td>
                                        <td className='pl-2'>
                                            {wo.assignedEmp}
                                        </td>
                                        <td className='pl-2'>
                                            {wo.customerID}
                                        </td>
                                        <td className='flex justify-evenly items-center  h-20'>

                                            <Link to={`edit/${wo._id}`} className='link '>
                                                <EditIcon />
                                            </Link>
                                            <Link to={`details/${wo._id}`} className='link'>
                                                <InfoOutlinedIcon />
                                            </Link>
                                            <Link to={`delete/${wo._id}`} className='link'>
                                                <DeleteOutlineIcon />
                                            </Link>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Paper> */}
                </Box>
            )}
        </div>
    )
}

export default WorkOrders;