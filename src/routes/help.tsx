import { createFileRoute, Link } from "@tanstack/react-router";
import { HelpCircle, Bot, BookOpen, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/help")({ component: HelpPage });

const FAQS = [
  {
    q: "How does BIZbuilder AI use AI?",
    a: "BIZbuilder AI uses large language models to generate brand copy, marketing content, website sections, and business advice based on the details you provide about your business.",
  },
  {
    q: "Is my data saved online?",
    a: "Your business profile and generated content are stored locally in this browser. Nothing is uploaded to your account unless you explicitly publish it.",
  },
  {
    q: "Can I edit AI-generated content?",
    a: "Yes. Every AI output is fully editable. We recommend reviewing content carefully before publishing to make sure it reflects your business accurately.",
  },
  {
    q: "How do I share my business link?",
    a: "Open Business Links, copy the URL, and share it in WhatsApp, Instagram bio, business cards, or anywhere online. You can also generate a matching QR code.",
  },
  {
    q: "How accurate is the AI advisor?",
    a: "The AI advisor provides general strategic suggestions based on your business context. It is not a substitute for professional advice for legal, financial, or highly regulated decisions.",
  },
];

function HelpPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        icon={<HelpCircle className="h-5 w-5" />}
        title="Help & Support"
        description="Everything you need to know to get the most out of BIZbuilder AI."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <QuickCard
          icon={<Bot className="h-5 w-5" />}
          title="Ask the AI Assistant"
          description="Get instant answers about your business."
          to="/assistant"
        />
        <QuickCard
          icon={<BookOpen className="h-5 w-5" />}
          title="Getting started"
          description="Set up your profile, then generate everything with AI."
          to="/profile"
        />
        <QuickCard
          icon={<MessageSquare className="h-5 w-5" />}
          title="Contact support"
          description="Email us at help@bizbuilder.app for extra help."
        />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Frequently asked questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

function QuickCard({
  icon,
  title,
  description,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  to?: string;
}) {
  const inner = (
    <Card className="h-full transition-all hover:border-brand/40 hover:shadow-md">
      <CardContent className="space-y-2 p-5">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand">{icon}</div>
        <div className="font-semibold">{title}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
        {to && <Button variant="ghost" size="sm" className="mt-1 -ml-2">Open →</Button>}
      </CardContent>
    </Card>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
}
