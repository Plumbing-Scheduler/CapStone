import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import workOrder from './routes/api/workOrders.js';
import calendar from './routes/api/calendar.js';
import Customer from './routes/api/customer.js'
const app = express();

const PORT = process.env.port || 3500;

app.use(cors()); 

app.use(express.json());

//Default Route
app.get('/' ,(request, response) => {
    //console.log(request);
    return response.status(234).send('Welcome to the beggining of the end!')
});

app.use('/workorders', workOrder);
app.use('/schedule', calendar);
app.use('/customer', Customer);
//Connection to MongoDB
//Connection Process will need to be changed so than Mongo URL isnt in plain text!!!!!!
//for Development Process mongodb+srv://Admin:hvHVFgTb1Ljxf4oC@plumbing-scheduler.rqelmif.mongodb.net/?retryWrites=true&w=majority
mongoose
    .connect('mongodb+srv://Admin:hvHVFgTb1Ljxf4oC@plumbing-scheduler.rqelmif.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('App Connected to DataBase');
        app.listen(PORT, () => {
            console.log(`App is Listening on port ${PORT}`)
        });
    }
    ).catch((error) => {
        console.log(error);
    });

