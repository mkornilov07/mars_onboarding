import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import {Prism} from 'prismjs'

const roboto = Roboto({ subsets: ["latin"], weight: ["300"] });

export const metadata: Metadata = {
  title: "Mars Onboarding",
  description: "ill let the stone write this one",
  icons: {
    icon: "/icons/mars_onboarding_icon.png",
  },
};

export default function RootLayout({children}: { children: React.ReactNode }){
  return (
    <html lang="en" className = "dark text-foreground bg-background select-none">
      <body className={roboto.className}>
        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  );
};