import { IFood, IUser } from ".";

export default interface IFoodLog {
    user: IUser,
    timeStamp: Date,
    entries: IFood[],
    _id?: string
}