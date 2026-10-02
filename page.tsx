import Link from "next/link";
import { ROLE_LABELS } from "@/lib/roles";

// Demo data – replace with Prisma queries in production
const DEMO_TRANSACTIONS = [
  {
    id: "tx-1",
    title: "742 Evergreen Terrace – Listing",
    address: "742 Evergreen Terrace, Springfield",
    type: "LISTING",
    status: "UNDER_CONTRACT",
    price: 425000,
    closingDate: "2026-11-15",
    parties: ["Listing Agent", "Seller", "Buyer", "Title", "Lender"],
    docsComplete: 12,
    docsTotal: 18,
  },
  {
    id: "tx-2",
    title: "221B Baker Street – Purchase",
    address: "221B Baker Street, London-on-Hudson",
    type: "PURCHASE",
    status: "ACTIVE",
    price: 890000,
    closingDate: "2026-12-01",
    parties: ["Listing Agent", "Buyer", "Cooperating Agent"],
    docsComplete: 5,
    docsTotal: 22,
  },
  {
    id: "tx-3",
    title: "1600 Pennsylvania Ave – Listing",
    address: "1600 Pennsylvania Ave",
    type: "LISTING",
    status: "ACTIVE",
    price: 1250000,
    closingDate: null,
    parties: ["Listing Agent", "Seller"],
    docsComplete: 8,
    docsTotal: 16,
  },
];

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "bg-sky-100 text-sky-800",
  UNDER_CONTRACT: "bg-amber-100 text-amber-800",
  PENDING: "bg-purple-100 text-purple-800",
  CLOSED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">
                TH
              </div>
              <span className="font-semibold">TransactionHub</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-sm text-slate-600">Team Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
              + New Transaction
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Active Transactions</h1>
            <p className="mt-1 text-sm text-slate-600">
              All listings and purchases for the team. Click any deal to open its portal.
            </p>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="rounded-full bg-slate-200 px-3 py-1">All</span>
            <span className="rounded-full bg-white px-3 py-1 border">Listings</span>
            <span className="rounded-full bg-white px-3 py-1 border">Purchases</span>
            <span className="rounded-full bg-white px-3 py-1 border">Closing Soon</span>
          </div>
        </div>

        <div className="grid gap-4">
          {DEMO_TRANSACTIONS.map((tx) => (
            <Link
              key={tx.id}
              href={`/transactions/${tx.id}`}
              className="block rounded-xl border bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-slate-900">{tx.title}</h2>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        STATUS_COLORS[tx.status] || "bg-slate-100"
                      }`}
                    >
                      {tx.status.replace("_", " ")}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {tx.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{tx.address}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tx.parties.map((p) => (
                      <span
                        key={p}
                        className="rounded-md bg-slate-50 px-2 py-0.5 text-xs text-slate-600 border"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-900">
                    ${tx.price.toLocaleString()}
                  </p>
                  {tx.closingDate && (
                    <p className="text-sm text-slate-500">Closes {tx.closingDate}</p>
                  )}
                  <div className="mt-2">
                    <div className="flex items-center justify-end gap-2 text-xs text-slate-500">
                      <span>
                        Docs {tx.docsComplete}/{tx.docsTotal}
                      </span>
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${(tx.docsComplete / tx.docsTotal) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
