import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  formData: {
    fullName: "",
    email: "",
    phoneNumber: "",
    street: " ",
    city: " ",
    zipCode: "",
    username: "",
    password: "",
    confirmPassword: "",
  },
  isSubmitted: false,
};

export const formSlice = createSlice({
  name: "formSlice",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < 3) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setSubmitted: (state, action) => {
      state.isSubmitted = action.payload;
    },
    resetForm: (state) => {
      state.currentStep = 0;
      state.formData = initialState.formData;
      state.isSubmitted = true;
    },
  },
});

export const { nextStep, prevStep, setFormData, setSubmitted, resetForm } =
  formSlice.actions;

export default formSlice.reducer;
