import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';

import Food, { IFoodDocument } from "../models/food";
import { IFood, IFoodQuery } from '../interfaces';

export const createFood = async (req: Request, res: Response) => {
    const food: IFood = req.body;
    const adminId: string = req.params.adminId;

    try {
        const newFood: HydratedDocument<IFoodDocument> = new Food<IFood>({ ...food, creator: adminId, createdAt: new Date() })
        await newFood.save();

        res.status(201).json(newFood);
    } catch (error) {
        res.status(409).json(error);
    }
}

export const getFood = async (req: Request, res: Response) => {
    const { searchQuery = "", rpp = 10, page = 1 }: IFoodQuery = req.query;

    const name: RegExp = new RegExp(searchQuery, "i");
    let food: IFoodDocument[];
    let count = 1;

    if (searchQuery) {
        food = await Food.find<IFoodDocument>({ name: name }).limit(rpp).skip((page - 1) * rpp).sort({ name: 1 }).exec();
        count = await Food.find({ name: name }).countDocuments();
    } else {
        food = await Food.find<IFoodDocument>().limit(rpp).skip((page - 1) * rpp).sort({ name: 1 }).exec();
        count = await Food.countDocuments();
    }

    res.status(200).json({
        data: food,
        currentPage: food.length > 0 ? Number(page) : 1,
        totalPages: food.length > 0 ? Math.ceil(count / rpp) : 1,
    });
}