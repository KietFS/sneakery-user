import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducers'
// configureStore.js

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import createFilter from 'redux-persist-transform-filter'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const saveSubsetAuthReducer = createFilter('auth', ['accessToken'])

const persistConfig = {
  key: 'root',
  storage,
  transforms: [saveSubsetAuthReducer],
  whitelist: ['auth'], // TODO
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store)

export type IRootState = ReturnType<typeof store.getState>
export type IStoreDispatch = typeof store.dispatch

export { store, persistor }
