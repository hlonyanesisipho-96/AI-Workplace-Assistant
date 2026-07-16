import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, AiDisclaimer } from "@/components/page-header";
import { useAppState } from "@/lib/business-store";
import { generateAdvisorReport } from "@/lib/ai.functions";

export const Route = createFileRoute("/advisor")({ component: AdvisorPage });

function AdvisorPage() {
  const [state, setState] = useAppState();
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const p = state.profile;
      const ctx = `Business name: ${p.businessName}
Category: ${p.category}
Industry: ${p.industry}
City: ${p.city}, ${p.province}
Description: ${p.description}
Products: ${p.products}
Services: ${p.services}
Website status: ${state.websiteStatus}
Marketing content generated: ${state.marketing.length}`;
      const out = await generateAdvisorReport({ data: { businessContext: ctx } });
      setState((s) => ({ ...s, advisorNotes: out }));
      toast.success("Advisor report ready");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        icon={<TrendingUp className="h-5 w-5" />}
        title="AI Business Advisor"
        description="Personalized strategic recommendations for growing your business."
        actions={
          <Button onClick={run} disabled={loading} className="gradient-brand text-white">
            <Sparkles /> {loading ? "Analyzing..." : state.advisorNotes ? "Regenerate" : "Generate report"}
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Growth report</CardTitle>
        </CardHeader>
        <CardContent>
          {state.advisorNotes ? (
            <div className="prose prose-sm max-w-none whitespace-pre-wrap dark:prose-invert">
              {state.advisorNotes}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed p-10 text-center">
              <TrendingUp className="mx-auto h-10 w-10 text-brand" />
              <p className="mt-3 text-sm text-muted-foreground">
                Click <b>Generate report</b> for AI-powered growth recommendations.
              </p>
            </div>
          )}
          <AiDisclaimer />
        </CardContent>
      </Card>
    </div>
  );
}
