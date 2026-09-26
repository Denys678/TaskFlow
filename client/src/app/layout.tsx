import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Worklane",
  description: "Project and task management application",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}