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
  brokerIds: string[];
  lastUpdated?: {
    month: string;
    year: string;
  };
}

export function BrokerCompareDetails({ brokerIds, lastUpdated }: BrokerCompareDetailsProps) {
  const [brokers, setBrokers] = useState<BrokerDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrokers = async () => {
      setLoading(true);
      try {
        const brokerData = await Promise.all(brokerIds.map(id => fetchBrokerDetails(id)));
        setBrokers(brokerData);
      } catch (error) {
        console.error("Error loading broker data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBrokers();
  }, [brokerIds]);

  // Return loading state if data isn't ready yet
  if (loading || brokers.length < 2) {
    return <div className="p-12 text-center">Loading broker comparison data...</div>;
  }

  // Get overall winner if available
  const getOverallWinner = () => {
    if (!brokers[0].rating || !brokers[1].rating) return null;
    if (brokers[0].rating > brokers[1].rating) return brokers[0].name;
    if (brokers[1].rating > brokers[0].rating) return brokers[1].name;
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
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header with broker logos and summary */}
      <div className="p-6 bg-card border rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-6">
          {/* Broker 1 */}
          <div className="md:col-span-5 flex flex-col items-center space-y-4">
            <div className="relative w-40 h-20 bg-background rounded-md flex items-center justify-center p-4 border overflow-hidden shadow-sm">
              {brokers[0].logo_url ? (
                <Image
                  src={brokers[0].logo_url}
                  alt={brokers[0].name}
                  fill
                  className="object-contain p-2"
                  onError={(e) => {
                    // @ts-ignore
                    e.target.onerror = null;
                    // @ts-ignore
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(brokers[0].name)}&background=random&color=fff&size=128&bold=true&format=png`;
                  }}
                />
              ) : (
                <div className="font-bold text-xl">{brokers[0].name}</div>
              )}
            </div>
            <h2 className="text-2xl font-bold">{brokers[0].name}</h2>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`${brokers[0].id}-star-${i}`}
                  className={`h-5 w-5 ${i < Math.floor(brokers[0].rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`}
                />
              ))}
              <span className="ml-2 font-medium">{brokers[0].rating?.toFixed(1) || '-'}/5</span>
            </div>
            <Badge
              variant={overallWinner === brokers[0].name ? "default" : "outline"}
              className={overallWinner === brokers[0].name ? "px-3 py-1 text-sm" : "px-3 py-1 text-sm"}
            >
              {overallWinner === brokers[0].name ? "Overall Winner" : ""}
              {!overallWinner || overallWinner === "Tie" ? "Comparable" : ""}
            </Badge>
            <Button asChild size="sm" className="mt-2">
              <Link href={`/broker/${brokerIds[0]}`}>Open Account</Link>
            </Button>
          </div>

          {/* VS */}
          <div className="md:col-span-1 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold shadow-sm">VS</div>
          </div>

          {/* Broker 2 */}
          <div className="md:col-span-5 flex flex-col items-center space-y-4">
            <div className="relative w-40 h-20 bg-background rounded-md flex items-center justify-center p-4 border overflow-hidden shadow-sm">
              {brokers[1].logo_url ? (
                <Image
                  src={brokers[1].logo_url}
                  alt={brokers[1].name}
                  fill
                  className="object-contain p-2"
                  onError={(e) => {
                    // @ts-ignore
                    e.target.onerror = null;
                    // @ts-ignore
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(brokers[1].name)}&background=random&color=fff&size=128&bold=true&format=png`;
                  }}
                />
              ) : (
                <div className="font-bold text-xl">{brokers[1].name}</div>
              )}
            </div>
            <h2 className="text-2xl font-bold">{brokers[1].name}</h2>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`${brokers[1].id}-star-${i}`}
                  className={`h-5 w-5 ${i < Math.floor(brokers[1].rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`}
                />
              ))}
              <span className="ml-2 font-medium">{brokers[1].rating?.toFixed(1) || '-'}/5</span>
            </div>
            <Badge
              variant={overallWinner === brokers[1].name ? "default" : "outline"}
              className={overallWinner === brokers[1].name ? "px-3 py-1 text-sm" : "px-3 py-1 text-sm"}
            >
              {overallWinner === brokers[1].name ? "Overall Winner" : ""}
              {!overallWinner || overallWinner === "Tie" ? "Comparable" : ""}
            </Badge>
            <Button asChild size="sm" className="mt-2">
              <Link href={`/broker/${brokerIds[1]}`}>Open Account</Link>
            </Button>
          </div>
        </div>

        {/* Data verification indicator */}
        {lastUpdated && (
          <div className="mt-6 pt-4 border-t border-border/40 flex justify-center items-center text-sm text-muted-foreground">
            <Shield className="h-4 w-4 mr-1.5 text-primary/70" />
            <span className="text-center">
              Data verified and updated in {lastUpdated.month} {lastUpdated.year}. Our comparison criteria include regulatory status, trading fees, platform features, and user experience.
            </span>
          </div>
        )}
      </div>

      {/* Key Differences */}
      <div className="p-6 bg-card border rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
          <span className="inline-block w-1.5 h-6 bg-primary mr-2 rounded-sm"></span>
          Key Differences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-primary/20 overflow-hidden">
            <CardHeader className="pb-2 bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-lg">{brokers[0].name} Advantages</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>{brokers[0].name} is {brokers[0].regulations ? 'regulated by ' + getRegulatedText(brokers[0]) : 'established in the industry'}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>Offers {brokers[0].min_deposit ? `lower minimum deposit ($${brokers[0].min_deposit})` : 'competitive trading conditions'}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>{brokers[0].trading_platforms ? `Provides ${brokers[0].trading_platforms}` : 'Offers multiple trading platforms'}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/20 overflow-hidden">
            <CardHeader className="pb-2 bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-lg">{brokers[1].name} Advantages</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>{brokers[1].name} is {brokers[1].regulations ? 'regulated by ' + getRegulatedText(brokers[1]) : 'established in the industry'}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>Offers {brokers[1].min_deposit ? `lower minimum deposit ($${brokers[1].min_deposit})` : 'competitive trading conditions'}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>{brokers[1].trading_platforms ? `Provides ${brokers[1].trading_platforms}` : 'Offers multiple trading platforms'}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ratings Comparison */}
      <BrokerCompareRatings broker1={brokers[0]} broker2={brokers[1]} />

      {/* Detailed Comparison Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6 bg-muted/70 p-1">
          <TabsTrigger value="overview" className="font-medium">Overview</TabsTrigger>
          <TabsTrigger value="fees" className="font-medium">Fees</TabsTrigger>
          <TabsTrigger value="platforms" className="font-medium">Platforms</TabsTrigger>
          <TabsTrigger value="markets" className="font-medium">Markets</TabsTrigger>
          <TabsTrigger value="research" className="font-medium">Research & Education</TabsTrigger>
          <TabsTrigger value="accounts" className="font-medium">Account Types</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="p-6 bg-card border rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
            <span className="inline-block w-1.5 h-6 bg-primary mr-2 rounded-sm"></span>
            Broker Overview
          </h3>
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <div className="min-w-[600px]"> {/* Force minimum width to ensure scrollability on mobile */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Feature</TableHead>
                    <TableHead>{brokers[0].name}</TableHead>
                    <TableHead>{brokers[1].name}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Regulated By</TableCell>
                    <TableCell>{getRegulatedText(brokers[0])}</TableCell>
                    <TableCell>{getRegulatedText(brokers[1])}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Country Based</TableCell>
                    <TableCell>{brokers[0].country || 'Not specified'}</TableCell>
                    <TableCell>{brokers[1].country || 'Not specified'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Year Founded</TableCell>
                    <TableCell>{brokers[0].year_founded || 'Not specified'}</TableCell>
                    <TableCell>{brokers[1].year_founded || 'Not specified'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Minimum Deposit</TableCell>
                    <TableCell>{brokers[0].min_deposit !== null && brokers[0].min_deposit !== undefined ? `$${brokers[0].min_deposit}` : 'Not specified'}</TableCell>
                    <TableCell>{brokers[1].min_deposit !== null && brokers[1].min_deposit !== undefined ? `$${brokers[1].min_deposit}` : 'Not specified'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Trading Platforms</TableCell>
                    <TableCell>{brokers[0].trading_platforms || 'Not specified'}</TableCell>
                    <TableCell>{brokers[1].trading_platforms || 'Not specified'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Demo Account</TableCell>
                    <TableCell>{renderYesNo(brokers[0].demo_account)}</TableCell>
                    <TableCell>{renderYesNo(brokers[1].demo_account)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tradable Assets</TableCell>
                    <TableCell>
                      {Array.isArray(brokers[0].supported_assets) ? brokers[0].supported_assets.join(', ') : (brokers[0].supported_assets || 'Not specified')}
                    </TableCell>
                    <TableCell>
                      {Array.isArray(brokers[1].supported_assets) ? brokers[1].supported_assets.join(', ') : (brokers[1].supported_assets || 'Not specified')}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="text-lg font-bold mb-2">{brokers[0].name} Summary</h4>
              <p className="text-muted-foreground">
                {brokers[0].name} is {brokers[0].year_founded ? `established in ${brokers[0].year_founded}` : 'an established broker'}{' '}
                {brokers[0].country ? `based in ${brokers[0].country}` : ''}.{' '}
                {brokers[0].regulations ? `It is regulated by ${getRegulatedText(brokers[0])}.` : ''}{' '}
                The broker offers {Array.isArray(brokers[0].supported_assets) ? brokers[0].supported_assets.join(', ') : 'various financial instruments'}{' '}
                with a minimum deposit of {brokers[0].min_deposit !== null && brokers[0].min_deposit !== undefined ? `$${brokers[0].min_deposit}` : 'an unspecified amount'}.
              </p>
              <div className="mt-4 flex justify-center">
                <Button asChild>
                  <Link href={`/broker/${brokerIds[0]}`}>
                    View Full Review
                  </Link>
                </Button>
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-bold mb-2">{brokers[1].name} Summary</h4>
              <p className="text-muted-foreground">
                {brokers[1].name} is {brokers[1].year_founded ? `established in ${brokers[1].year_founded}` : 'an established broker'}{' '}
                {brokers[1].country ? `based in ${brokers[1].country}` : ''}.{' '}
                {brokers[1].regulations ? `It is regulated by ${getRegulatedText(brokers[1])}.` : ''}{' '}
                The broker offers {Array.isArray(brokers[1].supported_assets) ? brokers[1].supported_assets.join(', ') : 'various financial instruments'}{' '}
                with a minimum deposit of {brokers[1].min_deposit !== null && brokers[1].min_deposit !== undefined ? `$${brokers[1].min_deposit}` : 'an unspecified amount'}.
              </p>
              <div className="mt-4 flex justify-center">
                <Button asChild>
                  <Link href={`/broker/${brokerIds[1]}`}>
                    View Full Review
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value="fees" className="p-6 bg-card border rounded-lg shadow-sm">
          <BrokerCompareFeesTable broker1={brokers[0]} broker2={brokers[1]} />
        </TabsContent>

        {/* Platforms Tab */}
        <TabsContent value="platforms" className="p-6 bg-card border rounded-lg shadow-sm">
          <BrokerComparePlatformsTable broker1={brokers[0]} broker2={brokers[1]} />
        </TabsContent>

        {/* Markets Tab */}
        <TabsContent value="markets" className="p-6 bg-card border rounded-lg shadow-sm">
          <BrokerCompareMarketsTable broker1={brokers[0]} broker2={brokers[1]} />
        </TabsContent>

        {/* Research & Education Tab */}
        <TabsContent value="research" className="p-6 bg-card border rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
            <span className="inline-block w-1.5 h-6 bg-primary mr-2 rounded-sm"></span>
            Research & Education
          </h3>
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <div className="min-w-[600px]"> {/* Force minimum width to ensure scrollability on mobile */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Feature</TableHead>
                    <TableHead>{brokers[0].name}</TableHead>
                    <TableHead>{brokers[1].name}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Research Reports</TableCell>
                    <TableCell>{renderYesNo(brokers[0].research_reports)}</TableCell>
                    <TableCell>{renderYesNo(brokers[1].research_reports)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Trading Ideas</TableCell>
                    <TableCell>{renderYesNo(brokers[0].trading_ideas)}</TableCell>
                    <TableCell>{renderYesNo(brokers[1].trading_ideas)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">News Feed</TableCell>
                    <TableCell>{renderYesNo(brokers[0].news_feed)}</TableCell>
                    <TableCell>{renderYesNo(brokers[1].news_feed)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Video Tutorials</TableCell>
                    <TableCell>{renderYesNo(brokers[0].video_tutorials)}</TableCell>
                    <TableCell>{renderYesNo(brokers[1].video_tutorials)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Trading Courses</TableCell>
                    <TableCell>{renderYesNo(brokers[0].trading_courses)}</TableCell>
                    <TableCell>{renderYesNo(brokers[1].trading_courses)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Webinars</TableCell>
                    <TableCell>{renderYesNo(brokers[0].webinars)}</TableCell>
                    <TableCell>{renderYesNo(brokers[1].webinars)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Account Types Tab */}
        <TabsContent value="accounts" className="p-6 bg-card border rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
            <span className="inline-block w-1.5 h-6 bg-primary mr-2 rounded-sm"></span>
            Account Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-11 gap-6">
            <div className="md:col-span-5">
              <Card>
                <CardHeader>
                  <CardTitle>{brokers[0].name} Account Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="standard1">
                      <AccordionTrigger>Standard Account</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-primary" />
                            <span>Min Deposit: {brokers[0].min_deposit ? `$${brokers[0].min_deposit}` : 'Variable'}</span>
                          </li>
                          <li className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-primary" />
                            <span>Platforms: {brokers[0].trading_platforms || 'Various platforms'}</span>
                          </li>
                          <li className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-primary" />
                            <span>Spread: {brokers[0].spread_from || 'Variable'}</span>
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
                            <span>Platforms: {brokers[0].trading_platforms || 'Various platforms'}</span>
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
                  <CardTitle>{brokers[1].name} Account Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="standard2">
                      <AccordionTrigger>Standard Account</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-primary" />
                            <span>Min Deposit: {brokers[1].min_deposit ? `$${brokers[1].min_deposit}` : 'Variable'}</span>
                          </li>
                          <li className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-primary" />
                            <span>Platforms: {brokers[1].trading_platforms || 'Various platforms'}</span>
                          </li>
                          <li className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-primary" />
                            <span>Spread: {brokers[1].spread_from || 'Variable'}</span>
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
                            <span>Platforms: {brokers[1].trading_platforms || 'Various platforms'}</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="bg-muted/30 border-primary/10 shadow-sm hover:shadow-md transition-all text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-center">{brokers[0].name}</CardTitle>
            <div className="flex justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`${brokers[0].id}-bottom-star-${i}`}
                  className={`h-5 w-5 ${i < Math.floor(brokers[0].rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
          </CardHeader>
          <CardContent className="text-center flex flex-col items-center">
            <p className="mb-4">{brokers[0].name} offers {brokers[0].trading_platforms || 'various trading platforms'} with a minimum deposit of {brokers[0].min_deposit !== null && brokers[0].min_deposit !== undefined ? `$${brokers[0].min_deposit}` : 'an unspecified amount'}.</p>
            <Button asChild size="lg" className="mt-2 px-8">
              <Link href={brokers[0].website_url || `#${brokers[0].id}`}>
                Visit {brokers[0].name}
              </Link>
            </Button>
            {lastUpdated && (
              <p className="text-xs text-muted-foreground mt-4">
                Information verified in {lastUpdated.month} {lastUpdated.year}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-muted/30 border-primary/10 shadow-sm hover:shadow-md transition-all text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-center">{brokers[1].name}</CardTitle>
            <div className="flex justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`${brokers[1].id}-bottom-star-${i}`}
                  className={`h-5 w-5 ${i < Math.floor(brokers[1].rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
          </CardHeader>
          <CardContent className="text-center flex flex-col items-center">
            <p className="mb-4">{brokers[1].name} offers {brokers[1].trading_platforms || 'various trading platforms'} with a minimum deposit of {brokers[1].min_deposit !== null && brokers[1].min_deposit !== undefined ? `$${brokers[1].min_deposit}` : 'an unspecified amount'}.</p>
            <Button asChild size="lg" className="mt-2 px-8">
              <Link href={brokers[1].website_url || `#${brokers[1].id}`}>
                Visit {brokers[1].name}
              </Link>
            </Button>
            {lastUpdated && (
              <p className="text-xs text-muted-foreground mt-4">
                Information verified in {lastUpdated.month} {lastUpdated.year}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}