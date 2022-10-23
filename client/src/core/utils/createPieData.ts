import { startCase } from "lodash";
import { IFood } from "../interfaces";

export interface IPieChartData {
    [key: string]: any,
    carbohydrates: number,
    protein: number,
    fiber: number,
    fat: number,
}

export type PieChartField = [string, number | string]

export default function createPieData(entries: IFood[]): PieChartField[] {

    if (entries.length < 1) {
        return [];
    }

    const calculatedTotal: IPieChartData = {
        carbohydrates: 0,
        protein: 0,
        fiber: 0,
        fat: 0,
    };

    entries.forEach((entry) => {
        Object.keys(calculatedTotal).forEach((key) => {
            calculatedTotal[key] += entry[key];
        })
    })

    const mappedData: PieChartField[] = [
        ["Food log", "Amount"],
    ]

    Object.keys(calculatedTotal).forEach(field => {
        mappedData.push([startCase(field), calculatedTotal[field]])
    })

    return mappedData;
}