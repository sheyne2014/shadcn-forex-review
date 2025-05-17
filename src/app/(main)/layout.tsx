import { AuthProvider } from "@/lib/providers/AuthProvider";
import NextTopLoader from 'nextjs-toploader';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <NextTopLoader color="#0091ff" showSpinner={false} />
      {children}
    </AuthProvider>
  );
}
