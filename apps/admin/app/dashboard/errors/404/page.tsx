import Link from "next/link";
import { Button, Card, CardDescription, CardTitle } from "@vortx/ui";

export default function Error404Page() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Card className="max-w-xl p-6 text-center">
        <CardTitle>404 · Not Found</CardTitle>
        <CardDescription>The page you requested does not exist in this static dashboard set.</CardDescription>
        <div className="mt-4">
          <Link href="/dashboard/default">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
