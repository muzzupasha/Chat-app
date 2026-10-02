import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto:{
        type: String,
        default: "https://res.cloudinary.com/dxjv0gq3f/image/upload/v1690911685/Default-Profile-Picture-1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_q6z8kz.png"
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    }
}, { timestamps: true });

export const User = mongoose.model("User", userModel);