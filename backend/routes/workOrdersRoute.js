import express from "express";
import { WorkOrder } from '../models/workOrderModel.js';

const router = express.Router();

//Route to add a new workOrder
router.post('/', async (request, response) => {
    try {
        if(!request.body.s_description || !request.body.s_startDate || !request.body.s_cost || !request.body.customerID){
            return response.status(400).send({message: 'All required fields must be filled'});
        };
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
    };
});

//Route to Get ALL workOrders
router.get('/', async (request, response) => {
    try {
        const result = await WorkOrder.find({});
        return response.status(200).send({
            count: result.length,
            data: result
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    };
});

//Route to get workOrder by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await WorkOrder.findById(id);
        if(!result){
            return response.status(404).send({message: 'Work Order Not Found'});
        };
        return response.status(200).send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    };
});

//Route to update workorder by ID
router.put('/:id', async (request, response) => {
    try {
        if(!request.body.s_description || !request.body.s_startDate || !request.body.s_cost || !request.body.customerID){
            return response.status(400).send({message: 'All required fields must be filled'});
        };

        const { id } = request.params;

        const result = await WorkOrder.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).send({message: 'Work Order Not Found'});
        };
        return response.status(200).send({message: 'Work Order Updated!'})
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

//Route to Delete worderOrder by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await WorkOrder.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({message: 'Work Order Not Found'});
        };
        return response.status(200).send({message: "Work Order Deleted!"});
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    };
});

export default router;