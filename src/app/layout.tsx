import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Cruz Azul Fan Portal",
    default: "Cruz Azul Fan Portal",
  },
  description:
    "La Pasión Nos Une. El portal definitivo para aficionados de La Máquina con noticias y resultados en tiempo real.",
  openGraph: {
    title: "Cruz Azul Fan Portal",
    description: "La Pasión Nos Une. El portal definitivo para aficionados de La Máquina.",
    url: "https://la-maquina-fan-hub.vercel.app",
    siteName: "Cruz Azul Fan Portal",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Cruz_Azul_logo_%282022%29.svg",
        width: 800,
        height: 600,
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { getSession } from "@/lib/session";
import { DevSignature } from "@/components/DevSignature";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="es" className={`${inter.variable} ${lexend.variable}`} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider initialSession={session}>
            <main className="flex-1 flex flex-col min-h-screen">
              <DevSignature />
              {children}
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
