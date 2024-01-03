import {Navigate, Routes, Route, HashRouter} from "react-router-dom";
import Login from "./scenes/login/Login.jsx";
import Home from "./scenes/home/Home.jsx"
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material";
import {themeSettings} from "./theme.js";

function App() {

    const mode = useSelector((state) => state.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
    const isAuth = Boolean(useSelector((state) => state.token))

    return (
        <div className="server">
            <HashRouter basename="/arac">
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/home/*" element={isAuth ? <Home/> : <Navigate to="/"/> }/>
                    </Routes>
                </ThemeProvider>
            </HashRouter>
        </div>
    )
}

export default App
