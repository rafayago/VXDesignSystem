import type { Metadata } from "next";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
  Switch,
} from "@vortx/ui";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold">Settings</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Configure your design system preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>Basic system configuration.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sys-name">System name</Label>
            <Input id="sys-name" defaultValue="VX Design System" className="max-w-sm" />
            <p className="text-xs text-muted-foreground">Used in documentation and exports.</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sys-version">Version</Label>
            <Input id="sys-version" defaultValue="0.1.0" className="max-w-sm" />
          </div>
          <Button size="sm" className="w-fit">Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Display and interface preferences.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-0">
          {[
            { id: "compact-sidebar", label: "Compact sidebar", desc: "Show icons only by default.", checked: false },
            { id: "storybook-link", label: "Storybook link", desc: "Show link in sidebar footer.", checked: true },
            { id: "motion", label: "Motion", desc: "Enable transition animations.", checked: true },
          ].map((item, i, arr) => (
            <div key={item.id}>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch id={item.id} defaultChecked={item.checked} />
              </div>
              {i < arr.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>Irreversible actions — proceed with caution.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <p className="text-sm font-medium">Reset to defaults</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Clears all customizations and restores factory settings.
            </p>
          </div>
          <Button size="sm" variant="destructive" className="w-fit">Reset system</Button>
        </CardContent>
      </Card>
    </div>
  );
}
