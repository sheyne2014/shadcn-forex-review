import { Metadata } from "next";
import React from "react";

// Generate metadata for the dashboard settings page
export const metadata: Metadata = {
  title: "Account Settings | Forex Broker Reviews",
  description: "Manage your account settings, notifications, and privacy preferences.",
};

export default function SettingsServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}