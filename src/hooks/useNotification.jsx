import React, {useState} from "react";

const useNotification = () => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('success');
    const [notification, setNotification] = useState('');

    const controlNotification = ({_notification, _type, _open}) => {
        if (_notification !== undefined )
            setNotification(_notification);

        if (_type !== undefined)
            setType(_type);

        if (_open !== undefined)
            setOpen(_open);
    }

    return [open, type, notification, controlNotification]
}

export default useNotification;