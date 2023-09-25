import mongoose from "mongoose";

//This may change
//Im not sure how well this will work with our system
const calendar = mongoose.Schema(
    {
        service: String,
        date:{
            type: Date,
            required: true
        },
        serviceID: String,
        empID: String,
    }
);
module.exports = mongoose.model(calendar);