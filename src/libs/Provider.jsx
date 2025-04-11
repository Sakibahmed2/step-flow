"use client";

import store from "@/redux/store";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";

const Providers = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

export default Providers;
