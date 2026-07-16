// Local persistence for BIZbuilder AI — no auth. Data lives in localStorage.
import { useEffect, useState, useSyncExternalStore } from "react";

export type BusinessProfile = {
  businessName: string;
  ownerName: string;
  category: string;
  industry: string;
  description: string;
  products: string;
  services: string;
  address: string;
  province: string;
  city: string;
  phone: string;
  email: string;
  hours: string;
  website: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  linkedin: string;
  slug: string;
  // AI-generated
  aboutUs?: string;
  mission?: string;
  vision?: string;
  overview?: string;
  slogan?: string;
  seoKeywords?: string;
  summary?: string;
};

export type MarketingItem = {
  id: string;
  type: string;
  tone: string;
  content: string;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type AppState = {
  profile: BusinessProfile;
  websiteStatus: "draft" | "published";
  websiteGeneratedAt?: string;
  websiteUpdatedAt?: string;
  marketing: MarketingItem[];
  advisorNotes?: string;
  assistantMessages: ChatMessage[];
};

const KEY = "bizbuilder.state.v1";

export const DEFAULT_PROFILE: BusinessProfile = {
  businessName: "Sunrise Coffee Co.",
  ownerName: "Amara Dlamini",
  category: "Restaurant & Cafe",
  industry: "Food & Beverage",
  description:
    "A warm neighborhood cafe serving specialty coffee, fresh pastries, and light lunches sourced from local suppliers.",
  products: "Espresso drinks, cold brew, pastries, sandwiches, salads",
  services: "Dine-in, takeaway, catering for small events",
  address: "24 Long Street",
  province: "Western Cape",
  city: "Cape Town",
  phone: "+27 21 555 0134",
  email: "hello@sunrisecoffee.co.za",
  hours: "Mon–Fri 7:00–17:00, Sat–Sun 8:00–15:00",
  website: "sunrisecoffee.co.za",
  facebook: "sunrisecoffeeco",
  instagram: "sunrise.coffee",
  whatsapp: "+27215550134",
  linkedin: "",
  slug: "sunrise-coffee",
};

export const DEFAULT_STATE: AppState = {
  profile: DEFAULT_PROFILE,
  websiteStatus: "draft",
  marketing: [],
  assistantMessages: [],
};

let cached: AppState | null = null;
const listeners = new Set<() => void>();

function load(): AppState {
  if (cached) return cached;
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      cached = DEFAULT_STATE;
      return cached;
    }
    cached = { ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<AppState>) };
    return cached;
  } catch {
    cached = DEFAULT_STATE;
    return cached;
  }
}

function save(next: AppState) {
  cached = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}

export function updateState(update: (s: AppState) => AppState) {
  save(update(load()));
}

export function useAppState(): [AppState, (u: (s: AppState) => AppState) => void] {
  const state = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => load(),
    () => DEFAULT_STATE,
  );
  return [state, updateState];
}

export function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}

export function computeCompletion(p: BusinessProfile): number {
  const fields: (keyof BusinessProfile)[] = [
    "businessName",
    "ownerName",
    "category",
    "description",
    "products",
    "services",
    "address",
    "city",
    "phone",
    "email",
    "hours",
    "aboutUs",
    "mission",
    "slogan",
  ];
  const filled = fields.filter((f) => (p[f] ?? "").toString().trim().length > 0).length;
  return Math.round((filled / fields.length) * 100);
}

export function businessUrl(slug: string): string {
  return `bizbuilder.app/${slug || "my-business"}`;
}
