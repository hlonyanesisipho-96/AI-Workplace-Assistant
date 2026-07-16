import { createFileRoute } from "@tanstack/react-router";
import { Copy, Link2, RefreshCw, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { businessUrl, useAppState } from "@/lib/business-store";

export const Route = createFileRoute("/links")({ component: LinksPage });

function LinksPage() {
  const [state, setState] = useAppState();
  const url = businessUrl(state.profile.slug);

  const copy = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied");
  };

  const regenerate = () => {
    const slug = `${state.profile.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}-${Math.random().toString(36).slice(2, 6)}`;
    setState((s) => ({ ...s, profile: { ...s.profile, slug } }));
    toast.success("New link generated");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        icon={<Link2 className="h-5 w-5" />}
        title="Business Link"
        description="Your shareable business URL. Perfect for bios, chats, and print."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your unique link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border bg-gradient-to-br from-brand/5 to-brand/10 p-6 text-center">
            <div className="font-mono text-lg font-semibold break-all sm:text-xl">
              {url}
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
              Edit slug
            </Label>
            <Input
              value={state.profile.slug}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  profile: {
                    ...s.profile,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                  },
                }))
              }
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={copy} variant="outline">
              <Copy /> Copy
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (navigator.share) navigator.share({ url: `https://${url}` });
                else copy();
              }}
            >
              <Share2 /> Share
            </Button>
            <Button onClick={regenerate} className="gradient-brand text-white">
              <RefreshCw /> Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
