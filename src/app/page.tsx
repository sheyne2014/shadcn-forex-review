import { redirect } from "next/navigation";

/**
 * This page redirects to the landing page which contains our homepage content
 * 
 * The landing page is within the `(main)` folder to inherit from the main layout
 * which includes the header and footer components.
 */
export default function RootPage() {
  redirect("/landing");
}
