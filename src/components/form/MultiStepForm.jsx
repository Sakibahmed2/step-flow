"use client";

import {
  nextStep,
  prevStep,
  resetForm,
  setFormData,
} from "@/redux/features/formSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import StepIndicator from "../ui/StepIndicator";
import FormSummary from "../steps/FormSummary";
import PersonalInfo from "../steps/PersonalInfo";
import AddressDetails from "../steps/AddressDetails";
import AccountSetup from "../steps/AccountSetup";
import { toast } from "sonner";

const formSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),

    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z
      .string()
      .min(5, "Zip code must be at least 5 digits")
      .regex(/^\d+$/, "Zip code must contain only numbers"),

    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function MultiStepForm() {
  const [hasData, setHasData] = useState(false);
  const dispatch = useDispatch();
  const { currentStep, formData, isSubmitted } = useSelector(
    (state) => state.form
  );

  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: formData,
  });

  const { handleSubmit, trigger, getValues, reset, watch } = methods;

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      reset(parsedData);
      setHasData(true);
      dispatch(setFormData(parsedData));
    }
  }, [dispatch, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      dispatch(setFormData(value));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const steps = [
    { title: "Personal Info", component: <PersonalInfo /> },
    { title: "Address", component: <AddressDetails /> },
    { title: "Account", component: <AccountSetup /> },
    { title: "Summary", component: <FormSummary /> },
  ];

  const goToNextStep = async () => {
    try {
      // If going to summary step, skip validation
      if (currentStep === steps.length - 2) {
        dispatch(nextStep());
        return;
      }

      // Define fields to validate for each step
      const stepValidations = [
        ["fullName", "email", "phoneNumber"], // Step 0
        ["street", "city", "zipCode"], // Step 1
        ["username", "password", "confirmPassword"], // Step 2
      ];

      const fieldsToValidate = stepValidations[currentStep] || [];
      const isStepValid = await trigger(fieldsToValidate);

      if (isStepValid) {
        dispatch(nextStep());
      } else {
        toast.error("Please fix the errors before proceeding");
      }
    } catch (error) {
      console.error("Validation error:", error);
      toast.error("An error occurred during validation");
    }
  };

  const goToPrevStep = () => {
    dispatch(prevStep());
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    localStorage.setItem("formData", JSON.stringify(data));
    dispatch(resetForm());
    reset();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Multi-Step Registration
        </h1>
        <p className="text-gray-500 mt-2">
          Complete all steps to create your account
        </p>
      </div>

      <StepIndicator currentStep={currentStep} steps={steps} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {steps[currentStep].component}

              <div className="flex justify-between mt-8">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Previous
                  </button>
                )}

                {hasData && (
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("formData");
                      reset();
                      setHasData(false);
                      dispatch(resetForm());
                    }}
                    className="ml-auto px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Clear Data
                  </button>
                )}

                {currentStep < steps.length - 1 && (
                  <button
                    type="button"
                    className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={goToNextStep}
                  >
                    Next
                  </button>
                )}

                {currentStep === steps.length - 1 && (
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      {isSubmitted && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">
            Your form has been submitted successfully.
          </span>
        </div>
      )}
    </div>
  );
}
