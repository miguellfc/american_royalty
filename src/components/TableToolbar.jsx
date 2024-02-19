import {alpha, Box, IconButton, InputBase, Toolbar, Tooltip, Typography, useTheme} from "@mui/material";
import {AddBox, DeleteForever, Search, SearchOffOutlined} from "@mui/icons-material";
import ModalDelete from "./ModalDelete.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import FlexBetween from "./FlexBetween.jsx";

const TableToolbar = ({ title, selections, deleteData, message, filter, setFilter }) => {

    const numSelected = selections.length

    const theme = useTheme();
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const neutralLight = theme.palette.neutral.light;

    return (
        <Toolbar
            sx={{
                display: "flex",
                justifyContent: "space-between",
                p1: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    width="100px"
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    width="100px"
                    variant="h3"
                    id="tableTitle"
                    component="div"
                >
                    {title}
                </Typography>
            )}
            <FlexBetween
                backgroundColor={
                    numSelected > 0
                        ? (theme) => alpha(theme.palette.secondary.main, theme.palette.action.activatedOpacity)
                        : neutralLight
                }
                borderRadius="10px"
                gap="3rem"
                padding="0.1rem 2rem"
            >
                <InputBase
                    placeholder="Search..."
                    onChange={(event) => setFilter({ ...filter, search: event.target.value })}
                    value={filter.search}
                />
                <IconButton>
                    {
                        filter.search !== ''
                            ? (
                                <SearchOffOutlined
                                    onClick={(event) => setFilter({ ...filter, search: '' })}
                                />
                            ) : (
                                <Search />
                            )
                    }
                </IconButton>
            </FlexBetween>
            <Box>
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
            </Box>
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