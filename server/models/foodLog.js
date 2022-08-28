import mongoose from "mongoose";

const foodLogSchema = mongoose.Schema(
    {
        timeStamp: Date,
        userId: String,
        foodEntries: [String]
    }
);

export default mongoose.model('FoodLog', foodLogSchema);
