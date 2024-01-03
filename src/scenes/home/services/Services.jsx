import {useEffect, useState} from "react";
import {
    Alert,
    Box,
    Grid,
    Pagination,
    Paper, Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import Service from "./Service.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setWindow} from "../../../state/authStore.js";
import {useNavigate} from "react-router-dom";
import TableToolbar from "../../../components/TableToolbar.jsx";
import TableHeaders from "../../../components/TableHeaders.jsx";
const Services = ({ limit, services, deleteServices, page, setPage, countPagging, selected, setSelected, setOpenNotification, notificationMessage, openNotification, typeNotification, setDateEdit, total }) => {

    const navigate = useNavigate();

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway')
            return;

      setOpenNotification(false);
    }
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = services.map((s) => s.id_servicio);
            setSelected(newSelected);
            return;
        }

        setSelected([]);
    }
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        selectedIndex === -1
            ? newSelected = [ ...selected, id ]
            : newSelected = selected.filter((select) => select !== id)

        setSelected(newSelected);
    }
    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = limit - services.length;
    const columns = [
        {field: "nombre", headerName: 'Nombre del servicio'},
        {field: "tipo", headerName: 'Tipo de servicio'},
        {field: "precio", headerName: 'Precio'}
    ]

    return (
        <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableToolbar
                        selections={selected}
                        deleteData={deleteServices}
                        message="Está seguro que desea eliminar los servicios seleccionados?"
                    />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tablaTitle"
                            size="large"
                        >
                            <TableHeaders
                                headCells={columns}
                                numSelected={selected.length}
                                onSelectA
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={services.length}
                            />
                            <TableBody>
                                {services.map((row, index) => (
                                    <Service
                                        isSelected={isSelected}
                                        handleClick={handleClick}
                                        deleteData={deleteServices}
                                        index={index}
                                        setDataEdit={setDateEdit}
                                        data={row}
                                    />
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{ height: 75 * emptyRows}}
                                    >
                                        <TableCell colSpan={6}/>
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
                <Alert onClose={handleCloseNotification} severity={typeNotification} sx={{ width: '100%' }} variant="filled">
                    {notificationMessage}
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default Services