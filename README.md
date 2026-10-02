# TransactionHub

**The all-in-one per-transaction portal for real estate teams.**

Built for listing and buying agents who want every document, checklist, signature, and party in one place — so the agent’s life becomes as simple as possible.

- One workspace per transaction
- Role-based views: Listing Agent · Buyer · Seller · Title/Escrow · Lender · Cooperating Agent
- Pre-loaded checklists for Listing and Purchase sides with every common US residential document
- Document vault with version history, role permissions, and e-sign ready hooks
- Kanban tasks + automated key dates
- Team dashboard for the brokerage / team
- Open-source first (Next.js, Supabase/Prisma, Documenso, Paperless-ngx, shadcn)

This repo is designed to be pushed straight to GitHub and extended. It is intentionally lean so you can plug in the heavy open-source pieces without reinventing them.

## Why this exists

Real estate agents lose hours chasing:
- “Did the seller sign the disclosure?”
- “Where is the latest counter?”
- “Has title received the earnest money receipt?”
- “Is the CD in the file yet?”

TransactionHub turns every deal into a single source of truth. Agents invite the parties once. Everyone sees only what they need. Documents flow hand-to-hand digitally with audit trails. Checklists auto-apply based on whether you are listing or buying.

## Core Document Checklists (US Residential)

### Listing Side (Seller Representation)
- Listing Agreement / Exclusive Right to Sell
- Agency Disclosure
- Seller Property Disclosure / Transfer Disclosure Statement
- Lead-Based Paint Disclosure (pre-1978)
- Seller’s Property Questionnaire / Additional Disclosures
- MLS Listing Input / Coming Soon forms
- Marketing Authorization
- Fair Housing / Equal Opportunity forms
- HOA / Condo Resale Certificate request (if applicable)
- Payoff Authorization / Statement request
- Keys / Access / Lockbox agreement
- Any price reduction or extension addenda

### Purchase Side (Buyer Representation)
- Buyer Representation / Agency Agreement
- Agency Disclosure
- Residential Purchase Agreement / Offer
- Counter Offers & Amendments
- Earnest Money Deposit Receipt
- Contingency Removal forms
- Buyer’s Inspection Advisory / Elections
- Request for Repair / Seller Response
- Appraisal Order & Report
- Loan Estimate & Closing Disclosure
- Title Commitment / Preliminary Title Report
- Homeowners Insurance Binder
- Final Walk-Through Verification
- Closing documents package (Deed, Note, Mortgage/DOT, Settlement Statement)

The app ships with these as template checklists. Agents can customize per state or brokerage.

## Tech Stack (Open-Source Heavy)

| Layer              | Choice                          | Why |
|--------------------|---------------------------------|-----|
| Framework          | Next.js 15 (App Router)         | Modern, server components, easy deploy |
| UI                 | Tailwind + shadcn/ui            | Beautiful, accessible, zero design debt |
| Auth & Multi-tenant| Clerk or Supabase Auth          | Organizations = Transactions |
| Database           | Prisma + Postgres (or Supabase) | Type-safe, RLS ready |
| Documents          | Paperless-ngx or Nextcloud + Supabase Storage | OCR + search + permissions |
| E-Signature        | Documenso or DocuSeal           | Self-hosted DocuSign alternative |
| Kanban             | shadcn-kanban-board or @dnd-kit | Drag-and-drop tasks |
| Realtime           | Supabase Realtime               | Live updates across parties |
| Email              | Resend                          | Transactional notifications |

## Getting Started

```bash
git clone https://github.com/YOUR_ORG/transactionhub.git
cd transactionhub
cp .env.example .env.local
# Fill in DATABASE_URL, CLERK or SUPABASE keys, etc.
npm install
npx prisma db push
npx prisma db seed   # optional demo data
npm run dev
```

Open http://localhost:3000

## Project Structure

```
app/
  (auth)/               # login / invite flows
  (dashboard)/          # team overview
  transactions/
    [id]/               # per-transaction portal
      page.tsx          # overview
      documents/        # vault + checklist
      tasks/            # kanban
      parties/          # roles & contacts
      messages/         # thread
  api/                  # route handlers
components/
  documents/            # upload, viewer, status
  checklist/            # interactive checklist
  roles/                # role badges & gates
  ui/                   # shadcn
lib/
  prisma.ts
  roles.ts              # permission helpers
  checklists.ts         # listing & purchase templates
prisma/
  schema.prisma
  seed.ts
public/
docs/                   # additional guides
```

## Role Permissions (High Level)

- **Listing Agent** – full control, can invite everyone, manage checklist, upload anything
- **Buyer / Seller** – their side’s documents & tasks, e-sign, messages
- **Title / Escrow** – title commitment, closing package, wire instructions
- **Lender** – loan docs, conditions, CD
- **Cooperating Agent** – shared contract docs, their client’s side, coordination tasks

All enforced via Prisma + RLS (when using Supabase) and UI gates.

## Making the Agent’s Life Simple

1. Create transaction → choose Listing or Purchase → checklist auto-loads.
2. Invite parties by email (magic link). Roles are assigned once.
3. Upload or generate a document → mark status (Draft / Sent / Signed / Received).
4. Key dates calculate from Effective Date and fire reminders.
5. Everything lives in the transaction folder. No more “which email thread?”
6. At close, export the complete audit-ready file with one click.

## Next Steps / Integrations

- Wire Documenso for native e-sign
- Point document storage at Paperless-ngx or Nextcloud
- Add MLS data pull (via local MLS API or Zapier)
- Commission split calculator
- State-specific form packs (California RPA, Texas TREC, etc.)

## License

MIT — free for teams, brokerages, and transaction coordinators.

---

Built for real estate teams who want to close more deals with less chaos.
Contributions and state-specific checklist PRs welcome.
