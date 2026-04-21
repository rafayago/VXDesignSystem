"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@vortx/ui";
import {
  IconCircleCheck,
  IconCircleDashed,
  IconCircleX,
  IconDotsVertical,
  IconDownload,
  IconArrowUp,
  IconArrowRight,
  IconArrowDown,
  IconClock,
  IconPlus,
} from "@tabler/icons-react";
import { SectionHeader } from "../../components/admin-widgets";

type TaskStatus = "Todo" | "In Progress" | "Done" | "Cancelled" | "Backlog";
type TaskPriority = "High" | "Medium" | "Low";
type TaskType = "Bug" | "Feature" | "Documentation";

interface Task {
  id: string;
  type: TaskType;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}

const tasks: Task[] = [
  {
    id: "TASK-9366",
    type: "Documentation",
    title: "Design auth-free onboarding flow for new workspace members",
    status: "Cancelled",
    priority: "Low",
  },
  {
    id: "TASK-5736",
    type: "Bug",
    title: "Fix incorrect token resolution in dark mode card backgrounds",
    status: "Cancelled",
    priority: "Medium",
  },
  {
    id: "TASK-3204",
    type: "Documentation",
    title: "Expand design-token README with CSS variable reference tables",
    status: "Cancelled",
    priority: "High",
  },
  {
    id: "TASK-7141",
    type: "Bug",
    title: "Resolve tab focus trap regression on popover close",
    status: "Done",
    priority: "High",
  },
  {
    id: "TASK-8689",
    type: "Documentation",
    title: "Write API surface docs for all @vortx/ui primitive exports",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-3359",
    type: "Feature",
    title: "Add collapsible sidebar to admin dashboard shell",
    status: "Cancelled",
    priority: "High",
  },
  {
    id: "TASK-4715",
    type: "Bug",
    title: "Scrollbar styling broken on Windows Chrome 124",
    status: "Cancelled",
    priority: "Medium",
  },
  {
    id: "TASK-7138",
    type: "Feature",
    title: "Implement command palette with ⌘K keyboard shortcut",
    status: "Done",
    priority: "Low",
  },
  {
    id: "TASK-1373",
    type: "Feature",
    title: "Create coming-soon placeholder for unbuilt modules",
    status: "Cancelled",
    priority: "Low",
  },
  {
    id: "TASK-4140",
    type: "Feature",
    title: "Add pagination component to tasks and users tables",
    status: "Done",
    priority: "Low",
  },
];

const StatusIcon = ({ status }: { status: TaskStatus }) => {
  if (status === "Done")
    return <IconCircleCheck className="h-4 w-4 text-success" />;
  if (status === "Cancelled")
    return <IconCircleX className="h-4 w-4 text-muted-foreground" />;
  if (status === "In Progress")
    return <IconClock className="h-4 w-4 text-info" />;
  return <IconCircleDashed className="h-4 w-4 text-muted-foreground" />;
};

const PriorityIcon = ({ priority }: { priority: TaskPriority }) => {
  if (priority === "High")
    return <IconArrowUp className="h-4 w-4 text-destructive" />;
  if (priority === "Medium")
    return <IconArrowRight className="h-4 w-4 text-warning" />;
  return <IconArrowDown className="h-4 w-4 text-muted-foreground" />;
};

const typeVariant: Record<TaskType, "default" | "destructive" | "info"> = {
  Bug: "destructive",
  Feature: "default",
  Documentation: "info",
};

export default function TasksPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(filter.toLowerCase()) ||
      t.id.toLowerCase().includes(filter.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleAll = () => {
    if (selected.size === paged.length) setSelected(new Set());
    else setSelected(new Set(paged.map((t) => t.id)));
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Tasks"
        description="Here's a list of your tasks for this month!"
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <IconDownload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button>
              <IconPlus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </div>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Filter by title or ID..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="h-8 w-64 text-sm"
        />
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <IconCircleDashed className="h-3.5 w-3.5" /> Status
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <IconArrowUp className="h-3.5 w-3.5" /> Priority
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8 gap-1.5 text-xs"
        >
          View
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={selected.size === paged.length && paged.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="w-28">Task</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-32">Status</TableHead>
              <TableHead className="w-28">Priority</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((task) => (
              <TableRow
                key={task.id}
                data-state={selected.has(task.id) ? "selected" : undefined}
              >
                <TableCell>
                  <Checkbox
                    checked={selected.has(task.id)}
                    onCheckedChange={(c) => {
                      const next = new Set(selected);
                      c ? next.add(task.id) : next.delete(task.id);
                      setSelected(next);
                    }}
                  />
                </TableCell>
                <TableCell className="font-medium text-muted-foreground">
                  {task.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={typeVariant[task.type]}
                      className="shrink-0"
                    >
                      {task.type}
                    </Badge>
                    <span className="truncate max-w-[400px] text-sm">
                      {task.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm">
                    <StatusIcon status={task.status} />
                    {task.status}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm">
                    <PriorityIcon priority={task.priority} />
                    {task.priority}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
                        />
                      }
                    >
                      <IconDotsVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {selected.size} of {filtered.length} row(s) selected.
        </span>
        <div className="flex items-center gap-4">
          <span>Rows per page: {PAGE_SIZE}</span>
          <span>
            Page {page} of {totalPages}
          </span>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
