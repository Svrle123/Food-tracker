import User from "../models/user";
import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { IUser, ISignInBody } from "../interfaces";

export const signUp = async (req: Request, res: Response) => {
    const userDetails: IUser = req.body;

    const emailTaken: IUser | null = await User.findOne<IUser>({ email: userDetails.email }).lean();

    if (emailTaken) {
        return res.status(400).json({ message: "User with that email already exists!" })
    }

    try {
        const newUser: HydratedDocument<IUser> = new User<IUser>({ ...userDetails });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const signIn = async (req: Request, res: Response) => {
    const { userNameOrEmail, password }: ISignInBody = req.body;
    let isValidUser: IUser | null;

    try {
        if (userNameOrEmail.includes("@")) {
            isValidUser = await User.findOne<IUser>({ email: userNameOrEmail }).lean();
        } else {
            isValidUser = await User.findOne<IUser>({ userName: userNameOrEmail }).lean();
        }

        if (!isValidUser) {
            return res.status(400).json({ message: "User with that email/username doesn't exist!" });
        }

        if (isValidUser.password === password) {
            res.status(200).json({ ...isValidUser, password: "" });
        } else {
            res.status(400).json({ message: "Password is incorrect!" });
        }
    } catch (error) {
        res.status(500).json(error);
    }

}