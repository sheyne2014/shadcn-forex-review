import { cn } from "@/lib/utils";

interface LogoIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

/**
 * Standalone Logo Icon component for use in favicons, small spaces, etc.
 * Features the trading chart icon with professional styling.
 */
export function LogoIcon({ className, size = 32, animated = true }: LogoIconProps) {
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary/90 to-primary/70 shadow-lg logo-professional-shadow",
        animated && "logo-icon-glow transition-all duration-300",
        className
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg 
        width={size * 0.6} 
        height={size * 0.6} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "text-white",
          animated && "logo-chart-animation"
        )}
      >
        {/* Trading Chart Icon */}
        <path 
          d="M3 17L9 11L13 15L21 7" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={animated ? "logo-chart-animation" : ""}
        />
        <path 
          d="M16 7H21V12" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Data Points */}
        <circle 
          cx="3" 
          cy="17" 
          r="1.5" 
          fill="currentColor" 
          className={animated ? "logo-chart-animation" : ""} 
          style={animated ? {animationDelay: '0.5s'} : {}} 
        />
        <circle 
          cx="9" 
          cy="11" 
          r="1.5" 
          fill="currentColor" 
          className={animated ? "logo-chart-animation" : ""} 
          style={animated ? {animationDelay: '1s'} : {}} 
        />
        <circle 
          cx="13" 
          cy="15" 
          r="1.5" 
          fill="currentColor" 
          className={animated ? "logo-chart-animation" : ""} 
          style={animated ? {animationDelay: '1.5s'} : {}} 
        />
        <circle 
          cx="21" 
          cy="7" 
          r="1.5" 
          fill="currentColor" 
          className={animated ? "logo-chart-animation" : ""} 
          style={animated ? {animationDelay: '2s'} : {}} 
        />
      </svg>
    </div>
  );
}
