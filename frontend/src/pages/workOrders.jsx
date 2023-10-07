import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AddNewButton from '../components/AddNewButton';
import axios from 'axios';
import Header from '../components/Header';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Paper } from '@mui/material';

const WorkOrders = () => {
    const [workOrders, setWorkOrders] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3500/workorders')
            .then((response) => {
                setWorkOrders(response.data.data);
                //console.log(workOrders);
            }).catch((error) => {
                console.log(error);
            })
    }, []);
    return (
        <div>
            <Header title="WORK ORDER" subtitle="Show Work Orders" />
            <div >
                <AddNewButton destination="form" item="Work Order" className='bg-sky-900'/> {/* "Add new" button at top of list, Routes to Work order Form*/}
            </div>
            <Outlet />

            <Paper sx={{width: '70%', margin:'auto', backgroundColor: ''}}>
            <table className='w-full text-xl'>
                <thead >
                    <tr >
                        <th className='border-b-2 border-slate-600'>No.</th>
                        <th className='border-b-2 border-slate-600'>Title</th>
                        <th className='border-b-2 border-slate-600'>Cost</th>
                        <th className='border-b-2 border-slate-600'>Emp</th>
                        <th className='border-b-2 border-slate-600'>Customer</th>
                        <th className='border-b-2 border-slate-600'>Operations</th>
                    </tr>
                </thead>
                <tbody className='h-4'>
                    {workOrders.map((wo, index) => (
                        <tr key={wo._id} >
                            <td className='border border-slate-700 pl-2'>{index + 1}</td>
                            <td className='border border-slate-700 pl-2'>{wo.title}</td>
                            <td className='border border-slate-700 pl-2'>{wo.s_cost}</td>
                            <td className='border border-slate-700 pl-2'>{wo.assignedEmp}</td>
                            <td className='border border-slate-700 pl-2'>{wo.customerID}</td>
                            <td className='flex justify-evenly border border-slate-700'>
                                
                                <Link to={`edit/${wo._id}`} className='link '>
                                    <EditIcon />
                                </Link>
                                <Link to={`details/${wo._id}`} className='link '>
                                    <InfoOutlinedIcon />
                                </Link>
                                <Link to={`delete/${wo._id}`} className='link '>
                                    <DeleteOutlineIcon />
                                </Link>
                                
                            </td>
                        </tr>
                    ))
                    }

                </tbody>
            </table>
            </Paper>
        </div>
    )
}

export default WorkOrders;