"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X, Info, Star, Shield, CreditCard, Clock, HelpCircle, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrokerCompareRatings } from "@/components/compare/BrokerCompareRatings";
import { BrokerCompareFeesTable } from "@/components/compare/BrokerCompareFeesTable";
import { BrokerComparePlatformsTable } from "@/components/compare/BrokerComparePlatformsTable";
import { BrokerCompareMarketsTable } from "@/components/compare/BrokerCompareMarketsTable";
import { fetchBrokerDetails, BrokerDetails } from "@/lib/brokers";

interface BrokerCompareDetailsProps {
  broker1Id: string;
  broker2Id: string;
}

export function BrokerCompareDetails({ broker1Id, broker2Id }: BrokerCompareDetailsProps) {
  const [broker1, setBroker1] = useState<BrokerDetails | null>(null);
  const [broker2, setBroker2] = useState<BrokerDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrokers = async () => {
      setLoading(true);
      try {
        const [broker1Data, broker2Data] = await Promise.all([
          fetchBrokerDetails(broker1Id),
          fetchBrokerDetails(broker2Id)
        ]);
        setBroker1(broker1Data);
        setBroker2(broker2Data);
      } catch (error) {
        console.error("Error loading broker data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBrokers();
  }, [broker1Id, broker2Id]);

  // Return loading state if data isn't ready yet
  if (loading || !broker1 || !broker2) {
    return <div className="p-12 text-center">Loading broker comparison data...</div>;
  }

  // Get overall winner if available
  const getOverallWinner = () => {
    if (!broker1.rating || !broker2.rating) return null;
    if (broker1.rating > broker2.rating) return broker1.name;
    if (broker2.rating > broker1.rating) return broker2.name;
    return "Tie";
  };

  const overallWinner = getOverallWinner();
  
  // Format regulated text
  const getRegulatedText = (broker: BrokerDetails) => {
    if (!broker.regulations) return "Unknown";
    return broker.regulations.split(',').map((r: string) => r.trim()).join(', ');
  };

  // Visual indicator for yes/no values
  const renderYesNo = (value: boolean | string | null | undefined) => {
    const isYes = value === true || value === 'yes' || value === 'Yes';
    const isNo = value === false || value === 'no' || value === 'No';
    
    if (isYes) return <Check className="h-5 w-5 text-green-500 mx-auto" />;
    if (isNo) return <X className="h-5 w-5 text-red-500 mx-auto" />;
    return <span className="text-muted-foreground text-center block">-</span>;
  };

  return (
    <div className="space-y-12">
      {/* Header with broker logos and summary */}
      <div className="p-6 bg-card border rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-6">
          {/* Broker 1 */}
          <div className="md:col-span-5 flex flex-col items-center space-y-4">
            <div className="relative w-40 h-20 bg-background rounded-md flex items-center justify-center p-4 border overflow-hidden">
              {broker1.logo_url ? (
                <Image 
                  src={broker1.logo_url} 
                  alt={broker1.name} 
                  fill
                  className="object-contain p-2"
                  onError={(e) => {
                    // @ts-ignore
                    e.target.onerror = null;
                    // @ts-ignore
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker1.name)}&background=random&color=fff&size=128&bold=true&format=png`;
                  }}
                />
              ) : (
                <div className="font-bold text-xl">{broker1.name}</div>
              )}
            </div>
            <h2 className="text-2xl font-bold">{broker1.name}</h2>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={`${broker1.id}-star-${i}`}
                  className={`h-5 w-5 ${i < Math.floor(broker1.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} 
                />
              ))}
              <span className="ml-2 font-medium">{broker1.rating?.toFixed(1) || '-'}/5</span>
            </div>
            <Badge 
              variant={overallWinner === broker1.name ? "default" : "outline"}
              className={overallWinner === broker1.name ? "px-3 py-1 text-sm" : "px-3 py-1 text-sm"}
            >
              {overallWinner === broker1.name ? "Overall Winner" : ""}
              {!overallWinner || overallWinner === "Tie" ? "Comparable" : ""}
            </Badge>
            <Button asChild size="sm" className="mt-2">
              <Link href={`/broker/${broker1Id}`}>Open Account</Link>
            </Button>
          </div>
          
          {/* VS */}
          <div className="md:col-span-1 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold">VS</div>
          </div>
          
          {/* Broker 2 */}
          <div className="md:col-span-5 flex flex-col items-center space-y-4">
            <div className="relative w-40 h-20 bg-background rounded-md flex items-center justify-center p-4 border overflow-hidden">
              {broker2.logo_url ? (
                <Image 
                  src={broker2.logo_url} 
                  alt={broker2.name} 
                  fill
                  className="object-contain p-2"
                  onError={(e) => {
                    // @ts-ignore
                    e.target.onerror = null;
                    // @ts-ignore
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker2.name)}&background=random&color=fff&size=128&bold=true&format=png`;
                  }}
                />
              ) : (
                <div className="font-bold text-xl">{broker2.name}</div>
              )}
            </div>
            <h2 className="text-2xl font-bold">{broker2.name}</h2>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={`${broker2.id}-star-${i}`}
                  className={`h-5 w-5 ${i < Math.floor(broker2.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} 
                />
              ))}
              <span className="ml-2 font-medium">{broker2.rating?.toFixed(1) || '-'}/5</span>
            </div>
            <Badge 
              variant={overallWinner === broker2.name ? "default" : "outline"}
              className={overallWinner === broker2.name ? "px-3 py-1 text-sm" : "px-3 py-1 text-sm"}
            >
              {overallWinner === broker2.name ? "Overall Winner" : ""}
              {!overallWinner || overallWinner === "Tie" ? "Comparable" : ""}
            </Badge>
            <Button asChild size="sm" className="mt-2">
              <Link href={`/broker/${broker2Id}`}>Open Account</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Key Differences */}
      <div className="p-6 bg-card border rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Key Differences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{broker1.name} Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>{broker1.name} is {broker1.regulations ? 'regulated by ' + getRegulatedText(broker1) : 'established in the industry'}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>Offers {broker1.min_deposit ? `lower minimum deposit ($${broker1.min_deposit})` : 'competitive trading conditions'}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>{broker1.trading_platforms ? `Provides ${broker1.trading_platforms}` : 'Offers multiple trading platforms'}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{broker2.name} Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>{broker2.name} is {broker2.regulations ? 'regulated by ' + getRegulatedText(broker2) : 'established in the industry'}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>Offers {broker2.min_deposit ? `lower minimum deposit ($${broker2.min_deposit})` : 'competitive trading conditions'}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>{broker2.trading_platforms ? `Provides ${broker2.trading_platforms}` : 'Offers multiple trading platforms'}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Ratings Comparison */}
      <BrokerCompareRatings broker1={broker1} broker2={broker2} />
      
      {/* Detailed Comparison Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="markets">Markets</TabsTrigger>
          <TabsTrigger value="research">Research & Education</TabsTrigger>
          <TabsTrigger value="accounts">Account Types</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="p-6 bg-card border rounded-lg">
          <h3 className="text-xl font-bold mb-4">Broker Overview</h3>
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
                <TableCell className="font-medium">Regulated By</TableCell>
                <TableCell>{getRegulatedText(broker1)}</TableCell>
                <TableCell>{getRegulatedText(broker2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Country Based</TableCell>
                <TableCell>{broker1.country || 'Not specified'}</TableCell>
                <TableCell>{broker2.country || 'Not specified'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Year Founded</TableCell>
                <TableCell>{broker1.year_founded || 'Not specified'}</TableCell>
                <TableCell>{broker2.year_founded || 'Not specified'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Minimum Deposit</TableCell>
                <TableCell>{broker1.min_deposit !== null && broker1.min_deposit !== undefined ? `$${broker1.min_deposit}` : 'Not specified'}</TableCell>
                <TableCell>{broker2.min_deposit !== null && broker2.min_deposit !== undefined ? `$${broker2.min_deposit}` : 'Not specified'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Trading Platforms</TableCell>
                <TableCell>{broker1.trading_platforms || 'Not specified'}</TableCell>
                <TableCell>{broker2.trading_platforms || 'Not specified'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Demo Account</TableCell>
                <TableCell>{renderYesNo(broker1.demo_account)}</TableCell>
                <TableCell>{renderYesNo(broker2.demo_account)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tradable Assets</TableCell>
                <TableCell>
                  {Array.isArray(broker1.supported_assets) ? broker1.supported_assets.join(', ') : (broker1.supported_assets || 'Not specified')}
                </TableCell>
                <TableCell>
                  {Array.isArray(broker2.supported_assets) ? broker2.supported_assets.join(', ') : (broker2.supported_assets || 'Not specified')}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-2">{broker1.name} Summary</h4>
              <p className="text-muted-foreground">
                {broker1.name} is {broker1.year_founded ? `established in ${broker1.year_founded}` : 'an established broker'}{' '}
                {broker1.country ? `based in ${broker1.country}` : ''}.{' '}
                {broker1.regulations ? `It is regulated by ${getRegulatedText(broker1)}.` : ''}{' '}
                The broker offers {Array.isArray(broker1.supported_assets) ? broker1.supported_assets.join(', ') : 'various financial instruments'}{' '}
                with a minimum deposit of {broker1.min_deposit !== null && broker1.min_deposit !== undefined ? `$${broker1.min_deposit}` : 'an unspecified amount'}.
              </p>
              <div className="mt-4">
                <Button asChild>
                  <Link href={`/broker/${broker1Id}`}>
                    View Full Review
                  </Link>
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-2">{broker2.name} Summary</h4>
              <p className="text-muted-foreground">
                {broker2.name} is {broker2.year_founded ? `established in ${broker2.year_founded}` : 'an established broker'}{' '}
                {broker2.country ? `based in ${broker2.country}` : ''}.{' '}
                {broker2.regulations ? `It is regulated by ${getRegulatedText(broker2)}.` : ''}{' '}
                The broker offers {Array.isArray(broker2.supported_assets) ? broker2.supported_assets.join(', ') : 'various financial instruments'}{' '}
                with a minimum deposit of {broker2.min_deposit !== null && broker2.min_deposit !== undefined ? `$${broker2.min_deposit}` : 'an unspecified amount'}.
              </p>
              <div className="mt-4">
                <Button asChild>
                  <Link href={`/broker/${broker2Id}`}>
                    View Full Review
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Fees Tab */}
        <TabsContent value="fees" className="p-6 bg-card border rounded-lg">
          <BrokerCompareFeesTable broker1={broker1} broker2={broker2} />
        </TabsContent>
        
        {/* Platforms Tab */}
        <TabsContent value="platforms" className="p-6 bg-card border rounded-lg">
          <BrokerComparePlatformsTable broker1={broker1} broker2={broker2} />
        </TabsContent>
        
        {/* Markets Tab */}
        <TabsContent value="markets" className="p-6 bg-card border rounded-lg">
          <BrokerCompareMarketsTable broker1={broker1} broker2={broker2} />
        </TabsContent>
        
        {/* Research & Education Tab */}
        <TabsContent value="research" className="p-6 bg-card border rounded-lg">
          <h3 className="text-xl font-bold mb-4">Research & Education</h3>
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
                <TableCell className="font-medium">Research Reports</TableCell>
                <TableCell>{renderYesNo(broker1.research_reports)}</TableCell>
                <TableCell>{renderYesNo(broker2.research_reports)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Trading Ideas</TableCell>
                <TableCell>{renderYesNo(broker1.trading_ideas)}</TableCell>
                <TableCell>{renderYesNo(broker2.trading_ideas)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">News Feed</TableCell>
                <TableCell>{renderYesNo(broker1.news_feed)}</TableCell>
                <TableCell>{renderYesNo(broker2.news_feed)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Video Tutorials</TableCell>
                <TableCell>{renderYesNo(broker1.video_tutorials)}</TableCell>
                <TableCell>{renderYesNo(broker2.video_tutorials)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Trading Courses</TableCell>
                <TableCell>{renderYesNo(broker1.trading_courses)}</TableCell>
                <TableCell>{renderYesNo(broker2.trading_courses)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Webinars</TableCell>
                <TableCell>{renderYesNo(broker1.webinars)}</TableCell>
                <TableCell>{renderYesNo(broker2.webinars)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        
        {/* Account Types Tab */}
        <TabsContent value="accounts" className="p-6 bg-card border rounded-lg">
          <h3 className="text-xl font-bold mb-4">Account Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-11 gap-6">
            <div className="md:col-span-5">
              <Card>
                <CardHeader>
                  <CardTitle>{broker1.name} Account Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="standard1">
                      <AccordionTrigger>Standard Account</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-primary" />
                            <span>Min Deposit: {broker1.min_deposit ? `$${broker1.min_deposit}` : 'Variable'}</span>
                          </li>
                          <li className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-primary" />
                            <span>Platforms: {broker1.trading_platforms || 'Various platforms'}</span>
                          </li>
                          <li className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-primary" />
                            <span>Spread: {broker1.spread_from || 'Variable'}</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="premium1">
                      <AccordionTrigger>Premium Account</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-primary" />
                            <span>Min Deposit: Higher than standard</span>
                          </li>
                          <li className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-primary" />
                            <span>Platforms: {broker1.trading_platforms || 'Various platforms'}</span>
                          </li>
                          <li className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-primary" />
                            <span>Spread: Lower than standard</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold">VS</div>
            </div>
            
            <div className="md:col-span-5">
              <Card>
                <CardHeader>
                  <CardTitle>{broker2.name} Account Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="standard2">
                      <AccordionTrigger>Standard Account</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-primary" />
                            <span>Min Deposit: {broker2.min_deposit ? `$${broker2.min_deposit}` : 'Variable'}</span>
                          </li>
                          <li className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-primary" />
                            <span>Platforms: {broker2.trading_platforms || 'Various platforms'}</span>
                          </li>
                          <li className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-primary" />
                            <span>Spread: {broker2.spread_from || 'Variable'}</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="premium2">
                      <AccordionTrigger>Premium Account</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-primary" />
                            <span>Min Deposit: Higher than standard</span>
                          </li>
                          <li className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-primary" />
                            <span>Platforms: {broker2.trading_platforms || 'Various platforms'}</span>
                          </li>
                          <li className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-primary" />
                            <span>Spread: Lower than standard</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Bottom CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-center">{broker1.name}</CardTitle>
            <div className="flex justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={`${broker1.id}-bottom-star-${i}`}
                  className={`h-5 w-5 ${i < Math.floor(broker1.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} 
                />
              ))}
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">{broker1.name} offers {broker1.trading_platforms || 'various trading platforms'} with a minimum deposit of {broker1.min_deposit !== null && broker1.min_deposit !== undefined ? `$${broker1.min_deposit}` : 'an unspecified amount'}.</p>
            <Button asChild size="lg" className="w-full">
              <Link href={broker1.website_url || `#${broker1.id}`}>
                Visit {broker1.name}
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-center">{broker2.name}</CardTitle>
            <div className="flex justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={`${broker2.id}-bottom-star-${i}`}
                  className={`h-5 w-5 ${i < Math.floor(broker2.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} 
                />
              ))}
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">{broker2.name} offers {broker2.trading_platforms || 'various trading platforms'} with a minimum deposit of {broker2.min_deposit !== null && broker2.min_deposit !== undefined ? `$${broker2.min_deposit}` : 'an unspecified amount'}.</p>
            <Button asChild size="lg" className="w-full">
              <Link href={broker2.website_url || `#${broker2.id}`}>
                Visit {broker2.name}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 