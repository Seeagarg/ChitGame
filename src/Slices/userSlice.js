import { createSlice } from "@reduxjs/toolkit";
import { removeCookie, setCookie,getCookie } from "../Cookie";

const initialState = getCookie() ?
(JSON.parse(getCookie())):null;

const userSlice = createSlice({
    name :"userSlice",
    initialState:initialState,
    reducers:{
        addUser:(state,action)=>{
            state = action.payload;
            setCookie(JSON.stringify(state));
            console.log(state,'state')
            return state;
        },
        removeUser:(state,action)=>{
            removeCookie();
            return state;
        }

    }
})


export const {addUser,removeUser} = userSlice.actions;
export default userSlice.reducer;
