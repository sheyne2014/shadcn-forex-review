"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  TrendingDown,
  TrendingUp,
  Equal,
  Crown,
  AlertCircle
} from 'lucide-react';

interface EtoroFeeComparisonProps {
  className?: string;
}

export function EtoroFeeComparison({ className }: EtoroFeeComparisonProps) {
  const [selectedComparison, setSelectedComparison] = useState('forex');

  // Broker name to slug mapping
  const brokerSlugs = {
    'IC Markets': 'ic-markets',
    'Pepperstone': 'pepperstone',
    'AvaTrade': 'avatrade',
    'Plus500': 'plus500',
    'eToro': 'etoro'
  };

  // Helper function to create clickable broker header
  const BrokerHeader = ({ name }: { name: string }) => {
    const slug = brokerSlugs[name as keyof typeof brokerSlugs];
    if (!slug || name === 'eToro') {
      return <span className="font-semibold">{name}</span>;
    }

    return (
      <Link
        href={`/broker/${slug}`}
        className="font-semibold hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
      >
        {name}
      </Link>
    );
  };

  const brokerComparisons = {
    forex: {
      name: 'Forex Spreads Comparison',
      pairs: [
        {
          pair: 'EUR/USD',
          etoro: '1.0 pips',
          icmarkets: '0.0 pips',
          pepperstone: '0.0 pips',
          avatrade: '0.9 pips',
          plus500: '0.8 pips'
        },
        {
          pair: 'GBP/USD',
          etoro: '2.0 pips',
          icmarkets: '0.1 pips',
          pepperstone: '0.1 pips',
          avatrade: '1.5 pips',
          plus500: '1.2 pips'
        },
        {
          pair: 'USD/JPY',
          etoro: '1.0 pips',
          icmarkets: '0.1 pips',
          pepperstone: '0.1 pips',
          avatrade: '1.0 pips',
          plus500: '0.9 pips'
        },
        {
          pair: 'AUD/USD',
          etoro: '1.5 pips',
          icmarkets: '0.1 pips',
          pepperstone: '0.1 pips',
          avatrade: '1.5 pips',
          plus500: '1.0 pips'
        }
      ]
    },
    stocks: {
      name: 'Stock Trading Costs',
      regions: [
        {
          region: 'US Stocks',
          etoro: 'Commission-free',
          icmarkets: '$1 per side',
          pepperstone: 'Not available',
          avatrade: 'CFDs only (spread)',
          plus500: 'CFDs only (spread)'
        },
        {
          region: 'UK Stocks',
          etoro: 'Commission-free',
          icmarkets: '0.02% (min £6)',
          pepperstone: 'Not available',
          avatrade: 'CFDs only (spread)',
          plus500: 'CFDs only (spread)'
        },
        {
          region: 'EU Stocks',
          etoro: 'Commission-free',
          icmarkets: '0.02% (min €6)',
          pepperstone: 'Not available',
          avatrade: 'CFDs only (spread)',
          plus500: 'CFDs only (spread)'
        }
      ]
    },
    crypto: {
      name: 'Cryptocurrency Spreads',
      coins: [
        {
          coin: 'Bitcoin',
          etoro: '0.75%',
          icmarkets: '0.50%',
          pepperstone: 'Not available',
          avatrade: '0.75%',
          plus500: '1.20%'
        },
        {
          coin: 'Ethereum',
          etoro: '1.90%',
          icmarkets: '1.00%',
          pepperstone: 'Not available',
          avatrade: '2.00%',
          plus500: '2.50%'
        },
        {
          coin: 'Ripple',
          etoro: '2.45%',
          icmarkets: '2.00%',
          pepperstone: 'Not available',
          avatrade: '2.50%',
          plus500: '3.00%'
        }
      ]
    },
    fees: {
      name: 'Additional Fees Comparison',
      feeTypes: [
        {
          type: 'Deposit Fee',
          etoro: 'Free',
          icmarkets: 'Free',
          pepperstone: 'Free',
          avatrade: 'Free',
          plus500: 'Free'
        },
        {
          type: 'Withdrawal Fee',
          etoro: '$5',
          icmarkets: 'Free',
          pepperstone: 'Free',
          avatrade: 'Free',
          plus500: 'Free'
        },
        {
          type: 'Inactivity Fee',
          etoro: '$10/month (12m)',
          icmarkets: '$10/month (6m)',
          pepperstone: '$15/month (6m)',
          avatrade: '$50/quarter (3m)',
          plus500: '$10/month (3m)'
        },
        {
          type: 'Currency Conversion',
          etoro: '50 pips',
          icmarkets: '25 pips',
          pepperstone: '25 pips',
          avatrade: '50 pips',
          plus500: '0.5%'
        }
      ]
    }
  };

  const getBestValue = (values: string[]) => {
    // Simple logic to determine best value (lowest number or "Free")
    const numericValues = values.map(v => {
      if (v.toLowerCase().includes('free') || v.toLowerCase().includes('commission-free')) return 0;
      if (v.toLowerCase().includes('not available')) return 999;
      const match = v.match(/[\d.]+/);
      return match ? parseFloat(match[0]) : 999;
    });
    const minIndex = numericValues.indexOf(Math.min(...numericValues));
    return minIndex;
  };

  const getComparisonIcon = (value: string, bestIndex: number, currentIndex: number) => {
    if (value.toLowerCase().includes('not available')) {
      return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
    if (currentIndex === bestIndex) {
      return <Crown className="h-4 w-4 text-yellow-500" />;
    }
    return null;
  };

  const getValueColor = (value: string, bestIndex: number, currentIndex: number) => {
    if (value.toLowerCase().includes('not available')) {
      return 'text-gray-400';
    }
    if (currentIndex === bestIndex) {
      return 'text-green-600 dark:text-green-400 font-semibold';
    }
    return 'text-foreground';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          eToro vs Competitors Fee Comparison
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          See how eToro's fees stack up against major competitors across different asset classes and services.
        </p>
      </div>

      <Tabs value={selectedComparison} onValueChange={setSelectedComparison}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="forex">Forex</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="fees">Other Fees</TabsTrigger>
        </TabsList>

        <TabsContent value="forex" className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Forex Spreads Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Currency Pair</th>
                      <th className="text-center p-3"><BrokerHeader name="eToro" /></th>
                      <th className="text-center p-3"><BrokerHeader name="IC Markets" /></th>
                      <th className="text-center p-3"><BrokerHeader name="Pepperstone" /></th>
                      <th className="text-center p-3"><BrokerHeader name="AvaTrade" /></th>
                      <th className="text-center p-3"><BrokerHeader name="Plus500" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {brokerComparisons.forex.pairs.map((pair, index) => {
                      const values = [pair.etoro, pair.icmarkets, pair.pepperstone, pair.avatrade, pair.plus500];
                      const bestIndex = getBestValue(values);
                      
                      return (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{pair.pair}</td>
                          <td className={`text-center p-3 ${getValueColor(pair.etoro, bestIndex, 0)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(pair.etoro, bestIndex, 0)}
                              {pair.etoro}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(pair.icmarkets, bestIndex, 1)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(pair.icmarkets, bestIndex, 1)}
                              {pair.icmarkets}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(pair.pepperstone, bestIndex, 2)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(pair.pepperstone, bestIndex, 2)}
                              {pair.pepperstone}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(pair.avatrade, bestIndex, 3)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(pair.avatrade, bestIndex, 3)}
                              {pair.avatrade}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(pair.plus500, bestIndex, 4)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(pair.plus500, bestIndex, 4)}
                              {pair.plus500}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stocks" className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Stock Trading Commission Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Market</th>
                      <th className="text-center p-3"><BrokerHeader name="eToro" /></th>
                      <th className="text-center p-3"><BrokerHeader name="IC Markets" /></th>
                      <th className="text-center p-3"><BrokerHeader name="Pepperstone" /></th>
                      <th className="text-center p-3"><BrokerHeader name="AvaTrade" /></th>
                      <th className="text-center p-3"><BrokerHeader name="Plus500" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {brokerComparisons.stocks.regions.map((region, index) => {
                      const values = [region.etoro, region.icmarkets, region.pepperstone, region.avatrade, region.plus500];
                      const bestIndex = getBestValue(values);
                      
                      return (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{region.region}</td>
                          <td className={`text-center p-3 ${getValueColor(region.etoro, bestIndex, 0)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(region.etoro, bestIndex, 0)}
                              {region.etoro}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(region.icmarkets, bestIndex, 1)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(region.icmarkets, bestIndex, 1)}
                              {region.icmarkets}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(region.pepperstone, bestIndex, 2)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(region.pepperstone, bestIndex, 2)}
                              {region.pepperstone}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(region.avatrade, bestIndex, 3)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(region.avatrade, bestIndex, 3)}
                              {region.avatrade}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(region.plus500, bestIndex, 4)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(region.plus500, bestIndex, 4)}
                              {region.plus500}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crypto" className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Cryptocurrency Spreads Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Cryptocurrency</th>
                      <th className="text-center p-3"><BrokerHeader name="eToro" /></th>
                      <th className="text-center p-3"><BrokerHeader name="IC Markets" /></th>
                      <th className="text-center p-3"><BrokerHeader name="Pepperstone" /></th>
                      <th className="text-center p-3"><BrokerHeader name="AvaTrade" /></th>
                      <th className="text-center p-3"><BrokerHeader name="Plus500" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {brokerComparisons.crypto.coins.map((coin, index) => {
                      const values = [coin.etoro, coin.icmarkets, coin.pepperstone, coin.avatrade, coin.plus500];
                      const bestIndex = getBestValue(values);
                      
                      return (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{coin.coin}</td>
                          <td className={`text-center p-3 ${getValueColor(coin.etoro, bestIndex, 0)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(coin.etoro, bestIndex, 0)}
                              {coin.etoro}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(coin.icmarkets, bestIndex, 1)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(coin.icmarkets, bestIndex, 1)}
                              {coin.icmarkets}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(coin.pepperstone, bestIndex, 2)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(coin.pepperstone, bestIndex, 2)}
                              {coin.pepperstone}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(coin.avatrade, bestIndex, 3)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(coin.avatrade, bestIndex, 3)}
                              {coin.avatrade}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(coin.plus500, bestIndex, 4)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(coin.plus500, bestIndex, 4)}
                              {coin.plus500}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Additional Fees Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Fee Type</th>
                      <th className="text-center p-3"><BrokerHeader name="eToro" /></th>
                      <th className="text-center p-3"><BrokerHeader name="IC Markets" /></th>
                      <th className="text-center p-3"><BrokerHeader name="Pepperstone" /></th>
                      <th className="text-center p-3"><BrokerHeader name="AvaTrade" /></th>
                      <th className="text-center p-3"><BrokerHeader name="Plus500" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {brokerComparisons.fees.feeTypes.map((fee, index) => {
                      const values = [fee.etoro, fee.icmarkets, fee.pepperstone, fee.avatrade, fee.plus500];
                      const bestIndex = getBestValue(values);
                      
                      return (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{fee.type}</td>
                          <td className={`text-center p-3 ${getValueColor(fee.etoro, bestIndex, 0)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(fee.etoro, bestIndex, 0)}
                              {fee.etoro}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(fee.icmarkets, bestIndex, 1)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(fee.icmarkets, bestIndex, 1)}
                              {fee.icmarkets}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(fee.pepperstone, bestIndex, 2)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(fee.pepperstone, bestIndex, 2)}
                              {fee.pepperstone}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(fee.avatrade, bestIndex, 3)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(fee.avatrade, bestIndex, 3)}
                              {fee.avatrade}
                            </div>
                          </td>
                          <td className={`text-center p-3 ${getValueColor(fee.plus500, bestIndex, 4)}`}>
                            <div className="flex items-center justify-center gap-1">
                              {getComparisonIcon(fee.plus500, bestIndex, 4)}
                              {fee.plus500}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          <Crown className="h-4 w-4 inline text-yellow-500 mr-1" />
          Crown icon indicates the best value in each category
        </p>
        <Button variant="outline" size="lg" asChild>
          <Link href="/tools/compare">
            Compare All Brokers in Detail
          </Link>
        </Button>
      </div>
    </div>
  );
}
