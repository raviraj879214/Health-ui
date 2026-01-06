"use client";

import { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";

export function PackageStepSix({ clinicuuid, packageid }) {
  const [open, setOpen] = useState(true);
  const [definitions, setDefinitions] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [button,setButton] = useState(false);


  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch definitions and saved values
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch definitions
        const defRes = await fetch(
          `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-custom/definitions`,
          { headers: clinicHeaders() }
        );
        const defs = await defRes.json();
        setDefinitions(Array.isArray(defs) ? defs : []);

        // Fetch saved values
        const valRes = await fetch(
          `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-custom/${packageid}`,
          { headers: clinicHeaders() }
        );
        const vals = await valRes.json();
        const valueMap = {};
        if (Array.isArray(vals)) {
          vals.forEach((v) => {
            valueMap[v.fieldId] = v.valueText || v.valueNumber || v.valueBoolean || v.valueDate || "";
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

  const handleChange = (field, value) => {
    setFieldValues((prev) => ({ ...prev, [field.id]: value }));
  };

  const handleSave = async () => {
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

      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-custom`, {
        method: "POST",
        headers: {
          ...clinicHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save");



        const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("pckid", packageid);
      params.set("steppackage", "7");
      router.push(`?${params.toString()}`);



      
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    }
    setButton(true);
  };

  const onCancel = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("pckid", packageid);
    params.set("steppackage", "5");
    router.push(`?${params.toString()}`);
  };

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
            <div className="border theme-border rounded h-[500px] overflow-auto p-4 bg-white">
              {definitions.length === 0 && <div>No fields defined.</div>}

              {definitions.map((field) => (
                <div key={field.id} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 mt-2 font-bold">
                    <b>{field.label}</b>
                  </label>

                  {field.fieldType === "text" ? (
                    <Editor
                      className="h-[200px] max-h-full overflow-y-auto"
                      value={fieldValues[field.id] || ""}
                      onTextChange={(e) => handleChange(field, e.htmlValue)}
                    />
                  ) : field.fieldType === "number" ? (
                    <input
                      type="number"
                      value={fieldValues[field.id] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full border rounded p-2"
                    />
                  ) : field.fieldType === "boolean" ? (
                    <input
                      type="checkbox"
                      checked={fieldValues[field.id] || false}
                      onChange={(e) => handleChange(field, e.target.checked)}
                      className="h-5 w-5"
                    />
                  ) : field.fieldType === "date" ? (
                    <input
                      type="date"
                      value={fieldValues[field.id] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full border rounded p-2"
                    />
                  ) : null}
                </div>
              ))}

             
            </div>
          )}
           <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={onCancel}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-700 shadow-sm border hover:bg-gray-100 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={button}
                  className="btn btn-primary"
                >
                  
                  {
                    button ? "saving.." : "Save & Next"
                  }
                </button>
              </div>
              
        </DialogPanel>
      </div>
    </Dialog>
  );
}
