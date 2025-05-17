import React from 'react';
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ExternalLink, 
  Shield, 
  Globe, 
  Clock, 
  DollarSign, 
  Laptop, 
  Smartphone, 
  Headphones, 
  GraduationCap, 
  Award
} from "lucide-react";

// Types
export interface ReviewScore {
  category: string;
  score: number;
  maxScore: number;
}

export interface ProsConsItem {
  text: string;
}

export interface FeatureRating {
  name: string;
  rating: number;
  description?: string;
}

export interface BrokerFee {
  category: string;
  value: string;
  notes?: string;
}

export interface AssetClass {
  name: string;
  isAvailable: boolean;
  details?: string;
}

export interface Platform {
  name: string;
  isAvailable: boolean;
  details?: string;
}

export interface TradingFeature {
  name: string;
  isAvailable: boolean;
  details?: string;
}

export interface ResearchFeature {
  name: string;
  isAvailable: boolean;
  details?: string;
}

export interface EducationResource {
  name: string;
  isAvailable: boolean;
  details?: string;
}

export interface CustomerSupportChannel {
  name: string;
  isAvailable: boolean;
  details?: string;
}

export interface BrokerReviewProps {
  name: string;
  logo: string;
  description: string;
  yearFounded: string;
  headquarters: string;
  regulation: string[];
  overallRating: number;
  url: string;
  scores: ReviewScore[];
  pros: ProsConsItem[];
  cons: ProsConsItem[];
  featureRatings: FeatureRating[];
  fees: BrokerFee[];
  minDeposit: string;
  depositMethods: string[];
  withdrawalMethods: string[];
  withdrawalFee: string;
  inactivityFee: string;
  assetClasses: AssetClass[];
  platforms: Platform[];
  tradingFeatures: TradingFeature[];
  researchFeatures: ResearchFeature[];
  educationResources: EducationResource[];
  customerSupport: CustomerSupportChannel[];
  accountOpening: string;
  depositTime: string;
  withdrawalTime: string;
}

export default function BrokerDetailedReview({
  name,
  logo,
  description,
  yearFounded,
  headquarters,
  regulation,
  overallRating,
  url,
  scores,
  pros,
  cons,
  featureRatings,
  fees,
  minDeposit,
  depositMethods,
  withdrawalMethods,
  withdrawalFee,
  inactivityFee,
  assetClasses,
  platforms,
  tradingFeatures,
  researchFeatures,
  educationResources,
  customerSupport,
  accountOpening,
  depositTime,
  withdrawalTime
}: BrokerReviewProps) {
  // Format a percentage from a score and maxScore
  const formatPercentage = (score: number, maxScore: number) => (score / maxScore) * 100;

  return (
    <div className="space-y-10">
      {/* Hero section */}
      <section className="bg-muted/50 rounded-xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3 space-y-6">
            <Badge className="mb-2">Broker Review</Badge>
            <h1 className="text-3xl md:text-4xl font-bold">{name} Review</h1>
            <div className="text-lg">
              {description}
            </div>
            
            <div className="pt-2">
              <Button asChild className="mr-4">
                <Link href={url} target="_blank" rel="noopener noreferrer">
                  Visit {name} <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/3 bg-background rounded-xl p-6 flex flex-col">
            <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-center">
              <img 
                src={logo} 
                alt={`${name} logo`} 
                className="h-16 max-w-full object-contain" 
              />
            </div>
            
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Founded</p>
                    <p className="font-medium">{yearFounded}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Headquarters</p>
                    <p className="font-medium">{headquarters}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Regulation</p>
                  <div className="flex flex-wrap gap-1">
                    {regulation.map((reg, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{reg}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Overall Rating</p>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-primary">{overallRating}</span>
                    <span className="text-xl text-muted-foreground ml-1">/5</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" asChild>
                <Link href="#comparison">
                  Compare with other brokers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick summary */}
      <section className="bg-background border rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Key Scores</h3>
            <div className="space-y-4">
              {scores.map((score, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{score.category}</span>
                    <span className="font-medium">{score.score}/{score.maxScore}</span>
                  </div>
                  <Progress value={formatPercentage(score.score, score.maxScore)} className="h-2" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" /> Pros
              </h3>
              <ul className="space-y-2">
                {pros.map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <XCircle className="mr-2 h-5 w-5 text-red-600" /> Cons
              </h3>
              <ul className="space-y-2">
                {cons.map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Detailed review tabs */}
      <Tabs defaultValue="fees">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        
        {/* Fees tab */}
        <TabsContent value="fees" className="space-y-6 pt-6">
          <div className="bg-background rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <DollarSign className="mr-2 h-6 w-6 text-primary" /> 
              Fees and Commissions
            </h2>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Fee Type</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fees.map((fee, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{fee.category}</TableCell>
                    <TableCell>{fee.value}</TableCell>
                    <TableCell className="text-muted-foreground">{fee.notes || '-'}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-medium">Withdrawal Fee</TableCell>
                  <TableCell>{withdrawalFee}</TableCell>
                  <TableCell className="text-muted-foreground">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Inactivity Fee</TableCell>
                  <TableCell>{inactivityFee}</TableCell>
                  <TableCell className="text-muted-foreground">-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Deposit Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {depositMethods.map((method, idx) => (
                    <Badge key={idx} variant="outline">{method}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Withdrawal Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {withdrawalMethods.map((method, idx) => (
                    <Badge key={idx} variant="outline">{method}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Platforms tab */}
        <TabsContent value="platforms" className="space-y-6 pt-6">
          <div className="bg-background rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Laptop className="mr-2 h-6 w-6 text-primary" />
              Trading Platforms
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {platforms.map((platform, idx) => (
                  <Card key={idx} className={platform.isAvailable ? "border-green-200" : "border-red-200 opacity-70"}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        {platform.isAvailable ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mr-2" />
                        )}
                        {platform.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {platform.details || (platform.isAvailable ? 'Available' : 'Not available')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Trading Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tradingFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      {feature.isAvailable ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div>
                        <div className="font-medium">{feature.name}</div>
                        <div className="text-sm text-muted-foreground">{feature.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Account tab */}
        <TabsContent value="account" className="space-y-6 pt-6">
          <div className="bg-background rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Shield className="mr-2 h-6 w-6 text-primary" />
              Account Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div>
                <h3 className="text-lg font-semibold mb-4">Account Opening</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Opening Time</div>
                      <div className="text-muted-foreground">{accountOpening}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Minimum Deposit</div>
                      <div className="text-muted-foreground">{minDeposit}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Deposits and Withdrawals</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Deposit Time</div>
                      <div className="text-muted-foreground">{depositTime}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Withdrawal Time</div>
                      <div className="text-muted-foreground">{withdrawalTime}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {customerSupport.map((channel, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      {channel.isAvailable ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div>
                        <div className="font-medium">{channel.name}</div>
                        <div className="text-sm text-muted-foreground">{channel.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Products tab */}
        <TabsContent value="products" className="space-y-6 pt-6">
          <div className="bg-background rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Globe className="mr-2 h-6 w-6 text-primary" />
              Products and Markets
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assetClasses.map((asset, idx) => (
                  <Card key={idx} className={asset.isAvailable ? "border-green-200" : "border-red-200 opacity-70"}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        {asset.isAvailable ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mr-2" />
                        )}
                        {asset.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {asset.details || (asset.isAvailable ? 'Available' : 'Not available')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Research tab */}
        <TabsContent value="research" className="space-y-6 pt-6">
          <div className="bg-background rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Award className="mr-2 h-6 w-6 text-primary" />
              Research and Analysis
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {researchFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  {feature.isAvailable ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <div className="font-medium">{feature.name}</div>
                    <div className="text-sm text-muted-foreground">{feature.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Education tab */}
        <TabsContent value="education" className="space-y-6 pt-6">
          <div className="bg-background rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <GraduationCap className="mr-2 h-6 w-6 text-primary" />
              Educational Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educationResources.map((resource, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  {resource.isAvailable ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <div className="font-medium">{resource.name}</div>
                    <div className="text-sm text-muted-foreground">{resource.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Feature ratings */}
      <section className="bg-background border rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Rating by Feature</h2>
        
        <div className="space-y-4">
          {featureRatings.map((feature, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{feature.name}</span>
                <span>{feature.rating}/5</span>
              </div>
              <Progress value={(feature.rating / 5) * 100} className="h-2" />
              {feature.description && (
                <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
      
      {/* Comparison section placeholder */}
      <section className="bg-background border rounded-lg p-8" id="comparison">
        <h2 className="text-2xl font-bold mb-6">How {name} Compares</h2>
        
        <p className="text-muted-foreground">Compare {name} with other similar brokers to find the best fit for your trading needs.</p>
        
        <div className="flex flex-wrap gap-4 mt-6">
          <Button>
            <Link href="/tools/compare">
              Compare with Other Brokers
            </Link>
          </Button>
          <Button variant="outline">
            <Link href="/best-brokers">
              View Best Brokers
            </Link>
          </Button>
        </div>
      </section>
      
      {/* FAQ section */}
      <section className="bg-background border rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Is {name} safe?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {name} is regulated by {regulation.join(', ')}, which provides a level of protection for clients. 
                The broker has been operating since {yearFounded} and maintains segregated client funds for additional security.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How much does it cost to trade with {name}?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {name} offers various fee structures depending on the account type and instruments traded. 
                The minimum deposit is {minDeposit}, and spreads start from the values listed in our fees section. 
                Additional costs may include withdrawal fees ({withdrawalFee}) and inactivity fees ({inactivityFee}).
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What trading platforms does {name} offer?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {name} offers {platforms.filter(p => p.isAvailable).map(p => p.name).join(', ')} 
                for trading. These platforms are available on various devices including desktop and mobile.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What products can I trade with {name}?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                With {name}, you can trade {assetClasses.filter(a => a.isAvailable).map(a => a.name).join(', ')}.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="bg-primary text-primary-foreground rounded-lg p-8 md:p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Trading with {name}?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Open an account today to access {name}'s trading platforms, competitive pricing, and comprehensive range of markets.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href={url} target="_blank" rel="noopener noreferrer">
              Visit {name} <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <Link href="/tools/compare">
              Compare with Other Brokers
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 