import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide user name'],
        minLength: [3, 'username should be at least 3 character'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: [6, 'Password should be at least 6 character']
    }
});

// hash password before creating user
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
})

const User = model('users', userSchema);

export default User;