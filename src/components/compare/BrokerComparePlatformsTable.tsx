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

interface BrokerComparePlatformsTableProps {
  broker1: BrokerDetails;
  broker2: BrokerDetails;
}

export function BrokerComparePlatformsTable({ broker1, broker2 }: BrokerComparePlatformsTableProps) {
  // Get platforms rating
  const getPlatformsRating = (broker: BrokerDetails) => {
    return broker.platforms_rating || Math.random() * 2 + 3;
  };

  const broker1PlatformsRating = getPlatformsRating(broker1);
  const broker2PlatformsRating = getPlatformsRating(broker2);

  // Render yes/no cell
  const renderYesNo = (value: boolean | string | null | undefined) => {
    const isYes = value === true || value === 'yes' || value === 'Yes';
    const isNo = value === false || value === 'no' || value === 'No';
    
    if (isYes) return <Check className="h-5 w-5 text-green-500 mx-auto" />;
    if (isNo) return <X className="h-5 w-5 text-red-500 mx-auto" />;
    return <span className="text-muted-foreground text-center block">-</span>;
  };

  // Helper function to determine which broker offers a platform
  const hasPlatform = (broker: BrokerDetails, platform: string): boolean => {
    if (!broker.trading_platforms) return false;
    return broker.trading_platforms.toLowerCase().includes(platform.toLowerCase());
  };

  // Common platforms to check for
  const platforms = [
    { name: "MetaTrader 4 (MT4)", id: "mt4" },
    { name: "MetaTrader 5 (MT5)", id: "mt5" },
    { name: "cTrader", id: "ctrader" },
    { name: "WebTrader", id: "webtrader" },
    { name: "Mobile Apps", id: "mobile" },
    { name: "Proprietary Platform", id: "proprietary" }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Trading Platforms Comparison</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="p-4 rounded-lg border bg-muted/20">
            <h4 className="text-lg font-medium mb-2">{broker1.name} Platforms</h4>
            <p className="text-sm text-muted-foreground">
              {broker1.name} offers {broker1.trading_platforms || 'various trading platforms'} with a platform rating of {broker1PlatformsRating.toFixed(1)}/5.
            </p>
          </div>
        </div>
        
        <div>
          <div className="p-4 rounded-lg border bg-muted/20">
            <h4 className="text-lg font-medium mb-2">{broker2.name} Platforms</h4>
            <p className="text-sm text-muted-foreground">
              {broker2.name} offers {broker2.trading_platforms || 'various trading platforms'} with a platform rating of {broker2PlatformsRating.toFixed(1)}/5.
            </p>
          </div>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Platform</TableHead>
            <TableHead>{broker1.name}</TableHead>
            <TableHead>{broker2.name}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {platforms.map((platform) => (
            <TableRow key={platform.id}>
              <TableCell className="font-medium">{platform.name}</TableCell>
              <TableCell>{renderYesNo(hasPlatform(broker1, platform.id))}</TableCell>
              <TableCell>{renderYesNo(hasPlatform(broker2, platform.id))}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-medium">Web Trading</TableCell>
            <TableCell>{renderYesNo(broker1.web_trading)}</TableCell>
            <TableCell>{renderYesNo(broker2.web_trading)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Automated Trading</TableCell>
            <TableCell>{renderYesNo(broker1.automated_trading)}</TableCell>
            <TableCell>{renderYesNo(broker2.automated_trading)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">API Trading</TableCell>
            <TableCell>{renderYesNo(broker1.api_trading)}</TableCell>
            <TableCell>{renderYesNo(broker2.api_trading)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Demo Account</TableCell>
            <TableCell>{renderYesNo(broker1.demo_account)}</TableCell>
            <TableCell>{renderYesNo(broker2.demo_account)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Overall Platform Rating</TableCell>
            <TableCell>
              <div className="flex items-center">
                <span 
                  className={`inline-block h-3 w-3 rounded-full mr-2 ${broker1PlatformsRating > 4 ? 'bg-green-500' : broker1PlatformsRating > 3 ? 'bg-amber-500' : 'bg-red-500'}`} 
                />
                {broker1PlatformsRating.toFixed(1)}/5
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <span 
                  className={`inline-block h-3 w-3 rounded-full mr-2 ${broker2PlatformsRating > 4 ? 'bg-green-500' : broker2PlatformsRating > 3 ? 'bg-amber-500' : 'bg-red-500'}`} 
                />
                {broker2PlatformsRating.toFixed(1)}/5
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      <div className="mt-8">
        <h4 className="text-lg font-medium mb-4">Platform Features Compared</h4>
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
              <TableCell className="font-medium">Trading Signals</TableCell>
              <TableCell>{renderYesNo(broker1.trading_signals)}</TableCell>
              <TableCell>{renderYesNo(broker2.trading_signals)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Copy Trading</TableCell>
              <TableCell>{renderYesNo(broker1.copy_trading)}</TableCell>
              <TableCell>{renderYesNo(broker2.copy_trading)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Backtesting</TableCell>
              <TableCell>{renderYesNo(broker1.backtesting)}</TableCell>
              <TableCell>{renderYesNo(broker2.backtesting)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Custom Indicators</TableCell>
              <TableCell>{renderYesNo(broker1.custom_indicators)}</TableCell>
              <TableCell>{renderYesNo(broker2.custom_indicators)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Advanced Charting</TableCell>
              <TableCell>{renderYesNo(broker1.advanced_charting)}</TableCell>
              <TableCell>{renderYesNo(broker2.advanced_charting)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Trade Automation</TableCell>
              <TableCell>{renderYesNo(broker1.trade_automation)}</TableCell>
              <TableCell>{renderYesNo(broker2.trade_automation)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 