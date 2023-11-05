import mongoose from "mongoose";


const managementSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

export const Management = mongoose.model('Management', managementSchema);