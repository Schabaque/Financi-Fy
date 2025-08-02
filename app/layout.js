import { Inter } from "next/font/google";
import "./globals.css";
import CheckUserServer from "@/components/CheckUserServer";
import Header from "@/components/header";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { checkUser } from "@/lib/checkUser";
import { Toaster } from "sonner"; // ✅ Add this

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Wealth",
  description: "One stop shop for all your financial needs",
};

export default async function RootLayout({ children }) {
  await checkUser();

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ClerkProvider>
          {/* Run checkUser to store user on login */}
          <CheckUserServer />

          {/* Header */}
          <Header />

          {/* Main content */}
          {children}

          {/* Footer */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>
                Made with <span className="text-pink-500">♥</span> by 
              </p>
            </div>
          </footer>
        </ClerkProvider>

        {/* ✅ Add Toaster outside ClerkProvider */}
        <Toaster
          richColors
          theme="dark"
          position="top-center"
          duration={3000}
        />
      </body>
    </html>
  );
}
