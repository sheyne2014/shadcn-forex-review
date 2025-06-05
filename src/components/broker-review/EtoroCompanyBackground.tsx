"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  TrendingUp,
  Globe,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Award,
  Shield,
  BarChart3,
  Lightbulb,
  Target,
  Zap,
  CheckCircle,
  Info,
  ExternalLink,
  ArrowRight,
  Briefcase,
  PieChart,
  LineChart
} from "lucide-react";

import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroCompanyBackgroundProps {
  broker?: any;
}

export function EtoroCompanyBackground({ broker }: EtoroCompanyBackgroundProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4">eToro Company Background</h2>
          <p className="text-muted-foreground">
            eToro is a leading social trading platform founded in 2007.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
