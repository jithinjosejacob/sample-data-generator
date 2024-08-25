import errorCode from "../config/errorCode";
import { getTerminalReport } from "../util/handleAuthentication";
import { handleSuccess, handleFail } from "../util/handleResponse";

export const getValidateEcommerceTransaction = async(ctx:{
    request?: any;
    status: number;
    body: string;
    error?: any;
}) => {
    const terminalReport = await getTerminalReport(
        'header',
        123,
    );

    try{
        handleSuccess(ctx,terminalReport);
    }
    catch(error){
        console.log(error.message)
        handleFail(ctx, Number(errorCode.SYSTEM_ERROR), 'System error')
    }
}