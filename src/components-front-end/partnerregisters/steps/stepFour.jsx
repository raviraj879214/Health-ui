"use client";

import { nextStep, prevStep } from "@/components-front-end/redux/partnerregister/registerSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export function StepFour() {
  const step = useSelector((state) => state.register.step);
  const uuid = useSelector((state) => state.register.uuid);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedCountryId = watch("country");


  useEffect(() => {
    fetchCountries();
  }, [uuid]);


  useEffect(() => {
    if (uuid && countries.length) {
      fetchClinicDetails();
    }
  }, [uuid, countries]);


  useEffect(() => {
    if (selectedCountryId) {
      const country = countries.find(
        (c) => c.id === Number(selectedCountryId)
      );
      setStates(country?.cities || []);
      setValue("state", "");
    } else {
      setStates([]);
    }
  }, [selectedCountryId, countries, setValue]);


  const fetchCountries = async () => {
    debugger;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/get-country-state`
      );
      const result = await res.json();
      setCountries(result.country || []);
    } catch (err) {
      console.error("Failed to load countries", err);
    }
  };

  const fetchClinicDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/get-clinic-details/${uuid}`
      );

      if (res.ok) {
        const result = await res.json();
        setValue("country", result.data.country);
        setValue("state", result.data.city);
      }
    } catch (err) {
      console.error("Failed to load clinic details", err);
    }
  };

 
  const onCreate = async (data) => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/insert-clinic-details`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            country: data.country,
            city: data.state,
            uuid,
          }),
        }
      );

      if (res.ok) {
        dispatch(nextStep());
      }
    } catch (err) {
      console.error("Submit failed", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="my-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Become a Partner</h2>
          <p className="text-gray-600">
            Join our partner network and grow your business.
          </p>
        </div>

        <div className="relative bg-white rounded-2xl shadow-xl border p-8">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white px-5 py-1 rounded-full text-sm">
            Step {step} of 4
          </div>

          <form onSubmit={handleSubmit(onCreate)}>
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Clinic Location
                </h4>
                <p className="text-sm text-gray-600">
                  This helps improve your clinic listing.
                </p>
              </div>

              <div className="space-y-4">
               
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Country
                  </label>
                  <select
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className="w-full rounded-xl border px-4 py-3"
                  >
                    <option value="">Select Country</option>
                    {countries.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>

               
                <div>
                  <label className="block text-sm font-medium mb-2">
                    State / City
                  </label>
                  <select
                    {...register("state", {
                      required: "State is required",
                    })}
                    disabled={!states.length}
                    className="w-full rounded-xl border px-4 py-3"
                  >
                    <option value="">Select State</option>
                    {states.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="my-10 border-t"></div>

            <div className="flex justify-between">
              <button
                type="button"
                className="px-6 py-2 border rounded-xl"
                onClick={() => dispatch(prevStep())}
              >
                ← Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? (<>
                    <svg aria-hidden="true" className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                </>) : "Continue →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
