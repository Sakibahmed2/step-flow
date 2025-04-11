import React from "react";
import Input from "../form/Input";

const AddressDetails = () => {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold ">Address Details</h2>
        <p className="text-gray-500 dark:text-gray-300">
          Please provide your address details.
        </p>
      </div>

      <div className="space-y-6">
        <Input
          name={"street"}
          placeholder={"Enter your street address"}
          label={"Street address"}
          type="text"
        />
        <Input name={"city"} placeholder={"Enter your city"} label={"City"} />
        <Input
          name={"zipCode"}
          placeholder={"Enter your zip code"}
          label={"Zip Code"}
          type="number"
        />
      </div>
    </div>
  );
};

export default AddressDetails;
