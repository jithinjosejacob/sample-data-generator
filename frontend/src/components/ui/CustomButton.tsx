import { styled, Button } from '@mui/material'

const CustomButton = styled(Button) (({theme})=> ({
    '&.MuiButton-containedPrimary':{
        color: 'white',
        backgroundColor: '#2196f3',
        '&:hover' :{
            backgroundColor: '#0d47a1',
        },
        '&.Mui-disabled':{
            backgroundColor: theme.palette.grey[500]
        },
    },
    '&.MuiButton-containedWarning':{
        color: 'black',
        backgroundColor: 'lightgreen',
        '&:hover' :{
            backgroundColor: 'darkgreen',
        },
        '&.Mui-disabled':{
            backgroundColor: theme.palette.grey[900]
        },
    },
}));

export default CustomButton;