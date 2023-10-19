import { QuoteRequest } from "../models/quoteRequest.js";
const createQuoteRequest = async (request, response) => { 
    try {
        if(!request.body.description || !request.body.phone || !request.body.address || !request.body.firstName || !request.body.lastName){
            return response.status(400).send({message: 'All required fields must be filled'});
        };
        const newQuoteRequest = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            phone: request.body.phone,
            description: request.body.description,
            cost: request.body.cost,
            address: request.body.address, 
            busName: request.body.busName,
            email: request.body.email
        };
        const result = await QuoteRequest.create(newQuoteRequest);
    
        return response.status(201).send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    };
};

const getAllQuoteRequest = async (request, response) => { 
    try {
        const result = await QuoteRequest.find({});
        return response.status(200).send({
            count: result.length,
            data: result
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    };
};

const getQuoteRequest = async (request, response) => { 
    try {
        const { id } = request.params;

        const result = await QuoteRequest.findById(id);
        if(!result){
            return response.status(404).send({message: 'No Content Found'});
        };
        return response.status(200).send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    };
};

const updateQuoteRequest = async (request, response) => { 
    try {
        if(!request.body.description || !request.body.phone || !request.body.address || !request.body.firstName || !request.body.lastName){
            return response.status(400).send({message: 'All required fields must be filled'});
        };

        const { id } = request.params;

        const result = await QuoteRequest.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).send({message: 'No Content Found'});
        };
        return response.status(200).send({message: 'Update Successful'})
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
};

const deleteQuoteRequest = async (request, response) => { 
    try {
        const { id } = request.params;
        const result = await QuoteRequest.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({message: 'No Content Found'});
        };
        return response.status(200).send({message: "Delete Successful!"});
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    };
};

export default {createQuoteRequest, getAllQuoteRequest, getQuoteRequest, updateQuoteRequest, deleteQuoteRequest};