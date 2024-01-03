import {Box, Paper, Typography} from "@mui/material";
import {DoneAll, HistoryToggleOff} from "@mui/icons-material";
import {useEffect, useState} from "react";

const WorkerRank = ({type = 'finished'}) => {

    const [data, setData] = useState(null);

    const getWaiter = async () => {
        const resultWaiter = await fetch(`http://localhost:3030/user/waiter`,{
            method: "GET"
        });

        const result = await resultWaiter.json();

        setData(result);
    }

    const getFinisher = async () => {
        const resultFinisher = await fetch(`http://localhost:3030/user/finisher`,{
            method: "GET"
        });

        const result = await resultFinisher.json();

        setData(result);
    }

    useEffect(() => {
        type === 'finished'
            ? getFinisher()
            : getWaiter()
    }, []);

    return (
        <>
            <Paper
                sx={{
                    backgroundColor: type === 'finished' ? "#FFBF00" : "#CD7F32",
                    width: 350,
                    height: 300,
                    borderRadius: 1
                }}
                elevation={5}
            >
                {
                    data && (
                        <>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <Box sx={{width: "60%", pl: 2, pt: 5}}>
                                    <Typography variant="h4">
                                        {`${data.nombre} ${data.apellido}`}
                                    </Typography>
                                    <Typography variant="h5">
                                        {data.email}
                                    </Typography>
                                </Box>
                                <Box sx={{p: 3}}>
                                    {
                                        type === 'finished'
                                            ? <DoneAll sx={{ fontSize: 60 }}/>
                                            : <HistoryToggleOff sx={{ fontSize: 60 }}/>
                                }
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="h1" sx={{p: 4, fontSize: 50}}>
                                    {data.value}
                                </Typography>
                            </Box>
                        </>
                    )
                }
            </Paper>
        </>
    );
}

export default WorkerRank;