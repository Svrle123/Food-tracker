import axios, { AxiosResponse } from "axios";

export class Api {
    baseUrl: string = "http://localhost:4000" //while in development
    constructor(endpoint: string) {
        this.baseUrl += endpoint;
    }

    get = async <T>(): Promise<T> => {
        const response = await axios.get(this.baseUrl)
        return response.data;
    }

    post = async <T>(payload: T): Promise<T> => {
        const response: AxiosResponse = await axios.post(this.baseUrl, payload);
        return response.data;
    }
}