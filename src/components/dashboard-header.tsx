import { Bell, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme-provider";
import { useAppState, useHydrated } from "@/lib/business-store";

export function DashboardHeader() {
  const { theme, toggle } = useTheme();
  const [state] = useAppState();
  const hydrated = useHydrated();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const businessName = hydrated ? state.profile.businessName : "";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/70 px-4 backdrop-blur-xl md:px-6">
      <SidebarTrigger className="shrink-0" />
      <div className="hidden min-w-0 md:block">
        <div className="truncate text-sm font-semibold">{businessName || "\u00a0"}</div>
        <div className="text-xs text-muted-foreground">
          {hydrated
            ? now.toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              }) +
              " · " +
              now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
            : ""}
        </div>
      </div>
      <div className="relative ml-auto hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search everything..."
          className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background"
        />
      </div>
      <div className="ml-auto flex items-center gap-1 md:ml-0">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}
