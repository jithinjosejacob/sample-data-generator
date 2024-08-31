import React, { useEffect, useState } from 'react';
import { green } from '@mui/material/colors'
import LoadingButton from '@mui/lab/LoadingButton';
import CheckCircleicon from '@mui/icons-material/CheckCircle'
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import apiRequest from '../../utils/api';
import Notification from './Notification';

interface HealthCheckStatusProps {
    rrn: string,
    stan: string,
    healthCheckStatus: boolean,
    updateRowHealthCheckStatus: ( rrn: string, status: boolean) => void;
    merchantISV: string;
}

const HealthCheckStatus: React.FC<HealthCheckStatusProps> = ({
    rrn,
    stan,
    healthCheckStatus,
    updateRowHealthCheckStatus,
    merchantISV,
}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(healthCheckStatus)
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        setSuccess(healthCheckStatus);
    }, [healthCheckStatus]);

    const handleCloseNotification = () => setNotification(null);

    const butttonSx = {
        ...(success && {
            bgColor: green[500],
            '&:hover': {
                bgColor: green[700]
            },
        }),
    };

    const fetchTerminalReport = async () => {
        setLoading(true);
        try {
            const response  = await apiRequest(
                'POST',
                '/validate/terminal-report-api/transaction/e-commerce',
                {
                    merchantISV,
                }
            );
            const terminalStans = 
                response?.data?.data?.map((item:any) => item.terminalStan) || [];
            const isSuccess = terminalStans.includes(Number(stan));

            setSuccess(isSuccess);
            setNotification(
                isSuccess
                    ? `Success: Stan ${stan} found for Merchant ${merchantISV}`
                    : `Failed: Stan ${stan} Not Found for Merchant ${merchantISV}`,
            );
            updateRowHealthCheckStatus(rrn, isSuccess)
            } catch(error){
                setSuccess(false)
                setNotification(`Error fetching terminal report: ${error}`)
            } finally {
                setLoading(false)
            }
        };

        return (
            <>
                <LoadingButton
                    startIcon={success ? <CheckCircleicon /> : <UnpublishedIcon/>}
                    variant="contained"
                    loadingPosition="start"
                    loading={loading}
                    sx={butttonSx}
                    disabled={loading || rrn === ''}
                    onClick={fetchTerminalReport}
                >
                    {success ? 'Success' : 'Check'}
                </LoadingButton>
                <Notification
                    notification={notification}
                    handleCloseNotification={handleCloseNotification}
                />
            </>
        );
}


export default HealthCheckStatus;