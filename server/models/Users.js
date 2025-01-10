import mongoose from "mongoose";

export default mongoose.model("User", new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: []
        },
        location: {
            type: String,
            default: ""
        },
        occupation: {
            type: String,
            default: ""
        },
        viewedProfile: Number,
        impressions: Number
    },
    { timestamps: true }
));