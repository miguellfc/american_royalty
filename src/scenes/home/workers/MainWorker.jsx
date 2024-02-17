import {Snackbar, Alert} from "@mui/material";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setWindow} from "../../../state/authStore.js";
import urlConfig from "../../../url.config.json";
import Workers from "./Workers.jsx";
import WorkerForm from "./WorkerForm.jsx";
import BottomNotification from "../../../components/BottomNotification.jsx";

const MainWorker = () => {

    const LIMIT = 5;

    const config = urlConfig.config
    const _window = useSelector((state) => state._window);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [workers, setWorkers] = useState([]);
    const [search, setSearch] = useState('');
    const [role, setRole] = useState(-1);
    const [dataEdit, setDataEdit] = useState(null);
    const [start, setStart] = useState(0);
    const [countPagging, setCountPagging] = useState(1);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [openNotification, setOpenNotification] = useState(false);
    const [typeNotification, setTypeNotification] = useState('success');
    const [notificationMessage, setNotificationMessage] = useState('');

    const getWorkers = async () => {
        const request = await fetch(`${config.url}/user/list?page=${page}&limit=${LIMIT}&search=${search}&role=${role}`,{
            method: "GET"
        });

        const {count, data} = await request.json();

        setWorkers(data)
        setCountPagging(count < LIMIT ? 1 : (count % LIMIT === 0 ? (count / LIMIT) : (Math.floor(count / LIMIT) + 1)));
    }
    const createWorker = async (values, onSubmitProps) => {

        const formData = {};

        for (let key in values) {
            if (key === 'foto' && values[key] === '')
                continue;

            formData[key] = values[key];
        }

        formData.fotoPath = values.foto !== "" ? values.foto.name : values.foto;

        const createResponse = await fetch(`${config.url}/user/create`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const response = await createResponse.ok;

        setNotificationMessage(response
            ? 'El usuario ha sido agregado satisfactoriamente!!'
            : 'Upss, ha ocurrido un error al agregar el usuario!!'
        );
        setTypeNotification(response ? 'success' : 'error');
        setOpenNotification(true);

        if (response) {
            getWorkers();
            onSubmitProps.resetForm();
            navigate("/home/workers")
        }
    }
    const updateWorker = async (values, onSubmitProps) => {

        const {id_usuario} = values;

        const formData = new FormData();
        for (let value in values) {
            if (value === 'foto' && typeof values[value] === "string") {
                continue;
            }
            formData.append(value, values[value]);

        }
        formData.append('fotoPath', typeof values.foto !== "string" ? values.foto.name : values.foto);

        const updateResponse = await fetch(`${config.url}/user/update/${id_usuario}`, {
            method: "PATCH",
            body: formData
        });
        const response = updateResponse.ok;
        setDataEdit(null);

        setNotificationMessage(response
            ? 'El usuario ha sido modificado satisfactoriamente!!'
            : 'Upss, ha ocurrido un error al modificar el usuario!!'
        );
        setTypeNotification(response ? 'success' : 'error');
        setOpenNotification(true);

        if (response) {
            getWorkers();
            onSubmitProps.resetForm();
            navigate("/home/workers");
        }
    }
    const deleteWorkers = async (selections) => {
        const result = await fetch(`${config.url}/user/delete/${selections}`, {
            method: "DELETE"
        })
        const response = result.ok

        setNotificationMessage(response
            ? `${selections.length > 1
                ? 'Los usuarios han sido eliminados satisfactoriamente!!'
                : 'El usuario ha sido eliminado satisfactoriamente!!'}`
            : `Upss, ha ocurrido un error al eliminar ${selections.length > 1
                ? 'los usuarios!!'
                : 'el usuario!!'}`
        )
        setTypeNotification(response ? 'success' : 'error')
        setOpenNotification(true)

        await getWorkers()
        response && setSelected([])
    }

    useEffect(() => {
        dispatch(setWindow({_window: 'workers'}));
    }, []);
    useEffect(() => {
        setStart(page !== 1 ? page * LIMIT - LIMIT : 0)
    }, [page]);
    useEffect(() => {
        getWorkers()
    }, [start, search, role]);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Workers
                            limit={LIMIT}
                            workers={workers}
                            deleteWorkers={deleteWorkers}
                            page={page}
                            setPage={setPage}
                            countPagging={countPagging}
                            selected={selected}
                            setSelected={setSelected}
                            setDataEdit={setDataEdit}
                            search={search}
                            setSearch={setSearch}
                            setRole={setRole}
                        />
                    }
                />
                <Route
                    path="create"
                    element={
                        <WorkerForm
                            create={createWorker}
                            update={updateWorker}
                        />
                    }
                />
                <Route
                    path="edit/:id"
                    element={
                        <WorkerForm
                            data={dataEdit}
                            create={createWorker}
                            update={updateWorker}
                        />
                    }
                />
            </Routes>
            <BottomNotification
                notificationMessage={notificationMessage}
                typeNotification={typeNotification}
                openNotification={openNotification}
                setOpenNotification={setOpenNotification}
            />
        </>
    )
}

export default MainWorker;