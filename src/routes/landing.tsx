import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Menu,
  X,
  Sun,
  Moon,
  Rocket,
  BookOpen,
  Building2,
  Globe,
  Megaphone,
  Link2,
  QrCode,
  BarChart3,
  Bot,
  TrendingUp,
  Clock,
  DollarSign,
  Eye,
  Zap,
  Smartphone,
  Star,
  Check,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "BIZbuilder AI — Get Your Business Digital Today" },
      {
        name: "description",
        content:
          "Build a professional online presence in minutes with AI-powered websites, marketing content, links, QR codes, and business insights for local businesses.",
      },
      { property: "og:title", content: "BIZbuilder AI — Get Your Business Digital Today" },
      {
        property: "og:description",
        content:
          "AI-powered tools designed for local businesses. Websites, marketing content, links, QR codes, analytics — no coding required.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <Hero />
      <About />
      <WhyChoose />
      <Features />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <AnalyticsPreview />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

/* ---------------- Nav ---------------- */

function SiteNav() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#home" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-base font-bold tracking-tight">BIZbuilder AI</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/" className="hidden md:inline-flex">
            <Button className="gradient-brand text-white shadow-sm hover:opacity-95">
              Get Started
            </Button>
          </Link>
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <Link to="/" onClick={() => setOpen(false)} className="mt-2">
              <Button className="w-full gradient-brand text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40 [background:radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--brand)_25%,transparent),transparent)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--brand)]" />
            AI-Powered SaaS for Local Business
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Build Your Business Online with{" "}
            <span className="gradient-text">AI</span>
          </h1>
          <p className="mt-3 text-xl font-semibold text-[color:var(--brand)]">
            Get Your Business Digital Today
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Create a professional online presence in minutes with AI-powered tools designed
            specifically for local businesses. Generate websites, marketing content, business
            links, QR codes, and valuable business insights—all from one powerful platform.
          </p>
          <p className="mt-4 text-sm font-medium text-foreground">
            No coding. No technical skills. Just results.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/">
              <Button size="lg" className="gradient-brand text-white shadow-md hover:opacity-95">
                <Rocket className="mr-2 h-4 w-4" /> Start Building
              </Button>
            </Link>
            <a href="#about">
              <Button size="lg" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" /> Learn More
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-2xl border border-border bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <div className="ml-3 text-xs text-muted-foreground">bizbuilder.ai/dashboard</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Visitors", value: "2,481" },
                { label: "QR Scans", value: "342" },
                { label: "Enquiries", value: "89" },
              ].map((k) => (
                <div key={k.label} className="rounded-lg border border-border bg-muted/40 p-3">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {k.label}
                  </div>
                  <div className="mt-1 text-lg font-bold gradient-text">{k.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-xs font-medium">Growth this month</div>
                <div className="text-xs font-semibold text-[color:var(--brand)]">+38%</div>
              </div>
              <div className="flex items-end gap-1.5 h-24">
                {[35, 55, 42, 68, 60, 82, 74, 95, 88, 100, 92, 110].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t gradient-brand opacity-80"
                    style={{ height: `${h * 0.8}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */

function About() {
  return (
    <section id="about" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6 md:py-24">
        <SectionEyebrow>About BIZbuilder AI</SectionEyebrow>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Empowering Local Businesses Through Artificial Intelligence
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          BIZbuilder AI is a modern digital platform designed to help entrepreneurs, startups, and
          small businesses establish a strong online presence quickly and affordably.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Whether you're running a salon, restaurant, retail store, consulting business, or
          freelance service, BIZbuilder AI gives you the tools you need to build your brand,
          attract customers, and grow your business online.
        </p>
        <div className="mt-8 inline-block rounded-xl border border-[color:var(--brand)]/30 bg-[color:var(--brand)]/5 px-6 py-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--brand)]">
            Our Mission
          </div>
          <div className="mt-1 text-lg font-semibold">
            Make digital transformation accessible to every business.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Choose ---------------- */

function WhyChoose() {
  const items = [
    "Create a professional business profile",
    "Generate a modern business website",
    "Create AI-powered marketing content",
    "Generate business links and QR codes",
    "Track your business performance",
    "Receive intelligent business recommendations",
    "Manage everything from one dashboard",
  ];
  return (
    <section id="why" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <div className="text-center">
          <SectionEyebrow>Why Choose BIZbuilder AI</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Everything You Need to Grow Your Business
          </h2>
          <p className="mt-4 text-muted-foreground">
            Building a professional online presence shouldn't be complicated or expensive. With
            BIZbuilder AI, you can:
          </p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <div
              key={t}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full gradient-brand text-white">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */

const FEATURES = [
  {
    icon: Building2,
    title: "AI Business Profile Generator",
    tag: "Create a complete business profile in seconds.",
    body: "Our AI helps you generate:",
    items: [
      "Business Descriptions",
      "About Us Content",
      "Mission Statements",
      "Vision Statements",
      "Business Slogans",
      "SEO Keywords",
    ],
    footer: "Present your business professionally and attract more customers.",
    href: "/profile",
  },
  {
    icon: Globe,
    title: "AI Website Builder",
    tag: "Launch a professional business website without hiring a developer.",
    body: "Your website can include:",
    items: [
      "Home Page",
      "About Us",
      "Services",
      "Products",
      "Gallery",
      "Testimonials",
      "Contact Information",
    ],
    footer: "Fully responsive and optimized for desktop and mobile devices.",
    href: "/website",
  },
  {
    icon: Megaphone,
    title: "AI Marketing Content Generator",
    tag: "Create professional marketing content instantly.",
    body: "Generate:",
    items: [
      "Facebook Posts",
      "Instagram Captions",
      "WhatsApp Promotions",
      "Promotional Emails",
      "Product Descriptions",
      "Business Announcements",
    ],
    footer: "Save time while keeping your business active online.",
    href: "/marketing",
  },
  {
    icon: Link2,
    title: "Business Link Generator",
    tag: "Create a unique shareable business link that customers can access from anywhere.",
    body: "Perfect for:",
    items: [
      "Social Media Profiles",
      "WhatsApp Business",
      "Business Cards",
      "Flyers",
      "Email Signatures",
    ],
    footer: "Share your business with a single click.",
    href: "/links",
  },
  {
    icon: QrCode,
    title: "QR Code Generator",
    tag: "Generate QR codes that connect customers directly to your business.",
    body: "Use QR codes on:",
    items: ["Posters", "Packaging", "Menus", "Business Cards", "Promotional Material"],
    footer: "Make it easier for customers to find you online.",
    href: "/qr",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    tag: "Track your business performance with powerful analytics.",
    body: "Monitor:",
    items: [
      "Website Visitors",
      "Customer Enquiries",
      "QR Code Scans",
      "Link Clicks",
      "Marketing Performance",
      "Business Growth Trends",
    ],
    footer: "Turn data into smarter business decisions.",
    href: "/analytics",
  },
  {
    icon: Bot,
    title: "AI Business Assistant",
    tag: "Your intelligent business companion.",
    body: "Ask questions about:",
    items: [
      "Marketing",
      "Branding",
      "Pricing",
      "Customer Engagement",
      "Business Growth",
    ],
    footer: "Receive instant AI-powered assistance whenever you need it.",
    href: "/assistant",
  },
  {
    icon: TrendingUp,
    title: "AI Business Advisor",
    tag: "Receive personalized recommendations to improve your business.",
    body: "Our AI analyzes your business data and provides insights to help you:",
    items: [
      "Increase visibility",
      "Improve customer engagement",
      "Enhance branding",
      "Boost sales",
      "Grow faster",
    ],
    footer: "",
    href: "/advisor",
  },
];

function Features() {
  return (
    <section id="features" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <div className="text-center">
          <SectionEyebrow>Features</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Everything, powered by AI
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card
              key={f.title}
              className="group flex flex-col p-6 transition hover:border-[color:var(--brand)]/50 hover:shadow-lg"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl gradient-brand text-white shadow-sm">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.tag}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-foreground/80">
                {f.body}
              </p>
              <ul className="mt-2 space-y-1.5">
                {f.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm">
                    <Check className="h-3.5 w-3.5 text-[color:var(--brand)]" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              {f.footer && (
                <p className="mt-4 text-sm text-muted-foreground">{f.footer}</p>
              )}
              <Link
                to={f.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--brand)] transition group-hover:gap-2"
              >
                Try it <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How It Works ---------------- */

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Create Your Business Profile",
      body: "Tell us about your business, products, and services.",
    },
    {
      n: "02",
      title: "Let AI Do the Work",
      body: "Generate professional content, websites, and marketing materials instantly.",
    },
    {
      n: "03",
      title: "Customize and Preview",
      body: "Review your content and make any changes you like.",
    },
    {
      n: "04",
      title: "Share and Grow",
      body: "Publish your business online and start attracting more customers.",
    },
  ];
  return (
    <section id="how" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="text-center">
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Get Started in Four Simple Steps
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="text-3xl font-extrabold gradient-text">{s.n}</div>
                <h3 className="mt-3 text-base font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[color:var(--brand)] md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Benefits ---------------- */

function Benefits() {
  const items = [
    {
      icon: Clock,
      title: "Save Time",
      body: "Automate repetitive tasks and focus on growing your business.",
    },
    {
      icon: DollarSign,
      title: "Reduce Costs",
      body: "No need to hire expensive web developers or marketing agencies.",
    },
    {
      icon: Eye,
      title: "Increase Visibility",
      body: "Build a professional online presence that helps customers find you.",
    },
    {
      icon: Zap,
      title: "Grow Faster",
      body: "Use AI-powered insights and analytics to make better business decisions.",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      body: "Manage your business from anywhere using your phone, tablet, or computer.",
    },
  ];
  return (
    <section id="benefits" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="text-center">
          <SectionEyebrow>Benefits</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Why Businesses Love BIZbuilder AI
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((b) => (
            <Card key={b.title} className="p-6">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg gradient-brand text-white">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

function Testimonials() {
  const quotes = [
    {
      q: "BIZbuilder AI helped me create a professional website for my bakery in less than an hour. The process was simple and the results were amazing.",
      who: "Sarah M.",
      role: "Bakery Owner",
    },
    {
      q: "I struggled with social media marketing until I started using BIZbuilder AI. Now I generate content in minutes.",
      who: "James T.",
      role: "Auto Repair Business",
    },
    {
      q: "The analytics dashboard helps me understand my customers and improve my business every day.",
      who: "Nomsa K.",
      role: "Salon Owner",
    },
  ];
  return (
    <section id="testimonials" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="text-center">
          <SectionEyebrow>Testimonials</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            What Our Users Say
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {quotes.map((t) => (
            <Card key={t.who} className="p-6">
              <div className="flex gap-0.5 text-[color:var(--brand)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-base italic leading-relaxed">"{t.q}"</p>
              <div className="mt-5 border-t border-border pt-4">
                <div className="text-sm font-semibold">{t.who}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Analytics Preview ---------------- */

const trafficData = [
  { m: "Jan", v: 120 },
  { m: "Feb", v: 210 },
  { m: "Mar", v: 260 },
  { m: "Apr", v: 340 },
  { m: "May", v: 420 },
  { m: "Jun", v: 560 },
  { m: "Jul", v: 720 },
];

const sourceData = [
  { name: "Search", value: 42 },
  { name: "Social", value: 28 },
  { name: "QR / Link", value: 20 },
  { name: "Direct", value: 10 },
];

function AnalyticsPreview() {
  const chips = [
    { icon: "📈", label: "Website Traffic" },
    { icon: "📱", label: "QR Code Performance" },
    { icon: "🔗", label: "Link Clicks" },
    { icon: "📊", label: "Customer Engagement" },
    { icon: "💬", label: "Enquiries" },
    { icon: "🚀", label: "Business Growth" },
  ];
  const brand = "var(--brand)";
  const brand2 = "var(--brand-2)";
  const colors = [brand, brand2, "oklch(0.75 0.14 60)", "oklch(0.55 0.12 40)"];
  return (
    <section id="analytics" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionEyebrow>Analytics</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Make Data-Driven Decisions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Track your business growth through easy-to-understand reports and visual dashboards.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {chips.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm"
                >
                  <span>{c.icon}</span>
                  <span className="font-medium">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <Card className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold">Visitors over time</div>
                <div className="text-xs font-semibold text-[color:var(--brand)]">+42%</div>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trafficData}>
                    <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <RTooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Line type="monotone" dataKey="v" stroke={brand} strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card className="p-5">
              <div className="mb-3 text-sm font-semibold">Traffic sources</div>
              <div className="flex items-center gap-4">
                <div className="h-32 w-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        dataKey="value"
                        innerRadius={30}
                        outerRadius={55}
                        paddingAngle={2}
                      >
                        {sourceData.map((_, i) => (
                          <Cell key={i} fill={colors[i]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-1.5">
                  {sourceData.map((s, i) => (
                    <div key={s.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: colors[i] }}
                        />
                        <span>{s.name}</span>
                      </div>
                      <span className="text-muted-foreground">{s.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA() {
  return (
    <section id="cta" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="relative overflow-hidden rounded-3xl gradient-brand p-10 text-center text-white shadow-xl md:p-16">
          <div className="absolute inset-0 opacity-20 [background:radial-gradient(60%_60%_at_50%_0%,white,transparent)]" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Ready to Grow Your Business?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg">
              Join local businesses that are using Artificial Intelligence to build their digital
              presence and reach more customers.
            </p>
            <div className="mt-6 text-lg font-semibold">Get Started Today</div>
            <p className="mt-1 text-sm text-white/90">
              Build your website. Promote your business. Grow with AI.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/">
                <Button
                  size="lg"
                  className="bg-white text-[color:var(--brand)] hover:bg-white/90"
                >
                  <Rocket className="mr-2 h-4 w-4" /> Start Building
                </Button>
              </Link>
              <a href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/60 bg-transparent text-white hover:bg-white/10"
                >
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-base font-bold">BIZbuilder AI</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Helping Local Businesses Build Their Digital Presence with Artificial Intelligence.
            </p>
            <div className="mt-4 flex gap-2">
              {[Facebook, Instagram, Linkedin, Twitter].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground"
                  aria-label="Social"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol
            title="Quick Links"
            items={[
              { label: "Home", href: "#home" },
              { label: "Features", href: "#features" },
              { label: "Dashboard", to: "/" },
              { label: "Analytics", to: "/analytics" },
              { label: "Support", to: "/help" },
              { label: "Contact", href: "#contact" },
            ]}
          />
          <FooterCol
            title="Resources"
            items={[
              { label: "Business Guides", href: "#" },
              { label: "AI Resources", href: "#" },
              { label: "Marketing Tips", href: "#" },
              { label: "FAQs", to: "/help" },
            ]}
          />
          <div>
            <div className="text-sm font-bold">Contact</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[color:var(--brand)]" /> +27 65 957 3667
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[color:var(--brand)]" /> support@bizbuilder.ai
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[color:var(--brand)]" /> South Africa
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center md:flex-row md:text-left">
          <div className="text-sm font-medium">
            BIZbuilder AI — Get Your Business Digital Today.
          </div>
          <div className="text-xs text-muted-foreground">
            © 2026 BIZbuilder AI. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href?: string; to?: string }[];
}) {
  return (
    <div>
      <div className="text-sm font-bold">{title}</div>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) =>
          it.to ? (
            <li key={it.label}>
              <Link
                to={it.to}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                {it.label}
              </Link>
            </li>
          ) : (
            <li key={it.label}>
              <a
                href={it.href}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                {it.label}
              </a>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

/* ---------------- Shared ---------------- */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-[color:var(--brand)]/30 bg-[color:var(--brand)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--brand)]">
      {children}
    </span>
  );
}
