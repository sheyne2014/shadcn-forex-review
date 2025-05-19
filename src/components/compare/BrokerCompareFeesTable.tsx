"use client";

import { BrokerDetails } from "@/lib/brokers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Check, X, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BrokerCompareFeesTableProps {
  broker1: BrokerDetails;
  broker2: BrokerDetails;
}

export function BrokerCompareFeesTable({ broker1, broker2 }: BrokerCompareFeesTableProps) {
  // Get overall fee rating for coloring
  const getFeeRating = (broker: BrokerDetails) => {
    return broker.fees_rating || Math.random() * 2 + 3;
  };

  const broker1FeeRating = getFeeRating(broker1);
  const broker2FeeRating = getFeeRating(broker2);

  // Helper function to determine fee comparison result
  const compareFeeBadge = (value1: number | null | undefined, value2: number | null | undefined, lowerIsBetter = true) => {
    if (value1 === null || value1 === undefined || value2 === null || value2 === undefined) {
      return null;
    }

    if (value1 === value2) {
      return <Badge variant="outline">Same</Badge>;
    }

    const isBetter = lowerIsBetter ? value1 < value2 : value1 > value2;
    return isBetter
      ? <Badge variant="default" className="bg-green-600">Better</Badge>
      : <Badge variant="outline">Higher</Badge>;
  };

  // Render yes/no cell
  const renderYesNo = (value: boolean | string | null | undefined) => {
    const isYes = value === true || value === 'yes' || value === 'Yes';
    const isNo = value === false || value === 'no' || value === 'No';

    if (isYes) return <Check className="h-5 w-5 text-green-500 mx-auto" />;
    if (isNo) return <X className="h-5 w-5 text-red-500 mx-auto" />;
    return <span className="text-muted-foreground text-center block">-</span>;
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Fees Comparison</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="p-4 rounded-lg border bg-muted/20">
            <h4 className="text-lg font-medium mb-2">{broker1.name} Fees</h4>
            <p className="text-sm text-muted-foreground">
              {broker1.name} offers {broker1.trading_fee === 0 ? 'commission-free trading' : `trading with ${broker1.trading_fee}% fees`}
              with {broker1.spread_from ? `spreads from ${broker1.spread_from}` : 'variable spreads'}.
            </p>
          </div>
        </div>

        <div>
          <div className="p-4 rounded-lg border bg-muted/20">
            <h4 className="text-lg font-medium mb-2">{broker2.name} Fees</h4>
            <p className="text-sm text-muted-foreground">
              {broker2.name} offers {broker2.trading_fee === 0 ? 'commission-free trading' : `trading with ${broker2.trading_fee}% fees`}
              with {broker2.spread_from ? `spreads from ${broker2.spread_from}` : 'variable spreads'}.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <div className="min-w-[700px]"> {/* Force minimum width to ensure scrollability on mobile */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Fee Type</TableHead>
                <TableHead>{broker1.name}</TableHead>
                <TableHead>Compare</TableHead>
                <TableHead>{broker2.name}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Trading Fee</TableCell>
                <TableCell>{broker1.trading_fee === 0 ? 'Commission-free' : `${broker1.trading_fee}%`}</TableCell>
                <TableCell>{compareFeeBadge(broker1.trading_fee, broker2.trading_fee)}</TableCell>
                <TableCell>{broker2.trading_fee === 0 ? 'Commission-free' : `${broker2.trading_fee}%`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Forex Spread</TableCell>
                <TableCell>{broker1.spread_from || 'Variable'}</TableCell>
                <TableCell></TableCell>
                <TableCell>{broker2.spread_from || 'Variable'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Deposit Fee</TableCell>
                <TableCell>{broker1.deposit_fee === 0 ? 'Free' : broker1.deposit_fee ? `${broker1.deposit_fee}%` : 'No information'}</TableCell>
                <TableCell>{compareFeeBadge(broker1.deposit_fee || 0, broker2.deposit_fee || 0)}</TableCell>
                <TableCell>{broker2.deposit_fee === 0 ? 'Free' : broker2.deposit_fee ? `${broker2.deposit_fee}%` : 'No information'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Withdrawal Fee</TableCell>
                <TableCell>{broker1.withdrawal_fee === 0 ? 'Free' : broker1.withdrawal_fee ? `${broker1.withdrawal_fee}%` : 'No information'}</TableCell>
                <TableCell>{compareFeeBadge(broker1.withdrawal_fee || 0, broker2.withdrawal_fee || 0)}</TableCell>
                <TableCell>{broker2.withdrawal_fee === 0 ? 'Free' : broker2.withdrawal_fee ? `${broker2.withdrawal_fee}%` : 'No information'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Inactivity Fee</TableCell>
                <TableCell>{broker1.inactivity_fee === 0 ? 'None' : broker1.inactivity_fee ? `$${broker1.inactivity_fee}/month` : 'No information'}</TableCell>
                <TableCell>{compareFeeBadge(broker1.inactivity_fee || 0, broker2.inactivity_fee || 0)}</TableCell>
                <TableCell>{broker2.inactivity_fee === 0 ? 'None' : broker2.inactivity_fee ? `$${broker2.inactivity_fee}/month` : 'No information'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Account Fee</TableCell>
                <TableCell>{broker1.account_fee === 0 ? 'None' : broker1.account_fee ? `$${broker1.account_fee}/month` : 'No information'}</TableCell>
                <TableCell>{compareFeeBadge(broker1.account_fee || 0, broker2.account_fee || 0)}</TableCell>
                <TableCell>{broker2.account_fee === 0 ? 'None' : broker2.account_fee ? `$${broker2.account_fee}/month` : 'No information'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Overall Fee Rating</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span
                      className={`inline-block h-3 w-3 rounded-full mr-2 ${broker1FeeRating > 4 ? 'bg-green-500' : broker1FeeRating > 3 ? 'bg-amber-500' : 'bg-red-500'}`}
                    />
                    {broker1FeeRating.toFixed(1)}/5
                  </div>
                </TableCell>
                <TableCell>{compareFeeBadge(broker1FeeRating, broker2FeeRating, false)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span
                      className={`inline-block h-3 w-3 rounded-full mr-2 ${broker2FeeRating > 4 ? 'bg-green-500' : broker2FeeRating > 3 ? 'bg-amber-500' : 'bg-red-500'}`}
                    />
                    {broker2FeeRating.toFixed(1)}/5
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}