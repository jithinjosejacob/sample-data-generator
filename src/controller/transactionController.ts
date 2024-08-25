import * as transactionService from '../service/transactionService';

export const getMerchants = async(ctx: { status: number; body:string}) => {
    transactionService.getMerchants(ctx)
}

export const getEommerceTransactionVisa = async ( ctx: {
    status: number;
    body: string;
}) => {
    await transactionService.getEommerceTransaction(ctx, 'visa')
};


export const getEommerceTransactionMasterCard = async ( ctx: {
    status: number;
    body: string;
}) => {
    await transactionService.getEommerceTransaction(ctx, 'mc')
};


export const getEommerceTransactionEpal = async ( ctx: {
    status: number;
    body: string;
}) => {
    await transactionService.getEommerceTransaction(ctx, 'epal')
};

export const getEommerceTransactionJcb = async ( ctx: {
    status: number;
    body: string;
}) => {
    await transactionService.getEommerceTransaction(ctx, 'jcb')
};