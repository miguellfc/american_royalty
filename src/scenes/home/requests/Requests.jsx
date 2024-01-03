import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setWindow} from "../../../state/authStore.js";
import {
    Alert,
    Box,
    Grid,
    Pagination,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from "@mui/material";
import Request from "./Request.jsx";
import TableHeaders from "../../../components/TableHeaders.jsx";
import workers from "../workers/Workers.jsx";
import TableToolbar from "../../../components/TableToolbar.jsx";
import {useNavigate} from "react-router-dom";

const Requests = ({ limit, requests, deleteRequest, page, setPage, countPagging, selected, setSelected, setOpenNotification, notificationMessage, openNotification, typeNotification, setDataEdit}) => {

    const navigate = useNavigate();

    const handleCloseNotification = (event, reason) => {
        if (reason === "clickaway")
            return;

        setOpenNotification(false);
    }
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = requests.map((n) => n.id_solicitud);
            setSelected(newSelected);
            return;
        }

        setSelected([])
    }
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };
    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = limit - requests.length;

    const columns = [
        {field: "nombre_cliente", headerName: "Cliente"},
        {field: "telf_cliente", headerName: "Teléfono"},
        {field: "estado", headerName: "Estado"},
        {field: "direccion", headerName: "Dirección"},
        {field: "direccion", headerName: "Precio Total"},
        {field: "trabajador", headerName: "Encargado"},
        {field: "fecha", headerName: "Fecha"},
    ];

    return (
        <>
            <Grid item xs={12}>
                <Box sx={{width: '100%'}}>
                    <Paper sx={{width: '100%', mb: 2}}>
                        <TableToolbar
                            selections={selected}
                            deleteData={deleteRequest}
                            message="Está seguro que desea eliminar las solicitudes seleccionadas?"
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
                                    rowCount={requests.length}
                                />
                                <TableBody>
                                    {requests.map((row, index) => (
                                        <Request
                                            isSelected={isSelected}
                                            handleClick={handleClick}
                                            deleteData={deleteRequest}
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
                                            <TableCell colSpan={columns.length + 4} />
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
                            <Pagination count={countPagging} page={page} onChange={(event,actualPage) => setPage(actualPage)} size="large" color="primary" shape="rounded" variant="outlined" />
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

export default Requests