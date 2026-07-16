import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Download, Megaphone, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader, AiDisclaimer } from "@/components/page-header";
import { useAppState } from "@/lib/business-store";
import { generateMarketing } from "@/lib/ai.functions";

export const Route = createFileRoute("/marketing")({ component: MarketingPage });

const TYPES = [
  "Facebook Post",
  "Instagram Caption",
  "WhatsApp Promotion",
  "Promotional Email",
  "Product Description",
  "Flyer Content",
  "Business Announcement",
  "Google Business Description",
];

const TONES = ["Professional", "Friendly", "Casual", "Luxury", "Promotional"];

function MarketingPage() {
  const [state, setState] = useAppState();
  const [type, setType] = useState(TYPES[0]);
  const [tone, setTone] = useState(TONES[1]);
  const [extra, setExtra] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const out = await generateMarketing({
        data: {
          type,
          tone,
          businessName: state.profile.businessName,
          category: state.profile.category,
          description: state.profile.description,
          extra,
        },
      });
      setContent(out);
      setState((s) => ({
        ...s,
        marketing: [
          {
            id: crypto.randomUUID(),
            type,
            tone,
            content: out,
            createdAt: new Date().toISOString(),
          },
          ...s.marketing,
        ].slice(0, 50),
      }));
      toast.success("Content generated");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const copy = (t: string) => {
    navigator.clipboard.writeText(t);
    toast.success("Copied");
  };

  const remove = (id: string) => {
    setState((s) => ({ ...s, marketing: s.marketing.filter((m) => m.id !== id) }));
  };

  const exportAll = () => {
    const blob = new Blob(
      [
        state.marketing
          .map((m) => `# ${m.type} (${m.tone}) — ${new Date(m.createdAt).toLocaleString()}\n\n${m.content}\n\n---\n`)
          .join("\n"),
      ],
      { type: "text/markdown" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marketing-content.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        icon={<Megaphone className="h-5 w-5" />}
        title="Marketing Content Generator"
        description="AI-crafted posts, emails, and product descriptions in your chosen tone."
        actions={
          <Button onClick={exportAll} variant="outline" disabled={state.marketing.length === 0}>
            <Download /> Export
          </Button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Create new</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
                Content type
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
                Tone
              </Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
                Extra instructions (optional)
              </Label>
              <Textarea
                rows={3}
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder="e.g. Announce our new weekend brunch menu, mention live music."
              />
            </div>
            <Button
              onClick={generate}
              disabled={loading}
              className="w-full gradient-brand text-white"
            >
              <Sparkles /> {loading ? "Generating..." : "Generate with AI"}
            </Button>

            {content && (
              <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{type}</Badge>
                  <Button size="sm" variant="ghost" onClick={() => copy(content)}>
                    <Copy /> Copy
                  </Button>
                </div>
                <Textarea
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            )}
            <AiDisclaimer />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Content library</CardTitle>
          </CardHeader>
          <CardContent>
            {state.marketing.length === 0 ? (
              <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                Generated content will appear here.
              </p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {state.marketing.map((m) => (
                  <div key={m.id} className="rounded-lg border bg-card p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{m.type}</Badge>
                        <span className="text-xs text-muted-foreground">{m.tone}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => copy(m.content)}>
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => remove(m.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <p className="whitespace-pre-wrap text-sm">{m.content}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
