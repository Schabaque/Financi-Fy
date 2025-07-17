
import * as React from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "group relative bg-black backdrop-blur-sm border border-gray-800 hover:border-yellow-500/50 flex flex-col gap-6 rounded-xl py-6 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 overflow-hidden",
        "text-white", // Force all text inside to be white
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-500/0 before:via-yellow-500/5 before:to-yellow-500/0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        "after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-yellow-500/50 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 relative z-10 text-white",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-none font-semibold text-white group-hover:text-yellow-50 transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-white text-sm group-hover:text-yellow-50 transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end relative z-10 text-white",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 relative z-10 text-white", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-6 [.border-t]:pt-6 relative z-10 text-white",
        "before:absolute before:bottom-0 before:left-6 before:right-6 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-yellow-500/30 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 before:delay-200",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
