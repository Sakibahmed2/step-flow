import React from "react";
import Input from "../form/Input";

const AccountSetup = () => {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold ">Account Setup</h2>
        <p className="text-gray-500">Please set up your account.</p>
      </div>

      <div className="space-y-6">
        <Input
          name={"username"}
          placeholder={"Enter your username"}
          label={"Username"}
        />
        <Input
          name={"password"}
          placeholder={"Enter your password"}
          label={"Password"}
          type="password"
          showPasswordToggle={true}
        />

        <Input
          name={"confirmPassword"}
          placeholder={"Confirm your password"}
          label={"Confirm Password"}
          type="password"
          showPasswordToggle={true}
        />
      </div>
    </div>
  );
};

export default AccountSetup;
