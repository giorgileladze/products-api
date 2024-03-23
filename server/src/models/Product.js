import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        maxLength: 500,
        minLength: 50,
        required: true
    },
    smallDescription: {
        type: String,
        maxLength: 100,
        minLength: 10,
        required: true
    },
    img: {
        type: String,
        required: true,
        minLength: 1
    },
    quantity: {
        type: Number,
        default: 0
    }
});

const Product = model('products', productSchema);

export default Product;