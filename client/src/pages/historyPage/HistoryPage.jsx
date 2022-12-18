import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import jwt_decode from 'jwt-decode'
import HistoryPagination from '../../components/history/HistoryPagination';
import HistoryList from '../../components/history/HistoryList';
import HistoryFilter from '../../components/history/HistoryFilter';
import classes from './HistoryPage.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCards, loadCardList, updateCard } from '../../store/cards';
import { getOperations, loadOperationList } from '../../store/operations';
import { paginate } from '../../utils/paginate';
import { search } from '../../utils/search';

const HistoryPage = observer(() => {
    const token = localStorage.getItem('token')
    const { id } = jwt_decode(token)

    const dispatch = useDispatch()
    const cards = useSelector(getCards())
    const operations = useSelector(getOperations())

    const [filter, setFilter] = useState({ search: '' })
    const [currentPage, setCurrentPage] = useState(1)
    const [operationHistoryType, setOperationHistoryType] = useState('')
    const [cardHistoryId, setCardHistoryId] = useState('')
    const [selectedCard, setSelectedCard] = useState(undefined)
    const [selectedType, setSelectedType] = useState(undefined)
    const limit = 7

    const searchedHistory = search(operations, filter.search)?.sort((x, y) => y.id - x.id)
    const operCrop = paginate(searchedHistory, currentPage, limit)

    useEffect(() => {
        dispatch(loadOperationList(id, selectedCard, selectedType))
        dispatch(loadCardList(id))
    }, [id, selectedCard, selectedType])

    const handleReset = () => {
        setCurrentPage(1)
        setFilter({ search: '' })
        setOperationHistoryType('')
        setCardHistoryId('')
        setSelectedCard(undefined)
        setSelectedType(undefined)
    }

    const deleteOperationRemove = (operValue, cardId) => {
        cards.forEach((card) => {
            if (card.id === cardId) {
                const value = { value: card.value + operValue }
                dispatch(updateCard(card.id, value))
            }
        })
        setOperationHistoryType('')
        setCardHistoryId('')
        setSelectedCard(undefined)
        setSelectedType(undefined)
    }

    const deleteOperationAdd = (operValue, cardId) => {
        cards.forEach((card) => {
            if (card.id === cardId) {
                const value = { value: card.value - operValue }
                dispatch(updateCard(card.id, value))
            }
        })
        setOperationHistoryType('')
        setCardHistoryId('')
        setSelectedCard(undefined)
        setSelectedType(undefined)
    }

    const deleteOperation = (value, cardId, type) => {
        if (type === 'writeОff') {
            deleteOperationRemove(value, cardId)
        } else {
            deleteOperationAdd(value, cardId)
        }
    }

    return (
        <div className={classes.history_card}>
            <div className={classes.history_card_list}>
                <HistoryFilter
                    cards={cards}
                    setSelectedCard={setSelectedCard}
                    setSelectedType={setSelectedType}
                    handleReset={handleReset}
                    setFilter={setFilter}
                    filter={filter}
                    operationHistoryType={operationHistoryType}
                    setOperationHistoryType={setOperationHistoryType}
                    cardHistoryId={cardHistoryId}
                    setCardHistoryId={setCardHistoryId}
                    setCurrentPage={setCurrentPage}
                />
                <HistoryList
                    operations={operCrop}
                    deleteOperationItem={deleteOperation}
                    userId={id}
                />
                <HistoryPagination
                    totalCount={searchedHistory?.length}
                    limit={limit}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

        </div>
    );
});

export default HistoryPage;