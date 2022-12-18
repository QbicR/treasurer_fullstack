import { observer } from 'mobx-react-lite';
import React from 'react';
import PropTypes from 'prop-types'
import classes from './History.module.scss'

const types = [
    { id: 1, name: 'Пополнение', type: 'replenishment' },
    { id: 2, name: 'Списание', type: 'writeОff' },
]

const OperationFilter = observer(({ setSelectedType, operationHistoryType, setOperationHistoryType }) => {

    const handleSelectType = (type) => {
        setOperationHistoryType(type)
        setSelectedType(type)
    }

    return (
        <div>
            {types.map(type => (
                <div className={classes.operation_type_filter} key={type.id}>
                    <button
                        key={type.id}
                        className={operationHistoryType === type.type ? classes.history_filter_btn_active : classes.history_filter_btn}
                        onClick={() => handleSelectType(type.type)}
                    >
                        {type.name}
                    </button>
                </div>

            ))}
        </div>
    );
});

OperationFilter.propTypes = {
    setSelectedType: PropTypes.func,
    operationHistoryType: PropTypes.string,
    setOperationHistoryType: PropTypes.func
}

export default OperationFilter;