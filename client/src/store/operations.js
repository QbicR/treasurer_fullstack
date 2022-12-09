import { createAction, createSlice } from "@reduxjs/toolkit";
import operationService from "../services/operation.service";

const operationSlice = createSlice({
    name: 'operations',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        operationRequested: (state) => {
            state.isLoading = true
        },
        operationRecived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        operationRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        operationCreated: (state, action) => {
            state.entities.push(action.payload)
        }
    }
})

const { reducer: operationReducer, actions } = operationSlice
const {
    operationRequested,
    operationRecived,
    operationRequestFiled,
    operationCreated,
} = actions

const addOperationRequested = createAction('cards/addOperationRequested')
const removeOperationsRequested = createAction('cards/removeOperationsRequested')

export const loadOperationList = (userId, cardId, type) => async (dispatch) => {
    dispatch(operationRequested())
    try {
        const data = await operationService.getOperations(userId, cardId, type)
        dispatch(operationRecived(data))
    } catch (error) {
        dispatch(operationRequestFiled(error.message))
    }
}

export const createOperation = (payload) => async (dispatch) => {
    dispatch(addOperationRequested(payload))
    try {
        const data = await operationService.createOperation(payload)
        dispatch(operationCreated(data))
    } catch (error) {
        dispatch(operationRequestFiled(error.message))
    }
}

export const removeOperation = (operationId, userId) => async (dispatch) => {
    dispatch(removeOperationsRequested())
    try {
        const data = await operationService.deleteOperation(operationId, userId)
        dispatch(operationRecived(data))
    } catch (error) {
        dispatch(operationRequestFiled(error.message))
    }
}

export const getOperations = () => (state) => state.operations.entities
export const getOperationsLoadingStatus = () => (state) => state.operations.isLoading

export default operationReducer