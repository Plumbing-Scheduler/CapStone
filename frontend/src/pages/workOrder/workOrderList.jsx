import React, { useEffect, useState } from 'react';
import AddNewButton from '../../components/AddNewButton';
import axiosInstance from "../../axiosInstance";
import Header from '../../components/Header';
import Spinner from 'react-bootstrap/Spinner';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import DataList from '../../components/DataList';

export const WorkOrders = () => {
    const [workOrders, setWorkOrders] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    dayjs(localizedFormat);

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get('/workorders')
            .then((response) => {
                setWorkOrders(response.data.data);
                axiosInstance.get('/employees')
                    .then((response) => {
                        setEmployees(response.data.data);
                    })
                axiosInstance
                .get('/customer')
                    .then((response) => {
                        setCustomers(response.data.data);
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

    const rows = workOrders.map((wo, index) => ({
        id: wo._id,
        no: index + 1,
        title: wo.title,
        cost: "$" + wo.cost,
        startDate: dayjs(wo.startDate).format('LLL'),
        customer: getCustomer(wo.customerID),
        employee: getEmployee(wo.assignedEmp),
        address: wo.address.street
    }))

    return (
        <div>

            <Header title="WORK ORDER" subtitle="Show Work Orders" />
            <div className='flex justify-end' >
                <AddNewButton destination="form" item="Work Order" className='bg-sky-900' />
            </div>

            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <DataList columnData={columns} rowData={rows} />
            )}
        </div>
    )
}

export default WorkOrders;