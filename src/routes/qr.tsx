import { createFileRoute } from "@tanstack/react-router";
import { Download, Printer, QrCode, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { businessUrl, useAppState, useHydrated } from "@/lib/business-store";

export const Route = createFileRoute("/qr")({ component: QrPage });

function QrPage() {
  const [state] = useAppState();
  const hydrated = useHydrated();
  const url = `https://${businessUrl(state.profile.slug)}`;

  const qr = (size: number, fmt: "png" | "svg" = "png") =>
    `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&format=${fmt}&data=${encodeURIComponent(url)}&color=2563EB`;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        icon={<QrCode className="h-5 w-5" />}
        title="QR Code Generator"
        description="Print, share, and download QR codes that open your business page."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your business QR code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center rounded-2xl border bg-white p-8">
            {hydrated && (
              <img src={qr(300)} alt="Business QR code" className="h-64 w-64" />
            )}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Scans open <span className="font-mono">{businessUrl(state.profile.slug)}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild variant="outline">
              <a href={qr(1024, "png")} download="business-qr.png" target="_blank" rel="noreferrer">
                <Download /> PNG
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={qr(1024, "svg")} download="business-qr.svg" target="_blank" rel="noreferrer">
                <Download /> SVG
              </a>
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              <Printer /> Print
            </Button>
            <Button
              className="gradient-brand text-white"
              onClick={() => {
                if (navigator.share) navigator.share({ url });
                else {
                  navigator.clipboard.writeText(url);
                  toast.success("Link copied");
                }
              }}
            >
              <Share2 /> Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
