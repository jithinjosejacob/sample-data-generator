const order  = {
    amount: {
        default: 1000,
    },
    currency:{
        aud: 'AUD',
        usd: 'USD'
    },
};

const sourceOfFunds = {
    type: {
        default: 'CARD'
    },
};

export { order, sourceOfFunds}