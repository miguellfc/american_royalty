import {Pagination} from "@mui/material";

const PaginationBar = ({ totalPages, page, setPage }) => {

    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={(event, actualPage) => setPage(actualPage)}
            size="large"
            color="primary"
            shape="rounded"
            variant="outlined"
        />
    )
}

export default PaginationBar