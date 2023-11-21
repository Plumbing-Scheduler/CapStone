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
        }
    }
);

export const Calendar = mongoose.model('Calendar', calendarSchema);