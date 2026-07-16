import { createFileRoute } from "@tanstack/react-router";
import { Settings, Moon, Sun, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { useTheme } from "@/components/theme-provider";
import { DEFAULT_STATE, updateState } from "@/lib/business-store";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        icon={<Settings className="h-5 w-5" />}
        title="Settings"
        description="Preferences and workspace management."
      />

      <div className="grid gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Appearance</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <div>
                <Label className="text-sm font-medium">Dark mode</Label>
                <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
              </div>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Responsible AI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>BIZbuilder AI generates content to help you move faster, but you're always in control:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>All AI-generated content is clearly labeled with an AI badge.</li>
              <li>You can edit any generated content before saving or publishing.</li>
              <li>Never publish AI content without reviewing it for accuracy.</li>
              <li>Avoid using AI to make claims you can't back up.</li>
              <li>AI recommendations are suggestions, not guarantees.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Data</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Label className="text-sm font-medium">Reset workspace</Label>
              <p className="text-xs text-muted-foreground">
                Clear your business profile, marketing content, and chat history.
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("Reset all workspace data?")) {
                  updateState(() => DEFAULT_STATE);
                  toast.success("Workspace reset");
                }
              }}
            >
              <Trash2 /> Reset
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
