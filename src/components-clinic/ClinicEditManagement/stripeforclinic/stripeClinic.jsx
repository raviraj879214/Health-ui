import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import ComponentCard from "@/components/common/ComponentCard";
import { useEffect, useState } from "react";





export function StripeClinic({clinicuuid}){

    const [accountstatus,setAccountStatus] = useState({});
    const [stripeaccountid,setStripeaccountid] = useState("");
    const [clinicdetails,setClinicDetail] = useState({});
    const [createbutton,setCreateButton] = useState(false);


     useEffect(()=>{

        
        if(clinicuuid){
            debugger
            fetchclinicdetails();
        }
        if(stripeaccountid){
            debugger;
            fetchAccountStatus();
        }
        

    },[clinicuuid,stripeaccountid]);

    


    const fetchclinicdetails = async () => {
        //testsetes
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinics-details/${clinicuuid}`, {
        method: "GET",
        headers: clinicHeaders(),
        });
        if (res.ok) {
        const result = await res.json();
            setClinicDetail(result.data);
            console.log("result.data",result.data);
        }
    }


    



    const createStripeAccount = async(clinicuuid)=>{
      debugger;
        setCreateButton(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/payments/create-account`,{
            method : "Post",
            headers : await clinicHeaders(),
            body: JSON.stringify({
                "email" : clinicdetails.email,
                "clinicuuid" : clinicuuid
            }),
        });

        if(res.ok){
            fetchclinicdetails();
        }
        setCreateButton(false);
    }
    


   
        


        const fetchAccountStatus = async()=>{
            const res =  await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/payments/status`,{
                method : "Post",
                headers :await clinicHeaders(),
                body : JSON.stringify({
                    "stripeAccountId" : clinicdetails.stripeaccountid
                })
            });

            if(res.ok){
              const result = await res.json();

              setAccountStatus(result);

            }

        }








    return(<>


       <ComponentCard className="mt-2" title="Stripe Connect">
         {/* {JSON.stringify({clinicdetails})} */}

        
        {clinicdetails.isStripeVerify === null && (
          <>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  Stripe Connect Account
                </h3>


                {!clinicdetails.onboardingUrl === null ? (
                  <p class="text-sm text-gray-600 mb-4">
                    Please provide the email address for the Stripe Connect account. You may use a
                    different email address, but this Stripe account will be associated only with
                    this clinic. Kindly ensure the email is correct before submitting.
                  </p>
                ) : (
                  <p class="text-sm text-gray-600 mb-4">
                    Please note that this page can be accessed only once. You are allowed a maximum of three requests.
                  </p>

                )}

                <div class="flex flex-col sm:flex-row gap-3">



                  {clinicdetails.onboardingUrl === null && (
                    <div class="flex-1">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        value={clinicdetails?.email}
                        disabled={true}
                        type="text"
                        placeholder=""
                        class="" />

                    </div>
                  )}


                  <div class="flex items-end">

                    {clinicdetails.onboardingUrl === null && (
                      <button
                        disabled={createbutton}
                        onClick={() => createStripeAccount(clinicuuid)} class="btn btn-primary">

                        {createbutton ? (<>
                          <div role="status">
                            <svg aria-hidden="true" class="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                          </div>
                        </>) : (<>Create Account</>)}
                      </button>
                    )}


                    {clinicdetails.onboardingUrl !== null && (

                      <>
                        <div className="gap-3">
                          <a
                            href={clinicdetails.onboardingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary gap-2"
                          >
                            Click to onboard
                          </a>

                          <button
                            onClick={()=>{
                              setClinicDetail(prev => ({
                                ...prev,
                                onboardingUrl: null
                              }));

                            }}
                          className="ml-1 btn btn-primary gap-2">
                              Reset
                          </button>
                        </div>
                      </>
                    )}








                  </div>
                </div>
              </div>

              <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm  ">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                  Stripe Account Status
                </h3>

                <div class="text-sm text-gray-600 space-y-3">

                  <div class="flex justify-between">
                    <span>Status</span>
                    <span class="font-medium text-yellow-600">Pending</span>
                  </div>


                  <div class="flex justify-between">
                    <span>Payouts</span>
                    <span class="text-gray-500">{accountstatus.account?.payouts_enabled}</span>
                  </div>


                  <div class="flex justify-between">
                    <span>Charges</span>
                    <span class="text-gray-500">Not enabled</span>
                  </div>


                  <div class="flex justify-between">
                    <span>Account Type</span>
                    <span class="text-gray-900 font-medium">Express</span>
                  </div>


                  <div class="pt-3 border-t text-xs text-gray-500">
                    Complete Stripe onboarding to enable payouts.
                  </div>
                </div>
              </div>


            </div>
          </>
        )}


        {clinicdetails.isStripeVerify === "ACTIVE" && (
          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4">
                Clinic Stripe Account Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <strong>Account ID:</strong>{" "}
                  {clinicdetails.stripeaccountid || "-"}
                </div>

                <div>
                  <strong>Email:</strong>{" "}
                  {clinicdetails.email || "-"}
                </div>

                <div>
                  <strong>Charges Enabled:</strong>{" "}
                  <span className={accountstatus?.account?.charges_enabled ? "text-green-600" : "text-red-600"}>
                    {accountstatus?.account?.charges_enabled ? "Yes" : "No"}
                  </span>
                </div>

                <div>
                  <strong>Payouts Enabled:</strong>{" "}
                  <span className={accountstatus?.account?.payouts_enabled ? "text-green-600" : "text-red-600"}>
                    {accountstatus?.account?.payouts_enabled ? "Yes" : "No"}
                  </span>
                </div>

                <div>
                  <strong>Account Type:</strong> Express
                </div>

                <div>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600 font-medium">
                    Active
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                This clinic is fully onboarded and can receive payments.
              </p>
            </div>
          </div>
        )}



        {clinicdetails.isStripeVerify === "RESTRICTED" && (
          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-red-600">
                Stripe Account Restricted
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <strong>Account ID:</strong>{" "}
                  {clinicdetails.stripeaccountid || "-"}
                </div>

                <div>
                  <strong>Email:</strong>{" "}
                  {clinicdetails.email || "-"}
                </div>

                <div>
                  <strong>Charges Enabled:</strong>{" "}
                  <span className={accountstatus?.account?.charges_enabled ? "text-green-600" : "text-red-600"}>
                    {accountstatus?.account?.charges_enabled ? "Yes" : "No"}
                  </span>
                </div>

                <div>
                  <strong>Payouts Enabled:</strong>{" "}
                  <span className={accountstatus?.account?.payouts_enabled ? "text-green-600" : "text-red-600"}>
                    {accountstatus?.account?.payouts_enabled ? "Yes" : "No"}
                  </span>
                </div>

                <div>
                  <strong>Status:</strong>{" "}
                  <span className="text-red-600 font-medium">
                    Restricted
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                This Stripe account has missing or pending requirements.
                Please complete onboarding in Stripe Dashboard.
              </p>
            </div>
          </div>
        )}






    </ComponentCard>


    
    </>);
}