export const dynamic = "force-dynamic";

import { VerifyStripe } from "../../../components/constultationsucces/verifyStripe";

export default function Page({ searchParams }) {
  const url = searchParams?.url;

  return (
    <>
      <VerifyStripe url={url} />
    </>
  );
}