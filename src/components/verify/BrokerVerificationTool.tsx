"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CheckCircle,
  Loader2,
  Search,
  AlertTriangle,
  Globe,
  X,
  Check,
  FileText,
  Info,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const verificationSchema = z.object({
  brokerName: z.string().min(2, {
    message: "Broker name must be at least 2 characters.",
  }),
});

type VerificationResult = {
  status: "verified" | "warning" | "scam" | null;
  message: string;
  details?: string[];
};

const regulators = [
  {
    id: "fca",
    name: "FCA (UK)",
    url: "https://register.fca.org.uk/s/",
    description: "Financial Conduct Authority - United Kingdom",
  },
  {
    id: "asic",
    name: "ASIC (Australia)",
    url: "https://connectonline.asic.gov.au/",
    description: "Australian Securities and Investments Commission",
  },
  {
    id: "cysec",
    name: "CySEC (Cyprus)",
    url: "https://www.cysec.gov.cy/en-GB/entities/investment-firms/cypriot/",
    description: "Cyprus Securities and Exchange Commission",
  },
  {
    id: "bafin",
    name: "BaFin (Germany)",
    url: "https://portal.mvp.bafin.de/database/InstInfo/",
    description: "Federal Financial Supervisory Authority - Germany",
  },
];

export function BrokerVerificationTool() {
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeRegulator, setActiveRegulator] = useState(regulators[0]);

  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      brokerName: "",
    },
  });

  // In a real application, this would make an API call to verify the broker
  const verifyBroker = async (data: z.infer<typeof verificationSchema>) => {
    setIsVerifying(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock verification results based on input
    const brokerName = data.brokerName.toLowerCase();
    let result: VerificationResult;
    
    if (brokerName.includes("scam") || brokerName.includes("fake")) {
      result = {
        status: "scam",
        message: "This broker appears to be fraudulent",
        details: [
          "Not registered with any known regulatory authority",
          "Found on multiple scam warning lists",
          "Multiple user complaints about withdrawal issues"
        ]
      };
    } else if (brokerName.includes("warning") || brokerName.includes("caution")) {
      result = {
        status: "warning",
        message: "This broker has some warning signs",
        details: [
          "Regulated in a jurisdiction with weak oversight",
          "Some user complaints about customer service",
          "Unclear fee structure"
        ]
      };
    } else {
      result = {
        status: "verified",
        message: "This broker appears to be legitimate",
        details: [
          "Properly regulated by recognized authorities",
          "No significant warning signs detected",
          "Good standing in the trading community"
        ]
      };
    }
    
    setVerificationResult(result);
    setIsVerifying(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2 border-primary/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Broker Verification Tool</CardTitle>
          <CardDescription>
            Check if a broker is properly regulated and has no warning signs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(verifyBroker)} className="space-y-4">
              <FormField
                control={form.control}
                name="brokerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Broker Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter broker name" 
                        {...field} 
                        className="h-12"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the exact name of the broker you want to verify
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full h-12"
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Verify Broker
                  </span>
                )}
              </Button>
            </form>
          </Form>
          
          {verificationResult && (
            <div className="mt-6">
              {verificationResult.status === "verified" && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Verified Legitimate</AlertTitle>
                  <AlertDescription className="text-green-700">
                    {verificationResult.message}
                  </AlertDescription>
                </Alert>
              )}
              
              {verificationResult.status === "warning" && (
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Proceed with Caution</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    {verificationResult.message}
                  </AlertDescription>
                </Alert>
              )}
              
              {verificationResult.status === "scam" && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-800">Potential Scam Detected</AlertTitle>
                  <AlertDescription className="text-red-700">
                    {verificationResult.message}
                  </AlertDescription>
                </Alert>
              )}
              
              {verificationResult.details && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                  <h3 className="font-medium mb-2 flex items-center gap-1">
                    <Info className="h-4 w-4" /> Verification Details
                  </h3>
                  <ul className="space-y-1">
                    {verificationResult.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col text-sm text-muted-foreground pt-0">
          <p>
            This tool checks broker information against regulatory databases, warning lists, and user complaints
            to provide a risk assessment. For legal reasons, results should be considered informational only.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 