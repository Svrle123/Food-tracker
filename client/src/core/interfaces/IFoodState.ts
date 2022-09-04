import { IFoodResponse } from "./";

export default interface IFoodState {
    data: IFoodResponse,
    foodTypes: string[],
}