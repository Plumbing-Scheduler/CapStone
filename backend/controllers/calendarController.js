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
            empId: request.body.empId
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
    
    try {
        
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

const deleteCalendar = async (request, response) => {

    try {
        
    } catch (error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    };
};

export default {createCalendar, getAllCalendar, getCalendar, updateCalendar, deleteCalendar};