import axios, { AxiosResponse, Method } from 'axios';
import { baseUrl } from '../config';

export interface ApiResponse {
    ok: boolean;
    error?: string;
    [key: string]: any;
}

const apiRequest = async (
    method: Method,
    path: string,
    data: object | null = null,
    token: string | null = null,
): Promise<ApiResponse> => {
    // Setup the axios instance with default options
    const instance = axios.create({
        baseURL: baseUrl,
        headers:{
            'Content-Type': 'application/json'
        },
    });

    // Add interceptors to handle errors
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if(!error.response){
                error.response = {
                    data: {
                        ok:false,
                        error:
                        'Could not connect to server. Is your internet connection ok'
                    }
                };
            }
            return Promise.reject(error)
        },
    );
    try {
        const response: AxiosResponse = await instance({
            method,
            url: path,
            data,
        });

        return {
            ok: true,
            data: response.data,
        };
    } catch(error: unknown) {
        console.error(error);
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            console.error(error);
            return {
                ok: false,
                error: 'An unknown error occured',
            };
        }
    }
};

export default apiRequest;