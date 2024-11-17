import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage';
import {persistReducer , persistStore} from "redux-persist"
import userReducer from "./slices/userSlice"
import cartReducer from "./slices/cartSlice"

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['user'], // Only persist user slice
    // blacklist: ['cart'], // Do not persist cart slice
}

const persistedReducer = persistReducer(persistConfig , rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch