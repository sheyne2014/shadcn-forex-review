"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LayoutDashboard, Star, MessageSquare, Settings, User, LogOut, ChartBar, Shield, BellRing } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Navigation items for the sidebar
const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Reviews",
    href: "/dashboard/reviews",
    icon: MessageSquare,
  },
  {
    title: "Favorite Brokers",
    href: "/dashboard/favorites",
    icon: Star,
  },
  {
    title: "Statistics",
    href: "/dashboard/statistics",
    icon: ChartBar,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: BellRing,
    badge: 3,
  },
  {
    title: "Security",
    href: "/dashboard/security",
    icon: Shield,
  },
  {
    title: "Account Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r bg-card pt-0">
      <div className="px-3 py-5">
        <div className="flex items-center px-2 mb-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Trader since 2021</p>
            </div>
          </div>
          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
        </div>

        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              size="sm"
              asChild
              className="w-full justify-start"
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
                {item.badge && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            </Button>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
            <Link href="/dashboard/profile">
              <User className="mr-2 h-4 w-4" />
              View Profile
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </Sidebar>
  );
}
