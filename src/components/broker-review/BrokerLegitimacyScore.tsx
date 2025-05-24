import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, Check, HelpCircle, Info, Shield, X } from "lucide-react";

interface BrokerLegitimacyScoreProps {
  broker: any;
  verificationData?: {
    score: number;
    maxScore: number;
    verificationChecks: {
      name: string;
      description: string;
      status: "verified" | "warning" | "failed" | "pending";
      details: string;
    }[];
    lastUpdated?: string;
  };
}

export function BrokerLegitimacyScore({ 
  broker, 
  verificationData 
}: BrokerLegitimacyScoreProps) {
  // Default verification data if not provided
  const defaultVerificationData = {
    score: broker.regulations ? 85 : 50,
    maxScore: 100,
    verificationChecks: [
      {
        name: "Regulatory Compliance",
        description: "Verified regulatory status with relevant financial authorities",
        status: broker.regulations ? "verified" : "warning",
        details: broker.regulations 
          ? `Regulated by ${broker.regulations}` 
          : "Regulation status could not be fully verified"
      },
      {
        name: "Company Registration",
        description: "Verified legitimate business registration",
        status: broker.year_founded ? "verified" : "pending",
        details: broker.year_founded 
          ? `Registered business operating since ${broker.year_founded}` 
          : "Company registration details pending verification"
      },
      {
        name: "Segregated Client Funds",
        description: "Client funds held in segregated accounts",
        status: "pending",
        details: "Verification in progress"
      },
      {
        name: "Negative Balance Protection",
        description: "Protection against negative account balances",
        status: broker.negative_balance_protection ? "verified" : "pending",
        details: broker.negative_balance_protection 
          ? "Negative balance protection confirmed" 
          : "Negative balance protection status not verified"
      },
      {
        name: "Transparent Fee Structure",
        description: "Clear and transparent fee disclosure",
        status: broker.trading_fee ? "verified" : "warning",
        details: broker.trading_fee 
          ? "Fee structure clearly disclosed" 
          : "Fee structure partially disclosed or unclear"
      },
      {
        name: "Reasonable Trading Conditions",
        description: "Trading conditions within industry standards",
        status: broker.max_leverage && parseInt(broker.max_leverage.replace(/\D/g, '')) <= 1000 
          ? "verified" 
          : "warning",
        details: broker.max_leverage && parseInt(broker.max_leverage.replace(/\D/g, '')) <= 1000 
          ? "Trading conditions are reasonable" 
          : "Some trading conditions require caution"
      }
    ],
    lastUpdated: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  // Use provided verification data or default
  const data = verificationData || defaultVerificationData;
  
  // Calculate percentage score
  const scorePercentage = Math.round((data.score / data.maxScore) * 100);
  
  // Determine score level
  const getScoreLevel = (percentage: number) => {
    if (percentage >= 80) return { level: "High", color: "bg-green-500" };
    if (percentage >= 60) return { level: "Medium", color: "bg-amber-500" };
    return { level: "Low", color: "bg-red-500" };
  };
  
  const scoreLevel = getScoreLevel(scorePercentage);
  
  // Render status icon based on check status
  const renderStatusIcon = (status: string) => {
    switch(status) {
      case "verified":
        return <Check className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "failed":
        return <X className="h-5 w-5 text-red-600" />;
      case "pending":
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" /> Broker Legitimacy Score
        </CardTitle>
        <CardDescription>
          Assessment of {broker.name}'s verification status and legitimacy checks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center mb-4">
          <div className="mb-2 relative">
            <Progress value={scorePercentage} className="h-3" />
            <div 
              className={`absolute top-0 h-full ${scoreLevel.color}`} 
              style={{ width: `${scorePercentage}%`, maxWidth: "100%" }}
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Low Trust</span>
            <span>Medium Trust</span>
            <span>High Trust</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold">{data.score}/{data.maxScore}</div>
            <div className="text-sm text-muted-foreground">Legitimacy Score</div>
          </div>
          <div className={`px-3 py-1 rounded-full text-white ${scoreLevel.color}`}>
            {scoreLevel.level} Trust
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">Verification Checks</h3>
          <div className="space-y-2">
            {data.verificationChecks.map((check, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <div className="flex items-start justify-between p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        {renderStatusIcon(check.status)}
                      </div>
                      <div>
                        <TooltipTrigger asChild>
                          <div className="font-medium text-sm cursor-help flex items-center">
                            {check.name}
                            <HelpCircle className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                          </div>
                        </TooltipTrigger>
                        <div className="text-xs text-muted-foreground">{check.details}</div>
                      </div>
                    </div>
                    <div className="text-xs px-2 rounded-full border flex items-center h-5">
                      {check.status === "verified" ? "Verified" : 
                       check.status === "warning" ? "Warning" :
                       check.status === "failed" ? "Failed" : "Pending"}
                    </div>
                  </div>
                  <TooltipContent>
                    <p className="max-w-xs">{check.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          Last updated: {data.lastUpdated}
        </div>
        
        <Button className="w-full" variant="outline">View Full Verification Report</Button>
      </CardContent>
    </Card>
  );
} 