import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        userName: { type: String },
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true }
    }
);

export default mongoose.model('User', userSchema);
