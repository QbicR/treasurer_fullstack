import React from 'react';
import { observer } from 'mobx-react-lite';
import OperationItem from './OperationItem';
import PropTypes from 'prop-types'

const OperationsList = observer(({ operationsList, deleteOperationItem }) => {

    return (
        <div>
            {operationsList?.map((operation) =>
                <OperationItem
                    key={operation.id}
                    deleteOperationItem={deleteOperationItem}
                    operation={operation}
                />
            )}
        </div >
    );
});

OperationsList.propTypes = {
    operationsList: PropTypes.array,
    deleteOperationItem: PropTypes.func
}

export default OperationsList;