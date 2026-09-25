import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAAJ Virtual",
  description:
    "Plataforma de informação, saúde sexual e reprodutiva e agendamento de consultas para jovens em Moçambique.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo/LOGO_APP.jpg",
    apple: "/logo/LOGO_APP.jpg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SAAJ Virtual",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={manrope.variable}>
      <head>
        <link rel="icon" href="/logo/LOGO_APP.jpg" />
      </head>
      <body className="bg-saaj-canvas text-slate-900 antialiased selection:bg-tonito-100 selection:text-tonito-900 font-sans">
        {children}
      </body>
    </html>
  );
}
