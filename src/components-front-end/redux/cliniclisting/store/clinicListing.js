import { createSlice } from "@reduxjs/toolkit";


const clinicListingSlice = createSlice({
  name: "clinicListing",
  initialState: {
    specializationRedux: [],
    specialtyRedux: [],
    treatmentRedux: [],
    placeRedux: [],
    skipRedux: 0,
    maxPrice : 0,
    minPrice : 0

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
    addPlaces: (state, action) => {

      const exists = state.placeRedux.some(
        (item) => item.id === action.payload.id
      );

      if (!exists) {
        state.placeRedux.push({
          id: action.payload.id,
          name: action.payload.name,
        });
      }
    },
    removePlaces: (state, action) => {
      state.placeRedux = state.placeRedux.filter(
        (item) => item.id !== action.payload
      );
    },
    clearPlaces: (state) => {
      state.placeRedux = [];
    },
    addMaxPrice :(state,action)=>{
      state.maxPrice = action.payload
    },
    clearMaxPrice :(state,action)=>{
      state.maxPrice = 0
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
  addPlaces,
  removePlaces,
  clearPlaces,
  setSkipRedux,
  addMaxPrice,
  clearMaxPrice



} = clinicListingSlice.actions;


export default clinicListingSlice.reducer;
