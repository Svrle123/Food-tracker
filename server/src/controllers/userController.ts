import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

import User, { IUserDocument } from "../models/user";
import { IUser, ISignInBody } from "../interfaces";
import ERROR_CODES from "../error-codes";

export const signUp = async (req: Request, res: Response) => {
    const userDetails: IUser = req.body;

    try {
        const emailTaken: IUserDocument | null = await User.findOne<IUserDocument>({ email: { $regex: new RegExp(userDetails.email, "i") } });
        const userNameTaken: IUserDocument | null = await User.findOne<IUserDocument>({ userName: { $regex: new RegExp(userDetails.userName, "i") } });

        if (userNameTaken) {
            return res.status(400).json({ message: ERROR_CODES[1003], errorCode: 1003 })
        } else if (emailTaken) {
            return res.status(400).json({ message: ERROR_CODES[1002], errorCode: 1002 })
        }

        const newUser: HydratedDocument<IUserDocument> = new User<IUser>({ ...userDetails });
        await newUser.setPassword(userDetails.password);
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const signIn = async (req: Request, res: Response) => {
    const { usernameOrEmail, password }: ISignInBody = req.body;
    let isValidUser: IUserDocument | null;

    const caseInsensitiveUsernameOrEmail: RegExp = new RegExp(usernameOrEmail, "i");

    try {
        if (usernameOrEmail.includes("@")) {
            isValidUser = await User.findOne<IUserDocument>({ email: { $regex: caseInsensitiveUsernameOrEmail } });
        } else {
            isValidUser = await User.findOne<IUserDocument>({ userName: { $regex: caseInsensitiveUsernameOrEmail } });
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