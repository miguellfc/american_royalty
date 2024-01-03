import {Paper, Typography, useTheme, Box } from "@mui/material";

const BestService = ({ service, color, height}) => {

    const theme = useTheme();
    const { nombre_servicio, sum } = service;

    return (
        <Paper
            elevation={5}
            sx={{
                backgroundColor: theme.palette.mode !== 'dark' ? '#FFFFFF' : '#111111',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'end',
                alignItems: "center",
                width: "100%",
                height: height,
                my: .3,
                px: 2
            }}
        >
            <Box sx={{ width: "80%"}}>
                <Typography>
                    {nombre_servicio}
                </Typography>
            </Box>
            <Box>
                <Typography sx={{ fontSize: 18, color: `${color}`, fontWeight: "bold"}} >
                    ${sum}
                </Typography>
            </Box>
        </Paper>
    )
}

export default BestService;