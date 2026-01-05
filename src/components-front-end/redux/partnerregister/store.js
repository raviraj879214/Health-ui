

import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../../redux/partnerregister/registerSlice";
import clinicListingSlice from "../cliniclisting/store/clinicListing";
import patientQuerySlice from "../patinetquery/patientQueryRedux";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    clinicListing: clinicListingSlice,
    patientquery: patientQuerySlice
  },
});
