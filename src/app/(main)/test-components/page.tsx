"use client";

import { EnhancedCTA, CTAPresets } from "@/components/EnhancedCTA";
import { TrustSignals, TrustSignalPresets } from "@/components/TrustSignals";
import { CoreWebVitalsOptimizer } from "@/components/CoreWebVitalsOptimizer";
import { PageSpeedInsights } from "@/components/PageSpeedInsights";
import { MobileResponsivenessOptimizer } from "@/components/MobileResponsivenessOptimizer";
import { SEOAudit } from "@/components/SEOAudit";
import { Sparkles, Shield, TrendingUp } from "lucide-react";

export default function TestComponentsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Component Testing Page</h1>
      
      {/* Enhanced CTA Components */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Enhanced CTA Components</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnhancedCTA
            {...CTAPresets.brokerFinder}
            primaryAction={{
              ...CTAPresets.brokerFinder.primaryAction,
              icon: <Sparkles className="h-4 w-4" />
            }}
          />
          <EnhancedCTA
            {...CTAPresets.scamCheck}
            primaryAction={{
              ...CTAPresets.scamCheck.primaryAction,
              icon: <Shield className="h-4 w-4" />
            }}
          />
        </div>
      </section>

      {/* Trust Signals */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Trust Signals</h2>
        <TrustSignals {...TrustSignalPresets.homepage} />
      </section>

      {/* Performance Components */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Performance Monitoring</h2>
        <div className="space-y-6">
          <CoreWebVitalsOptimizer />
          <MobileResponsivenessOptimizer />
          <SEOAudit showFullAudit={true} />
        </div>
      </section>

      {/* PageSpeed Insights */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">PageSpeed Insights</h2>
        <PageSpeedInsights />
      </section>
    </div>
  );
}
