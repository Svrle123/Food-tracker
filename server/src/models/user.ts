import { Schema, Document, model } from "mongoose";
import { IUser } from "../interfaces";
import bcrypt from 'bcrypt';

export interface IUserDocument extends IUser, Document {
    setPassword: (password: string) => Promise<void>;
    checkPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
    {
        userName: { type: String },
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true }
    }
);

userSchema.methods.setPassword = async function (password: string) {
    const hash = await bcrypt.hash(password, 10);
    this.password = hash;
}

userSchema.methods.checkPassword = async function (password: string) {
    const result = await bcrypt.compare(password, this.password);
    return result;
};

export default model<IUserDocument>('User', userSchema);