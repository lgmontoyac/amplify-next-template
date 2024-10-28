import localFont from "next/font/local";

export const toyotaDisplay = localFont({
  variable: "--font-toyotaDisplay",
  src: [
    {
      path: "../../public/fonts/ToyotaDisplay.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path:  "../../public/fonts/ToyotaDisplay_Rg.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path:  "../../public/fonts/ToyotaDisplay_He.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const toyotaText = localFont({
  variable: "--font-toyotaText",
  src: [
    {
      path:  "../../public/fonts/ToyotaText_BdIt.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path:  "../../public/fonts/ToyotaText_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path:  "../../public/fonts/ToyotaText_It.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path:  "../../public/fonts/ToyotaText_Rg.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const toyotaType = localFont({
  variable: "--font-toyotaType",
  src: [
    {
      path:  "../../public/fonts/ToyotaType-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path:  "../../public/fonts/ToyotaType-BlackIt.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path:  "../../public/fonts/ToyotaType-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path:  "../../public/fonts/ToyotaType-BoldIt.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path:  "../../public/fonts/ToyotaType-Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path:  "../../public/fonts/ToyotaType-BookIt.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path:  "../../public/fonts/ToyotaType-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path:  "../../public/fonts/ToyotaType-LightIt.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path:  "../../public/fonts/ToyotaType-Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path:  "../../public/fonts/ToyotaType-RegularIt.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path:  "../../public/fonts/ToyotaType-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path:  "../../public/fonts/ToyotaType-SemiboldIt.ttf",
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
