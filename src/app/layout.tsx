import { Inter } from "next/font/google";
import "./globals.css";
import AppNavbar from "@/components/AppNavbar";
import { Toaster } from "react-hot-toast";
import ProgressBar from "@/components/ProgressBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center">
          <AppNavbar />
          <div className="m-4 sm:m-8 px-4 sm:px-8 flex justify-center w-full">
            {children}
          </div>
          <Toaster position="top-right" />
        </main>
        <ProgressBar />
      </body>
    </html>
  );
}
