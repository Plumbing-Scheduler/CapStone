import mongoose from "mongoose";

const workOrder = mongoose.Schema(
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
)