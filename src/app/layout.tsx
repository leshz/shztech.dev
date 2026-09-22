import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { ThemeProvider } from "@/components/layout/ThemeProvider/ThemeProvider";
import styles from "./layout.module.css";
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
      <body>
        <a href="#main" className={styles.skipLink}>
          Skip to content
        </a>
        <ThemeProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
