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

export function ClinicNameUpdates({ clinicuuid, location }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clinic, setClinic] = useState(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();

  /* ================= FETCH CLINIC DETAILS ================= */
  useEffect(() => {
    fetchClinicDetails();
  }, [clinicuuid]);

  const fetchClinicDetails = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinics-details/${clinicuuid}`,
      {
        method: "GET",
        headers: clinicHeaders()
      }
    );

    if (res.ok) {
      const result = await res.json();
      setClinic(result.data);
    }
  };

  /* ================= PREFILL FORM ================= */
  useEffect(() => {
    if (open && clinic) {
      Object.entries(clinic).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          setValue(key, value);
        }
      });
    }
  }, [open, clinic, setValue]);

  /* ================= UPDATE ================= */
  const onSubmit = async (data) => {
    setLoading(true);

    const payload = {
      clinicuuid,
      ...data
    };

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

      // Update preview immediately
      setClinic(prev => ({ ...prev, ...data }));

      toast.success(result.message, {
        position: "bottom-right",
        autoClose: 3000
      });
      setTimeout(() => {
        window.location.href = '';
      }, 1000);
      

      setOpen(false);
    } else {
      toast.error("Failed to update clinic");
    }

    setLoading(false);
  };

  if (!clinic) return null;

  return (
    <>
      {/* ================= PREVIEW CARD ================= */}
      <div className="bg-white border rounded-xl p-6 shadow-sm max-w-4xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">{clinic.name}</h2>
           
          </div>

          <button
            onClick={() => setOpen(true)}
            className="btn btn-primary rounded-full"
          >
            <FaEdit /> Edit
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6 text-sm">
          
         
          <Preview label="Country" value={clinic.country.name} />
          <Preview label="City/State" value={clinic.city.name} />
          <Preview label="Address" value={clinic.address} />
           <Preview label="Phone" value={clinic.phone} />
          <Preview label="Email" value={clinic.email} />
          <Preview label="Website" value={clinic.websiteurl} />
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 overflow-y-auto">
          <DialogPanel className="bg-white rounded-xl shadow-xl w-full max-w-3xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6 space-y-6">
                <DialogTitle className="text-xl font-semibold">
                  Edit Clinic Details
                </DialogTitle>

                <Section title="Basic Information">
                  <Input
                    label="Clinic Name"
                    register={register("name", {
                      required: "Clinic name is required"
                    })}
                    error={errors.name}
                  />
                  <Input label="Address" register={register("address")} />
                </Section>

                <Section title="Contact Details">
                  <Input label="Phone" register={register("phone")} />
                  <Input label="Email" type="email" register={register("email")} />
                  <Input label="Website" register={register("websiteurl")} />
                </Section>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-xl">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
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

function Input({ label, register, type = "text", error }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        {...register}
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
