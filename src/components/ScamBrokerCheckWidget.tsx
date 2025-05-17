"use client";

import { useState } from 'react';
import { Search, ShieldCheck, AlertTriangle, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type VerificationResult = {
  isLegitimate: boolean;
  regulatoryStatus?: string;
  warningFlags: string[];
};

export function ScamBrokerCheckWidget() {
  const [brokerName, setBrokerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Scam Broker Check
          </CardTitle>
          <CardDescription className="text-center">
            Verify if a broker is legitimate or potentially fraudulent
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter broker name..."
              value={brokerName}
              onChange={(e) => setBrokerName(e.target.value)}
              className="flex-grow"
              onKeyDown={(e) => e.key === 'Enter' && handleVerifyBroker()}
            />
            <Button onClick={handleVerifyBroker} disabled={loading || !brokerName.trim()}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Verification Result:</div>
                {result.isLegitimate ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Check className="h-3 w-3 mr-1" /> Appears Legitimate
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <AlertTriangle className="h-3 w-3 mr-1" /> Warning Signs Detected
                  </Badge>
                )}
              </div>

              {result.regulatoryStatus && (
                <div className="text-sm">
                  <div className="font-medium">Regulatory Information:</div>
                  <div className="text-muted-foreground">{result.regulatoryStatus}</div>
                </div>
              )}

              {result.warningFlags && result.warningFlags.length > 0 && (
                <div className="text-sm">
                  <div className="font-medium text-red-600">Warning Flags:</div>
                  <ul className="list-disc list-inside text-red-600 pl-2">
                    {result.warningFlags.map((flag, index) => (
                      <li key={index} className="text-sm">{flag}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground text-center pt-0">
          This check uses web data and may not be 100% accurate. Always conduct thorough research before investing.
        </CardFooter>
      </Card>
    </div>
  );
} 