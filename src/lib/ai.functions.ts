import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3-flash-preview";

type Msg = { role: "system" | "user" | "assistant"; content: string };

async function callGateway(messages: Msg[]): Promise<string> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
    },
    body: JSON.stringify({ model: MODEL, messages }),
  });
  if (!res.ok) {
    const text = await res.text();
    if (res.status === 429) throw new Error("Rate limit reached. Please try again shortly.");
    if (res.status === 402)
      throw new Error("AI credits exhausted. Add credits in your workspace billing.");
    throw new Error(`AI request failed (${res.status}): ${text.slice(0, 200)}`);
  }
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

const ProfileInput = z.object({
  businessName: z.string(),
  category: z.string().optional().default(""),
  industry: z.string().optional().default(""),
  description: z.string().optional().default(""),
  products: z.string().optional().default(""),
  services: z.string().optional().default(""),
  city: z.string().optional().default(""),
});

export const generateProfileCopy = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => ProfileInput.parse(v))
  .handler(async ({ data }) => {
    const system =
      "You are a senior brand copywriter for small local businesses. Write clear, warm, professional copy. Never invent specific facts (awards, dates, customer counts). Return STRICT JSON only, no prose, no code fences.";
    const user = `Create marketing copy for this business. Return JSON with keys: aboutUs (80-120 words), mission (1-2 sentences), vision (1-2 sentences), overview (60-90 words), slogan (max 8 words), seoKeywords (comma-separated, 10-15 keywords), summary (2-3 sentences).

Business:
- Name: ${data.businessName}
- Category: ${data.category}
- Industry: ${data.industry}
- Description: ${data.description}
- Products: ${data.products}
- Services: ${data.services}
- City: ${data.city}`;
    const raw = await callGateway([
      { role: "system", content: system },
      { role: "user", content: user },
    ]);
    // Strip code fences if present
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
    try {
      return JSON.parse(cleaned) as Record<string, string>;
    } catch {
      // Try to extract JSON block
      const m = cleaned.match(/\{[\s\S]*\}/);
      if (m) return JSON.parse(m[0]) as Record<string, string>;
      throw new Error("AI returned invalid JSON. Try again.");
    }
  });

const MarketingInput = z.object({
  type: z.string(),
  tone: z.string(),
  businessName: z.string(),
  category: z.string().optional().default(""),
  description: z.string().optional().default(""),
  extra: z.string().optional().default(""),
});

export const generateMarketing = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => MarketingInput.parse(v))
  .handler(async ({ data }) => {
    const system = `You are an expert social media and marketing copywriter for small businesses. Write in a ${data.tone.toLowerCase()} tone. Be concrete, engaging, and honest. Do not fabricate facts, prices, or claims. Include a call to action when appropriate.`;
    const user = `Write a ${data.type} for this business.

Business: ${data.businessName}
Category: ${data.category}
About: ${data.description}
${data.extra ? "Extra instructions: " + data.extra : ""}

Return only the finished content, no explanation.`;
    return await callGateway([
      { role: "system", content: system },
      { role: "user", content: user },
    ]);
  });

const ChatInput = z.object({
  messages: z.array(
    z.object({ role: z.enum(["user", "assistant"]), content: z.string() }),
  ),
  businessContext: z.string().optional().default(""),
  mode: z.enum(["assistant", "advisor"]).default("assistant"),
});

export const chatAi = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => ChatInput.parse(v))
  .handler(async ({ data }) => {
    const systems: Record<string, string> = {
      assistant: `You are BIZbuilder AI Assistant, a friendly business helper for small local businesses. Give clear, actionable answers. Help with copywriting, branding, FAQs, ideas, pricing suggestions, and campaigns. Keep responses concise (under 250 words) unless asked. Use markdown lists when helpful. Always remind users to verify AI suggestions before publishing.`,
      advisor: `You are BIZbuilder AI Business Advisor. Analyze the business context and give strategic, prioritized recommendations. Cover: marketing strategy, SEO, branding, customer engagement, growth opportunities, expansion, and sales. Use clear headings and bullet points. Keep advice practical and grounded — do not invent specific numbers or guarantees.`,
    };
    const messages: Msg[] = [
      { role: "system", content: systems[data.mode] },
    ];
    if (data.businessContext) {
      messages.push({
        role: "system",
        content: `Business context:\n${data.businessContext}`,
      });
    }
    for (const m of data.messages) messages.push(m);
    return await callGateway(messages);
  });

const AdvisorInput = z.object({ businessContext: z.string() });

export const generateAdvisorReport = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => AdvisorInput.parse(v))
  .handler(async ({ data }) => {
    return await callGateway([
      {
        role: "system",
        content: `You are BIZbuilder AI Business Advisor. Produce a structured business growth report with these sections (as markdown H3 headings): Marketing Strategies, SEO Improvements, Branding Tips, Customer Engagement Ideas, Growth Opportunities, Business Expansion Suggestions, Sales Recommendations. Under each heading, give 3-5 concise bullet points. Be practical and honest — never invent specific numbers or guarantees.`,
      },
      { role: "user", content: `Business context:\n${data.businessContext}` },
    ]);
  });
