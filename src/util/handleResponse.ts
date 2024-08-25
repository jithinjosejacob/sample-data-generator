import _ from 'lodash';
import err_code from '../config/errorCode'

const handleSuccess = function(
    ctx:{ status?: number; body?: string| object },
    success: string | object,
) {
    ctx.status = 200;
    ctx.body = {
        data: success,
        message: 'success'
    }
}

const handleFail = (
    ctx: { status?: number; body?:string | object; error?: any},
    err_code: number,
    err_message: string
) => {
    ctx.status = 400;
    ctx.error = {
        code: 400,
        message: 'fail'
    }
}

const handleEmptyParams = function(ctx:any, params:{[x:string]: any }) {
    for(const key in params) {
        if(_.isUndefined(params[key])) {
            handleFail(ctx, err_code.MISSING_PARAMETERS, `need ${key} param`);
        }
    }
};

export { handleSuccess, handleFail, handleEmptyParams};