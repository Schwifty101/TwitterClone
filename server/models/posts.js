import mongoose from "mongoose";

export default mongoose.model("Post", new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePatch: String,
    likes: {
        type: Map,
        of: Boolean,
        default: {},
    },
    comments: {
        type: Array,
        default: [],
    }
}, { timestamps: true }
));