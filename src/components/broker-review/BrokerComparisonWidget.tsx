"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, X, AlertTriangle, Info, PlusCircle, ArrowRight } from "lucide-react";

interface BrokerComparisonWidgetProps {
  primaryBroker: any;
  comparisonBrokers?: any[];
  onAddBroker?: () => void;
}

export function BrokerComparisonWidget({
  primaryBroker,
  comparisonBrokers = [],
  onAddBroker
}: BrokerComparisonWidgetProps) {
  const [selectedFeatures, setSelectedFeatures] = useState([
    "regulation",
    "minDeposit",
    "maxLeverage",
    "tradingPlatforms",
    "spreadFrom",
    "tradingFee",
    "depositMethods",
  ]);

  // Format feature values for display
  const formatFeatureValue = (broker: any, feature: string) => {
    switch(feature) {
      case "regulation":
        return broker.regulations || "Not specified";
      case "minDeposit":
        return broker.min_deposit ? `$${broker.min_deposit}` : "Not specified";
      case "maxLeverage":
        return broker.max_leverage || "Not specified";
      case "tradingPlatforms":
        return broker.trading_platforms || "Various platforms";
      case "spreadFrom":
        return broker.spread_from || "Variable";
      case "tradingFee":
        return broker.trading_fee ? `${broker.trading_fee}%` : "Not specified";
      case "depositMethods":
        return "Credit Card, Bank Transfer, E-Wallets";
      case "withdrawalTime":
        return "1-3 business days";
      case "support":
        return "24/5 Support";
      case "mobileApp":
        return broker.mobile_app ? "Available" : "Yes";
      case "accountCurrencies":
        return broker.account_currencies || "USD, EUR, GBP";
      case "education":
        return broker.educational_resources ? "Yes" : "Basic resources";
      case "demoAccount":
        return "Available";
      default:
        return "Not specified";
    }
  };

  // Define feature labels
  const featureLabels: {[key: string]: string} = {
    regulation: "Regulation",
    minDeposit: "Min. Deposit",
    maxLeverage: "Max Leverage",
    tradingPlatforms: "Trading Platforms",
    spreadFrom: "Spread From",
    tradingFee: "Trading Fee",
    depositMethods: "Deposit Methods",
    withdrawalTime: "Withdrawal Time",
    support: "Customer Support",
    mobileApp: "Mobile App",
    accountCurrencies: "Account Currencies",
    education: "Educational Resources",
    demoAccount: "Demo Account"
  };

  // Check if a value is considered "better" than another
  const isBetterValue = (feature: string, value1: string, value2: string): boolean => {
    switch(feature) {
      case "minDeposit":
        // Lower minimum deposit is better
        const deposit1 = parseInt(value1.replace(/\D/g, '')) || 999999;
        const deposit2 = parseInt(value2.replace(/\D/g, '')) || 999999;
        return deposit1 < deposit2;
      case "maxLeverage":
        // Higher leverage is generally considered "better" (though more risky)
        const leverage1 = parseInt(value1.replace(/\D/g, '')) || 0;
        const leverage2 = parseInt(value2.replace(/\D/g, '')) || 0;
        return leverage1 > leverage2;
      case "spreadFrom":
        // Lower spread is better
        const spread1 = parseFloat(value1) || 999;
        const spread2 = parseFloat(value2) || 999;
        return spread1 < spread2;
      case "tradingFee":
        // Lower fee is better
        const fee1 = parseFloat(value1) || 999;
        const fee2 = parseFloat(value2) || 999;
        return fee1 < fee2;
      default:
        return false;
    }
  };

  const allBrokers = [primaryBroker, ...comparisonBrokers].filter(Boolean);

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Broker Comparison</CardTitle>
        <CardDescription>
          Compare {primaryBroker.name} with other popular brokers
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[200px]">Feature</TableHead>
                {allBrokers.map((broker, index) => (
                  <TableHead key={index} className="text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-14 w-32 relative">
                        {broker.logo_url ? (
                          <Image
                            src={broker.logo_url}
                            alt={`${broker.name} logo`}
                            fill
                            className="object-contain"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-muted rounded-md">
                            <span className="text-sm font-medium">{broker.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span className="ml-1 text-sm">{broker.rating || "N/A"}/5</span>
                      </div>
                    </div>
                  </TableHead>
                ))}
                {allBrokers.length < 3 && (
                  <TableHead className="text-center w-[200px]">
                    <Button
                      variant="outline"
                      className="h-full w-full border-dashed flex flex-col items-center justify-center p-6"
                      onClick={onAddBroker}
                    >
                      <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Add Broker</span>
                    </Button>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedFeatures.map((feature) => (
                <TableRow key={feature}>
                  <TableCell className="font-medium">{featureLabels[feature]}</TableCell>

                  {allBrokers.map((broker, index) => {
                    const value = formatFeatureValue(broker, feature);
                    const isHighlighted = comparisonBrokers.length > 0 &&
                      isBetterValue(
                        feature,
                        value,
                        formatFeatureValue(comparisonBrokers[0], feature)
                      );

                    return (
                      <TableCell
                        key={index}
                        className={`text-center ${isHighlighted ? 'text-green-600 font-medium' : ''}`}
                      >
                        {value}
                      </TableCell>
                    );
                  })}

                  {allBrokers.length < 3 && (
                    <TableCell className="text-center text-muted-foreground">
                      -
                    </TableCell>
                  )}
                </TableRow>
              ))}

              <TableRow>
                <TableCell className="font-medium">Visit Broker</TableCell>
                {allBrokers.map((broker, index) => (
                  <TableCell key={index} className="text-center">
                    <Button asChild size="sm">
                      <Link href={broker.url || (broker.name.toLowerCase() === 'etoro' ? '/broker/etoro' : `/broker/${broker.id}`)}>
                        Visit <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                ))}
                {allBrokers.length < 3 && (
                  <TableCell className="text-center">
                    -
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}