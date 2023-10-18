import mongoose from "mongoose";

//Employee Database Model
//This will be how the data is displayed in the database
const employeeSchema = mongoose.Schema(
    {
        firstName:{
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
        email:{
            type: String,
            required: true
        },
        role:{
            type: String,
            required: true
        },
        startDate:{
            type: Date,
            required: true
        },
        serviceList: String
    }
);

export const Employee = mongoose.model('Employee', employeeSchema);