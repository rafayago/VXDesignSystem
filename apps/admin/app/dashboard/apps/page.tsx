import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardTitle,
  Input,
  Select,
} from "@vortx/ui";
import { SectionHeader } from "../../components/admin-widgets";

const integrations = [
  { name: "Slack", category: "Communication", connected: true },
  { name: "Linear", category: "Productivity", connected: true },
  { name: "Notion", category: "Knowledge", connected: false },
  { name: "HubSpot", category: "CRM", connected: false },
  { name: "Stripe", category: "Payments", connected: true },
  { name: "Sentry", category: "Monitoring", connected: false },
];

export default function AppsPage() {
  return (
    <div className="space-y-5">
      <SectionHeader
        title="Apps"
        description="Integration catalog inspired by admin marketplace screens."
      />

      <Card className="p-4">
        <CardTitle>Filter Integrations</CardTitle>
        <CardDescription>
          Static controls only, no data source binding.
        </CardDescription>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Input placeholder="Search integration" />
          <Select
            aria-label="Type"
            options={[
              { value: "all", label: "All Types" },
              { value: "connected", label: "Connected" },
              { value: "not-connected", label: "Not Connected" },
            ]}
            defaultValue="all"
          />
          <Select
            aria-label="Sort"
            options={[
              { value: "asc", label: "Sort A-Z" },
              { value: "desc", label: "Sort Z-A" },
            ]}
            defaultValue="asc"
          />
        </div>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {integrations.map((app) => (
          <Card key={app.name} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base">{app.name}</CardTitle>
                <CardDescription>{app.category}</CardDescription>
              </div>
              <Badge variant={app.connected ? "success" : "secondary"}>
                {app.connected ? "Connected" : "Available"}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Configure synchronization, access scopes, and fallback behavior
              from this static card.
            </p>
            <div className="mt-4">
              <Button variant={app.connected ? "outline" : "default"}>
                {app.connected ? "Manage" : "Connect"}
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
