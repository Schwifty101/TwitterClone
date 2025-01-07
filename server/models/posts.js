import mongoose from "mongoose";    

export default mongoose.model("Post", new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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
    },
}, { timestamps: true }
));