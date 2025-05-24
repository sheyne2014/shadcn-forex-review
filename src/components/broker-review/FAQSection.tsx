import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search } from "lucide-react";

interface FAQSectionProps {
  broker: any;
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export function FAQSection({ 
  broker, 
  faqs = [] 
}: FAQSectionProps) {
  // Default FAQs if not provided
  const defaultFaqs = [
    {
      question: `Is ${broker.name} regulated?`,
      answer: broker.regulations 
        ? `Yes, ${broker.name} is regulated by ${broker.regulations}, which helps ensure that the broker operates with transparency and adheres to industry standards.` 
        : `${broker.name} states that it operates in compliance with financial regulations, but we recommend confirming the latest regulatory status directly with the broker.`
    },
    {
      question: `What is the minimum deposit required for ${broker.name}?`,
      answer: broker.min_deposit 
        ? `The minimum deposit required to open an account with ${broker.name} is $${broker.min_deposit}. This allows traders to start with a relatively ${broker.min_deposit <= 100 ? 'low' : 'reasonable'} initial investment.` 
        : `The minimum deposit required to open an account with ${broker.name} depends on the account type you choose. We recommend checking the broker's website for the most up-to-date information.`
    },
    {
      question: `What trading platforms does ${broker.name} offer?`,
      answer: broker.trading_platforms 
        ? `${broker.name} offers the following trading platforms: ${broker.trading_platforms}.` 
        : `${broker.name} provides various trading platforms including MetaTrader 4, MetaTrader 5, and a proprietary WebTrader platform. Each platform comes with different features and tools to support your trading activities.`
    },
    {
      question: `What is the maximum leverage offered by ${broker.name}?`,
      answer: broker.max_leverage 
        ? `${broker.name} offers a maximum leverage of ${broker.max_leverage}. However, leverage levels may vary depending on your account type, regulatory restrictions, and the instruments you're trading.` 
        : `${broker.name} offers leverage that varies by instrument and account type, typically ranging from 1:30 to 1:500. Leverage is subject to regulatory restrictions in some jurisdictions.`
    },
    {
      question: `How can I withdraw funds from my ${broker.name} account?`,
      answer: `You can withdraw funds from your ${broker.name} account through various methods including bank transfers, credit/debit cards, and e-wallets. Withdrawal processing times vary by method, typically ranging from 1-5 business days. Always verify any applicable withdrawal fees before proceeding.`
    },
    {
      question: `Is ${broker.name} suitable for beginner traders?`,
      answer: `${broker.name} ${broker.min_deposit && broker.min_deposit <= 100 ? 'has a low minimum deposit requirement and' : ''} offers educational resources ${broker.educational_resources ? 'including ' + broker.educational_resources : ''} that can be helpful for beginners. However, the suitability depends on various factors including your learning style, trading goals, and risk tolerance. Beginners should start with a demo account to practice before risking real money.`
    },
    {
      question: `What customer support options does ${broker.name} provide?`,
      answer: `${broker.name} provides customer support through various channels including email, live chat, and phone support. Support is typically available during market hours, with some brokers offering 24/5 coverage during trading days.`
    },
    {
      question: `Does ${broker.name} charge any inactivity fees?`,
      answer: `Like many brokers, ${broker.name} may charge inactivity fees for accounts that have been dormant for an extended period, typically after 6-12 months of inactivity. The exact fee structure should be checked on their official website or terms of service.`
    },
    {
      question: `What trading instruments can I trade with ${broker.name}?`,
      answer: broker.supported_assets 
        ? `${broker.name} offers trading in the following assets: ${typeof broker.supported_assets === 'string' ? broker.supported_assets : Array.isArray(broker.supported_assets) ? broker.supported_assets.join(', ') : 'various financial instruments'}.` 
        : `${broker.name} offers a range of trading instruments including forex pairs, commodities, indices, stocks, and cryptocurrencies. The exact range may vary based on your account type and jurisdiction.`
    },
    {
      question: `How do I open an account with ${broker.name}?`,
      answer: `To open an account with ${broker.name}, visit their official website and follow the account registration process. You'll need to provide personal information, verify your identity as per regulatory requirements, and make an initial deposit. The process is typically straightforward and can be completed within a few minutes to a few business days, depending on verification requirements.`
    }
  ];

  // Use provided FAQs or default ones
  const displayFAQs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" /> Frequently Asked Questions
          </CardTitle>
          <CardDescription>
            Common questions about {broker.name} and their services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {displayFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Still have questions?</CardTitle>
          <CardDescription>
            Get additional information about {broker.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Search Knowledge Base</h3>
            <p className="text-muted-foreground mb-4">
              Find quick answers to your questions in our comprehensive knowledge base.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder={`Search for "${broker.name} questions"`}
                className="w-full border rounded-md px-4 py-2 pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="border rounded-lg p-6">
            <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Reach out to our support team.
            </p>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block border rounded-md px-4 py-2 text-center hover:bg-muted transition-colors"
              >
                Live Chat
              </a>
              <a 
                href="#" 
                className="block border rounded-md px-4 py-2 text-center hover:bg-muted transition-colors"
              >
                Email Support
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 