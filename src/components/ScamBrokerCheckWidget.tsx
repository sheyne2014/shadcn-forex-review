"use client";

import { useState, useEffect } from 'react';
import { Search, ShieldCheck, AlertTriangle, Check, Loader2, Info, X, ExternalLink, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { siteConfig } from '@/config/site';

type VerificationResult = {
  isLegitimate: boolean;
  regulatoryStatus?: string;
  warningFlags: string[];
  regulatoryAuthorities?: string[];
  webResults?: any[];
  isTrustedBroker?: boolean;
  isKnownScam?: boolean;
  trustScore?: number;
};

interface ScamBrokerCheckWidgetProps {
  brokerName?: string;
}

export function ScamBrokerCheckWidget({ brokerName: initialBrokerName = '' }: ScamBrokerCheckWidgetProps) {
  const [brokerName, setBrokerName] = useState(initialBrokerName);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Static user counter for now - could be dynamic in the future
  const usersSavedCount = "4,945,492";
  
  const handleVerifyBroker = async () => {
    if (!brokerName.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/verify-broker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brokerName: brokerName.trim(),
          includeWarningTerms: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify broker');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error verifying broker:', err);
      setError('Failed to verify broker. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-verify if brokerName is provided initially
  useEffect(() => {
    if (initialBrokerName) {
      handleVerifyBroker();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialBrokerName]);

  return (
    <div className="w-full mx-auto">
      {/* Hero section with shield, professional design */}
      <div className="bg-gradient-to-r from-primary/90 to-primary rounded-lg sm:rounded-xl mb-6 sm:mb-8 overflow-hidden shadow-md sm:shadow-lg">
        <div className="relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="px-4 py-5 sm:p-6 md:p-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1 text-center md:text-left mb-5 md:mb-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-2 sm:mb-3">
                  Verify Broker Legitimacy with {siteConfig.name}
                </h1>
                <p className="text-primary-foreground/80 mb-3 sm:mb-4 max-w-2xl text-sm sm:text-base">
                  Protect your investments by checking if your broker is legitimate.
                  Our tool analyzes regulatory data and real-time web information.
                </p>
                <div className="flex flex-row items-center justify-center md:justify-start gap-4 sm:gap-6">
                  <div>
                    <p className="text-primary-foreground/70 text-xs sm:text-sm font-medium">
                      Traders protected
                    </p>
                    <div className="font-mono text-lg sm:text-xl md:text-2xl tracking-wider text-white">
                      {usersSavedCount.split('').map((char, i) => (
                        <span key={i} className={char === ',' ? 'opacity-50 mx-0.5' : ''}>
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-8 w-px bg-white/20"></div>
                  
                  <div>
                    <p className="text-primary-foreground/70 text-xs sm:text-sm font-medium">
                      Brokers analyzed
                    </p>
                    <div className="font-mono text-lg sm:text-xl md:text-2xl tracking-wider text-white">
                      2,490+
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shield logo */}
              <div className="flex-shrink-0 relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto md:mx-0">
                <div className="absolute inset-0 z-0">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-white/10 blur-xl transform scale-90"></div>
                  
                  {/* Animated rings */}
                  <div className="absolute inset-0 rounded-full border-3 sm:border-4 border-white/20 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full border-3 sm:border-4 border-white/15 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  <div className="absolute inset-4 rounded-full border-3 sm:border-4 border-white/10 animate-pulse" style={{ animationDelay: '600ms' }}></div>
                </div>
                
                {/* Shield icon */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="relative">
                    <Shield className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-white drop-shadow-lg" 
                      strokeWidth={1.5} />
                    
                    {/* Status indicator */}
                    {result && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {!result.isLegitimate ? (
                          <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-red-500 drop-shadow-md" />
                        ) : (
                          <Check className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-green-500 drop-shadow-md" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search input */}
      <div className="bg-white rounded-lg shadow-md sm:shadow-lg p-4 sm:p-6 mb-5 sm:mb-6">
        <div className="mb-3 sm:mb-4">
          <label htmlFor="broker-search" className="block text-sm font-medium text-gray-700 mb-2">
            Enter the name of a broker and see if it can be trusted.
          </label>
          <div className="flex">
            <Input
              id="broker-search"
              placeholder="Enter broker name..."
              value={brokerName}
              onChange={(e) => setBrokerName(e.target.value)}
              className="flex-grow rounded-r-none border-r-0"
              onKeyDown={(e) => e.key === 'Enter' && handleVerifyBroker()}
            />
            <Button 
              onClick={handleVerifyBroker} 
              disabled={loading || !brokerName.trim()}
              className="rounded-l-none bg-primary hover:bg-primary/90 text-white"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check"}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-3 sm:mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <div className="text-center py-6 sm:py-8">
            <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-blue-600 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-600 text-sm sm:text-base">Searching the web for broker information...</p>
          </div>
        )}

        {result && (
          <div className="mt-5 sm:mt-6">
            {/* Trust score indicator */}
            <div className="mb-5 sm:mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-base sm:text-lg">Trust Score</h3>
                <Badge 
                  variant="outline" 
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm ${
                    result.trustScore && result.trustScore > 75 ? 'bg-green-50 text-green-700 border-green-200' : 
                    result.trustScore && result.trustScore > 50 ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                    'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                  {result.trustScore}/100
                </Badge>
              </div>
              <Progress 
                value={result.trustScore} 
                className={`h-2 ${
                  result.trustScore && result.trustScore > 75 ? '[&>div]:bg-green-500' : 
                  result.trustScore && result.trustScore > 50 ? '[&>div]:bg-amber-500' : 
                  '[&>div]:bg-red-500'
                }`}
              />
            </div>
            
            {/* Verification status */}
            <div className="p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 border flex gap-3 sm:gap-4 items-start">
              <div className={`p-1.5 sm:p-2 rounded-full ${result.isLegitimate ? 'bg-green-100' : 'bg-red-100'}`}>
                {result.isLegitimate ? 
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-700" /> : 
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-700" />
                }
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg">
                  {result.isTrustedBroker ? 
                    "Trusted Broker" : 
                    result.isKnownScam ? 
                    "Known Scam Broker - AVOID" : 
                    result.isLegitimate ? 
                    "Likely Legitimate" : 
                    "Potentially Unsafe"
                  }
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {result.isTrustedBroker ? 
                    `${brokerName} is a well-established and trusted broker.` : 
                    result.isKnownScam ? 
                    `${brokerName} has been identified as a scam or fraudulent broker.` : 
                    result.isLegitimate ? 
                    `${brokerName} appears to be legitimate based on our web search.` : 
                    `${brokerName} shows warning signs that require caution.`
                  }
                </p>
              </div>
            </div>

            {/* Regulatory information */}
            {result.regulatoryStatus && (
              <div className="p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 border">
                <h3 className="font-semibold mb-1.5 sm:mb-2 text-base sm:text-md">Regulatory Information</h3>
                <p className="text-gray-700 text-xs sm:text-sm">{result.regulatoryStatus}</p>
                
                {result.regulatoryAuthorities && result.regulatoryAuthorities.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-xs sm:text-sm font-medium">Regulatory Authorities Mentioned:</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
                      {result.regulatoryAuthorities.map((authority, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {authority}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Warning flags */}
            {result.warningFlags && result.warningFlags.length > 0 && (
              <div className="p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 border bg-red-50">
                <h3 className="font-semibold mb-1.5 sm:mb-2 text-red-700 text-base sm:text-md">Warning Flags</h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {result.warningFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-red-700 text-xs sm:text-sm">
                      <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                      <span className="break-words">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Web results */}
            {result.webResults && result.webResults.length > 0 && (
              <div className="p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 border">
                <h3 className="font-semibold mb-2 sm:mb-3 text-base sm:text-md">Sources and References</h3>
                <ul className="space-y-2 sm:space-y-3 divide-y">
                  {result.webResults.map((webResult, idx) => (
                    <li key={idx} className={idx > 0 ? 'pt-2 sm:pt-3' : ''}>
                      <a 
                        href={webResult.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-start gap-1.5 sm:gap-2 hover:bg-gray-50 p-1 rounded"
                      >
                        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 sm:mt-1 flex-shrink-0 text-blue-600" />
                        <div>
                          <p className="font-medium text-xs sm:text-sm text-blue-700 hover:underline">{webResult.title}</p>
                          <p className="text-xs text-gray-500 truncate">{webResult.snippet?.substring(0, 100)}...</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Disclaimer footer */}
      <div className="text-xs text-gray-500 mt-3 sm:mt-4">
        <p>This check uses web data and may not be 100% accurate. Always conduct thorough research before investing.</p>
      </div>
    </div>
  );
} 