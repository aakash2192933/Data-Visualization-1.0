import { useState } from 'react';
import { useTheme } from '@material-ui/core';
import { BiLineChart } from 'react-icons/bi';
import { Icon } from '@iconify/react';

import { lineValidation } from '../../utils/schemaVerification/line';
import { sankeyValidation } from '../../utils/schemaVerification/sankey';
import { parallelCoordinatesValidation } from '../../utils/schemaVerification/parallelCoordinates';
import { formatLineData } from '../../utils/formatData/line';
import { formatSankeyData } from '../../utils/formatData/sankey';

import SideBar from "../../Components/DataVisualization/SideBar";
import Main from "../../Components/DataVisualization/Main";
import SnackBar from '../../Components/SnackBar/SnackBar';

const DataVisualization = () => {
    const theme = useTheme();

    const [open, setOpen] = useState(true);
    const [chartSelected, setChartSelected] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [charts, setCharts] = useState([
        {
            type: 'line',
            icon: <BiLineChart size={16} color={theme.palette.primary.text} />,
            title: "Line Chart",
            description: "A line chart is a graphical representation of an asset's historical price action that connects a series of data points with a continuous line.",
            data: null,
        },
        {
            type: 'sankey',
            icon: <Icon icon="mdi:chart-sankey" width={16} color={theme.palette.primary.text} />,
            title: "Sankey Chart",
            description: "A sankey diagram is a visualization used to depict a flow from one set of values to another.",
            data: null,
        },
        {
            type: 'parallel-coordinates',
            icon: <Icon icon="carbon:chart-parallel" width={16} color={theme.palette.primary.text} />,
            title: "Parallel Coordinates Chart",
            description: "Parallel coordinates is a visualization technique used to plot individual data elements across many performance measures.",
            data: null,
        },
    ]);

    const handleChartChange = (index) => {
        setChartSelected(index);
    }

    const updateChartData = (fileName, formated, raw, i) => {
        const newCharts = [ ...charts ];
        newCharts[i].data = { formated, raw, fileName };
        setCharts(newCharts);
    }

    const handleFileValidationError = () => {
        setSnackbar({
            open: true,
            message: 'File is not in valid format.',
            severity: 'error',
        });
    }

    const handleFileUpload = (e, chartType, i) => {
        if (e.target.files[0]) {
            if (chartType === 'line') {
                lineValidation(e.target.files[0], (data, error) => {
                    if (error) {
                        handleFileValidationError(error);
                    } else {
                        const chartData = formatLineData(data);
                        updateChartData(e.target.files[0].name, chartData, data, i);
                    }
                    e.target.value = '';
                });
            } else if (chartType === 'sankey') {
                sankeyValidation(e.target.files[0], (data, error) => {
                    if (error) {
                        handleFileValidationError(error);
                    } else {
                        const chartData = formatSankeyData(data);
                        updateChartData(e.target.files[0].name, chartData, data, i);
                    }
                    e.target.value = '';
                });
            } else if (chartType === 'parallel-coordinates') {
                parallelCoordinatesValidation(e.target.files[0], (data, error) => {
                    if (error) {
                        handleFileValidationError(error);
                    } else {
                        updateChartData(e.target.files[0].name, data, data, i);
                    }
                    e.target.value = '';
                });
            }
        }
    }

    return (
        <>
            <SideBar
                open={open}
                charts={charts}
                chartSelected={chartSelected}
                handleChartChange={handleChartChange}
            />

            <Main
                open={open}
                setOpen={setOpen}
                charts={charts}
                chartSelected={chartSelected}
                handleFileUpload={handleFileUpload}
            />

            <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
        </>
    );
}

export default DataVisualization;