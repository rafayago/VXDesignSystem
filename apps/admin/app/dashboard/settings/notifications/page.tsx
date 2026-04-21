import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Switch,
} from "@vortx/ui";
import { SectionHeader } from "../../../components/admin-widgets";

const rows = [
  { title: "Incident alerts", channel: "Email + In-app", status: "Enabled" },
  { title: "Billing reminders", channel: "Email", status: "Enabled" },
  { title: "Weekly digest", channel: "Email", status: "Paused" },
  { title: "Marketing updates", channel: "In-app", status: "Disabled" },
];

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-5">
      <SectionHeader
        title="Notifications"
        description="Configure how and when you receive notifications."
      />
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Notification Rules</CardTitle>
          <CardDescription>
            Choose what you want to be notified about.
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {rows.map((row) => (
            <div
              key={row.title}
              className="flex items-center justify-between py-3"
            >
              <div>
                <p className="text-sm font-medium">{row.title}</p>
                <p className="text-xs text-muted-foreground">{row.channel}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    row.status === "Enabled"
                      ? "success"
                      : row.status === "Paused"
                        ? "warning"
                        : "secondary"
                  }
                >
                  {row.status}
                </Badge>
                <Switch defaultChecked={row.status === "Enabled"} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
