import {alpha, IconButton, Toolbar, Tooltip, Typography, useTheme} from "@mui/material";
import {AddBox, DeleteForever, FilterList, FilterListOff} from "@mui/icons-material";
import {useSelector} from "react-redux";
import ModalDelete from "./ModalDelete.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const TableToolbar = ({ selections, deleteData, message }) => {

    const numSelected = selections.length

    const theme = useTheme();
    const navigate = useNavigate();
    const window = useSelector((state) => state.window)

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    return (
        <Toolbar
            sx={{
                p1: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h3"
                    id="tableTitle"
                    component="div"
                >
                    {
                        (() => {
                            switch (window) {
                                case 'workers':
                                    return "Trabajadores";
                                case 'services':
                                    return "Servicios";
                                default:
                                    return "Solicitudes";
                            }
                        })()
                    }
                </Typography>
            )}
            <Tooltip title="Agregar">
                <IconButton
                    onClick={() => navigate("create")}
                    sx={{ color: theme.palette.mode === 'dark' ? 'white' : '#444444' }}
                >
                    <AddBox/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton
                    sx={{ color: theme.palette.mode === 'dark' ? 'white' : '#444444' }}
                    disabled={numSelected === 0}
                >
                    <DeleteForever onClick={() => setOpenDeleteModal(!openDeleteModal)}/>
                </IconButton>
            </Tooltip>
            <ModalDelete
                openModal={openDeleteModal}
                handleModal={() => setOpenDeleteModal(!openDeleteModal)}
                deleteData={deleteData}
                message={message}
                data={selections}
            />
        </Toolbar>
    );
}
export default TableToolbar