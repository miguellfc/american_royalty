import {useState} from "react";
import {Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, useTheme} from '@mui/material';
import {KeyboardArrowDown} from "@mui/icons-material";
import { mainItems } from "../../utils/items.jsx";
import {useNavigate} from "react-router-dom";

const ListItems = () => {

    const [activate,setActivate] = useState(true)
    const navigate = useNavigate()
    const theme = useTheme()

    return (
        <>
            {
                mainItems.map((item) => (
                    <>
                        <ListItemButton
                            alignItems="flex-start"
                            onClick={() => navigate(item.route)}
                            key={item.index + new Date()}
                            sx={{
                                px: 3,
                                pt: 2.5,
                                color: theme.palette.mode === 'dark' ? "white" : theme.palette.primary.dark
                            }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.primary}/>
                        </ListItemButton>
                        <Divider/>
                    </>
                ))
            }
        </>
    )
}

export default ListItems