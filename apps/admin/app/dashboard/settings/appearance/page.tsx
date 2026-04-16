import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Select,
  Separator,
} from "@vortx/ui";
import { SectionHeader } from "../../../components/admin-widgets";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-5">
      <SectionHeader
        title="Appearance"
        description="Customize the look and feel of the admin dashboard."
      />
      <Card>
        <CardHeader>
          <CardTitle>Theme Controls</CardTitle>
          <CardDescription>
            Customize the appearance of the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Theme preset</Label>
              <Select
                defaultValue="gray"
                options={[
                  { value: "gray", label: "Gray" },
                  { value: "gray-vega", label: "Gray + Vega" },
                ]}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Border radius</Label>
              <Select
                defaultValue="medium"
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Contrast</Label>
              <Select
                defaultValue="normal"
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "high", label: "High" },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
