import { cookies } from "next/headers";

export async function GET() {
  
  const cookieStore = await cookies(); 
  const firstname =await cookieStore.get("adminfirstname")?.value || null;


  return new Response(JSON.stringify({ firstname }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

