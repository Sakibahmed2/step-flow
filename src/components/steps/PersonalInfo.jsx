import React from "react";
import Input from "../form/Input";

const PersonalInfo = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Personal Information
        </h2>
        <p className="text-gray-500">
          Please provide your basic contact details
        </p>
      </div>

      <Input name="fullName" label="Full Name" placeholder="John Doe" />

      <Input
        name="email"
        label="Email Address"
        type="email"
        placeholder="john.doe@example.com"
      />

      <Input
        name="phoneNumber"
        label="Phone Number"
        placeholder="1234567890"
        type="number"
      />
    </div>
  );
};

export default PersonalInfo;
