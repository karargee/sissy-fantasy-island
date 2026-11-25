import { NextResponse } from "next/server";

// True only when ADMIN_PASSWORD is set AND the request sends it in x-admin-pass.
// (Comparing against an unset env var would let header-less requests through.)
export function isAdmin(req) {
  const pass = process.env.ADMIN_PASSWORD;
  return !!pass && req?.headers?.get("x-admin-pass") === pass;
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
