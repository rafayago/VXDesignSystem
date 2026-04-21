import Link from "next/link";
import { Button, Card, CardDescription, CardTitle } from "@vortx/ui";

export default function Error500Page() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Card className="max-w-xl p-6 text-center">
        <CardTitle>500 · Internal Error</CardTitle>
        <CardDescription>
          Server errors are represented as static UI previews in this app.
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
