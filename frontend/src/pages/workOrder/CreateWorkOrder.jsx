import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateWorkOrder = () => {
    const serviceStatus = 1 //Newly created work orders will always be set to "1" for in progress. 
    const [description, setDescription] = useState('');
    const [s_startDate, setS_StartDate] = useState(null);
    const [cost, setCost] = useState(null);
    const [assignedEmp, setAssignedEmp] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [customerID, setCustomerID] = useState('');
    const [busName, setBusName] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const data = {
        serviceStatus,
        description,
        s_startDate,
        cost,
        assignedEmp,
        endDate,
        customerID,
        busName,
        address,
    };

    const handleSave = () => {
        axios
            .post('http://localhost:3500', data)
            .then(
                navigate('/WorkOrder')
            )
            .catch((error) => {
                console.log(error)
            })
    };
    const print = () => {
        console.log(data);
    }

    return (
        <div className='p-4 text-center'>
            <h1 className='my-4 text-3xl '>Creat new Work Order</h1>
            <div >
                <div className='w-full flex justify-center' >
                    <label className='text-base'>Description of Job</label>
                    <textarea
                        required
                        name=""
                        id=""
                        value={description}
                        cols="30"
                        rows="3"
                        onChange={(e) => setDescription(e.target.value)}
                        className='mx-4 rounded bg-gray-600 p-2 ' />
                </div>
                <div className='w-full flex justify-center my-4'>
                    <label className='text-base' >Start Date</label>
                    <input
                        required
                        type="date"
                        name=""
                        id=""
                        value={s_startDate}
                        className='mx-4 rounded bg-gray-600 p-2' />
                </div>
                <div className='w-full flex justify-center my-4'>
                    <label className='text-base' >Cost</label>
                    <input
                        required
                        type="number"
                        value={cost}
                        name=""
                        id=""
                        className='mx-4 rounded bg-gray-600 p-2' />
                </div>
                <div className='w-full flex justify-center my-4'>
                    <label className='text-base' >Assigned Employee</label>
                    <input
                        type="text"
                        value={assignedEmp}
                        name=""
                        id=""
                        className='mx-4 rounded bg-gray-600 p-2' />
                </div>
                <div className='w-full flex justify-center my-4'>
                    <label className='text-base' >End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        name=""
                        id=""
                        className='mx-4 rounded bg-gray-600 p-2' />
                </div>
                <div className='w-full flex justify-center my-4'>
                    <label className='text-base' >Business Name</label>
                    <input
                        type="text"
                        value={busName}
                        name=""
                        id=""
                        className='mx-4 rounded bg-gray-600 p-2' />
                </div>
                <div className='w-full flex justify-center my-4'>
                    <label className='text-base' >Address</label>
                    <input
                        required
                        type="text"
                        value={address}
                        name=""
                        id=""
                        className='mx-4 rounded bg-gray-600 p-2' />
                </div>
            </div>
            <button onClick={print}>PRINT</button>
        </div>
    )
}

export default CreateWorkOrder