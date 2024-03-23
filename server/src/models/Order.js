import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    products: [
        {
            _id: {
                type: Schema.Types.ObjectId, // Reference to Product model
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

const Order = model('orders', orderSchema);

export default Order;