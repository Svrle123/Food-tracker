import { IFood } from "./";

export default interface ITableProps {
    data: IFood[],
    currentPage: number,
    totalPages: number,
    dropdownData: string[]
}