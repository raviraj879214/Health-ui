import { cookies } from "next/headers";

export async function POST(req) {
  const { userid } = await req.json();

  const cookieStore = await cookies(); // ✅ await cookies()

  cookieStore.set({
    name: "adminuserid",
    value: userid,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  return new Response(
    JSON.stringify({ message: "adminuserid set" }),
    { status: 200 }
  );
}
