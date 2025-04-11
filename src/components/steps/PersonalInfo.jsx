import React from "react";
import Input from "../form/Input";

const PersonalInfo = () => {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold ">Personal Information</h2>
        <p className="text-gray-500 dark:text-gray-300">
          Please provide your basic contact details
        </p>
      </div>

      <div className="space-y-6">
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
    </div>
  );
};

export default PersonalInfo;
