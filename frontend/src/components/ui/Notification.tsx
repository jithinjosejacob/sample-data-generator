import { Alert, Snackbar } from '@mui/material';

interface NotificationProps {
    notification: string | null;
    handleCloseNotification: () => void;
}

const Notification: React.FC<NotificationProps> = ({
    notification,
    handleCloseNotification,
}) => {
    return (
        <Snackbar
         open={!!notification}
         autoHideDuration={3000}
         onClose={handleCloseNotification}
         anchorOrigin={{vertical:'top', horizontal: 'right'}}
         >
            <Alert
             onClose={handleCloseNotification}
             severity={notification?.includes('Success')? 'success' : 'warning'}
             variant='filled'
             sx={{width: '100%'}}
            >
                {notification}
            </Alert>
         </Snackbar>
    );
};

export default Notification;