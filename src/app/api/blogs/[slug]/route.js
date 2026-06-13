

export async function GET(request, { params }) {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-blogs-details/${slug}`,{
      method : "Get"
    }
  );

  const data = await response.json();

  return Response.json(data);
}