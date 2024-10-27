import localFont from "next/font/local";

export const toyotaDisplay = localFont({
  variable: "--font-toyotaDisplay",
  src: [
    {
      path: "fonts/ToyotaDisplay.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "fonts/ToyotaDisplay_Rg.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "fonts/ToyotaDisplay_He.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const toyotaText = localFont({
  variable: "--font-toyotaText",
  src: [
    {
      path: "fonts/ToyotaText_BdIt.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "fonts/ToyotaText_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "fonts/ToyotaText_It.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "fonts/ToyotaText_Rg.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const toyotaType = localFont({
  variable: "--font-toyotaType",
  src: [
    {
      path: "fonts/ToyotaType-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "fonts/ToyotaType-BlackIt.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "fonts/ToyotaType-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "fonts/ToyotaType-BoldIt.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "fonts/ToyotaType-Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "fonts/ToyotaType-BookIt.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "fonts/ToyotaType-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "fonts/ToyotaType-LightIt.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "fonts/ToyotaType-Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "fonts/ToyotaType-RegularIt.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "fonts/ToyotaType-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "fonts/ToyotaType-SemiboldIt.ttf",
      weight: "600",
      style: "italic",
    },
  ],
});

export const fonts = {
  toyotaDisplay,
  toyotaText,
  toyotaType,
};
