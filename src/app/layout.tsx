import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shztech.dev"),
  title: "Jeffer Barragán — Senior Full-Stack Engineer",
  description:
    "Senior full-stack engineer specialising in crypto and fintech systems.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={robotoMono.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
