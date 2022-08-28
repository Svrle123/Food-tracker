import User from "../models/user.js";

export const signUp = async (req, res) => {
    const userDetails = req.body;

    try {
        const newUser = await new User({ ...userDetails });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const signIn = async (req, res) => {
    const { userNameOrEmail, password } = req.body;
    let isValidUser;

    try {
        if (userNameOrEmail.includes("@")) {
            isValidUser = await User.findOne({ email: userNameOrEmail }).lean();
        } else {
            isValidUser = await User.findOne({ userName: userNameOrEmail }).lean();
        }

        if (!isValidUser) {
            return res.status(400).json({ message: "User with that email/username doesn't exist!" });
        }

        if (isValidUser.password === password) {
            res.status(200).json({ ...isValidUser, password: null });
        } else {
            res.status(400).json({ message: "Password is incorrect!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}