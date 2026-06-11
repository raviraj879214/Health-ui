import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "llms.txt");
  const data = fs.readFileSync(filePath, "utf8");

  return new Response(data, {
    headers: { "Content-Type": "text/plain" },
  });
}