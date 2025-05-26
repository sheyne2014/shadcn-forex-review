import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { generateDynamicFAQs } from "@/lib/broker-analysis";
import { HelpCircle, AlertTriangle } from "lucide-react";
import { useMemo } from "react";

interface Broker {
  name?: string;
  min_deposit?: string | number;
  regulations?: string;
  [key: string]: unknown;
}

interface DynamicFAQSectionProps {
  broker: Broker;
  additionalFaqs?: { question: string; answer: string }[];
}

export function DynamicFAQSection({
  broker,
  additionalFaqs = []
}: DynamicFAQSectionProps) {
  // Safely handle broker data
  if (!broker || typeof broker !== 'object') {
    return (
      <Card className="p-6">
        <div className="flex items-center text-amber-600 gap-2">
          <AlertTriangle className="h-5 w-5" />
          <p>Unable to generate FAQs. Broker information is missing or invalid.</p>
        </div>
      </Card>
    );
  }

  // Safely generate dynamic FAQs based on broker data
  const dynamicFaqs = useMemo(() => {
    try {
      return generateDynamicFAQs(broker);
    } catch (error) {
      console.error('Error generating FAQs:', error);
      // Fallback FAQs when error occurs
      return [
        {
          question: `What is the minimum deposit requirement?`,
          answer: broker.min_deposit
            ? `The minimum deposit is $${broker.min_deposit}.`
            : `Please check the broker's website for minimum deposit requirements.`
        },
        {
          question: `Is this broker regulated?`,
          answer: broker.regulations
            ? `Yes, this broker is regulated by ${broker.regulations}.`
            : `Regulatory information is not fully available at this time.`
        }
      ];
    }
  }, [broker]);

  // Combine dynamic and additional FAQs
  const allFaqs = [...dynamicFaqs, ...additionalFaqs];

  // Ensure we have at least something to display
  if (allFaqs.length === 0) {
    allFaqs.push({
      question: "What should I know about this broker?",
      answer: "Please check the official website for detailed information about this broker's services and conditions."
    });
  }

  return (
    <Card className="border-border/80 hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-muted/30 to-muted/10">
        <CardTitle className="flex items-center text-xl">
          <HelpCircle className="h-6 w-6 mr-3 text-primary" /> Frequently Asked Questions
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Common questions about {broker.name || "this broker"} trading conditions and services
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {allFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border/60 rounded-lg px-4 hover:border-primary/30 transition-colors">
              <AccordionTrigger className="text-left text-base font-semibold py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="text-base text-muted-foreground prose prose-base max-w-none leading-relaxed">
                  <p>{faq.answer}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}