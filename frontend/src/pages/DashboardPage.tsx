import React, { useState, useEffect} from "react";
import apiRequest from "../utils/api";
import {
    Container,
    Grid,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Backdrop,
    CircularProgress,
    Select,
    MenuItem,
    FormControl
} from '@mui/icons-material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import HelpIcon from '@mui/icons-material/help'
import DataGenerator from '../components/sections/DataGenerator'
import Row from '../interfaces/Row'
import ArtisticTypography from '../components/ui/ArtisticTypography'
import CustomButton from '../components/ui/CustomButton'
import { ApiResponse } from '../utils/api'
import Notification from '../components/ui/Notification'


const DashboardPage = () => {
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState<Row[]>{
        localStorage.getItem('rows')
        ? JSON.parse(localStorage.getItem('rows'))
        :[
            { type: 'VISA', receipt: '', stan: '', healthCheckStatus: false },
            {
                type: 'MASTERCARD',
                receipt: '',
                stan: '',
                healthCheckStatus: false,
            }
            { type: 'EPAL', receipt: '', stan: '', healthCheckStatus: false },
            { type: 'AMEX', receipt: '', stan: '', healthCheckStatus: false },
            { type: 'JCB', receipt: '', stan: '', healthCheckStatus: false },
            }
        ]
    };
}
export default DashboardPage;