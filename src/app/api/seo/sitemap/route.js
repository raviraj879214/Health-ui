import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "sitemap.xml");

  try {
    const data = fs.readFileSync(filePath, "utf8");

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Unable to read sitemap.xml:", error);

    return new Response("Sitemap not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}