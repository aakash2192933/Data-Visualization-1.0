import { useEffect, useState } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { FaFilter } from "react-icons/fa";
import { ResponsiveLine } from '@nivo/line';
import moment from 'moment';

import Filters from '../Filters';
import { formatLineData } from '../../../utils/formatData/line';

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

const LineChart = (props) => {
    const classes = useStyles();

    const [data, setData] = useState(null);
    const [filters, setFilters] = useState();
    const [openFilters, setOpenFilters] = useState(false);

    const handleFiltersApplied = (updatedFilters) => {
        const filteredRawData = [];
        data.raw.slice(0, updatedFilters.rowLimit).forEach((dt) => {
            if (dt.date >= moment(updatedFilters.startDate) && dt.date <= moment(updatedFilters.endDate)) {
                filteredRawData.push(dt);
            } 
        });
        const formatData = formatLineData(filteredRawData);
        setData({ ...data, formated: formatData });
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
                                <ResponsiveLine 
                                        data={data.formated}
                                        colors={{scheme: 'paired'}}
                                        theme={{"textColor": "#fff"}}
                                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                                        xScale={{ type: 'point' }}
                                        yScale={{
                                            type: 'linear',
                                            min: 'auto',
                                            max: 'auto',
                                            stacked: true,
                                            reverse: false
                                        }}
                                        yFormat=" >-.2f"
                                        axisTop={null}
                                        axisRight={null}
                                        axisBottom={{
                                            orient: 'bottom',
                                            tickSize: 5,
                                            tickPadding: 5,
                                            tickRotation: 0,
                                            legend: 'x-axis',
                                            legendOffset: 36,
                                            legendPosition: 'middle',
                                        }}
                                        axisLeft={{
                                            orient: 'left',
                                            tickSize: 5,
                                            tickPadding: 5,
                                            tickRotation: 0,
                                            legend: 'y-axis',
                                            legendOffset: -40,
                                            legendPosition: 'middle'
                                        }}
                                        pointSize={10}
                                        pointColor={{ theme: 'background' }}
                                        pointBorderWidth={2}
                                        pointBorderColor={{ from: 'serieColor' }}
                                        pointLabelYOffset={-12}
                                        useMesh={true}
                                        legends={[
                                            {
                                                anchor: 'bottom-right',
                                                direction: 'column',
                                                justify: false,
                                                translateX: 100,
                                                translateY: 0,
                                                itemsSpacing: 0,
                                                itemDirection: 'left-to-right',
                                                itemWidth: 80,
                                                itemHeight: 20,
                                                itemOpacity: 0.75,
                                                symbolSize: 12,
                                                symbolShape: 'circle',
                                                symbolBorderColor: '#fff',
                                                effects: [
                                                    {
                                                        on: 'hover',
                                                        style: {
                                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                                            itemOpacity: 1
                                                        }
                                                    }
                                                ]
                                            }
                                        ]}
                                    />
                            </div>
                        </>
                    :   null
                }         
        </div>
    );
}

export default LineChart;