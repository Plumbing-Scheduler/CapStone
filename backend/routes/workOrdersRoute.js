import express from "express";
import { WorkOrder } from '../models/workOrderModel.js';

const router = express.Router();

//Route to add a new workOrder
router.post('/', async (request, response) => {
    try {
        if(!request.body.s_description || !request.body.s_startDate || !request.body.s_cost || !request.body.customerID){
            return response.status(400).send({message: 'All required fields must be filled'});
        }
        const newWorkOrder = {
            serviceStatus: 1,
            s_description: request.body.s_description,
            s_startDate: request.body.s_startDate,
            s_cost: request.body.s_cost,
            assignedEmp: '',
            endDate: request.body.endDate,
            customerID: '',
            busName: ''
        };
        const result = await WorkOrder.create(newWorkOrder);

        return response.status(201).send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

//Route to Get ALL workOrders
router.get('/', async (request, response) => {
    try {
        const workOrders = await WorkOrder.find({});
        return response.status(200).send({
            count: workOrders.length,
            data: workOrders
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

//Route to get workOrder by ID
router.get('/:id', async (request, response) => {

});

//Route to update workorder by ID
router.put('/:id', async (request, response) => {
    
});

//Route to Delete worderOrder by ID
router.delete('/:id', async (request, response) => {
    
})

export default router;