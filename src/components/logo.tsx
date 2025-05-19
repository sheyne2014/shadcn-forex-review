import { brand } from "@/lib/constants/brand";

/**
 * This component is used to display the logo of the app.
 * Styled to match the OKX logo design with a clean, modern style.
 *
 * @returns The rendered Logo component.
 */
export function Logo() {
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 border border-primary/20 mr-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z" fill="currentColor" className="text-foreground dark:text-white"/>
          <path d="M5 5H10V10H5V5Z" fill="currentColor" className="text-primary"/>
          <path d="M14 5H19V10H14V5Z" fill="currentColor" className="text-primary"/>
          <path d="M5 14H10V19H5V14Z" fill="currentColor" className="text-primary"/>
          <path d="M14 14H19V19L14 19V14Z" fill="currentColor" className="text-primary"/>
        </svg>
      </div>
      <span className="font-extrabold text-[22px] uppercase tracking-tighter">ForX</span>
    </div>
  );
}
