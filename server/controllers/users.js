import Users from "../models/Users.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.find({ _id: { $ne: id } });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.find({ _id: { $ne: id } });
        const friends = await Promise.all(
            user.friends.map(friend => Users.findById(friend._id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstname, lastname, occupation, location, picturePatch }) => {
                return { _id, firstname, lastname, occupation, location, picturePatch };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addRemoveFriends = async (req, res) => {
    try {
        const { id, friendID } = req.params;
        const user = await Users.findById(id);
        const friend = await Users.findById(friendID);

        if (!user || !friend) {
            return res.status(404).json({ message: "User or Friend not found" });
        }

        if (user.friends.includes(friendID)) {
            await user.updateOne({ $pull: { friends: friendID } });
            await friend.updateOne({ $pull: { friends: id } });
        } else {
            await user.updateOne({ $push: { friends: friendID } });
            await friend.updateOne({ $push: { friends: id } });
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map(friend => Users.findById(friend._id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstname, lastname, occupation, location, picturePatch }) => {
                return { _id, firstname, lastname, occupation, location, picturePatch };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}