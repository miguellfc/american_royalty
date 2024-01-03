import {People, Storage, HomeRepairService, Groups3, BarChart} from "@mui/icons-material";
// import {makeStyles} from "@mui/material";

export const mainItems = [
    {
        index: 'charts',
        route: 'charts',
        primary: "Dashboard",
        icon: <BarChart/>
    },
    {
        index: 'requests',
        route: 'requests',
        primary: "Solicitudes",
        icon: <Storage/>
    },
    {
        index: 'trabajadores',
        route: 'workers',
        primary: "Trabajadores",
        icon: <People/>
    },
    {
        index: 'services',
        route: 'services',
        primary: 'Servicios',
        icon: <HomeRepairService/>
    }
];

// TODO: para cambiar el estilo de la barra scroll
// export const useStyles = makeStyles((theme) => ({
//     root: {
//         "&::-webkit-scrollbar": {
//             width: 7
//         },
//         "&::-webkit-scrollbar-track": {
//             boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`
//         },
//         "&::-webkit-scrollbar-thumb": {
//             backgroundColor: "darkgrey",
//             outline: `1px solid slategray`
//         }
//     }
// }))