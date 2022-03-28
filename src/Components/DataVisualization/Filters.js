import { useEffect, useState } from 'react';
import { Button, Dialog, IconButton, makeStyles, TextField, Typography } from "@material-ui/core";
import { IoMdClose } from 'react-icons/io';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
    },
    head: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        // borderBottom: '1px solid #fff',
        background: theme.palette.secondary.main
    },
    body: {
        padding: '8px 12px',
        background: theme.palette.primary.card
    },
    iconButton: {
        border: '1px solid #fff',
        borderRadius: 4,
        padding: 4,
    },
    input: {
        margin: '12px 0px',
    },
    bottom: {
        padding: '8px 12px',
        background: theme.palette.secondary.main,
    },
    labelText: {
        fontSize: 12
    }
}))

const Filters = (props) => {
    const classes = useStyles();

    const [startDate, setStartDate] = useState('2017-05-20');
    const [endDate, setEndDate] = useState('2017-05-24');
    const [rowLimit, setRowLimit] = useState(0);

    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);
    const [rowLimitError, setRowLimitError] = useState(false);

    useEffect(() => {
        if (props.filters) {
            setStartDate(moment(props.filters.startDate).format('YYYY-MM-DD'));
            setEndDate(moment(props.filters.endDate).format('YYYY-MM-DD'));
            setRowLimit(props.filters.rowLimit);
        }
    }, [props.filters]);

    const validateForm = () => {
        let isValid = true;

        if (!moment(startDate, 'YYYY-MM-DD').isValid()) {
            setStartDateError(true);
            isValid = false;
        }

        if (!moment(endDate, 'YYYY-MM-DD').isValid()) {
            setEndDateError(true);
            isValid = false;
        }

        if (rowLimit < 1) {
            setRowLimitError(true);
            isValid = false;
        }

        return isValid;
    }

    const handleApplyFilters = () => {
        if (validateForm()) {
            props.onApplyFilters({
                startDate,
                endDate,
                rowLimit,
            });
            props.onClose();
        }
    }

    return (
        <Dialog
            open={props.open} 
            onClose={props.onClose}
        >
            <div className={classes.root}>
                <div className={classes.head}>
                    <Typography>
                        Filters
                    </Typography>
                    <IconButton className={classes.iconButton} onClick={props.onClose}>
                        <IoMdClose />
                    </IconButton>
                </div>
                <div className={classes.body}>
                    <div className={classes.input}>
                        <Typography className={classes.labelText}>Start Date</Typography>
                        <TextField
                            id="date"
                            size="small"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                if (moment(e.target.value, 'YYYY-MM-DD').isValid()) {
                                    setStartDateError(false);
                                }
                            }}
                            error={startDateError}
                            helperText={startDateError ? 'Invalid date.' : ''}
                        />
                    </div>

                    <div className={classes.input}>
                        <Typography className={classes.labelText}>End Date</Typography>
                        <TextField
                            id="date"
                            size="small"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                                if (moment(e.target.value, 'YYYY-MM-DD').isValid()) {
                                    setEndDateError(false);
                                }
                            }}
                            error={endDateError}
                            helperText={endDateError ? 'Invalid date.' : ''}
                        />
                    </div>

                    <div className={classes.input}>
                        <Typography className={classes.labelText}>Row Limit</Typography>
                        <TextField 
                            size="small"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={rowLimit}
                            onChange={(e) => {
                                setRowLimit(e.target.value);
                                if (e.target.value > 0) {
                                    setRowLimitError(false);
                                }
                            }}
                            error={rowLimitError}
                            helperText={rowLimitError ? 'Row limit should be greater than 1.' : ''}
                        />
                    </div>
                </div>
                <div className={classes.bottom} onClick={handleApplyFilters}>
                    <Button
                        variant="outlined"
                        fullWidth
                    >
                        Apply Filters
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default Filters;