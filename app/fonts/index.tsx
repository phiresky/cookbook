import localFont from "next/font/local";

export const geistSans = localFont({
    src: "./GeistVF.woff",
    variable: "--font-geist-sans",
  });
export  const geistMono = localFont({
    src: "./GeistMonoVF.woff",
    variable: "--font-geist-mono",
  });
  
  export const handwriting = localFont({
    src: "./JustAnotherHand-Regular.ttf",
    variable: "--font-handwriting",
  })