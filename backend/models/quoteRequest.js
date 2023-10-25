import mongoose from "mongoose";

//Quote Request Database Model

const quoteRequestSchema = mongoose.Schema(
    {   
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        address: {
            street:{
                type: String,
                required: true
            },
            postalCode:{
                type: String,
                required: true
            },
            city:{
                type: String,
                required: true
            },
            province:{
                type: String,
                required: true
            }
        },
        cost: Number,
        busName: String,
        email: String,
    }
);

export const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);