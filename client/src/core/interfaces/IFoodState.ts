import { IFood, IFoodResponse } from "./";

export default interface IFoodState {
    data: IFoodResponse,
    foodTypes: string[],
    selectedFood: IFood
}