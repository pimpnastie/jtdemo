/**
 * Demo seed – creates a sample listing transaction with parties and checklist.
 * Run with: npx tsx prisma/seed.ts
 * Requires DATABASE_URL and prisma generate.
 */

import { PrismaClient, TransactionType, PartyRole } from "@prisma/client";
import { getChecklistForType } from "../lib/checklists";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding TransactionHub demo data...");

  // Clean existing (optional – comment out in production)
  await prisma.message.deleteMany();
  await prisma.taskAssignee.deleteMany();
  await prisma.task.deleteMany();
  await prisma.document.deleteMany();
  await prisma.checklistItem.deleteMany();
  await prisma.party.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();

  const agent = await prisma.user.create({
    data: {
      email: "alex@teamrealty.com",
      name: "Alex Rivera",
      phone: "555-0100",
    },
  });

  const seller = await prisma.user.create({
    data: {
      email: "homer@springfield.com",
      name: "Homer Simpson",
    },
  });

  const tx = await prisma.transaction.create({
    data: {
      title: "742 Evergreen Terrace – Listing",
      address: "742 Evergreen Terrace",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      type: TransactionType.LISTING,
      status: "UNDER_CONTRACT",
      price: 425000,
      effectiveDate: new Date("2026-09-15"),
      closingDate: new Date("2026-11-15"),
    },
  });

  await prisma.party.createMany({
    data: [
      {
        transactionId: tx.id,
        userId: agent.id,
        role: PartyRole.LISTING_AGENT,
        name: "Alex Rivera",
        email: "alex@teamrealty.com",
        company: "Team Realty",
        joinedAt: new Date(),
      },
      {
        transactionId: tx.id,
        userId: seller.id,
        role: PartyRole.SELLER,
        name: "Homer & Marge Simpson",
        email: "homer@springfield.com",
        joinedAt: new Date(),
      },
      {
        transactionId: tx.id,
        role: PartyRole.BUYER,
        name: "Ned Flanders",
        email: "ned@leftorium.com",
      },
      {
        transactionId: tx.id,
        role: PartyRole.COOPERATING_AGENT,
        name: "Jordan Lee",
        email: "jordan@otherbroker.com",
        company: "Other Broker",
      },
      {
        transactionId: tx.id,
        role: PartyRole.TITLE_AGENT,
        name: "Taylor Kim",
        email: "taylor@cleartitle.com",
        company: "Clear Title Co",
      },
      {
        transactionId: tx.id,
        role: PartyRole.LENDER,
        name: "Morgan Chase",
        email: "morgan@firstnational.com",
        company: "First National",
      },
    ],
  });

  const checklist = getChecklistForType("LISTING");
  await prisma.checklistItem.createMany({
    data: checklist.map((item, idx) => ({
      transactionId: tx.id,
      key: item.key,
      label: item.label,
      category: item.category,
      required: item.required,
      sortOrder: item.sortOrder,
      completed: idx < 7, // first 7 done for demo
      completedAt: idx < 7 ? new Date() : null,
    })),
  });

  console.log("Seed complete. Transaction ID:", tx.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
