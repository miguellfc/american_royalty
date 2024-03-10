import {
    Route, Routes, useNavigate
} from "react-router-dom";
import {useEffect, useState} from "react";
import Requests from "./Requests.jsx";
import RequestForm from "./RequestForm.jsx";
import urlConfig from "../../../url.config.json";
import usePagination from '../../../hooks/usePagination.jsx';
import useNotification from '../../../hooks/useNotification.jsx';
import BottomNotification from "../../../components/BottomNotification.jsx";

const MainRequest = () => {

    const config = urlConfig.config;
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [dataEdit, setDataEdit] = useState(null);
    const [selected, setSelected] = useState([]);
    const [filter, setFilter] = useState({
        search: ''
    })
    const [start, limit, page, total, controlPagination] = usePagination();
    const [_open, _type, _notification, controlNotification] = useNotification();

    const getRequests = async () => {
        const response = await fetch(`${config.url}/request`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                start: start,
                limit,
            })
        });
        const {count, data} = await response.json();

        setRequests(data);
        controlPagination(count);
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

        controlNotification({
            _notification: response
                ? 'La solicitud ha sido creada satisfactoriamente!!'
                : 'Upss, ha ocurrido un error al agregar la solicitud!!',
            _type: response ? 'success' : 'error',
            _open: true
        });

        if (response) {
            await getRequests();
            onSubmitProps.resetForm();
            navigate("/home/requests");
            setDataEdit(null)
        }
    }
    const updateRequest = async (values, onSubmitProps) => {
        const { id_solicitud } = values;
        const updateResponse = await fetch(`${config.url}/request/update/${id_solicitud}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });
        const response = updateResponse.ok;

        controlNotification({
            _notification: response
                ? 'La solicitud ha sido modificada satisfactoriamente!!'
                : 'Upss, ha ocurrido un error al modificar la solicitud!!',
            _type: response ? 'success' : 'error',
            _open: true
        });

        if (response) {
            await getRequests();
            onSubmitProps.resetForm();
            setDataEdit(null)
            navigate("/home/requests");
        }
    }
    const deleteRequest = async (selections) => {
        const result = await fetch(`${config.url}/request/delete/${selections}`, {
            method: "DELETE"
        });
        const response = result.ok;

        controlNotification({
            _notification: response
                ? `${selections.length > 1
                    ? 'Las solicitudes han sido eliminadas satisfactoriamente!!'
                    : 'La solicitud ha sido eliminada satisfactoriamente!!'}`
                : `Upss, ha ocurrido un error al intentar eliminar ${selections.length > 1
                    ? 'las solicitudes seleccionadas!!'
                    : 'la solicitud!!'}`,
            _open: response ? 'success' : 'error',
            _type: true
        });

        if (response) {
            await getRequests();
            setSelected([]);
        }
    }

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
                            requests={requests}
                            deleteRequest={deleteRequest}
                            page={page}
                            limit={limit}
                            total={total}
                            controlPagination={controlPagination}
                            selected={selected}
                            setSelected={setSelected}
                            setDataEdit={setDataEdit}
                            filter={filter}
                            setFilter={setFilter}
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
            <BottomNotification
                notificationMessage={_notification}
                typeNotification={_type}
                openNotification={_open}
                setOpenNotification={controlNotification}
            />
        </>
    )
}

export default MainRequest;