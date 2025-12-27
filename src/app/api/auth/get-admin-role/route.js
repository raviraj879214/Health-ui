import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies(); // ✅ await cookies()
  const adminrole = cookieStore.get("adminrole")?.value ?? null;

  return Response.json({ adminrole });
}
