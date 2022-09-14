import { Schema, model } from "mongoose";
import { IFoodEntry } from "../interfaces";

const foodEntrySchema = new Schema<IFoodEntry>(
    {
        food: { type: Schema.Types.ObjectId, ref: "Food" },
        amount: Number
    }
);

export default model<IFoodEntry>('FoodEntry', foodEntrySchema);
