import Link from "next/link";
import { getChecklistForType } from "@/lib/checklists";
import { ROLE_LABELS, ROLE_COLORS } from "@/lib/roles";

// Demo data for a single transaction portal
const DEMO = {
  id: "tx-1",
  title: "742 Evergreen Terrace – Listing",
  address: "742 Evergreen Terrace, Springfield, IL 62701",
  type: "LISTING" as const,
  status: "UNDER_CONTRACT",
  price: 425000,
  effectiveDate: "2026-09-15",
  closingDate: "2026-11-15",
  parties: [
    { role: "LISTING_AGENT", name: "Alex Rivera", email: "alex@teamrealty.com", company: "Team Realty" },
    { role: "SELLER", name: "Homer & Marge Simpson", email: "homer@springfield.com", company: null },
    { role: "BUYER", name: "Ned Flanders", email: "ned@leftorium.com", company: null },
    { role: "COOPERATING_AGENT", name: "Jordan Lee", email: "jordan@otherbroker.com", company: "Other Broker" },
    { role: "TITLE_AGENT", name: "Taylor Kim", email: "taylor@cleartitle.com", company: "Clear Title Co" },
    { role: "LENDER", name: "Morgan Chase", email: "morgan@firstnational.com", company: "First National" },
  ],
};

export default function TransactionPortalPage({
  params,
}: {
  params: { id: string };
}) {
  const checklist = getChecklistForType(DEMO.type);
  const completedCount = 7; // demo

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-slate-500 hover:text-slate-800">
              ← Dashboard
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-900">{DEMO.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              UNDER CONTRACT
            </span>
            <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
              Invite Party
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        {/* Header card */}
        <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{DEMO.title}</h1>
              <p className="mt-1 text-slate-600">{DEMO.address}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                <span>Type: <strong className="text-slate-800">{DEMO.type}</strong></span>
                <span>Price: <strong className="text-slate-800">${DEMO.price.toLocaleString()}</strong></span>
                <span>Effective: <strong className="text-slate-800">{DEMO.effectiveDate}</strong></span>
                <span>Closing: <strong className="text-slate-800">{DEMO.closingDate}</strong></span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Document progress</p>
              <p className="text-2xl font-bold text-slate-900">
                {completedCount}/{checklist.length}
              </p>
              <div className="mt-1 h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${(completedCount / checklist.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex gap-1 border-b">
          {["Overview", "Documents", "Tasks", "Parties", "Messages"].map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2.5 text-sm font-medium ${
                i === 1
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Documents / Checklist – main column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border bg-white shadow-sm">
              <div className="flex items-center justify-between border-b px-5 py-3">
                <h2 className="font-semibold text-slate-900">
                  {DEMO.type === "LISTING" ? "Listing" : "Purchase"} Document Checklist
                </h2>
                <button className="text-sm text-blue-600 hover:underline">
                  + Upload Document
                </button>
              </div>
              <ul className="divide-y">
                {checklist.map((item, idx) => {
                  const done = idx < completedCount;
                  return (
                    <li
                      key={item.key}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50"
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                          done
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-slate-300"
                        }`}
                      >
                        {done && (
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-medium ${done ? "text-slate-500 line-through" : "text-slate-900"}`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.category}
                          {item.required && " · Required"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {done ? (
                          <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">
                            Signed
                          </span>
                        ) : (
                          <button className="rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50">
                            Upload / Sign
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Sidebar – Parties & Key Dates */}
          <div className="space-y-4">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">Parties</h3>
              <ul className="mt-3 space-y-3">
                {DEMO.parties.map((p) => (
                  <li key={p.role} className="flex items-start gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-slate-200" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.email}</p>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          ROLE_COLORS[p.role as keyof typeof ROLE_COLORS] || "bg-slate-100"
                        }`}
                      >
                        {ROLE_LABELS[p.role as keyof typeof ROLE_LABELS] || p.role}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">Key Dates</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-slate-600">Effective / Acceptance</span>
                  <span className="font-medium">{DEMO.effectiveDate}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-600">Inspection Period Ends</span>
                  <span className="font-medium">2026-09-29</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-600">Financing Contingency</span>
                  <span className="font-medium">2026-10-15</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-600">Closing</span>
                  <span className="font-medium text-blue-600">{DEMO.closingDate}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
              <p className="font-medium">Agent tip</p>
              <p className="mt-1 text-blue-800">
                All required documents are tracked here. When a party uploads or signs,
                the checklist updates and everyone with access is notified. No more
                “did you get my email?”
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
