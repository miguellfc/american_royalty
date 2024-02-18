import {Divider, IconButton, List, Toolbar} from "@mui/material";
import {ChevronLeft} from "@mui/icons-material";
import ListItems from "../scenes/bars/ListItems.jsx";
import Drawer from "../scenes/bars/Drawer.jsx";

const MainDrawer = ({ open, toggleDrawer}) => {
    return (
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
    )
}

export default MainDrawer;