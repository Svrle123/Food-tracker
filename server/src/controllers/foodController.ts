import Food from "../models/food";
import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { IFood } from '../models/interfaces/IFood';
import { IFoodQuery } from './interfaces/IFoodQuery';

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
    const { searchQuery = "", type, rpp = 10, page = 1 }: IFoodQuery = req.query;

    const name: RegExp = new RegExp(searchQuery, "i");
    let food: IFood[];

    if (type) {
        food = await Food.find<IFood>({ type: type, name: name }).limit(rpp).skip((page - 1) * rpp).exec();
    } else {
        food = await Food.find<IFood>().limit(rpp).skip((page - 1) * rpp).exec();
    }
    const count: number = await Food.countDocuments();

    res.status(200).json({
        data: food,
        currentPage: page,
        totalPages: Math.ceil(count / rpp),
    });
}

export const getAllTypes = async (req: Request, res: Response) => {
    const allFoodTypes: string[] = await Food.distinct("type");

    res.status(200).json(allFoodTypes);
}