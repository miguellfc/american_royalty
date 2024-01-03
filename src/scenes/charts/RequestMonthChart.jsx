import {useEffect, useState} from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const RequestMonthChart = () => {

    const [data, setData] = useState([]);

    const getData = async () => {
        const resultData = await fetch('http://localhost:3030/request/resume',{
            method: "GET"
        });
        const result = await resultData.json();

        setData(result);
    }

    useEffect(() => {
        getData();
    },[]);

    return (
        <>
            {
                data.length > 0 && (
                    <BarChart
                        xAxis={[{ scaleType: "band", data: [data[0].id, data[1].id, data[2].id, ] }]}
                        series={[
                            { data: [data[0].data.total, data[1].data.total, data[2].data.total], label: "Total", color: "#1C7293" },
                            { data: [data[0].data.canceled, data[1].data.canceled, data[2].data.canceled], label: "Canceladas", color: "#FF4343" },
                            { data: [data[0].data.finished, data[1].data.finished, data[2].data.finished], label: "Terminadas", color: "#4EA727" }
                        ]}
                        width={500}
                        height={300}
                    />
                )
            }
        </>
    )
}

export default RequestMonthChart;