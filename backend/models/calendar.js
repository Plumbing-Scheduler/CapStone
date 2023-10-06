import mongoose from "mongoose";

//This may change
//Im not sure how well this will work with our system
const calendarSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        startDate:{
            type: Date,
            required: true
        },
        endDate:{
            type: Date,
            required: true
        },
        serviceId:{
            type: String,
            required: true
        },
        empId: String,
    }
);

export const Calendar = mongoose.model('Calendar', calendarSchema);