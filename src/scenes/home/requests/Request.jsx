import {
    Menu, Avatar, Box, Chip, IconButton, MenuItem,
    TableCell, TableRow, Tooltip, Typography,
} from "@mui/material";
import {useEffect, useState} from "react";
import CheckBox from "@mui/material/Checkbox";
import {
    CheckCircleOutlined, Place, PlayCircleOutlined, QuestionMark,
    CancelOutlined, PauseCircleOutlined, Event, LocalPhone, Create,
    Delete, KeyboardDoubleArrowDown, KeyboardDoubleArrowUp
} from "@mui/icons-material";
import date from "date-and-time";
import ES from "date-and-time/locale/es";
import ModalDelete from "../../../components/ModalDelete.jsx";
import {useNavigate} from "react-router-dom";
import {searchAddress, stringToColor} from "../../../utils/functions.js";

const stringAvatar = (name) => {
    return {
        sx: {
            marginLeft: 1.5,
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
const Request = (
    {
        isSelected, handleClick, deleteData, index, setDataEdit, data
    }
) => {

    date.locale(ES);

    const {
        id_solicitud, precio_total, direccion, estado, fecha_hora, cliente,
        telf_cliente, usuario, nombre, apellido, foto, servicios
    } = data;

    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [display, setDisplay] = useState('');
    const open = Boolean(anchorEl);

    const getAddress = async () => {
        const address = await searchAddress(direccion);
        const { road, residential, hamlet, town, city, house_number, county } = address.address;

        setDisplay(`${road} #${house_number}, ${city || town || residential || hamlet}, ${county}`);
    }

    useEffect(() => {
        getAddress();
        }, []);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const eventClick = () => {
        setDataEdit(data);
        navigate(`edit/${id_solicitud}`);
    }

    return (
        <>
            <TableRow
                hover
                role="checkbox"
                aria-checked={isSelected(id_solicitud)}
                tabIndex={-1}
                key={id_solicitud}
                selected={isSelected(id_solicitud)}
            >
                <TableCell padding="checkbox">
                    <CheckBox
                        color="primary"
                        checked={isSelected(id_solicitud)}
                        inputProps={{
                            'aria-lablledby': `enhanced-table-checkbox-${index}`
                        }}
                        onChange={(event) => handleClick(event, id_solicitud)}
                    />
                </TableCell>
                <TableCell>
                    <Typography>
                        {cliente}
                    </Typography>
                </TableCell>
                <TableCell sx={{ width: "12%" }}>
                    <Box style={{ display: "flex", flexDirection: "row", justifyContent: "start" }}>
                        <LocalPhone sx={{ marginRight: 1 }}/>
                        <Typography>
                            {telf_cliente}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        {
                            (() => {
                                switch (estado) {
                                    case 'C':
                                        return <Chip variant="filled" color="error" icon={<CancelOutlined/>}
                                                     label="Cancelado"/>;
                                    case 'P':
                                        return <Chip variant="filled" color="primary" icon={<PlayCircleOutlined/>}
                                                     label="En proceso"/>;
                                    case 'F':
                                        return <Chip variant="filled" color="success" icon={<CheckCircleOutlined/>}
                                                     label="Terminado"/>;
                                    default:
                                        return <Chip variant="filled" color="warning" icon={<PauseCircleOutlined/>}
                                                     label="En espera"/>
                                }
                            })()
                        }
                    </Box>
                </TableCell>
                <TableCell>
                    <Box style={{ display: "flex", flexDirection: "row", justifyContent: "start"}}>
                        <Place sx={{ color: "#FF5A00", marginRight: 0.25 }}/>
                        <Typography>
                            {display}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell>
                    <Typography>
                        {`$ ${precio_total}`}
                    </Typography>
                </TableCell>
                <TableCell>
                    {
                        usuario === null
                            ? <Tooltip  title="Sin asignar">
                                <Avatar sx={{ marginLeft: 1.5 }} >
                                    <QuestionMark size="large"/>
                                </Avatar>
                            </Tooltip>
                            : foto !== ''
                                ? <Tooltip title={`${nombre} ${apellido}`}>
                                    <Avatar alt={`${nombre} ${apellido}`} src={`http://localhost:3030/assets/${foto}`} sx={{ marginLeft: 1.5 }}/>
                                </Tooltip>
                                : <Tooltip title={`${nombre} ${apellido}`}>
                                    <Avatar {...stringAvatar(`${nombre} ${apellido}`)} />
                                </Tooltip>
                    }
                </TableCell>
                <TableCell>
                    <Box style={{ display: "flex", flexDirection: "row", justifyContent: "start"}}>
                        <Event sx={{ marginRight: 1}}/>
                        <Typography>
                            {date.format(new Date(fecha_hora),'dddd DD, MMMM YYYY hh:mm A')}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell>
                    <Tooltip title="Servicios">
                        <IconButton
                            onClick={handleMenu}
                            size="small"
                            aria-constrols={open ? "service-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            {open ? <KeyboardDoubleArrowUp/> : <KeyboardDoubleArrowDown/>}
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <Tooltip title="Modificar">
                        <IconButton
                            onClick={eventClick}
                            disabled={estado === 'C' || estado === 'F'}
                        >
                            <Create/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <Tooltip title="Eliminar">
                        <IconButton
                            onClick={() => setOpenDeleteModal(!openDeleteModal)}
                            disabled={estado === 'C' || estado === 'F'}
                        >
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <ModalDelete
                    openModal={openDeleteModal}
                    handleModal={() => setOpenDeleteModal(!openDeleteModal)}
                    deleteData={deleteData}
                    message="Está seguro que desea eliminar esta solicitud?"
                    data={[id_solicitud]}
                />
            </TableRow>
            <Menu
                anchorEl={anchorEl}
                id="service-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                {
                    servicios && servicios.map((servicio) =>
                        (
                            <MenuItem>
                                {`${servicio.nombre_servicio} - $${servicio.precio_servicio}`}
                            </MenuItem>
                        )
                    )
                }
            </Menu>
        </>
    )
}

export default Request