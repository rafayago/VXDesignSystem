import { Button, Card, CardDescription, CardTitle } from "@acme/ui";

export default function WebHomePage() {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-4xl content-center gap-5 px-6 py-16">
      <Card>
        <CardTitle>Web App Consumer</CardTitle>
        <CardDescription>
          Shared semantic tokens and UI wrappers are consumed from workspace packages.
        </CardDescription>
        <div className="mt-4">
          <Button withIcon>Continue</Button>
        </div>
      </Card>
    </main>
  );
}
