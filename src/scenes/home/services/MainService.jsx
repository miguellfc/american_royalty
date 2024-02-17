import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {setWindow} from "../../../state/authStore.js";
import Services from "./Services.jsx";
import ServiceForm from "./ServiceForm.jsx";

const MainService = () => {

    const LIMIT = 10;

    const _window = useSelector((state) => state._window);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [dataEdit, setDataEdit] = useState(null);
    const [selected, setSelected] = useState([]);
    const [start, setStart] = useState(0);
    const [countPagging, setCountPagging] = useState(1);
    const [page, setPage] = useState(1);
    const [openNotification, setOpenNotification] = useState(false);
    const [typeNotification, setTypeNotification] = useState('success');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [total, setTotal] = useState([]);

    const getServices = async () => {
        const request = await fetch(`http://localhost:3030/services`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                start: start,
                limit: LIMIT,
            })
        });

        const {count, data} = await request.json();

        setServices(data);
        setCountPagging(count < LIMIT ? 1 : (count % LIMIT === 0 ? (count / LIMIT) : (Math.floor(count / LIMIT) + 1)));
    }
    const createService = async (values, onSubmitProps) => {

        const createResponse = await fetch(`http://localhost:3030/services/create`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });
        const response = createResponse.ok;

        setNotificationMessage(response
            ? 'Se ha agregado satisfactoriamente un nuevo servicio!!'
            : 'Upss, ha ocurrido un error al agregar un nuevo servicio!!'
        );
        setTypeNotification(response ? 'success' : 'error');
        setOpenNotification(true);

        if (response) {
            await getServices();
            onSubmitProps.resetForm();
            navigate("/home/services");
        }
    }
    const updateService = async (values, onSubmitProps) => {

        const { id_servicio } = values;

        const updateResponse = await fetch(`http://localhost:3030/services/update/${id_servicio}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });
        const response = updateResponse.ok;
        setDataEdit(null);

        setNotificationMessage(response
            ? 'El servicio ha sido modificado satisfactoriamente!!'
            : 'Upss, ha ocurrido un error al modifiar el servicio!!'
        );
        setTypeNotification(response ? 'success' : 'error');
        setOpenNotification(true);

        if (response) {
            await getServices();
            onSubmitProps.resetForm();
            navigate("/home/services");
        }
    }
    const deleteServices = (selections) => {
        selections.map( async (service) => {
            const responseDelete = await fetch(`http://localhost:3030/services/delete/${service}`,{
                method: "DELETE"
            });
            const response = responseDelete.ok;

            setNotificationMessage(response
                ? `${selections.length > 1
                    ? 'Los servicios han sido eliminados satisfactoriamente!!'
                    : 'El servicioha sido eliminado satisfactoriamente!!'}`
                : `Upss, ha ocurrido un error al eliminar ${selections.length > 1
                    ? 'los servicios!!'
                    : 'el servicio!!'}`
            );
            setTypeNotification(response ? 'success' : 'error');
            setOpenNotification(true);

            await getServices();
            response && setSelected([]);
        })
    }

    useEffect(() => {
        dispatch(setwindow({_window: 'services'}));
    },[]);
    useEffect(() => {
        getServices();
    },[start]);
    useEffect(() => {
        setStart(page !== 1 ? page * LIMIT - LIMIT : 0)
    },[page]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Services
                        limit={LIMIT}
                        services={services}
                        deleteServices={deleteServices}
                        page={page}
                        setPage={setPage}
                        countPagging={countPagging}
                        selected={selected}
                        setSelected={setSelected}
                        setOpenNotification={setOpenNotification}
                        notificationMessage={notificationMessage}
                        openNotification={openNotification}
                        typeNotification={typeNotification}
                        setDateEdit={setDataEdit}
                        total={total}
                    />
                }
            />
            <Route
                path="create"
                element={
                    <ServiceForm
                        create={createService}
                        update={updateService}
                    />
                }
            />
            <Route
                path="edit/:id"
                element={
                    <ServiceForm
                        create={createService}
                        update={updateService}
                        data={dataEdit}
                    />
                }
            />
        </Routes>
    )
}

export default MainService;