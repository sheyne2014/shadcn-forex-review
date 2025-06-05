"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Info, 
  Star,
  Clock,
  CreditCard,
  Banknote,
  Calculator
} from 'lucide-react';

interface Broker {
  name: string;
}

interface EtoroDetailedFeesAnalysisProps {
  broker: Broker;
}

export function EtoroDetailedFeesAnalysis({ broker }: EtoroDetailedFeesAnalysisProps) {
  const [selectedAssetClass, setSelectedAssetClass] = useState('forex');

  // Comprehensive fee structure for eToro
  const feeStructure = {
    forex: {
      name: 'Forex',
      rating: 3.5,
      spreads: {
        'EUR/USD': { typical: '1.0 pips', weekend: '2.0 pips' },
        'GBP/USD': { typical: '2.0 pips', weekend: '4.0 pips' },
        'USD/JPY': { typical: '1.0 pips', weekend: '2.0 pips' },
        'AUD/USD': { typical: '1.5 pips', weekend: '3.0 pips' },
        'USD/CAD': { typical: '2.5 pips', weekend: '5.0 pips' },
        'EUR/GBP': { typical: '1.5 pips', weekend: '3.0 pips' },
        'USD/CHF': { typical: '2.0 pips', weekend: '4.0 pips' },
        'NZD/USD': { typical: '2.5 pips', weekend: '5.0 pips' }
      },
      commission: 'No commission',
      overnight: 'Swap fees apply',
      minTrade: '$25',
      maxLeverage: '1:30 (EU), 1:400 (Non-EU)',
      notes: 'Spreads widen during low liquidity periods and weekends'
    },
    stocks: {
      name: 'Stocks',
      rating: 4.5,
      commission: {
        us: 'Commission-free',
        uk: 'Commission-free', 
        eu: 'Commission-free',
        other: '0.09% (min $5)'
      },
      overnight: '$2.90 per $1,000 invested annually',
      minTrade: '$10',
      maxLeverage: '1:5 (CFDs only)',
      fractional: 'Available for popular stocks',
      notes: 'Real stocks ownership for non-leveraged positions'
    },
    indices: {
      name: 'Indices',
      rating: 4.0,
      spreads: {
        'S&P 500': '0.75 points',
        'NASDAQ 100': '1.0 points',
        'FTSE 100': '1.5 points',
        'DAX 30': '1.0 points',
        'Nikkei 225': '5.0 points',
        'ASX 200': '2.0 points'
      },
      commission: 'No commission',
      overnight: 'Swap fees apply',
      minTrade: '$25',
      maxLeverage: '1:30 (EU), 1:400 (Non-EU)'
    },
    commodities: {
      name: 'Commodities',
      rating: 3.8,
      spreads: {
        'Gold': '$0.45',
        'Silver': '$0.024',
        'Oil (WTI)': '$0.05',
        'Oil (Brent)': '$0.05',
        'Natural Gas': '$0.030',
        'Copper': '$0.0045',
        'Platinum': '$2.50',
        'Palladium': '$15.00'
      },
      commission: 'No commission',
      overnight: 'Swap fees apply',
      minTrade: '$25',
      maxLeverage: '1:20 (EU), 1:150 (Non-EU)'
    },
    crypto: {
      name: 'Cryptocurrencies',
      rating: 4.2,
      spreads: {
        'Bitcoin': '0.75%',
        'Ethereum': '1.90%',
        'Ripple': '2.45%',
        'Litecoin': '1.90%',
        'Bitcoin Cash': '1.90%',
        'Stellar': '2.45%',
        'EOS': '2.45%',
        'Cardano': '2.45%'
      },
      commission: 'No commission',
      overnight: 'Weekend fees: 3x regular spread',
      minTrade: '$25',
      maxLeverage: '1:2',
      notes: 'Real crypto ownership for non-leveraged positions'
    },
    etfs: {
      name: 'ETFs',
      rating: 4.3,
      commission: {
        us: 'Commission-free',
        eu: 'Commission-free',
        other: '0.09% (min $5)'
      },
      overnight: '$2.90 per $1,000 invested annually',
      minTrade: '$10',
      maxLeverage: '1:5 (CFDs only)',
      notes: 'Real ETF ownership for non-leveraged positions'
    },
    bonds: {
      name: 'Bonds',
      rating: 2.5,
      availability: 'Limited selection',
      commission: 'Spread-based pricing',
      minTrade: '$1,000',
      notes: 'Limited bond offerings compared to dedicated bond brokers'
    },
    options: {
      name: 'Options',
      rating: 1.0,
      availability: 'Not available',
      notes: 'eToro does not offer options trading'
    },
    futures: {
      name: 'Futures',
      rating: 1.0,
      availability: 'Not available',
      notes: 'eToro does not offer futures trading'
    }
  };

  const additionalFees = {
    deposit: {
      'Credit/Debit Card': 'Free',
      'Bank Transfer': 'Free',
      'PayPal': 'Free',
      'Skrill': 'Free',
      'Neteller': 'Free'
    },
    withdrawal: {
      'All Methods': '$5 per withdrawal',
      'Minimum': '$30',
      'Processing Time': '1-8 business days'
    },
    inactivity: {
      'After 12 months': '$10/month',
      'Condition': 'No trading activity'
    },
    conversion: {
      'Currency Conversion': '50 pips above mid-market rate',
      'Base Currency': 'USD (others converted)'
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getAssetClassColor = (rating: number) => {
    if (rating >= 4.0) return 'text-green-600 dark:text-green-400';
    if (rating >= 3.0) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
          <Calculator className="h-8 w-8 text-primary" />
          Comprehensive Fee & Trading Analysis
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Complete breakdown of eToro's fees, spreads, and trading conditions across all asset classes. Understanding costs and conditions is crucial for trading profitability.
        </p>
      </div>

      {/* Asset Class Overview */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Asset Classes Overview & Ratings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(feeStructure).map(([key, asset]) => (
              <Card 
                key={key} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedAssetClass === key ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedAssetClass(key)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{asset.name}</h3>
                    <div className="flex items-center gap-1">
                      {renderStars(asset.rating)}
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rating:</span>
                      <span className={`font-medium ${getAssetClassColor(asset.rating)}`}>
                        {asset.rating}/5.0
                      </span>
                    </div>
                    {asset.availability === 'Not available' ? (
                      <Badge variant="destructive" className="w-full justify-center">
                        Not Available
                      </Badge>
                    ) : asset.availability === 'Limited selection' ? (
                      <Badge variant="secondary" className="w-full justify-center">
                        Limited
                      </Badge>
                    ) : (
                      <Badge variant="default" className="w-full justify-center">
                        Available
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Fee Breakdown */}
      <Tabs value={selectedAssetClass} onValueChange={setSelectedAssetClass}>
        <TabsList className="grid grid-cols-4 lg:grid-cols-9 w-full">
          <TabsTrigger value="forex">Forex</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="indices">Indices</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="etfs">ETFs</TabsTrigger>
          <TabsTrigger value="bonds">Bonds</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <TabsTrigger value="futures">Futures</TabsTrigger>
        </TabsList>

        {Object.entries(feeStructure).map(([key, asset]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{asset.name} Trading Costs</span>
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(asset.rating)}</div>
                    <span className={`font-bold ${getAssetClassColor(asset.rating)}`}>
                      {asset.rating}/5.0
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {asset.availability === 'Not available' ? (
                  <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800 dark:text-red-200">
                      <strong>{asset.name} trading is not available on eToro.</strong> {asset.notes}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <>
                    {/* Spreads/Commission Table */}
                    {asset.spreads && (
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Spreads & Pricing
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                            <thead>
                              <tr className="bg-muted">
                                <th className="border border-gray-200 dark:border-gray-700 p-3 text-left">
                                  Instrument
                                </th>
                                <th className="border border-gray-200 dark:border-gray-700 p-3 text-left">
                                  Typical Spread
                                </th>
                                {Object.values(asset.spreads)[0]?.weekend && (
                                  <th className="border border-gray-200 dark:border-gray-700 p-3 text-left">
                                    Weekend Spread
                                  </th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(asset.spreads).map(([instrument, spread]) => (
                                <tr key={instrument} className="hover:bg-muted/50">
                                  <td className="border border-gray-200 dark:border-gray-700 p-3 font-medium">
                                    {instrument}
                                  </td>
                                  <td className="border border-gray-200 dark:border-gray-700 p-3">
                                    {typeof spread === 'object' ? spread.typical : spread}
                                  </td>
                                  {typeof spread === 'object' && spread.weekend && (
                                    <td className="border border-gray-200 dark:border-gray-700 p-3">
                                      {spread.weekend}
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Commission Structure */}
                    {asset.commission && (
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Commission Structure
                        </h3>
                        {typeof asset.commission === 'object' ? (
                          <div className="grid md:grid-cols-2 gap-4">
                            {Object.entries(asset.commission).map(([region, fee]) => (
                              <div key={region} className="flex justify-between p-3 bg-muted rounded-lg">
                                <span className="font-medium capitalize">{region.replace('_', ' ')}:</span>
                                <span className="text-green-600 dark:text-green-400 font-semibold">{fee}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3 bg-muted rounded-lg">
                            <span className="text-green-600 dark:text-green-400 font-semibold">{asset.commission}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Trading Conditions */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {asset.minTrade && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Minimum Trade</p>
                          <p className="font-semibold">{asset.minTrade}</p>
                        </div>
                      )}
                      {asset.maxLeverage && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Max Leverage</p>
                          <p className="font-semibold">{asset.maxLeverage}</p>
                        </div>
                      )}
                      {asset.overnight && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Overnight Fees</p>
                          <p className="font-semibold text-xs">{asset.overnight}</p>
                        </div>
                      )}
                      {asset.fractional && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Fractional Shares</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">{asset.fractional}</p>
                        </div>
                      )}
                    </div>

                    {/* Important Notes */}
                    {asset.notes && (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Important:</strong> {asset.notes}
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Additional Fees Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5 text-primary" />
            Additional Fees & Charges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Deposit Fees */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-green-600" />
              Deposit Fees
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(additionalFees.deposit).map(([method, fee]) => (
                <div key={method} className="flex justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <span className="font-medium">{method}:</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">{fee}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Withdrawal Fees */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Banknote className="h-4 w-4 text-orange-600" />
              Withdrawal Fees
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(additionalFees.withdrawal).map(([type, fee]) => (
                <div key={type} className="flex justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <span className="font-medium">{type}:</span>
                  <span className="text-orange-600 dark:text-orange-400 font-semibold">{fee}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inactivity Fees */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-600" />
              Inactivity Fees
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {Object.entries(additionalFees.inactivity).map(([type, fee]) => (
                <div key={type} className="flex justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                  <span className="font-medium">{type}:</span>
                  <span className="text-red-600 dark:text-red-400 font-semibold">{fee}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Currency Conversion */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              Currency Conversion
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {Object.entries(additionalFees.conversion).map(([type, fee]) => (
                <div key={type} className="flex justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <span className="font-medium">{type}:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">{fee}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Conditions Summary */}
      <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Trading Conditions Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Key Trading Metrics */}
            <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {broker.name === 'eToro' ? '$50' : '$100'}
              </div>
              <div className="text-sm text-muted-foreground">Minimum Deposit</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                1:30 (EU)
              </div>
              <div className="text-sm text-muted-foreground">Max Leverage</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                1.0 pips
              </div>
              <div className="text-sm text-muted-foreground">EUR/USD Spread</div>
            </div>
          </div>

          {/* Account Types Quick Overview */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Available Account Types</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                <h4 className="font-semibold mb-2">Retail Account</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Standard spreads</li>
                  <li>• $50 minimum deposit</li>
                  <li>• 1:30 leverage (EU)</li>
                  <li>• Full platform access</li>
                </ul>
              </div>
              <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                <h4 className="font-semibold mb-2">Professional Account</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Higher leverage available</li>
                  <li>• Reduced regulatory protection</li>
                  <li>• Qualification required</li>
                  <li>• Advanced features</li>
                </ul>
              </div>
              <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                <h4 className="font-semibold mb-2">Islamic Account</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Swap-free trading</li>
                  <li>• Sharia-compliant</li>
                  <li>• Same spreads</li>
                  <li>• Special terms apply</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Markets Rating */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Overall Markets Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">3.8/5.0</div>
                <div className="flex justify-center mb-2">{renderStars(3.8)}</div>
                <p className="text-sm text-muted-foreground">Overall Fee Competitiveness</p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">Fee Analysis Summary:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span><strong>Strengths:</strong> Commission-free stocks/ETFs, no deposit fees, competitive crypto spreads</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                  <span><strong>Average:</strong> Forex spreads higher than ECN brokers, overnight fees on leveraged positions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span><strong>Weaknesses:</strong> $5 withdrawal fee, currency conversion costs, limited bond/options offerings</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fee Comparison Alert */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Trading Cost Tip:</strong> eToro's fee structure favors long-term stock investors and social traders over active forex/CFD traders.
          Consider your trading style and frequency when evaluating total costs. Use our{' '}
          <Button variant="link" className="p-0 h-auto text-blue-600 underline" asChild>
            <Link href="/tools/compare">
              broker comparison tool
            </Link>
          </Button>{' '}
          to compare with other brokers.
        </AlertDescription>
      </Alert>
    </div>
  );
}
