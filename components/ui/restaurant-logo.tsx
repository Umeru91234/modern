import React from "react";

interface RestaurantLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RestaurantLogo({
  size = "md",
  className = "",
}: RestaurantLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Modern restaurant icon with geometric design */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="url(#logoGradient)"
          className="drop-shadow-sm"
        />

        {/* Fork */}
        <path
          d="M10 8 L10 20 M8 8 L8 12 M12 8 L12 12"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Knife */}
        <path
          d="M22 8 L22 20 M20 10 L22 8 L24 10"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Plate */}
        <ellipse cx="16" cy="18" rx="4" ry="1.5" fill="white" opacity="0.9" />

        {/* Accent dot */}
        <circle cx="24" cy="8" r="2" fill="#fbbf24" className="animate-pulse" />
      </svg>
    </div>
  );
}

export function RestaurantBrand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <RestaurantLogo size="md" className="animate-bounce" />
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          RestaurantOS
        </h1>
        <p className="text-xs text-gray-500 tracking-wide">MANAGEMENT SYSTEM</p>
      </div>
    </div>
  );
}
