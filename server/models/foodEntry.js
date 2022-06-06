import mongoose from "mongoose";

const foodEntrySchema = mongoose.Schema(
    {
        entrys: [
            {
                foodType: String,
                amount: Number,
            }
        ]
    }
);

export default mongoose.model('FoodEntry', foodEntrySchema);
