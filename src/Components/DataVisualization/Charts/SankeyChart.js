import { useState, useEffect } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { FaFilter } from "react-icons/fa";
import { ResponsiveSankey } from '@nivo/sankey';
import moment from 'moment';

import Filters from '../Filters';
import { formatSankeyData } from '../../../utils/formatData/sankey';

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

const SankeyChart = (props) => {
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
        const formatData = formatSankeyData(filteredRawData);
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
                                {
                                    data.formated && data.formated.links.length > 0 && data.formated.nodes.length
                                        ?   <ResponsiveSankey
                                                data={data.formated}
                                                margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
                                                align="justify"
                                                linkBlendMode="color-dodge"
                                                colors={{ scheme: 'paired' }}
                                                nodeOpacity={1}
                                                nodeHoverOthersOpacity={0.35}
                                                nodeThickness={18}
                                                nodeSpacing={24}
                                                nodeBorderWidth={0}
                                                nodeBorderColor={{
                                                    from: 'color',
                                                    modifiers: [
                                                        [
                                                            'darker',
                                                            0.8
                                                        ]
                                                    ]
                                                }}
                                                nodeBorderRadius={3}
                                                linkOpacity={0.5}
                                                linkHoverOthersOpacity={0.1}
                                                linkContract={3}
                                                enableLinkGradient={true}
                                                labelPosition="outside"
                                                labelOrientation="vertical"
                                                labelPadding={16}
                                                labelTextColor={{
                                                    from: 'color',
                                                    modifiers: [
                                                        [
                                                            'darker',
                                                            1
                                                        ]
                                                    ]
                                                }}
                                                legends={[
                                                    {
                                                        anchor: 'bottom-right',
                                                        direction: 'column',
                                                        translateX: 130,
                                                        itemWidth: 100,
                                                        itemHeight: 14,
                                                        itemDirection: 'right-to-left',
                                                        itemsSpacing: 2,
                                                        itemTextColor: '#999',
                                                        symbolSize: 14,
                                                        effects: [
                                                            {
                                                                on: 'hover',
                                                                style: {
                                                                    itemTextColor: '#fff'
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]}
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

export default SankeyChart;