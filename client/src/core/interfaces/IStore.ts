import IFoodState from "./IFoodState";
import INotificationProps from "./INotificationProps";
import IUser from "./IUser";

export default interface IStore {
    user: IUser,
    food: IFoodState,
    error: INotificationProps
}