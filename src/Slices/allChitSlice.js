import { createSlice } from "@reduxjs/toolkit";

const initialState=[];

const allChitSlice = createSlice({
    name:"allChitSlice",
    initialState:initialState,
    reducers:{
        allItems:(state,action)=>{
            state = action.payload;
            console.log(state,"state");
            return state;
        },
        addChit:(state,action)=>{
            state.push(action.payload);
            console.log("chit added",action.payload,state)
            return state;
        },
        removeChit:(state,action)=>{
            // state.remove(action.payload);
            state = state.filter((item)=>item.id !== action.payload) 
            return state;
        },

        shuffleChits:(state,action)=>{
            
            const shuffleArray = () => {
                const array = action.payload;
                for (let i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
              };


        }

    }
})

export const {allItems,addChit,removeChit,shuffleChits} = allChitSlice.actions;
export default allChitSlice.reducer;