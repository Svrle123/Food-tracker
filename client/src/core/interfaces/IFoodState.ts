import { IFood, IFoodResponse } from "./";

export default interface IFoodState {
    foodData: IFoodResponse,
    foodTypes: string[],
    selectedFood: IFood
}