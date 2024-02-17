import {useState} from "react";
import {
    Avatar, Box, Chip,
    Collapse,
    Grid,
    IconButton,
    Paper,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import {
    CheckBoxOutlineBlank,
    Create,
    Delete,
    OpenInFull,
    CloseFullscreen,
    Info,
    Mail,
    LocalPhone, AdminPanelSettings, AccountCircle, SupportAgent, Engineering
} from "@mui/icons-material";
import FlexBetween from "../../../components/FlexBetween.jsx";
import ModalDelete from "../../../components/ModalDelete.jsx";
import CheckBox from "@mui/material/Checkbox";
import {useNavigate} from "react-router-dom";
import {stringAvatar, stringToColor} from "../../../utils/functions.js";

const Worker = ({ isSelected, handleClick, deleteData, index, setDataEdit, data, setRole }) => {

    const {id_usuario, email, nombre, apellido, foto, password, telefono, usuario, id_rol, rol} = data;

    const theme = useTheme();
    const navigate = useNavigate();
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const eventClick = () => {
        setDataEdit(data);
        navigate(`edit/${id_usuario}`);
    }

    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isSelected(id_usuario)}
            tabIndex={-1}
            key={id_usuario}
            selected={isSelected(id_usuario)}
        >
            <TableCell padding="checkbox">
                <CheckBox
                    color="primary"
                    checked={isSelected(id_usuario)}
                    inputProps={{
                        'aria-lablledby': `enhanced-table-checkbox-${index}`
                    }}
                    onChange={(event) => handleClick(event, id_usuario)}
                />
            </TableCell>
            <TableCell>
                {
                    foto === ""
                        ? <Avatar {...stringAvatar(`${nombre} ${apellido}`)} />
                        : <Avatar alt="Imagen del usuario" src={`http://localhost:3030/assets/${foto}`}/>
                }
            </TableCell>
            <TableCell
                component="th"
                id={`enhanced-table-checkbox-${index}`}
                scope="row"
                padding="none"
            >
                <Typography>
                    {`${nombre} ${apellido}`}
                </Typography>
            </TableCell>
            <TableCell>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
                    <Mail sx={{marginRight: 0.5}}/>
                    <Typography>
                        {email}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell>
                <Chip
                    sx={{
                        cursor: "pointer",
                    }}
                    variant="filled"
                    color="primary"
                    icon={
                        (() => {
                            switch (rol) {
                                case "Administrador":
                                    return <AdminPanelSettings/>;
                                case "Operadora":
                                    return <SupportAgent/>
                                default:
                                    return <Engineering/>;
                            }
                        })()
                    }
                    label={rol}
                    onDoubleClick={(event) => setRole((role) => {
                        return role === id_rol ? -1 : id_rol
                    })}
                />
            </TableCell>
            <TableCell>
                <Box sx={{display: "flex", flexDirection: "row"}}>
                    <LocalPhone sx={{marginRight: 0.5}}/>
                    <Typography>
                        {telefono}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell>
                <Tooltip title="Modificar">
                    <IconButton onClick={eventClick}>
                        <Create sx={{color: theme.palette.mode === 'dark' ? 'white' : '#444444'}}/>
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell>
                <Tooltip title="Eliminar">
                    <IconButton onClick={() => setOpenModalDelete(!openModalDelete)}>
                        <Delete sx={{color: theme.palette.mode === 'dark' ? 'white' : '#444444'}}/>
                    </IconButton>
                </Tooltip>
            </TableCell>
            <ModalDelete
                openModal={openModalDelete}
                handleModal={() => setOpenModalDelete(!openModalDelete)}
                deleteData={deleteData}
                message="Está seguro que desea eliminar este trabajador?"
                data={[id_usuario]}
            />
        </TableRow>
    )
}

export default Worker