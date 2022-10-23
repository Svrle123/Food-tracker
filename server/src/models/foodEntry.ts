import { Schema, Document, model } from "mongoose";

import { IFoodEntry } from "../interfaces";

export interface IFoodEntryDocument extends IFoodEntry, Document {
}

const foodEntrySchema = new Schema<IFoodEntryDocument>(
    {
        food: { type: Schema.Types.ObjectId, ref: "Food" },
        amount: Number
    }
);

export default model<IFoodEntryDocument>('FoodEntry', foodEntrySchema);
