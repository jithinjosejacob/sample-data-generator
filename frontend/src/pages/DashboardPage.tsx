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
} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import HelpIcon from '@mui/icons-material/help'
import DataGenerator from '../components/sections/DataGenerator'
import Row from '../interfaces/Row'
import ArtisticTypography from '../components/ui/ArtisticTypography'
import CustomButton from '../components/ui/CustomButton'
import { ApiResponse } from '../utils/api'; // Add this import statement.
import Notification from '../components/ui/Notification'

const DashboardPage = () => {
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState<Row[]>(
        localStorage.getItem('rows')
        ? JSON.parse(localStorage.getItem('rows')!)
        :[
            { type: 'VISA', receipt: '', stan: '', healthCheckStatus: false },
            {
                type: 'MASTERCARD',
                receipt: '',
                stan: '',
                healthCheckStatus: false,
            },
            { type: 'EPAL', receipt: '', stan: '', healthCheckStatus: false },
            { type: 'AMEX', receipt: '', stan: '', healthCheckStatus: false },
            { type: 'JCB', receipt: '', stan: '', healthCheckStatus: false },
        ],
    );
    const [generatedReceipt, setGeneratedReceipt] = useState<string[]>(
        localStorage.getItem('generatedReceipt')
            ? JSON.parse(localStorage.getItem('generatedReceipt')!)
            : [],
    );
    const [generatedStan, setGeneratedStan] = useState<string[]>(
        localStorage.getItem('generatedStan')
            ? JSON.parse(localStorage.getItem('generatedStan')!)
            : [],
    );
    const [merchants, setMerchants] = useState<string[]>([]);
        const[selectedMerchant, setSelectedMerchant]=useState<string>(
            localStorage.getItem('selectedMerchant') || '',
    );

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [notification, setNotification] = useState<string | null>(null);
    const[isBulkgGenerateDisabled, setIsBulkGenerateDisabled] =
        useState<boolean>(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false)
    const handleCloseNotification = () => setNotification(null);

    useEffect(()=>{
        const savedRows = localStorage.getItem('rows')
        const savedGeneratedReceipt = localStorage.getItem('generatedReceipt')
        const savedGeneratedStan = localStorage.getItem('generatedStan')
        const savedMerchant = localStorage.getItem('selectedMerchant')

        if(savedRows) setRows(JSON.parse(savedRows));
        if(savedGeneratedReceipt)
            setGeneratedReceipt(JSON.parse(savedGeneratedReceipt));
        if(savedGeneratedStan) setGeneratedStan(JSON.parse(savedGeneratedStan))
        if(savedMerchant) setSelectedMerchant(savedMerchant);
    }, []);

    useEffect(() => {
        localStorage.setItem('rows',JSON.stringify(rows))
        localStorage.setItem('generatedReceipt',JSON.stringify(generatedReceipt))
        localStorage.setItem('generatedStan',JSON.stringify(generatedStan))
        localStorage.setItem('selectedMerchant',selectedMerchant)
    },[rows, generatedReceipt, generatedStan, selectedMerchant]);

    useEffect(()=>{
        const fetchMerchant = async () => {
            const response: ApiResponse = await apiRequest('GET', '/merchants');
            if(response.ok) setMerchants(response.data)
        };

    fetchMerchant();
    }, []);

    const handleReset = () => {
        setRows([
            { type: 'VISA', receipt : '', stan: '', healthCheckStatus: false},
            { type: 'MASTERCARD', receipt : '', stan: '', healthCheckStatus: false},
            { type: 'EPAL', receipt : '', stan: '', healthCheckStatus: false},
            { type: 'AMEX', receipt : '', stan: '', healthCheckStatus: false},
            { type: 'JCB', receipt : '', stan: '', healthCheckStatus: false}
        ]);
        setGeneratedReceipt([]);
        setGeneratedStan([]);

        localStorage.removeItem('generatedReceipt');
        localStorage.removeItem('generatedStan');
    };

    const handleGenerate = async () => {
        setLoading(true);
        setIsBulkGenerateDisabled(true);
        setNotification(`Bulk Generate Disabled for 5 seconds`)
        try {
            const updatedRows = await Promise.all(
                rows.map((row) =>
                    fetchData(`/transaction/e-commerce/${row.type.toLowerCase()}`, row),
                ),
            );
            setRows(updatedRows)
            setGeneratedReceipt(updatedRows.map((row) => row.receipt));
            setGeneratedStan(updatedRows.map((row) => row.stan));
        } finally {
            setLoading(false)
            setTimeout(() => {
                setIsBulkGenerateDisabled(false);
            }, 8000);
        }
    };

    const handleGenerateByType = async(type: string) => {
        setLoading(true)

        const row = rows.find((row) => row.type === type);
        if(row){
            try{
                const updatedRow = await fetchData(
                    `/transaction/e-commerce/${type.toLowerCase()}`,
                    row,
                );
                const updatedRows = rows.map((r) => (r.type === type? updatedRow: r));
                setRows(updatedRows);
                setGeneratedReceipt(updatedRows.map((row => row.receipt)))
                setGeneratedStan(updatedRows.map((row => row.stan)))
            } finally{
                setLoading(false)
            }
        }
    }

    const fetchData = async(endpoint: string, row: Row) : Promise<Row> => {
        try {
            const response = await apiRequest('POST', endpoint, {
                merchantISV: selectedMerchant,
            });
            if(response.ok) {
                setNotification(
                    `Success: ${row.type} Transaction generated for Merchant ${selectedMerchant}`,
                );
                return {
                    ...row,
                    receipt: response.data.transaction.receipt,
                    stan: response.data.transaction.stan,
                };
            } else {
                setNotification(
                    `Failed: ${row.type} Transaction Generated for Merchant ${selectedMerchant}`
                );
                return row;
            }
        } catch(error) {
            setNotification(
                `Failed: ${row.type} Transaction Generated for Merchant ${selectedMerchant}`
            );
            return row;
        }
    }

    const handleCopyToClipBoard = (value :string) => 
        navigator.clipboard.writeText(value)
    
    const updateRowHealthCheckStatus = (rrn: string, status: boolean) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.receipt === rrn ? { ...row , healthCheckStatus: status} : row,
            ),
        );
    };

    return (
        <Container>
            <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open ={loading}
            >
                <CircularProgress color="primary" size={65} />
            </Backdrop>
            <Notification
                notification={notification}
                handleCloseNotification={handleCloseNotification}
            />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <ArtisticTypography variant="h1" gutterBottom marginY={2}>
                    Data Generator Tool
                </ArtisticTypography>
            </Box>
            <Grid item sx = {{ display: 'flex', justifyContent: 'space-between'}}>
                <Grid container>
                    <ArtisticTypography variant="h6" gutterBottom sx={{ mt:1.2 , mr: 1}}>
                        TargetMerchant
                    </ArtisticTypography>
                    <FormControl
                        sx={{m: 1, minWidth: 120 }}
                        size= "small"
                        variant="standard"
                        required
                    >
                        <Select
                            value={selectedMerchant}
                            onChange={(e) => setSelectedMerchant(e.target.value)}
                            defaultValue=""
                        >
                            {merchants.map((merchant) =>(
                                <MenuItem key={merchant} value={merchant}>
                                    {merchant}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <ArtisticTypography variant="h6" gutterBottom sx={{ mt: 1.2, mr: 1}}>
                        Environment : Staging
                    </ArtisticTypography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <DataGenerator
                    rows={rows}
                    generatedReceipt={generatedReceipt}
                    generatedStan={generatedStan}
                    handleCopyToClipboard={handleCopyToClipBoard}
                    handleGenerateByType={handleGenerateByType}
                    updateRowHealthCheckStatus={updateRowHealthCheckStatus}
                    merchantISV={selectedMerchant}
                />
                <Grid item xs={12} style={{ textAlign: 'right'}}>
                    <CustomButton
                        variant="contained"
                        onClick={handleGenerate}
                        disabled={isBulkgGenerateDisabled}
                        startIcon={<AutoFixHighIcon/>}
                        sx={{ mr:2 }}
                    >
                        Bulk Generate
                    </CustomButton>
                    <CustomButton
                        variant="contained"
                        color="warning"
                        onClick={handleReset}
                        startIcon={<AutorenewIcon/>}
                    >
                        Reset All
                    </CustomButton>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{ textAlign: 'left'}}
                    sx={{ mt: -6.5, ml: -2}}
                >
                    <CustomButton
                        color="warning"
                        variant="contained"
                        onClick={handleOpen}
                        startIcon={<HelpIcon/>}
                    >
                        Info
                    </CustomButton>
                </Grid>
                <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        <ArtisticTypography variant="h6" gutterBottom>
                           Instructions;
                        </ArtisticTypography>
                    </DialogTitle>
                    <DialogContent>
                        <ArtisticTypography variant="body1" gutterBottom>
                           1. Click on Generate button
                        </ArtisticTypography>
                    </DialogContent>
                    <DialogContent>
                        <ArtisticTypography variant="body1" gutterBottom>
                           1. Click on Save
                        </ArtisticTypography>
                    </DialogContent>
                    <DialogActions>
                        <CustomButton
                            onClick={handleClose}
                            color="primary"
                            variant="contained"
                            >
                                Close
                            </CustomButton>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Box mt={4} mb={4}>
                {/* Add bottom margin */}
            </Box>
        </Container>
    );
}

export default DashboardPage;