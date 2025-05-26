import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
  variant?: 'default' | 'compact' | 'icon-only';
}

export function BrokerAnalysisWordLogo({
  className,
  width = 200,
  height = 44,
  alt = "BrokerAnalysis - Trusted Broker Reviews & Comparisons",
  variant = 'default'
}: LogoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 group transition-all duration-300 hover:scale-105",
        className
      )}
      style={{
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
      }}
      aria-label={alt}
      role="img"
    >
      {/* Logo Icon */}
      {variant !== 'compact' && (
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-primary/90 to-primary/70 shadow-lg flex items-center justify-center logo-icon-glow logo-professional-shadow transition-all duration-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white logo-chart-animation"
            >
              {/* Trading Chart Icon */}
              <path
                d="M3 17L9 11L13 15L21 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="logo-chart-animation"
              />
              <path
                d="M16 7H21V12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data Points */}
              <circle cx="3" cy="17" r="1.5" fill="currentColor" className="logo-chart-animation" style={{animationDelay: '0.5s'}} />
              <circle cx="9" cy="11" r="1.5" fill="currentColor" className="logo-chart-animation" style={{animationDelay: '1s'}} />
              <circle cx="13" cy="15" r="1.5" fill="currentColor" className="logo-chart-animation" style={{animationDelay: '1.5s'}} />
              <circle cx="21" cy="7" r="1.5" fill="currentColor" className="logo-chart-animation" style={{animationDelay: '2s'}} />
            </svg>
          </div>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 w-10 h-10 rounded-lg bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Logo Text */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black tracking-tight text-primary">
              BROKER
            </span>
            <span className="text-2xl font-black tracking-tight text-foreground/90 logo-professional-shadow">
              ANALYSIS
            </span>
          </div>
          <div className="text-[10px] font-medium text-muted-foreground/80 tracking-wider uppercase mt-0.5 ml-0.5">
            Trusted Broker Reviews & Comparisons
          </div>
        </div>
      )}
    </div>
  );
}