import { Customer } from '../models/customer.js';

const createCustomer = async (request, response) => {
    if (!request.body.firstName || !request.body.lastName || !request.body.address.street || !request.body.address.postalCode 
        || !request.body.address.city || !request.body.address.province) {
        return response.status(400).send({message: 'All required fields must be filled'});
    };
 
    try {
        const newCustomer = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            busName: request.body.busName,
            phone: request.body.phone,
            email: request.body.email,
            address: {
                street: request.body.address.street,
                postalCode: request.body.address.postalCode,
                city: request.body.address.city,
                province: request.body.address.province,
            }
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

const getCustomerByNamePhoneEmail = async (request, response) => {
    const { email, phone } = request.params
    try {
        const result = await Customer.findOne({ phone: phone, email: email});
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
    if (!request.body.firstName || !request.body.lastName || !request.body.address.street || !request.body.address.postalCode 
        || !request.body.address.city || !request.body.address.province) {
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

export default {createCustomer, getAllCustomer, getCustomer, updateCustomer, deleteCustomer, getCustomerByNamePhoneEmail};