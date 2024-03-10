import { useState} from "react";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, Box, Toolbar, Container, Grid } from '@mui/material';
import Redirect from "../../utils/Redirect.jsx";
import MainRequest from "./requests/MainRequest.jsx";
import MainWorker from "./workers/MainWorker.jsx";
import MainService from "./services/MainService.jsx";
import Dashboard from "../charts/Dashboard.jsx";
import MainAppBar from "../../components/MainAppBar.jsx";
import MainDrawer from "../../components/MainDrawer.jsx";

const Home = () => {

    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <MainAppBar
                open={open}
                toggleDrawer={toggleDrawer}
            />
            <MainDrawer
                open={open}
                toggleDrawer={toggleDrawer}
            />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Routes>
                            <Route path="/" element={<Redirect to="charts"/>}/>
                            <Route path="charts" element={<Dashboard/>}/>
                            <Route path="requests/*" element={<MainRequest/>}/>
                            <Route path="workers/*" element={<MainWorker/>}/>
                            <Route path="services/*" element={<MainService/>}/>
                        </Routes>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default Home;