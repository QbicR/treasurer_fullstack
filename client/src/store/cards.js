import { createAction, createSlice } from "@reduxjs/toolkit";
import cardService from "../services/card.service";

const cardSlice = createSlice({
    name: 'cards',
    initialState: {
        entities: null,
        entity: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        cardRequested: (state) => {
            state.isLoading = true
        },
        cardRecived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        oneCardRecived: (state, action) => {
            state.entity = action.payload
            state.isLoading = false
        },
        cardRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        cardCreated: (state, action) => {
            state.entities.push(action.payload)
        },
        cardUpdatedSuccess: (state, action) => {
            state.entities[
                state.entities.findIndex(card => card.id === action.payload.id)
            ] = action.payload
        }
    }
})

const { reducer: cardReducer, actions } = cardSlice
const {
    cardRequested,
    cardRecived,
    oneCardRecived,
    cardRequestFiled,
    cardCreated,
    cardUpdatedSuccess
} = actions

const addCardRequested = createAction('cards/addCardRequested')
const removeCardRequested = createAction('cards/removeCardRequested')
const updateCardRequested = createAction('cards/updateCardRequested')

export const loadCardList = (userId) => async (dispatch) => {
    dispatch(cardRequested())
    try {
        const data = await cardService.getCards(userId)
        dispatch(cardRecived(data))
    } catch (error) {
        dispatch(cardRequestFiled(error.message))
    }
}

export const loadCard = (cardId) => async (dispatch) => {
    dispatch(cardRequested())
    try {
        const data = await cardService.getOneCard(cardId)
        dispatch(oneCardRecived(data))
    } catch (error) {
        dispatch(cardRequestFiled(error.message))
    }
}

export const createCard = (payload) => async (dispatch) => {
    dispatch(addCardRequested(payload))
    try {
        const data = await cardService.createCard(payload)
        dispatch(cardCreated(data))
    } catch (error) {
        dispatch(cardRequestFiled(error.message))
    }
}

export const updateCard = (cardId, value) => async (dispatch) => {
    dispatch(updateCardRequested())
    try {
        const data = await cardService.updateCard(cardId, value)
        dispatch(cardUpdatedSuccess(data))
    } catch (error) {
        dispatch(cardRequestFiled(error.message))
    }
}

export const removeCard = (cardId, userId) => async (dispatch) => {
    dispatch(removeCardRequested())
    try {
        const data = await cardService.deleteCard(cardId, userId)
        dispatch(cardRecived(data))
    } catch (error) {
        dispatch(cardRequestFiled(error.message))
    }
}

export const getCards = () => (state) => state.cards.entities
export const getOneCard = () => (state) => state.cards.entity
export const getCardLoadingStatus = () => (state) => state.cards.isLoading

export default cardReducer