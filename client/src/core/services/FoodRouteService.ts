import axios, { AxiosResponse } from 'axios';
import { Api } from './Api';

class FoodRouteService extends Api {
    constructor() {
        super('/foods');
    }

    getTypes = async (): Promise<string[]> => {
        const response: AxiosResponse = await axios.get(this.baseUrl + '/food-types')
        return response.data;
    }
}
export const foodRouteService = new FoodRouteService();
export type IFoodRouteService = typeof foodRouteService;