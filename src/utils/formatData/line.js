
export const formatLineData = (data) => {
    const chartData = [];
    const ids = [];

    data.forEach((dt) => {
        if (!ids.includes(dt.id)) {
            chartData.push({
                id: dt.id,
                data: [
                    {
                        x: dt.x,
                        y: dt.y,
                    }
                ],
            });

            ids.push(dt.id);
        } else {
            chartData.forEach((cd, index, thisArray) => {
                if (cd.id === dt.id) {
                    thisArray[index].data.push({
                        x: dt.x,
                        y: dt.y,
                    })
                }
            });
        }
    });

    return chartData;
}