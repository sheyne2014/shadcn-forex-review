import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export function BrokerAnalysisWordLogo({ className, width = 180, height = 40, alt = "BrokerAnalysis Logo" }: LogoProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center text-xl font-bold",
        className
      )}
      style={{
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
      }}
      aria-label={alt}
      role="img"
    >
      <span className="text-primary">BROKER</span>
      <span>ANALYSIS</span>
    </div>
  );
}