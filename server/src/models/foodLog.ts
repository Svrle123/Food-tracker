import { Schema, model } from "mongoose";
import { IFoodLog } from "./interfaces/IFoodLog";

const foodLogSchema = new Schema<IFoodLog>(
    {
        timeStamp: Date,
        userId: String,
        foodEntries: [String]
    }
);

export default model<IFoodLog>('FoodLog', foodLogSchema);
