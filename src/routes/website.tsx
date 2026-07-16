import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Globe, RefreshCw, Sparkles, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, AiDisclaimer } from "@/components/page-header";
import { useAppState } from "@/lib/business-store";

export const Route = createFileRoute("/website")({ component: WebsitePage });

function WebsitePage() {
  const [state, setState] = useAppState();

  const generate = () => {
    setState((s) => ({
      ...s,
      websiteGeneratedAt: new Date().toISOString(),
      websiteUpdatedAt: new Date().toISOString(),
    }));
    toast.success("Website regenerated with AI");
  };

  const publish = () => {
    setState((s) => ({
      ...s,
      websiteStatus: "published",
      websiteUpdatedAt: new Date().toISOString(),
      websiteGeneratedAt: s.websiteGeneratedAt ?? new Date().toISOString(),
    }));
    toast.success("Website published");
  };

  const sections = [
    "Hero — Logo, name, tagline & CTA",
    "About Us",
    "Services",
    "Products",
    "Gallery",
    "Testimonials",
    "Contact information & form",
    "Map placeholder",
    "Footer",
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        icon={<Globe className="h-5 w-5" />}
        title="AI Website Builder"
        description="Generate a modern, responsive, SEO-friendly one-page business site."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/preview"><Eye /> Preview</Link>
            </Button>
            <Button onClick={generate} className="gradient-brand text-white">
              <Sparkles /> Generate / Regenerate
            </Button>
            <Button onClick={publish} variant="outline">
              <UploadCloud /> Publish
            </Button>
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Website sections</CardTitle>
            <Badge
              variant="secondary"
              className={
                state.websiteStatus === "published"
                  ? "bg-success/15 text-success"
                  : "bg-warning/15 text-warning"
              }
            >
              {state.websiteStatus === "published" ? "Published" : "Draft"}
            </Badge>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={i} className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3 text-sm">
                  <div className="grid h-6 w-6 place-items-center rounded-md gradient-brand text-xs font-semibold text-white">
                    {i + 1}
                  </div>
                  {s}
                </li>
              ))}
            </ul>
            <AiDisclaimer />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Info label="Status" value={state.websiteStatus === "published" ? "Live" : "Draft"} />
            <Info
              label="Last generated"
              value={state.websiteGeneratedAt ? new Date(state.websiteGeneratedAt).toLocaleString() : "—"}
            />
            <Info
              label="Last updated"
              value={state.websiteUpdatedAt ? new Date(state.websiteUpdatedAt).toLocaleString() : "—"}
            />
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={generate} className="w-full">
                <RefreshCw /> Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
