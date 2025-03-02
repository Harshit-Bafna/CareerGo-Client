import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import errorReducer from './slices/errorSlice'
import successReducer from './slices/messageSlice'
import loaderReducer from './slices/loaderSlice'
import authReducer from './slices/authSlice'
import awsReducer from './slices/awsSlice'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
}

const rootReducer = combineReducers({
    error: errorReducer,
    success: successReducer,
    loader: loaderReducer,
    auth: authReducer,
    aws: awsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
        devTools: true,
    })
}

export const store = makeStore()
export const persistor = persistStore(store)
