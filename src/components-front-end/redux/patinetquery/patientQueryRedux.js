import { createSlice } from "@reduxjs/toolkit";

/* ---------- Helpers (explicit, not generic) ---------- */

const getLS = (key, defaultValue) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value !== null ? value : defaultValue;
  }
  return defaultValue;
};

const getLSNumber = (key, defaultValue = 0) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value ? parseInt(value, 10) : defaultValue;
  }
  return defaultValue;
};

/* ---------- Initial State ---------- */

const initialState = {
  step: getLSNumber("patientStep", 0),

  treatmentid: getLS("treatmentid", ""),
  treatmentName: getLS("treatmentName", ""),

  whattmattermostid: getLS("whattmattermostid", ""),
  whattmattermostname: getLS("whattmattermostname", ""),

  medicalReportsID: getLS("medicalReportsID", ""),
  medicalReportstValue: getLS("medicalReportstValue", ""),

  procedureTimeID: getLS("procedureTimeID", ""),
  procedureTimevalue: getLS("procedureTimevalue", ""),

  patientName: getLS("patientName", ""),
  patientEmail: getLS("patientEmail", ""),
  emailotp: getLS("emailotp", "0"),
  emailverified :getLS("emailverified","0"),
  medicalCordinatorID: getLS("medicalCordinatorID", "0"),
  phoneOtp: getLS("phoneOtp", "0"),
  phoneNumber: getLS("phoneNumber", "0"),
  phoneNumberVerified:getLS("phoneNumberVerified","0"),
  telegramUsername: getLS("telegramUsername", "0"),
  telegramUsernameVerified:getLS("telegramUsernameVerified","0"),
  whatsappNumber: getLS("whatsappNumber", "0"),
  whatsappNumberVerified:getLS("whatsappNumberVerified","0"),
  provider:getLS("provider","0"),
  refresh: getLS("refresh", "false"),
  termsCondition: getLS("termsCondition", "0"),

};

/* ---------- Slice ---------- */

const patientQuerySlice = createSlice({
  name: "patientquery",
  initialState,
  reducers: {
    addStep: (state) => {
      state.step += 1;
      localStorage.setItem("patientStep", state.step);
    },
    customStep: (state,action) => {
      state.step = action.payload;
      localStorage.setItem("patientStep", state.step);
    },
    prevStep: (state) => {
      if (state.step > 0) state.step -= 1;
      localStorage.setItem("patientStep", state.step);
    },
    setStep: (state, action) => {
      state.step = action.payload;
      localStorage.setItem("patientStep", state.step);
    },
    clearStep: (state) => {
      state.step = 0;
      localStorage.setItem("patientStep", "0");
    },

    addTreatmentID: (state, action) => {
      state.treatmentid = action.payload.id;
      state.treatmentName = action.payload.name;
      state.refresh = "true";

      localStorage.setItem("treatmentid", action.payload.id);
      localStorage.setItem("treatmentName", action.payload.name);
      localStorage.setItem("refresh", "true");
    },

    clearTreatmentID: (state) => {
      state.treatmentid = "";
      state.treatmentName = "";

      localStorage.removeItem("treatmentid");
      localStorage.removeItem("treatmentName");
    },

    addWhatMatterMost: (state, action) => {
      state.whattmattermostid = action.payload.id;
      state.whattmattermostname = action.payload.name;

      localStorage.setItem("whattmattermostid", action.payload.id);
      localStorage.setItem("whattmattermostname", action.payload.name);
    },

    addMedicalreports: (state, action) => {
      state.medicalReportsID = action.payload.id;
      state.medicalReportstValue = action.payload.name;

      localStorage.setItem("medicalReportsID", action.payload.id);
      localStorage.setItem("medicalReportstValue", action.payload.name);
    },

    addProcedureTime: (state, action) => {
      state.procedureTimeID = action.payload.id;
      state.procedureTimevalue = action.payload.name;

      localStorage.setItem("procedureTimeID", action.payload.id);
      localStorage.setItem("procedureTimevalue", action.payload.name);
    },

    addPatientName: (state, action) => {
      state.patientName = action.payload;
      localStorage.setItem("patientName", action.payload);
    },

    addPatientEmail: (state, action) => {
      state.patientEmail = action.payload;
      localStorage.setItem("patientEmail", action.payload);
    },

    addPatientEmailOtp: (state, action) => {
      state.emailotp = String(action.payload);
      localStorage.setItem("emailotp", String(action.payload));
    },
    addEmailVerified :(state,action) =>{
       state.emailverified = String(action.payload);
      localStorage.setItem("emailverified", String(action.payload));
    },
   
    addmedicalCordinatorID: (state, action) => {
    
      state.medicalCordinatorID = String(action.payload);
      localStorage.setItem("medicalCordinatorID", String(action.payload));
    },
    addphoneOtp: (state, action) => {
      state.phoneOtp = String(action.payload);
      localStorage.setItem("phoneOtp", String(action.payload));
    },
    addphoneNumber: (state, action) => {
      state.phoneNumber = String(action.payload);
      localStorage.setItem("phoneNumber", String(action.payload));
    },
     addphoneNumberVerified :(state ,action)=>{
      state.phoneNumberVerified = String(action.payload);
      localStorage.setItem("phoneNumberVerified", String(action.payload));
    },
    addtelegramUsername: (state, action) => {
      state.telegramUsername = String(action.payload);
      localStorage.setItem("telegramUsername", String(action.payload));
    },
     addtelegramUsernameVerified :(state ,action)=>{
      state.telegramUsernameVerified = String(action.payload);
      localStorage.setItem("telegramUsernameVerified", String(action.payload));
    },
    addwhatsappNumber: (state, action) => {
      state.whatsappNumber = String(action.payload);
      localStorage.setItem("whatsappNumber", String(action.payload));
    },
     addwhatsappNumberVerified :(state ,action)=>{
      state.whatsappNumberVerified = String(action.payload);
      localStorage.setItem("whatsappNumberVerified", String(action.payload));
    },
     addProvider :(state ,action)=>{
      state.provider = String(action.payload);
      localStorage.setItem("provider", String(action.payload));
    },

    addTermsCondition: (state, action) => {
      
      state.termsCondition = String(action.payload);
      localStorage.setItem("termsCondition", String(action.payload));
    },

    clearPrevious: (state) => {
      state.refresh = "false";
      localStorage.setItem("refresh", "false");
    },

  
    clearAllPatientQuery: (state) => {
      state.step = 0;
      state.treatmentid = "";
      state.treatmentName = "";
      state.whattmattermostid = "";
      state.whattmattermostname = "";
      state.medicalReportsID = "";
      state.medicalReportstValue = "";
      state.procedureTimeID = "";
      state.procedureTimevalue = "";
      state.patientName = "";
      state.patientEmail = "";
      state.emailotp = "0";
      state.phoneOtp = "0";
      state.phoneNumber = "0";
      state.telegramUsername = "0";
      state.whatsappNumber = "0";
      state.refresh = "false";
      state.emailverified = "0";
      state.phoneNumberVerified = "0";
      state.whatsappNumberVerified = "0";
      state.telegramUsernameVerified = "0";
      state.provider = "";
      state.termsCondition = "0";
      state.medicalCordinatorID = "0";


      localStorage.removeItem("patientStep");
      localStorage.removeItem("treatmentid");
      localStorage.removeItem("treatmentName");
      localStorage.removeItem("whattmattermostid");
      localStorage.removeItem("whattmattermostname");
      localStorage.removeItem("medicalReportsID");
      localStorage.removeItem("medicalReportstValue");
      localStorage.removeItem("procedureTimeID");
      localStorage.removeItem("procedureTimevalue");
      localStorage.removeItem("patientName");
      localStorage.removeItem("patientEmail");
      localStorage.removeItem("emailotp");
      localStorage.removeItem("phoneOtp");
      localStorage.removeItem("phoneNumber");
      localStorage.removeItem("refresh");
      localStorage.removeItem("emailverified");
      localStorage.removeItem("phoneNumberVerified");
      localStorage.removeItem("termsCondition");
      localStorage.removeItem("medicalCordinatorID");


      localStorage.removeItem("whatsappNumberVerified");
      localStorage.removeItem("telegramUsernameVerified");
      localStorage.removeItem("provider");

    },
  },
});

/* ---------- Exports ---------- */

export const {
  addStep,
  prevStep,
  setStep,
  clearStep,
  addTreatmentID,
  clearTreatmentID,
  addWhatMatterMost,
  addMedicalreports,
  addProcedureTime,
  addPatientName,
  addPatientEmail,
  addPatientEmailOtp,
  clearPrevious,
  clearAllPatientQuery,
  addmedicalCordinatorID,
  addphoneOtp,
  addphoneNumber,
  addEmailVerified,
  addphoneNumberVerified,
  customStep,
  addTermsCondition,
  addtelegramUsername,
  addtelegramUsernameVerified,
  addwhatsappNumber,
  addwhatsappNumberVerified,
  addProvider
} = patientQuerySlice.actions;

export default patientQuerySlice.reducer;
