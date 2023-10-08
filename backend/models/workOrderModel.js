import mongoose from "mongoose";

//WorkOrder Database Model
//This will be how the data is displayed in the database
const workOrderSchema = mongoose.Schema(
    {
        serviceStatus: Number,
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

export const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);