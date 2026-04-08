import { Success } from "../../components/(AdditionalServices)/(additionalsuccess)/succes";

export const metadata = {
  title: "Success | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function Page() {
    
    return (
        <>
         
            <Success />
        </>
    );
}