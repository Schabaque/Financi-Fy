"use client";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Menu,
  X,
  TrendingUp,
  BarChart3,
  Wallet,
  Settings,
  Bell,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import { checkUser } from "@/lib/checkUser";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/", icon: BarChart3 },
    { name: "Portfolio", href: "/portfolio", icon: TrendingUp },
    { name: "Wallet", href: "/wallet", icon: Wallet },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ];

useEffect(() => {
  const runCheck = async () => {
    try {
      await checkUser(); // Runs once when user is signed in
    } catch (err) {
      console.error("User check failed:", err);
    }
  };

  runCheck();
}, []);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-black font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight">
                FinanceHub
              </span>
              <span className="text-xs text-yellow-400 font-medium">
                MONITOR
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-yellow-500/10 transition-all duration-200 group"
                >
                  <IconComponent className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Side - Auth & Actions */}
          <div className="flex items-center space-x-4">
            {/* Dashboard and Transaction Links */}
            <SignedIn>
              <div className="hidden lg:flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:text-white hover:bg-yellow-500/10 hover:border-yellow-500/50"
                  >
                    <LayoutDashboard size={18} />
                    <span className="hidden xl:inline ml-2">Dashboard</span>
                  </Button>
                </Link>
                <Link href="/transaction/create">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:text-white hover:bg-yellow-500/10 hover:border-yellow-500/50"
                  >
                    <Plus size={18} />
                    <span className="hidden xl:inline ml-2">
                      Add Transaction
                    </span>
                  </Button>
                </Link>
              </div>
            </SignedIn>

            {/* Notifications */}
            <SignedIn>
              <button className="relative p-2 text-gray-400 hover:text-white hover:bg-yellow-500/10 rounded-lg transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full"></span>
              </button>
            </SignedIn>

            {/* Settings */}
            <SignedIn>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-yellow-500/10 rounded-lg transition-all duration-200">
                <Settings className="w-5 h-5" />
              </button>
            </SignedIn>

            {/* Authentication */}
            <div className="flex items-center">
              <SignedOut>
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-[1px]">
                  <SignInButton>
                    <button className="bg-black rounded-lg px-6 py-2 hover:bg-gray-900 transition-colors text-yellow-400 font-semibold">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <div className="text-sm text-white font-medium">
                      Welcome back
                    </div>
                    <div className="text-xs text-yellow-400">
                      Portfolio Active
                    </div>
                  </div>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-10 h-10 ring-2 ring-yellow-500/30 hover:ring-yellow-500/60 transition-all",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-yellow-500/10 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-yellow-500/20">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-yellow-500/10 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IconComponent className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}

            {/* Mobile Quick Actions */}
            <SignedIn>
              <div className="pt-2 space-y-2">
                <Link href="/dashboard">
                  <div
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-yellow-500/10 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">Dashboard</span>
                  </div>
                </Link>
                <Link href="/transaction/create">
                  <div
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-yellow-500/10 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Plus className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">Add Transaction</span>
                  </div>
                </Link>
              </div>
            </SignedIn>

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-yellow-500/20">
              <SignedOut>
                <div className="px-4">
                  <SignInButton>
                    <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200">
                      Sign In to Continue
                    </button>
                  </SignInButton>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center justify-between px-4 py-2">
                  <div>
                    <div className="text-sm text-white font-medium">
                      Account Active
                    </div>
                    <div className="text-xs text-yellow-400">
                      Monitoring Portfolio
                    </div>
                  </div>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}

      {/* Gradient Border Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
    </header>
  );
};

export default Header;
