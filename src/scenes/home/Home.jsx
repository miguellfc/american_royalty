import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    CssBaseline, Box, Toolbar, List, Typography,
    Divider, IconButton, Badge, Container, Grid,
    Paper, Link, Tooltip, useTheme, useMediaQuery,
    InputBase, Avatar
} from '@mui/material';
import Drawer from '../bars/Drawer.jsx';
import AppBar from '../bars/AppBar.jsx';
import { Search, DarkMode, LightMode, Menu,
    ChevronLeft, Notifications, Logout, AccountCircle
} from '@mui/icons-material';
import ListItems from '../bars/ListItems.jsx';
import FlexBetween from "../../components/FlexBetween.jsx";
import UserImage from "../../components/UserImage.jsx";
import {setLogout, setMode} from "../../state/authStore.js";
import Login from "../login/Login.jsx";
import Redirect from "../../utils/Redirect.jsx";
import MainRequest from "./requests/MainRequest.jsx";
import MainWorker from "./workers/MainWorker.jsx";
import MainService from "./services/MainService.jsx";
import {stringAvatar, stringToColor} from "../../utils/functions.js";
import Dashboard from "../charts/Dashboard.jsx";

const Home = () => {

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light
    const dark = theme.palette.neutral.dark
    const background = theme.palette.background.default
    const primaryLight = theme.palette.primary.main
    const alt = theme.palette.background.alt

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const window = useSelector((state) => state.window)
    const user = useSelector((state) => state.user)
    const nombre = user.rows[0].nombre
    const apellido = user.rows[0].apellido
    const foto = user.rows[0].foto

    const [open, setOpen] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 850px)")
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <FlexBetween
                        sx={{
                            flexGrow: 2
                        }}
                    >
                        {
                            isNonMobileScreens && <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <Menu />
                            </IconButton>
                        }
                        <FlexBetween
                            sx={{
                                flexGrow: 1
                            }}
                        >
                            <Typography
                                fontWeight="bold"
                                fontSize="clamp(1rem, 2rem, 2.25rem)"
                                onClick={() => navigate("/home")}
                                noWrap
                                sx={{
                                    color: "white",
                                    flewGrow: 1,
                                    "&:hover": {
                                        cursor: "pointer"
                                    }
                                }}
                            >
                                American Royalty A/C
                            </Typography>
                            {isNonMobileScreens && (
                                <FlexBetween
                                    backgroundColor={neutralLight}
                                    borderRadius="10px"
                                    gap="3rem"
                                    padding="0.1rem 2rem"
                                >
                                    <InputBase placeholder="Search..."/>
                                    <IconButton>
                                        <Search />
                                    </IconButton>
                                </FlexBetween>
                            )}
                        </FlexBetween>
                        <FlexBetween>
                            <Tooltip title={theme.palette.mode === 'dark' ? "Light Mode" : "Dark Mode"}>
                                <IconButton onClick={() => dispatch(setMode())}>
                                    {theme.palette.mode === "dark"
                                        ? (<DarkMode sx={{ fontSize: "25px" }}/>)
                                        : (<LightMode sx={{ color: "white", fontSize: "25px" }}/>)
                                    }
                                </IconButton>
                            </Tooltip>
                            {
                                foto === ""
                                    ? <Avatar { ...stringAvatar(`${nombre} ${apellido}`)} />
                                    : <Avatar alt="Imagen del usuario" src={`http://localhost:3030/assets/${foto}`} />
                            }
                            <Tooltip title="Log Out">
                                <IconButton
                                    color="inherit"
                                    onClick={() => dispatch(setLogout())}
                                >
                                    <Logout
                                        sx={{
                                            height: '25px',
                                            width: '25px',
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </FlexBetween>
                    </FlexBetween>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeft />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <ListItems/>
                </List>
            </Drawer>
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

export default Home