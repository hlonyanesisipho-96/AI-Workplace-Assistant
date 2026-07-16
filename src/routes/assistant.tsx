import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, AiBadge } from "@/components/page-header";
import { useAppState, type ChatMessage } from "@/lib/business-store";
import { chatAi } from "@/lib/ai.functions";

export const Route = createFileRoute("/assistant")({ component: AssistantPage });

const SUGGESTIONS = [
  "Rewrite my About Us section to be more engaging",
  "Suggest 5 promotional campaign ideas for this month",
  "Generate 10 frequently asked questions for my business",
  "How can I improve my branding?",
];

function AssistantPage() {
  const [state, setState] = useAppState();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [state.assistantMessages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text };
    const nextMsgs = [...state.assistantMessages, userMsg];
    setState((s) => ({ ...s, assistantMessages: nextMsgs }));
    setInput("");
    setLoading(true);
    try {
      const p = state.profile;
      const ctx = `Business name: ${p.businessName}. Category: ${p.category}. City: ${p.city}. About: ${p.description}. Services: ${p.services}. Products: ${p.products}.`;
      const reply = await chatAi({
        data: {
          mode: "assistant",
          businessContext: ctx,
          messages: nextMsgs.map((m) => ({ role: m.role, content: m.content })),
        },
      });
      setState((s) => ({
        ...s,
        assistantMessages: [
          ...s.assistantMessages,
          { id: crypto.randomUUID(), role: "assistant", content: reply },
        ],
      }));
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => setState((s) => ({ ...s, assistantMessages: [] }));

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col">
      <PageHeader
        icon={<Bot className="h-5 w-5" />}
        title="AI Business Assistant"
        description="Ask anything about growing your business. Powered by AI."
        actions={
          <Button variant="outline" onClick={clear} disabled={state.assistantMessages.length === 0}>
            <Trash2 /> Clear
          </Button>
        }
      />

      <Card className="flex min-h-0 flex-1 flex-col">
        <CardContent className="flex min-h-0 flex-1 flex-col gap-3 p-4">
          <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
            {state.assistantMessages.length === 0 && (
              <div className="grid gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-lg border bg-muted/30 p-3 text-left text-sm transition-colors hover:border-brand/40 hover:bg-brand/5"
                  >
                    <Sparkles className="mb-1 h-4 w-4 text-brand" />
                    {s}
                  </button>
                ))}
              </div>
            )}
            {state.assistantMessages.map((m) => (
              <div
                key={m.id}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-2xl gradient-brand px-4 py-2.5 text-sm text-white shadow"
                      : "max-w-[85%] rounded-2xl border bg-card px-4 py-2.5 text-sm whitespace-pre-wrap"
                  }
                >
                  {m.role === "assistant" && <AiBadge className="mb-1.5" />}
                  {m.role === "assistant" && <div />}
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border bg-card px-4 py-2.5 text-sm text-muted-foreground">
                  Thinking…
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t pt-3"
          >
            <Textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask AI about your business..."
              className="min-h-[44px] resize-none"
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className="gradient-brand text-white"
            >
              <Send />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground">
            <AiBadge className="mr-1" /> AI responses may be inaccurate. Verify important
            decisions independently.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
