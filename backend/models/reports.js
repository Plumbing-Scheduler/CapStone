import mongoose from "mongoose";
//reports database
const reportsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        date: {
            type: Date
        },
        params: {
            startDate: Date,
            endDate: Date,
            busName: String,
            customer: String,
            paymentType: String,
            status: String,
            service: String,
            employee: String
        },
        info:  [
                {
                    workOrder: {
                        title: String,
                        startDate: String,
                        endDate: String,
                        description: String,
                        cost: String,
                        busName: String,
                        paymentType: String,
                        address: String
                    },
                    employee: {
                        name: String,
                    },
                    customer: {
                        name: String,
                        phone: Number,
                        email: String
                    }
                }
            ]
        }
);

export const Reports = mongoose.model('Reports', reportsSchema);