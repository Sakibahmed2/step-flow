"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, set, useForm } from "react-hook-form";
import { z } from "zod";
import AccountSetup from "../steps/AccountSetup";
import AddressDetails from "../steps/AddressDetails";
import FormSummary from "../steps/FormSummary";
import PersonalInfo from "../steps/PersonalInfo";
import StepIndicator from "../ui/StepIndicator";
import { setFormData } from "@/redux/features/formSlice";
import { useDispatch, useSelector } from "react-redux";

const formSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),

    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z
      .string()
      .min(5, "Zip code must be at least 5 digits")
      .regex(/^\d+$/, "Zip code must be numbers only"),

    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state?.form);

  const steps = [
    {
      title: "Personal info",
      component: <PersonalInfo />,
    },
    {
      title: "Address details",
      component: <AddressDetails />,
    },
    {
      title: "Account setup",
      component: <AccountSetup />,
    },
    {
      title: "Summary & Submit",
      component: <FormSummary />,
    },
  ];

  const method = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: formData,
  });

  const { handleSubmit, trigger, getValues, reset, watch } = method;

  if (currentStep === 3) {
    dispatch(setFormData(getValues()));
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToNextStep = async () => {
    const fieldsToValidate =
      currentStep === 0
        ? ["fullName", "email", "phoneNumber"]
        : currentStep === 1
        ? ["streetAddress", "city", "zipCode"]
        : ["username", "password", "confirmPassword"];

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      nextStep();
    }
  };

  const onSubmit = (data) => {
    localStorage.setItem("formData", JSON.stringify(data));
  };

  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold text-gray-900">
          Multi-Step Registration
        </h1>
        <p className="text-gray-500 mt-2">
          Complete all steps to create your account
        </p>
      </div>

      <StepIndicator currentStep={currentStep} steps={steps} />

      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-sm shadow-[0px_0px_32px_-13px_rgba(59,_130,_246,_0.5)] border border-gray-200  mt-10">
            <div className="p-6">
              {steps[currentStep].component}

              <div className="flex justify-between mt-8">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Previous
                  </button>
                )}

                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={goToNextStep}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MultiStepForm;
