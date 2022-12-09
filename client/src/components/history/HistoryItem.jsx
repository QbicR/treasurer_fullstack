import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ArrowDown, ArrowUp } from 'iconsax-react'
import Modal from '../UI/modal/Modal';
import jwt_decode from 'jwt-decode'
import PropTypes from 'prop-types'
import classes from './History.module.css'
import { useDispatch } from 'react-redux';
import { removeOperation } from '../../store/operations';

const HistoryItem = observer(({ operation, deleteOperationItem }) => {
    const [modal, setModal] = useState(false)
    const token = localStorage.getItem('token')
    const { id } = jwt_decode(token)

    const dispatch = useDispatch()

    const deleteOneOperation = () => {
        dispatch(removeOperation(operation.id, id))
        deleteOperationItem(operation.value, operation.cardId, operation.type);
    }

    return (
        <div className={classes.history_item}>
            {(operation.type === 'replenishment')
                ?
                <div className={classes.history_image}>
                    <ArrowDown size="60" color="#37d67a" variant="Bulk" />
                </div>
                :
                <div className={classes.history_image}>
                    <ArrowUp size="60" color="#f47373" variant="Bulk" />
                </div>
            }
            <div
                className={classes.history_item_info}
                onClick={() => setModal(true)}
            >
                <h1>
                    {operation.cardName}
                </h1>
                <div className={classes.history_type_info}>
                    {(operation.type === 'replenishment')
                        ?
                        <h5>{"Пополнение"}</h5>
                        :
                        <h5>{"Списание"}</h5>}
                    <p>{operation.category}</p>
                </div>
                <h2>{operation.value} ₽</h2>
            </div>
            <div>
                <button
                    className={classes.delete_history_item_btn}
                    onClick={deleteOneOperation}
                >
                    -
                </button>
            </div>
            <Modal
                visible={modal}
                setVisible={setModal}
            >
                <div className={classes.panel}>
                    <div className={classes.card}>
                        <div className={classes.card_value}>{operation.cardName}</div>
                        <div className={classes.card_create_date}>{operation.creationDate}</div>
                        <div className={classes.card_name_type}>
                            {(operation.type === 'replenishment')
                                ?
                                <div className={classes.card_name}>Пополнение {operation.value} ₽</div>
                                :
                                <div className={classes.card_name}>Списание {operation.value} ₽</div>}
                            <div className={classes.card_type}>{operation.category}</div>
                        </div>
                    </div>
                    {(operation.comment !== '') &&
                        <div className={classes.card_comment}>Комментарий: {operation.comment}</div>
                    }
                </div>
            </Modal>
        </div >
    )
});

HistoryItem.propTypes = {
    operations: PropTypes.object,
    deleteOperationItem: PropTypes.func,
    userId: PropTypes.number
}

export default HistoryItem;