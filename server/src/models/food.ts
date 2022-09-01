import { Schema, model } from "mongoose";
import { IFood } from "../interfaces";

const foodSchema = new Schema<IFood>(
    {
        name: String,
        type: String,
        calories: Number,
        carbohydrates: Number,
        fat: Number,
        protein: Number,
        fiber: Number,
        creator: String,
        createdAt: String,
    }
);

export default model<IFood>('Food', foodSchema);
