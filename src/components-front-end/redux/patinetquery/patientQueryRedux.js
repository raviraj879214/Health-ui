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

  refresh: getLS("refresh", "false"),
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

    clearPrevious: (state) => {
      state.refresh = "false";
      localStorage.setItem("refresh", "false");
    },

    /* ---------- ONE FUNCTION TO CLEAR EVERYTHING ---------- */
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
      state.refresh = "false";

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
      localStorage.removeItem("refresh");
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
} = patientQuerySlice.actions;

export default patientQuerySlice.reducer;
