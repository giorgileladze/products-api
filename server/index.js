import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './src/routes/authRoutes.js';
import { jwtFilterChain } from './src/middlewares/jwtMiddleware.js';
import setHeaders from './src/middlewares/setHeaders.js';
import upload from './src/middlewares/multerMiddleware.js';

const app = express();

const dbURI = 'mongodb+srv://giorgileladze78:QAwl9nc2k5B8Blu5@products-api.pbj3ill.mongodb.net/products-api';
mongoose.connect(dbURI).then(() => {
    app.listen(process.env.PORT || 3000);
}).catch((err) => console.log(err))


// middlewares
app.use(express.json());
app.use(setHeaders);

// register routes
app.use('/auth', authRoutes);
app.post('/file', upload.single('file'), (req, res, next) => {
    res.status(200).json(req.file);
})













// mongodb+srv://giorgileladze78:QAwl9nc2k5B8Blu5@products-api.pbj3ill.mongodb.net/?retryWrites=true&w=majority&appName=products-api