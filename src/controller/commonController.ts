import * as commonService from '../service/commonService'

export const ready = async(ctx: { status: number; body:string}) => {
    commonService.ready(ctx)
}

export const alive = async(ctx: { status: number; body:string}) => {
    commonService.alive(ctx)
}