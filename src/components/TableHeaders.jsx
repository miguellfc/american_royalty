import { TableCell, TableRow} from "@mui/material";
import CheckBox from "@mui/material/Checkbox";

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
                    {headCell}
                </TableCell>
            ))}
        </TableRow>
    );
}
export default TableHeaders