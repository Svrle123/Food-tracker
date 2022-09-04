import axios from 'axios';
import Api from './Api';
import { IUser, ISignInData } from '../interfaces';

class UserRouteService extends Api {
    constructor() {
        super('/users');
    }

    signIn = async (payload: ISignInData): Promise<IUser> => {
        const { data } = await axios.post<IUser>(`${this.baseUrl}/sign-in`, payload);
        return data;
    }

    signUp = async (payload: IUser): Promise<void> => {
        await axios.post<IUser>(`${this.baseUrl}/sign-up`, payload);
    }
}

const userRouteService = new UserRouteService();
type IUserRouteService = typeof userRouteService;

export {
    userRouteService,
    type IUserRouteService,
}