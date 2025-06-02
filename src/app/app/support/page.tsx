import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Mail } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How do I request a ride?",
    answer: "You can request a ride from the main dashboard by entering your pickup and destination locations, then selecting a vehicle type and confirming your request."
  },
  {
    question: "How is the fare calculated?",
    answer: "Fares are calculated based on distance, estimated time, the selected vehicle type, and any applicable surge pricing or promotions. You'll see an estimated fare before confirming."
  },
  {
    question: "Can I change my destination during a ride?",
    answer: "Yes, you can request to change your destination during a ride. The fare may be adjusted based on the new destination. Please inform your driver."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept major credit/debit cards, mobile wallets (like Apple Pay and Google Pay), and in some cases, cash. You can manage your payment methods in your profile."
  },
  {
    question: "How do I report a lost item?",
    answer: "After your ride, you can go to the ride summary or your trip history and find an option to report a lost item. This will help you get in touch with support or the driver."
  },
];

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <LifeBuoy className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl font-headline">Help & Support</CardTitle>
              <CardDescription>Find answers to common questions or get in touch with us.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-4 font-headline">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline">Contact Us</CardTitle>
          <CardDescription>If you can&apos;t find an answer in the FAQs, please reach out.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-muted-foreground">
                For urgent issues, please use the in-app SOS feature during a ride or contact emergency services if necessary. For other support inquiries:
            </p>
          <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" >
            <Link href="mailto:support@dispatchnow.example.com">
              <Mail className="w-4 h-4 mr-2" /> Email Support
            </Link>
          </Button>
          {/* Placeholder for in-app chat or phone support */}
          <p className="text-xs text-muted-foreground">
            In-app chat support will be available soon.
          </p >
        </CardContent>
      </Card>
    </div>
  );
}
