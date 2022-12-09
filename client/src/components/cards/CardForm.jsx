import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup'
import 'moment/locale/ru'
import { cardTypes } from '../../utils/cardTypes';
import PropTypes from 'prop-types'
import classes from './Cards.module.css'
import { useDispatch } from 'react-redux';
import { createCard } from '../../store/cards';

const CardForm = observer(({ modal, userId, typeActive, setTypeActive, name, setName, value, setValue }) => {
    const [type, setType] = useState('')
    const [errors, setErrors] = useState({})
    const moment = require('moment')
    moment.locale('ru')

    const validateScheme = yup.object().shape({
        value: yup
            .string()
            .matches(/^0*?[0-9]\d*$/, 'Баланс не может быть отрацительным')
    })

    useEffect(() => {
        validate()
    }, [value])

    const validateCardValue = {
        value: value
    }

    const validate = () => {
        validateScheme
            .validate(validateCardValue)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }))
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = () => {
        setValue('')
        const isValid = validate()
        if (isValid) return
    }

    const dispatch = useDispatch()

    const addCard = () => {
        const newCard = {
            name,
            value,
            type,
            userId,
            creationDate: moment().format('Do MMMM YYYY, ddd. LT')
        }
        dispatch(createCard(newCard))
        setTypeActive('')
        setName('')
        setValue('')
        modal(false)
    }

    const handleSelectType = (name) => {
        setTypeActive(name)
        setType(name)
    }

    return (
        <div className={classes.card_form_modal}>
            <div>
                <h3>Тип карты</h3>
                <div className={classes.card_categories}>
                    {cardTypes.map(type => (
                        <button
                            className={typeActive === type.name ? classes.modal_card_btn_active : classes.modal_card_btn}
                            key={type.id}
                            onClick={() => handleSelectType(type.name)}
                        >
                            {type.name}
                        </button>
                    ))}
                </div>
            </div>
            <form className={classes.card_form}>
                <div className={classes.modal_card_name}>
                    <input
                        value={name}
                        onChange={event => setName((event.target.value).trim())}
                        type='text'
                    />
                    <label>Название</label>
                </div>
                <div className={classes.modal_card_value}>
                    <input
                        value={value}
                        onChange={event => setValue(Number((event.target.value).trim()))}
                        type='number'
                        onSubmit={handleSubmit}
                    />
                    <label>Сумма</label>
                    {(value !== '' && errors.value) && <p>{errors.value}</p>}
                </div>
            </form>
            <button
                className={classes.modal_card_btn}
                disabled={!isValid || (typeActive === '' || name === '')}
                onClick={addCard}
            >
                Добавить
            </button>
        </div >
    );
});

CardForm.propTypes = {
    modal: PropTypes.func,
    userId: PropTypes.number,
    typeActive: PropTypes.string,
    setTypeActive: PropTypes.func,
    name: PropTypes.string,
    setName: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setValue: PropTypes.func
}

export default CardForm;