import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ArrowDown, ArrowUp } from 'iconsax-react'
import Modal from '../UI/modal/Modal';
import PropTypes from 'prop-types'
import classes from './Operations.module.css'
import { useDispatch } from 'react-redux';
import { removeOperation } from '../../store/operations';
import jwt_decode from 'jwt-decode'

const OperationItem = observer(({ operation, deleteOperationItem }) => {
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()

    const token = localStorage.getItem('token')
    const { id } = jwt_decode(token)

    const deleteOneOperation = () => {
        dispatch(removeOperation(operation.id, id))
        deleteOperationItem(operation.cardId, operation.value);
    }

    let operationName
    (operation.type === "writeОff") ? operationName = 'Списание' : operationName = 'Пополнение'

    return (
        <div className={classes.operation_item}>
            {(operation.type === 'replenishment')
                ?
                <div className={classes.operation_image}>
                    <ArrowDown size="50" color="#37d67a" variant="Bulk" />
                </div>
                :
                <div className={classes.operation_image}>
                    <ArrowUp size="50" color="#f47373" variant="Bulk" />
                </div>
            }
            <div
                className={classes.operation_info}
                onClick={() => setModal(true)}
            >
                <div className={classes.operation_type_info}>
                    <h5>{operationName}</h5>
                    <p>{operation.category}</p>
                </div>
                <div className={classes.operation_value_info}>
                    <h4>{operation.value} ₽</h4>
                </div>
            </div>
            <div>
                {deleteOperationItem !== undefined &&
                    <button
                        className={classes.delete_operation_btn}
                        onClick={deleteOneOperation}
                    >
                        -
                    </button>
                }
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
                        <div className={classes.card_comment}>Комментарий: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni corrupti facere dolores. Doloribus at praesentium consequatur culpa! Porro, voluptatibus dolore?</div>
                    }
                </div>
            </Modal>
        </div >
    );
});

OperationItem.propTypes = {
    operation: PropTypes.object,
    deleteOperationItem: PropTypes.func
}

export default OperationItem;