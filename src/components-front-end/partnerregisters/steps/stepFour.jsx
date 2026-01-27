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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  const formatCEP = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);


  const accessAddresViaCep = async (value) => {
    const cep = value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_VIACEP_URL}/${cep}/json/`
      );

      if (!res.ok) return;

      const result = await res.json();
      if (result.erro) return;

      setValue("cep", formatCEP(result.cep));
      setValue("street", result.logradouro || "");
      setValue("neighborhood", result.bairro || "");
      setValue("city", result.localidade || "");
      setValue("state", result.uf || "");

     
      setValue("unidade", result.unidade || "");
      setValue("estado", result.estado || "");
      setValue("regiao", result.regiao || "");
      setValue("ibge", result.ibge || "");
      setValue("gia", result.gia || "");
      setValue("ddd", result.ddd || "");
      setValue("siafi", result.siafi || "");
      setValue("number", result.addressnumber || "");
      setValue("complement", result.complemento || "");
    } catch (err) {
      console.error("ViaCEP failed", err);
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
            uuid,
            cep: data.cep.replace(/\D/g, ""),
            street: data.street,
            complement: data.complement,  
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,

            addressnumber: data.number,
            unidade: data.unidade,
            estado: data.estado,
            regiao: data.regiao,

            ibge: data.ibge,
            gia: data.gia,
            ddd: data.ddd,
            siafi: data.siafi,

          }),
        }
      );

      if (res.ok) dispatch(nextStep());
    } catch (err) {
      console.error("Submit failed", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (uuid) {
      fetchClinicDetails();
    }
  }, [uuid]);


   const fetchClinicDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/get-clinic-details/${uuid}`
      );

      if (res.ok) {
         debugger;
        
        const result = await res.json();
         console.log("result",result);

         setValue("cep",formatCEP(result.data.cep));

         setValue("street",result.data.street);
         setValue("complement",result.data.complement);
         setValue("neighborhood",result.data.neighborhood);
         setValue("city",result.data.citycep);
         setValue("state",result.data.state);




          setValue("unidade", result.data.unidade || "");
      setValue("estado", result.data.estado || "");
      setValue("regiao", result.data.regiao || "");
      setValue("ibge", result.data.ibge || "");
      setValue("gia", result.data.gia || "");
      setValue("ddd", result.data.ddd || "");
      setValue("siafi", result.data.siafi || "");
      setValue("number", result.data.addressnumber || "");









      }

    } catch (err) {
      console.error("Failed to load clinic details", err);
    }
  };



  return (
    <div className="my-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="relative bg-white rounded-2xl shadow-xl border p-8">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white px-5 py-1 rounded-full text-sm">
            Step {step} of 6
          </div>

          <form onSubmit={handleSubmit(onCreate)}>
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">Clinic Address Details</h4>
              </div>

              <div className="space-y-4">
                {/* CEP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">CEP</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                    {...register("cep", {
                      required: "CEP is required",
                      validate: (value) =>
                        value.replace(/\D/g, "").length === 8 ||
                        "CEP must have 8 digits",
                      onChange: (e) => {
                        const formatted = formatCEP(e.target.value);
                        setValue("cep", formatted);
                        accessAddresViaCep(formatted);
                      },
                    })}
                  />
                  {errors.cep && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.cep.message}
                    </p>
                  )}
                </div>

                {/* Street */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Street</label>
                  <input
                    className="mt-1 w-full rounded-xl border px-4 py-3"
                    {...register("street", { required: "Street is required" })}
                  />
                </div>

                {/* Address Number + Complement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address Number
                    </label>
                    <input
                      className="mt-1 w-full rounded-xl border px-4 py-3"
                      {...register("number", { required: "Address number is required" })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Complement (optional)
                    </label>
                    <input
                      className="mt-1 w-full rounded-xl border px-4 py-3"
                      {...register("complement")}
                    />
                  </div>
                </div>

                {/* Neighborhood */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Neighborhood</label>
                  <input
                    className="mt-1 w-full rounded-xl border px-4 py-3"
                    {...register("neighborhood", { required: "Neighborhood is required" })}
                  />
                </div>

                {/* City + State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      className="mt-1 w-full rounded-xl border px-4 py-3"
                      {...register("city", { required: "City is required" })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">State (UF)</label>
                    <input
                      className="mt-1 w-full rounded-xl border px-4 py-3"
                      {...register("state", { required: "State is required" })}
                    />
                  </div>
                </div>

                {/* Additional ViaCEP fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["unidade","estado","regiao","ibge","gia","ddd","siafi"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700">
                        {field.toUpperCase()}
                      </label>
                      <input
                        className="mt-1 w-full rounded-xl border px-4 py-3 bg-gray-50"
                        readOnly
                        {...register(field)}
                      />
                    </div>
                  ))}
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

              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? "Loading..." : "Continue →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
