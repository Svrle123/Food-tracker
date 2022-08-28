import axios from "axios";

export class Api {
    baseUrl: string = "http://localhost:4000" //while in development
    constructor(endpoint: string) {
        this.baseUrl += endpoint;
    }

    get = async (): Promise<object> => {
        const response = await axios.get(this.baseUrl)
        return response.data;
    }

    post = async (payload: object): Promise<object> => {
        const response = await axios.post(this.baseUrl, payload);
        return response.data;
    }
}