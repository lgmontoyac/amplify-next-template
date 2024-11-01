// src/app/layout.tsx
"use server";

import { fonts } from "@/theme/fonts";
import "@aws-amplify/ui-react/styles.css";
import "@/app/app.css";

import Providers from "./providers";

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs, {
  ssr: true,
});

export default async function RootLayout({
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
