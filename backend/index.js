import express from 'express';
const app = express();

const PORT = process.env.port || 3500;

app.get('/' ,(request, response) => {
    console.log(request);
    return response.status(234).json({message: 'Welcome to the beggining of the end!'})
});

app.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}`);
});