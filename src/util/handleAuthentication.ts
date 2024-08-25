import https from 'https';
import axios, {AxiosRequestConfig} from 'axios'
import { isoStartDate, isoEndDate } from './helper';


export const getTerminalReport = async (
    header: string,
    id: number
) => {

    const _httpAgent = new https.Agent({ rejectUnauthorized: false });

    const _configGetTerminalReport: AxiosRequestConfig = { 
        method: 'get',
        url: `https://api.example.com/reports/transactions?startDate=${isoStartDate}&endDate=${isoEndDate}`,
        headers: {
            'Content-Type': 'application/json'
        },
        httpsAgent: _httpAgent
    };
    try {
        const response = await axios(_configGetTerminalReport);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}