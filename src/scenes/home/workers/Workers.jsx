import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setWindow} from "../../../state/authStore.js";
import {
    Alert,
    Box,
    Grid,
    IconButton,
    Pagination,
    PaginationItem,
    Paper,
    Snackbar, Table, TableBody, TableCell,
    TableContainer, TableRow,
    Tooltip, Typography, useTheme
} from "@mui/material";
import Worker from "./Worker.jsx";
import Loader from "../../../components/Loader.jsx";
import {
    AddBox,
    ChevronLeft,
    ChevronRight,
    Create,
    Delete,
    DeleteForever,
    DoneAll,
    HistoryToggleOff,
    Info
} from "@mui/icons-material";
import WorkerChart from "../../charts/WorkerChart.jsx";
import ModalDelete from "../../../components/ModalDelete.jsx";
import Tabla from "../../../components/Tabla.jsx";
import TableToolbar from "../../../components/TableToolbar.jsx";
import TableHeaders from "../../../components/TableHeaders.jsx";
import CheckBox from "@mui/material/Checkbox";
import {useNavigate} from "react-router-dom";
import WorkerRank from "../../charts/WorkerRank.jsx";

const Workers = ({ limit, workers, deleteWorkers, page, setPage, countPagging, selected, setSelected, setOpenNotification, notificationMessage, openNotification, typeNotification, setDataEdit, total }) => {

    const navigate = useNavigate();

    const handleCloseNotification = (event, reason) => {
        if (reason === "clickaway")
            return;

        setOpenNotification(false);
    }
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = workers.map((n) => n.id_usuario);
            setSelected(newSelected);
            return;
        }

        setSelected([]);
    };
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        selectedIndex === -1
            ? newSelected = [ ...selected, id ]
            : newSelected = selected.filter((select) => {
                return select !== id;
            })

        setSelected(newSelected);
    };
    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = limit - workers.length;
    const columns = [
        {field: "foto", headerName: "Avatar"},
        {field: "fullName", headerName: "Nombre y Apellido"},
        {field: "email", headerName: "Email"},
        {field: "rol", headerName: "Puesto"},
        {field: "telf", headerName: "Phone"}
    ];

    return (
        <>
            <Grid item xs={12}>
                <Box sx={{width: '100%'}}>
                    <Paper sx={{width: '100%', mb: 2}}>
                        <TableToolbar
                            selections={selected}
                            deleteData={deleteWorkers}
                            message="Está seguro que desea eliminar los trabajadores seleccionados?"
                        />
                        <TableContainer>
                            <Table
                                sx={{minWidth: 750}}
                                aria-labelledby="tableTitle"
                                size="large"
                            >
                                <TableHeaders
                                    headCells={columns}
                                    numSelected={selected.length}
                                    onSelectAllClick={handleSelectAllClick}
                                    rowCount={workers.length}
                                />
                                <TableBody>
                                    {workers.map((row, index) => (
                                        <Worker
                                            isSelected={isSelected}
                                            handleClick={handleClick}
                                            deleteData={deleteWorkers}
                                            index={index}
                                            setDataEdit={setDataEdit}
                                            data={row}
                                        />
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: 75 * emptyRows
                                            }}
                                        >
                                            <TableCell colSpan={8}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{
                            marginTop: 2,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignContent: "center",
                            height: 60
                        }}>
                            <Pagination count={countPagging} page={page} onChange={(event, actualPage) => setPage(actualPage)} size="large" color="primary" shape="rounded" variant="outlined"/>
                        </Box>
                    </Paper>
                </Box>
                <Snackbar open={openNotification} autoHideDuration={4000} onClose={handleCloseNotification}>
                    <Alert onClose={handleCloseNotification} severity={typeNotification} sx={{width: '100%'}}
                           variant="filled">
                        {notificationMessage}
                    </Alert>
                </Snackbar>
            </Grid>
        </>
    )
}
export default Workers