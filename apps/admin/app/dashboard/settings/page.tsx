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
  Textarea,
} from "@vortx/ui";
import { SectionHeader } from "../../components/admin-widgets";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <SectionHeader
        title="Profile"
        description="This is how others will see you on the site."
      />
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Rafa Yago" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="rafa@vxdesign.io" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" defaultValue="Product Lead" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="Sao Paulo" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us a little bit about yourself"
              className="min-h-[100px]"
            />
          </div>
          <div className="flex justify-end">
            <Button>Update profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
