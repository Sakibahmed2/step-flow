import { cn } from "@/utils/cn";
import { CheckIcon } from "lucide-react";
import React from "react";

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-center items-center pb-2">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center">
          <div
            className={cn(
              "flex items-center justify-center size-14 rounded-full transition-all",
              idx < currentStep
                ? "bg-green-500 text-white"
                : idx == currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            )}
          >
            {idx < currentStep ? (
              <CheckIcon className="size-5" />
            ) : (
              <span>{idx + 1}</span>
            )}
          </div>

          {idx < steps?.length - 1 && (
            <div
              className={cn(
                "h-1 w-10 md:w-20 bg-gray-300 transition-all",
                idx < currentStep ? "bg-green-500" : "bg-gray-200"
              )}
            />
          )}

          <div
            className={`absolute  mt-20 text-xs font-medium ${
              idx === currentStep ? "text-blue-600" : "text-gray-600"
            }`}
          >
            {step.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
