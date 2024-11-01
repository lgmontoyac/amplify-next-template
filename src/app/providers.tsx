// src/app/providers.tsx
"use client"; // Esto es un componente del lado del cliente

import { ThemeProvider } from "@aws-amplify/ui-react";
import ToyotaTotemTheme from "@/theme";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={ToyotaTotemTheme}>{children}</ThemeProvider>;
}
