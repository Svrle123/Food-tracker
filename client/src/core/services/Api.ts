import axios, { AxiosResponse } from "axios";
import uritemplate from 'uritemplate';
import { IQueryParams } from "../interfaces";

export class Api {
    baseUrl: string = "http://localhost:4000" //while in development
    constructor(endpoint: string) {
        this.baseUrl += endpoint;
    }

    get = async (params: IQueryParams) => {
        const response = await axios.get(uritemplate.parse(this.baseUrl + `/{?searchQuery,type,page,rpp}`).expand(params));
        return response.data;
    }

    post = async <T>(payload: T): Promise<AxiosResponse> => {
        const response: AxiosResponse = await axios.post(this.baseUrl, payload);
        return response.data;
    }
}

