import { clearAll, clearstep } from "@/components-front-end/redux/partnerregister/registerSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";




export function StepSeven(){

   const clinicid = useSelector((state) => state.register.clinicid);
   const dispatch = useDispatch();
   const router = useRouter();


    useEffect(()=>{

      setTimeout(() => {  
         dispatch(clearAll());
         router.push('/partner-login');
      }, 15000);

      toast.success("Partner Registration successfull",{
        position : "bottom-right",
        autoClose : 3000
      })


    },[clinicid]);


    return(<>
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <ToastContainer></ToastContainer>
      <div className="container max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 md:p-14 text-center">
          
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
            Verification Successful 
          </h2>

          
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Your clinic email has been successfully verified.  
            You’re now one step closer to becoming a trusted partner in our
            healthcare network.
          </p>

          {/* Info Box */}
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6 text-left max-w-xl mx-auto">
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                Our team will review your details shortly
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                You’ll receive updates via your registered email
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                Dashboard access will be enabled 
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
               onClick={()=> {
              router.push('/partner-login');
              dispatch(clearstep());
            }}
              className="px-8 py-3 rounded-xl text-white font-semibold bg-[var(--primary)] hover:opacity-90 transition"
            >
              Go to Login
            </button>
            <button
            onClick={()=> {
              router.push('/');
              dispatch(clearstep());
            }}
              className="px-8 py-3 rounded-xl font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition"
            >
              Back to Home
            </button>
          </div>

         
        </div>
      </div>
    </section>
    
    </>);
}