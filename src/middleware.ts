import { NextResponse } from "next/server";

async function getRedirects() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-redirects`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Always fetch fresh data
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    // Normalize API response
    return Array.isArray(data)
      ? data
      : data?.data
      ? data.data
      : data?.redirects
      ? data.redirects
      : [];
  } catch (error) {
    console.error("Failed to fetch redirects:", error);
    return [];
  }
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