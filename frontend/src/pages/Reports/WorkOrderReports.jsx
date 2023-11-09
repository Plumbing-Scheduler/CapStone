import React, { useEffect, useState } from 'react'
import { Box } from "@mui/material";
import ReportsDataList from '../../components/ReportsDataList';
import Spinner from 'react-bootstrap/esm/Spinner';
import axios from 'axios';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

const WorkOrderReports = () => {
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

    const getEmployee = (empId) => {
        for (let i = 0; employees.length > i; i++) {
            if (employees[i]._id === empId) {
                return employees[i].firstName + ' ' + employees[i].lastName
            }
        }
    }

    const columns = [
        { field: "no", headerName: "No.", width: 70, },
        {field: 'name', headerName: "Name", flex: 1},
        { field: "title", headerName: "Title", width: 150, flex: 1 },
        { field: "employee", headerName: "Employee", width: 200, flex: 1 },
        { field: "startDate", headerName: "Date", width: 200, flex: 1 },
    ]

    const rows = workOrders.map((wo, index) => ({
        id: wo._id,
        no: index + 1,
        name: wo.firstName + ' ' + wo.lastName,
        customer: wo.customerID,
        title: wo.title,
        cost: "$" + wo.cost,
        startDate: dayjs(wo.startDate).format('LLL'),
        
        employee: getEmployee(wo.assignedEmp),
        address: wo.address
    }))

    return (
        <Box>
            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <ReportsDataList columnData={columns} rowData={rows} />
            )}
        </Box>
    )
}

export default WorkOrderReports