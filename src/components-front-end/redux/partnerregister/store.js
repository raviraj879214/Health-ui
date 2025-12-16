

import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../../redux/partnerregister/registerSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
  },
});
