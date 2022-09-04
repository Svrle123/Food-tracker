import axios, { AxiosResponse } from 'axios';
import Api from './Api';

class FoodRouteService extends Api {
    constructor() {
        super('/foods');
    }

    getTypes = async (): Promise<string[]> => {
        const response: AxiosResponse = await axios.get(this.baseUrl + '/food-types')
        return response.data;
    }
}

const foodRouteService = new FoodRouteService();
type IFoodRouteService = typeof foodRouteService;

export {
    foodRouteService,
    type IFoodRouteService
}