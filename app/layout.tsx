import "./globals.css";
import { PT_Mono, Noto_Sans, Work_Sans } from "@next/font/google";
import { Logo } from "@/src/components/global/Logo";
import { AppProvider } from "context";

const noto = Noto_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "auto",
  subsets: ["latin"],
  variable: "--noto-font",
});

const work = Work_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "auto",
  subsets: ["latin"],
  variable: "--work-font",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <html lang="en" className={`${noto.variable} ${work.variable}`}>
        <head />

        <body className="w-full h-screen cstm-grdbg-blk-1-2 cstm-scrollbar">
          <Logo />
          {children}
        </body>
      </html>
    </AppProvider>
  );
}
