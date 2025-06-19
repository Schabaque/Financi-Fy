import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Wealth",
  description: "One stop shop for all your financial needs",
};

export default function RootLayout({ children }) {
  return (
     <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* header (optional) */}
        <Header/>
        {children}
        {/* footer */}
        <footer className="bg-blue-50 py-12">

          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>
              Made with <span className="text-pink-500">♥</span> by 
            </p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
