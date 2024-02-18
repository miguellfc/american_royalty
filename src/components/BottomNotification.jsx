import {Alert, Snackbar} from "@mui/material";

const BottomNotification = ({ notificationMessage, typeNotification, openNotification, setOpenNotification }) => {

    const handleCloseNotification = (event, reason) => {
        if (reason === "clickaway")
            return;

        setOpenNotification({ _open: false });
    }

    return (
        <Snackbar
            open={openNotification}
            autoHideDuration={4000}
            onClose={handleCloseNotification}
        >
            <Alert
                onClose={handleCloseNotification}
                severity={typeNotification}
                sx={{ width: '100%' }}
                variant="filled"
            >
                {notificationMessage}
            </Alert>
        </Snackbar>
    )
}

export default BottomNotification;