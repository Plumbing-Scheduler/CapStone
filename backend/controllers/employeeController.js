import { Employee } from "../models/employee.js";

const createEmployee = async (request, response) => {
    try {
        if (!request.body.firstName || !request.body.lastName || !request.body.phone || !request.body.email || !request.body.role
            || !request.body.startDate || !request.body.employmentType || !request.body.status) {
            return response.status(400).send({ message: 'All required fields must be filled' });
        };
        const newEmployee = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            phone: request.body.phone,
            email: request.body.email,
            role: request.body.role,
            startDate: request.body.startDate,
            employmentType: request.body.employmentType,
            status: request.body.status,
            serviceList: request.body.serviceList
        };
        const result = await Employee.create(newEmployee);

        return response.status(201).send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    };
};

const getAllEmployee = async (request, response) => {
    try {
        const result = await Employee.find({});
        return response.status(200).send({
            count: result.length,
            data: result
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    };
};

const getEmployee = async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Employee.findById(id);
        if (!result) {
            return response.status(404).send({ message: 'No Content Found' });
        };
        return response.status(200).send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    };
};

const updateEmployee = async (request, response) => {
    try {
        if (!request.body.firstName || !request.body.lastName || !request.body.phone || !request.body.email || !request.body.role
            || !request.body.startDate || !request.body.employmentType || !request.body.status) {
            return response.status(400).send({ message: 'All required fields must be filled' });
        };

        const { id } = request.params;

        const result = await Employee.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).send({ message: 'No Content Found' });
        };
        return response.status(200).send({ message: 'Update Successful' })
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
};

const deleteEmployee = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Employee.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'No Content Found' });
        };
        return response.status(200).send({ message: "Delete Successful!" });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    };
};

export default { createEmployee, getAllEmployee, getEmployee, updateEmployee, deleteEmployee };