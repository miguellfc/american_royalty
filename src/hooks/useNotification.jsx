import React, {useState} from "react";

const useNotification = () => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('success');
    const [notification, setNotification] = useState('');

    const controlNotification = ({_notification, _type, _open}) => {
        if (_notification !== null )
            setNotification(_notification);

        if (_type !== null)
            setType(_type);

        if (_open !== null)
            setOpen(_open);
    }

    return [open, type, notification, controlNotification]
}

export default useNotification;