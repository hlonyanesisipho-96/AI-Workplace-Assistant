import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Download } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { useAppState } from "@/lib/business-store";

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });

const visitors = [
  { d: "Mon", v: 120 }, { d: "Tue", v: 168 }, { d: "Wed", v: 143 },
  { d: "Thu", v: 210 }, { d: "Fri", v: 289 }, { d: "Sat", v: 344 }, { d: "Sun", v: 298 },
];
const sources = [
  { name: "Google", value: 42 },
  { name: "Facebook", value: 21 },
  { name: "Instagram", value: 18 },
  { name: "WhatsApp", value: 10 },
  { name: "Direct", value: 6 },
  { name: "Referral", value: 3 },
];
const engagement = [
  { c: "Calls", v: 48 }, { c: "Emails", v: 22 },
  { c: "WhatsApp", v: 91 }, { c: "Form", v: 34 }, { c: "Shares", v: 17 },
];
const COLORS = ["#2563EB", "#7C3AED", "#22C55E", "#F59E0B", "#06B6D4", "#EC4899"];

function AnalyticsPage() {
  const [state] = useAppState();

  const kpis = [
    { label: "Total Visitors", value: "1,284", trend: "+12%" },
    { label: "Website Views", value: "3,481", trend: "+8%" },
    { label: "QR Scans", value: "342", trend: "+23%" },
    { label: "Link Clicks", value: "982", trend: "+15%" },
    { label: "Enquiries", value: "64", trend: "+9%" },
    { label: "WhatsApp Clicks", value: "213", trend: "+31%" },
    { label: "FB Engagement", value: "1,102", trend: "+5%" },
    { label: "IG Engagement", value: "1,839", trend: "+18%" },
  ];

  const exportCsv = () => {
    const rows = [
      ["Metric", "Value"],
      ...kpis.map((k) => [k.label, k.value]),
      [],
      ["Day", "Visitors"],
      ...visitors.map((v) => [v.d, v.v.toString()]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bizbuilder-analytics.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const performance = [
    { label: "Pages Generated", value: 9 },
    { label: "AI Content Created", value: state.marketing.length },
    { label: "Marketing Posts", value: state.marketing.length },
    { label: "QR Codes Generated", value: 1 },
    { label: "Business Links", value: 1 },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        icon={<BarChart3 className="h-5 w-5" />}
        title="Analytics"
        description="Track visitors, engagement, and how customers are finding you."
        actions={
          <Button variant="outline" onClick={exportCsv}>
            <Download /> Export CSV
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {k.label}
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight">{k.value}</div>
              <div className="text-xs font-medium text-success">{k.trend}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Visitor trends (last 7 days)</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitors}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="d" stroke="currentColor" fontSize={12} />
                <YAxis stroke="currentColor" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Line type="monotone" dataKey="v" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Traffic sources</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sources} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {sources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Customer engagement</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagement}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="c" stroke="currentColor" fontSize={12} />
                <YAxis stroke="currentColor" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="v" radius={[8, 8, 0, 0]}>
                  {engagement.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Website performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {performance.map((p) => (
              <div key={p.label} className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2 text-sm">
                <span className="text-muted-foreground">{p.label}</span>
                <span className="font-semibold">{p.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
