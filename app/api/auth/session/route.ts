import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  const user = await currentUser();
  const email = user?.emailAddresses.find(address => address.id === user.primaryEmailAddressId);
  const session = user ? {
    user: { id: user.id, email: email?.emailAddress ?? null, name: user.fullName, emailVerified: email?.verification?.status === "verified" },
    expiresAt: null,
  } : null;
  return NextResponse.json(session, { headers: { "Cache-Control": "private, no-store" } });
}
