import { IUser } from "../../../core/interfaces/IUser";

export interface ISignUpData extends IUser {
    confirmPassword?: string
}