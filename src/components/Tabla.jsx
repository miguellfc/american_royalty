import {
    alpha,
    Box, FormControlLabel, Icon,
    IconButton, Pagination, Paper, Switch, Table, TableBody,
    TableCell, TableContainer, TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {visuallyHidden} from "@mui/utils"
import {AddBox, Create, Delete, DeleteForever, FilterList, Info} from "@mui/icons-material";
import CheckBox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import TableToolbar from "./TableToolbar.jsx";
import TableHeaders from "./TableHeaders.jsx";

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const Tabla = ({headCells}) => {

    const [start, setStart] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('nombre');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [countPage, setCountPage] = useState(1);
    const window = useSelector((state) => state.window)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
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
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    }
    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = page > 1 ? Math.max(0, (1 + page) * rowsPerPage - records.length) : 0;

    const visibleRows = useMemo(() => {
        stableSort(getComparator(order, orderBy), records).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        )
    }, [order, orderBy, page, rowsPerPage]);

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableToolbar numSelected={selected.length}/>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <TableHeaders
                            numSelected={selected.length}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                            order={order}
                            orderBy={orderBy}
                            rowCount={records && records.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.id_usuario)}
                                    role="checkbox"
                                    aria-checked={isSelected(row.id_usuario)}
                                    tabIndex={-1}
                                    key={row.id_usuario}
                                    selected={isSelected(row.id_usuario)}
                                    sx={{cursor: 'pointer'}}
                                >
                                    <TableCell padding="checkbox">
                                        <CheckBox
                                            color="primary"
                                            checked={isSelected(row.id_usuario)}
                                            inputProps={{
                                                'aria-lablledby': `enhanced-table-checkbox-${index}`
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={`enhanced-table-checkbox-${index}`}
                                        scope="row"
                                        padding="none"
                                    >
                                        {`${row.nombre} ${row.apellido}`}
                                    </TableCell>
                                    <TableCell>{row.rol}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Detalles">
                                            <IconButton>
                                                <Info/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Modificar">
                                            <IconButton>
                                                <Create/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Eliminar">
                                            <IconButton>
                                                <Delete/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>)
                            )}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 53 : 73) * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*<TablePagination*/}
                {/*    count={records.length}*/}
                {/*    page={page}*/}
                {/*    onPageChange={handleChangePage}*/}
                {/*    rowsPerPage={rowsPerPage}*/}
                {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
                {/*    rowsPerPageOptions={[1, 2, 3, 4, 5]}*/}
                {/*    component="div"*/}
                {/*/>*/}
                {/*<Box sx={{*/}
                {/*    display: 'flex',*/}
                {/*    flexDirection: 'row',*/}
                {/*    justifyContent: 'center',*/}
                {/*    alignItems: 'center',*/}
                {/*    height: 70*/}
                {/*}}>*/}
                {/*    <Pagination count={countPage} page={page} onChange={(event, page) => setPage(page)} size="large"*/}
                {/*                color="primary"/>*/}
                {/*</Box>*/}
            </Paper>
        </Box>
    )
}

export default Tabla