import { Management } from '../models/management.js';

const createManagement = async (request, response) => {
    if (!request.body.firstName || !request.body.lastName || !request.body.phone || !request.body.email || !request.body.role) {
        return response.status(400).send({message: 'All required fields must be filled'});
    };
 
    try {
        const newManagement = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            phone: request.body.phone,
            email: request.body.email,
            role: request.body.role
        }
        const result = await Management.create(newManagement);
        return response.status(201).send(result)
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const getAllManagement = async (request, response) => {
    try {
        const result = await Management.find({});

        return response.status(200).send({
            count: result.length,
            data: result
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const getManagement = async (request, response) => {
    const { id } = request.params
    try {
        const result = await Management.findById(id);

        if(!result){
            return response.status(204).send({message: "No Content Found"});
        }

        return response.status(200).send(result);
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const updateManagement = async (request, response) => {
    if (!request.body.firstName || !request.body.lastName || !request.body.phone || !request.body.email || !request.body.role) {
        return response.status(400).send({message: 'All required fields must be filled'});
    };
    const { id } = request.params;
    try {
        const result = await Management.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(204).send({message: "No Content Found"});
        }

        return response.status(200).send({message: "Update Successful"});
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const deleteManagement = async (request, response) => {
    const { id } = request.params;
    try {
        const result = await Management.findByIdAndDelete(id);

        if(!result){
            return response.status(204).send({message: "No Content Found"});
        }

        return response.status(200).send({message: "Delete Successful"});
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

export default {createManagement, getAllManagement, getManagement, updateManagement, deleteManagement};