"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink,
  Building2,
  DollarSign,
  FileText,
  Globe,
  Lock,
  Users,
  TrendingUp,
  Info,
  Eye,
  Scale,
  Gavel,
  MapPin,
  CreditCard,
  Zap,
  Target,
  BarChart3
} from "lucide-react";
import { Context7Content, Context7Heading2, Context7Heading3 } from "@/components/Context7Provider";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroRegulationSafetyProps {
  broker: any;
}

export function EtoroRegulationSafety({ broker }: EtoroRegulationSafetyProps) {
  const [activeTab, setActiveTab] = useState("regulatory-overview");
  const [verificationStatus, setVerificationStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Track component view
    trackEvent({
      action: 'view_regulation_safety',
      category: 'broker_analysis',
      label: 'etoro_regulation_deep_dive'
    });
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    trackEvent({
      action: 'tab_change',
      category: 'user_engagement',
      label: `regulation_safety_${tab}`
    });
  };

  const regulatoryEntities = [
    {
      regulator: "FCA (United Kingdom)",
      license: "#583263",
      entity: "eToro (UK) Ltd",
      status: "Active",
      coverage: "UK & EEA clients",
      protection: "FSCS up to £85,000",
      services: "CFDs, Stocks, Crypto CFDs",
      verificationUrl: "https://register.fca.org.uk/s/firm?id=0010X00004MfNWVQA3",
      riskLevel: "Low",
      lastUpdated: "2024-01-15"
    },
    {
      regulator: "CySEC (Cyprus)",
      license: "#109/10",
      entity: "eToro (Europe) Ltd",
      status: "Active",
      coverage: "EU clients (excluding UK)",
      protection: "ICF up to €20,000",
      services: "CFDs, Social Trading, CopyPortfolios",
      verificationUrl: "https://www.cysec.gov.cy/en-GB/entities/investment-firms/cypriot/",
      riskLevel: "Low",
      lastUpdated: "2024-01-10"
    },
    {
      regulator: "ASIC (Australia)",
      license: "#491139",
      entity: "eToro AUS Capital Limited",
      status: "Active",
      coverage: "Australian clients",
      protection: "Limited compensation",
      services: "CFDs, Limited social trading",
      verificationUrl: "https://asic.gov.au/online-services/search-asics-registers/",
      riskLevel: "Medium",
      lastUpdated: "2023-12-20"
    },
    {
      regulator: "FINRA (United States)",
      license: "eToro USA Securities Inc.",
      entity: "eToro USA Securities Inc.",
      status: "Active",
      coverage: "US clients",
      protection: "SIPC up to $500,000",
      services: "Stocks only (no CFDs)",
      verificationUrl: "https://brokercheck.finra.org/",
      riskLevel: "Low",
      lastUpdated: "2024-01-05"
    }
  ];

  const safetyMetrics = {
    overallSafetyScore: 8.5,
    regulatoryCompliance: 9.2,
    clientProtection: 8.8,
    transparency: 7.9,
    riskManagement: 8.1
  };

  const clientProtectionDetails = [
    {
      jurisdiction: "United Kingdom",
      scheme: "FSCS",
      coverage: "£85,000",
      type: "Per person, per firm",
      details: "Covers deposits, investments, and insurance claims",
      bankPartners: "Barclays, Lloyds Banking Group"
    },
    {
      jurisdiction: "European Union",
      scheme: "ICF",
      coverage: "€20,000",
      type: "Per client",
      details: "Investor Compensation Fund coverage",
      bankPartners: "Tier 1 European banks"
    },
    {
      jurisdiction: "Australia",
      scheme: "Limited",
      coverage: "No guarantee",
      type: "Professional indemnity",
      details: "ASIC regulatory requirements only",
      bankPartners: "ANZ, Commonwealth Bank"
    },
    {
      jurisdiction: "United States",
      scheme: "SIPC",
      coverage: "$500,000",
      type: "Per account",
      details: "Securities Investor Protection Corporation",
      bankPartners: "US regulated custodians"
    }
  ];

  const complianceChallenges = [
    {
      challenge: "Multi-Jurisdictional Operations",
      impact: "High",
      description: "Operating across multiple regulatory frameworks with different requirements",
      mitigation: "Separate legal entities for each jurisdiction"
    },
    {
      challenge: "Social Trading Regulation",
      impact: "Medium",
      description: "Unique regulatory challenges for copy trading and social features",
      mitigation: "Comprehensive risk warnings and investor education"
    },
    {
      challenge: "CFD Retail Restrictions",
      impact: "High",
      description: "ESMA leverage restrictions and marketing limitations",
      mitigation: "Adapted product offerings and enhanced risk management"
    },
    {
      challenge: "US Market Limitations",
      impact: "Medium",
      description: "Cannot offer CFDs or full social trading features in US",
      mitigation: "Separate US entity offering stocks and ETFs only"
    }
  ];

  return (
    <>
      <PerformanceMonitor />
      <div className="space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <Context7Heading2>Regulation & Safety Deep Analysis</Context7Heading2>
          </div>
          <Context7Content>
            Comprehensive analysis of eToro's regulatory framework, client protection measures, 
            and safety protocols across multiple jurisdictions.
          </Context7Content>
        </div>

        {/* Safety Score Dashboard */}
        <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Overall Safety Assessment
              </div>
              <Badge variant="default" className="text-lg px-4 py-2 bg-green-600">
                {safetyMetrics.overallSafetyScore}/10
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(safetyMetrics).slice(1).map(([metric, score]) => (
                <div key={metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize text-sm">
                      {metric.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-semibold">{score}/10</span>
                  </div>
                  <Progress value={score * 10} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="regulatory-overview">Regulatory Overview</TabsTrigger>
            <TabsTrigger value="client-protection">Client Protection</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="safety-concerns">Safety Analysis</TabsTrigger>
          </TabsList>

          {/* Regulatory Overview Tab */}
          <TabsContent value="regulatory-overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>FCA (UK)</CardTitle>
                  <CardDescription>Financial Conduct Authority</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>License #: 583263</li>
                    <li><a href="https://register.fca.org.uk/s/firm?id=001b000000MfGvUAAV" target="_blank" rel="noopener noreferrer" className="text-primary underline">Verify on FCA Register</a></li>
                    <li>Services: CFDs, stocks, crypto (limited), social trading</li>
                    <li>Client fund protection: <b>FSCS up to £85,000</b></li>
                    <li>Compensation: Financial Services Compensation Scheme (FSCS)</li>
                    <li>Recent actions: No major FCA penalties as of 2024</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>CySEC (EU)</CardTitle>
                  <CardDescription>Cyprus Securities and Exchange Commission</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>License #: 109/10</li>
                    <li><a href="https://www.cysec.gov.cy/en-GB/entities/investment-firms/cypriot/37660/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Verify on CySEC Register</a></li>
                    <li>Services: CFDs, stocks, crypto, social trading</li>
                    <li>Client fund protection: <b>ICF up to €20,000</b></li>
                    <li>Compensation: Investor Compensation Fund (ICF)</li>
                    <li>Recent actions: No major CySEC penalties as of 2024</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>ASIC (Australia)</CardTitle>
                  <CardDescription>Australian Securities & Investments Commission</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>License #: 491139</li>
                    <li><a href="https://connectonline.asic.gov.au/RegistrySearch/faces/landing/SearchRegisters.jspx" target="_blank" rel="noopener noreferrer" className="text-primary underline">Verify on ASIC Register</a></li>
                    <li>Services: CFDs, stocks, social trading</li>
                    <li>Client fund protection: No statutory compensation scheme</li>
                    <li>Compensation: Private insurance for eligible clients</li>
                    <li>Recent actions: No major ASIC penalties as of 2024</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>FINRA (USA)</CardTitle>
                  <CardDescription>Financial Industry Regulatory Authority</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>eToro USA Securities Inc. (CRD #298361)</li>
                    <li><a href="https://brokercheck.finra.org/firm/summary/298361" target="_blank" rel="noopener noreferrer" className="text-primary underline">Verify on FINRA BrokerCheck</a></li>
                    <li>Services: US stocks, ETFs, options, crypto (via eToro USA LLC)</li>
                    <li>Client fund protection: <b>SIPC up to $500,000</b> (securities only)</li>
                    <li>Compensation: Securities Investor Protection Corporation (SIPC)</li>
                    <li>Recent actions: No major FINRA penalties as of 2024</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Regulatory Analysis */}
            <Card>
              <CardHeader>
                <Context7Heading3>Regulatory Framework Analysis</Context7Heading3>
              </CardHeader>
              <CardContent className="space-y-6">
                <Context7Content>
                  eToro operates through multiple regulated entities across different jurisdictions, 
                  each tailored to meet specific regional regulatory requirements. This multi-entity 
                  structure ensures compliance while maximizing service availability to global clients.
                </Context7Content>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Regulatory Strengths
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Shield className="h-3 w-3 text-green-600 mt-1" />
                        <span>Tier 1 regulatory coverage (FCA, CySEC, ASIC)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Lock className="h-3 w-3 text-green-600 mt-1" />
                        <span>Segregated client funds with major banks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="h-3 w-3 text-green-600 mt-1" />
                        <span>Regular regulatory reporting and audits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-3 w-3 text-green-600 mt-1" />
                        <span>Comprehensive investor compensation schemes</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-amber-600 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Regulatory Considerations
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Info className="h-3 w-3 text-amber-600 mt-1" />
                        <span>Different product offerings across jurisdictions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="h-3 w-3 text-amber-600 mt-1" />
                        <span>Complex multi-entity structure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Scale className="h-3 w-3 text-amber-600 mt-1" />
                        <span>Varying leverage limits by region</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Gavel className="h-3 w-3 text-amber-600 mt-1" />
                        <span>Evolving social trading regulations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Client Protection Tab */}
          <TabsContent value="client-protection" className="space-y-6">
            <Card>
              <CardHeader>
                <Context7Heading3>Client Fund Protection & Segregation</Context7Heading3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Context7Content type="paragraph">
                    eToro keeps all client funds in segregated accounts at top-tier banks, including J.P. Morgan, Deutsche Bank, and Coutts. This ensures client money is never mixed with company funds. In the UK, funds are protected by the FSCS up to £85,000 per person. In the EU, the ICF covers up to €20,000. In Australia, there is no statutory scheme, but eToro provides private insurance for eligible clients. In the US, SIPC covers up to $500,000 for securities. For high-balance clients, Lloyd's of London insurance covers up to $1 million (Platinum+ tiers, select regions).
                  </Context7Content>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <img src="https://www.etoro.com/images/insurance-infographic-en.png" alt="eToro client fund protection infographic" className="rounded-lg shadow-md max-w-xs w-full h-auto" />
                    <img src="https://www.etoro.com/images/regulation-map-en.png" alt="eToro global regulation map" className="rounded-lg shadow-md max-w-xs w-full h-auto" />
                  </div>
                  <Context7Content type="caption">Infographics: eToro official insurance and regulation coverage (source: eToro.com)</Context7Content>
                </div>
              </CardContent>
            </Card>

            {/* Fund Segregation Details */}
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Fund Segregation & Banking Partners
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Context7Content>
                  eToro maintains strict segregation of client funds through partnerships with 
                  tier-1 banking institutions. Client money is held separately from company 
                  operational funds and cannot be used for business purposes.
                </Context7Content>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <Lock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Segregated Accounts</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Client funds held separately from company assets
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <Building2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Tier 1 Banks</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Partnerships with major regulated banking institutions
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Daily Reconciliation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Regular monitoring and reconciliation processes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <Context7Heading3>Regulatory Compliance Challenges</Context7Heading3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceChallenges.map((challenge, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{challenge.challenge}</h4>
                        <Badge 
                          variant={challenge.impact === "High" ? "destructive" : 
                                  challenge.impact === "Medium" ? "secondary" : "outline"}
                        >
                          {challenge.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <span className="font-medium text-green-600 text-sm">Mitigation:</span>
                          <p className="text-sm">{challenge.mitigation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safety Concerns Tab */}
          <TabsContent value="safety-concerns" className="space-y-6">
            <Alert className="border-amber-200 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important Safety Considerations</AlertTitle>
              <AlertDescription>
                While eToro is well-regulated, users should understand the inherent risks 
                associated with CFD trading and social trading features.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Risk Factors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h5 className="font-medium">CFD Trading Risks</h5>
                    <p className="text-sm text-muted-foreground">
                      76% of retail accounts lose money when trading CFDs with eToro
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium">Social Trading Risks</h5>
                    <p className="text-sm text-muted-foreground">
                      Past performance of copied traders doesn't guarantee future results
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium">Counterparty Risk</h5>
                    <p className="text-sm text-muted-foreground">
                      eToro acts as counterparty to CFD trades
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Safety Measures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h5 className="font-medium">Risk Management Tools</h5>
                    <p className="text-sm text-muted-foreground">
                      Stop loss, take profit, and negative balance protection
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium">Educational Resources</h5>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive trading education and risk warnings
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium">Regulatory Oversight</h5>
                    <p className="text-sm text-muted-foreground">
                      Multiple tier-1 regulatory authorities monitoring operations
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Transparency & Reporting */}
        <Card>
          <CardHeader>
            <Context7Heading3>Transparency & Regulatory Reporting</Context7Heading3>
          </CardHeader>
          <CardContent className="space-y-6">
            <Context7Content>
              eToro publishes annual reports, Pillar 3 disclosures, and best execution statistics for its EU and UK entities. These are available on the eToro website. Execution quality is monitored and reported as required by MiFID and FCA rules. Complaint handling procedures are published for each entity, and clients can escalate unresolved issues to the relevant ombudsman or regulator.
            </Context7Content>
            <div className="flex flex-wrap gap-4 justify-center">
              <img src="https://www.etoro.com/images/transparency-infographic-en.png" alt="eToro transparency and reporting infographic" className="rounded-lg shadow-md max-w-xs w-full h-auto" />
            </div>
            <Context7Content type="caption">Infographic: eToro transparency and reporting (source: eToro.com)</Context7Content>
          </CardContent>
        </Card>

        {/* Customer Complaint Handling */}
        <Card>
          <CardHeader>
            <Context7Heading3>Customer Complaint Handling</Context7Heading3>
          </CardHeader>
          <CardContent>
            <Context7Content type="paragraph">
              eToro provides a dedicated Help Center and customer service team. Complaints can be submitted via the website, email (pr@etoro.com), or phone (US: 1-888-271-8365). eToro aims to resolve complaints within 8 weeks (UK/EU) and provides escalation to the Financial Ombudsman (UK) or CySEC (EU) if unresolved. Complaint procedures are published for each region.
            </Context7Content>
          </CardContent>
        </Card>

        {/* Footnotes & Sources */}
        <Card>
          <CardHeader>
            <Context7Heading3>References & Sources</Context7Heading3>
          </CardHeader>
          <CardContent>
            <ul className="text-xs list-disc pl-6">
              <li><a href="https://www.etoro.com/customer-service/regulation-license/" target="_blank" rel="noopener noreferrer">eToro Regulation & License</a></li>
              <li><a href="https://register.fca.org.uk/s/firm?id=001b000000MfGvUAAV" target="_blank" rel="noopener noreferrer">FCA Register</a></li>
              <li><a href="https://www.cysec.gov.cy/en-GB/entities/investment-firms/cypriot/37660/" target="_blank" rel="noopener noreferrer">CySEC Register</a></li>
              <li><a href="https://connectonline.asic.gov.au/RegistrySearch/faces/landing/SearchRegisters.jspx" target="_blank" rel="noopener noreferrer">ASIC Register</a></li>
              <li><a href="https://brokercheck.finra.org/firm/summary/298361" target="_blank" rel="noopener noreferrer">FINRA BrokerCheck</a></li>
              <li><a href="https://www.etoro.com/investing/insurance/" target="_blank" rel="noopener noreferrer">eToro Insurance</a></li>
              <li><a href="https://www.etoro.com/customer-service/account-and-money-protection/" target="_blank" rel="noopener noreferrer">eToro Account & Money Protection</a></li>
              <li><a href="https://www.etoro.com/news-and-analysis/press-releases/etoro-reports-continued-growth-with-fy22-results/" target="_blank" rel="noopener noreferrer">eToro Annual Report 2022</a></li>
              <li><a href="https://help.etoro.com/s/article/how-can-i-submit-a-complaint?language=en_GB" target="_blank" rel="noopener noreferrer">eToro Complaints Process</a></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
