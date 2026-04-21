import Link from "next/link";
import { Button, Card, CardDescription, CardTitle } from "@vortx/ui";

export default function Error503Page() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Card className="max-w-xl p-6 text-center">
        <CardTitle>503 · Maintenance</CardTitle>
        <CardDescription>
          Service temporarily unavailable. This is a static maintenance state
          preview.
        </CardDescription>
        <div className="mt-4">
          <Link href="/dashboard/default">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
