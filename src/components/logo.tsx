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
      <span className="font-bold text-2xl tracking-tight">
        <span className="text-primary">For</span>
        <span className="bg-primary text-white px-1.5 py-0.5 rounded">X</span>
      </span>
    </div>
  );
}
