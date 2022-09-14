import User, { IUserDocument } from "../models/user";
import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { IUser, ISignInBody } from "../interfaces";
import ERROR_CODES from "../error-codes";

export const signUp = async (req: Request, res: Response) => {
    const userDetails: IUser = req.body;

    const emailTaken: IUserDocument | null = await User.findOne<IUserDocument>({ email: userDetails.email });
    const userNameTaken: IUserDocument | null = await User.findOne<IUserDocument>({ userName: userDetails.userName });

    if (userNameTaken) {
        return res.status(400).json({ message: ERROR_CODES[1003], errorCode: 1003 })
    } else if (emailTaken) {
        return res.status(400).json({ message: ERROR_CODES[1002], errorCode: 1002 })
    }

    try {
        const newUser: HydratedDocument<IUserDocument> = new User<IUser>({ ...userDetails });
        await newUser.setPassword(userDetails.password);
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const signIn = async (req: Request, res: Response) => {
    const { userNameOrEmail, password }: ISignInBody = req.body;
    let isValidUser: IUserDocument | null;

    try {
        if (userNameOrEmail.includes("@")) {
            isValidUser = await User.findOne<IUserDocument>({ email: userNameOrEmail });
        } else {
            isValidUser = await User.findOne<IUserDocument>({ userName: userNameOrEmail });
        }

        if (isValidUser == null) {
            return res.status(400).json({ message: ERROR_CODES[1000], errorCode: 1000 });
        }

        if (await isValidUser.checkPassword(password)) {
            res.status(200).json(isValidUser);
        } else {
            res.status(400).json({ message: ERROR_CODES[1001], errorCode: 1001 });
        }
    } catch (error) {
        res.status(500).json(error);
    }

}