import { Button, IconButton, makeStyles, Typography } from '@material-ui/core';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { MdUpload } from 'react-icons/md';
import clsx from 'clsx';

import LineChart from './Charts/LineChart';
import SankeyChart from './Charts/SankeyChart';
import ParallelCoordinatesChart from './Charts/ParallelCoordinatesChart';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    mainOpen: {
        paddingLeft: drawerWidth, 
        background: "#1A223F", 
        height: '100vh',
        transition: theme.transitions.create('padding', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    mainClose: {
        background: "#1A223F", 
        height: '100vh', 
        paddingLeft: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(9) + 1,
        },
        transition: theme.transitions.create('padding', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    iconButton: {
        background: theme.palette.primary.card,
        borderRadius: 8,
        padding: 8,
    },
    topBar: {
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    typography: {
        color: theme.palette.primary.text,
    },
    title: {
        textDecoration: 'underline',
        fontSize: 20
    },
}))

const Main = (props) => {
    const classes = useStyles();

    return (
        <div className={props.open ? classes.mainOpen : classes.mainClose}>
            <div className={classes.topBar}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <IconButton className={classes.iconButton} onClick={() => props.setOpen(!props.open)}>
                        {
                            props.open ? <AiOutlineMenuFold size={20} /> : <AiOutlineMenuUnfold size={20} />
                        }
                    </IconButton>
                    <Typography className={clsx(classes.typography, classes.title)} style={{marginLeft: 12}}>
                        {props.charts[props.chartSelected].title}
                    </Typography>
                </div>
                <div>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="chart-file-upload"
                        accept=".csv, .json"
                        onChange={(e) => props.handleFileUpload(e, props.charts[props.chartSelected].type, props.chartSelected)}
                    />
                    <Button variant='outlined'>
                        <label htmlFor="chart-file-upload" style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                            Upload File <MdUpload style={{marginLeft: 8}} size={20} />
                        </label>
                    </Button>
                </div>
            </div>

            <div>
                {
                    props.charts[props.chartSelected].type === 'line'
                        ?   <LineChart 
                                chart={props.charts[props.chartSelected]}
                                chartSelected={props.chartSelected}
                            />
                        :   null
                }

                {
                    props.charts[props.chartSelected].type === 'sankey'
                        ?   <SankeyChart 
                                chart={props.charts[props.chartSelected]}
                                chartSelected={props.chartSelected}
                            />
                        :   null
                }

                {
                    props.charts[props.chartSelected].type === 'parallel-coordinates'
                        ?   <ParallelCoordinatesChart 
                                chart={props.charts[props.chartSelected]}
                                chartSelected={props.chartSelected}
                            />
                        :   null
                }
            </div>
        </div>
    );
}

export default Main;