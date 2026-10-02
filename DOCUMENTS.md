# Document Flow – Making the Agent’s Life Simple

Real estate is still a document-heavy business. The goal of TransactionHub is to stop documents from living in email threads, text messages, and random Dropbox folders.

## How documents move

1. **Agent creates transaction** → chooses Listing or Purchase → checklist auto-populates with every standard document.
2. **Invite parties** (buyer, seller, title, lender, coop agent) with one click. Each receives a magic-link portal view limited to their role.
3. **Upload or generate** a document against a checklist item. Status becomes Draft → Sent → Viewed → Signed → Received.
4. **E-sign** (via Documenso / DocuSeal integration) keeps the signed PDF and audit trail inside the same transaction.
5. **Version control** – every re-upload increments the version. The current version is always clear.
6. **At close** – one-click export of the complete file (all signed docs + checklist state) for the brokerage compliance folder or auditor.

## Listing Side – Typical Hand-to-Hand Docs

| Document | Who usually produces it | Who needs to see it |
|----------|-------------------------|---------------------|
| Listing Agreement | Listing Agent + Seller | Listing Agent, Seller, Broker |
| Agency Disclosure | Agent | Seller (and later Buyer) |
| Seller Property Disclosure / TDS | Seller | Buyer, Buyer’s Agent, Title |
| Lead-Based Paint Disclosure | Seller | Buyer (pre-1978 homes) |
| MLS Input / Marketing Auth | Listing Agent | Internal + MLS |
| Executed Purchase Agreement | Both sides | Everyone on the deal |
| Earnest Money Receipt | Title / Escrow | Listing Agent, Seller, Buyer |
| Title Commitment | Title Company | Listing Agent, Seller, Buyer, Lender |
| Closing Disclosure (Seller side) | Title / Lender | Seller, Listing Agent |
| Deed | Title / Attorney | Seller signs, Buyer receives |

## Purchase Side – Typical Hand-to-Hand Docs

| Document | Who usually produces it | Who needs to see it |
|----------|-------------------------|---------------------|
| Buyer Representation Agreement | Buyer’s Agent + Buyer | Buyer, Agent, Broker |
| Purchase Agreement / Offer | Buyer’s Agent | Seller, Listing Agent, Title |
| Counter Offers / Amendments | Either side | All parties |
| Inspection Report + Request for Repair | Buyer / Inspector | Seller, Listing Agent |
| Appraisal | Lender’s appraiser | Lender, Buyer, Agents |
| Loan Estimate + Closing Disclosure | Lender | Buyer (CD ≥ 3 business days before closing) |
| Title Commitment | Title | Buyer, Lender, Agents |
| Homeowners Insurance Binder | Buyer’s insurer | Lender, Title |
| Final Walk-Through | Buyer | Agents |
| Note, Mortgage/DOT, Settlement Statement | Lender + Title | Buyer signs at closing |

## Role Visibility Rules (enforced in app)

- **Listing Agent / TC** – sees everything, can upload anything, manages checklist.
- **Seller** – their disclosures, listing agreement, net proceeds, closing package.
- **Buyer** – purchase contract, their inspections, loan docs, CD, final docs.
- **Title** – title commitment, closing package, wire instructions, deed.
- **Lender** – loan application package, appraisal, conditions, CD.
- **Cooperating Agent** – shared contract documents and their client’s side.

These rules live in `lib/roles.ts` and are applied both in the UI and (when using Supabase) via Row Level Security.

## Next Integrations

- **Documenso** – embed or API for native multi-party e-sign.
- **Paperless-ngx** – OCR + full-text search across the vault.
- **Nextcloud** – collaborative editing of drafts with OnlyOffice.
- State form packs (California RPA, Texas TREC, Florida, etc.) as additional checklist templates.
