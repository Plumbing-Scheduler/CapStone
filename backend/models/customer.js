import mongoose from "mongoose";

//Customer Database Model

const customerSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
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
        busName: String,
        phone: {
            type: Number,
            required: true
        },
        email: String
    }
);

export const Customer = mongoose.model('Customer', customerSchema);