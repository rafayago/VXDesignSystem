"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  TabsList,
  TabsPanel,
  TabsRoot,
  TabsTrigger,
} from "@vortx/ui";
import {
  IconActivity,
  IconCreditCard,
  IconCurrencyDollar,
  IconDownload,
  IconUsers,
} from "@tabler/icons-react";
import {
  BarProgressRow,
  MiniBarChart,
  RecentSaleRow,
  SectionHeader,
  StatCard,
} from "../../components/admin-widgets";

const revenue = [31, 14, 30, 48, 47, 28, 9, 30, 31, 30, 31, 48];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    initials: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    initials: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    initials: "IN",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    initials: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    initials: "SD",
  },
];

export default function DefaultDashboardPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Dashboard"
        action={
          <Button>
            <IconDownload className="mr-2 h-4 w-4" />
            Download
          </Button>
        }
      />

      {/* Tabs */}
      <TabsRoot defaultValue="overview">
        <TabsList className="border-b border-border rounded-none bg-transparent p-0 gap-0">
          {["overview", "analytics", "reports", "notifications"].map((t) => (
            <TabsTrigger
              key={t}
              value={t}
              className="rounded-none border-b-2 border-transparent px-4 py-2 text-sm capitalize text-muted-foreground data-[selected]:border-primary data-[selected]:bg-transparent data-[selected]:text-foreground data-[selected]:shadow-none"
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsPanel value="overview" className="mt-6 space-y-6">
          {/* KPI cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Revenue"
              value="$45,231.89"
              delta="+20.1% from last month"
              tone="up"
              icon={<IconCurrencyDollar className="h-4 w-4" />}
            />
            <StatCard
              label="Subscriptions"
              value="+2,350"
              delta="+180.1% from last month"
              tone="up"
              icon={<IconUsers className="h-4 w-4" />}
            />
            <StatCard
              label="Sales"
              value="+12,234"
              delta="+19% from last month"
              tone="up"
              icon={<IconCreditCard className="h-4 w-4" />}
            />
            <StatCard
              label="Active Now"
              value="+573"
              delta="+201 since last hour"
              tone="neutral"
              icon={<IconActivity className="h-4 w-4" />}
            />
          </div>

          {/* Chart + Recent Sales */}
          <div className="grid gap-4 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <MiniBarChart
                  values={revenue}
                  labels={MONTHS}
                  colorClass="bg-foreground/80"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSales.map((s) => (
                  <RecentSaleRow key={s.email} {...s} />
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsPanel>

        <TabsPanel value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Detailed breakdown will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <BarProgressRow label="Enterprise" value={42} />
                <BarProgressRow
                  label="Growth"
                  value={33}
                  barClass="bg-chart-1"
                />
                <BarProgressRow
                  label="Startup"
                  value={17}
                  barClass="bg-chart-4"
                />
                <BarProgressRow
                  label="Self-serve"
                  value={8}
                  barClass="bg-chart-5"
                />
              </div>
            </CardContent>
          </Card>
        </TabsPanel>

        <TabsPanel value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Export and schedule reports from this panel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No reports generated yet.
              </p>
            </CardContent>
          </Card>
        </TabsPanel>

        <TabsPanel value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage alert preferences and digest settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">All caught up!</p>
            </CardContent>
          </Card>
        </TabsPanel>
      </TabsRoot>
    </div>
  );
}
