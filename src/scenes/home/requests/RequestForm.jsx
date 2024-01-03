import * as yup from "yup";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    TextField,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import {useEffect, useState} from "react";
import FlexBetween from "../../../components/FlexBetween.jsx";
import {
    CancelOutlined,
    CheckCircleOutlined,
    Close,
    Event,
    LocalPhone,
    Mail,
    PauseCircleOutlined,
    PhoneOutlined,
    Place,
    PlayCircleOutlined,
    QuestionMark
} from "@mui/icons-material";
import {FieldArray, Formik} from "formik";
import MapDirection from "../../../components/MapDirection.jsx";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {renderTimeViewClock} from "@mui/x-date-pickers";
import {DemoContainer, DemoItem} from "@mui/x-date-pickers/internals/demo/index.js";
import dayjs from "dayjs";
import date from "date-and-time";
import {useNavigate} from "react-router-dom";
import CheckBox from "@mui/material/Checkbox";
import {searchAddress, stringAvatar, stringToColor} from "../../../utils/functions.js";

const phoneNumberRules = /^(\+1)?\s?(\([1-9]\d{2}\)|[1-9]\d{2})(-|\s|.)\d{3}(-|\s|.)\d{4}$/;
const nameRules = /^[a-zA-Z]+(\s[a-zA-Z]+){1,19}$/;

// const defaultDate = new Date();
const requestSchema = yup.object().shape({
    precio_total: yup.number().positive().required(),
    direccion: yup.object().shape({
        lat: yup.number().required(),
        lng: yup.number().required()
    }).required("This field is required."),
    estado: yup.string().oneOf(['W', 'C', 'P', 'F']).default('W'),
    // fecha_hora: yup.date().min(defaultDate,"The date should be now or in future").required("This field is required."),
    fecha_hora: yup.date().required("This field is required."),
    cliente: yup.string().matches(nameRules,{ message: "Remember you should into name and last name"}).required('This field is required.'),
    telf_cliente: yup.string().matches(phoneNumberRules,{ message: "Invalid phone number!" }).required("This field is required"),
    usuario: yup.number(),
    servicios: yup.array().of(yup.object().shape({
        id_servicio: yup.number().required("You should select at least one service."),
    })).min(1,"You should select at least one service.").required("You should select at least one service.")
});

let initialRequest = {
    precio_total: 0,
    direccion: null,
    estado: 'W',
    // fecha_hora: dayjs(defaultDate),
    fecha_hora: dayjs(),
    cliente: '',
    telf_cliente: '',
    usuario: '',
    servicios: []
}

const RequestForm = ({data, create, update}) => {

    //TODO: Probar luego
    // const classes = useStyles();

    if (data) data.fecha_hora = dayjs(new Date(data.fecha_hora));

    const theme = useTheme();
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const [services, setServices] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [openMap, setOpenMap] = useState(false);
    const [address, setAddress] = useState('');

    const handleFormSubmit = async (values, onSubmitProps) => {
        data ? await update(values, onSubmitProps) : await create(values, onSubmitProps);
    }
    const getServicios = async () => {
        const result = await fetch(`http://localhost:3030/services`, {
            method: "POST",
        });

        const {data} = await result.json();

        setServices(data);
    }
    const getWorkers = async () => {
        const result = await fetch(`http://localhost:3030/user`, {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({role: 3})
        });

        const data = await result.json();

        setWorkers(data.data);
    }

    const getAddress = async () => {
        const aux = await searchAddress(data.direccion);
        const { road, residential, hamlet, town, city, house_number, county } = aux.address;

        setAddress(`${road} #${house_number}, ${city || town || residential || hamlet}, ${county}`);
    }
    const handleClick = (event, servicio, setFieldValue, values) => {
        const selectedIndex = selected.indexOf(servicio.id_servicio);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [ ...selected, servicio.id_servicio ];
            setFieldValue('precio_total', values.precio_total + servicio.precio, true);
            values.servicios !== null
                ? setFieldValue('servicios', [...values.servicios, {id_servicio: servicio.id_servicio}], true)
                : setFieldValue('servicios', [{id_servicio: servicio.id_servicio}], true)
        } else {
            newSelected = selected.filter((select) => {
                return servicio.id_servicio !== select
            });

            // TODO: Eliminar if al editar todos las solicitudes por defecto
            newSelected.length === 0
                ? setFieldValue('precio_total', 0, true)
                : setFieldValue('precio_total', values.precio_total - servicio.precio, true);

            setFieldValue('servicios', values.servicios.filter((item) => {
                return item.id_servicio !== servicio.id_servicio;
            }), true);
        }
        setSelected(newSelected);
    }
    const isSelected = (id) => selected.indexOf(id) !== -1;
    const completeSelected = () => {
        let selections = [];

        if (data.servicios !== null && data.servicios.length !== 0) {
            data.servicios.map((servicio) => {
                selections = [ ...selections, servicio.id_servicio ]
            });
        }

        setSelected(selections);
    }

    useEffect(() => {
        getServicios();
        getWorkers();
        if (data) {
            getAddress();
            completeSelected();
        }
    }, []);

    return (<>
        <Paper
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                top: '50%',
                left: '50%',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    width: 700, mb: 5, mt: 5
                }}
            >
                <FlexBetween>
                    <Typography component="h1" variant="h3" fulWidth>
                        {!data ? "Adicionar solicitud" : "Modificar solicitud"}
                    </Typography>
                </FlexBetween>
                <Formik
                    initialValues={data ? data : initialRequest}
                    onSubmit={handleFormSubmit}
                    validationSchema={requestSchema}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                          setFieldValue,
                          resetForm
                      }) => (<Box>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    borderBottom: `thin solid ${theme.palette.mode !== 'dark' ? 'gray' : 'white'}`
                                }}
                            >
                                <Box
                                    sx={{width: "50%", mb: 2}}
                                >
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.cliente}
                                        error={Boolean(touched.cliente) && Boolean(errors.cliente)}
                                        helperText={touched.cliente && errors.cliente}
                                        id="cliente"
                                        label="Nombre del cliente"
                                        name="cliente"
                                    />
                                    <TextField
                                        margin="normal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.telf_cliente}
                                        error={Boolean(touched.telf_cliente) && Boolean(errors.telf_cliente)}
                                        helperText={touched.telf_cliente && errors.telf_cliente}
                                        InputProps={{
                                            startAdornment: (<InputAdornment position="start">
                                                <PhoneOutlined/>
                                            </InputAdornment>)
                                        }}
                                        placeholder="Teléfono del cliente"
                                        type="text"
                                        id="telf_cliente"
                                        name="telf_cliente"
                                        fullWidth
                                    />
                                    <TextField
                                        fullWidth
                                        disabled
                                        margin="normal"
                                        onBlur={handleBlur}
                                        // onChange={handleChange}
                                        value={address}
                                        error={Boolean(touched.direccion) && Boolean(errors.direccion)}
                                        helperText={touched.direccion && errors.direccion}
                                        InputProps={{
                                            startAdornment: (<InputAdornment position="start">
                                                <Tooltip
                                                    title={data ? "Cambiar dirección" : "Seleccionar dirección"}>
                                                    <IconButton
                                                        onClick={() => setOpenMap(!openMap)}
                                                        sx={{
                                                            color: "#FF5A00", mx: -1,
                                                        }}
                                                    >
                                                        <Place/>
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>)
                                        }}
                                        placeholder="Dirección"
                                        id="direccion"
                                        name="direccion"
                                    />
                                    <FormControl
                                        fullWidth
                                        sx={{marginTop: 2}}
                                        disabled={data ? false : true}
                                    >
                                        <InputLabel id="label-status">Estado</InputLabel>
                                        <Select
                                            labelId="label-status"
                                            id="status"
                                            label="Estado"
                                            margin="normal"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.estado}
                                            error={Boolean(touched.estado) && Boolean(errors.estado)}
                                            helperText={touched.estado && errors.estado}
                                            name="estado"
                                        >
                                            {[{
                                                status: 'W',
                                                label: 'En espera',
                                                color: "warning",
                                                icon: <PauseCircleOutlined sx={{marginRight: 1.5}}
                                                                           color="warning"/>
                                            }, {
                                                status: 'P',
                                                label: 'En proceso',
                                                color: "primary",
                                                icon: <PlayCircleOutlined sx={{marginRight: 1.5}}
                                                                          color="primary"/>
                                            }, {
                                                status: 'C',
                                                label: 'Cancelado',
                                                color: "error",
                                                icon: <CancelOutlined sx={{marginRight: 1.5}}
                                                                      color="error"/>
                                            }, {
                                                status: 'F',
                                                label: 'Terminado',
                                                color: "success",
                                                icon: <CheckCircleOutlined sx={{marginRight: 1.5}}
                                                                           color="success"/>
                                            }].map((status) => (<MenuItem value={status.status}>
                                                <Box
                                                    sx={{
                                                        display: "flex", flexdirection: "row"
                                                    }}
                                                >
                                                    {status.icon}
                                                    <Typography>
                                                        {status.label}
                                                    </Typography>
                                                </Box>
                                            </MenuItem>))}
                                        </Select>
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            mt: 3, width: "100%"
                                        }}
                                    >
                                        <InputLabel id="trabajador_label">Trabajador</InputLabel>
                                        <Select
                                            labelId="trabajador_label"
                                            id="trabajador"
                                            label="Trabajador"
                                            margin="normal"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.usuario}
                                            error={Boolean(touched.usuario) && Boolean(errors.usuario)}
                                            helperText={touched.usuario && errors.usuario}
                                            name="usuario"
                                        >
                                            {workers.map((worker) => (<MenuItem
                                                sx={{width: "100%"}}
                                                value={worker.id_usuario}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex", flexDirection: "row",
                                                    }}
                                                >
                                                    {worker.foto !== '' ? <Avatar
                                                            alt={`${worker.nombre} ${worker.apellido}`}
                                                            src={`http://localhost:3030/assets/${worker.foto}`}/> :
                                                        <Avatar {...stringAvatar(`${worker.nombre} ${worker.apellido}`)}/>}
                                                    <Typography
                                                        sx={{
                                                            marginLeft: 2, marginTop: 1.5
                                                        }}
                                                    >
                                                        {`${worker.nombre} ${worker.apellido}`}
                                                    </Typography>
                                                </Box>
                                            </MenuItem>))}
                                        </Select>
                                    </FormControl>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            sx={{
                                                marginTop: 2
                                            }}
                                            components={['DateTimePicker']}
                                        >
                                            <DemoItem>
                                                <DateTimePicker
                                                    label="Fecha de la solicitud"
                                                    value={values.fecha_hora}
                                                    onChange={(new_date) => setFieldValue('fecha_hora', new Date(new_date.toString()), true)}
                                                    viewRenderers={{
                                                        hours: renderTimeViewClock,
                                                        minutes: renderTimeViewClock,
                                                        seconds: renderTimeViewClock,
                                                    }}
                                                    slotProps={{
                                                        actionBar: {
                                                            actions: ['accept', 'cancel']
                                                        }
                                                    }}
                                                />
                                            </DemoItem>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Box>
                                <Box
                                    sx={{
                                        width: "50%",
                                        marginLeft: 2,
                                        mb: 2,
                                        borderLeft: `thin solid ${theme.palette.mode === 'dark' ? 'white' : 'gray'}`
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: "100%", ml: 2, display: "flex", flexDirection: "column"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                height: "89%",
                                                width: "100%",
                                                borderBottom: `thin solid ${theme.palette.mode !== 'dark' ? 'gray' : 'white'}`,
                                                overflowY: "auto"
                                            }}
                                        >
                                            {services.map((service, index) => (
                                                <Paper
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "space-around",
                                                        alignItems: "center",
                                                        height: "auto",
                                                        width: "95%",
                                                        border: "thin solid gray",
                                                        backgroundColor: `${isSelected(service.id_servicio) ? 'rgba(8,116,190,.2)' : 'inherit'}`,
                                                        mt: 2.1,
                                                        '&:hover': {
                                                            borderColor: `${theme.palette.mode === 'dark' ? 'white' : 'black'}`,
                                                        }
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            width: "50%",
                                                            ml: 2,
                                                            fontSize: 15
                                                        }}
                                                    >
                                                        {service.servicio}
                                                    </Typography>
                                                    <Typography sx={{width: "10%", fontSize: 15}}>
                                                        ${service.precio}
                                                    </Typography>
                                                    <Box sx={{width: "15%"}}>
                                                        <CheckBox
                                                            color="primary"
                                                            checked={isSelected(service.id_servicio)}
                                                            inputProps={{
                                                                'aria-labelledby': `enhanced-table-checkbox-${index}`
                                                            }}
                                                            onChange={(event) => handleClick(event, service, setFieldValue, values)}
                                                        />
                                                    </Box>
                                                </Paper>))}
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDiretion: "row",
                                                justifyContent: "end",
                                                alignItems: "center",
                                                height: "10%",
                                                pt: 2
                                            }}
                                            aria-errormessage={errors.precio_total}
                                        >
                                            <Typography sx={{fontSize: 20, px: 2}}>
                                                $ {values.precio_total}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex", flexDirection: "row", justifyContent: 'flex-end', width: "100%"
                                }}
                            >
                                <FlexBetween>
                                    <Button
                                        sx={{marginTop: 2, width: "49%"}}
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                    >
                                        {!data ? 'Adicionar' : 'Modificar'}
                                    </Button>
                                    <Button
                                        sx={{marginTop: 2, width: "49%"}}
                                        variant="contained"
                                        onClick={() => navigate("/home")}
                                        fullWidth
                                    >
                                        Cancelar
                                    </Button>
                                </FlexBetween>
                            </Box>
                        </Box>
                        <MapDirection
                            openMap={openMap}
                            handleOpenMap={() => setOpenMap(!openMap)}
                            address={address}
                            setAddress={setAddress}
                            value={values.direccion}
                            setFieldValue={setFieldValue}
                            type={'select'}
                        />
                    </Box>)}
                </Formik>
            </Box>
        </Paper>
    </>)
}

export default RequestForm;