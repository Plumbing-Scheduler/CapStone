import { WorkOrder } from "../models/workOrderModel.js";
const createWorkOrder = async (request, response) => { 
    try {
        if(!request.body.description || !request.body.startDate || !request.body.cost 
            || !request.body.customerID || !request.body.address.street || !request.body.address.postalCode 
            || !request.body.address.city || !request.body.address.province || !request.body.serviceStatus){
            return response.status(400).send({message: 'All required fields must be filled'});
        };
        const newWorkOrder = {
            serviceStatus: request.body.serviceStatus,
            description: request.body.description,
            title: request.body.title,
            startDate: request.body.startDate,
            cost: request.body.cost,
            assignedEmp: request.body.assignedEmp,
            endDate: request.body.endDate,
            customerID: request.body.customerID,
            busName: request.body.busName,
            address: {
                street: request.body.address.street,
                postalCode: request.body.address.postalCode,
                city: request.body.address.city,
                province: request.body.address.province,
            }
        };
        const result = await WorkOrder.create(newWorkOrder);
    
        return response.status(201).send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    };
};

const getAllWorkOrders = async (request, response) => { 
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
};

const getWorkOrder = async (request, response) => { 
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
};

const updateWorkOrder = async (request, response) => { 
    try {
        if(!request.body.description || !request.body.startDate || !request.body.cost 
            || !request.body.customerID || !request.body.address.street || !request.body.address.postalCode 
            || !request.body.address.city || !request.body.address.province || !request.body.serviceStatus){
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
};

const deleteWorkOrder = async (request, response) => { 
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
};

export default {createWorkOrder, getAllWorkOrders, getWorkOrder, updateWorkOrder, deleteWorkOrder};