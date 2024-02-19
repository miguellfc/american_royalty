import React, {useEffect, useState} from "react";

const usePagination = () => {
    const [start, setStart] = useState(0);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);

    useEffect(() => {
        setStart(page !== 1 ? page * limit - limit : 0);
    }, [page]);

    const controlPagination = ({ _start, _limit, _page, _total }) => {
        if (_start !== undefined)
            setStart(_start);

        if (_limit !== undefined)
            setLimit(_limit);

        if (_page !== undefined)
            setPage(_page);

        if (_total !== undefined)
            setTotal(_total < limit ? 1 : (_total % limit === 0 ? (_total / limit) : (Math.floor(_total / limit) + 1)));
    }

    return [start, limit, page, total, controlPagination];
}

export default usePagination;