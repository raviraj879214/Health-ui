// app/additional-success/page.js
import { Suspense } from "react";
import { Success } from "../../components/(AdditionalServices)/(additionalsuccess)/succes";

export const metadata = {
  title: "Success | " + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600 text-lg animate-pulse">Loading...</p>
        </div>
      }
    >
      <Success />
    </Suspense>
  );
}