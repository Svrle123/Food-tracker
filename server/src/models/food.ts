import { Schema, Document, model } from "mongoose";

import { IFood } from "../interfaces";

export interface IFoodDocument extends IFood, Document {
}

const foodSchema = new Schema<IFoodDocument>(
    {
        name: String,
        type: String,
        calories: Number,
        carbohydrates: Number,
        fat: Number,
        protein: Number,
        fiber: Number,
        creator: { type: Schema.Types.ObjectId, ref: "User" },
        createdAt: Date,
    }
);

export default model<IFoodDocument>('Food', foodSchema);
