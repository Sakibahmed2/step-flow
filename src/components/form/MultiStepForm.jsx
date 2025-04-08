"use client";

import React, { useState } from "react";
import StepIndicator from "../ui/StepIndicator";
import PersonalInfo from "../steps/PersonalInfo";
import AddressDetails from "../steps/AddressDetails";
import AccountSetup from "../steps/AccountSetup";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

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
  ];

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const method = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const { handleSubmit, trigger, getValues, reset, watch } = method;

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
        <form onSubmit={handleSubmit((data) => console.log(data))}>
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
                    onClick={nextStep}
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
