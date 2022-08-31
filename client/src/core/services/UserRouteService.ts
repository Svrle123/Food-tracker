import axios from 'axios';
import { Api } from './Api';
import { IUser } from '../interfaces/IUser';
import { ISignInData } from '../../pages/user-form/interfaces/ISignInData';

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

export const userRouteService = new UserRouteService();
export type IUserRouteService = typeof userRouteService;