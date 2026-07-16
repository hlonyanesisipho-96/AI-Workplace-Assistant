import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Sparkles, Save } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, AiBadge, AiDisclaimer } from "@/components/page-header";
import { useAppState, type BusinessProfile } from "@/lib/business-store";
import { generateProfileCopy } from "@/lib/ai.functions";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const [state, setState] = useAppState();
  const [p, setP] = useState<BusinessProfile>(state.profile);
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof BusinessProfile>(k: K, v: BusinessProfile[K]) =>
    setP((prev) => ({ ...prev, [k]: v }));

  const save = () => {
    setState((s) => ({ ...s, profile: p }));
    toast.success("Business profile saved");
  };

  const runAi = async () => {
    setLoading(true);
    try {
      const out = await generateProfileCopy({
        data: {
          businessName: p.businessName,
          category: p.category,
          industry: p.industry,
          description: p.description,
          products: p.products,
          services: p.services,
          city: p.city,
        },
      });
      const next = { ...p, ...out } as BusinessProfile;
      setP(next);
      setState((s) => ({ ...s, profile: next }));
      toast.success("AI generated your brand copy");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        icon={<Building2 className="h-5 w-5" />}
        title="Business Profile"
        description="Tell us about your business. AI will generate polished brand copy."
        actions={
          <>
            <Button onClick={runAi} disabled={loading} className="gradient-brand text-white">
              <Sparkles /> {loading ? "Generating..." : "Generate with AI"}
            </Button>
            <Button variant="outline" onClick={save}>
              <Save /> Save
            </Button>
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Business details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <F label="Business Name">
              <Input value={p.businessName} onChange={(e) => set("businessName", e.target.value)} />
            </F>
            <F label="Owner Name">
              <Input value={p.ownerName} onChange={(e) => set("ownerName", e.target.value)} />
            </F>
            <F label="Category">
              <Input value={p.category} onChange={(e) => set("category", e.target.value)} />
            </F>
            <F label="Industry">
              <Input value={p.industry} onChange={(e) => set("industry", e.target.value)} />
            </F>
            <F label="Description" full>
              <Textarea
                rows={3}
                value={p.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </F>
            <F label="Products">
              <Textarea rows={2} value={p.products} onChange={(e) => set("products", e.target.value)} />
            </F>
            <F label="Services">
              <Textarea rows={2} value={p.services} onChange={(e) => set("services", e.target.value)} />
            </F>
            <F label="Address">
              <Input value={p.address} onChange={(e) => set("address", e.target.value)} />
            </F>
            <F label="City">
              <Input value={p.city} onChange={(e) => set("city", e.target.value)} />
            </F>
            <F label="Province">
              <Input value={p.province} onChange={(e) => set("province", e.target.value)} />
            </F>
            <F label="Phone">
              <Input value={p.phone} onChange={(e) => set("phone", e.target.value)} />
            </F>
            <F label="Email">
              <Input type="email" value={p.email} onChange={(e) => set("email", e.target.value)} />
            </F>
            <F label="Business Hours" full>
              <Input value={p.hours} onChange={(e) => set("hours", e.target.value)} />
            </F>
            <F label="Website">
              <Input value={p.website} onChange={(e) => set("website", e.target.value)} />
            </F>
            <F label="Facebook">
              <Input value={p.facebook} onChange={(e) => set("facebook", e.target.value)} />
            </F>
            <F label="Instagram">
              <Input value={p.instagram} onChange={(e) => set("instagram", e.target.value)} />
            </F>
            <F label="WhatsApp">
              <Input value={p.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
            </F>
            <F label="LinkedIn">
              <Input value={p.linkedin} onChange={(e) => set("linkedin", e.target.value)} />
            </F>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AiBadge /> Generated brand copy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Slogan", "slogan"],
              ["About Us", "aboutUs"],
              ["Mission", "mission"],
              ["Vision", "vision"],
              ["Overview", "overview"],
              ["SEO Keywords", "seoKeywords"],
              ["Summary", "summary"],
            ].map(([label, key]) => (
              <div key={key as string}>
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  {label}
                </Label>
                <Textarea
                  rows={label === "Slogan" || label === "SEO Keywords" ? 2 : 4}
                  value={(p[key as keyof BusinessProfile] as string) ?? ""}
                  onChange={(e) => set(key as keyof BusinessProfile, e.target.value as never)}
                  placeholder={loading ? "Generating..." : "Click Generate with AI"}
                />
              </div>
            ))}
            <AiDisclaimer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function F({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <Label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
