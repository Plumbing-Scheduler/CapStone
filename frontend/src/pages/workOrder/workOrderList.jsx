import React, { useEffect, useState } from 'react';
import AddNewButton from '../../components/AddNewButton';
import axiosInstance from "../../axiosInstance";
import Header from '../../components/Header';
import Spinner from 'react-bootstrap/Spinner';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import DataList from '../../components/DataList';
import { Button, useMediaQuery, Box, useTheme } from '@mui/material';
import { tokens } from "../../theme";

export const WorkOrders = ({ role = '', logId = '' }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [workOrders, setWorkOrders] = useState([]);
    const [workOrdersCompleted, setWorkOrdersCompleted] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const lg = useMediaQuery("(min-width:1400px)")
    const med = useMediaQuery("(min-width:680px)")
    const [showCompleted, setShowCompleted] = useState(false);
    dayjs(localizedFormat);

    useEffect(() => {
        setLoading(true);
        if (role !== "Management") {
            axiosInstance
                .get(`/workorders/employee/${logId}`)
                .then((response) => {
                    setWorkOrders(response.data.data);

                    setLoading(false);
                }).then(() => {
                })
                .catch((error) => {
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
                        console.log(workOrders);

                    })
            }).catch((error) => {
                setLoading(false);
                console.log(error);
            })

        console.log(workOrdersCompleted);
    }, []);

    useEffect(() => {
        setWorkOrdersCompleted(workOrders.filter((elem) => {
            return elem.serviceStatus !== "Completed";
        }));
    }, [workOrders])

    const columns = [
        { field: "title", headerName: "Title", width: 200, },
        { field: "cost", headerName: "Cost", width: 110, type: Number },
        { field: "startDate", headerName: "Date", width: 150, type: Date },
        { field: "customer", headerName: "Customer", width: 200, flex: 1 },
        { field: "employee", headerName: "Employee", width: 200, flex: 1 },
        { field: "address", headerName: "Address", width: 200, flex: 1 },
        { field: "status", headerName: "Status", width: 200, flex: 1 },
    ]
    const medColumns = [
        { field: "title", headerName: "Title", width: 150, },
        { field: "cost", headerName: "Cost", width: 110, type: Number, flex: 1 },
        { field: "startDate", headerName: "Date", width: 150, type: Date, flex: 1 },
        { field: "address", headerName: "Address", width: 200, flex: 1 },
        { field: "status", headerName: "Status", width: 200, flex: 1 },
    ]

    const smallColumns = [
        { field: "title", headerName: "Title", width: 150, },
        { field: "cost", headerName: "Cost", width: 110, type: Number, flex: 1 },
        { field: "startDate", headerName: "Date", width: 150, type: Date, flex: 1 },
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

    const rows = workOrdersCompleted.map((wo) => ({
        id: wo._id,
        title: wo.title,
        cost: wo.cost,
        startDate: dayjs(wo.startDate).format('l'),
        customer: getCustomer(wo.customerID),
        employee: getEmployee(wo.assignedEmp),
        address: wo.address.street,
        status: wo.serviceStatus
    }))

    const rowsCompleted = workOrders.map((wo) => ({
        id: wo._id,
        title: wo.title,
        cost: wo.cost,
        startDate: dayjs(wo.startDate).format('l'),
        customer: getCustomer(wo.customerID),
        employee: getEmployee(wo.assignedEmp),
        address: wo.address.street,
        status: wo.serviceStatus
    }))

    const handleRows = () => {
        setShowCompleted(!showCompleted);
    }

    return (
        <div>
            <Header title="WORK ORDERS" subtitle="View Workorders" />
            <div className='flex justify-end' >
                <AddNewButton destination="form" item="Work Order"/>
            </div>

            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <div>
                    <DataList columnData={!med ? smallColumns : !lg ? medColumns : columns} rowData={!showCompleted ? rows : rowsCompleted} />
                    <div className='flex justify-end'>
                        <Box display="flex" justifyContent="space-between" p={3} sx={{ margin: 'auto', pt: '2%', width: '50%' }}>
                            <Box display="flex" justifyContent="space-between" backgroundColor={colors.buttonBase} borderRadius="3px" color={"white"} width={'auto'} margin={'auto'}>
                                <Button variant="Text" onClick={handleRows}>Click to Show All</Button>
                            </Box>
                        </Box>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WorkOrders;