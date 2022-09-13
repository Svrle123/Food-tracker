import axios, { AxiosResponse } from 'axios';
import Api from './Api';

class FoodLogRouteService extends Api {
    constructor() {
        super('/food-logs');
    }
}

const foodLogRouteService = new FoodLogRouteService();
type IFoodLogRouteService = typeof foodLogRouteService;

export {
    foodLogRouteService,
    type IFoodLogRouteService
}