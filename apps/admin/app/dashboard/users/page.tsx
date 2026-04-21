"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
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
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@vortx/ui";
import {
  IconDotsVertical,
  IconPlus,
  IconSearch,
  IconUserPlus,
} from "@tabler/icons-react";
import { SectionHeader } from "../../components/admin-widgets";

type UserStatus = "Active" | "Invited" | "Suspended";
type UserRole = "Admin" | "Editor" | "Support" | "Viewer";

interface User {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  initials: string;
  joined: string;
}

const users: User[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    role: "Admin",
    status: "Active",
    initials: "OM",
    joined: "Jan 12, 2024",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    role: "Editor",
    status: "Active",
    initials: "JL",
    joined: "Feb 3, 2024",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    role: "Support",
    status: "Active",
    initials: "IN",
    joined: "Mar 7, 2024",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    role: "Viewer",
    status: "Invited",
    initials: "WK",
    joined: "Mar 18, 2024",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    role: "Editor",
    status: "Active",
    initials: "SD",
    joined: "Apr 2, 2024",
  },
  {
    name: "Maya Torres",
    email: "maya@vx.io",
    role: "Admin",
    status: "Active",
    initials: "MT",
    joined: "Apr 5, 2024",
  },
  {
    name: "Leo Kim",
    email: "leo@vx.io",
    role: "Editor",
    status: "Invited",
    initials: "LK",
    joined: "Apr 8, 2024",
  },
  {
    name: "Nina Shah",
    email: "nina@vx.io",
    role: "Support",
    status: "Active",
    initials: "NS",
    joined: "Apr 10, 2024",
  },
  {
    name: "Ari Cole",
    email: "ari@vx.io",
    role: "Viewer",
    status: "Suspended",
    initials: "AC",
    joined: "Apr 11, 2024",
  },
  {
    name: "John Vale",
    email: "john@vx.io",
    role: "Admin",
    status: "Active",
    initials: "JV",
    joined: "Apr 14, 2024",
  },
];

const statusVariant: Record<
  UserStatus,
  "success" | "info" | "destructive" | "secondary"
> = {
  Active: "success",
  Invited: "info",
  Suspended: "destructive",
};

const roleVariant: Record<UserRole, "default" | "secondary" | "outline"> = {
  Admin: "default",
  Editor: "secondary",
  Support: "outline",
  Viewer: "outline",
};

export default function UsersPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = users.filter((u) => {
    const matchesText =
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesText && matchesRole && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleAll = () => {
    if (selected.size === paged.length) setSelected(new Set());
    else setSelected(new Set(paged.map((u) => u.email)));
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Users"
        description="Manage your team members and their account permissions."
        action={
          <Button>
            <IconUserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <IconSearch className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="h-8 pl-8 text-sm"
          />
        </div>
        <Select
          options={[
            { value: "all", label: "All Roles" },
            { value: "Admin", label: "Admin" },
            { value: "Editor", label: "Editor" },
            { value: "Support", label: "Support" },
            { value: "Viewer", label: "Viewer" },
          ]}
          value={roleFilter}
          onValueChange={(v) => {
            setRoleFilter(v);
            setPage(1);
          }}
          className="h-8 w-36"
        />
        <Select
          options={[
            { value: "all", label: "All Status" },
            { value: "Active", label: "Active" },
            { value: "Invited", label: "Invited" },
            { value: "Suspended", label: "Suspended" },
          ]}
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
          className="h-8 w-36"
        />
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((user) => (
              <TableRow
                key={user.email}
                data-state={selected.has(user.email) ? "selected" : undefined}
              >
                <TableCell>
                  <Checkbox
                    checked={selected.has(user.email)}
                    onCheckedChange={(c) => {
                      const next = new Set(selected);
                      c ? next.add(user.email) : next.delete(user.email);
                      setSelected(next);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge variant={roleVariant[user.role]}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[user.status]}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {user.joined}
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
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Suspend
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
          {selected.size} of {filtered.length} user(s) selected.
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
  );
}

