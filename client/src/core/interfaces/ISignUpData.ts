import { IUser } from "./";

export default interface ISignUpData extends IUser {
    confirmPassword?: string
}