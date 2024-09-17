import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react"
const roboto = Roboto({ subsets: ["latin"], weight: ["300"] });

export const metadata: Metadata = {
  title: "Mars Onboarding",
  description: "Begin your journey at UVA's most innovative organization",
  icons: {
    icon: "/icons/mars_onboarding_icon.png",
  },
};

export default function RootLayout({children}: { children: React.ReactNode }){
  return (<Analytics>
    <html lang="en" className = "dark text-foreground bg-background select-none">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className={roboto.className}>
        <Providers>
          { children }
        </Providers>
      </body>
    </html>
    </Analytics>
  );
};