
"use client";
import { adminHeaders } from "@/components/utils/adminHeader";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export  function Redirections() {


  const [items, setItems] = useState([]);


  const [form, setForm] = useState({ oldUrl: "", newUrl: "" });

  const handleAdd =async () => {
    if (!form.oldUrl || !form.newUrl) return;

   
    const res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/seo/create-redirects`,{
      method : "Post",
      headers : await adminHeaders(),
      body : JSON.stringify({
        "oldurl" :  form.oldUrl,
        "newurl" : form.newUrl
      })
    });
    if(res.ok){
      const result= await res.json();
      setItems(prev=>[
        ...prev,
        result.data
      ]);
      setForm({ oldUrl: "", newUrl: "" });

      toast.success("301 created successfully", {position: "bottom-right",autoClose: 3000,});
    }
  };

  const deleteRedirects = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this 301 redirect?"
  );

  if (!confirmDelete) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/seo/delete-redirects/${id}`,
    {
      method: "DELETE",
      headers: await adminHeaders(),
    }
  );

  if (res.ok) {
    setItems((prev) => prev.filter((x) => x.id !== id));

    toast.success("301 deleted successfully", {
      position: "bottom-right",
      autoClose: 3000,
    });
  } else {
    toast.error("Failed to delete redirect");
  }
};



  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  useEffect(() => {
      fetchredirects();
  }, []);


  const fetchredirects = async()=>{
    const res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/seo/get-redirects`,{
      method : "GET",
      headers : await adminHeaders()
    });

    if(res.ok){
      debugger;
      const result= await res.json();
      setItems(result.data);
    }
  }

  return (
    <div className=" bg-gray-50 p-6">
      <ToastContainer></ToastContainer>
      <div className="mx-auto ">
       
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            URL Redirect Manager
          </h1>
        </div>

        {/* Form */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm border">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            
            <input
              type="text"
              placeholder="Old URL (e.g. /test)"
              value={form.oldUrl}
              onChange={(e) =>
                setForm({ ...form, oldUrl: e.target.value })
              }
              className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="New URL (e.g. /)"
              value={form.newUrl}
              onChange={(e) =>
                setForm({ ...form, newUrl: e.target.value })
              }
              className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={handleAdd}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Add Redirect
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm text-gray-600">
              <tr>
                <th className="p-4">Old URL</th>
                <th className="p-4">New URL</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4 text-gray-700">{item.old_url}</td>
                  <td className="p-4 text-gray-700">{item.new_url}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteRedirects(item.id)}
                      className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="p-6 text-center text-gray-400"
                  >
                    No redirects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}