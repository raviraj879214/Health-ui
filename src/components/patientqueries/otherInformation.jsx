"use client";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_NODEJS_URL;

export function OtherInformation({ id }) {
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ================= GET ALL ================= */
  const fetchAll = async () => {
    const res = await fetch(`${API}/v1/other-information/${id}`);
    const data = await res.json();
    setFields(data);
  };

  useEffect(() => {
    if (id) fetchAll();
  }, [id]);

  /* ================= ADD ================= */
  const addField = () => {
    setFields([...fields, { label: "", value: "" }]);
  };

  /* ================= UPDATE LOCAL ================= */
  const handleChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  /* ================= DELETE ================= */
  const deleteRow = async (index, rowId) => {
    if (rowId) {
      await fetch(`${API}/v1/other-information/${rowId}`, {
        method: "DELETE",
      });
      await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/webhook/patient-request`,{method : "Get"});
    }
    setFields(fields.filter((_, i) => i !== index));
    
  };

  /* ================= SAVE (POST + PUT) ================= */
  const handleSave = async () => {
    const newErrors = {};
    fields.forEach((f, i) => {
      if (!f.label?.trim()) newErrors[`label-${i}`] = "Required";
      if (!f.value?.trim()) newErrors[`value-${i}`] = "Required";
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    // POST (new rows)
    const createPayload = fields.filter((f) => !f.id);
    if (createPayload.length > 0) {
      await fetch(`${API}/v1/other-information/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          createPayload.map(({ label, value }) => ({ label, value }))
        ),
      });
    }

    // PUT (existing rows)
    const updatePayload = fields.filter((f) => f.id);
    for (const row of updatePayload) {
      await fetch(`${API}/v1/other-information/${row.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: row.label,
          value: row.value,
        }),
      });
    }

    await fetchAll();
    setLoading(false);
    await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/webhook/patient-request`,{method : "Get"});
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 bg-white rounded-lg space-y-5 shadow">
    <div className="flex items-center justify-between relative group">
      <h3 className="text-lg font-semibold">Other Information</h3>
      <div className="relative">
        <Info className="w-5 h-5 text-gray-500 cursor-pointer" />

       
        <div className="absolute right-0 mt-2 w-96 rounded-lg bg-white shadow-xl border border-gray-200 p-4
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                        transition-all duration-200 z-50">
          
          <h4 className="text-sm font-semibold mb-2 text-gray-800">
            What can be added here?
          </h4>

          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Patient medical background (e.g. diabetes, BP)</li>
            <li>• Previous treatments or surgeries</li>
            <li>• Budget or insurance preferences</li>
            <li>• Urgency or preferred treatment timeline</li>
            <li>• Travel or accommodation requirements</li>
            <li>• Any special notes from patient or admin</li>
          </ul>

          <div className="mt-3 text-xs text-gray-500">
            Example: <br />
            <span className="italic">
              “Patient prefers senior doctor with 10+ years experience and wants treatment within 2 weeks.”
            </span>
          </div>
        </div>
      </div>
    </div>

      {fields.map((field, index) => (
        <div key={index} className="grid grid-cols-5 gap-3 items-end">
          <div className="col-span-2">
            <input
              value={field.label}
              onChange={(e) =>
                handleChange(index, "label", e.target.value)
              }
              className="w-full border rounded px-3 py-2"
              placeholder="Label"
            />
            {errors[`label-${index}`] && (
              <p className="text-red-500 text-xs">
                {errors[`label-${index}`]}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <input
              value={field.value}
              onChange={(e) =>
                handleChange(index, "value", e.target.value)
              }
              className="w-full border rounded px-3 py-2"
              placeholder="Value"
            />
            {errors[`value-${index}`] && (
              <p className="text-red-500 text-xs">
                {errors[`value-${index}`]}
              </p>
            )}
          </div>

          <button
            onClick={() => deleteRow(index, field.id)}
            className="h-10 bg-red-100 text-red-600 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex justify-between pt-4 border-t">
        <button
          onClick={addField}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Field
        </button>

        <button
          onClick={handleSave}
          disabled={loading}
          className="px-5 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
