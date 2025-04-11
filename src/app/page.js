import MultiStepForm from "@/components/form/MultiStepForm";

const HomePage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 dark:bg-zinc-900">
      <div className="w-full max-w-3xl">
        <MultiStepForm />
      </div>
    </main>
  );
};

export default HomePage;
