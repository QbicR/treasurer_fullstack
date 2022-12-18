import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import jwt_decode from 'jwt-decode'
import * as yup from 'yup'
import 'moment/locale/ru'
import {replenishmentTypes, writeOffTypes} from '../../utils/operationTypes'
import PropTypes from 'prop-types'
import classes from './Operations.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {getCards, loadCardList} from '../../store/cards';
import {createOperation} from '../../store/operations';
import AuthInput from "../UI/inputs/authInput/AuthInput";

const OperationForm = observer(({
                                    modal,
                                    type,
                                    operation,
                                    categoryActive,
                                    setCategoryActive,
                                    cardActive,
                                    setCardActive,
                                    value,
                                    setValue,
                                    comment,
                                    setComment
                                }) => {
    const token = localStorage.getItem('token')
    const {id} = jwt_decode(token)
    const [cardId, setCardId] = useState('')
    const [cardName, setCardName] = useState('')
    const [category, setCategory] = useState()
    const [errors, setErrors] = useState({})
    const moment = require('moment')
    moment.locale('ru')

    const cards = useSelector(getCards())

    let sortedCards
    cards && (sortedCards = [...cards].sort((x, y) => x.id - y.id))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadCardList(id))
    }, [])


    const validateScheme = yup.object().shape({
        value: yup
            .string()
            .matches(/^0*?[0-9]\d*$/, 'Сумма не может быть отрицательной')
    })

    useEffect(() => {
        validate()
    }, [value])

    const obj = {
        value: value
    }

    const validate = () => {
        validateScheme
            .validate(obj)
            .then(() => setErrors({}))
            .catch((err) => setErrors({[err.path]: err.message}))
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = () => {
        setValue('')
        const isValid = validate()
        if (isValid) return
    }

    const addOperation = () => {
        const newOperation = {
            value,
            comment,
            category,
            type,
            cardId,
            cardName,
            userId: id,
            creationDate: moment().format('Do MMMM YYYY, ddd. LT')
        }
        operation(newOperation)
        dispatch(createOperation(newOperation))
        setCategoryActive('')
        setCardActive('')
        setValue('')
        setComment('')
        modal()
    }

    const setCardInfo = (id, name) => {
        setCardId(id)
        setCardName(name)
    }

    const handleSelectCategory = (name) => {
        setCategory(name)
        setCategoryActive(name)
    }

    const handleSelectCard = (id, name) => {
        setCardInfo(id, name);
        setCardActive(id)
    }

    return (
        <div className={classes.operation_form_modal}>
            {type === 'replenishment' ?
                <div>
                    <h3>Категория</h3>
                    <div className={classes.operation_categories}>
                        {replenishmentTypes.map(type => (
                            <button
                                className={categoryActive === type.name ? classes.select_category_btn_active : classes.select_category_btn}
                                key={type.id}
                                onClick={() => handleSelectCategory(type.name)}
                            >
                                {type.name}
                            </button>
                        ))}
                    </div>
                </div>
                :
                <div>
                    <h3>Категория</h3>
                    <div className={classes.operation_categories}>
                        {writeOffTypes.map(type => (
                            <button
                                className={categoryActive === type.name ? classes.select_category_btn_active : classes.select_category_btn}
                                key={type.id}
                                onClick={() => handleSelectCategory(type.name)}
                            >
                                {type.name}
                            </button>
                        ))}
                    </div>
                </div>
            }
            <div>
                <h3>Карта</h3>
                <div className={classes.card_list}>
                    {cards &&
                        sortedCards.map(card => (
                            <button
                                className={cardActive === card.id ? classes.select_card_btn_active : classes.select_card_btn}
                                key={card.id}
                                onClick={() => handleSelectCard(card.id, card.name)}
                            >
                                {card.name}
                            </button>
                        ))
                    }
                </div>
            </div>
            <form className={classes.operation_form}>
                <div className={classes.operation_value}>
                    <AuthInput
                        value={value}
                        onChange={event => setValue(Number((event.target.value).trim()))}
                        type='number'
                        onSubmit={handleSubmit}
                    />
                    <label>Сумма</label>
                    {(value !== '' && errors.value) && <p>{errors.value}</p>}
                </div>
                <div className={classes.operation_comment}>
                    <AuthInput
                        value={comment}
                        onChange={event => setComment((event.target.value).trim())}
                        type='text'
                    />
                    <label>Комментарий</label>
                </div>
            </form>
            <button
                className={classes.select_card_btn}
                disabled={!isValid || (categoryActive === '' || cardActive === '')}
                onClick={addOperation}
            >
                Добавить
            </button>
        </div>
    );
});

OperationForm.propTypes = {
    modal: PropTypes.func,
    type: PropTypes.string,
    cards: PropTypes.array,
    operation: PropTypes.func,
    categoryActive: PropTypes.string,
    setCategoryActive: PropTypes.func,
    cardActive: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setCardActive: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setValue: PropTypes.func,
    comment: PropTypes.string,
    setComment: PropTypes.func
}

export default OperationForm;