import fs from "fs";
import path from "path";

export async function POST(req) {
  const body = await req.json();

  const publicPath = path.join(process.cwd(), "public");

  fs.writeFileSync(
    path.join(publicPath, "sitemap.xml"),
    body.sitemap,
    "utf8"
  );

  fs.writeFileSync(
    path.join(publicPath, "robots.txt"),
    body.robots,
    "utf8"
  );

  fs.writeFileSync(
    path.join(publicPath, "llms.txt"),
    body.llms,
    "utf8"
  );

  return Response.json({
    success: true,
    message: "SEO files updated",
  });
}