"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import CornerElements from "@/components/CornerElements";

const HelpPage = () => {
  const faqs = [
    { question: "How do I create a fitness plan?", answer: "Go to Generate Program page and follow the voice AI instructions." },
    { question: "Can I track my progress?", answer: "Yes! Your profile page shows your active plans and progress." },
    { question: "Is my data safe?", answer: "Absolutely! We follow strict privacy protocols." },
  ];

  return (
    <section className="relative z-10 pt-24 pb-32 container mx-auto px-4">
      <div className="relative backdrop-blur-sm border border-border rounded-lg p-8 max-w-2xl mx-auto">
        <CornerElements />
        <h1 className="text-3xl font-bold font-mono mb-6 text-center">
          <span className="text-primary">Help</span> & FAQ
        </h1>

        <Accordion type="multiple" className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-primary/10 font-mono">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default HelpPage;
