import { Snackbar } from '@material-ui/core';

import Alert from './Alert';

const SnackBar = (props) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        props.setSnackbar({ open: false, message: '', severity: props.snackbar.severity });
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={props.snackbar.open}
            autoHideDuration={2000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={props.snackbar.severity}>
                {props.snackbar.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;
