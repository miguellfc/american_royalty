import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Paper, Grid, Typography, Tooltip, IconButton, useTheme, TableRow, TableCell, Checkbox} from "@mui/material";
import { Create, Delete, CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";
import ModalDelete from "../../../components/ModalDelete.jsx";

const Service = ({ isSelected, handleClick, deleteData, index, setDataEdit, data }) => {

    const { id_servicio, servicio, precio, tipo_servicio, nombre_ts } = data;

    const theme = useTheme();
    const navigate = useNavigate();
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const eventClick = () => {
        setDataEdit(data);
        navigate(`edit/${id_servicio}`);
    }

    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isSelected(id_servicio)}
            tabIndex={-1}
            key={id_servicio}
            selected={isSelected(id_servicio)}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isSelected(id_servicio)}
                    inputProps={{
                        'aria-labelledby': `enhanced-table-checkbox-${index}`
                    }}
                    onChange={(event) => handleClick(event, id_servicio)}
                />
            </TableCell>
            <TableCell>
                <Typography>
                    {servicio}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {nombre_ts}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {precio}
                </Typography>
            </TableCell>
            <TableCell>
                <Tooltip title="Modificar">
                    <IconButton onClick={eventClick}>
                        <Create sx={{ color: theme.palette.mode === 'dark' ? 'white' : '#444444'}} />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell>
                <Tooltip title="Eliminar">
                    <IconButton onClick={() => setOpenModalDelete(!openModalDelete)}>
                        <Delete sx={{ color: theme.palette.mode === 'dark' ? 'white' : '#444444'}} />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <ModalDelete
                openModal={openModalDelete}
                handleModal={() => setOpenModalDelete(!openModalDelete)}
                deleteData={deleteData}
                message="Está seguro que desea eliminar este servicio?"
                data={[id_servicio]}
            />
        </TableRow>
    )
}

export default Service