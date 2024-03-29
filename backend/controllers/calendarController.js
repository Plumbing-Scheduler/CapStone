import { Calendar } from '../models/calendar.js';

const createCalendar = async (request, response) => {
    if (!request.body.title || !request.body.startDate || !request.body.endDate || !request.body.serviceId) {
        return response.status(400).send({message: 'All required fields must be filled'});
    };
 
    try {
        const newCalendar = {
            title: request.body.title,
            startDate: request.body.startDate,
            endDate: request.body.endDate,
            serviceId: request.body.serviceId,
            empId: request.body.empId,
            notes: request.body.notes,
            address: {
                street: request.body.address.street,
                postalCode: request.body.address.postalCode,
                city: request.body.address.city,
                province: request.body.address.province,
            },
            serviceStatus: request.body.serviceStatus,
        }
        const result = await Calendar.create(newCalendar);
        return response.status(201).send(result)
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const getAllCalendar = async (request, response) => {
    try {
        const result = await Calendar.find({});

        return response.status(200).send({
            count: result.length,
            data: result
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const getCalendar = async (request, response) => {
    const { id } = request.params
    try {
        const result = await Calendar.findById(id);

        if(!result){
            return response.status(204).send({message: "No Content Found"});
        }

        return response.status(200).send(result);
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const updateCalendar = async (request, response) => {
    if (!request.body.title || !request.body.startDate || !request.body.endDate || !request.body.serviceId) {
        return response.status(400).send({message: 'All required fields must be filled'});
    };
    const { id } = request.params;
    try {
        const result_calID = await Calendar.findByIdAndUpdate(id, request.body);
        const result_ServID = await Calendar.findOneAndUpdate({serviceId: id}, request.body);

        if(!result_calID && !result_ServID){
            return response.status(204).send({message: "No Content Found"});
        }

        return response.status(200).send({message: "Update Successful"});
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const deleteCalendar = async (request, response) => {
    const { id } = request.params;
    try {
        const result_calID = await Calendar.findByIdAndDelete(id);
        const result_ServID = await Calendar.findOneAndDelete({serviceId: id});
        if(!result_calID && !result_ServID){
            return response.status(204).send({message: "No Content Found"});
        }

        return response.status(200).send({message: "Delete Successful"});
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

export default {createCalendar, getAllCalendar, getCalendar, updateCalendar, deleteCalendar};