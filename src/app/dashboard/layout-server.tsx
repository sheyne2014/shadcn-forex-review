import { Metadata } from "next";
import React from "react";

// Generate metadata for the dashboard page
export const metadata: Metadata = {
  title: "Dashboard | Forex Broker Reviews",
  description: "Manage your account, view your reviews, and track your favorite brokers.",
};

export default function DashboardServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}