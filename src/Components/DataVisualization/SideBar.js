import { Typography, Drawer, Grow, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { RiBubbleChartFill } from 'react-icons/ri';
import clsx from 'clsx';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    typography: {
        color: theme.palette.primary.text,
    },
    description: {
        color: theme.palette.primary.text,
        fontSize: 12
    },
    card: {
        background: theme.palette.primary.card,
        padding: 12,
        margin: '8px 0px',
        borderRadius: 12,
        "&:hover": {
            cursor: 'pointer',
        }
    },
    cardClose: {
        margin: '8px 0px',
    },
    selectedCard: {
        border: '1px solid #1E88E5',
    },
    iconCard: {
        borderRadius: 12,
        padding: 8,
        background: theme.palette.secondary.main,
        marginRight: 8,
        "&:hover": {
            cursor: 'pointer',
        }
    },
    drawerOpen: {
        background: theme.palette.primary.main,
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        background: theme.palette.primary.main,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
}))

const SideBar = (props) => {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: props.open,
                [classes.drawerClose]: !props.open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                }),
            }}
        >
            <div style={{padding: 16}}>
                <div style={{textAlign: 'center'}}>
                    <Typography className={classes.typography}>
                        <RiBubbleChartFill style={{marginRight: 8}} />
                        {
                            props.open
                                ?   <Grow
                                        in={props.open}
                                        style={{ transformOrigin: '0 0 0' }}
                                        {...(props.open ? { timeout: 2000 } : {})}
                                    >
                                        <span className={classes.textFadeIn}>DATA VISUALIZATION</span>
                                    </Grow>
                                :   null
                        }
                    </Typography>
                </div>
                <div style={{marginTop: 32}}>
                    {
                        props.charts.map((data, i) => (
                            <div className={
                                props.open 
                                        ? (i === props.chartSelected ? clsx(classes.card, classes.selectedCard) : classes.card) 
                                        : classes.cardClose
                                } 
                                key={i}
                                onClick={() => props.handleChartChange(i)}
                            >
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div className={!props.open && i === props.chartSelected ? clsx(classes.iconCard, classes.selectedCard) : classes.iconCard}>
                                        {data.icon}
                                    </div>
                                    {
                                        props.open
                                            ?   <Grow
                                                    in={props.open}
                                                    style={{ transformOrigin: '0 0 0' }}
                                                    {...(props.open ? { timeout: 2000 } : {})}
                                                >
                                                    <Typography className={classes.typography}>
                                                        {data.title}
                                                    </Typography>
                                                </Grow>
                                            :   null
                                    }
                                </div>
                                {
                                    props.open
                                        ?   <Zoom
                                                in={props.open}
                                                style={{ transformOrigin: '0 0 0' }}
                                                {...(props.open ? { timeout: 1000 } : {})}
                                            >
                                                <div style={{marginTop: 8}}>
                                                    <Typography className={classes.description}>
                                                        {data.description}
                                                    </Typography>
                                                </div>
                                            </Zoom>
                                        :   null
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </Drawer>
    );
}

export default SideBar;