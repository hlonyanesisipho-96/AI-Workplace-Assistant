import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Copy,
  Download,
  Eye,
  Globe,
  Lightbulb,
  Link2,
  Megaphone,
  MessageSquare,
  QrCode,
  RefreshCw,
  Share2,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  businessUrl,
  computeCompletion,
  useAppState,
  useHydrated,
} from "@/lib/business-store";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/")({ component: Dashboard });

function qrUrl(text: string, size = 220) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    text,
  )}&color=2563EB`;
}

function Dashboard() {
  const [state, setState] = useAppState();
  const hydrated = useHydrated();
  const profile = state.profile;
  const completion = computeCompletion(profile);
  const url = businessUrl(profile.slug);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const insights = [
    { icon: Sparkles, text: "Complete your About Us section for a stronger brand impression." },
    { icon: Megaphone, text: "Generate a promo campaign for this week's slowest day." },
    { icon: Globe, text: "Publish your website to start collecting customer enquiries." },
    { icon: Lightbulb, text: "Add 3-5 SEO keywords to improve local search visibility." },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        icon={<Sparkles className="h-5 w-5" />}
        title={hydrated ? `Welcome back, ${profile.ownerName.split(" ")[0]}` : "Welcome back"}
        description="Your AI-powered command center for growing your business online."
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/marketing">
                <Megaphone /> Generate content
              </Link>
            </Button>
            <Button asChild className="gradient-brand text-white shadow-sm hover:opacity-90">
              <Link to="/assistant">
                <Sparkles /> Ask AI
              </Link>
            </Button>
          </>
        }
      />

      {/* Stat strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Profile", value: `${completion}%`, hint: "complete" },
          {
            label: "Website",
            value: state.websiteStatus === "published" ? "Live" : "Draft",
            hint: state.websiteStatus === "published" ? "published" : "not published",
          },
          { label: "Content", value: state.marketing.length.toString(), hint: "pieces generated" },
          { label: "Visitors", value: "1,284", hint: "last 30 days" },
        ].map((s) => (
          <Card key={s.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {s.label}
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.hint}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Business Profile */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-5 w-5 text-brand" /> Business Profile
            </CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/profile">Edit <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <Field label="Business" value={profile.businessName} />
              <Field label="Category" value={profile.category} />
              <Field label="City" value={`${profile.city}, ${profile.province}`} />
              <Field label="Phone" value={profile.phone} />
              <Field label="Email" value={profile.email} />
              <Field
                label="Website"
                value={
                  <Badge
                    variant="secondary"
                    className={
                      state.websiteStatus === "published"
                        ? "bg-success/15 text-success"
                        : "bg-warning/15 text-warning-foreground dark:text-warning"
                    }
                  >
                    {state.websiteStatus === "published" ? "Published" : "Draft"}
                  </Badge>
                }
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Profile completion</span>
                <span className="font-semibold text-foreground">{completion}%</span>
              </div>
              <Progress value={completion} />
            </div>
          </CardContent>
        </Card>

        {/* Business Link */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Link2 className="h-5 w-5 text-brand" /> Business Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border bg-muted/40 p-3 text-sm font-mono break-all">
              {url}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => copy(url)}>
                <Copy /> Copy
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: profile.businessName, url: `https://${url}` });
                  } else {
                    copy(url);
                  }
                }}
              >
                <Share2 /> Share
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const slug = `${profile.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Math.random().toString(36).slice(2, 6)}`;
                  setState((s) => ({ ...s, profile: { ...s.profile, slug } }));
                  toast.success("New link generated");
                }}
              >
                <RefreshCw /> Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Website status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-5 w-5 text-brand" /> Website
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <div className="flex items-center gap-2">
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
                <span className="text-xs text-muted-foreground">
                  {state.websiteUpdatedAt
                    ? `Updated ${new Date(state.websiteUpdatedAt).toLocaleDateString()}`
                    : "Not generated yet"}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/preview"><Eye /> Preview</Link>
              </Button>
              <Button
                size="sm"
                className="gradient-brand text-white"
                onClick={() => {
                  setState((s) => ({
                    ...s,
                    websiteStatus: "published",
                    websiteUpdatedAt: new Date().toISOString(),
                    websiteGeneratedAt: s.websiteGeneratedAt ?? new Date().toISOString(),
                  }));
                  toast.success("Website published");
                }}
              >
                <UploadCloud /> Publish
              </Button>
              <Button asChild size="sm" variant="ghost">
                <Link to="/website"><RefreshCw /> Regenerate</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QR Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <QrCode className="h-5 w-5 text-brand" /> Business QR
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-center rounded-lg border bg-white p-3">
              {hydrated && (
                <img
                  src={qrUrl(`https://${url}`, 160)}
                  alt="Business QR code"
                  className="h-32 w-32"
                />
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild size="sm" variant="outline">
                <a href={qrUrl(`https://${url}`, 512)} download="business-qr.png" target="_blank" rel="noreferrer">
                  <Download /> Download
                </a>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <Link to="/qr">Open</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-5 w-5 text-brand" /> AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 sm:grid-cols-2">
              {insights.map((i, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 rounded-lg border bg-muted/30 p-3 text-sm"
                >
                  <i.icon className="h-4 w-4 shrink-0 text-brand" />
                  <span>{i.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recent Marketing */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Megaphone className="h-5 w-5 text-brand" /> Recent Marketing Content
            </CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/marketing">Generate <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {state.marketing.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No content yet. Generate your first post to see it here.
                </p>
                <Button asChild size="sm" className="mt-4 gradient-brand text-white">
                  <Link to="/marketing">Generate content</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {state.marketing.slice(0, 6).map((m) => (
                  <div key={m.id} className="rounded-lg border bg-card p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <Badge variant="secondary">{m.type}</Badge>
                      <span className="text-xs text-muted-foreground">{m.tone}</span>
                    </div>
                    <p className="line-clamp-4 whitespace-pre-wrap text-sm">{m.content}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <QuickAction to="/profile" icon={Building2} label="Business Profile" />
            <QuickAction to="/website" icon={Globe} label="Build Website" />
            <QuickAction to="/marketing" icon={Megaphone} label="Marketing" />
            <QuickAction to="/qr" icon={QrCode} label="QR Code" />
            <QuickAction to="/links" icon={Link2} label="Business Link" />
            <QuickAction to="/assistant" icon={Sparkles} label="Ask AI" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="truncate font-medium">{value || "—"}</div>
    </div>
  );
}

function QuickAction({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center justify-center gap-2 rounded-xl border bg-card p-4 text-center transition-all hover:border-brand/40 hover:shadow-md"
    >
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:gradient-brand group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
