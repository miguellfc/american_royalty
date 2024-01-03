import {useEffect, useState} from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const WorkerChart = () => {

    const [data, setData] = useState([]);

    const totalWorkers = async () => {
        const resultTotal = await fetch(`http://localhost:3030/user/totals`,{
            method: "GET"
        });

        const result = await resultTotal.json();

        setData(result);
    }

    useEffect(() => {
        totalWorkers();
    }, []);

    const sizing = {
        // margin: { right: 100, left: 100},
        width: 400,
        height: 275
    };

    const TOTAL = data.length >= 1 && data.map((item) => item.value).reduce((prev, current) => prev + current, 0);

    const getArcLabel = (param) => {
        const percent = param.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };

    return (
        <PieChart
            series={[
                {
                    innerRadius: 50,
                    outerRadius: 100,
                    data,
                    arcLabel: getArcLabel,
                    paddingAngle: 3,
                    cornerRadius: 5
                }
            ]}
            slotProps={{
                legend: {
                    direction: 'column',
                    position: {
                        vertical: 'middle',
                        horizontal: 'right'
                    },
                    padding: -10,
                    itemMarkWidth: 20,
                    itemMarkHeight: 5,
                    markGap: 5,
                    itemGap: 10
                }
            }}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontSize: 14,
                }
            }}
            { ...sizing }
        />
    )
}

export default WorkerChart;