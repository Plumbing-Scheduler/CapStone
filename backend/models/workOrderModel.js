import mongoose from "mongoose";

//WorkOrder Database Model
//This will be how the data is displayed in the database
const workOrderSchema = mongoose.Schema(
    {
        serviceStatus: Number,
        s_description: {
            type: String,
            required: true
        },
        title: {
            type: String,
        },
        s_startDate: {
            type: Date,
            required: true
        },
        s_cost:{
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