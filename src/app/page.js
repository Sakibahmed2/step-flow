import MultiStepForm from "@/components/form/MultiStepForm";
import React from "react";

const HomePage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <MultiStepForm />
      </div>
    </main>
  );
};

export default HomePage;
