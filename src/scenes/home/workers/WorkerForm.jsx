import * as yup from "yup";
import {
    Box, Button, FormControl, IconButton,
    InputAdornment, InputLabel, MenuItem,
    Paper, Select, TextField, Typography, useTheme
} from "@mui/material";
import FlexBetween from "../../../components/FlexBetween.jsx";
import {
    AddCircle, AlternateEmail, ChangeCircle, EditOutlined,
    MailOutline, PhoneOutlined, RemoveCircle, Visibility, VisibilityOff
} from "@mui/icons-material";
import {Formik} from "formik";
import Dropzone from "react-dropzone";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const phoneNumberRules = /^(\+1)?\s?(\([1-9]\d{2}\)|[1-9]\d{2})(-|\s|.)\d{3}(-|\s|.)\d{4}$/;

const workerSchema = yup.object().shape({
    email: yup.string().email("Invalid email!").required("This field is required"),
    nombre: yup.string().required("This field is required"),
    apellido: yup.string().required("This field is required"),
    foto: yup.string(),
    password: yup.string().required("This field is required"),
    telefono: yup.string().matches(phoneNumberRules, {message: "Invalid phone number!"}).required("This field is required"),
    usuario: yup.string().required("This field is required"),
    id_rol: yup.number().required("This field is required")
});

let initialWorker = {
    email: '',
    nombre: '',
    apellido: '',
    foto: '',
    password: '',
    telefono: '',
    usuario: '',
    id_rol: ''
}

const WorkerForm = ({ create, update, data = null }) => {

    const theme = useTheme()
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false)
    const [roles, setRoles] = useState([]);

    const handleFormSubmit = async (values, onSubmitProps) => {
        data ? await update(values, onSubmitProps) : await create(values, onSubmitProps)
    }

    const getRoles = async () => {
        const roles = await fetch(`http://localhost:3030/roles`,{ method: "GET" })

        const data = await roles.json()

        setRoles(data)
    }

    useEffect(() => {
        getRoles()
    },[])

    return (
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
                    <Typography component="h1" variant="h3" fullWidth>
                        {!data ? "Adicionar trabajador" : "Modificar trabajador"}
                    </Typography>
                </FlexBetween>
                <Formik
                    initialValues={data ? data : initialWorker}
                    onSubmit={handleFormSubmit}
                    validationSchema={workerSchema}
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
                    }) => (
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                        >
                            <Box>
                                <FlexBetween>
                                    <TextField
                                        margin="normal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.nombre}
                                        error={Boolean(touched.nombre) && Boolean(errors.nombre)}
                                        helperText={touched.nombre && errors.nombre}
                                        id="nombre"
                                        label="Nombre"
                                        name="nombre"
                                        sx={{
                                            width: "49%"
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.apellido}
                                        error={Boolean(touched.apellido) && Boolean(errors.apellido)}
                                        helperText={touched.apellido && errors.apellido}
                                        id="apellido"
                                        label="Apellido"
                                        name="apellido"
                                        sx={{
                                            width: "49%"
                                        }}
                                    />
                                </FlexBetween>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MailOutline/>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                />
                                <Box
                                    border={`1px solid ${theme.palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                    marginTop={2}
                                    sx={{
                                        "&:hover": {
                                            border: `1px solid ${theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000'}`
                                        }
                                    }}
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) => setFieldValue("foto", acceptedFiles[0])}
                                    >
                                        {({getRootProps, getInputProps}) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${theme.palette.primary.main}`}
                                                p="1rem"
                                                sx={{
                                                    "&:hover": {
                                                        cursor: "pointer"
                                                    }
                                                }}
                                            >
                                                <input {...getInputProps()}/>
                                                {!values.foto
                                                    ? (<p>Adicione una foto</p>)
                                                    : (
                                                        <FlexBetween>
                                                            <Typography>{values.foto.name}</Typography>
                                                            <EditOutlined/>
                                                        </FlexBetween>
                                                    )
                                                }
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                                <FlexBetween sx={{ marginTop: 2 }}>
                                    <TextField
                                        margin="normal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.usuario}
                                        error={Boolean(touched.usuario) && Boolean(errors.usuario)}
                                        helperText={touched.usuario && errors.usuario}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AlternateEmail/>
                                                </InputAdornment>
                                            )
                                        }}
                                        placeholder="Usuario"
                                        id="usuario"
                                        name="usuario"
                                        sx={{
                                            width: "49%"
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        error={Boolean(touched.password) && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        onClick={() => setVisible(!visible)}
                                                    >
                                                        {visible ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        placeholder="Contraseña"
                                        type={visible ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        sx={{
                                            width: "49%"
                                        }}
                                    />
                                </FlexBetween>
                                <FlexBetween sx={{ marginTop: 2 }}>
                                    <TextField
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.telefono}
                                        error={Boolean(touched.telefono) && Boolean(errors.telefono)}
                                        helperText={touched.telefono && errors.telefono}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneOutlined/>
                                                </InputAdornment>
                                            )
                                        }}
                                        placeholder="Teléfono"
                                        type="text"
                                        id="telefono"
                                        name="telefono"
                                        sx={{ width: "49%"}}
                                    />
                                    <FormControl sx={{ width: "49%"}}>
                                        <InputLabel id="rol_label">Rol</InputLabel>
                                        <Select
                                            labelId="rol_label"
                                            id="rol"
                                            label="Rol"
                                            margin="normal"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.id_rol}
                                            error={Boolean(touched.id_rol) && Boolean(errors.id_rol)}
                                            helperText={touched.id_rol && errors.id_rol}
                                            name="id_rol"
                                        >
                                            {
                                                roles.map((rol) => (
                                                    <MenuItem value={rol.id_rol}>{rol.rol}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </FlexBetween>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    width: "100%"
                                }}
                            >
                                <FlexBetween>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, width: "49%" }}
                                    >
                                        {!data ? "Adicionar" : "Modificar"}
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={() => navigate("/home/workers")}
                                        sx={{ mt: 3, width: "49%" }}
                                    >
                                        Cancelar
                                    </Button>
                                </FlexBetween>
                            </Box>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Paper>
    )
}

export default WorkerForm;