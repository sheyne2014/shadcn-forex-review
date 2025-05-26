import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: 'default' | 'compact' | 'icon-only';
  showTagline?: boolean;
}

/**
 * Enhanced Logo component with modern design and professional styling.
 * Features trading-themed iconography and improved typography.
 *
 * @returns The rendered Logo component.
 */
export function Logo({ className, variant = 'default', showTagline = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 group transition-all duration-300 hover:scale-105", className)}>
      {/* Logo Icon */}
      {variant !== 'compact' && (
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 shadow-lg flex items-center justify-center logo-icon-glow logo-professional-shadow transition-all duration-300">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white logo-chart-animation"
            >
              {/* Enhanced Trading Chart Icon */}
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
              {/* Animated Data Points */}
              <circle cx="3" cy="17" r="1.5" fill="currentColor" className="logo-chart-animation" style={{animationDelay: '0.5s'}} />
              <circle cx="9" cy="11" r="1.5" fill="currentColor" className="logo-chart-animation" style={{animationDelay: '1s'}} />
              <circle cx="13" cy="15" r="1.5" fill="currentColor" className="logo-chart-animation" style={{animationDelay: '1.5s'}} />
              <circle cx="21" cy="7" r="1.5" fill="currentColor" className="logo-chart-animation" style={{animationDelay: '2s'}} />
            </svg>
          </div>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 w-12 h-12 rounded-xl bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Logo Text */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline">
            <span className="text-3xl font-black tracking-tight text-primary">
              BROKER
            </span>
            <span className="text-3xl font-black tracking-tight text-foreground/90 logo-professional-shadow ml-1">
              ANALYSIS
            </span>
          </div>
          {showTagline && (
            <div className="text-[11px] font-medium text-muted-foreground/80 tracking-wider uppercase mt-1">
              Trusted Broker Reviews & Comparisons
            </div>
          )}
        </div>
      )}
    </div>
  );
}
