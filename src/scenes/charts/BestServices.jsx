import {useEffect, useState} from "react";
import { Box } from "@mui/material";
import BestService from "../../components/BestService.jsx";

const BestServices = () => {

    const [data, setData] = useState(null);
    const colors = ["#11178C", "#1F83DD", "#CD7F32", "#4EA727", "#FFBF00"];

    const getData = async () => {
        const resultData = await fetch('http://localhost:3030/services/bests',{
            method: "GET"
        });
        const result = await resultData.json();

        setData(result);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "space-between",
                height: 300,
                p: 0
            }}
        >
            {
                data && data.map((service, index) => <BestService service={service} color={colors[index]} height={300/data.length}/>)
            }
        </Box>
    )
}

export default BestServices;