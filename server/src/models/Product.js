import mongoose from "mongoose";

const { Schema, model } = mongoose;

// I am not providing endpoints for product manipulations (add/delete/update) for time reasons
// and it was not requested in the task as well
// instead i will add products manually in db
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
        minLength: 50
    },
    smallDescription: {
        type: String,
        maxLength: 100,
        minLength: 10
    },
    img: {
        type: String
    },
    quantity: {
        type: Number,
        default: 0
    }
});

const Product = model('product', productSchema);

export default Product;