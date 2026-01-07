import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  email:"",
  otp:"",
  uuid:""
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setOtp : (state,action) =>{
      state.otp = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setuuid : (state, action) => {
      state.uuid = action.payload;
    },
    clearstep :(state,action)=>{
      state.step = 1;
    }
  },
});

export const { nextStep, prevStep, setStep , setOtp ,setEmail ,setuuid ,clearstep } = registerSlice.actions;
export default registerSlice.reducer;
