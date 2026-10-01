"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaginatedTable } from "@/components/paginated-table";
import { FormBuilder as SharedFormBuilder, type FormConfig } from "@/components/admin/common/FormBuilder";
import { DatePicker } from "@/components/admin/common/DatePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RegistrationConfigPanel } from "./RegistrationConfigPanel";
import { CreateButton } from "@/components/admin/common/CreateButton";

type Attendee = { id: string; name: string; email: string; slab: string; by: string; status: "Active" | "Suspended" };
const initialAttendees: Attendee[] = [
  { id: "REG1", name: "Mintu Nath", email: "m@n.com", slab: "Delegate · Early bird", by: "Self registered", status: "Active" },
  { id: "REG2", name: "Aarav Shah", email: "aarav.shah@example.com", slab: "Speaker", by: "Priya Mehta", status: "Active" },
  { id: "REG3", name: "Sarah Chen", email: "sarah.chen@example.com", slab: "Delegate · Standard", by: "Self registered", status: "Active" },
  { id: "REG4", name: "Daniel Okafor", email: "daniel.okafor@example.com", slab: "Student", by: "Admin", status: "Suspended" },
];

const menuGroups = [
  { title: "Registered", links: [["Attendee (Conference)", "registered/attendee"], ["Accompany (Conference)", "registered/accompany"], ["Functions (Conference)", "registered/functions"], ["Visitor (Free/Exhibition)", "registered/visitor"]] },
  { title: "Registration Form", links: [["Attendee Registration", "forms/attendee"], ["Visitor Registration", "forms/visitor"], ["Exhibitor Badge", "forms/exhibitor"], ["Custom Registration Link", "forms/custom-link"]] },
  { title: "Registration Slab", links: [["Attendee Registration Slab", "slabs/attendee"], ["Accompany Registration Slab", "slabs/accompany"], ["Functions Registration Slab", "slabs/functions"]] },
  { title: "Workshop", links: [["Registered", "workshop/registered"], ["Registration Slab", "workshop/slabs"], ["Workshop Category", "workshop/categories"], ["Create Workshop", "workshop/create"]] },
  { title: "More", links: [["Discount Code", "discount-codes"], ["Cancellation Policy", "cancellation-policy"], ["Registration Settings", "settings"]] },
];

const titleFor = (path: string) => {
  if (path === "dashboard") return "Registration dashboard";
  const all = menuGroups.flatMap((g) => g.links);
  return all.find(([, href]) => href === path)?.[0] ?? "Attendee (Conference)";
};

export default function RegistrationWorkspace() {
  const params = useParams();
  const pathname = usePathname();
  const eventId = String(params?.id ?? "");
  const section = pathname?.split("/registration/")[1] ?? "registered/attendee";
  const [attendees, setAttendees] = useState(initialAttendees);
  const [startDate, setStartDate] = useState(() => typeof window === "undefined" ? "" : JSON.parse(localStorage.getItem("registration-settings") ?? "{}").startDate ?? "");
  const [endDate, setEndDate] = useState(() => typeof window === "undefined" ? "" : JSON.parse(localStorage.getItem("registration-settings") ?? "{}").endDate ?? "");
  const [acceptRegistrations, setAcceptRegistrations] = useState(true);
  const [saved, setSaved] = useState(false);
  const isRegistered = section === "dashboard" || section.startsWith("registered/");
  const isForm = section.startsWith("forms/");
  const isSettings = section === "settings";
  const title = titleFor(section);

  return <div className="mx-auto max-w-[1500px] space-y-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground"><Link href={`/admin/events/${eventId}`} className="hover:text-foreground">Event</Link><span>/</span><span>Registration</span></div><h1 className="text-2xl font-semibold tracking-tight">{title}</h1><p className="mt-1 text-sm text-muted-foreground">Manage event registrations, forms, pricing and attendee access.</p></div>
      <div className="flex gap-2"><Button variant="outline" className="gap-2"><Download className="h-4 w-4"/>Export</Button>{isRegistered && <CreateButton label="Add registration" onClick={() => { const next = `REG${attendees.length + 1}`; setAttendees([{ id: next, name: "New attendee", email: "attendee@example.com", slab: "Unassigned", by: "Admin", status: "Active" }, ...attendees]); }}/>}</div>
    </div>
    <div className="grid gap-6">
      <div className="space-y-5">
        {isRegistered ? <>
          <div className="grid gap-4 sm:grid-cols-3">{[["Total registrations", "1,284", "+12.8% this month"], ["Active", "1,246", "96.9% of total"], ["Suspended", "38", "Review access"]].map(([label, value, note]) => <Card key={label}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{note}</p></CardContent></Card>)}</div>
          <PaginatedTable data={attendees} searchFields={["id", "name", "email", "slab"]} searchPlaceholder="Search registrations..." emptyMessage="No registrations found" defaultItemsPerPage={10} renderHeader={() => <div><h2 className="font-semibold">Attendee registrations ({attendees.length})</h2><p className="text-sm text-muted-foreground">Review registrants and manage their access.</p></div>} columns={[
            { key: "id", header: "Registration #", cell: (person: Attendee) => <span className="font-medium">{person.id}</span> },
            { key: "name", header: "Name", cell: (person: Attendee) => <div>{person.name}<div className={`mt-1 text-xs ${person.status === "Active" ? "text-emerald-600" : "text-amber-600"}`}>{person.status}</div></div> },
            { key: "email", header: "Email" }, { key: "slab", header: "Slab category" }, { key: "by", header: "Registered by" },
            { key: "actions", header: "Action", cell: (person: Attendee) => <div className="flex gap-3"><button className="font-medium text-primary hover:underline" onClick={() => alert(`${person.name}\n${person.email}\n${person.slab}`)}>View details</button><button className="text-muted-foreground hover:text-foreground" onClick={() => setAttendees((current) => current.map((a) => a.id === person.id ? { ...a, status: a.status === "Active" ? "Suspended" : "Active" } : a))}>{person.status === "Active" ? "Suspend" : "Restore"}</button></div> },
          ]}/>
        </> : isSettings ? <Card><CardContent className="space-y-6 p-6"><div><h2 className="font-semibold">Registration window</h2><p className="text-sm text-muted-foreground">Set when attendees can submit a registration.</p></div><div className="grid gap-5 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium">Registration start date<DatePicker value={startDate} onChange={setStartDate}/></label><label className="space-y-2 text-sm font-medium">Registration end date<DatePicker value={endDate} onChange={setEndDate}/></label></div><div className="flex items-center justify-between rounded-lg border p-4"><div><p className="font-medium">Accept registrations</p><p className="text-sm text-muted-foreground">Allow new registrations during the selected window.</p></div><Switch checked={acceptRegistrations} onCheckedChange={setAcceptRegistrations}/></div><Button color="primary" className="cursor-pointer text-base" onClick={() => {localStorage.setItem("registration-settings", JSON.stringify({ startDate, endDate, acceptRegistrations })); setSaved(true); setTimeout(() => setSaved(false), 2200)}}>{saved ? "Settings saved" : "Save settings"}</Button></CardContent></Card> : isForm ? <FormBuilder key={section} section={section}/> : <RegistrationConfigPanel key={section} section={section}/>}
      </div>
    </div>
  </div>;
}

function FormBuilder({ section }: { section: string }) {
  const type = section.split("/")[1];
  const title = type === "visitor" ? "Visitor Registration Form" : type === "exhibitor" ? "Exhibitor Badge Form" : type === "custom-link" ? "Custom Registration Form" : "Attendee Registration Form";
  const [saved, setSaved] = useState(false);
  const [initialConfig] = useState<FormConfig | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    try { return JSON.parse(localStorage.getItem(`registration-form-${type}`) ?? "null") ?? undefined; } catch { return undefined; }
  });
  const [fixedValues, setFixedValues] = useState<Record<string, string>>({});
  const [shownSlabs, setShownSlabs] = useState<string[]>(() => (initialConfig as any)?.shownSlabs ?? []);
  const [registrationChoices, setRegistrationChoices] = useState<Record<string, string>>(() => (initialConfig as any)?.registrationChoices ?? { accompany: "no", workshop: "no", functions: "no" });
  const [slabOptions] = useState<string[]>(() => {
    if (type !== "attendee" || typeof window === "undefined") return [];
    try { return (JSON.parse(localStorage.getItem("registration-slabs-attendee") ?? "[]") as { name: string }[]).map((slab) => slab.name); } catch { return []; }
  });
  const [payment, setPayment] = useState(type === "custom-link" && (initialConfig as any)?.payment === true);
  const fixedField = (name: string, inputType = "text") => (
    <div key={name} className="space-y-2">
      <Label className="text-default">{name}{["First Name", "Last Name", "Email", "Mobile"].includes(name) && " *"}</Label>
      <Input type={inputType} value={fixedValues[name] ?? ""} onChange={(event) => setFixedValues({ ...fixedValues, [name]: event.target.value })} placeholder={`Enter ${name.toLowerCase()}`} />
    </div>
  );
  const yesNoField = (label: string, key: "accompany" | "workshop" | "functions") => (
    <div key={key} className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-3">
      <Label className="text-default">{label}</Label>
      <RadioGroup value={registrationChoices[key]} onValueChange={(value) => setRegistrationChoices({ ...registrationChoices, [key]: value })} className="flex items-center gap-5">
        {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }].map((option) => <label key={option.value} htmlFor={`${type}-${key}-${option.value}`} className="flex cursor-pointer items-center gap-2 text-sm"><RadioGroupItem id={`${type}-${key}-${option.value}`} value={option.value} color="primary"/>{option.label}</label>)}
      </RadioGroup>
    </div>
  );
  return <div className="space-y-5">
    <div><h2 className="font-semibold">Full form builder</h2><p className="text-sm text-muted-foreground">Fixed fields are ready to fill in. Add more fields with the form builder below.</p></div>
    <Card><CardContent className="space-y-5 p-5">
      <div><h3 className="font-semibold">Fixed fields</h3><p className="mt-1 text-sm text-muted-foreground">Registrant information</p></div>
      <div className="grid gap-4 sm:grid-cols-3">{fixedField("First Name")}{fixedField("Middle Name")}{fixedField("Last Name")}</div>
      <div className="grid gap-4 sm:grid-cols-2">{fixedField("Email", "email")}{fixedField("Mobile", "tel")}</div>
      {type === "attendee" && <>
        <div className="space-y-3 rounded-md border p-4"><Label className="text-default">Select Registration Slab</Label>{slabOptions.length ? <div className="grid gap-2 sm:grid-cols-2">{slabOptions.map((name) => <label key={name} className="flex items-center gap-2 rounded-md bg-muted/40 p-2.5 text-sm"><Checkbox checked={shownSlabs.includes(name)} onCheckedChange={(checked) => setShownSlabs(checked ? [...shownSlabs, name] : shownSlabs.filter((item) => item !== name))}/>{name}</label>)}</div> : <p className="text-sm text-muted-foreground">No attendee slabs created yet.</p>}</div>
        <div className="space-y-3">{yesNoField("Accompany Registration", "accompany")}{yesNoField("Workshop Registration", "workshop")}{yesNoField("Functions Registration", "functions")}</div>
      </>}
    </CardContent></Card>
    <Card><CardContent className="p-5"><div className="mb-4"><h3 className="font-semibold">Custom fields</h3><p className="text-sm text-muted-foreground">Add optional fields beyond the fixed registration information.</p></div><SharedFormBuilder title={title} initialConfig={initialConfig} onSave={(config: FormConfig) => { localStorage.setItem(`registration-form-${type}`, JSON.stringify({ ...config, fixedFields: ["First Name", "Middle Name", "Last Name", "Email", "Mobile"], fixedValues, shownSlabs, registrationChoices, ...(type === "custom-link" ? { payment } : {}) })); setSaved(true); setTimeout(() => setSaved(false), 2500); }}/>{saved && <p className="mt-3 text-sm font-medium text-emerald-600">Form saved.</p>}</CardContent></Card>
    {type === "custom-link" && <Card><CardContent className="flex items-center justify-between p-4"><div><p className="font-medium">Payment</p><p className="text-sm text-muted-foreground">Collect payment during registration</p></div><Checkbox checked={payment} onCheckedChange={(checked) => setPayment(!!checked)}/></CardContent></Card>}
  </div>;
}
