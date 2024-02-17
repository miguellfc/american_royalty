import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setWindow} from "../../../state/authStore.js";
import Requests from "./Requests.jsx";
import RequestForm from "./RequestForm.jsx";

const MainRequest = () => {

    const LIMIT = 10;

    const _window = useSelector((state) => state._window);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [dataEdit, setDataEdit] = useState(null);
    const [start, setStart] = useState(0);
    const [countPagging, setCountPagging] = useState(1);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [openNotification, setOpenNotification] = useState(false);
    const [typeNotification, setTypeNotification] = useState("success");
    const [notificationMessage, setNotificationMessage] = useState("");

    const getRequests = async () => {
        const response = await fetch('http://localhost:3030/request', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                start: start,
                limit: LIMIT
            })
        });
        const {count, data} = await response.json();

        setRequests(data);
        setCountPagging(count < LIMIT ? 1 : (count % LIMIT === 0 ? (count / LIMIT) : (Math.floor(count / LIMIT) + 1)));
    }
    const createRequest = async (values, onSubmitProps) => {

        const createResponse = await fetch(`http://localhost:3030/request/create`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });
        const response = createResponse.ok;
        setDataEdit(null)

        setNotificationMessage(
            response
                ? 'La solicitud ha sido agregada satisfactoriamente!!'
                : 'Upss, ha ocurrido un error al agregar la solicitud!!'
        );
        setTypeNotification(response ? 'success' : 'error');
        setOpenNotification(true);

        if (response) {
            getRequests();
            onSubmitProps.resetForm();
            navigate("/home");
        }
    }
    const updateRequest = async (values, onSubmitProps) => {
        const { id_solicitud } = values;
        const updateResponse = await fetch(`http://localhost:3030/request/update/${id_solicitud}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });
        const response = updateResponse.ok;
        setDataEdit(null)

        setNotificationMessage(
            response
                ? 'La solicitud ha sido modificada satisfactoriamente!!'
                : 'Upss, ha ocurrido un error al modificar la solicitud!!'
        );
        setTypeNotification(response ? 'success' : 'error');
        setOpenNotification(true);

        getRequests();
        if (response) {
            onSubmitProps.resetForm();
            navigate("/home");
        }
    }
    const deleteRequest = async (selections) => {
        const result = await fetch(`http://localhost:3030/request/delete/${selections}`, {
            method: "DELETE"
        });
        const response = result.ok;

        setNotificationMessage(
            response
                ? `${selections.length > 1
                    ? 'Las solicitudes han sido eliminadas satisfactoriamente!!'
                    : 'La solicitud ha sido eliminada satisfactoriamente!!'}`
                : `Upss, ha ocurrido un error al intentar eliminar ${selections.length > 1
                    ? 'las solicitudes seleccionadas!!'
                    : 'la solicitud!!'}`
        );
        setTypeNotification(response ? 'success' : 'error');
        setOpenNotification(true);

        getRequests();
        setSelected([]);
        navigate("/home");
    }

    useEffect(() => {
        dispatch(setWindow({_window: 'requests'}));
    }, []);
    useEffect(() => {
        setStart(page !== 1 ? page * LIMIT - LIMIT : 0)
    }, [page]);
    useEffect(() => {
        getRequests();
    }, [start]);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Requests
                            limit={LIMIT}
                            requests={requests}
                            deleteRequest={deleteRequest}
                            page={page}
                            setPage={setPage}
                            countPagging={countPagging}
                            selected={selected}
                            setSelected={setSelected}
                            setOpenNotification={setOpenNotification}
                            notificationMessage={notificationMessage}
                            openNotification={openNotification}
                            typeNotification={typeNotification}
                            setDataEdit={setDataEdit}
                        />
                    }
                />
                <Route
                    path="create"
                    element={
                        <RequestForm
                            data={dataEdit}
                            create={createRequest}
                            update={updateRequest}
                        />
                    }
                />
                <Route
                    path="edit/:id"
                    element={
                        <RequestForm
                            data={dataEdit}
                            create={createRequest}
                            update={updateRequest}
                        />
                    }
                />
            </Routes>
        </>
    )
}

export default MainRequest;