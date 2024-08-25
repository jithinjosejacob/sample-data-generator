import moment from 'moment-timezone';

export const isoStartDate = moment()
    .tz('Australia/Sydney')
    .format('YYYY-MM-DD') + 'T00:00:00.000Z';


export const isoEndDate = moment()
    .tz('Australia/Sydney')
    .format('YYYY-MM-DD') + 'T23:59:59.999Z';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));