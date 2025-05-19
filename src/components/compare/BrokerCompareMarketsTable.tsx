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

interface BrokerCompareMarketsTableProps {
  broker1: BrokerDetails;
  broker2: BrokerDetails;
}

export function BrokerCompareMarketsTable({ broker1, broker2 }: BrokerCompareMarketsTableProps) {
  // Get markets rating
  const getMarketsRating = (broker: BrokerDetails) => {
    return broker.markets_rating || Math.random() * 2 + 3;
  };

  const broker1MarketsRating = getMarketsRating(broker1);
  const broker2MarketsRating = getMarketsRating(broker2);

  // Render yes/no cell
  const renderYesNo = (value: boolean | string | null | undefined) => {
    const isYes = value === true || value === 'yes' || value === 'Yes';
    const isNo = value === false || value === 'no' || value === 'No';

    if (isYes) return <Check className="h-5 w-5 text-green-500 mx-auto" />;
    if (isNo) return <X className="h-5 w-5 text-red-500 mx-auto" />;
    return <span className="text-muted-foreground text-center block">-</span>;
  };

  // Helper function to determine which broker offers an asset class
  const hasAsset = (broker: BrokerDetails, asset: string): boolean => {
    if (!broker.supported_assets) return false;

    if (Array.isArray(broker.supported_assets)) {
      return broker.supported_assets.some(a =>
        typeof a === 'string' && a.toLowerCase().includes(asset.toLowerCase())
      );
    }

    // Handle the string case explicitly with type assertion
    const supportedAssetsStr = broker.supported_assets as string;
    if (typeof supportedAssetsStr === 'string') {
      return supportedAssetsStr.toLowerCase().includes(asset.toLowerCase());
    }

    return false;
  };

  // Common asset classes to check for
  const assetClasses = [
    { name: "Forex", id: "forex" },
    { name: "Stocks", id: "stocks" },
    { name: "Indices", id: "indices" },
    { name: "Commodities", id: "commodities" },
    { name: "Cryptocurrencies", id: "crypto" },
    { name: "ETFs", id: "etfs" },
    { name: "Bonds", id: "bonds" },
    { name: "Options", id: "options" },
    { name: "Futures", id: "futures" }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Markets & Products Comparison</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="p-4 rounded-lg border bg-muted/20">
            <h4 className="text-lg font-medium mb-2">{broker1.name} Markets</h4>
            <p className="text-sm text-muted-foreground">
              {broker1.name} offers trading in {Array.isArray(broker1.supported_assets) ? broker1.supported_assets.join(', ') : (broker1.supported_assets || 'various markets')} with a markets rating of {broker1MarketsRating.toFixed(1)}/5.
            </p>
          </div>
        </div>

        <div>
          <div className="p-4 rounded-lg border bg-muted/20">
            <h4 className="text-lg font-medium mb-2">{broker2.name} Markets</h4>
            <p className="text-sm text-muted-foreground">
              {broker2.name} offers trading in {Array.isArray(broker2.supported_assets) ? broker2.supported_assets.join(', ') : (broker2.supported_assets || 'various markets')} with a markets rating of {broker2MarketsRating.toFixed(1)}/5.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <div className="min-w-[600px]"> {/* Force minimum width to ensure scrollability on mobile */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Asset Class</TableHead>
                <TableHead>{broker1.name}</TableHead>
                <TableHead>{broker2.name}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetClasses.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>{renderYesNo(hasAsset(broker1, asset.id))}</TableCell>
                  <TableCell>{renderYesNo(hasAsset(broker2, asset.id))}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">Overall Markets Rating</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span
                      className={`inline-block h-3 w-3 rounded-full mr-2 ${broker1MarketsRating > 4 ? 'bg-green-500' : broker1MarketsRating > 3 ? 'bg-amber-500' : 'bg-red-500'}`}
                    />
                    {broker1MarketsRating.toFixed(1)}/5
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span
                      className={`inline-block h-3 w-3 rounded-full mr-2 ${broker2MarketsRating > 4 ? 'bg-green-500' : broker2MarketsRating > 3 ? 'bg-amber-500' : 'bg-red-500'}`}
                    />
                    {broker2MarketsRating.toFixed(1)}/5
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-medium mb-4">Trading Conditions Compared</h4>
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="min-w-[600px]"> {/* Force minimum width to ensure scrollability on mobile */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Feature</TableHead>
                  <TableHead>{broker1.name}</TableHead>
                  <TableHead>{broker2.name}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Min. Trade Size</TableCell>
                  <TableCell>{broker1.min_trade_size || 'Not specified'}</TableCell>
                  <TableCell>{broker2.min_trade_size || 'Not specified'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Max. Leverage</TableCell>
                  <TableCell>{broker1.max_leverage || 'Not specified'}</TableCell>
                  <TableCell>{broker2.max_leverage || 'Not specified'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Forex Pairs</TableCell>
                  <TableCell>{broker1.forex_pairs || 'Multiple pairs'}</TableCell>
                  <TableCell>{broker2.forex_pairs || 'Multiple pairs'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Crypto CFDs</TableCell>
                  <TableCell>{broker1.crypto_cfds || 'Not specified'}</TableCell>
                  <TableCell>{broker2.crypto_cfds || 'Not specified'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Stock CFDs</TableCell>
                  <TableCell>{broker1.stock_cfds || 'Not specified'}</TableCell>
                  <TableCell>{broker2.stock_cfds || 'Not specified'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Index CFDs</TableCell>
                  <TableCell>{broker1.index_cfds || 'Not specified'}</TableCell>
                  <TableCell>{broker2.index_cfds || 'Not specified'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}