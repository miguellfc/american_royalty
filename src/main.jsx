import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import authReducer from './state/authStore.js'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { PERSIST } from 'redux-persist/es/constants.js'

const persistConfig = {
    key: "root",
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
              <App />
          </PersistGate>
      </Provider>
  </React.StrictMode>,
)
