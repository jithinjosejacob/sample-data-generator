import errorCode from '../config/errorCode';
import { handleFail, handleSuccess } from '../util/handleResponse';

export const ready = async(ctx: { status: number; body:string}) => {
    try{
        handleSuccess(ctx,'healthy');
    }
    catch(error){
        console.log(error.message)
        handleFail(ctx, Number(errorCode.SYSTEM_ERROR), 'System error')
    }
}

export const alive = async(ctx: { status: number; body:string}) => {
   try{
        handleSuccess(ctx, 'healthy');
    }
    catch(error){
        console.log(error.message)
        handleFail(ctx, Number(errorCode.SYSTEM_ERROR), 'System error')
    }
}