import axios, { AxiosResponse } from 'axios';
import { IFoodLog } from '../interfaces';
import Api from './Api';

class FoodLogRouteService extends Api {
    constructor() {
        super('/food-logs');
    }

    async getTodayLogs(userId: string | undefined): Promise<IFoodLog[]> {
        const response: AxiosResponse<IFoodLog[]> = await axios.get<IFoodLog[]>(`${this.baseUrl}/today/${userId}`)
        return response.data;
    }
}

const foodLogRouteService = new FoodLogRouteService();
type IFoodLogRouteService = typeof foodLogRouteService;

export {
    foodLogRouteService,
    type IFoodLogRouteService
}