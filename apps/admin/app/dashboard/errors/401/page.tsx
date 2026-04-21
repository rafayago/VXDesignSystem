import Link from "next/link";
import { Button, Card, CardDescription, CardTitle } from "@vortx/ui";

export default function Error401Page() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Card className="max-w-xl p-6 text-center">
        <CardTitle>401 · Unauthorized</CardTitle>
        <CardDescription>
          You do not have access to this section in the static preview.
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
