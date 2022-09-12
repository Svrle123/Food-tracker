import { Schema, model } from "mongoose";
import { IFoodEntry } from "../interfaces";

const foodEntrySchema = new Schema<IFoodEntry>(
    {
        foodId: String,
        amount: Number
    }
);

export default model<IFoodEntry>('FoodEntry', foodEntrySchema);
