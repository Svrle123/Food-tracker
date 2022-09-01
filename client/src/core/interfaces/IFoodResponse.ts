import { IFood } from "./";

export default interface IFoodResponse {
    data: IFood[],
    currentPage: number,
    totalPages: number,
}