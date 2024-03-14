import { createSlice } from "@reduxjs/toolkit";

const initialState=[];

const cardSlice = createSlice({
    name:"cardSlice",
    initialState:initialState,
    reducers:{
        addCard:(state,action)=>{
            
            if(state.includes(action.payload.id)){
                console.log(action.payload.id,"it exists already")
                return state;
            }
            state.push(action.payload);
            console.log("item added")
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