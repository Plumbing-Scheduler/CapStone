import React, { useEffect, useState } from 'react';
import AddNewButton from '../components/AddNewButton';
import axios from 'axios';
import Header from '../components/Header';


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
            <AddNewButton destination="/WorkOrder/Form" item="Work Order"/> {/* "Add new" button at top of list, Routes to Work order Form*/} 
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Cost</th>
                        <th>Emp</th>
                        <th>Customer</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {workOrders.map((wo, index) => (
                        <tr key={wo._id}>
                            <td>{index} {wo.s_description}</td>
                            <td>{wo.s_cost}</td>
                            <td>{wo.assignedEmp}</td>
                            <td>{wo.customerID}</td>
                        </tr>
                    ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default WorkOrders;