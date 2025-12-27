import { cookies } from "next/headers";

export async function GET() {
  

   const cookieStore = await cookies(); 
  const lastname =await cookieStore.get("adminlastname")?.value || null;


  return new Response(JSON.stringify({ lastname }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

