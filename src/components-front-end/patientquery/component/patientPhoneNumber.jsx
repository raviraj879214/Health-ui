import { useState } from "react";
import { ToastContainer } from "react-toastify";




export function PatientPhoneNumber(){


  
















    return(<>

      <ToastContainer />

      <div className="bg-gray-50 flex flex-col items-center py-10 px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-2 max-w-3xl">
          What is your Phone Number ?
        </h2>

        <p className="text-sm text-blue-700 mb-6">
          We will use this phone number to send you details about your request.
          If number verification fails, you can try contacting one of our coordinators directly by skipping this step.
        </p>



        <div className="flex justify-center w-full">
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 flex items-center justify-center text-gray-400" />

            <form

              className="p-6 flex flex-col gap-3"
            >

              <p>Coming Soon</p>




              <div className="pt-3">
                <button
                  type="submit"
                  className="btn btn-primary">

                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </>);
}