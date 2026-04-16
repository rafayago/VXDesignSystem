import { Card, CardDescription, CardTitle } from "@vortx/ui";

export default function ComingSoonPage() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Card className="max-w-xl p-6 text-center">
        <CardTitle>Coming Soon</CardTitle>
        <CardDescription>
          This section is intentionally static and reserved for upcoming
          dashboard modules.
        </CardDescription>
      </Card>
    </div>
  );
}
