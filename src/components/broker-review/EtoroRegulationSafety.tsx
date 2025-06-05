"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Building2, 
  FileCheck, 
  Lock, 
  AlertTriangle,
  CheckCircle,
  Globe,
  DollarSign
} from 'lucide-react';

interface Broker {
  name: string;
  regulations: string;
  country: string;
}

interface EtoroRegulationSafetyProps {
  broker: Broker;
}

export function EtoroRegulationSafety({ broker }: EtoroRegulationSafetyProps) {
  const regulatoryBodies = [
    {
      name: 'CySEC',
      fullName: 'Cyprus Securities and Exchange Commission',
      license: '109/10',
      jurisdiction: 'European Union',
      coverage: '€20,000',
      description: 'Primary regulator for EU operations, ensuring MiFID II compliance and investor protection.',
      logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=60&fit=crop'
    },
    {
      name: 'FCA',
      fullName: 'Financial Conduct Authority',
      license: '583263',
      jurisdiction: 'United Kingdom',
      coverage: '£85,000',
      description: 'UK financial services regulator providing comprehensive oversight and consumer protection.',
      logo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&h=60&fit=crop'
    },
    {
      name: 'ASIC',
      fullName: 'Australian Securities and Investments Commission',
      license: '491139',
      jurisdiction: 'Australia',
      coverage: 'AU$250,000',
      description: 'Australian regulator ensuring compliance with local financial services laws.',
      logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=60&fit=crop'
    },
    {
      name: 'FinCEN',
      fullName: 'Financial Crimes Enforcement Network',
      license: '31000031',
      jurisdiction: 'United States',
      coverage: 'SIPC Protected',
      description: 'US Treasury department bureau ensuring AML/KYC compliance and financial crime prevention.',
      logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=60&fit=crop'
    }
  ];

  const safetyFeatures = [
    {
      icon: Lock,
      title: 'Segregated Client Funds',
      description: 'Client funds are held in segregated accounts with tier-1 banks, separate from company operational funds.'
    },
    {
      icon: Shield,
      title: 'Investor Compensation Schemes',
      description: 'Multiple compensation schemes protect clients up to €20,000 (EU), £85,000 (UK), and AU$250,000 (Australia).'
    },
    {
      icon: FileCheck,
      title: 'Regular Audits',
      description: 'Independent audits by major accounting firms ensure financial transparency and regulatory compliance.'
    },
    {
      icon: Building2,
      title: 'Tier-1 Banking Partners',
      description: 'Client funds deposited with established banks including Barclays, Lloyds, and other major institutions.'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          Regulation & Safety Analysis
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          eToro maintains one of the most comprehensive regulatory frameworks in the industry, 
          with licenses from major financial authorities across four continents ensuring robust client protection.
        </p>
      </div>

      {/* Regulatory Overview */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Global Regulatory Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regulatoryBodies.map((regulator) => (
              <Card key={regulator.name} className="border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-semibold">
                      {regulator.name}
                    </Badge>
                    <div className="relative h-8 w-12 rounded overflow-hidden">
                      <Image
                        src={regulator.logo}
                        alt={`${regulator.name} logo`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{regulator.fullName}</p>
                    <p className="text-muted-foreground">License: {regulator.license}</p>
                    <p className="text-muted-foreground">Coverage: {regulator.coverage}</p>
                    <p className="text-xs text-muted-foreground">{regulator.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Features */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Client Protection Measures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Warnings */}
      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <strong>Important Risk Disclosure:</strong> CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. 
          76% of retail investor accounts lose money when trading CFDs with eToro. Social trading involves additional risks as past performance 
          of copied traders does not guarantee future results. Consider whether you understand how CFDs work and can afford the high risk of losing money.
        </AlertDescription>
      </Alert>

      {/* Detailed Analysis */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h3 className="text-xl font-semibold mb-4">Comprehensive Regulatory Analysis</h3>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <div>
            <h4 className="font-semibold mb-2">European Union Operations (CySEC)</h4>
            <p className="text-muted-foreground">
              eToro (Europe) Ltd is authorized and regulated by the Cyprus Securities and Exchange Commission (CySEC) 
              under license number 109/10. This authorization allows eToro to passport its services across all EU member states 
              under MiFID II regulations. The CySEC license ensures compliance with strict capital adequacy requirements, 
              client fund segregation, and investor compensation scheme participation up to €20,000 per client.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">United Kingdom Operations (FCA)</h4>
            <p className="text-muted-foreground">
              eToro (UK) Ltd is authorized and regulated by the Financial Conduct Authority (FCA) under firm reference number 583263. 
              UK clients benefit from Financial Services Compensation Scheme (FSCS) protection up to £85,000. The FCA regulation 
              ensures adherence to stringent conduct of business rules and enhanced consumer protection measures.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Australian Operations (ASIC)</h4>
            <p className="text-muted-foreground">
              eToro AUS Capital Limited holds an Australian Financial Services License (AFSL) 491139 issued by the Australian 
              Securities and Investments Commission (ASIC). Australian clients are protected under the Financial Claims Scheme 
              up to AU$250,000, with additional professional indemnity insurance coverage.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">United States Operations (FinCEN)</h4>
            <p className="text-muted-foreground">
              eToro USA LLC is registered with the Financial Crimes Enforcement Network (FinCEN) as a Money Services Business 
              under registration number 31000031. US operations are subject to strict AML/KYC requirements and state-level 
              money transmitter licenses. Securities offered through eToro USA Securities Inc., member FINRA/SIPC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
