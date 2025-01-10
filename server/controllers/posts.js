import Posts from "../models/Posts.js";
import Users from "../models/Users.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePatch } = req.body;
        const user = await Users.findbyId(userId);
        const newPost = new Posts({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePatch,
            userPicturePatch: user.picturePatch,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const posts = await Posts.find();
        res.status(200).json(posts);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getFeedPost = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Posts.find({ userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find Post
        const post = await Posts.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Toggle like
        const hasLiked = post.likes.get(userId);
        if (hasLiked) post.likes.delete(userId);
        else post.likes.set(userId, true);

        // Save Post
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
