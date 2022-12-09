import React from 'react';
import { observer } from 'mobx-react-lite';
import HistoryItem from './HistoryItem';
import PropTypes from 'prop-types'

const HistoryList = observer(({ operations, deleteOperationItem, userId }) => {

    return (
        <div>
            {operations?.map((operation) =>
                <HistoryItem
                    key={operation.id}
                    deleteOperationItem={deleteOperationItem}
                    operation={operation}
                    userId={userId}
                />
            )}
        </div>
    );
});

HistoryList.propTypes = {
    operations: PropTypes.array,
    deleteOperationItem: PropTypes.func,
    userId: PropTypes.number
}

export default HistoryList;