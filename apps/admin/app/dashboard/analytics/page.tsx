import { Card, CardDescription, CardTitle, Menu, Select } from "@vortx/ui";
import {
  BarProgressRow,
  MiniBarChart,
  SectionHeader,
  StatCard,
} from "../../components/admin-widgets";

const momentum = [56, 61, 65, 59, 69, 74, 71, 80, 86, 79, 91, 95];

export default function AnalyticsDashboardPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHeader
          title="Analytics Dashboard"
          description="Risk lens, quality trends, manager queues, and priority-driven actions."
        />
        <div className="flex items-center gap-2">
          <Select
            aria-label="View mode"
            className="w-44"
            options={[
              { value: "risk", label: "Risk View" },
              { value: "quality", label: "Quality View" },
              { value: "momentum", label: "Momentum" },
            ]}
            defaultValue="risk"
          />
          <Menu
            label="Filters"
            items={[
              { id: "enterprise", label: "Enterprise only" },
              { id: "stalled", label: "Stalled deals" },
              { id: "renewals", label: "Include renewals" },
            ]}
          />
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Coverage"
          value="84%"
          delta="+6% this month"
          tone="up"
        />
        <StatCard
          label="Forecast Confidence"
          value="71%"
          delta="+4.3 points"
          tone="up"
        />
        <StatCard
          label="At-Risk Deals"
          value="28"
          delta="-5 deals"
          tone="down"
        />
        <StatCard
          label="Manager Queue"
          value="14"
          delta="+2 unresolved"
          tone="neutral"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="p-4">
          <CardTitle>Momentum Index</CardTitle>
          <CardDescription>
            Weighted momentum trend over the selected period.
          </CardDescription>
          <MiniBarChart values={momentum} colorClass="bg-chart-1" />
        </Card>

        <Card className="p-4">
          <CardTitle>Risk Buckets</CardTitle>
          <CardDescription>
            Deal quality distribution by confidence bands.
          </CardDescription>
          <div className="mt-4 space-y-3">
            <BarProgressRow label="Low Risk" value={46} barClass="bg-success" />
            <BarProgressRow label="Moderate" value={31} barClass="bg-warning" />
            <BarProgressRow
              label="High Risk"
              value={23}
              barClass="bg-destructive"
            />
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4 lg:col-span-2">
          <CardTitle>Manager Queue</CardTitle>
          <CardDescription>
            Deals requiring manual intervention and coaching.
          </CardDescription>
          <div className="mt-4 space-y-2 text-sm">
            <div className="rounded-md border border-border bg-background/70 px-3 py-2">
              Nexora expansion: pricing objection unresolved for 11 days.
            </div>
            <div className="rounded-md border border-border bg-background/70 px-3 py-2">
              Verdin renewal: legal review exceeded SLA by 3 days.
            </div>
            <div className="rounded-md border border-border bg-background/70 px-3 py-2">
              Arclane pilot: security questionnaire pending stakeholder input.
            </div>
            <div className="rounded-md border border-border bg-background/70 px-3 py-2">
              Opsline rollout: onboarding milestone missed by implementation
              team.
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <CardTitle>Action Ledger</CardTitle>
          <CardDescription>
            Immediate follow-ups for analytics owners.
          </CardDescription>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="rounded-md border border-border bg-background/70 px-3 py-2">
              Re-forecast top 10 deals for monthly board review.
            </li>
            <li className="rounded-md border border-border bg-background/70 px-3 py-2">
              Audit stale opportunities and update close dates.
            </li>
            <li className="rounded-md border border-border bg-background/70 px-3 py-2">
              Review regional conversion anomalies with sales ops.
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
