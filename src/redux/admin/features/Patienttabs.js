import { createSlice } from "@reduxjs/toolkit";


const patientTabsReducer = createSlice({
     name: "patientTabs", 
    initialState : {value : "pending" },
    reducers :{
        setTabvalue:(state,action)=>{
            state.value = action.payload;
        }
    }
});

export const { setTabvalue } = patientTabsReducer.actions;
export default patientTabsReducer.reducer;