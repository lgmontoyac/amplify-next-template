// src/app/layout.tsx
"use server";

import { fonts } from "@/theme/fonts";
import "@aws-amplify/ui-react/styles.css";
import "@/app/app.css";

import Providers from "./providers";

import { setCacheVehicles } from "@/services/storeVehicles";

export async function generateViewport({}) {
  return {
    initialScale: 1,
    width: "device-width",
    userScalable: false,
  };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setCacheVehicles();

  return (
    <html
      lang="en"
      className={`${fonts.toyotaDisplay.variable} ${fonts.toyotaType.variable} ${fonts.toyotaText.variable}`}
      manifest="/manifest.json"
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
