import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Card } from 'iconsax-react'
import { CARD_ROUTE } from '../../utils/consts';
import PropTypes from 'prop-types'
import classes from './Cards.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { removeCard } from '../../store/cards';
import jwt_decode from 'jwt-decode'
import { getOperations, removeOperation } from '../../store/operations';

const CardItem = observer(({ cardInfo }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = localStorage.getItem('token')
    const { id } = jwt_decode(token)

    const operations = useSelector(getOperations())

    const deleteOneCard = () => {
        operations?.forEach(oper => {
            if (oper.cardId === cardInfo.id) {
                dispatch(removeOperation(oper.id, id))
            }
        })
        dispatch(removeCard(cardInfo.id, id))
    }

    return (
        <div className={classes.card_item}>
            <div className={classes.card_image} >
                <Card size="65" color="#dce775" variant="Bulk" />
            </div>
            <div
                className={classes.card_info}
                onClick={() => navigate(CARD_ROUTE + '/' + cardInfo.id)}
            >
                <div className={classes.card_type_info}>
                    <h5>{cardInfo.name}</h5>
                    <p>{cardInfo.type}</p>
                </div>
                <div className={classes.card_value_info}>
                    <h4>{cardInfo.value} ₽</h4>
                </div>
            </div>
            <div>
                <button
                    className={classes.delete_card_btn}
                    onClick={deleteOneCard}
                >
                    -
                </button>
            </div>
        </div >
    )
});

CardItem.propTypes = {
    cardInfo: PropTypes.object,
}

export default CardItem;