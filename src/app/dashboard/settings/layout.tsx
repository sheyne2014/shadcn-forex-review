// Note: Metadata is now exported from layout-server.tsx (server component)
// Client components cannot export metadata in Next.js

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}