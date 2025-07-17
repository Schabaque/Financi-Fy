"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          {/* Error Badge */}
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 text-sm text-yellow-400 font-medium">
            <AlertTriangle className="w-4 h-4" />
            <span>Page Not Found</span>
          </div>

          {/* 404 Number with dramatic styling */}
          <div className="relative">
            <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-bold leading-none">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                4
              </span>
              <span className="text-white mx-2 md:mx-4">0</span>
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                4
              </span>
            </h1>

            {/* Glow effect behind 404 */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-transparent to-yellow-500/20 blur-3xl -z-10"></div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Oops! Page Not Found
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. 
              Let&apos;s get you back to managing your finances.
            </p>
          </div>

          {/* Helpful suggestions */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-yellow-400" />
              <span>Check the URL</span>
            </div>
            <div className="flex items-center space-x-2">
              <Home className="w-5 h-5 text-yellow-400" />
              <span>Return Home</span>
            </div>
            {/* 
            <div className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-yellow-400" />
              <span>Go Back</span>
            </div>
            */}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 text-lg group transition-all duration-200 shadow-lg hover:shadow-yellow-500/25"
              >
                <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Return Home
              </Button>
            </Link>
            {/*
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.history.back()}
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-yellow-500/10 hover:border-yellow-500/50 px-8 py-4 text-lg group transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>
            */}
          </div>

          {/* Quick navigation */}
          {/*
          <div className="pt-12">
            <p className="text-gray-400 text-sm mb-4">Quick Navigation</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dashboard" className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm underline underline-offset-4">
                Dashboard
              </Link>
              <Link href="/transaction/create" className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm underline underline-offset-4">
                Add Transaction
              </Link>
              <Link href="/account" className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm underline underline-offset-4">
                Account
              </Link>
            </div>
          </div>
          */}

          {/* Animated dots */}
          {/*
          <div className="flex justify-center items-center space-x-2 pt-8">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-400"></div>
          </div>
          */}
        </div>
      </div>
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}