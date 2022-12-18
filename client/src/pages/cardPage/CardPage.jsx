import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Charts from '../../components/charts/Charts';
import OperationsList from '../../components/operations/OperationsList';
import jwt_decode from 'jwt-decode'
import classes from './CardPage.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {getOperations, loadOperationList} from '../../store/operations';
import {getOneCard, loadCard} from '../../store/cards';

const CardPage = observer(() => {
    const {id: cardId} = useParams()
    const token = localStorage.getItem('token')
    const {id} = jwt_decode(token)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadOperationList(id, cardId))
        dispatch(loadCard(cardId))
    }, [])

    const card = useSelector(getOneCard())
    const operations = useSelector(getOperations())

    return (
        <div className={classes.card_page}>
            <div className={classes.card_page_card}>
                <div className={classes.card_info}>
                    {card &&
                        <div className={classes.panel}>
                            <div className={classes.card}>
                                <div className={classes.card_value}>{card.value} ₽</div>
                                <div className={classes.card_create_date}>{card.creationDate}</div>
                                <div className={classes.card_name_type}>
                                    <div className={classes.card_name}>{card.name}</div>
                                    <div className={classes.card_type}>{card.type}</div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className={classes.card_page_operations_card}>
                    <h4>Операции</h4>
                    <div className={classes.card_list}>
                        <OperationsList
                            operationsList={operations}
                        />
                    </div>
                </div>
            </div>
            <div className={classes.card_page_charts}>
                <Charts
                    operations={operations}
                />
            </div>
        </div>
    );
});

export default CardPage;