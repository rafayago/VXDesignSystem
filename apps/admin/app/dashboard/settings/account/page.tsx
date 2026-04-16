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
} from "@vortx/ui";
import { SectionHeader } from "../../../components/admin-widgets";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <SectionHeader
        title="Account"
        description="Update your account settings. Set your preferred language and timezone."
      />
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>
            Organization-level profile and billing fields.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input id="org-name" defaultValue="VX Design System" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="org-email">Billing Email</Label>
              <Input
                id="org-email"
                type="email"
                defaultValue="admin@vxdesign.io"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="plan">Plan</Label>
              <Input
                id="plan"
                defaultValue="Enterprise"
                readOnly
                className="bg-muted/30"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="seats">Seats</Label>
              <Input
                id="seats"
                defaultValue="42 seats"
                readOnly
                className="bg-muted/30"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Update account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
