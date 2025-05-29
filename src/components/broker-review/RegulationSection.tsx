import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface RegulationSectionProps {
  broker: any;
}

export function RegulationSection({ broker }: RegulationSectionProps) {
  const regulators = broker.regulators || [
    { name: "FCA", country: "UK", badge: "/images/regulators/fca.png" },
    { name: "CySEC", country: "Cyprus", badge: "/images/regulators/cysec.png" },
    { name: "ASIC", country: "Australia", badge: "/images/regulators/asic.png" }
  ];

  const securityFeatures = [
    {
      name: "Segregated Client Funds",
      description: "Client funds are kept separate from company operational accounts",
      score: 100
    },
    {
      name: "Negative Balance Protection",
      description: "Prevents traders from losing more than their account balance",
      score: 100
    },
    {
      name: "Data Encryption",
      description: "256-bit SSL encryption for all data transmission",
      score: 100
    },
    {
      name: "Two-Factor Authentication",
      description: "Optional 2FA for enhanced account security",
      score: 90
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Regulation & Security</h2>

      {/* Regulatory Authorities */}
      <div className="grid md:grid-cols-3 gap-6">
        {regulators.map((regulator) => (
          <Card key={regulator.name} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src={regulator.badge}
                  alt={`${regulator.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold">{regulator.name}</h3>
                <p className="text-sm text-muted-foreground">{regulator.country}</p>
              </div>
            </div>
            <Badge variant="outline" className="w-full justify-center">
              Licensed & Regulated
            </Badge>
          </Card>
        ))}
      </div>

      {/* Security Features */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Security Features & Measures</h3>
        <div className="space-y-6">
          {securityFeatures.map((feature) => (
            <div key={feature.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{feature.name}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
                <Badge variant={feature.score >= 100 ? "default" : "secondary"}>
                  {feature.score === 100 ? "Active" : "Optional"}
                </Badge>
              </div>
              <Progress value={feature.score} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Investor Protection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Investor Protection</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {broker.max_compensation || "£85,000"}
              </div>
              <div className="text-sm text-muted-foreground">
                Maximum Compensation per Client
              </div>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Covered by investor compensation schemes
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Regular audits by external firms
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Transparent company structure
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Additional Security Measures</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Real-time risk monitoring
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Advanced fraud detection systems
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Regular penetration testing
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}