import {useEffect, useRef, useState} from "react";
import {Box, Button, IconButton, Modal, Typography, useTheme} from "@mui/material";
import { Close } from "@mui/icons-material";
import FlexBetween from "./FlexBetween.jsx";
import {MapContainer, Marker, Tooltip, TileLayer, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {useStore} from "react-redux";
import {searchAddress} from "../utils/functions.js";

const Map = ({ address, setAddress, coord, setCoord }) => {

    const map = useMapEvents({
        click: async (event) => {
            const data = await searchAddress(event.latlng);

            const { road, residential, hamlet, town, city, house_number, county } = data.address;

            const {lat, lng} = event.latlng;

            setCoord({lat, lng});
            setAddress(`${road} #${house_number}, ${city || town || residential || hamlet}, ${county}`);
        }
    });

    return coord === null ? null : (
        <Marker position={coord}>
            <Tooltip>{address}</Tooltip>
        </Marker>
    )
}

const MapDirection = ({ openMap, handleOpenMap, address, setAddress, value, setFieldValue, type }) => {

    const theme = useTheme();
    const [coord, setCoord] = useState(value);
    const [auxAddress, setAuxAddress] = useState(address);

    const handleAccept = () => {
        setFieldValue('direccion', coord, true);
        setAddress(auxAddress);
        setAuxAddress("");
        handleOpenMap();
    }

    const handleClose = () => {
        setAuxAddress("");
        handleOpenMap();
    }

    return (
        <Modal open={openMap}>
            <Box
                sx={{
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
                    width: 900
                }}
            >
                <FlexBetween>
                    <Typography component="h1" variant="h3">
                        {coord ? "Modificar dirección" : "Seleccionar dirección"}
                    </Typography>
                    <IconButton onClick={() => handleClose()}>
                        <Close/>
                    </IconButton>
                </FlexBetween>
                <Box sx={{ height: 500, mt: 2}}>
                    <MapContainer center={address === '' ? [25.69008, -80.3801] : [coord.lat, coord.lng]} zoom={10} >
                        { type === 'select' && <Map address={auxAddress} setAddress={setAuxAddress} coord={coord} setCoord={setCoord}/> }
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[25.69008, -80.3801]}>
                            <Tooltip>American Royalty A/C</Tooltip>
                        </Marker>
                    </MapContainer>
                </Box>
                {
                    type === 'select' && (
                        <FlexBetween
                            sx={{
                                justifyContent: "flex-end"
                            }}
                        >
                            <Button
                                onClick={() => handleAccept()}
                                variant="container"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.background.alt,
                                    "&:hover": {
                                        backgroundColor: theme.palette.primary.light,
                                        color: theme.palette.background.default
                                    }
                                }}
                            >
                                {!value ? "Aceptar" : "Modificar"}
                            </Button>
                        </FlexBetween>
                    )
                }
            </Box>
        </Modal>
    )
}

export default MapDirection