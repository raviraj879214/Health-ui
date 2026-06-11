import { NextResponse } from "next/server";

let cache: any[] = [];
let lastFetch = 0;

async function getRedirects() {
  const now = Date.now();

  // cache for 5 minutes
  if (cache.length > 0 && now - lastFetch < 5 * 60 * 1000) {
    return cache;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-redirects`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  /**
   * Normalize API response (VERY IMPORTANT)
   * supports:
   * 1. array
   * 2. { data: [] }
   * 3. { redirects: [] }
   */
  const redirects = Array.isArray(data)
    ? data
    : data?.data
    ? data.data
    : data?.redirects
    ? data.redirects
    : [];

  cache = redirects;
  lastFetch = now;

  return redirects;
}

export async function middleware(request: Request) {
  const path = new URL(request.url).pathname;

  const redirects = await getRedirects();

  if (!Array.isArray(redirects)) {
    return NextResponse.next();
  }

  const match = redirects.find(
    (r: any) => r.old_url === path
  );

  if (match) {
    return NextResponse.redirect(
      new URL(match.new_url, request.url),
      301
    );
  }

  return NextResponse.next();
}