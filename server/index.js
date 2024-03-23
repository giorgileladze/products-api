import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './src/routes/authRoutes.js';
import { jwtFilterChain } from './src/middlewares/jwtMiddleware.js';

const app = express();

const dbURI = 'mongodb+srv://giorgileladze78:QAwl9nc2k5B8Blu5@products-api.pbj3ill.mongodb.net/products-api';
mongoose.connect(dbURI).then(() => {
    app.listen(process.env.PORT || 3000);
}).catch((err) => console.log(err))


// middlewares
app.use(express.json());

// register routes
app.use('/auth', authRoutes);













// mongodb+srv://giorgileladze78:QAwl9nc2k5B8Blu5@products-api.pbj3ill.mongodb.net/?retryWrites=true&w=majority&appName=products-api