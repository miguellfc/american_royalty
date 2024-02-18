import {Avatar, Box, IconButton, Toolbar, Tooltip, Typography, useMediaQuery, useTheme} from "@mui/material";
import FlexBetween from "./FlexBetween.jsx";
import {DarkMode, LightMode, Logout, Menu} from "@mui/icons-material";
import {setLogout, setMode} from "../state/authStore.js";
import {stringAvatar} from "../utils/functions.js";
import AppBar from "../scenes/bars/AppBar.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const MainAppBar = ({ open, toggleDrawer}) => {

    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const isNonMobileScreens = useMediaQuery("(min-width: 850px)");

    const firstName = user.rows[0].nombre
    const lastName = user.rows[0].apellido
    const photo = user.rows[0].foto

    return (
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
                    </FlexBetween>
                    <FlexBetween>
                        <Box marginX={1}>
                            <Tooltip title={theme.palette.mode === 'dark' ? "Light Mode" : "Dark Mode"}>
                                <IconButton onClick={() => dispatch(setMode())}>
                                    {theme.palette.mode === "dark"
                                        ? (<DarkMode sx={{ fontSize: "25px" }}/>)
                                        : (<LightMode sx={{ color: "white", fontSize: "25px" }}/>)
                                    }
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box marginX={1}>
                            {
                                photo === ""
                                    ? <Avatar { ...stringAvatar(`${firstName} ${lastName}`)} />
                                    : <Avatar alt="Imagen del usuario" src={`http://localhost:3030/assets/${photo}`} />
                            }
                        </Box>
                        <Box marginX={1}>
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
                        </Box>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default MainAppBar;