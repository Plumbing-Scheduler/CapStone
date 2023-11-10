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
        role:{
            type: String,
            required: true
        },
        experience: Number,
        startDate:{
            type: Date,
            required: true
        },
        employmentType:{
            type: String,
            required: true
        },
        status:{
            type: String,
            required: true
        },
        serviceList: String,
        password: String,
        refreshToken: String

    }
);

export const Employee = mongoose.model('Employee', employeeSchema);