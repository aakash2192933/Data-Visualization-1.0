import { useEffect, useState } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { FaFilter } from "react-icons/fa";
import { ResponsiveParallelCoordinates  } from '@nivo/parallel-coordinates'
import moment from 'moment';

import Filters from '../Filters';

const useStyles = makeStyles((theme) => ({
    chart: {
        background: theme.palette.primary.main,
        borderRadius: 12,
        margin: 16,
        height: '75vh',
    },
    chartTopBar: {
        background: theme.palette.primary.main,
        borderRadius: 12,
        padding: 12,
        margin: '16px 16px 0px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    typography: {
        color: theme.palette.primary.text,
    }
}))

const ParallelCoordinatesChart = (props) => {
    const classes = useStyles();

    const [data, setData] = useState(null);
    const [filters, setFilters] = useState();
    const [openFilters, setOpenFilters] = useState(false);

    const handleFiltersApplied = (updatedFilters) => {
        const filteredRawData = [];
        data.raw.slice(0, updatedFilters.rowLimit).forEach((dt) => {
            if (moment(dt.date) >= moment(updatedFilters.startDate) && moment(dt.date) <= moment(updatedFilters.endDate)) {
                filteredRawData.push(dt);
            } 
        });
        setData({ ...data, formated: filteredRawData });
        setFilters(updatedFilters);
    }

    const getMaxDate = (data) => {
        return new Date(
            Math.max(
              ...data.map((element) => {
                return new Date(element.date);
              }),
            ),
        );
    }

    const getMinDate = (data) => {
        return new Date(
            Math.min(
              ...data.map((element) => {
                return new Date(element.date);
              }),
            ),
        );
    }

    useEffect(() => {
        if (props.chart.data) {
            const maxDate = getMaxDate(props.chart.data.raw);
            const minDate = getMinDate(props.chart.data.raw);
            const maxRowLimit = props.chart.data.raw.length;
            setFilters({
                startDate: minDate,
                endDate: maxDate,
                rowLimit: maxRowLimit,
            });
            setData(props.chart.data);
        }
    }, [props.chart.data]);

    const getVariables = (data) => {
        const keys = Object.keys(data[0]);

        const variables = keys.map((key, i) => ({
            key: key,
            type: 'point',
            padding: 1,
            legend: key,
            legendPosition: 'start',
            legendOffset: -20
        }));

        return variables;
    }

    return (
        <div className={classes.root}>
            {
                data
                    ?   <>
                            <Filters 
                                open={openFilters}
                                onClose={() => setOpenFilters(false)}
                                filters={filters}
                                onApplyFilters={handleFiltersApplied}
                            />
                            <div className={classes.chartTopBar}>
                                <div>
                                    <Typography className={classes.typography}>
                                        File Name : {data.fileName}
                                    </Typography>
                                </div>
                                <div>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setOpenFilters(true)}
                                    >
                                        Filters <FaFilter style={{marginLeft: 8}} />
                                    </Button>
                                </div>
                            </div>
                            <div className={classes.chart}>
                            {
                                data.formated.length > 0
                                    ?   <ResponsiveParallelCoordinates
                                            data={data.formated}
                                            variables={getVariables(data.formated)}
                                            colors={{ scheme: 'paired' }}
                                            theme={{"textColor": "#fff"}}
                                            margin={{ top: 50, right: 120, bottom: 50, left: 60 }}
                                        />
                                    :   null
                            }
                            </div>
                        </>
                    :   null
                }         
        </div>
    );
}

export default ParallelCoordinatesChart;