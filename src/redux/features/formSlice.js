import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    fullName: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    zipCode: "",
    username: "",
    password: "",
    confirmPassword: "",
  },
};

export const formSlice = createSlice({
  name: "formSlice",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { nextStep, prevStep, setFormData, setSubmitted, resetForm } =
  formSlice.actions;

export default formSlice.reducer;
