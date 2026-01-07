"use client";

import { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";

export function PackageStepSix({ clinicuuid, packageid }) {
  const [open, setOpen] = useState(true);
  const [definitions, setDefinitions] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [button, setButton] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  /* ---------------- Fetch definitions & saved values ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const defRes = await fetch(
          `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-custom/definitions`,
          { headers: clinicHeaders() }
        );
        const defs = await defRes.json();
        setDefinitions(Array.isArray(defs) ? defs : []);

        const valRes = await fetch(
          `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-custom/${packageid}`,
          { headers: clinicHeaders() }
        );
        const vals = await valRes.json();

        const valueMap = {};
        if (Array.isArray(vals)) {
          vals.forEach((v) => {
            valueMap[v.fieldId] =
              v.valueText ??
              v.valueNumber ??
              v.valueBoolean ??
              v.valueDate ??
              "";
          });
        }

        setFieldValues(valueMap);
      } catch (err) {
        console.error(err);
        setError("Failed to load package fields.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [packageid]);

  /* ---------------- Helpers ---------------- */
  const handleChange = (field, value) => {
    setFieldValues((prev) => ({ ...prev, [field.id]: value }));
    setErrors((prev) => ({ ...prev, [field.id]: null }));
  };

  const isEditorEmpty = (value) => {
    if (!value) return true;
    const text = value.replace(/<[^>]*>/g, "").trim();
    return text.length === 0;
  };

  const validateFields = () => {
    const newErrors = {};

    definitions.forEach((field) => {
      const value = fieldValues[field.id];

      switch (field.fieldType) {
        case "text":
          if (isEditorEmpty(value)) {
            newErrors[field.id] = "This field is required";
          }
          break;

        case "number":
          if (value === "" || value === undefined || isNaN(value)) {
            newErrors[field.id] = "Please enter a valid number";
          }
          break;

        case "boolean":
          if (value !== true) {
            newErrors[field.id] = "This field must be checked";
          }
          break;

        case "date":
          if (!value) {
            newErrors[field.id] = "Please select a date";
          }
          break;

        default:
          break;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- Save ---------------- */
  const handleSave = async () => {
    if (!validateFields()) return;

    setButton(true);

    try {
      const payload = {
        packageId: packageid,
        fields: definitions.map((d) => {
          const val = fieldValues[d.id];
          return {
            fieldId: d.id,
            valueText: d.fieldType === "text" ? val : undefined,
            valueNumber: d.fieldType === "number" ? Number(val) : undefined,
            valueBoolean: d.fieldType === "boolean" ? Boolean(val) : undefined,
            valueDate: d.fieldType === "date" ? val : undefined,
          };
        }),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-custom`,
        {
          method: "POST",
          headers: {
            ...clinicHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Save failed");

      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("pckid", packageid);
      params.set("steppackage", "7");
      router.push(`?${params.toString()}`);
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setButton(false);
    }
  };

  const onCancel = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("pckid", packageid);
    params.set("steppackage", "5");
    router.push(`?${params.toString()}`);
  };

  /* ---------------- UI ---------------- */
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
          <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Package Other Information</span>
            <span className="text-green-400">Step 6/7</span>
          </DialogTitle>

          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}

          {!loading && !error && (
            <div className="border theme-border rounded h-[500px] overflow-auto p-4">
              {definitions.map((field) => (
                <div key={field.id} className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    {field.label}
                  </label>

                  {field.fieldType === "text" && (
                    <>
                      <Editor
                        className="h-[200px]"
                        value={fieldValues[field.id] || ""}
                        onTextChange={(e) =>
                          handleChange(field, e.htmlValue)
                        }
                      />
                      {errors[field.id] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[field.id]}
                        </p>
                      )}
                    </>
                  )}

                  {field.fieldType === "number" && (
                    <>
                      <input
                        type="number"
                        className="w-full border rounded p-2"
                        value={fieldValues[field.id] || ""}
                        onChange={(e) =>
                          handleChange(field, e.target.value)
                        }
                      />
                      {errors[field.id] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[field.id]}
                        </p>
                      )}
                    </>
                  )}

                  {field.fieldType === "boolean" && (
                    <>
                      <input
                        type="checkbox"
                        className="h-5 w-5"
                        checked={fieldValues[field.id] || false}
                        onChange={(e) =>
                          handleChange(field, e.target.checked)
                        }
                      />
                      {errors[field.id] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[field.id]}
                        </p>
                      )}
                    </>
                  )}

                  {field.fieldType === "date" && (
                    <>
                      <input
                        type="date"
                        className="w-full border rounded p-2"
                        value={fieldValues[field.id] || ""}
                        onChange={(e) =>
                          handleChange(field, e.target.value)
                        }
                      />
                      {errors[field.id] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[field.id]}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onCancel}
              className="rounded-md border px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={button}
              className="btn btn-primary"
            >
              {button ? "Saving..." : "Save & Next"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
