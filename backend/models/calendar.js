import mongoose from "mongoose";

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
        notes: String,
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
        serviceStatus: String,
    }
);

export const Calendar = mongoose.model('Calendar', calendarSchema);