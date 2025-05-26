"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  PieChart,
  Calendar,
  BarChart4,
  Percent,
  CreditCard,
  Clock,
  AlertTriangle
} from "lucide-react";

interface Broker {
  name?: string;
  account_types?: string | string[];
  spreads?: Record<string, string>;
  min_deposit?: string | number;
  max_leverage?: string;
  spreads_from?: string;
  commission_details?: string;
  payment_methods?: string | string[];
  [key: string]: unknown;
}

interface TradingConditionsProps {
  broker: Broker;
}

interface AccountComparisonItem {
  name: string;
  min_deposit: number;
  spreads: string;
  commission: string;
  leverage: string;
  features: string[];
}

export function BrokerTradingConditions({ broker }: TradingConditionsProps) {
  // Safely handle missing broker data
  if (!broker || typeof broker !== 'object') {
    return (
      <div className="bg-muted p-6 rounded-lg">
        <div className="flex items-center text-amber-600 gap-2">
          <AlertTriangle className="h-5 w-5" />
          <p>Trading conditions information is missing or invalid.</p>
        </div>
      </div>
    );
  }

  // Format account types as array
  const accountTypes = broker.account_types
    ? (typeof broker.account_types === 'string'
      ? broker.account_types.split(',').map((type: string) => type.trim())
      : broker.account_types)
    : ["Standard", "Premium", "VIP"];

  // Default spreads if not provided
  const defaultSpreads = {
    eur_usd: "from 1.0 pips",
    gbp_usd: "from 1.2 pips",
    usd_jpy: "from 1.1 pips",
    xau_usd: "from 1.8 pips"
  };

  // Handle spreads data
  const spreads = broker.spreads || defaultSpreads;

  // Format fee structure (use defaults if not provided)
  const feeStructure = {
    withdrawal_fee: broker.withdrawal_fee || "Varies by method",
    deposit_fee: broker.deposit_fee || "Free for most methods",
    inactivity_fee: broker.inactivity_fee || "$10 monthly after 3 months",
    commission: broker.commission || "Commission-free on standard accounts",
    swap_rates: broker.swap_rates || "Variable, charged on overnight positions"
  };

  // Account comparison data (use defaults if not provided)
  const accountComparison: AccountComparisonItem[] = accountTypes.map((type: string, index: number) => {
    // Scale values based on account tier
    const multiplier = index + 1;

    return {
      name: type,
      min_deposit: broker[`${type.toLowerCase()}_min_deposit`] || (100 * multiplier),
      spreads: broker[`${type.toLowerCase()}_spreads`] || (1.8 - (index * 0.3)).toFixed(1) + " pips",
      commission: broker[`${type.toLowerCase()}_commission`] || (index === 0 ? "0" : "$3.5 per lot"),
      leverage: broker[`${type.toLowerCase()}_leverage`] || (100 * multiplier) + ":1",
      features: broker[`${type.toLowerCase()}_features`] || [
        "Basic Support",
        index >= 1 ? "Priority Support" : null,
        index >= 1 ? "Trading Signals" : null,
        index >= 2 ? "Personal Account Manager" : null,
        index >= 2 ? "Expert Analysis" : null
      ].filter(Boolean) as string[]
    };
  });

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight mb-4">Trading Conditions</h2>

      {/* General Trading Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Spreads Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <BarChart4 className="h-5 w-5 mr-2" />
              Spreads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {broker.spreads_from || "From 1.0 pips"}
            </div>
            <p className="text-sm text-muted-foreground">
              Average spreads on major pairs. May vary based on market conditions and account type.
            </p>
          </CardContent>
        </Card>

        {/* Leverage Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <PieChart className="h-5 w-5 mr-2" />
              Max Leverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {broker.max_leverage || "1:400"}
            </div>
            <p className="text-sm text-muted-foreground">
              Maximum leverage available. Higher leverage increases both potential profit and risk.
            </p>
          </CardContent>
        </Card>

        {/* Min Deposit Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <DollarSign className="h-5 w-5 mr-2" />
              Minimum Deposit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {broker.min_deposit ? `$${broker.min_deposit}` : "$100"}
            </div>
            <p className="text-sm text-muted-foreground">
              Minimum deposit to open a trading account. May vary by account type.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Trading Conditions */}
      <Tabs defaultValue="spreads" className="w-full">
        <TabsList className="w-full grid grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="spreads">Spreads & Commissions</TabsTrigger>
          <TabsTrigger value="fees">Fee Structure</TabsTrigger>
          <TabsTrigger value="accounts">Account Types</TabsTrigger>
        </TabsList>

        {/* Spreads Tab */}
        <TabsContent value="spreads" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Spreads on Popular Instruments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Instrument</TableHead>
                    <TableHead>Typical Spread</TableHead>
                    <TableHead className="hidden md:table-cell">Trading Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">EUR/USD</TableCell>
                    <TableCell>{spreads.eur_usd || "from 1.0 pips"}</TableCell>
                    <TableCell className="hidden md:table-cell">24/5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">GBP/USD</TableCell>
                    <TableCell>{spreads.gbp_usd || "from 1.2 pips"}</TableCell>
                    <TableCell className="hidden md:table-cell">24/5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">USD/JPY</TableCell>
                    <TableCell>{spreads.usd_jpy || "from 1.1 pips"}</TableCell>
                    <TableCell className="hidden md:table-cell">24/5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">XAU/USD (Gold)</TableCell>
                    <TableCell>{spreads.xau_usd || "from 1.8 pips"}</TableCell>
                    <TableCell className="hidden md:table-cell">24/5</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-6 space-y-4">
                <h4 className="font-semibold">Commission Structure</h4>
                <p>{broker.commission_details || "Standard accounts typically offer commission-free trading with wider spreads, while premium accounts may offer tighter spreads with a small commission per lot traded."}</p>

                <div className="flex items-center text-sm text-muted-foreground mt-4">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Spreads may widen during high volatility or off-market hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value="fees" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Withdrawal Fee</TableCell>
                    <TableCell>{feeStructure.withdrawal_fee}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Deposit Fee</TableCell>
                    <TableCell>{feeStructure.deposit_fee}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Inactivity Fee</TableCell>
                    <TableCell>{feeStructure.inactivity_fee}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Commission</TableCell>
                    <TableCell>{feeStructure.commission}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Swap Rates</TableCell>
                    <TableCell>{feeStructure.swap_rates}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Payment Methods</h4>
                <div className="flex flex-wrap gap-2">
                  {(broker.payment_methods
                    ? (typeof broker.payment_methods === 'string'
                        ? broker.payment_methods.split(',')
                        : broker.payment_methods)
                    : ["Credit Card", "Bank Transfer", "E-Wallets", "Crypto"]).map((method: string, i: number) => (
                    <Badge key={i} variant="outline" className="flex items-center gap-1">
                      <CreditCard className="h-3 w-3" />
                      {method.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Types Tab */}
        <TabsContent value="accounts" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Types Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account Type</TableHead>
                    <TableHead className="hidden md:table-cell">Min Deposit</TableHead>
                    <TableHead>Spreads</TableHead>
                    <TableHead className="hidden md:table-cell">Commission</TableHead>
                    <TableHead>Max Leverage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accountComparison.map((account: AccountComparisonItem, i: number) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{account.name}</TableCell>
                      <TableCell className="hidden md:table-cell">${account.min_deposit}</TableCell>
                      <TableCell>{account.spreads}</TableCell>
                      <TableCell className="hidden md:table-cell">{account.commission}</TableCell>
                      <TableCell>{account.leverage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {accountComparison.map((account: AccountComparisonItem, i: number) => (
                  <Card key={i} className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-center">{account.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {account.features.map((feature: string, j: number) => (
                          <li key={j} className="flex items-center text-sm">
                            <Percent className="h-4 w-4 mr-2 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}