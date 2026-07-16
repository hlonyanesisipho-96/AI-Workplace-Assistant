import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, MapPin, Phone, Mail, Facebook, Instagram, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, AiDisclaimer } from "@/components/page-header";
import { useAppState, useHydrated } from "@/lib/business-store";

export const Route = createFileRoute("/preview")({ component: PreviewPage });

function PreviewPage() {
  const [state] = useAppState();
  const hydrated = useHydrated();
  const p = state.profile;

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        icon={<Eye className="h-5 w-5" />}
        title="Website Preview"
        description="A live preview of your AI-generated business website."
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/profile">Edit content</Link>
            </Button>
            <Button asChild className="gradient-brand text-white">
              <Link to="/website">Publish</Link>
            </Button>
          </>
        }
      />

      {!hydrated ? null : (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {/* Hero */}
            <div className="relative overflow-hidden gradient-brand p-8 text-white sm:p-12">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 60%, white 0, transparent 40%)",
              }} />
              <div className="relative mx-auto max-w-3xl text-center">
                <Badge className="bg-white/15 text-white hover:bg-white/20">
                  <Sparkles className="mr-1 h-3 w-3" /> {p.category}
                </Badge>
                <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                  {p.businessName}
                </h1>
                {p.slogan && <p className="mt-3 text-lg opacity-90">{p.slogan}</p>}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Button className="bg-white text-brand hover:bg-white/90">Get in touch</Button>
                  <Button variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                    View services
                  </Button>
                </div>
              </div>
            </div>

            {/* About */}
            <section className="mx-auto max-w-3xl px-6 py-10">
              <h2 className="text-2xl font-bold">About us</h2>
              <p className="mt-3 whitespace-pre-wrap text-muted-foreground">
                {p.aboutUs || p.description}
              </p>
              {(p.mission || p.vision) && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {p.mission && (
                    <div className="rounded-xl border bg-muted/30 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wide text-brand">Mission</div>
                      <p className="mt-1 text-sm">{p.mission}</p>
                    </div>
                  )}
                  {p.vision && (
                    <div className="rounded-xl border bg-muted/30 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wide text-brand">Vision</div>
                      <p className="mt-1 text-sm">{p.vision}</p>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Services / Products */}
            <section className="bg-muted/30 px-6 py-10">
              <div className="mx-auto max-w-4xl">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xl font-bold">Services</h3>
                    <ul className="mt-3 space-y-2 text-sm">
                      {p.services.split(/[,\n]/).filter(Boolean).map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          {s.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Products</h3>
                    <ul className="mt-3 space-y-2 text-sm">
                      {p.products.split(/[,\n]/).filter(Boolean).map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-2" />
                          {s.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mx-auto max-w-4xl px-6 py-10">
              <h2 className="text-2xl font-bold">Get in touch</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <ContactRow icon={<MapPin className="h-4 w-4" />} label={`${p.address}, ${p.city}`} />
                <ContactRow icon={<Phone className="h-4 w-4" />} label={p.phone} />
                <ContactRow icon={<Mail className="h-4 w-4" />} label={p.email} />
              </div>
              <div className="mt-6 aspect-[16/7] w-full overflow-hidden rounded-xl border bg-muted grid place-items-center text-sm text-muted-foreground">
                <MapPin className="mb-2 h-6 w-6" />
                Map placeholder — {p.city}, {p.province}
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-card px-6 py-6 text-center text-xs text-muted-foreground">
              <div className="flex items-center justify-center gap-3">
                {p.facebook && <Facebook className="h-4 w-4" />}
                {p.instagram && <Instagram className="h-4 w-4" />}
              </div>
              <p className="mt-2">
                © {new Date().getFullYear()} {p.businessName}. Built with BIZbuilder AI.
              </p>
            </footer>
          </CardContent>
        </Card>
      )}

      <AiDisclaimer />
    </div>
  );
}

function ContactRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border bg-muted/30 p-3 text-sm">
      <div className="mt-0.5 text-brand">{icon}</div>
      <div className="min-w-0 break-words">{label}</div>
    </div>
  );
}
