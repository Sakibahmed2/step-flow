"use client";

import { cn } from "@/utils/cn";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div>
      <label
        htmlFor={name}
        className="text-gray-600 mb-1 block text-sm font-medium"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...register(name)}
          className={cn(errors[name] ? "border-red-500 " : "border-gray-400")}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Input;
