"use client"; // ThemeProvider force us to use "client" mode, because has inside useForm

import { fonts } from "@/theme/fonts";

import "@aws-amplify/ui-react/styles.css";
import "@/app/app.css";

import { ThemeProvider } from "@aws-amplify/ui-react";
import ToyotaTotemTheme from "@/theme";
import { VehicleProvider } from "@/context/VehiclesProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fonts.toyotaDisplay.variable} ${fonts.toyotaType.variable} ${fonts.toyotaText.variable}`}
      manifest="/manifest.json"
    >
      <body>
        <ThemeProvider theme={ToyotaTotemTheme}>
          <VehicleProvider>{children}</VehicleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
