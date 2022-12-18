import React from 'react';
import { observer } from 'mobx-react-lite';
import OperationWithMoney from './OperationWithMoney';
import PropTypes from 'prop-types'
import classes from './Operations.module.scss'
import { useDispatch } from 'react-redux';
import { updateCard } from '../../store/cards';

const Operations = observer(({ operations, cards }) => {
    const dispatch = useDispatch()

    const addMoneyOperation = (newOperation) => {
        cards.forEach((card) => {
            if (card.id === newOperation.cardId) {
                const value = { value: card.value + newOperation.value }
                dispatch(updateCard(newOperation.cardId, value))
            }
        })
    }

    const removeMoneyOperation = (newOperation) => {
        cards.forEach((card) => {
            if (card.id === newOperation.cardId) {
                const value = { value: card.value - newOperation.value }
                dispatch(updateCard(newOperation.cardId, value))
            }
        })
    }

    const deleteAddMoneyOperation = (cardId, operValue) => {
        cards.forEach((card) => {
            if (card.id === cardId) {
                const value = { value: card.value - operValue }
                dispatch(updateCard(card.id, value))
            }
        })
    }

    const deleteRemoveMoneyOperation = (cardId, operValue) => {
        cards.forEach((card) => {
            if (card.id === cardId) {
                const value = { value: card.value + operValue }
                dispatch(updateCard(card.id, value))
            }
        })
    }

    const operationsAdd = operations
        ?.filter(operation => operation.type === 'replenishment')
        .slice(0, 5)

    const operationsRemove = operations
        ?.filter(operation => operation.type === 'writeОff')
        .slice(0, 5)

    return (
        <div className={classes.operations}>
            <div className={classes.operation_card}>
                <OperationWithMoney
                    operationsList={operationsAdd}
                    operation={addMoneyOperation}
                    deleteOperationItem={deleteAddMoneyOperation}
                    cards={cards}
                    type={'replenishment'}
                />
            </div>
            <div className={classes.operation_separator}></div>
            <div className={classes.operation_card}>
                <OperationWithMoney
                    operationsList={operationsRemove}
                    operation={removeMoneyOperation}
                    deleteOperationItem={deleteRemoveMoneyOperation}
                    cards={cards}
                    type={'writeОff'}
                />
            </div>
        </div>
    );
})

Operations.propTypes = {
    operations: PropTypes.array,
    cards: PropTypes.array
}

export default Operations;
