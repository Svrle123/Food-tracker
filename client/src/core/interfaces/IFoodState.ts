import { IFood, IFoodResponse } from "./";

export default interface IFoodState {
    foodData: IFoodResponse,
    selectedFood: IFood
}