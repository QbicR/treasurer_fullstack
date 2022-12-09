import { observer } from 'mobx-react-lite';
import React from 'react';
import CardFilter from './CardFilter';
import OperationFilter from './OperationFilter';
import PropTypes from 'prop-types'
import classes from './History.module.css'

const HistoryFilter = observer(({
    setCurrentPage,
    setFilter,
    filter,
    cards,
    setSelectedCard,
    cardHistoryId,
    setCardHistoryId,
    setSelectedType,
    handleReset,
    operationHistoryType,
    setOperationHistoryType,
}) => {


    const handleSearch = (event) => {
        setCurrentPage(1)
        setFilter({ ...filter, search: event.target.value })
    }

    return (
        <div className={classes.history_filter}>
            <div className={classes.search}>
                <input
                    value={filter.search}
                    onChange={event => handleSearch(event)}
                />
                <label>Поиск</label>
            </div>
            <div className={classes.history_type_filter}>
                <div>
                    <CardFilter
                        cards={cards}
                        setSelectedCard={setSelectedCard}
                        cardHistoryId={cardHistoryId}
                        setCardHistoryId={setCardHistoryId}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <div>
                    <OperationFilter
                        setSelectedType={setSelectedType}
                        operationHistoryType={operationHistoryType}
                        setOperationHistoryType={setOperationHistoryType}
                    />
                </div>
                <button
                    className={classes.history_filter_btn}
                    onClick={() => handleReset()}
                >
                    Сброс
                </button>
            </div>
        </div>
    );
});

HistoryFilter.propTypes = {
    cards: PropTypes.array,
    setSelectedCard: PropTypes.func,
    setSelectedType: PropTypes.func,
    handleReset: PropTypes.func,
    setFilter: PropTypes.func,
    filter: PropTypes.object,
    operationHistoryType: PropTypes.string,
    setOperationHistoryType: PropTypes.func,
    cardHistoryId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    setCardHistoryId: PropTypes.func
}

export default HistoryFilter;