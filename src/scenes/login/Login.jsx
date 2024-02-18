import { useState} from "react";
import {
    Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Tooltip,
    Grid, IconButton, InputAdornment, Paper, TextField, Typography, useMediaQuery, useTheme
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/authStore.js";
import Copyright from "../../components/Copyright.jsx";
import { images } from "../../assets/background/image.js";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("This field is required"),
    password: yup.string().required("This field is required")
})

const initialLogin = {
    email: '',
    password: ''
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}

const Login = () => {

    const image = `url(${images[getRandomInt(0, images.length)]})`

    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const login = async (values, onSubmitProps) => {

        const loggedInResponse = await fetch("http://localhost:3030/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        const loggedIn = await loggedInResponse.json()
        onSubmitProps.resetForm()

        if (loggedIn) {
            dispatch(setLogin({
                user: loggedIn.user,
                token: loggedIn.token
            }))
            navigate("/home")
        }
    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        await login(values, onSubmitProps)
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: image,
                    backgroundRepeat: 'no-repeat',
                    // backgroundColor: (t) =>
                    //     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Formik
                        initialValues={initialLogin}
                        onSubmit={handleFormSubmit}
                        validationSchema={loginSchema}
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
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoFocus
                                />
                                <TextField
                                    InputProps={{
                                        endAdornment:
                                        <InputAdornment position="end">
                                            <Tooltip title={showPassword ? 'Hide Password' : 'Show Password'}>
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    }}
                                    margin="normal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remind me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.background.alt,
                                        "&:hover": {
                                            color: theme.palette.background.default
                                        }
                                    }}
                                >
                                    Sign In
                                </Button>
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        )}
                    </Formik>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login