import { Box, TableCell, TableRow, TableSortLabel } from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import {visuallyHidden} from "@mui/utils";

const TableHeaders = ({onSelectAllClick, numSelected, rowCount, headCells = [] }) => {

    return (
        <TableRow>
            <TableCell padding="checkbox">
                <CheckBox
                    color="primary"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{
                        'aria-label': 'Select all'
                    }}
                />
            </TableCell>
            {headCells.map((headCell) => (
                <TableCell>
                    {headCell.headerName}
                </TableCell>
            ))}
        </TableRow>
    );
}
export default TableHeaders