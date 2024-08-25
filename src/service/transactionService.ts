import https from 'https';
import axios, { AxiosRequestConfig } from 'axios';
import errorCode from "../config/errorCode";
import { handleFail, handleSuccess } from "../util/handleResponse";

export const getMerchants = async(ctx: { status?: number; body?: string }) => {
    try{
        const merchants = Object.values(['Optus','Telstra']).map((merchant) => {
            return merchant.split('.')[1]
        });
        handleSuccess(ctx,merchants);
    }
    catch(error){
        console.log(error.message)
        handleFail(ctx, Number(errorCode.SYSTEM_ERROR), 'System error')
    }
};

export const getEommerceTransaction = async (
    ctx: {
        request?: any,
        status?: number,
        body?: string,
        error?: any;
    },
    cardType: string,
) => {
    let _httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    })
    const _configPutTransaction: AxiosRequestConfig = {
        method: 'put',
        url: '/transaction',
        httpsAgent: _httpsAgent,
        data: {
            "cardType": cardType
        }

    }
    try {
        const response = await axios(_configPutTransaction);
        response.data.result === 'SUCCESS'
            ? handleSuccess(ctx,response.data)
            : handleFail(ctx, Number(errorCode.SYSTEM_ERROR), 'System error');
    } catch (error) {
        console.log(error.message);
        handleFail(ctx, Number(errorCode.SYSTEM_ERROR), 'System error');
    }
};