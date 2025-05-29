'use client';

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AccountTypesProps {
  broker: any;
}

export function AccountTypesSection({ broker }: AccountTypesProps) {
  if (!broker) {
    return null;
  }

  const accountTypes = broker.account_types || [
    {
      name: "Standard",
      minDeposit: "200",
      spread: "1.0",
      commission: "0",
      features: ["Basic trading platform", "Market research", "Educational resources"]
    },
    {
      name: "Premium",
      minDeposit: "1000",
      spread: "0.8",
      commission: "0",
      features: ["Advanced platform features", "Priority support", "Trading signals"]
    },
    {
      name: "Professional",
      minDeposit: "5000",
      spread: "0.6",
      commission: "0",
      features: ["VIP support", "Expert advisors", "Custom analysis"]
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Account Types & Fees</h2>

      <ScrollArea className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account Type</TableHead>
              <TableHead>Min. Deposit</TableHead>
              <TableHead>Spread from</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Key Features</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accountTypes.map((account, index) => (
              <TableRow key={`${account.name}-${index}`}>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>${account.minDeposit}</TableCell>
                <TableCell>{account.spread} pips</TableCell>
                <TableCell>{account.commission}</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside text-sm">
                    {(account.features || []).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Trading Fees</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Spreads starting from</span>
              <span className="font-medium">{broker.min_spread || "0.6"} pips</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Commission per lot</span>
              <span className="font-medium">${broker.commission_per_lot || "0"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Deposit fee</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Withdrawal fee</span>
              <span className="font-medium">Varies by method</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Additional Charges</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Swap rates</span>
              <span className="font-medium">Market rate +2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Inactivity fee</span>
              <span className="font-medium">$10/month after 12 months</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Currency conversion</span>
              <span className="font-medium">0.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Account maintenance</span>
              <span className="font-medium">Free</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}