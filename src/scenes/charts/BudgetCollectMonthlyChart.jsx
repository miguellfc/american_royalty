import {useEffect, useState} from "react";
import { LineChart } from "@mui/x-charts";

const BudgetCollectMonthlyChart = () => {

    const [data, setData] = useState(null);

    const getData = async () => {
        const resultData = await fetch('http://localhost:3030/request/budget',{
            method: "GET"
        });
        const result = await resultData.json();

        setData(result)
    }

    useEffect(() => {
        getData();
    },[]);

    return (
        <>
            {
                data && (
                    <LineChart
                        width={500}
                        height={300}
                        series={[
                            {
                                data: data.data.estimated,
                                label: 'Presupuesto estimado',
                                color: "#1C7293",
                            },
                            {
                                data: data.data.collect,
                                label: 'Presupuesto ganado',
                                color: "#4EA727",
                            },
                            {
                                data: data.data.canceled,
                                label: 'Presupuesto cancelado',
                                color: "#FF4343",
                            },
                        ]}
                        xAxis={[{ scaleType: 'point', data: data.id}]}
                    />
                )
            }
        </>
    );
}

export default BudgetCollectMonthlyChart;