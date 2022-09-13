import FoodEntry from "../models/foodEntry";
import { IFoodEntry } from "../interfaces";

export const createEntries = async (entries: IFoodEntry[]) => {
    const newEntries = await FoodEntry.insertMany(entries);
    return newEntries.map(entry => entry._id.toString());
}