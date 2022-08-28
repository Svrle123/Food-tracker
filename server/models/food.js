import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
    {
        name: String,
        type: String,
        calories: Number,
        carbohydrates: Number,
        fat: Number,
        protein: Number,
        fiber: Number,
        creator: String,
        createdAt: Date,
    }
);

export default mongoose.model('Food', foodSchema);
