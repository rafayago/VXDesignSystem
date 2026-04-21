import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardTitle,
  Input,
  Menu,
} from "@vortx/ui";
import { SectionHeader } from "../../components/admin-widgets";

const contacts = [
  {
    name: "Mina",
    message: "Can we review the dashboard KPI labels?",
    unread: 2,
  },
  {
    name: "Arman",
    message: "Finance tab looks good after latest pass.",
    unread: 0,
  },
  {
    name: "Jules",
    message: "Need status on user management screen.",
    unread: 1,
  },
  {
    name: "Noor",
    message: "Shipping updated mockups in 20 minutes.",
    unread: 0,
  },
];

export default function ChatsPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHeader
          title="Chats"
          description="Static chat workspace inspired by admin communication modules."
        />
        <Menu
          label="Chat Actions"
          items={[
            { id: "new", label: "New Conversation" },
            { id: "mark", label: "Mark All Read" },
            { id: "archive", label: "Archive Thread" },
          ]}
        />
      </div>

      <section className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="p-4">
          <CardTitle>Conversations</CardTitle>
          <CardDescription>Unread badges and latest snippets.</CardDescription>
          <div className="mt-4 space-y-2">
            {contacts.map((contact) => (
              <div
                key={contact.name}
                className="rounded-md border border-border bg-background/70 px-3 py-2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{contact.name}</p>
                  {contact.unread ? (
                    <Badge variant="info">{contact.unread}</Badge>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {contact.message}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <CardTitle>Active Thread</CardTitle>
          <CardDescription>
            Demo conversation with static messages.
          </CardDescription>
          <div className="mt-4 space-y-3 text-sm">
            <div className="max-w-[70%] rounded-md bg-muted px-3 py-2">
              Morning! Could you share the analytics update?
            </div>
            <div className="ml-auto max-w-[70%] rounded-md bg-primary px-3 py-2 text-primary-foreground">
              Sure, momentum index is up 9% and risk bucket shrank this week.
            </div>
            <div className="max-w-[70%] rounded-md bg-muted px-3 py-2">
              Perfect, I will include that in today's recap.
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Input placeholder="Write a message…" />
            <Button>Send</Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
