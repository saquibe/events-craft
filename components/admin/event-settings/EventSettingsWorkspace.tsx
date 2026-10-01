"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useParams } from "next/navigation";
import { Building2, Palette, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DateTimePicker } from "@/components/admin/common/DateTimePicker";
import { CreateButton } from "@/components/admin/common/CreateButton";
import { PaginatedTable } from "@/components/paginated-table";
import { TeamsTable } from "@/components/admin/teams/TeamsTable";
import { TeamFormSheet } from "@/components/admin/teams/TeamFormSheet";
import type { Team } from "@/components/admin/teams/types";

const gatewayProviders = ["Razorpay", "PayU", "CCAvenue", "Instamojo", "Cashfree", "Stripe", "PayPal", "Adyen", "eNETS", "Checkout.com", "PayTabs", "Telr", "Network International"];
const modules = ["Registration", "Workshop", "Exhibitor", "Abstract", "Other"];
type EventInfo = { name: string; description: string; type: string; venue: string; city: string; country: string; timezone: string; start: string; end: string; website: string; contactEmail: string; logo: string };
type Gateway = { id: string; provider: string; name: string; accountHolder: string };
type Assignment = { id: string; eventName: string; gatewayId: string; member: string; modules: string[]; sendEmail: boolean };
const emptyInfo: EventInfo = { name: "Medical Conference 2026", description: "Medical and healthcare professionals conference.", type: "Conference", venue: "HITEX", city: "Hyderabad", country: "India", timezone: "IST", start: "2026-01-15T09:00", end: "2026-01-17T18:00", website: "", contactEmail: "", logo: "" };

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { return JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback; } catch { return fallback; }
}

export default function EventSettingsWorkspace({ section }: { section: string }) {
  const params = useParams();
  const eventId = String(params?.id ?? "");
  const key = `event-settings-${eventId}`;
  const eventInfo = readStored<EventInfo>(`${key}-info`, emptyInfo);
  const title = ({ info: "Event Info", branding: "Branding", team: "Manage Team", "payment-gateway": "Payment Gateway" } as Record<string, string>)[section] ?? "Event Info";
  return <div className="mx-auto max-w-[1400px] space-y-6">
    <div><div className="mb-2 text-sm text-muted-foreground">Event Setting / {title}</div><h1 className="text-2xl font-semibold tracking-tight">{title}</h1><p className="mt-1 text-sm text-muted-foreground">Manage event details, appearance, team access, and payment gateways.</p></div>
    {section === "info" && <EventInfoPanel storageKey={`${key}-info`} initial={eventInfo}/>}
    {section === "branding" && <BrandingPanel storageKey={`${key}-branding`} eventInfo={eventInfo}/>}
    {section === "team" && <TeamPanel storageKey={`${key}-team`}/>}
    {section === "payment-gateway" && <PaymentGatewayPanel storageKey={key} eventId={eventId} eventInfo={eventInfo}/>}
  </div>;
}

function EventInfoPanel({ storageKey, initial }: { storageKey: string; initial: EventInfo }) {
  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(false);
  const set = (name: keyof EventInfo, value: string) => setForm((current) => ({ ...current, [name]: value }));
  const save = () => { localStorage.setItem(storageKey, JSON.stringify(form)); setSaved(true); setTimeout(() => setSaved(false), 2200); };
  return <Card><CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-primary"/>Basic event information</CardTitle></CardHeader><CardContent className="space-y-6">
    <div className="grid gap-5 md:grid-cols-2"><Field label="Event name *"><Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Enter event name"/></Field><Field label="Event type"><Select value={form.type} onValueChange={(v) => set("type", v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Conference">Conference</SelectItem><SelectItem value="Exhibition">Exhibition</SelectItem><SelectItem value="Conference & Exhibition">Conference & Exhibition</SelectItem><SelectItem value="Workshop">Workshop</SelectItem><SelectItem value="Seminar">Seminar</SelectItem></SelectContent></Select></Field></div>
    <Field label="Event description"><Textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the event"/></Field>
    <div className="grid gap-5 md:grid-cols-3"><Field label="Venue name"><Input value={form.venue} onChange={(e) => set("venue", e.target.value)} placeholder="Venue"/></Field><Field label="City"><Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="City"/></Field><Field label="Country"><Input value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="Country"/></Field></div>
    <div className="grid gap-5 md:grid-cols-2"><Field label="Start date & time"><DateTimePicker value={form.start} onChange={(v) => set("start", v)}/></Field><Field label="End date & time"><DateTimePicker value={form.end} onChange={(v) => set("end", v)}/></Field></div>
    <div className="grid gap-5 md:grid-cols-3"><Field label="Time zone"><Select value={form.timezone} onValueChange={(v) => set("timezone", v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="IST">IST (UTC+5:30)</SelectItem><SelectItem value="GMT">GMT (UTC+0)</SelectItem><SelectItem value="EST">EST (UTC-5)</SelectItem><SelectItem value="PST">PST (UTC-8)</SelectItem></SelectContent></Select></Field><Field label="Event website"><Input type="url" value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://"/></Field><Field label="Contact email"><Input type="email" value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} placeholder="events@example.com"/></Field></div>
    <Field label="Event logo"><Input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => set("logo", String(reader.result ?? "")); reader.readAsDataURL(file); }}/>{form.logo && <img src={form.logo} alt="Event logo preview" className="mt-2 h-20 w-20 rounded-md border object-contain"/>}</Field>
    <Button color="primary" className="text-base" onClick={save}>{saved ? "Event info saved" : "Save event info"}</Button>
  </CardContent></Card>;
}

type Branding = { primary: string; secondary: string; background: string; text: string; logo: string };
const defaultBranding: Branding = { primary: "#406AE8", secondary: "#1E2137", background: "#F7F7FA", text: "#292D3E", logo: "" };
function BrandingPanel({ storageKey, eventInfo }: { storageKey: string; eventInfo: EventInfo }) {
  const [branding, setBranding] = useState(() => readStored<Branding>(storageKey, { ...defaultBranding, logo: eventInfo.logo }));
  const [saved, setSaved] = useState(false);
  const fields: [keyof Branding, string][] = [["primary", "Primary brand color"], ["secondary", "Secondary color"], ["background", "Background color"], ["text", "Text color"]];
  return <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]"><Card><CardHeader><CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-primary"/>Event branding</CardTitle></CardHeader><CardContent className="space-y-5">{fields.map(([key, label]) => <div key={key} className="grid items-center gap-3 sm:grid-cols-[220px_64px_140px]"><Label className="text-default">{label}</Label><Input type="color" value={branding[key]} onChange={(e) => setBranding({ ...branding, [key]: e.target.value })} className="h-10 w-16 p-1"/><Input value={branding[key]} onChange={(e) => setBranding({ ...branding, [key]: e.target.value })}/></div>)}<Field label="Event logo"><Input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => setBranding({ ...branding, logo: String(reader.result ?? "") }); reader.readAsDataURL(file); }}/></Field><div className="flex gap-3"><Button variant="outline" onClick={() => setBranding(defaultBranding)}>Reset colors</Button><Button color="primary" className="text-base" onClick={() => { localStorage.setItem(storageKey, JSON.stringify(branding)); setSaved(true); setTimeout(() => setSaved(false), 2200); }}>{saved ? "Branding saved" : "Save branding"}</Button></div></CardContent></Card><Card><CardHeader><CardTitle>Live preview</CardTitle></CardHeader><CardContent><div className="overflow-hidden rounded-xl border" style={{ backgroundColor: branding.background, color: branding.text }}><div className="flex items-center gap-3 p-4" style={{ backgroundColor: branding.primary, color: "white" }}>{branding.logo ? <img src={branding.logo} alt="Event logo" className="h-10 w-10 rounded-md object-cover"/> : <div className="grid h-10 w-10 place-items-center rounded-md bg-white/20">EC</div>}<span className="font-semibold">{eventInfo.name || "Your event name"}</span></div><div className="space-y-3 p-4"><div className="rounded-lg p-4" style={{ backgroundColor: "white" }}><p className="font-semibold">Welcome</p><p className="mt-1 text-sm opacity-70">Your event details and attendee information.</p><Button className="mt-4" style={{ backgroundColor: branding.primary }}>Register now</Button></div></div></div></CardContent></Card></div>;
}

function TeamPanel({ storageKey }: { storageKey: string }) {
  const [teams, setTeams] = useState<Team[]>(() => readStored<Team[]>(storageKey, []));
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Team | null>(null);
  const save = (data: Omit<Team, "id">) => { const next = editing ? teams.map((team) => team.id === editing.id ? { ...team, ...data } : team) : [...teams, { ...data, id: String(Date.now()) }]; setTeams(next); localStorage.setItem(storageKey, JSON.stringify(next)); setOpen(false); setEditing(null); };
  const update = (id: string, data: Partial<Team>) => { const next = teams.map((team) => team.id === id ? { ...team, ...data } : team); setTeams(next); localStorage.setItem(storageKey, JSON.stringify(next)); };
  const remove = (id: string) => { const next = teams.filter((team) => team.id !== id); setTeams(next); localStorage.setItem(storageKey, JSON.stringify(next)); };
  return <div className="space-y-5"><div className="flex items-center justify-between"><div><h2 className="flex items-center gap-2 font-semibold"><Users className="h-5 w-5 text-primary"/>Event team members</h2><p className="mt-1 text-sm text-muted-foreground">Manage the people who can help administer this event.</p></div><CreateButton label="Add Team Member" onClick={() => { setEditing(null); setOpen(true); }}/></div><TeamsTable teams={teams} onEdit={(team) => { setEditing(team); setOpen(true); }} onDelete={remove} onStatusChange={(id, status) => update(id, { status })} onResendInvite={() => {}}/><TeamFormSheet open={open} onOpenChange={setOpen} editingTeam={editing} onSave={save}/></div>;
}

function PaymentGatewayPanel({ storageKey, eventId, eventInfo }: { storageKey: string; eventId: string; eventInfo: EventInfo }) {
  const [gateways, setGateways] = useState<Gateway[]>(() => readStored<Gateway[]>(`${storageKey}-gateways`, []));
  const [assignments, setAssignments] = useState<Assignment[]>(() => readStored<Assignment[]>(`${storageKey}-gateway-assignments`, []));
  const [team] = useState<Team[]>(() => readStored<Team[]>(`event-settings-${eventId}-team`, []));
  const [gatewaySheet, setGatewaySheet] = useState(false);
  const [assignmentSheet, setAssignmentSheet] = useState(false);
  const [gateway, setGateway] = useState({ provider: "", name: "", accountHolder: "" });
  const [assignment, setAssignment] = useState({ gatewayId: "", member: "", modules: [] as string[], sendEmail: false });
  const persistGateways = (next: Gateway[]) => { setGateways(next); localStorage.setItem(`${storageKey}-gateways`, JSON.stringify(next)); };
  const persistAssignments = (next: Assignment[]) => { setAssignments(next); localStorage.setItem(`${storageKey}-gateway-assignments`, JSON.stringify(next)); };
  const gatewayMap = useMemo(() => new Map(gateways.map((item) => [item.id, item])), [gateways]);
  const addGateway = () => { if (!gateway.provider || !gateway.name || !gateway.accountHolder) return; persistGateways([...gateways, { ...gateway, id: String(Date.now()) }]); setGateway({ provider: "", name: "", accountHolder: "" }); setGatewaySheet(false); };
  const assign = () => { if (!assignment.gatewayId || !assignment.member || assignment.modules.length === 0) return; persistAssignments([...assignments, { ...assignment, id: String(Date.now()), eventName: eventInfo.name || `Event ${eventId}` }]); setAssignment({ gatewayId: "", member: "", modules: [], sendEmail: false }); setAssignmentSheet(false); };
  const toggleModule = (module: string, checked: boolean) => setAssignment((current) => ({ ...current, modules: checked ? [...current.modules, module] : current.modules.filter((item) => item !== module) }));
  return <div className="space-y-7">
    <section className="space-y-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="flex items-center gap-2 font-semibold"><Wallet className="h-5 w-5 text-primary"/>Assigned payment gateways</h2><p className="mt-1 text-sm text-muted-foreground">Assign a configured gateway to this event, team member, and module.</p></div><CreateButton label="Assign Event" onClick={() => setAssignmentSheet(true)}/></div><PaginatedTable data={assignments.map((row) => ({ ...row, gateName: gatewayMap.get(row.gatewayId)?.name ?? "Gateway removed", accountHolder: gatewayMap.get(row.gatewayId)?.accountHolder ?? "—", moduleNames: row.modules.join(", "), sendEmailLabel: row.sendEmail ? "Yes" : "No" }))} searchFields={["eventName", "gateName", "accountHolder", "member", "moduleNames"]} searchPlaceholder="Search assignments..." emptyMessage="No gateways assigned to this event yet." renderHeader={() => <h3 className="font-semibold">Event assignments ({assignments.length})</h3>} columns={[{ key: "eventName", header: "Event Name" }, { key: "gateName", header: "Gate Name" }, { key: "accountHolder", header: "Account Holder" }, { key: "member", header: "Team Member Name" }, { key: "moduleNames", header: "Module" }, { key: "sendEmailLabel", header: "Send Email" }]}/></section>
    <section className="space-y-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-semibold">Preconfigured payment gateways</h2><p className="mt-1 text-sm text-muted-foreground">Set up gateway accounts before assigning them to this event.</p></div><CreateButton label="Add Payment Gateway" onClick={() => setGatewaySheet(true)}/></div><PaginatedTable data={gateways} searchFields={["provider", "name", "accountHolder"]} searchPlaceholder="Search payment gateways..." emptyMessage="No payment gateways configured yet." renderHeader={() => <h3 className="font-semibold">Payment gateways ({gateways.length})</h3>} columns={[{ key: "provider", header: "Preconfigured Payment Gateway" }, { key: "name", header: "Gate Name" }, { key: "accountHolder", header: "Account Holder" }]}/></section>
    <Sheet open={gatewaySheet} onOpenChange={setGatewaySheet}><SheetContent className="w-full overflow-y-auto sm:max-w-xl"><SheetHeader><SheetTitle>Add Payment Gateway</SheetTitle><SheetDescription>Configure a payment provider for use by this event.</SheetDescription></SheetHeader><div className="space-y-5 py-5"><Field label="Preconfigured payment gateway *"><Select value={gateway.provider} onValueChange={(provider) => setGateway({ ...gateway, provider })}><SelectTrigger><SelectValue placeholder="Select provider"/></SelectTrigger><SelectContent>{gatewayProviders.map((provider) => <SelectItem key={provider} value={provider}>{provider}</SelectItem>)}</SelectContent></Select></Field><Field label="Gate name *"><Input value={gateway.name} onChange={(e) => setGateway({ ...gateway, name: e.target.value })} placeholder="e.g. Main Razorpay account"/></Field><Field label="Account holder *"><Input value={gateway.accountHolder} onChange={(e) => setGateway({ ...gateway, accountHolder: e.target.value })} placeholder="Account holder name"/></Field><div className="flex gap-3 pt-4"><Button color="primary" className="text-base" onClick={addGateway}>Add gateway</Button><Button variant="outline" className="text-base" onClick={() => setGatewaySheet(false)}>Cancel</Button></div></div></SheetContent></Sheet>
    <Sheet open={assignmentSheet} onOpenChange={setAssignmentSheet}><SheetContent className="w-full overflow-y-auto sm:max-w-xl"><SheetHeader><SheetTitle>Assign Event</SheetTitle><SheetDescription>Choose which gateway and team member handle payments for this event.</SheetDescription></SheetHeader><div className="space-y-5 py-5"><Field label="Event name"><Input value={eventInfo.name || `Event ${eventId}`} readOnly/></Field><Field label="Payment gateway *"><Select value={assignment.gatewayId} onValueChange={(gatewayId) => setAssignment({ ...assignment, gatewayId })}><SelectTrigger><SelectValue placeholder="Select configured gateway"/></SelectTrigger><SelectContent>{gateways.map((item) => <SelectItem key={item.id} value={item.id}>{item.name} · {item.provider}</SelectItem>)}</SelectContent></Select></Field><Field label="Team member *"><Select value={assignment.member} onValueChange={(member) => setAssignment({ ...assignment, member })}><SelectTrigger><SelectValue placeholder="Select team member"/></SelectTrigger><SelectContent>{team.map((member) => <SelectItem key={member.id} value={`${member.firstName} ${member.lastName}`}>{member.firstName} {member.lastName}</SelectItem>)}</SelectContent></Select>{team.length === 0 && <p className="text-xs text-muted-foreground">Add team members in Manage Team first.</p>}</Field><Field label="Modules *"><div className="grid gap-2 sm:grid-cols-2">{modules.map((module) => <label key={module} className="flex items-center gap-2 rounded-md border p-3 text-sm"><Checkbox checked={assignment.modules.includes(module)} onCheckedChange={(checked) => toggleModule(module, !!checked)}/>{module}</label>)}</div></Field><div className="flex items-center justify-between rounded-lg border p-3"><div><p className="text-sm font-medium">Send email</p><p className="text-xs text-muted-foreground">Notify the assigned team member.</p></div><Switch checked={assignment.sendEmail} onCheckedChange={(sendEmail) => setAssignment({ ...assignment, sendEmail })}/></div><div className="flex gap-3 pt-4"><Button color="primary" className="text-base" onClick={assign}>Assign event</Button><Button variant="outline" className="text-base" onClick={() => setAssignmentSheet(false)}>Cancel</Button></div></div></SheetContent></Sheet>
  </div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) { return <div className="space-y-2"><Label className="text-default">{label}</Label>{children}</div>; }
