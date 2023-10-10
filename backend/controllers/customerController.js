import { Customer } from '../models/customer.js';

const createCustomer = async (request, response) => {
    if (!request.body.title || !request.body.startDate || !request.body.endDate || !request.body.serviceId) {
        return response.status(400).send({message: 'All required fields must be filled'});
    };
 
    try {
        const newCustomer = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            busName: request.body.busName,
            phone: request.body.phone,
            email: request.body.email,
            address: request.body.address
        }
        const result = await Customer.create(newCustomer);
        return response.status(201).send(result)
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const getAllCustomer = async (request, response) => {
    try {
        const result = await Customer.find({});

        return response.status(200).send({
            count: result.length,
            data: result
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const getCustomer = async (request, response) => {
    const { id } = request.params
    try {
        const result = await Customer.findById(id);

        if(!result){
            return response.status(204).send({message: "No Content Found"});
        }

        return response.status(200).send(result);
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const updateCustomer = async (request, response) => {
    if (!request.body.title || !request.body.startDate || !request.body.endDate || !request.body.serviceId) {
        return response.status(400).send({message: 'All required fields must be filled'});
    };
    const { id } = request.params;
    try {
        const result = await Customer.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(204).send({message: "No Content Found"});
        }

        return response.status(200).send({message: "Update Successful"});
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const deleteCustomer = async (request, response) => {
    const { id } = request.params;
    try {
        const result = await Customer.findByIdAndDelete(id);

        if(!result){
            return response.status(204).send({message: "No Content Found"});
        }

        return response.status(200).send({message: "Delete Successful"});
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

export default {createCustomer, getAllCustomer, getCustomer, updateCustomer, deleteCustomer};