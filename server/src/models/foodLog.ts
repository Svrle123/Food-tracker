import { Schema, model } from "mongoose";
import { IFoodLog } from "../interfaces";

const foodLogSchema = new Schema<IFoodLog>(
    {
        timeStamp: Date,
        user: { type: Schema.Types.ObjectId, ref: "User" },
        foodEntries: [{ type: Schema.Types.ObjectId, ref: "FoodEntry" }]
    }
);

export default model<IFoodLog>('FoodLog', foodLogSchema);
