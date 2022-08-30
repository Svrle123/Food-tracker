import { Schema, model } from "mongoose";
import { IFoodEntry } from "./interfaces/IFoodEntry";

const foodEntrySchema = new Schema<IFoodEntry>(
    {
        entries: [
            {
                foodType: String,
                amount: Number,
            }
        ]
    }
);

export default model<IFoodEntry>('FoodEntry', foodEntrySchema);
