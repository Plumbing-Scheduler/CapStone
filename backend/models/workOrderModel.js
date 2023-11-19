import mongoose from "mongoose";

//WorkOrder Database Model
//This will be how the data is displayed in the database
const workOrderSchema = mongoose.Schema(
    {
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
        paymentType: String
    }
);

export const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);