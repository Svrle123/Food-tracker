import axios from "axios";
import { Api } from "./Api";
import { IUser } from "../interfaces/IUser";
import type { SignInData } from "../../pages/user-form/components/SignInForm"

class UserRouteService extends Api {
    constructor() {
        super("/users");
    }

    signIn = async (payload: SignInData) => {
        const { data } = await axios.post<IUser>(`${this.baseUrl}/sign-in`, payload);
        return data;
    }
}

export const userRouteService = new UserRouteService();
export type RouteService = typeof userRouteService;