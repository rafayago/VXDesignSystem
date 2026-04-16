import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardTitle,
  Menu,
} from "@vortx/ui";
import {
  BarProgressRow,
  SectionHeader,
  StatCard,
} from "../../components/admin-widgets";

const leads = [
  {
    id: "L-201",
    name: "Mina Torres",
    company: "Northgrid",
    status: "Qualified",
    source: "Website",
  },
  {
    id: "L-202",
    name: "Edwin Cole",
    company: "Nexora",
    status: "Proposal",
    source: "Referral",
  },
  {
    id: "L-203",
    name: "Ira Voss",
    company: "Juno Labs",
    status: "Won",
    source: "Outbound",
  },
  {
    id: "L-204",
    name: "Priya Rao",
    company: "Lumen Ops",
    status: "Contacted",
    source: "Social",
  },
];

const pipeline = [
  { title: "Prospects", amount: "$58k", share: 30 },
  { title: "Qualified", amount: "$84k", share: 45 },
  { title: "Proposal", amount: "$31k", share: 17 },
  { title: "Negotiation", amount: "$15k", share: 8 },
];

export default function CrmDashboardPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionHeader
          title="CRM Dashboard"
          description="Lead funnel, sales velocity, pipeline health, and recent opportunities."
        />
        <div className="flex items-center gap-2">
          <Menu
            label="CRM Actions"
            items={[
              { id: "lead", label: "Add Lead" },
              { id: "campaign", label: "Start Campaign" },
              { id: "export", label: "Export Pipeline" },
            ]}
          />
          <Button>New Opportunity</Button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Open Deals"
          value="124"
          delta="+16 this week"
          tone="up"
        />
        <StatCard
          label="Win Rate"
          value="34%"
          delta="+3.2% this quarter"
          tone="up"
        />
        <StatCard
          label="Avg. Cycle"
          value="18 days"
          delta="-2 days faster"
          tone="down"
        />
        <StatCard
          label="Forecast"
          value="$188k"
          delta="+9.1% vs target"
          tone="up"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card className="p-4">
          <CardTitle>Pipeline Distribution</CardTitle>
          <CardDescription>
            Opportunity value across funnel stages.
          </CardDescription>
          <div className="mt-4 space-y-3">
            {pipeline.map((stage) => (
              <div
                key={stage.title}
                className="rounded-lg border border-border bg-background/70 p-3"
              >
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{stage.title}</span>
                  <span className="text-muted-foreground">{stage.amount}</span>
                </div>
                <BarProgressRow
                  label="Share"
                  value={stage.share}
                  barClass="bg-chart-3"
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <CardTitle>Action Items</CardTitle>
          <CardDescription>
            Top activities for account executives.
          </CardDescription>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="rounded-md border border-border bg-background/70 px-3 py-2">
              Follow up with Northgrid after discovery call.
            </li>
            <li className="rounded-md border border-border bg-background/70 px-3 py-2">
              Share pricing matrix with Lumen Ops procurement.
            </li>
            <li className="rounded-md border border-border bg-background/70 px-3 py-2">
              Prepare technical deep dive for Nexora stakeholders.
            </li>
            <li className="rounded-md border border-border bg-background/70 px-3 py-2">
              Re-activate dormant opportunity from last month.
            </li>
          </ul>
        </Card>
      </section>

      <Card className="p-0">
        <div className="border-b border-border p-4">
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>
            Hardcoded lead records with status tags.
          </CardDescription>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Lead</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.id}</p>
                  </td>
                  <td className="px-4 py-3">{lead.company}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {lead.source}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        lead.status === "Won"
                          ? "success"
                          : lead.status === "Proposal"
                            ? "info"
                            : lead.status === "Qualified"
                              ? "warning"
                              : "secondary"
                      }
                    >
                      {lead.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
