import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import TopSeller from "../../components/TopSeller.jsx";

export const TopSellers = () => {

    const [users, setUsers] = useState([]);
    const colors = ["#FFBF00", "#BEBEBE", "#CD7F32", "#1F83DD", "#F23E9C"];

    const getUsers = async () => {
        const resultUsers = await fetch('http://localhost:3030/user/sellers',{
            method: "GET"
        });
        const result = await resultUsers.json();

        setUsers(result);
    }

    useEffect(() => {
        getUsers();
    },[]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'space-between',
                height: 300,
                p: 0
            }}
        >
            {
                users.length > 0 && users.map((user, index) => <TopSeller user={user} color={colors[index]} height={300/users.length} />)
            }
        </Box>
    )
}