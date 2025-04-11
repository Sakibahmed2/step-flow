import { useSelector } from "react-redux";

const FormSummary = () => {
  const { formData } = useSelector((state) => state.form);

  const {
    fullName,
    email,
    phoneNumber,
    street,
    city,
    zipCode,
    username,
    password,
  } = formData || {};

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-center">
          Review your information
        </h2>
        <p className="text-gray-500 text-center mb-6 dark:text-gray-300">
          Please review your details before submitting.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="border py-4 px-6 rounded-lg border-gray-300 dark:border-zinc-500 col-span-12">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Full Name: <span className="font-semibold">{fullName}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Email: <span className="font-semibold">{email}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Phone Number: <span className="font-semibold">{phoneNumber}</span>
          </p>
        </div>

        <div className="border py-4 px-6 rounded-lg border-gray-300 col-span-6 dark:border-zinc-500">
          <h3 className="text-lg font-semibold mb-2">Address details</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Street Address: <span className="font-semibold">{street}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            City: <span className="font-semibold">{city}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Zip Code: <span className="font-semibold">{zipCode}</span>
          </p>
        </div>

        <div className="border py-4 px-6 rounded-lg border-gray-300 col-span-6 dark:border-zinc-500">
          <h3 className="text-lg font-semibold mb-2">Account setup</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Username: <span className="font-semibold">{username}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Password:{" "}
            <span className="font-semibold">{password.replace(/./g, "*")}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormSummary;
