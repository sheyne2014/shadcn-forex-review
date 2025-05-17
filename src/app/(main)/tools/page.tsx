import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Globe, LineChart, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Trading Tools | Broker Analysis",
  description: "Access powerful trading tools including broker comparison, calculators, converter, and more to enhance your trading experience.",
};

export default function ToolsPage() {
  const tools = [
    {
      title: "Broker Comparison",
      description: "Compare features, fees, and benefits of top trading brokers in a side-by-side comparison.",
      link: "/tools/compare",
      icon: <LineChart className="h-8 w-8" />,
    },
    {
      title: "Trading Calculator",
      description: "Calculate pip values, margin requirements, position sizes, and potential profits.",
      link: "/tools/calculator",
      icon: <Calculator className="h-8 w-8" />,
    },
    {
      title: "Broker Finder Quiz",
      description: "Answer a few questions to find the broker that best fits your trading style and needs.",
      link: "/tools/quiz",
      icon: <Search className="h-8 w-8" />,
    },
    {
      title: "Forex Converter",
      description: "Convert currencies and calculate exchange rates with our easy-to-use tool.",
      link: "/tools/converter",
      icon: <Globe className="h-8 w-8" />,
    },
    {
      title: "Scam Broker Check",
      description: "Verify if a broker is legitimate or potentially fraudulent with our scam detection tool.",
      link: "/tools/scam-check",
      icon: <ShieldCheck className="h-8 w-8" />,
    },
  ];

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Trading Tools</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Powerful tools to help you make better trading decisions.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                {tool.icon}
              </div>
              <CardTitle>{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-4">
              <Button asChild className="w-full">
                <Link href={tool.link}>
                  Use Tool <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 