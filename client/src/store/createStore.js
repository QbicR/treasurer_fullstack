import { combineReducers, configureStore } from "@reduxjs/toolkit"
import cardReducer from "./cards"
import operationReducer from "./operations"
import userReducer from "./user"

const rootReducer = combineReducers({
    cards: cardReducer,
    operations: operationReducer,
    user: userReducer,
})

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    })
}
