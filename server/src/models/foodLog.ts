import { Schema, Document, model } from "mongoose";
import { IFoodLog, ILogTotal } from "../interfaces";
import FoodEntry from "./foodEntry";

export interface IFoodLogDocument extends IFoodLog, Document {
    getTotal: () => Promise<IFoodLogDocument>;
}

const foodLogSchema = new Schema<IFoodLogDocument>(
    {
        timeStamp: Date,
        user: { type: Schema.Types.ObjectId, ref: "User" },
        foodEntries: [{ type: Schema.Types.ObjectId, ref: "FoodEntry" }]
    }
);

foodLogSchema.methods.getTotal = async function () {
    const entries = await FoodEntry.find({ '_id': { $in: this.foodEntries } }).populate('food');
    const calculatedTotal: ILogTotal = {
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        protein: 0,
        fiber: 0
    }

    entries.forEach(entry => {
        Object.keys(calculatedTotal).forEach(key => {
            calculatedTotal[key] += entry.food[key];
        })
    })

    return { ...this._doc, total: calculatedTotal };
}

export default model<IFoodLogDocument>('FoodLog', foodLogSchema);
