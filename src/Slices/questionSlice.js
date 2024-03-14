import { createSlice } from "@reduxjs/toolkit";

const initialState = {questionOpen:false,question:""}

const questionSlice = createSlice({
    name: 'questionSlice',
    initialState:initialState,
    reducers:{
        openQuestion:(state,action)=>{
            state.questionOpen = true;
            return state;
        },
        closeQuestion:(state,action)=>{
            state.questionOpen = false;
            // return state;
        },
        addQuestion:(state,action)=>{
            state.question = action.payload;
            return state;
        },
        removeQuestion:(state,action)=>{
            state.question = "";
            return state;
        }

    }
})

export const {openQuestion,closeQuestion,addQuestion,removeQuestion} = questionSlice.actions;
export default questionSlice.reducer;