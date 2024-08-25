import * as validaitonService from '../service/validationService';

export const getValidateEcommerceTransaction = async(ctx:{
    status: number;
    body: string;
}) => {
    await validaitonService.getValidateEcommerceTransaction(ctx)
}