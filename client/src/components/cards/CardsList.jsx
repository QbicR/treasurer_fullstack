import React from 'react';
import { observer } from 'mobx-react-lite';
import CardItem from './CardItem';
import PropTypes from 'prop-types'

const CardsList = observer(({ cards }) => {

    return (
        <>
            {cards?.map((card) =>
                <CardItem
                    key={card.id}
                    cardInfo={card}
                />
            )
            }
        </>
    );
});

CardsList.propTypes = {
    cards: PropTypes.array
}

export default CardsList;