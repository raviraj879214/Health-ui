import { createSlice } from "@reduxjs/toolkit";


const clinicListingSlice = createSlice({
  name: "clinicListing",
  initialState: {
    specializationRedux: [], 
    specialtyRedux: [], 
    treatmentRedux: [], 
    skipRedux : 0

  },
  reducers: {
    addSpecialization: (state, action) => {
     
      const exists = state.specializationRedux.some(
        (item) => item.id === action.payload.id
      );

      if (!exists) {
        state.specializationRedux.push({
          id: action.payload.id,
          name: action.payload.name,
        });
      }
    },

    removeSpecialization: (state, action) => {
      state.specializationRedux = state.specializationRedux.filter(
        (item) => item.id !== action.payload
      );
    },

    clearSpecializations: (state) => {
      state.specializationRedux = [];
    },

    addSpecialty: (state, action) => {
     
      const exists = state.specialtyRedux.some(
        (item) => item.id === action.payload.id
      );

      if (!exists) {
        state.specialtyRedux.push({
          id: action.payload.id,
          name: action.payload.name,
        });
      }
    },

    removeSpecialty: (state, action) => {
      state.specialtyRedux = state.specialtyRedux.filter(
        (item) => item.id !== action.payload
      );
    },

    clearSpecialty: (state) => {
      state.specialtyRedux = [];
    },

     addTreatment: (state, action) => {
     
      const exists = state.treatmentRedux.some(
        (item) => item.id === action.payload.id
      );

      if (!exists) {
        state.treatmentRedux.push({
          id: action.payload.id,
          name: action.payload.name,
        });
      }
    },

    removeTreatment: (state, action) => {
      state.treatmentRedux = state.treatmentRedux.filter(
        (item) => item.id !== action.payload
      );
    },

    clearTreatment: (state) => {
      state.treatmentRedux = [];
    },
    setSkipRedux: (state, action) => {
    state.skipRedux = action.payload;
  }



  },
});

export const {
  addSpecialization,
  removeSpecialization,
  clearSpecializations,
  addSpecialty,
  removeSpecialty,
  clearSpecialty,
  addTreatment,
  removeTreatment,
  clearTreatment,
  setSkipRedux



} = clinicListingSlice.actions;


export default clinicListingSlice.reducer;
