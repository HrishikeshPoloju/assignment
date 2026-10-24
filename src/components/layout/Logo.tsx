import React from "react";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        aria-hidden="true"
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect
          width="40"
          height="40"
          rx="11"
          fill={isLight ? "#1D4E5B" : "#123B46"}
        />
        <path
          d="M20 7.5C20 7.5 11 17.5 11 24C11 28.9706 15.0294 33 20 33C24.9706 33 29 28.9706 29 24C29 17.5 20 7.5 20 7.5Z"
          fill="#25AFA5"
        />
        <path
          d="M13.5 24.8C15.5 26.5 18.2 26.5 20.2 24.8C22.2 23.1 24.8 23.1 26.8 24.8"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="23.5" cy="15.5" r="1.6" fill="#E6F2EE" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`text-xl font-bold tracking-tight ${
            isLight ? "text-white" : "text-[#123B46]"
          }`}
        >
          Aqua<span className="text-[#25AFA5]">Shine</span>
        </span>
        <span
          className={`text-[10px] font-medium tracking-[0.14em] uppercase mt-0.5 ${
            isLight ? "text-[#E6F2EE]/80" : "text-[#5D6B70]"
          }`}
        >
          Facility Care
        </span>
      </span>
    </span>
  );
}

