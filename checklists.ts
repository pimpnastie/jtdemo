/**
 * Pre-built checklists for US residential transactions.
 * These are the documents that typically pass hand-to-hand.
 * Agents can override or extend per brokerage / state.
 */

export type ChecklistTemplateItem = {
  key: string;
  label: string;
  category: string;
  required: boolean;
  sortOrder: number;
  description?: string;
};

export const LISTING_CHECKLIST: ChecklistTemplateItem[] = [
  // Pre-listing / Listing Agreement
  { key: "listing_agreement", label: "Listing Agreement / Exclusive Right to Sell", category: "Listing", required: true, sortOrder: 10 },
  { key: "agency_disclosure_seller", label: "Agency Disclosure (Seller)", category: "Agency", required: true, sortOrder: 20 },
  { key: "seller_property_disclosure", label: "Seller Property Disclosure / TDS", category: "Disclosure", required: true, sortOrder: 30, description: "State-required property condition disclosure" },
  { key: "lead_paint_disclosure", label: "Lead-Based Paint Disclosure", category: "Disclosure", required: true, sortOrder: 40, description: "Required for homes built before 1978" },
  { key: "seller_questionnaire", label: "Seller's Property Questionnaire / Addenda", category: "Disclosure", required: false, sortOrder: 50 },
  { key: "fair_housing_seller", label: "Fair Housing / Equal Opportunity Acknowledgment", category: "Compliance", required: true, sortOrder: 60 },
  { key: "mls_input", label: "MLS Listing Input / Coming Soon Form", category: "Marketing", required: true, sortOrder: 70 },
  { key: "marketing_auth", label: "Marketing Authorization / Photo Release", category: "Marketing", required: false, sortOrder: 80 },
  { key: "lockbox_access", label: "Lockbox / Access Agreement", category: "Access", required: false, sortOrder: 90 },
  { key: "hoa_resale_request", label: "HOA / Condo Resale Certificate Request", category: "HOA", required: false, sortOrder: 100 },
  { key: "payoff_auth", label: "Mortgage Payoff Authorization", category: "Title", required: true, sortOrder: 110 },
  // Under Contract
  { key: "executed_purchase_agreement", label: "Fully Executed Purchase Agreement", category: "Contract", required: true, sortOrder: 200 },
  { key: "counter_offers", label: "Counter Offers / Amendments", category: "Contract", required: false, sortOrder: 210 },
  { key: "earnest_money_receipt", label: "Earnest Money Deposit Receipt", category: "Contract", required: true, sortOrder: 220 },
  { key: "seller_repair_response", label: "Seller Response to Repair Request", category: "Inspection", required: false, sortOrder: 230 },
  { key: "title_commitment", label: "Title Commitment / Preliminary Report", category: "Title", required: true, sortOrder: 240 },
  { key: "closing_disclosure_seller", label: "Closing Disclosure / Settlement Statement (Seller)", category: "Closing", required: true, sortOrder: 300 },
  { key: "deed", label: "Deed (Warranty / Grant)", category: "Closing", required: true, sortOrder: 310 },
  { key: "keys_codes", label: "Keys, Codes, Garage Openers Handover", category: "Closing", required: true, sortOrder: 320 },
];

export const PURCHASE_CHECKLIST: ChecklistTemplateItem[] = [
  // Buyer Representation
  { key: "buyer_rep_agreement", label: "Buyer Representation / Agency Agreement", category: "Agency", required: true, sortOrder: 10 },
  { key: "agency_disclosure_buyer", label: "Agency Disclosure (Buyer)", category: "Agency", required: true, sortOrder: 20 },
  { key: "fair_housing_buyer", label: "Fair Housing Acknowledgment (Buyer)", category: "Compliance", required: true, sortOrder: 30 },
  // Offer & Contract
  { key: "purchase_agreement", label: "Residential Purchase Agreement / Offer", category: "Contract", required: true, sortOrder: 100 },
  { key: "counter_offers", label: "Counter Offers & Amendments", category: "Contract", required: false, sortOrder: 110 },
  { key: "earnest_money_receipt", label: "Earnest Money Deposit Receipt", category: "Contract", required: true, sortOrder: 120 },
  { key: "contingency_removal", label: "Contingency Removal Form(s)", category: "Contract", required: false, sortOrder: 130 },
  // Due Diligence
  { key: "inspection_advisory", label: "Buyer's Inspection Advisory / Elections", category: "Inspection", required: true, sortOrder: 200 },
  { key: "inspection_report", label: "Home Inspection Report", category: "Inspection", required: false, sortOrder: 210 },
  { key: "request_for_repair", label: "Request for Repair", category: "Inspection", required: false, sortOrder: 220 },
  { key: "appraisal_report", label: "Appraisal Report", category: "Appraisal", required: true, sortOrder: 230 },
  { key: "termite_report", label: "Termite / Pest Report & Clearance", category: "Inspection", required: false, sortOrder: 240 },
  // Financing & Title
  { key: "loan_estimate", label: "Loan Estimate", category: "Loan", required: true, sortOrder: 300 },
  { key: "loan_commitment", label: "Loan Commitment / Conditional Approval", category: "Loan", required: true, sortOrder: 310 },
  { key: "title_commitment", label: "Title Commitment / Preliminary Title Report", category: "Title", required: true, sortOrder: 320 },
  { key: "hoa_docs", label: "HOA Documents / Resale Certificate", category: "HOA", required: false, sortOrder: 330 },
  { key: "homeowners_insurance", label: "Homeowners Insurance Binder", category: "Insurance", required: true, sortOrder: 340 },
  // Closing
  { key: "closing_disclosure", label: "Closing Disclosure (CD)", category: "Closing", required: true, sortOrder: 400, description: "Must be received at least 3 business days before closing" },
  { key: "final_walkthrough", label: "Final Walk-Through Verification", category: "Closing", required: true, sortOrder: 410 },
  { key: "promissory_note", label: "Promissory Note", category: "Closing", required: true, sortOrder: 420 },
  { key: "mortgage_deed_of_trust", label: "Mortgage / Deed of Trust", category: "Closing", required: true, sortOrder: 430 },
  { key: "settlement_statement", label: "Settlement Statement / Closing Statement", category: "Closing", required: true, sortOrder: 440 },
];

export function getChecklistForType(type: "LISTING" | "PURCHASE"): ChecklistTemplateItem[] {
  return type === "LISTING" ? LISTING_CHECKLIST : PURCHASE_CHECKLIST;
}
