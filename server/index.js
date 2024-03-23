import express from 'express';
import mongoose from 'mongoose';

const app = express();


const dbURI = 'mongodb+srv://giorgileladze78:QAwl9nc2k5B8Blu5@products-api.pbj3ill.mongodb.net/products-api';
mongoose.connect(dbURI).then(() => {
    app.listen(3000);
}).catch((err) => console.log(err))


app.get('/', (req, res, next) => {
    res.status(201).json({
        message: 'good'
    })
})















// mongodb+srv://giorgileladze78:QAwl9nc2k5B8Blu5@products-api.pbj3ill.mongodb.net/?retryWrites=true&w=majority&appName=products-api