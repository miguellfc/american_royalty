import {Box, Button, Modal, Typography, useTheme} from "@mui/material";
import FlexBetween from "./FlexBetween.jsx";
import {AttachMoney, Close} from "@mui/icons-material";
import {useState} from "react";
import {useSelector} from "react-redux";

const ModalDelete = ({openModal, handleModal, deleteData, message, data = []}) => {

    const theme = useTheme()

    const erase = () => {
        deleteData(data)

        handleModal()
    }

    return (
        <Modal
            open={openModal}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                border: '1px solid inherit',
                borderRadius: 1,
                boxShadow: 24,
                pt: 2,
                px: 4,
                pb: 3,
                width: 500
            }}>
                <Typography component="h1" variant="h3" fullWidht>
                    Eliminar
                </Typography>
                <Typography sx={{mt: 5, fontSize: 17}}>
                    {message}
                </Typography>
                <FlexBetween
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            mt: 5,
                            mb: 2,
                            px: 2,
                            marginRight: 2,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.background.alt,
                            "&:hover": {
                                color: theme.palette.background.default
                            }
                        }}
                        onClick={erase}
                    > Aceptar </Button>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 5,
                            mb: 2,
                            px: 2,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.background.alt,
                            "&:hover": {
                                color: theme.palette.background.default
                            }
                        }}
                        onClick={() => handleModal()}
                    > Cancelar </Button>
                </FlexBetween>
            </Box>
        </Modal>
    )
}

export default ModalDelete