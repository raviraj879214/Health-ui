// app/api/treatment-click/route.js

import store from "../../../components-front-end/lib/store";

export async function POST(req) {
  const { name } = await req.json();

  store.incrementTreatment(name);

  return Response.json({
    success: true,
    count: store.getTreatmentCount(name),
  });
}

export async function GET() {
  return Response.json(
    store.getAllTreatmentCounts()
  );
}