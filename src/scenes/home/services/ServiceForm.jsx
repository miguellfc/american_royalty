import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import FlexBetween from "../../../components/FlexBetween.jsx";
import {Formik} from "formik";
import * as yup from "yup";

const serviceSchema = yup.object().shape({
    servicio: yup.string().required("This file is required"),
    tipo_servicio: yup.string().required("This file is required"),
    precio: yup.number().positive().required("This field is required")
});

let initialService = {
    servicio: '',
    tipo_servicio: '',
    precio: 0
};

const ServiceForm = ({ create, update, data = null }) => {

    const theme = useTheme();
    const navigate = useNavigate();
    const [typeServices, setTypeServices] = useState([]);

    const handleFormSubmit = async (values, onSubmitProps) => {
        data
            ? await update(values, onSubmitProps)
            : await create(values, onSubmitProps)
    }

    const getTypeServices = async () => {
        const tipos = await fetch(`http://localhost:3030/typeservice`,{ method: "GET" });

        const data = await tipos.json();

        setTypeServices(data);
    }

    useEffect(() => {
        getTypeServices();
    }, []);

    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                top: '50%',
                left: '50%',
                width: '100%'
            }}
        >
            <Box sx={{ width: 500, my: 5}}>
                <FlexBetween>
                    <Typography component="h1" variant="h3" fullWidth>
                        {!data ? "Adicionar" : "Modificar"} trabajador
                    </Typography>
                </FlexBetween>
                <Formik
                    initialValues={data ? data : initialService}
                    onSubmit={handleFormSubmit}
                    validationSchema={serviceSchema}
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
                            <FlexBetween>
                                <TextField
                                    margin="normal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.servicio}
                                    error={Boolean(touched.servicio) && Boolean(errors.servicio)}
                                    helperText={touched.servicio && touched.servicio}
                                    id="servicio"
                                    label="Nombre de servicio"
                                    name="servicio"
                                    sx={{ width: "49%" }}
                                />
                                <TextField
                                    type="number"
                                    margin="normal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.precio}
                                    error={Boolean(touched.precio) && Boolean(errors.precio)}
                                    helperText={touched.precio && touched.precio}
                                    id="precio"
                                    label="Precio"
                                    name="precio"
                                    sx={{ width: "49%" }}
                                />
                            </FlexBetween>
                            <TextField
                                select
                                fullWidth
                                labelId="tiposervicio_label"
                                id="tiposervicio"
                                label="Tipo de servicio"
                                margin="normal"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.tipo_servicio}
                                error={Boolean(touched.tipo_servicio) && Boolean(errors.tipo_servicio)}
                                helperText={touched.tipo_servicio && errors.tipo_servicio}
                                name="tipo_servicio"
                            >
                                {
                                    typeServices.map((t_servicio) => (
                                        <MenuItem value={t_servicio.tipo_servicio}>{t_servicio.nombre_ts}</MenuItem>
                                    ))
                                }
                            </TextField>
                            <FlexBetween>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, width: "49%"}}
                                >
                                    {!data ? "Adicionar" : "Modificar"}
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => navigate("/home/services")}
                                    sx={{ mt: 3, width: "49%"}}
                                >
                                    Cancelar
                                </Button>
                            </FlexBetween>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Paper>
    )
}

export default ServiceForm;