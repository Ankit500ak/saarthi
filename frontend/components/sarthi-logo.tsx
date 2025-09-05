interface SarthiLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function SarthiLogo({ className = "", size = "md" }: SarthiLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`${sizeClasses[size]} bg-primary rounded-lg flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-90"></div>
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white relative z-10">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.7" />
        </svg>
      </div>
      <span className={`font-bold text-primary ${size === "lg" ? "text-xl" : size === "md" ? "text-lg" : "text-base"}`}>
        Sarthi
      </span>
    </div>
  )
}
