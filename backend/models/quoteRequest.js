import mongoose from "mongoose";

//Quote Request Database Model

const quoteRequestSchema = mongoose.Schema(
    {
        phone: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        cost: Number,
        busName: String,
        email: String,
    }
);

export const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);