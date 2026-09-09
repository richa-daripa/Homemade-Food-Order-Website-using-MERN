import userModel from "../models/UserSchema.js";

export const syncUser = async (req, res) => {
    console.log(req.user);

    try {
        const { uid, email } = req.user;
        const { name } = req.body;

        let user = await userModel.findOne({
            firebaseUid: uid
        });

        if (!user) {
            user = await userModel.create({
                firebaseUid: uid,
                name,
                email
            });
        } else {
            user.lastLogin = new Date();
            user.name = name;
            await user.save();
        }
        res.status(200).json({
            success: true, user
        });

    } catch (error) {
        res.status(500).json({
            success: false, message: error.message
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        res.status(200).json({
            success: true, users
        });

    } catch (error) {
        res.status(500).json({
            success: false, message: error.message
        });

    }
};