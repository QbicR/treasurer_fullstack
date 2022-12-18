import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import OperationsList from './OperationsList';
import OperationForm from './OperationForm';
import PropTypes from 'prop-types'
import classes from './Operations.module.scss'

const OperationWithMoney = observer(({
    operationsList,
    operation,
    deleteOperationItem,
    cards,
    type,
}) => {
    const [modal, setModal] = useState(false)
    const [categoryActive, setCategoryActive] = useState('')
    const [cardActive, setCardActive] = useState('')
    const [value, setValue] = useState('')
    const [comment, setComment] = useState('')

    operationsList?.sort((x, y) => y.id - x.id)

    const closeModal = () => {
        setModal(false)
    }

    const rootClasses = [classes.modal_window]

    if (modal) {
        rootClasses.push(classes.active)
    }

    const handleCloseModal = () => {
        setModal(false)
        setCategoryActive('')
        setCardActive('')
        setValue('')
        setComment('')
    }

    return (
        <>
            <div className={classes.operation_type}>
                {type === 'replenishment' ?
                    <h4>Пополнения</h4>
                    :
                    <h4>Списания</h4>
                }
                <div>
                    <button
                        className={classes.add_operation_btn}
                        onClick={() => setModal(true)}
                    >
                        +
                    </button>
                </div>
            </div>
            <div>
                <OperationsList
                    deleteOperationItem={deleteOperationItem}
                    operationsList={operationsList}
                />
            </div>
            <div className={rootClasses.join(' ')} onClick={() => handleCloseModal()}>
                <div onClick={(event) => event.stopPropagation()}>
                    <OperationForm
                        modal={closeModal}
                        type={type}
                        cards={cards}
                        operation={operation}
                        categoryActive={categoryActive}
                        setCategoryActive={setCategoryActive}
                        cardActive={cardActive}
                        setCardActive={setCardActive}
                        value={value}
                        setValue={setValue}
                        comment={comment}
                        setComment={setComment}
                    />
                </div>
            </div>
        </>
    );
});

OperationWithMoney.propTypes = {
    operationsList: PropTypes.array,
    operation: PropTypes.func,
    deleteOperationItem: PropTypes.func,
    cards: PropTypes.array,
    type: PropTypes.string
}

export default OperationWithMoney;