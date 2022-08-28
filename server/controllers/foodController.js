import Food from "../models/food.js";

export const createFood = async (req, res) => {
    const food = req.body;
    const adminId = req.params.adminId;

    try {
        const newFood = new Food({ ...food, creator: adminId, createdAt: new Date().toUTCString() })
        await newFood.save();

        res.status(201).json(newFood);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getFood = async (req, res) => {
    const { searchQuery, type, rpp = 10, page = 1 } = req.query;

    const name = new RegExp(searchQuery, "i");
    let food = null;

    if (type) {
        food = await Food.find({ type, name }).limit(rpp).skip((page - 1) * rpp).exec();
    } else {
        food = await Food.find().limit(rpp).skip((page - 1) * rpp).exec();
    }
    const count = await Food.countDocuments();

    res.status(200).json({
        food,
        currentPage: page,
        totalPages: Math.ceil(count / rpp),
    });
}