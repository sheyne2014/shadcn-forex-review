"use client";

import { EnhancedCTA, CTAPresets } from "@/components/EnhancedCTA";
import { TrustSignals, TrustSignalPresets } from "@/components/TrustSignals";
import { Sparkles, Shield } from "lucide-react";

export function EnhancedCTASection() {
  return (
    <>
      {/* Enhanced CTA Section with Trust Signals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <EnhancedCTA
                {...CTAPresets.brokerFinder}
                primaryAction={{
                  ...CTAPresets.brokerFinder.primaryAction,
                  icon: <Sparkles className="h-4 w-4" />
                }}
                className="h-full"
              />
            </div>
            <div>
              <EnhancedCTA
                {...CTAPresets.scamCheck}
                primaryAction={{
                  ...CTAPresets.scamCheck.primaryAction,
                  icon: <Shield className="h-4 w-4" />
                }}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <TrustSignals {...TrustSignalPresets.homepage} />
        </div>
      </section>
    </>
  );
}
