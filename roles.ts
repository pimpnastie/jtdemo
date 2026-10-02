/**
 * Role helpers and permission matrix.
 * Keep agent life simple: clear visibility rules.
 */

export type Role =
  | "LISTING_AGENT"
  | "BUYER"
  | "SELLER"
  | "TITLE_AGENT"
  | "LENDER"
  | "COOPERATING_AGENT"
  | "TRANSACTION_COORDINATOR";

export const ROLE_LABELS: Record<Role, string> = {
  LISTING_AGENT: "Listing Agent",
  BUYER: "Buyer",
  SELLER: "Seller",
  TITLE_AGENT: "Title / Escrow",
  LENDER: "Lender",
  COOPERATING_AGENT: "Cooperating Agent",
  TRANSACTION_COORDINATOR: "Transaction Coordinator",
};

export const ROLE_COLORS: Record<Role, string> = {
  LISTING_AGENT: "bg-blue-100 text-blue-800",
  BUYER: "bg-green-100 text-green-800",
  SELLER: "bg-amber-100 text-amber-800",
  TITLE_AGENT: "bg-purple-100 text-purple-800",
  LENDER: "bg-indigo-100 text-indigo-800",
  COOPERATING_AGENT: "bg-teal-100 text-teal-800",
  TRANSACTION_COORDINATOR: "bg-slate-100 text-slate-800",
};

/** What each role can typically see / do */
export const PERMISSIONS = {
  canManageParties: ["LISTING_AGENT", "TRANSACTION_COORDINATOR"] as Role[],
  canUploadAnyDocument: ["LISTING_AGENT", "TRANSACTION_COORDINATOR", "TITLE_AGENT"] as Role[],
  canEditChecklist: ["LISTING_AGENT", "TRANSACTION_COORDINATOR"] as Role[],
  canViewCommissions: ["LISTING_AGENT", "COOPERATING_AGENT", "TRANSACTION_COORDINATOR"] as Role[],
  canViewLoanDocs: ["LISTING_AGENT", "BUYER", "LENDER", "TRANSACTION_COORDINATOR"] as Role[],
  canViewSellerDisclosures: ["LISTING_AGENT", "SELLER", "BUYER", "COOPERATING_AGENT", "TITLE_AGENT", "TRANSACTION_COORDINATOR"] as Role[],
};

export function can(role: Role | undefined, action: keyof typeof PERMISSIONS): boolean {
  if (!role) return false;
  return PERMISSIONS[action].includes(role);
}

export function isAgentRole(role: Role): boolean {
  return role === "LISTING_AGENT" || role === "COOPERATING_AGENT" || role === "TRANSACTION_COORDINATOR";
}
