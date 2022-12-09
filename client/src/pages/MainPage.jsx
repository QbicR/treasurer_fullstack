import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';
import Operations from '../components/operations/Operations';
import Cards from '../components/cards/Cards';
import Charts from '../components/charts/Charts';
import classes from './Pages.module.css'
import { getCards, loadCardList } from '../store/cards';
import { getOperations, loadOperationList } from '../store/operations';
import { loadUser } from '../store/user';

const MainPage = () => {
    const token = localStorage.getItem('token')
    const { id } = jwt_decode(token)

    const dispatch = useDispatch()

    const operations = useSelector(getOperations())
    const cards = useSelector(getCards())

    useEffect(() => {
        dispatch(loadUser(id))
        dispatch(loadOperationList(id))
        dispatch(loadCardList(id))
    }, [])

    return (
        <div >
            <div className={classes.main_page}>
                <Operations
                    operations={operations}
                    cards={cards}
                />
                <Cards
                    cards={cards}
                    userId={id}
                />
            </div>
            <Charts
                operations={operations} />
        </div>
    );
}

export default MainPage;