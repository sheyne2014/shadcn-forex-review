export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Forex Analysis. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-end">
          <a href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="text-sm text-muted-foreground hover:underline">
            Terms of Service
          </a>
          <a href="/contact" className="text-sm text-muted-foreground hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
} 