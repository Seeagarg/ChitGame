import { createSlice } from "@reduxjs/toolkit";
// import { initial } from "lodash";

const initialState=[]


const accountSlice = createSlice({
    name:"accountSlice",
    initialState:initialState,

    reducers:{
        addAccount:(state,action)=>{
            state = action.payload;
            return state;
        },
        updatePrice:(state,action)=>{
            state.price = action.payload;
            return state;
        }
    }
})

export const {addAccount} = accountSlice.actions;
export default accountSlice.reducer;