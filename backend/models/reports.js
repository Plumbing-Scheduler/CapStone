import mongoose from "mongoose";

//reprots database

const reportsSchema = mongoose.Schema(
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
            },

        busName: String,
        phone: {
            type: Number,
            required: true
        },
        email: String,

        },
        serviceStatus: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        title: {
            type: String,
        },
        startDate: {
            type: Date,
            required: true
        },
        cost:{
            type: Number,
            required: true
        },
        assignedEmp:String,
        endDate: Date,
        customerID: String,
        busName: String,
        address: {
            type: String,
            required: true
        }
    }
);

export const reports = mongoose.model('Reports', reportsSchema);