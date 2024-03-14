import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import storage from 'redux-persist/lib/storage';
import cardReducer from './Slices/cardSlice'
import allChitReducer from './Slices/allChitSlice'
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import accountSliceReducer from "./Slices/accountSlice";
import questionSliceReducer from "./Slices/questionSlice";


const rootReducer = combineReducers({
    userSlice:userReducer,
    cardSlice:cardReducer,
    allChitSlice:allChitReducer,
    accountSlice:accountSliceReducer,
    questionSlice:questionSliceReducer
})

const persistConfig ={
    key:'root',
    storage,
}


const persistedReducer = persistReducer(persistConfig,rootReducer);


export const store = configureStore({
    reducer:persistedReducer,

})

export const persistor = persistStore(store)
