import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function BrokerAnalysisLogo({ className, width = 180, height = 40 }: LogoProps) {
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
    >
      <span className="text-primary">BROKER</span>
      <span>ANALYSIS</span>
    </div>
  );
} 