import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import CardForm from './CardForm';
import CardsList from './CardsList';
import PropTypes from 'prop-types'
import classes from './Cards.module.scss'

const Cards = observer(({ cards, userId }) => {
    const [modal, setModal] = useState(false)
    const [typeActive, setTypeActive] = useState('')
    const [name, setName] = useState('')
    const [value, setValue] = useState('')

    let sortedCards
    cards && (sortedCards = [...cards].sort((x, y) => x.id - y.id))

    const closeModal = (none) => {
        setModal(none)
    }

    const rootClasses = [classes.modal_window]

    if (modal) {
        rootClasses.push(classes.active)
    }

    const handleCloseModal = () => {
        setModal(false)
        setTypeActive('')
        setName('')
        setValue('')
    }

    return (
        <div className={classes.cards}>
            <div className={classes.cards_card}>
                <h4>Счета</h4>
                <div>
                    <button
                        className={classes.add_card_btn}
                        onClick={() => setModal(true)}>
                        +
                    </button>
                </div>
            </div>
            <div className={classes.cards_list}>
                <CardsList
                    cards={sortedCards}
                />
            </div>
            <div className={rootClasses.join(' ')} onClick={() => handleCloseModal()}>
                <div onClick={(event) => event.stopPropagation()}>
                    <CardForm
                        modal={closeModal}
                        userId={userId}
                        typeActive={typeActive}
                        setTypeActive={setTypeActive}
                        name={name}
                        setName={setName}
                        value={value}
                        setValue={setValue}
                    />
                </div>
            </div>
        </div>
    );
})

Cards.propTypes = {
    cards: PropTypes.array,
    userId: PropTypes.number
}

export default Cards;