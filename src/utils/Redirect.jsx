import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = ({ to }) => {

    let navigate = useNavigate()

    useEffect(() => {
        navigate(to)
    })

    return null
}

export default Redirect