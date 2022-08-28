import mongoose from "mongoose";

const foodEntrySchema = mongoose.Schema(
    {
        entries: [
            {
                foodType: String,
                amount: Number,
            }
        ]
    }
);

export default mongoose.model('FoodEntry', foodEntrySchema);
