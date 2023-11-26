import React, { useEffect, useState } from 'react';
import AddNewButton from '../../components/AddNewButton';
import axiosInstance from "../../axiosInstance";
import Header from '../../components/Header';
import Spinner from 'react-bootstrap/Spinner';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import DataList from '../../components/DataList';
import { useMediaQuery } from '@mui/material';

export const WorkOrders = ({ role = '', logId = '' }) => {
    const [workOrders, setWorkOrders] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const lg = useMediaQuery("(min-width:1400px)")
    const med = useMediaQuery("(min-width:680px)")
    dayjs(localizedFormat);

    useEffect(() => {
        setLoading(true);
        if (role != "Management") {
            axiosInstance
                .get(`/workorders/employee/${logId}`)
                .then((response) => {
                    setWorkOrders(response.data.data);
                    setLoading(false);
                }).catch((error) => {
                    setLoading(false);
                    console.log(error);
                })
        } else {
            axiosInstance
                .get('/workorders')
                .then((response) => {
                    setWorkOrders(response.data.data);
                    setLoading(false);
                }).catch((error) => {
                    setLoading(false);
                    console.log(error);
                })
        }
        axiosInstance
            .get('/employees')
            .then((response) => {
                setEmployees(response.data.data);
                axiosInstance
                    .get('/customer')
                    .then((response) => {
                        setCustomers(response.data.data);
                    })
            }).catch((error) => {
                setLoading(false);
                console.log(error);
            })


    }, []);

    const columns = [
        { field: "title", headerName: "Title", width: 200, },
        { field: "cost", headerName: "Cost", width: 110, type: Number},
        { field: "startDate", headerName: "Date", width: 150, type: Date},
        { field: "customer", headerName: "Customer", width: 200, flex: 1},
        { field: "employee", headerName: "Employee", width: 200, flex: 1},
        { field: "address", headerName: "Address", width: 200, flex: 1},
    ]
    const medColumns = [
        { field: "title", headerName: "Title", width: 150,},
        { field: "cost", headerName: "Cost", width: 110, type: Number, flex: 1},
        { field: "startDate", headerName: "Date", width: 150, type: Date, flex: 1},
        { field: "address", headerName: "Address", width: 200, flex: 1},
    ]

    const smallColumns = [
        { field: "title", headerName: "Title", width: 150,},
        { field: "cost", headerName: "Cost", width: 110, type: Number, flex: 1},
        { field: "startDate", headerName: "Date", width: 150, type: Date, flex: 1},
    ]

    const getEmployee = (empId) => {
        for (let i = 0; employees.length > i; i++) {
            if (employees[i]._id === empId) {
                return employees[i].firstName + ' ' + employees[i].lastName
            }
        }
    }

    const getCustomer = (custId) => {
        for (let i = 0; customers.length > i; i++) {
            if (customers[i]._id === custId) {
                return customers[i].firstName + ' ' + customers[i].lastName
            }
        }
    }

    const rows = workOrders.map((wo) => ({
        id: wo._id,
        title: wo.title,
        cost: wo.cost,
        startDate: dayjs(wo.startDate).format('l'),
        customer: getCustomer(wo.customerID),
        employee: getEmployee(wo.assignedEmp),
        address: wo.address.street,
        serviceStatus: wo.serviceStatus
    }))

    return (
        <div>
            <Header title="WORK ORDERS" subtitle="View Workorders" />
            <div className='flex justify-end' >
                <AddNewButton destination="form" item="Work Order" className='bg-sky-900' />
            </div>

            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <DataList columnData={!med?smallColumns:!lg?medColumns:columns} rowData={rows} />
            )}
        </div>
    )
}

export default WorkOrders;