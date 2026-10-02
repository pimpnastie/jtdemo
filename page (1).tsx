import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              TH
            </div>
            <span className="text-xl font-semibold tracking-tight">TransactionHub</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Open Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Every document. Every party.
            <br />
            <span className="text-blue-600">One transaction portal.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Built for real estate teams that list and buy. Stop chasing emails and missing
            disclosures. Give every party — buyer, seller, title, lender, cooperating agent —
            a clean view of exactly what they need.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
            >
              View Team Dashboard
            </Link>
            <a
              href="https://github.com"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              GitHub Repo
            </a>
          </div>
        </div>

        <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Per-Transaction Workspaces",
              desc: "One private portal per deal. Invite parties once. Roles control visibility automatically.",
            },
            {
              title: "Document Checklists That Matter",
              desc: "Pre-loaded Listing and Purchase checklists covering every common hand-to-hand document — disclosures, contracts, title, CD, deed.",
            },
            {
              title: "Agent-First Simplicity",
              desc: "Upload, mark status, send for signature. Key dates calculate themselves. The file is always audit-ready.",
            },
            {
              title: "Role Views",
              desc: "Listing Agent · Buyer · Seller · Title · Lender · Cooperating Agent. Everyone sees only what they need.",
            },
            {
              title: "Open-Source Core",
              desc: "Next.js + Prisma + shadcn. Plug in Documenso for e-sign, Paperless-ngx for OCR, Supabase for realtime.",
            },
            {
              title: "Team Dashboard",
              desc: "See every active listing and purchase across the team. Closing soon, missing docs, overdue tasks at a glance.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-slate-500">
        TransactionHub · MIT License · Built for real estate teams
      </footer>
    </div>
  );
}
