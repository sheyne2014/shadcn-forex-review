"use client";

/* eslint-disable import/named */
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  // eslint-disable-next-line import/named
  Github,
  // eslint-disable-next-line import/named
  Twitter,
  // eslint-disable-next-line import/named
  Linkedin,
  // eslint-disable-next-line import/named
  Instagram,
  // eslint-disable-next-line import/named
  Facebook,
  // eslint-disable-next-line import/named
  Youtube,
  // eslint-disable-next-line import/named
  Twitch,
} from "lucide-react";

import { brand } from "@/lib/constants/brand";

import { Logo } from "@/components/logo";

const sections = [
  {
    title: "Product",
    links: [
      { href: "/download", label: "Download" },
      { href: "#features", label: "Features", isScroll: true },
      { href: "/info/security", label: "Security" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/info/company/about", label: "About Us" },
      { href: "/info/company/careers", label: "Careers" },
      { href: "/info/company/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/info/legal/privacy-policy", label: "Privacy Policy" },
      { href: "/info/legal/terms-of-service", label: "Terms of Service" },
      { href: "/info/legal/cookie-policy", label: "Cookie Policy" },
    ],
  },
];

const socialIcons = {
  github: <Github className="size-5" />,
  twitter: <Twitter className="size-5" />,
  linkedin: <Linkedin className="size-5" />,
  instagram: <Instagram className="size-5" />,
  facebook: <Facebook className="size-5" />,
  youtube: <Youtube className="size-5" />,
  twitch: <Twitch className="size-5" />,
};

export function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <footer className="border-t bg-background mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      target={
                        link.href.startsWith("/info/") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("/info/")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {brand.name}. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              {Object.entries(brand.social).map(([platform, href]) => {
                if (href !== "https://example.com") {
                  return (
                    <Link
                      key={platform}
                      href={href}
                      className="text-muted-foreground hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">{platform}</span>
                      {socialIcons[platform as keyof typeof socialIcons]}
                    </Link>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
