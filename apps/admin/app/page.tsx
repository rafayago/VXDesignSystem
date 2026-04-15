import { Card, CardDescription, CardTitle } from "@acme/ui";

export default function AdminHomePage() {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-4xl content-center gap-5 px-6 py-16">
      <Card>
        <CardTitle>Admin App Consumer</CardTitle>
        <CardDescription>
          This app reuses the same semantic token layer while keeping deployment boundaries separate.
        </CardDescription>
      </Card>
    </main>
  );
}
