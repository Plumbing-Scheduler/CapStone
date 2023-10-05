import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddNewButton from '../components/AddNewButton';
import axios from 'axios';
import Header from '../components/Header';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


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
            <AddNewButton destination="/WorkOrder/Form" item="Work Order" /> {/* "Add new" button at top of list, Routes to Work order Form*/}
            <table className='w-1/2 border-separate border-spacing-2 m-auto text-xl'>
                <thead className='text-xl '>
                    <tr >
                        <th className='border border-slate-600 rounded-md'>Description</th>
                        <th className='border border-slate-600 rounded-md'>Cost</th>
                        <th className='border border-slate-600 rounded-md'>Emp</th>
                        <th className='border border-slate-600 rounded-md'>Customer</th>
                        <th className='border border-slate-600 rounded-md'>Operations</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {workOrders.map((wo, index) => (
                        <tr key={wo._id}>
                            <td className='border border-slate-700 rounded-md pl-2'>{index} {wo.s_description}</td>
                            <td className='border border-slate-700 rounded-md pl-2'>{wo.s_cost}</td>
                            <td className='border border-slate-700 rounded-md pl-2'>{wo.assignedEmp}</td>
                            <td className='border border-slate-700 rounded-md pl-2'>{wo.customerID}</td>
                            <td className='flex justify-center gap-4 border border-slate-700 rounded-md pl-2'>
                                <Link to={`/WorkOrder/Edit/${wo._id}`} className='link '>
                                    <EditIcon />
                                </Link>
                                <Link to={`/Details/${wo._id}`} className='link '>
                                    <InfoOutlinedIcon />
                                </Link>
                                <Link to={`/WorkOrder/Delete/${wo._id}`} className='link '>
                                    <DeleteOutlineIcon />
                                </Link>
                            </td>
                        </tr>
                    ))
                    }

                </tbody>
            </table>
            
        </div>
    )
}

export default WorkOrders;