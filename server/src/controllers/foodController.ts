import Food from "../models/food";
import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { IFood, IFoodQuery } from '../interfaces';

export const createFood = async (req: Request, res: Response) => {
    const food: IFood = req.body;
    const adminId: string = req.params.adminId;

    try {
        const newFood: HydratedDocument<IFood> = new Food<IFood>({ ...food, creator: adminId, createdAt: new Date().toUTCString() })
        await newFood.save();

        res.status(201).json(newFood);
    } catch (error) {
        res.status(409).json(error);
    }
}

export const getFood = async (req: Request, res: Response) => {
    const { searchQuery = "", type = "", rpp = 10, page = 1 }: IFoodQuery = req.query;

    const name: RegExp = new RegExp(searchQuery, "i");
    let food: IFood[];
    let count: number = 1;
    //refactor this for the love of all that is holy
    if (type && searchQuery) {
        food = await Food.find<IFood>({ type: type, name: name }).limit(rpp).skip((page - 1) * rpp).sort({ name: 1 }).exec();
        count = await Food.find({ type: type, name: name }).countDocuments();
    } else if (type) {
        food = await Food.find<IFood>({ type: type }).limit(rpp).skip((page - 1) * rpp).sort({ name: 1 }).exec();
    } else if (name) {
        food = await Food.find<IFood>({ name: name }).limit(rpp).skip((page - 1) * rpp).sort({ name: 1 }).exec();
    } else {
        food = await Food.find<IFood>().limit(rpp).skip((page - 1) * rpp).sort({ name: 1 }).exec();

    }

    res.status(200).json({
        data: food,
        currentPage: food.length > 0 ? Number(page) : 1,
        totalPages: food.length > 0 ? Math.ceil(count / rpp) : 1,
    });
}

export const getAllTypes = async (_: Request, res: Response) => {
    const allFoodTypes: string[] = await Food.distinct("type");

    res.status(200).json(allFoodTypes);
}