"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ComponentCard from "@/components/common/ComponentCard";
import { useConfirm } from "@/hooks/useConfirm";
import { formatBrazilDate } from "@/lib/formatDate";

export function License({ clinicuuid }) {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { ConfirmDialog, confirm } = useConfirm();

  const fetchLicense = async (uuid = clinicuuid) => {
    if (!uuid) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-accreditation/get-license/${uuid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("clinic_access")}`,
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch licenses.");
      }

      setLicenses(result.data || []);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadLicense = async (selectedFile) => {
    if (!selectedFile || !clinicuuid) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("clinicuuid", clinicuuid);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-accreditation/upload-license`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("clinic_access")}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed.");
      }

      await fetchLicense();
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    await uploadLicense(selectedFile);

    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const deleteLicense = async (id) => {
        debugger;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-accreditation/delete-license/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("clinic_access")}`,
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Delete failed.");
      }

      fetchLicense();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (clinicuuid) {
      fetchLicense();
    }
  }, [clinicuuid]);

  return (
    <ComponentCard title="Hospital License (mandatório: foto do Alvará Sanitário vigente)">
      <ConfirmDialog />

      <div className="space-y-5">
        <div>
          <label
            htmlFor="license"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Upload License
          </label>

          <input
            id="license"
            type="file"
           accept=".jpg,.jpeg,.png,.pdf"
            disabled={loading}
            onChange={handleFileChange}
            className="block w-full rounded-lg border border-slate-300 bg-white text-sm text-slate-600 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-white hover:file:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {loading && (
          <div className="text-center text-sm text-slate-500">
            Loading...
          </div>
        )}

        {!loading && licenses.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 py-10 text-center text-sm text-slate-500">
            No licenses uploaded.
          </div>
        )}

       {!loading && licenses.length > 0 && (
  <div className="grid gap-4">
    {licenses.map((license) => (
      <div
        key={license.id}
        className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
      >
        <div className="flex items-center gap-4">
        {/\.(jpg|jpeg|png|gif|webp)$/i.test(license.image) ? (
  <img
    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=license/${license.image}`}
    alt="Hospital License"
    className="h-24 w-24 rounded-xl border border-slate-200 object-cover"
  />
) : /\.pdf$/i.test(license.image) ? (
  <iframe
    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=license/${license.image}`}
    title="Hospital License PDF"
    className="h-24 w-24 rounded-xl border border-slate-200"
  />
) : null}

          <div>
            <h4 className="text-base font-semibold text-slate-800">
              Hospital License
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              Uploaded on {formatBrazilDate(license.createdAt)}
            </p>

            <a
              href={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=license/${license.image}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center rounded-md bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
            >
              View Full Image
            </a>
          </div>
        </div>

        <button
          onClick={() => deleteLicense(license.id)}
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
)}
      </div>
    </ComponentCard>
  );
}