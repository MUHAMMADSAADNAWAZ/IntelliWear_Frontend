import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage';
import {persistReducer , persistStore} from "redux-persist"
import userReducer from "@redux/slices/userSlice"
import cartReducer from "@redux/slices/cartSlice"
import botReducer from "@redux/slices/botSlice"
import loaderSlice from "@redux/slices/loaderSlice"

const rootReducer = combineReducers({
    user_store: userReducer,
    cart: cartReducer,
    bot: botReducer,
    loader: loaderSlice
})

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['user'], // Only persist user slice
    blacklist: ['loader'],
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