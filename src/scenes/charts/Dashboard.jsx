import {
    Avatar,
    Box,
    Grid,
    hexToRgb,
    LinearProgress,
    linearProgressClasses,
    Paper,
    Slider,
    Typography, useTheme
} from "@mui/material";
import WorkerRank from "./WorkerRank.jsx";
import WorkerChart from "./WorkerChart.jsx";
import {useEffect, useState} from "react";
import RequestMonthChart from "./RequestMonthChart.jsx";
import BudgetCollectMonthlyChart from "./BudgetCollectMonthlyChart.jsx";
import {hexToRGBA} from "../../utils/functions.js";
import {TopSellers} from "./TopSellers.jsx";
import BestServices from "./BestServices.jsx";

const Dashboard = () => {

    return (
        <>
            <Grid item xs={12} md={12} lg={4}>
                <Paper
                    elevation={5}
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'space-between',
                        height: 300
                    }}
                >
                    <RequestMonthChart/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
                <Paper
                    elevation={5}
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'space-between',
                        height: 300
                    }}
                >
                    <BudgetCollectMonthlyChart/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
                <TopSellers/>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
                <Paper
                    elevation={5}
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: "space-between",
                        height: 300
                    }}
                >
                    <WorkerChart/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
                <WorkerRank type="waiter"/>
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
                <WorkerRank/>
            </Grid>
            <Grid item xs={12} md={12} lg={2}>
                <BestServices/>
            </Grid>
        </>
    );
}

export default Dashboard;