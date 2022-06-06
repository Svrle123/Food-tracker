import mongoose from "mongoose";

const foodLogSchema = mongoose.Schema(
    {
        timeStamp: Date,
        userId: String,
        foodEntrys: [ String ]
    }
);

export default mongoose.model('FoodLog', foodLogSchema);
