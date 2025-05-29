"use client";

import { Shield, Lock, CheckCircle, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrustSignalProps {
  broker: {
    name: string;
    regulators?: string[];
    isSecure?: boolean;
    trustScore?: number;
    securityFeatures?: string[];
    isScamBroker?: boolean;
  };
}

export function TrustSignals({ broker }: TrustSignalProps) {
  const securityFeatures = broker.securityFeatures || [
    'SSL Encryption',
    'Two-Factor Authentication',
    'Segregated Accounts',
    'Negative Balance Protection'
  ];

  const regulators = broker.regulators || [];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Trust & Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Security Status */}
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Security Status</span>
              </div>
              <span className={`text-sm ${broker.isSecure ? 'text-green-600' : 'text-yellow-600'}`}>
                {broker.isSecure ? 'Verified Secure' : 'Under Review'}
              </span>
            </div>

            {/* Scam Check */}
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Scam Check</span>
              </div>
              <span className={`text-sm ${!broker.isScamBroker ? 'text-green-600' : 'text-red-600'}`}>
                {!broker.isScamBroker ? 'Legitimate Broker' : 'Warning: Potential Risk'}
              </span>
            </div>

            {/* Trust Score */}
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Trust Score</span>
              </div>
              <span className={`text-sm ${
                (broker.trustScore || 0) >= 8 ? 'text-green-600' : 
                (broker.trustScore || 0) >= 6 ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {broker.trustScore || 'N/A'}/10
              </span>
            </div>

            {/* Security Features */}
            <div className="space-y-2">
              <h4 className="font-medium">Security Features</h4>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {securityFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulators */}
            {regulators.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Regulated By</h4>
                <ul className="grid grid-cols-2 gap-2 text-sm">
                  {regulators.map((regulator, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Shield className="h-3 w-3 text-blue-600" />
                      {regulator}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}