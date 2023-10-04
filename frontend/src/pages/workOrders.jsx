import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//DOES NOT WORK!!!!!
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
            <Link to='/WorkOrder/Form'>
                <button>Add new</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Cost</th>
                        <th>Emp</th>
                        <th>Customer</th>
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