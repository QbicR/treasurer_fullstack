import React from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types'
import classes from './History.module.scss'

const HistoryPagination = observer(({ totalCount, limit, currentPage, setCurrentPage }) => {
    const pageCount = Math.ceil(totalCount / limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    const handleSetPage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className={classes.history_pagination}>
            {pages.map(page => (
                (pageCount > 1) && (
                    <div key={page} className={classes.pagination}>
                        <button
                            className={currentPage === page ? classes.page_btn_active : classes.page_btn}
                            key={page}
                            onClick={() => handleSetPage(page)}
                        >
                            {page}
                        </button>
                    </div>
                )
            ))}
        </div>
    );
});

HistoryPagination.propTypes = {
    totalCount: PropTypes.number,
    limit: PropTypes.number,
    pageHistory: PropTypes.number,
    setPageHistory: PropTypes.func
}

export default HistoryPagination;