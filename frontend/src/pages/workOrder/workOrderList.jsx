import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddNewButton from '../../components/AddNewButton';
import axios from 'axios';
import Header from '../../components/Header';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Paper } from '@mui/material';
import Spinner from 'react-bootstrap/Spinner';

export const WorkOrders = () => {
    const [workOrders, setWorkOrders] = useState([]);
    const [loading, setLoading] = useState(false);
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
    return (
        <div>

            <Header title="WORK ORDER" subtitle="Show Work Orders" />
            <div >
                <AddNewButton destination="form" item="Work Order" className='bg-sky-900' /> {/* "Add new" button at top of list, Routes to Work order Form*/}
            </div>
            
            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <div>
                    <Paper sx={{ width: '70%', margin: 'auto', border: "2px solid gray", borderRadius: '5px', bgcolor: "#141414", color: "#d0d1d5", }}>
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
                                ))
                                }

                            </tbody>
                        </table>
                    </Paper>
                </div>
            )}
        </div>
    )
}

export default WorkOrders;