import localFont from "next/font/local";

export const karla = localFont({
  src: [
    {
      path: "../../public/fonts/Karla-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Karla-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-karla",
  display: "auto",
});

export const productSans = localFont({
  src: [
    {
      path: "../../public/fonts/ProductSans-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/ProductSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ProductSans-Black.ttf",
      weight: "900",
      style: "black",
    },
  ],
  variable: "--font-product-sans",
  display: "auto",
});

export const nexa = localFont({
  src: "../../public/fonts/Nexa-Regular.otf",
  weight: "400",
  style: "normal",
  display: "auto",
  variable: "--font-nexa",
});

export const proxima = localFont({
  src: [
    {
      path: "../../public/fonts/Proxima-Nova-Bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/Proxima-Nova-Extrabold.otf",
      weight: "800",
      style: "bold",
    },
    {
      path: "../../public/fonts/Proxima-Nova-Black.otf",
      weight: "800",
      style: "black",
    },
  ],
  variable: "--font-proxima",
  display: "auto",
});
