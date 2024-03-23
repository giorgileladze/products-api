import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './src/routes/authRoutes.js';
import { jwtFilterChain } from './src/middlewares/jwtMiddleware.js';
import setHeaders from './src/middlewares/setHeaders.js';
import upload from './src/middlewares/multerMiddleware.js';
import productsRoutes from './src/routes/productsRoutes.js';
import ordersRoutes from './src/routes/ordersRoutes.js';

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
app.use('/products', upload.single('file'), productsRoutes);
app.use('/order', jwtFilterChain,  ordersRoutes); // protect all routes since orders are user specific