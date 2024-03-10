import {
    Box, Grid,Paper,Table, TableBody,
    TableCell, TableContainer, TableRow
} from "@mui/material";
import Request from "./Request.jsx";
import TableHeaders from "../../../components/TableHeaders.jsx";
import TableToolbar from "../../../components/TableToolbar.jsx";
import PaginationBar from "../../../components/PaginationBar.jsx";

const Requests = (
    {
        requests, deleteRequest, page, limit, total, controlPagination,
        selected, setSelected, setDataEdit, filter, setFilter
    }
) => {

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

        selectedIndex === -1
            ? newSelected = [...selected, id]
            : newSelected = selected.filter((select) => select !== id );

        setSelected(newSelected);
    };
    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = limit - requests.length;
    const columns = [
        "Cliente", "Teléfono", "Estado", "Dirección", "Precio Total", "Encargado", "Fecha"
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
                            filter={filter}
                            setFilter={setFilter}
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
                            <PaginationBar
                                totalPages={total}
                                page={page}
                                setPage={controlPagination}
                            />
                        </Box>
                    </Paper>
                </Box>
            </Grid>
        </>
    )
}

export default Requests