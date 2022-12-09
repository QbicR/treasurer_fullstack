import { observer } from 'mobx-react-lite';
import React from 'react';
import PropTypes from 'prop-types'
import classes from './History.module.css'

const CardFilter = observer(({ cards, setSelectedCard, cardHistoryId, setCardHistoryId, setCurrentPage }) => {

    const handleSelectCard = (id) => {
        setSelectedCard(id)
        setCardHistoryId(id)
        setCurrentPage(1)
    }

    let sortedCards
    cards && (sortedCards = [...cards].sort((x, y) => x.id - y.id))

    return (
        <div >
            {sortedCards?.map(card => (
                <div className={classes.card_filter} key={card.id}>
                    <button
                        className={cardHistoryId === card.id ? classes.history_filter_btn_active : classes.history_filter_btn}
                        onClick={() => handleSelectCard(card.id)}
                    >
                        {card.name}
                    </button>
                </div>
            ))}
        </div>
    );
});

CardFilter.propTypes = {
    cards: PropTypes.array,
    setSelectedCard: PropTypes.func,
    cardHistoryId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    setCardHistoryId: PropTypes.func,
}

export default CardFilter;