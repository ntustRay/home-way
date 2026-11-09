import type {Metadata} from "next";
import {Inter} from 'next/font/google'
import "./globals.css";
import "@ntustray/web-authentication-component/styles.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./providers";
import {ClerkProvider} from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "HomeAway",
  description: "Feel at home, away from home",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers userId={user?.id ?? null}>
            <Navbar />
            <main className="py-10 container">
              {children}
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider >
  );
}
