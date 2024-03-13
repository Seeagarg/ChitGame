import { createSlice } from "@reduxjs/toolkit";

const initialState=[];

const cardSlice = createSlice({
    name:"cardSlice",
    initialState:initialState,
    reducers:{
        addCard:(state,action)=>{
            state.push(action.payload);
            return state;
        },
        removeCard:(state,action)=>{
            state.pop();
            return state;
        }
    }
})

export const {addCard,removeCard} = cardSlice.actions;
export default cardSlice.reducer;