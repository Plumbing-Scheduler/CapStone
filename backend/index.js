import express, { request } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import workOrder from './routes/api/workOrders.js';
import calendar from './routes/api/calendar.js';
import Customer from './routes/api/customer.js'
import Quote from './routes/api/quoteRequest.js';
import Employee from './routes/api/employee.js';
import Management from './routes/api/management.js';
import auth from './routes/auth.js';
import refresh from './routes/refresh.js'
import verifyJWT from './middleware/verifyJWT.js';
import logout from './routes/logout.js'
import cookieParser from 'cookie-parser';

import 'dotenv/config'
const PORT = process.env.port || 3500;
const corsOptions ={
    origin: ['http://localhost:3000', 'http://localhost:3500'],
    credentials: true
}
const app = express();
app.use(cookieParser())

app.use(cors(corsOptions)); 

app.use(express.json());


//Default Route
app.get('/' ,(request, response) => {
    //console.log(request);
    return response.status(234).send('Welcome to the beggining of the end!')
});
app.use('/login', auth)
app.use('/refresh', refresh)
app.use('/logout', logout)

//app.use(verifyJWT)
app.use('/management', Management)
app.use('/workorders', workOrder);
app.use('/schedule', calendar);
app.use('/customer', Customer);
app.use('/quote', Quote)
app.use('/employees', Employee)
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

