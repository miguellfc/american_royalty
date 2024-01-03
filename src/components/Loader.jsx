import '../styles/Loader.css'
import {useTheme} from "@mui/material";
const Loader = () => {

    const theme = useTheme()

    return (
        <div className="lds-ellipsis">
            <div style={theme.palette.mode === 'dark' ? {backgroundColor: "#FFFFFF"} : {backgroundColor: "#000000"}}></div>
            <div style={theme.palette.mode === 'dark' ? {backgroundColor: "#FFFFFF"} : {backgroundColor: "#000000"}}></div>
            <div style={theme.palette.mode === 'dark' ? {backgroundColor: "#FFFFFF"} : {backgroundColor: "#000000"}}></div>
            <div style={theme.palette.mode === 'dark' ? {backgroundColor: "#FFFFFF"} : {backgroundColor: "#000000"}}></div>
        </div>
    )
}

export default Loader