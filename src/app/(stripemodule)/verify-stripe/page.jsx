




"use client";

import { useSearchParams } from "next/navigation";
import {VerifyStripe} from "../../../components/constultationsucces/verifyStripe";

export default function Page() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url"); 



  return (
    <>



      <VerifyStripe url={url} />

    </>
  );
}