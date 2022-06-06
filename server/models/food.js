import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
    {
        name: String,
        calories: Number,
        fat: Number,
        carbohydrates: Number,
        protein: Number,
        fiber: Number
    }
);

export default mongoose.model('Food', foodSchema);
