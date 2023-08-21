import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; //this is so we can save the state in local state any time
//the user close the tab or close the browser that information will still be there 
//the only way that they can remove is to clear there cashe 
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";


const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
//we gonna have the reducer persisted 
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);