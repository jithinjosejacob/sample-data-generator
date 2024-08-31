import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CustomButton from "../ui/CustomButton";
import ArtisticTypography from "../ui/ArtisticTypography";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import HealthCheckStatus from "../ui/HealthCheckStatus";

const DataGenerator = ({
    rows,
    generatedReceipt,
    generatedStan,
    handleCopyToClipboard,
    handleGenerateByType,
    updateRowHealthCheckStatus,
    merchantISV,
}: {
    rows: any[];
    generatedReceipt: any[];
    generatedStan: any[];
    handleCopyToClipboard: (value: string) => void;
    handleGenerateByType: (type: string) => void;
    updateRowHealthCheckStatus: (rrn: string, status: boolean) => void;
    merchantISV: string;
}) => {
    return (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            <ArtisticTypography>Card Type</ArtisticTypography>
                        </TableCell>
                        <TableCell align="center">
                            <ArtisticTypography>Receipt Number (RRN)</ArtisticTypography>
                        </TableCell>
                        <TableCell align="center">
                            <ArtisticTypography>Generate Transaction</ArtisticTypography>
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ borderRight: '1px solid #ccc' }}
                        ></TableCell>
                        <TableCell align="center">
                            <ArtisticTypography>
                                Health Check with Terminal Reporting API
                            </ArtisticTypography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align='center'>
                                <ArtisticTypography variant="h6" gutterBottom>
                                    {row.type}
                                </ArtisticTypography>
                            </TableCell>
                            <TableCell align='center'>
                                <TextField
                                    label={`${row.type} RRN` || 'RRN'}
                                    value={generatedReceipt[index] || ''}
                                    fullWidth
                                    disabled
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={()=>
                                        handleCopyToClipboard(generatedReceipt[index] || '')
                                    }
                                >
                                    <ContentCopyIcon color="action"/>
                                </IconButton>
                            </TableCell>
                            <TableCell align ='center'>
                                <CustomButton
                                    variant="contained"
                                    onClick={()=> handleGenerateByType(row.type)}
                                    startIcon={<AutoFixNormalIcon/>}
                                >
                                    Generate
                                </CustomButton>
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ borderRight: '1px solid #ccc'}}
                            ></TableCell>
                            <TableCell align='center'>
                                    <HealthCheckStatus
                                        rrn={generatedReceipt[index] || ''}
                                        stan={generatedStan[index] || ''}
                                        healthCheckStatus={row.healthCheckStatus}
                                        updateRowHealthCheckStatus={updateRowHealthCheckStatus}
                                        merchantISV={merchantISV}
                                    />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataGenerator;