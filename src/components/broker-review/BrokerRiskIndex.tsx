import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, ShieldAlert, Info, TrendingUp, TrendingDown, Zap } from "lucide-react";

interface BrokerRiskIndexProps {
  broker: any;
  riskData?: {
    overallRisk: "low" | "medium" | "high" | "very-high";
    riskFactors: {
      name: string;
      risk: "low" | "medium" | "high" | "very-high";
      description: string;
    }[];
    riskDisclaimer: string;
  };
}

export function BrokerRiskIndex({ 
  broker,
  riskData
}: BrokerRiskIndexProps) {
  // Default risk data if not provided
  const defaultRiskData = {
    overallRisk: determineOverallRisk(broker),
    riskFactors: [
      {
        name: "Regulatory Risk",
        risk: broker.regulations ? "low" : "high",
        description: broker.regulations 
          ? `${broker.name} is regulated by ${broker.regulations}, which provides a layer of protection for traders.` 
          : `${broker.name}'s regulatory status could not be fully verified, which increases potential risk.`
      },
      {
        name: "Leverage Risk",
        risk: broker.max_leverage && parseInt(broker.max_leverage.replace(/\D/g, '')) > 500 
          ? "high" 
          : broker.max_leverage && parseInt(broker.max_leverage.replace(/\D/g, '')) > 200 
            ? "medium" 
            : "low",
        description: broker.max_leverage 
          ? `${broker.name} offers maximum leverage of ${broker.max_leverage}, which ${parseInt(broker.max_leverage.replace(/\D/g, '')) > 500 ? 'significantly increases' : 'can increase'} potential losses.` 
          : `Unknown leverage parameters increase uncertainty of potential risk.`
      },
      {
        name: "Withdrawal Risk",
        risk: "medium",
        description: `Risk related to potential withdrawal delays or complications.`
      },
      {
        name: "Transparency Risk",
        risk: broker.trading_fee ? "low" : "medium",
        description: broker.trading_fee 
          ? `${broker.name} provides transparent fee structures and trading conditions.` 
          : `${broker.name} could improve transparency regarding trading fees and conditions.`
      },
      {
        name: "Longevity Risk",
        risk: broker.year_founded && new Date().getFullYear() - parseInt(broker.year_founded) > 10 
          ? "low" 
          : broker.year_founded && new Date().getFullYear() - parseInt(broker.year_founded) > 5 
            ? "medium" 
            : "high",
        description: broker.year_founded 
          ? `${broker.name} has been operating since ${broker.year_founded} (${new Date().getFullYear() - parseInt(broker.year_founded)} years).` 
          : `Unknown operational history increases potential uncertainty.`
      }
    ],
    riskDisclaimer: `Trading forex and CFDs involves significant risk of capital loss. The information provided is for educational purposes only and should not be considered investment advice. Always conduct your own research before trading with any broker.`
  };

  // Helper function to determine overall risk
  function determineOverallRisk(broker: any): "low" | "medium" | "high" | "very-high" {
    // Simple algorithm to determine risk level based on broker properties
    let riskPoints = 0;
    
    // Regulatory status
    if (!broker.regulations) riskPoints += 3;
    
    // Leverage offered
    if (broker.max_leverage) {
      const leverage = parseInt(broker.max_leverage.replace(/\D/g, ''));
      if (leverage > 1000) riskPoints += 3;
      else if (leverage > 500) riskPoints += 2;
      else if (leverage > 200) riskPoints += 1;
    } else {
      riskPoints += 2; // Unknown leverage
    }
    
    // Company age
    if (broker.year_founded) {
      const age = new Date().getFullYear() - parseInt(broker.year_founded);
      if (age < 2) riskPoints += 3;
      else if (age < 5) riskPoints += 2;
      else if (age < 10) riskPoints += 1;
    } else {
      riskPoints += 2; // Unknown age
    }
    
    // Determine risk level based on points
    if (riskPoints >= 7) return "very-high";
    if (riskPoints >= 5) return "high";
    if (riskPoints >= 3) return "medium";
    return "low";
  }

  // Use provided risk data or default
  const data = riskData || defaultRiskData;
  
  // Helper function to generate risk badge
  const getRiskBadge = (riskLevel: string) => {
    switch(riskLevel) {
      case "low":
        return <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">Low Risk</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100">Medium Risk</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-red-100 text-red-700 hover:bg-red-100">High Risk</Badge>;
      case "very-high":
        return <Badge variant="outline" className="bg-red-200 text-red-800 hover:bg-red-200">Very High Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown Risk</Badge>;
    }
  };
  
  // Helper function to get risk icon
  const getRiskIcon = (riskLevel: string) => {
    switch(riskLevel) {
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "medium":
        return <Info className="h-5 w-5 text-amber-500" />;
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "very-high":
        return <ShieldAlert className="h-5 w-5 text-red-700" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" /> Risk Index
            </CardTitle>
            <CardDescription>
              Understand the potential risks when trading with {broker.name}
            </CardDescription>
          </div>
          {getRiskBadge(data.overallRisk)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-lg bg-muted/20">
          <div className="flex items-center mb-2">
            {getRiskIcon(data.overallRisk)}
            <h3 className="ml-2 font-semibold">Overall Risk Assessment</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {data.overallRisk === "low" && `${broker.name} demonstrates low overall risk with good regulatory compliance and transparent operations.`}
            {data.overallRisk === "medium" && `${broker.name} shows moderate risk factors that traders should be aware of before opening an account.`}
            {data.overallRisk === "high" && `${broker.name} has several high-risk factors that traders should carefully consider before depositing funds.`}
            {data.overallRisk === "very-high" && `${broker.name} exhibits very high risk indicators. Extreme caution is advised.`}
          </p>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-semibold">Risk Factors</h3>
          {data.riskFactors.map((factor, index) => (
            <div key={index} className="flex items-start p-3 border-b last:border-b-0">
              <div className="mr-3 mt-0.5">
                {getRiskIcon(factor.risk)}
              </div>
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-sm">{factor.name}</h4>
                  <span className="ml-2">
                    {getRiskBadge(factor.risk)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {factor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground p-3 bg-muted/20 rounded-md">
          <AlertTriangle className="h-4 w-4 inline-block mr-1" />
          <span className="font-semibold">Risk Disclaimer:</span> {data.riskDisclaimer}
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 border rounded-md">
            <div className="flex items-center text-red-600 mb-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Potential for Loss</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Trading leveraged products can result in losses exceeding your initial deposit.
            </p>
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex items-center text-green-600 mb-1">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Risk Mitigation</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Always use stop-losses and never invest more than you can afford to lose.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 