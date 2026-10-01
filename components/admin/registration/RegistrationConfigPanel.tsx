"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DateTimePicker } from "@/components/admin/common/DateTimePicker";
import { DatePicker } from "@/components/admin/common/DatePicker";
import { RichTextEditor } from "@/components/rich-text-editor";
import { PaginatedTable } from "@/components/paginated-table";
import {
  SlabAdditionalFieldsBuilder,
  type SlabAdditionalField,
} from "./SlabAdditionalFieldsBuilder";
import { CreateButton } from "@/components/admin/common/CreateButton";

type Slab = {
  name: string;
  description: string;
  amount: string;
  start: string;
  end: string;
  additional: string;
  fields?: SlabAdditionalField[];
};
type Discount = {
  name: string;
  type: string;
  amount: string;
  limit: string;
  start: string;
  end: string;
};
const emptySlab: Slab = {
  name: "",
  description: "",
  amount: "",
  start: "",
  end: "",
  additional: "",
};
const emptyDiscount: Discount = {
  name: "",
  type: "percentage",
  amount: "",
  limit: "",
  start: "",
  end: "",
};

const slabTitle = (section: string) =>
  section.includes("accompany")
    ? "Accompany Registration Slab"
    : section.includes("functions")
      ? "Functions Registration Slab"
      : "Attendee Registration Slab";

export function RegistrationConfigPanel({ section }: { section: string }) {
  const slabStorageKey = `registration-slabs-${section.split("/")[1] ?? "attendee"}`;
  const [slabs, setSlabs] = useState<Slab[]>(() =>
    typeof window === "undefined"
      ? []
      : JSON.parse(localStorage.getItem(slabStorageKey) ?? "[]"),
  );
  const [discounts, setDiscounts] = useState<Discount[]>(() =>
    typeof window === "undefined"
      ? []
      : JSON.parse(localStorage.getItem("registration-discount-codes") ?? "[]"),
  );
  const [open, setOpen] = useState(false);
  const [slab, setSlab] = useState<Slab>(emptySlab);
  const [discount, setDiscount] = useState<Discount>(emptyDiscount);
  const [needExtra, setNeedExtra] = useState(false);
  const [extraFields, setExtraFields] = useState<SlabAdditionalField[]>([]);
  const [policy, setPolicy] = useState("");
  const [settings, setSettings] = useState({
    start: "",
    end: "",
    enabled: true,
  });
  const isSlab = section.startsWith("slabs/");
  const isDiscount = section === "discount-codes";
  const isPolicy = section === "cancellation-policy";
  const isSettings = section === "settings";
  const isWorkshop = section.startsWith("workshop/");
  const heading = isSlab
    ? slabTitle(section)
    : isDiscount
      ? "Discount codes"
      : section === "workshop/categories"
        ? "Workshop categories"
        : "Workshop registration slabs";

  if (isWorkshop) return <WorkshopRegistrationPanel section={section} />;

  if (isPolicy)
    return (
      <Card>
        <CardContent className="space-y-5 p-6">
          <div>
            <h2 className="font-semibold">Cancellation policy</h2>
            <p className="text-sm text-muted-foreground">
              Describe the cancellation and refund terms shown to registrants.
            </p>
          </div>
          <RichTextEditor
            value={policy}
            onChange={setPolicy}
            placeholder="Write the cancellation policy…"
            minHeight="300px"
          />
          <Button
            className="text-base"
            color="primary"
            onClick={() =>
              localStorage.setItem("registration-cancellation-policy", policy)
            }
          >
            Save policy
          </Button>
        </CardContent>
      </Card>
    );
  if (isSettings)
    return (
      <Card>
        <CardContent className="space-y-6 p-6">
          <div>
            <h2 className="font-semibold">Registration window</h2>
            <p className="text-sm text-muted-foreground">
              Set when attendees can submit a registration.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Registration start date</Label>
              <DatePicker
                value={settings.start}
                onChange={(start) => setSettings({ ...settings, start })}
              />
            </div>
            <div className="space-y-2">
              <Label>Registration end date</Label>
              <DatePicker
                value={settings.end}
                onChange={(end) => setSettings({ ...settings, end })}
              />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Accept registrations</p>
              <p className="text-sm text-muted-foreground">
                Allow new registrations during this window.
              </p>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(enabled) =>
                setSettings({ ...settings, enabled })
              }
            />
          </div>
          <Button
            onClick={() =>
              localStorage.setItem(
                "registration-settings",
                JSON.stringify(settings),
              )
            }
          >
            Save settings
          </Button>
        </CardContent>
      </Card>
    );

  if (!isSlab && !isDiscount)
    return (
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="font-semibold">{heading}</h2>
          <p className="text-sm text-muted-foreground">
            Manage workshop registration options and categories.
          </p>
          <Input placeholder="Workshop category name" />
          <Button onClick={() => setOpen(true)}>Configure</Button>
        </CardContent>
      </Card>
    );

  const saveSlab = () => {
    if (!slab.name || !slab.amount || !slab.start || !slab.end) return;
    const next = [...slabs, { ...slab, fields: needExtra ? extraFields : [] }];
    setSlabs(next);
    localStorage.setItem(slabStorageKey, JSON.stringify(next));
    setSlab(emptySlab);
    setNeedExtra(false);
    setExtraFields([]);
    setOpen(false);
  };
  const saveDiscount = () => {
    if (
      !discount.name ||
      !discount.amount ||
      !discount.limit ||
      !discount.start ||
      !discount.end
    )
      return;
    const next = [...discounts, discount];
    setDiscounts(next);
    localStorage.setItem("registration-discount-codes", JSON.stringify(next));
    setDiscount(emptyDiscount);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">{heading}</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage{" "}
            {isSlab ? "registration pricing slabs" : "discount codes"}.
          </p>
        </div>
        <CreateButton
          label={isSlab ? "Add slab category" : "Add discount code"}
          onClick={() => setOpen(true)}
        />
      </div>
      <PaginatedTable
        data={(isSlab ? slabs : discounts) as any[]}
        searchPlaceholder={
          isSlab ? "Search slab categories..." : "Search discount codes..."
        }
        searchFields={(isSlab ? ["name"] : ["name", "type"]) as any}
        emptyMessage={
          isSlab ? "No slab categories yet." : "No discount codes yet."
        }
        renderHeader={() => (
          <div>
            <h3 className="font-semibold">
              {isSlab ? "Slab categories" : "Discount codes"} (
              {isSlab ? slabs.length : discounts.length})
            </h3>
            <p className="text-sm text-muted-foreground">
              Saved entries appear here.
            </p>
          </div>
        )}
        columns={
          (isSlab
            ? [
                { key: "name", header: "Slab category" },
                { key: "description", header: "Description" },
                {
                  key: "amount",
                  header: "Amount",
                  cell: (row: Slab) => `$${row.amount}`,
                },
                { key: "start", header: "Start date & time" },
                { key: "end", header: "End date & time" },
              ]
            : [
                { key: "name", header: "Discount code" },
                {
                  key: "type",
                  header: "Discount type",
                  cell: (row: Discount) =>
                    row.type === "percentage" ? "Percentage" : "Fixed amount",
                },
                {
                  key: "amount",
                  header: "Discount",
                  cell: (row: Discount) =>
                    row.type === "percentage"
                      ? `${row.amount}%`
                      : `$${row.amount}`,
                },
                { key: "limit", header: "Maximum redemptions" },
                { key: "start", header: "Start date & time" },
                { key: "end", header: "End date & time" },
              ]) as any
        }
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>
              {isSlab ? "Add Slab Category" : "Add Discount Code"}
            </SheetTitle>
            <SheetDescription>
              {isSlab
                ? `Create a category for ${heading.toLowerCase()}.`
                : "Set the discount value and redemption window."}
            </SheetDescription>
          </SheetHeader>
          {isSlab ? (
            <div className="space-y-5 py-5">
              <Field label="Slab category name *">
                <Input
                  value={slab.name}
                  onChange={(e) => setSlab({ ...slab, name: e.target.value })}
                  placeholder="e.g. Early bird"
                />
              </Field>
              <Field label="Slab description">
                <Textarea
                  value={slab.description}
                  onChange={(e) =>
                    setSlab({ ...slab, description: e.target.value })
                  }
                  placeholder="Describe this registration category"
                />
              </Field>
              <Field label="Slab amount *">
                <Input
                  type="number"
                  min="0"
                  value={slab.amount}
                  onChange={(e) => setSlab({ ...slab, amount: e.target.value })}
                  placeholder="0.00"
                />
              </Field>
              <DateTimeField
                label="Start date & time *"
                value={slab.start}
                onChange={(start) => setSlab({ ...slab, start })}
              />
              <DateTimeField
                label="End date & time *"
                value={slab.end}
                onChange={(end) => setSlab({ ...slab, end })}
              />
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">
                    Need additional information
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Add fields to collect extra details for this slab.
                  </p>
                </div>
                <Switch
                  checked={needExtra}
                  onCheckedChange={(checked) => {
                    setNeedExtra(checked);
                    if (!checked) setExtraFields([]);
                  }}
                />
              </div>
              {needExtra && (
                <SlabAdditionalFieldsBuilder
                  fields={extraFields}
                  onChange={setExtraFields}
                />
              )}
              <div className="flex gap-2 pt-2">
                <Button
                  color="primary"
                  className="cursor-pointer text-base"
                  onClick={saveSlab}
                >
                  Create slab
                </Button>
                <Button
                  variant="outline"
                  className="cursor-pointer text-base"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-5 py-5">
              <Field label="Discount code name *">
                <Input
                  value={discount.name}
                  onChange={(e) =>
                    setDiscount({ ...discount, name: e.target.value })
                  }
                  placeholder="e.g. EARLY20"
                />
              </Field>
              <div className="grid grid-cols-[1fr_1fr] gap-3">
                <Field label="Discount type">
                  <Select
                    value={discount.type}
                    onValueChange={(type) => setDiscount({ ...discount, type })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed amount</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Discount *">
                  <Input
                    type="number"
                    min="0"
                    value={discount.amount}
                    onChange={(e) =>
                      setDiscount({ ...discount, amount: e.target.value })
                    }
                    placeholder={
                      discount.type === "percentage" ? "20%" : "0.00"
                    }
                  />
                </Field>
              </div>
              <Field label="Maximum redemption limit *">
                <Input
                  type="number"
                  min="1"
                  value={discount.limit}
                  onChange={(e) =>
                    setDiscount({ ...discount, limit: e.target.value })
                  }
                  placeholder="e.g. 100"
                />
              </Field>
              <DateTimeField
                label="Start date & time *"
                value={discount.start}
                onChange={(start) => setDiscount({ ...discount, start })}
              />
              <DateTimeField
                label="End date & time *"
                value={discount.end}
                onChange={(end) => setDiscount({ ...discount, end })}
              />
              <div className="flex gap-2 pt-2">
                <Button
                  color="primary"
                  className="cursor-pointer text-base"
                  onClick={saveDiscount}
                >
                  Create discount code
                </Button>
                <Button
                  variant="outline"
                  className="cursor-pointer text-base"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-default">{label}</Label>
      {children}
    </div>
  );
}
function DateTimeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <DateTimePicker value={value} onChange={onChange} />
    </Field>
  );
}

type WorkshopCategory = { name: string; status: "Active" | "Inactive" };
type WorkshopSlab = {
  name: string;
  description: string;
  amount: string;
  start: string;
  end: string;
};
type Workshop = {
  name: string;
  category: string;
  venue: string;
  type: "Paid" | "Free";
  amount: string;
  start: string;
  end: string;
  status: "Active" | "Inactive";
  registrationRequired: boolean;
};
type WorkshopRegistration = {
  id: string;
  workshop: string;
  attendee: string;
  email: string;
  registeredAt: string;
  status: string;
};
const sampleWorkshopRegistrations: WorkshopRegistration[] = [
  {
    id: "WREG001",
    workshop: "Designing Better Events",
    attendee: "Mintu Nath",
    email: "m@n.com",
    registeredAt: "2026-08-12",
    status: "Confirmed",
  },
  {
    id: "WREG002",
    workshop: "Designing Better Events",
    attendee: "Aarav Shah",
    email: "aarav.shah@example.com",
    registeredAt: "2026-08-14",
    status: "Confirmed",
  },
  {
    id: "WREG003",
    workshop: "Data Storytelling Lab",
    attendee: "Sarah Chen",
    email: "sarah.chen@example.com",
    registeredAt: "2026-08-15",
    status: "Pending",
  },
];

function WorkshopRegistrationPanel({ section }: { section: string }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<WorkshopCategory[]>(() =>
    typeof window === "undefined"
      ? []
      : JSON.parse(localStorage.getItem("workshop-categories") ?? "[]"),
  );
  const [slabs, setSlabs] = useState<WorkshopSlab[]>(() =>
    typeof window === "undefined"
      ? []
      : JSON.parse(localStorage.getItem("workshop-slabs") ?? "[]"),
  );
  const [workshops, setWorkshops] = useState<Workshop[]>(() =>
    typeof window === "undefined"
      ? []
      : JSON.parse(localStorage.getItem("workshops") ?? "[]"),
  );
  const [category, setCategory] = useState<WorkshopCategory>({
    name: "",
    status: "Active",
  });
  const [slab, setSlab] = useState<WorkshopSlab>({
    name: "",
    description: "",
    amount: "",
    start: "",
    end: "",
  });
  const [workshop, setWorkshop] = useState<Workshop>({
    name: "",
    category: "",
    venue: "",
    type: "Paid",
    amount: "",
    start: "",
    end: "",
    status: "Active",
    registrationRequired: true,
  });
  const isCategories = section === "workshop/categories";
  const isSlabs = section === "workshop/slabs";
  const isRegistered = section === "workshop/registered";
  const isCreate = section === "workshop/create";
  const title = isCategories
    ? "Workshop Category"
    : isSlabs
      ? "Workshop Registration Slab"
      : isRegistered
        ? "Registered Workshops"
        : "Create Workshop";

  const saveCategory = () => {
    if (!category.name.trim()) return;
    const next = [...categories, category];
    setCategories(next);
    localStorage.setItem("workshop-categories", JSON.stringify(next));
    setCategory({ name: "", status: "Active" });
    setOpen(false);
  };
  const saveSlab = () => {
    if (!slab.name.trim()) return;
    const next = [...slabs, slab];
    setSlabs(next);
    localStorage.setItem("workshop-slabs", JSON.stringify(next));
    setSlab({ name: "", description: "", amount: "", start: "", end: "" });
    setOpen(false);
  };
  const saveWorkshop = () => {
    if (
      !workshop.name ||
      !workshop.category ||
      !workshop.venue ||
      !workshop.amount ||
      !workshop.start ||
      !workshop.end
    )
      return;
    const next = [...workshops, workshop];
    setWorkshops(next);
    localStorage.setItem("workshops", JSON.stringify(next));
    setWorkshop({
      name: "",
      category: "",
      venue: "",
      type: "Paid",
      amount: "",
      start: "",
      end: "",
      status: "Active",
      registrationRequired: true,
    });
    setOpen(false);
  };

  if (isRegistered)
    return (
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Registered workshops</h2>
          <p className="text-sm text-muted-foreground">
            Workshop registrations for this event.
          </p>
        </div>
        <PaginatedTable
          data={sampleWorkshopRegistrations}
          searchFields={["id", "workshop", "attendee", "email"]}
          searchPlaceholder="Search workshop registrations..."
          emptyMessage="No registered workshops yet."
          renderHeader={() => (
            <h3 className="font-semibold">
              Workshop registrations ({sampleWorkshopRegistrations.length})
            </h3>
          )}
          columns={[
            { key: "id", header: "Registration #" },
            { key: "workshop", header: "Workshop" },
            { key: "attendee", header: "Attendee" },
            { key: "email", header: "Email" },
            { key: "registeredAt", header: "Registered on" },
            { key: "status", header: "Status" },
          ]}
        />
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">
            {isCategories
              ? "Create workshop categories and set their status."
              : isSlabs
                ? "Configure workshop slab pricing and registration periods."
                : "Set up a workshop and its registration details."}
          </p>
        </div>
        {(isCategories || isSlabs || isCreate) && (
          <CreateButton
            label={
              isCategories
                ? "Add workshop category"
                : isSlabs
                  ? "Add registration slab"
                  : "Create workshop"
            }
            onClick={() => setOpen(true)}
          />
        )}
      </div>
      {isCategories && (
        <PaginatedTable
          data={categories}
          searchFields={["name", "status"]}
          searchPlaceholder="Search categories..."
          emptyMessage="No workshop categories yet."
          renderHeader={() => (
            <h3 className="font-semibold">
              Workshop categories ({categories.length})
            </h3>
          )}
          columns={[
            { key: "name", header: "Workshop category" },
            {
              key: "status",
              header: "Status",
              cell: (row: WorkshopCategory) => (
                <span
                  className={
                    row.status === "Active"
                      ? "text-emerald-600"
                      : "text-muted-foreground"
                  }
                >
                  {row.status}
                </span>
              ),
            },
          ]}
        />
      )}
      {isSlabs && (
        <PaginatedTable
          data={slabs}
          searchFields={["name", "description"]}
          searchPlaceholder="Search workshop slabs..."
          emptyMessage="No workshop registration slabs yet."
          renderHeader={() => (
            <h3 className="font-semibold">Workshop slabs ({slabs.length})</h3>
          )}
          columns={[
            { key: "name", header: "Slab category name" },
            { key: "description", header: "Description" },
            {
              key: "amount",
              header: "Amount",
              cell: (row: WorkshopSlab) => `$${row.amount || "0"}`,
            },
            { key: "start", header: "Start date & time" },
            { key: "end", header: "End date & time" },
          ]}
        />
      )}
      {isCreate && (
        <PaginatedTable
          data={workshops}
          searchFields={["name", "category", "venue"]}
          searchPlaceholder="Search workshops..."
          emptyMessage="No workshops created yet."
          renderHeader={() => (
            <h3 className="font-semibold">Workshops ({workshops.length})</h3>
          )}
          columns={[
            { key: "name", header: "Workshop name" },
            { key: "category", header: "Category" },
            { key: "venue", header: "Venue" },
            { key: "type", header: "Type" },
            {
              key: "amount",
              header: "Amount",
              cell: (row: Workshop) =>
                row.type === "Free" ? "Free" : `$${row.amount}`,
            },
            { key: "start", header: "Start date & time" },
            { key: "end", header: "End date & time" },
            { key: "status", header: "Status" },
            {
              key: "registrationRequired",
              header: "Event registration required",
              cell: (row: Workshop) =>
                row.registrationRequired ? "Yes" : "No",
            },
          ]}
        />
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>
              {isCategories
                ? "Add Workshop Category"
                : isSlabs
                  ? "Add Workshop Registration Slab"
                  : "Create Workshop"}
            </SheetTitle>
            <SheetDescription>
              Enter the workshop details and save to add it to the table.
            </SheetDescription>
          </SheetHeader>
          {isCategories ? (
            <div className="space-y-5 py-5">
              <Field label="Workshop category name *">
                <Input
                  value={category.name}
                  onChange={(event) =>
                    setCategory({ ...category, name: event.target.value })
                  }
                  placeholder="Enter category name"
                />
              </Field>
              <Field label="Status">
                <Select
                  value={category.status}
                  onValueChange={(status: "Active" | "Inactive") =>
                    setCategory({ ...category, status })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <SheetActions
                onSave={saveCategory}
                onCancel={() => setOpen(false)}
                label="Create category"
              />
            </div>
          ) : isSlabs ? (
            <div className="space-y-5 py-5">
              <Field label="Slab category name">
                <Input
                  value={slab.name}
                  onChange={(event) =>
                    setSlab({ ...slab, name: event.target.value })
                  }
                  placeholder="Enter slab name"
                />
              </Field>
              <Field label="Slab description">
                <Textarea
                  value={slab.description}
                  onChange={(event) =>
                    setSlab({ ...slab, description: event.target.value })
                  }
                  placeholder="Description"
                />
              </Field>
              <Field label="Slab amount">
                <Input
                  type="number"
                  value={slab.amount}
                  onChange={(event) =>
                    setSlab({ ...slab, amount: event.target.value })
                  }
                  placeholder="0.00"
                />
              </Field>
              <DateTimeField
                label="Start date & time"
                value={slab.start}
                onChange={(start) => setSlab({ ...slab, start })}
              />
              <DateTimeField
                label="End date & time"
                value={slab.end}
                onChange={(end) => setSlab({ ...slab, end })}
              />
              <SheetActions
                onSave={saveSlab}
                onCancel={() => setOpen(false)}
                label="Create slab"
              />
            </div>
          ) : (
            <div className="space-y-5 py-5">
              <Field label="Workshop name *">
                <Input
                  value={workshop.name}
                  onChange={(event) =>
                    setWorkshop({ ...workshop, name: event.target.value })
                  }
                  placeholder="Enter workshop name"
                />
              </Field>
              <Field label="Workshop category *">
                <Select
                  value={workshop.category}
                  onValueChange={(category) =>
                    setWorkshop({ ...workshop, category })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem
                        key={item.name}
                        value={item.name}
                        disabled={item.status !== "Active"}
                      >
                        {item.name}
                        {item.status === "Inactive" ? " (Inactive)" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Venue name *">
                <Input
                  value={workshop.venue}
                  onChange={(event) =>
                    setWorkshop({ ...workshop, venue: event.target.value })
                  }
                  placeholder="Enter venue name"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Workshop registration type *">
                  <Select
                    value={workshop.type}
                    onValueChange={(type: "Paid" | "Free") =>
                      setWorkshop({ ...workshop, type })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Free">Free</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Workshop amount *">
                  <Input
                    type="number"
                    min="0"
                    value={workshop.amount}
                    onChange={(event) =>
                      setWorkshop({ ...workshop, amount: event.target.value })
                    }
                    placeholder="0.00"
                    disabled={workshop.type === "Free"}
                  />
                </Field>
              </div>
              <DateTimeField
                label="Start date & time *"
                value={workshop.start}
                onChange={(start) => setWorkshop({ ...workshop, start })}
              />
              <DateTimeField
                label="End date & time *"
                value={workshop.end}
                onChange={(end) => setWorkshop({ ...workshop, end })}
              />
              <Field label="Status">
                <Select
                  value={workshop.status}
                  onValueChange={(status: "Active" | "Inactive") =>
                    setWorkshop({ ...workshop, status })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">
                    Event registration required *
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Require an event registration before joining.
                  </p>
                </div>
                <Switch
                  checked={workshop.registrationRequired}
                  onCheckedChange={(registrationRequired) =>
                    setWorkshop({ ...workshop, registrationRequired })
                  }
                />
              </div>
              <SheetActions
                onSave={saveWorkshop}
                onCancel={() => setOpen(false)}
                label="Create workshop"
              />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SheetActions({
  onSave,
  onCancel,
  label,
}: {
  onSave: () => void;
  onCancel: () => void;
  label: string;
}) {
  return (
    <div className="flex gap-3 pt-4">
      <Button
        type="button"
        color="primary"
        className="cursor-pointer text-base"
        onClick={onSave}
      >
        {label}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="cursor-pointer text-base"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
}
