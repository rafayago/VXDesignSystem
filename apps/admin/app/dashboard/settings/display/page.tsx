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

export default function SettingsDisplayPage() {
  return (
    <div className="space-y-5">
      <SectionHeader
        title="Display"
        description="Configure layout, density, and presentation options."
      />
      <Card>
        <CardHeader>
          <CardTitle>Display Preferences</CardTitle>
          <CardDescription>
            Configure how the interface looks and behaves.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Sidebar style</Label>
              <Select
                defaultValue="expanded"
                options={[
                  { value: "expanded", label: "Expanded" },
                  { value: "compact", label: "Compact" },
                  { value: "icon", label: "Icon only" },
                ]}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Content width</Label>
              <Select
                defaultValue="wide"
                options={[
                  { value: "wide", label: "Wide" },
                  { value: "centered", label: "Centered" },
                ]}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Table density</Label>
              <Select
                defaultValue="comfortable"
                options={[
                  { value: "compact", label: "Compact" },
                  { value: "comfortable", label: "Comfortable" },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
