import express from 'express';
import mongoose from 'mongoose';

const app = express();


const PORT = process.env.port || 3500;
app.use(express.json());

//Default Route
app.get('/' ,(request, response) => {
    //console.log(request);
    return response.status(234).send('Welcome to the beggining of the end!')
});

//Connection to MongoDB
//Connection Process will need to be changed so than Mongo URL isnt in plain text!!!!!!
//for Development Process
try {
    await mongoose.connect('mongodb+srv://Admin:hvHVFgTb1Ljxf4oC@plumbing-scheduler.rqelmif.mongodb.net/?retryWrites=true&w=majority')
    console.log("connected to Mongo")
} catch (error) {
    console.log(error)
}

app.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}`);
});