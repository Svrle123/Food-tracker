import { Request, Response } from "express"
import { HydratedDocument } from "mongoose";
import { IFoodEntry, IFoodLog } from "../interfaces";
import { createEntries } from "./foodEntryController";
import FoodLog from "../models/foodLog";

interface RequestBody {
    entries: IFoodEntry[],
    userId: string
}

export const createFoodLog = async (req: Request, res: Response): Promise<void> => {
    const { entries, userId }: RequestBody = req.body;

    try {
        const logEntriesIds = await createEntries(entries);
        const newFoodLog: HydratedDocument<IFoodLog> = new FoodLog<IFoodLog>({
            timeStamp: new Date(),
            user: userId,
            foodEntries: logEntriesIds,
        });

        newFoodLog.save();

        res.status(201).json(newFoodLog);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getTodaysLogs = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const endOfDay = new Date().setHours(23, 59, 59, 999);
    try {
        const todayLogs = await FoodLog.find<IFoodLog[]>({ "user": userId, "timeStamp": { "$gte": startOfDay, "$lt": endOfDay } })
            .populate('user')
            .populate('foodEntries')
            .populate({
                path: 'foodEntries',
                populate: {
                    path: "food"
                }
            })

        res.status(200).json(todayLogs);
    } catch (error) {
        res.status(500).json(error)
    }
};