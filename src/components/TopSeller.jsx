import {Avatar, Box, LinearProgress, linearProgressClasses, Paper, Tooltip, Typography, useTheme} from "@mui/material";
import {hexToRGBA, stringAvatar, stringToColor} from "../utils/functions.js";
import {useState} from "react";

const TopSeller = ({user, color, height}) => {

    const theme = useTheme();
    const { nombre, apellido, email, foto, sum } = user;

    return (
        <>
            <Paper
                elevation={5}
                sx={{
                    backgroundColor: theme.palette.mode !== 'dark' ? "#FFFFFF" : "#111111",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'space-around',
                    alignItems: "center",
                    width: "100%",
                    height: height,
                    my: .3
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "75%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography>
                            {`${nombre} ${apellido}`}
                        </Typography>
                        <Typography>
                            ${sum}
                        </Typography>
                    </Box>
                    <LinearProgress
                        sx={{
                            height: 8,
                            borderRadius: 5,
                            [`&.${linearProgressClasses.colorPrimary}`]: {
                                backgroundColor: hexToRGBA(`${color}`,0.2)
                            },
                            [`& .${linearProgressClasses.bar}`]: {
                                backgroundColor: `${color}`
                            }
                        }}
                        variant="determinate"
                        value={sum/100}
                    />
                </Box>
                <Box>
                    {
                        foto !== ''
                            ? <Avatar alt={`${nombre} ${apellido}`} src={`http://localhost:3030/assets/${foto}`} variant="rounded"/>
                            : <Avatar {...stringAvatar(`${nombre} ${apellido}`)} variant="rounded" />
                    }
                </Box>
            </Paper>
        </>
    )
}

export default TopSeller;