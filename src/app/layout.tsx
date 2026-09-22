import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="pt">
      <head>
        <link rel="icon" href="/logo/LOGO_APP.jpg" />
      </head>
      <body className="bg-saaj-bg text-saaj-text antialiased selection:bg-tonito-200 selection:text-tonito-900">
        {children}
      </body>
    </html>
  );
}
