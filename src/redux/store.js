import { configureStore } from "@reduxjs/toolkit";
import patientTabsReducer from "../redux/admin/features/Patienttabs";

export const store = configureStore({
  reducer: {
    common: patientTabsReducer,
  },
});
