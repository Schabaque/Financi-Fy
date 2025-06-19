'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, Play, TrendingUp, Shield, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 pt-16 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Main content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 text-sm text-yellow-400 font-medium">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Financial Intelligence</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white ">
            Manage Finances
            <span className="block bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              like never before
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            An AI-powered financial management system that helps you track your
            expenses and income, and provides you with personalized financial
            advice to secure your future.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              <span>Smart Analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-yellow-400" />
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Real-time Insights</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 text-lg group transition-all duration-200 shadow-lg hover:shadow-yellow-500/25"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="https://youtube.com">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-600 text-black hover:text-white hover:bg-yellow-500/10 hover:border-yellow-500/50 px-8 py-4 text-lg group transition-all duration-200"
              >
                <Play className="w-5 h-5 mr-2 group-hover:text-yellow-400 transition-colors" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">$2M+</div>
              <div className="text-gray-400">Money Managed</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default Hero;