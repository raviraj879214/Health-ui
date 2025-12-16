import localFont from "next/font/local";

const gilroy = localFont({
  variable: "--font-gilroy",
  src: [
    { path: "../fonts/gilroy/Gilroy-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/gilroy/Gilroy-Light.woff", weight: "300", style: "normal" },

    { path: "../fonts/gilroy/Gilroy-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../fonts/gilroy/Gilroy-LightItalic.woff", weight: "300", style: "italic" },

    { path: "../fonts/gilroy/Gilroy-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/gilroy/Gilroy-Regular.woff", weight: "400", style: "normal" },

    { path: "../fonts/gilroy/Gilroy-RegularItalic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/gilroy/Gilroy-RegularItalic.woff", weight: "400", style: "italic" },

    { path: "../fonts/gilroy/Gilroy-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/gilroy/Gilroy-Medium.woff", weight: "500", style: "normal" },

    { path: "../fonts/gilroy/Gilroy-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/gilroy/Gilroy-MediumItalic.woff", weight: "500", style: "italic" },

    { path: "../fonts/gilroy/Gilroy-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/gilroy/Gilroy-SemiBold.woff", weight: "600", style: "normal" },

    { path: "../fonts/gilroy/Gilroy-SemiBoldItalic.woff2", weight: "600", style: "italic" },
    { path: "../fonts/gilroy/Gilroy-SemiBoldItalic.woff", weight: "600", style: "italic" },

    { path: "../fonts/gilroy/Gilroy-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/gilroy/Gilroy-Bold.woff", weight: "700", style: "normal" },

    { path: "../fonts/gilroy/Gilroy-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "../fonts/gilroy/Gilroy-BoldItalic.woff", weight: "700", style: "italic" },

    { path: "../fonts/gilroy/Gilroy-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../fonts/gilroy/Gilroy-ExtraBold.woff", weight: "800", style: "normal" },
  ],
});

export default gilroy;