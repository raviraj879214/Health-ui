import { createSlice } from "@reduxjs/toolkit";

const getInitialValue = () => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem("requestClinicCount");
    return storedValue ? Number(storedValue) : 0;
  }
  return 0;
};

const requestClinicCounterSlice = createSlice({
  name: "counter",
  initialState: {
    value: getInitialValue(),
  },
  reducers: {

      addRequestCount: (state, action) => {
     
      state.value = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("requestClinicCount", action.payload);
      }
    },
  },
});

export const { addRequestCount } = requestClinicCounterSlice.actions;
export default requestClinicCounterSlice.reducer;