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
            console.log(action.payload)
            state = state.filter((item)=>item.id !== action.payload) 
            state.push({});
            return state;
        },

        shuffleChits:(state,action)=>{


            const array = [...action.payload]; // Create a copy of the array
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;



            // const array = action.payload;
            // // const shuffleArray = () => {
            //     for (let i = array.length - 1; i > 0; i--) {
            //       const j = Math.floor(Math.random() * (i + 1));
            //       [array[i], array[j]] = [array[j], array[i]];
            //     }
            //     return array;
            //   };
            //   state = shuffleArray(action.payload);
            //   return state;

        }

    }
})

export const {allItems,addChit,removeChit,shuffleChits} = allChitSlice.actions;
export default allChitSlice.reducer;