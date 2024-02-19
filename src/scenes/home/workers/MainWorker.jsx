import {Snackbar, Alert} from "@mui/material";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setWindow} from "../../../state/authStore.js";
import urlConfig from "../../../url.config.json";
import Workers from "./Workers.jsx";
import WorkerForm from "./WorkerForm.jsx";
import BottomNotification from "../../../components/BottomNotification.jsx";
import useNotification from "../../../hooks/useNotification.jsx";
import usePagination from "../../../hooks/usePagination.jsx";

const MainWorker = () => {

    const config = urlConfig.config
    const _window = useSelector((state) => state._window);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [workers, setWorkers] = useState([]);
    const [search, setSearch] = useState('');
    const [role, setRole] = useState(-1);
    const [dataEdit, setDataEdit] = useState(null);
    const [selected, setSelected] = useState([]);
    const [start,limit,page,total,controlPagination] = usePagination();
    const [_open,_type,_notification,controlNotification] = useNotification();

    const getWorkers = async () => {
        const request = await fetch(`${config.url}/user/list?page=${page}&limit=${limit}&search=${search}&role=${role}`,{
            method: "GET"
        });

        const {count, data} = await request.json();

        setWorkers(data);
        controlPagination({ _total: count });
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

        const options = {
            _notification: response
                ? 'El usuario ha sido agregado satisfactoriamente!!'
                : 'Upss, ha ocurrido un error al agregar el usuario!!',
            _type: response ? 'success' : 'error',
            _open: true
        }
        controlNotification(options);

        if (response) {
            getWorkers();
            onSubmitProps.resetForm();
            navigate("/home/workers")
        }
    }
    const updateWorker = async (values, onSubmitProps) => {

        const {id_usuario} = values;

        const formData = {};
        for (let key in values) {
            if (key === 'foto' && typeof values[key] === "string") {
                continue;
            }
            formData[key] = values[key];

        }
        formData.fotoPath = typeof values.foto !== "string" ? values.foto.name : values.foto;

        const updateResponse = await fetch(`${config.url}/user/update/${id_usuario}`, {
            method: "PATCH",
            body: JSON.stringify(formData)
        });
        const response = updateResponse.ok;

        const options = {
            _notification: response
                ? 'El usuario ha sido modificado satisfactoriamente!!'
                : 'Upss, ha ocurrido un error al modificar el usuario!!',
            _type: response ? 'success' : 'error',
            _open: true
        }
        controlNotification(options);

        if (response) {
            getWorkers();
            setDataEdit(null);
            onSubmitProps.resetForm();
            navigate("/home/workers");
        }
    }
    const deleteWorkers = async (selections) => {
        const result = await fetch(`${config.url}/user/delete/${selections}`, {
            method: "DELETE"
        });
        const response = result.ok;

        const options = {
            _notification: response
                ? `${selections.length > 1
                    ? 'Los usuarios han sido eliminados satisfactoriamente!!'
                    : 'El usuario ha sido eliminado satisfactoriamente!!'}`
                : `Upss, ha ocurrido un error al eliminar ${selections.length > 1
                    ? 'los usuarios!!'
                    : 'el usuario!!'}`,
            _type: response ? 'success' : 'error',
            _open: true
        }
        controlNotification(options);

        if (response) {
            await getWorkers();
            setSelected([]);
        }
    }

    useEffect(() => {
        dispatch(setWindow({_window: 'workers'}));
    }, []);
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
                            workers={workers}
                            deleteWorkers={deleteWorkers}
                            page={page}
                            limit={limit}
                            total={total}
                            controlPagination={controlPagination}
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
                notificationMessage={_notification}
                typeNotification={_type}
                openNotification={_open}
                setOpenNotification={controlNotification}
            />
        </>
    )
}

export default MainWorker;