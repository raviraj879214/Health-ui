"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { clinicHeaders } from "../utils/clinicHeaders";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";

export function ClinicNameUpdates({ clinicuuid }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clinic, setClinic] = useState(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();

  /* ---------- Fetch clinic details ---------- */
  useEffect(() => {
    if (clinicuuid) fetchClinicDetails();
  }, [clinicuuid]);

  const fetchClinicDetails = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinics-details/${clinicuuid}`,
      { method: "GET", headers: clinicHeaders() }
    );

    if (res.ok) {
      const result = await res.json();
      setClinic(result.data);
    }
  };

  /* ---------- Set form values when modal opens ---------- */
  useEffect(() => {
    if (open && clinic) {
      Object.entries(clinic).forEach(([key, value]) => {
        if (value !== null && value !== undefined) setValue(key, value);
      });
    }
  }, [open, clinic, setValue]);

  /* ---------- Format CEP ---------- */
  const formatCEP = (value) =>
    value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2").slice(0, 9);

  /* ---------- ViaCEP fetch ---------- */
  const accessAddresViaCep = async (cepValue) => {
    const cep = cepValue.replace(/\D/g, "");
    if (cep.length !== 8) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_VIACEP_URL}/${cep}/json/`);
      if (!res.ok) return;
      const result = await res.json();
      if (result.erro) return;

      setValue("cep", formatCEP(result.cep));
      setValue("street", result.logradouro || "");
     
      setValue("complement", result.complemento || "");
      setValue("neighborhood", result.bairro || "");
      setValue("citycep", result.localidade || "");
      setValue("state", result.uf || "");


       setValue("addressnumber", ""); // always empty for user input
      setValue("unidade", result.unidade || "");
      setValue("estado", result.estado || "");
      setValue("regiao", result.regiao || "");
      setValue("ibge", result.ibge || "");
      setValue("gia", result.gia || "");
      setValue("ddd", result.ddd || "");
      setValue("siafi", result.siafi || "");


    } catch (err) {
      console.error("ViaCEP failed", err);
    }
  };

  /* ---------- Submit ---------- */
  const onSubmit = async (data) => {
    setLoading(true);
    const payload = { clinicuuid, ...data };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/update-clinics-name`,
        {
          method: "PUT",
          headers: clinicHeaders(),
          body: JSON.stringify(payload)
        }
      );

      if (res.ok) {
        const result = await res.json();
        setClinic((prev) => ({ ...prev, ...data }));
        toast.success(result.message, { position: "bottom-right", autoClose: 3000 });
        setTimeout(() => window.location.reload(), 1000);
        setOpen(false);
      } else {
        toast.error("Failed to update clinic");
      }
    } catch (err) {
      console.error("Submit failed", err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!clinic) return null;

  return (
    <>
      {/* ==================== Clinic Preview ==================== */}
      <div className="bg-white border rounded-xl p-6 shadow-sm max-w-4xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {clinic.name || "No Information"}{" "}
              <span className="text-sm font-medium text-gray-500">
                (CNPJ: {clinic.cnpj || "No Information"})
              </span>
            </h2>
          </div>

          <button onClick={() => setOpen(true)} className="btn btn-primary rounded-full">
            <FaEdit /> Edit
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
          <Preview label="Website" value={clinic.websiteurl} />

          <h2 className="text-2xl font-semibold col-span-2 mt-6">Clinic Address</h2>
          <Preview label="CEP" value={clinic.cep} />
          <Preview label="Street" value={clinic.street} />
          <Preview label="Address Number" value={clinic.addressnumber} />
          <Preview label="Complement" value={clinic.complement} />
          <Preview label="Neighborhood" value={clinic.neighborhood} />
          <Preview label="City" value={clinic.citycep} />
          <Preview label="State" value={clinic.state} />
          <Preview label="Unidade" value={clinic.unidade} />
          <Preview label="Estado" value={clinic.estado} />
          <Preview label="Região" value={clinic.regiao} />
          <Preview label="IBGE" value={clinic.ibge} />
          <Preview label="GIA" value={clinic.gia} />
          <Preview label="DDD" value={clinic.ddd} />
          <Preview label="SIAFI" value={clinic.siafi} />
        </div>
      </div>

      {/* ==================== Modal ==================== */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 overflow-y-auto">
          <DialogPanel className="bg-white rounded-xl shadow-xl w-full max-w-3xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6 space-y-6 overflow-scroll max-h-[75vh]">
                <DialogTitle className="text-xl font-semibold">Edit Clinic Details</DialogTitle>

                <Section title="Basic Information">
                  <Input
                    label="Clinic Name"
                    register={register("name", { required: "Clinic name is required" })}
                    error={errors.name}
                  />
                </Section>

                <Section title="Contact Details">
                  <Input label="Website" register={register("websiteurl")} />
                </Section>

                <Section title="Clinic Address">
                  <Input label="CEP" register={register("cep")} onChange={(e) => accessAddresViaCep(formatCEP(e.target.value))} />
                  <Input label="Street" register={register("street")} />
                  <Input label="Address Number" register={register("addressnumber")} />
                  <Input label="Complement (Optional)" register={register("complement")} />
                  <Input label="Neighborhood" register={register("neighborhood")} />
                  <Input label="City" register={register("citycep")} />
                  <Input label="State" register={register("state")} />
                  <Input label="Unidade" register={register("unidade")} />
                  <Input label="Estado (Full Name)" register={register("estado")} />
                  <Input label="Região" register={register("regiao")} />
                  <Input label="IBGE" register={register("ibge")} />
                  <Input label="GIA" register={register("gia")} />
                  <Input label="DDD" register={register("ddd")} />
                  <Input label="SIAFI" register={register("siafi")} />
                </Section>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-xl">
                <button type="button" onClick={() => setOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary">
                  {loading ? "Updating..." : "Update Clinic"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

/* ================== REUSABLE UI ================== */
function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Input({ label, register, type = "text", error, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        {...register}
        onChange={(e) => {
          register?.onChange?.(e);
          if (onChange) onChange(e);
        }}
        className="w-full border p-2 rounded"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}

function Preview({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}
