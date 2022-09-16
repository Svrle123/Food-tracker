import { Request, Response } from "express"
import { HydratedDocument } from "mongoose";
import { IFoodEntry, IFoodLog } from "../interfaces";
import { createEntries } from "./foodEntryController";
import FoodLog, { IFoodLogDocument } from "../models/foodLog";

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
        const todayLogs = await FoodLog.find<IFoodLogDocument>({ "user": userId, "timeStamp": { "$gte": startOfDay, "$lt": endOfDay } });
        const promises = todayLogs.map(async (log) => await log.getTotal());

        const logsWithTotal = await Promise.all(promises).then((result) => {
            return Object(result);
        });
        res.status(200).json(logsWithTotal);
    } catch (error) {
        res.status(500).json(error)
    }
};