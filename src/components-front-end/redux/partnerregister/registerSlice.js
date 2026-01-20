import { createSlice } from "@reduxjs/toolkit";


const persistedState =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("register_state"))
    : null;

const initialState = persistedState || {
  step: 1,
  email: "",
  otp: "",
  uuid: "",
  clinicid: ""
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
      localStorage.setItem("register_state", JSON.stringify(state));
    },
    prevStep: (state) => {
      state.step -= 1;
      localStorage.setItem("register_state", JSON.stringify(state));
    },
    setStep: (state, action) => {
      state.step = action.payload;
      localStorage.setItem("register_state", JSON.stringify(state));
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
      localStorage.setItem("register_state", JSON.stringify(state));
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      localStorage.setItem("register_state", JSON.stringify(state));
    },
    setuuid: (state, action) => {
      state.uuid = action.payload;
      localStorage.setItem("register_state", JSON.stringify(state));
    },
    setclinicid: (state, action) => {
      state.clinicid = action.payload;
      localStorage.setItem("register_state", JSON.stringify(state));
    },
    clearstep: (state) => {
      state.step = 1;
      localStorage.setItem("register_state", JSON.stringify(state));
    },
    customStep: (state, action) => {
      state.step = action.payload;
      localStorage.setItem("register_state", JSON.stringify(state));
    },
    clearAll: (state) => {
      state.step = 1;
      state.email = "";
      state.otp = "";
      state.uuid = "";
      state.clinicid = "";


      localStorage.removeItem("register_state");
    }
  },
});

export const {
  nextStep,
  prevStep,
  setStep,
  setOtp,
  setEmail,
  setuuid,
  clearstep,
  customStep,
  setclinicid,
  clearAll
} = registerSlice.actions;

export default registerSlice.reducer;
