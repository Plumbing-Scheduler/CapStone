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

    }
);

export const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);