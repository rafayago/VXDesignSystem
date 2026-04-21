"use client";

import {
  Badge,
  Card,
  CardDescription,
  CardTitle,
  TabsList,
  TabsPanel,
  TabsRoot,
  TabsTrigger,
} from "@vortx/ui";
import {
  MiniBarChart,
  SectionHeader,
  StatCard,
} from "../../components/admin-widgets";

const income = [84, 92, 88, 101, 95, 110, 124, 117, 132, 126, 139, 148];
const spending = [63, 69, 72, 66, 74, 79, 81, 76, 84, 88, 93, 97];

const payments = [
  { name: "Cloud Hosting", due: "Apr 19", amount: "$1,240", state: "Upcoming" },
  { name: "Office Lease", due: "Apr 24", amount: "$4,800", state: "Scheduled" },
  { name: "Insurance", due: "May 01", amount: "$980", state: "Upcoming" },
  { name: "Payroll", due: "May 03", amount: "$42,100", state: "Critical" },
];

export default function FinanceDashboardPage() {
  return (
    <div className="space-y-5">
      <SectionHeader
        title="Finance Dashboard"
        description="Cash flow, spending reliability, and upcoming payment commitments."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Net Worth"
          value="$1.48M"
          delta="+7.6% since last quarter"
          tone="up"
        />
        <StatCard
          label="Cash Reserve"
          value="$243k"
          delta="+3.1% over 30 days"
          tone="up"
        />
        <StatCard
          label="Savings Rate"
          value="22%"
          delta="+1.4 points this month"
          tone="up"
        />
        <StatCard
          label="Expense Ratio"
          value="67%"
          delta="-2.2 points this month"
          tone="down"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="p-4">
          <CardTitle>Cash Flow Snapshot</CardTitle>
          <CardDescription>
            Income versus spending trends over 12 periods.
          </CardDescription>
          <TabsRoot defaultValue="income">
            <TabsList>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="spending">Spending</TabsTrigger>
            </TabsList>
            <TabsPanel value="income" className="mt-3">
              <MiniBarChart values={income} colorClass="bg-chart-2" />
            </TabsPanel>
            <TabsPanel value="spending" className="mt-3">
              <MiniBarChart values={spending} colorClass="bg-chart-5" />
            </TabsPanel>
          </TabsRoot>
        </Card>

        <Card className="p-4">
          <CardTitle>Allocation</CardTitle>
          <CardDescription>Current monthly budget composition.</CardDescription>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-lg border border-border bg-background/70 p-3">
              <p className="font-medium">Operations</p>
              <p className="text-muted-foreground">$28,700 · 38%</p>
            </div>
            <div className="rounded-lg border border-border bg-background/70 p-3">
              <p className="font-medium">People</p>
              <p className="text-muted-foreground">$31,200 · 41%</p>
            </div>
            <div className="rounded-lg border border-border bg-background/70 p-3">
              <p className="font-medium">R&D</p>
              <p className="text-muted-foreground">$11,900 · 16%</p>
            </div>
            <div className="rounded-lg border border-border bg-background/70 p-3">
              <p className="font-medium">Other</p>
              <p className="text-muted-foreground">$3,600 · 5%</p>
            </div>
          </div>
        </Card>
      </section>

      <Card className="p-0">
        <div className="border-b border-border p-4">
          <CardTitle>Upcoming Payments</CardTitle>
          <CardDescription>
            Static reminders for financial planning.
          </CardDescription>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Due Date</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">State</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.name} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{payment.name}</td>
                  <td className="px-4 py-3">{payment.due}</td>
                  <td className="px-4 py-3">{payment.amount}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        payment.state === "Critical"
                          ? "destructive"
                          : payment.state === "Scheduled"
                            ? "info"
                            : "warning"
                      }
                    >
                      {payment.state}
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
