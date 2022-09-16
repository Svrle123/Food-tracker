import { IFood, IUser } from ".";

export default interface IFoodLog {
    [key: string]: any,
    user: IUser,
    timeStamp: Date,
    entries: IFood[],
    total?: IFood,
    _id?: string
}