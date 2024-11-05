"use client"; // Esto es un componente del lado del cliente

import { ThemeProvider } from "@aws-amplify/ui-react";
import ToyotaTotemTheme from "@/theme";
import { useEffect } from "react";
import { sendStoredFormData, hasStoredData } from "@/services/formService";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const checkAndSendData = async () => {
      if (await hasStoredData()) {
        sendStoredFormData();
      }
    };

    checkAndSendData();

    window.addEventListener("online", sendStoredFormData);

    return () => {
      window.removeEventListener("online", sendStoredFormData);
    };
  }, []);

  return <ThemeProvider theme={ToyotaTotemTheme}>{children}</ThemeProvider>;
}
