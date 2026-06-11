"use client";

import { Editor } from "primereact/editor";
import { useForm, Controller } from "react-hook-form";
import ComponentCard from "../common/ComponentCard";
import { useRef, useState } from "react";

export function CreateBlogs() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      readingMinutes: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      og_structure: "",
    },
  });

  // ================= BLOG IMAGE =================
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const inputRef = useRef(null);

  // ================= MEDICAL WRITER =================
  const [writerName, setWriterName] = useState("");
  const [writerFile, setWriterFile] = useState(null);
  const [writerPreview, setWriterPreview] = useState("");
  const [writerError, setWriterError] = useState("");

  // ================= REVIEWER =================
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerFile, setReviewerFile] = useState(null);
  const [reviewerPreview, setReviewerPreview] = useState("");
  const [reviewerError, setReviewerError] = useState("");

  // ================= BLOG IMAGE VALIDATION =================
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setImageError("");

    const url = URL.createObjectURL(selectedFile);
    const img = new Image();

    img.onload = () => {
      if (img.width !== 1080 || img.height !== 608) {
        setImageError("Image must be exactly 1080 × 608 pixels");
        URL.revokeObjectURL(url);
        e.target.value = "";
        return;
      }

      setFile(selectedFile);
      setPreview(url);
    };

    img.src = url;
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setImageError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  // ================= MEDICAL IMAGE HANDLER =================
  const handleMedicalImage = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    if (type === "writer") {
      setWriterFile(file);
      setWriterPreview(url);
    } else {
      setReviewerFile(file);
      setReviewerPreview(url);
    }
  };

  const removeMedicalImage = (type) => {
    if (type === "writer") {
      setWriterFile(null);
      setWriterPreview("");
    } else {
      setReviewerFile(null);
      setReviewerPreview("");
    }
  };

  // ================= SUBMIT =================
  const onCreate = async (data) => {
    if (imageError) return;

    if (!writerName || !writerFile || !reviewerName || !reviewerFile) {
      alert("Please fill Medical Writer & Reviewer details");
      return;
    }

    const resToken = await fetch("/api/auth/get-token");
    const { token } = await resToken.json();

    const formData = new FormData();

    // BLOG DATA
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("readingMinutes", data.readingMinutes);
    formData.append("metaTitle", data.metaTitle);
    formData.append("metaKeywords", data.metaKeywords);
    formData.append("metaDescription", data.metaDescription);
    formData.append("og_structure", data.og_structure);

    // MEDICAL
    formData.append("writerName", writerName);
    formData.append("reviewerName", reviewerName);

    // IMAGES
    if (file) formData.append("image", file);
    if (writerFile) formData.append("writerImage", writerFile);
    if (reviewerFile) formData.append("reviewerImage", reviewerFile);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-blog/create-blog`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (res.ok) {
      reset();

      setFile(null);
      setPreview(null);
      setWriterName("");
      setReviewerName("");
      setWriterFile(null);
      setReviewerFile(null);
      setWriterPreview("");
      setReviewerPreview("");
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">

        <ComponentCard title="Create Blog">

          <form onSubmit={handleSubmit(onCreate)}>
            <div className="space-y-6">

              {/* ================= TITLE ================= */}
              <div>
                <label className="text-sm font-medium">Title</label>
                <input
                  className="h-11 w-full border rounded-lg px-3"
                  {...register("title", { required: "Title required" })}
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
              </div>

              {/* ================= READING ================= */}
              <div>
                <label className="text-sm font-medium">Reading Minutes</label>
                <input
                  type="number"
                  className="h-11 w-full border rounded-lg px-3"
                  {...register("readingMinutes", {
                    required: "Required",
                    min: { value: 1, message: "Min 1" },
                    max: { value: 120, message: "Max 120" },
                  })}
                />
                {errors.readingMinutes && <p className="text-red-500">{errors.readingMinutes.message}</p>}
              </div>

              {/* ================= CONTENT ================= */}
              <Controller
                name="content"
                control={control}
                rules={{ required: "Content required" }}
                render={({ field }) => (
                  <Editor
                    value={field.value}
                    onTextChange={(e) => field.onChange(e.htmlValue)}
                    style={{ height: "300px" }}
                  />
                )}
              />

              {/* ================= BLOG IMAGE ================= */}
              <div>
                {!preview ? (
                  <label className="h-64 flex items-center justify-center border-dashed border rounded-lg cursor-pointer">
                    <input type="file" hidden ref={inputRef} onChange={handleFileChange} />
                    Upload Blog Image (1080×608)
                  </label>
                ) : (
                  <div className="relative h-64 flex justify-center items-center border rounded-lg">
                    <img src={preview} className="max-h-full object-contain" />
                    <button onClick={handleRemove} type="button" className="absolute top-2 right-2 bg-black text-white px-2">
                      Remove
                    </button>
                  </div>
                )}
                {imageError && <p className="text-red-500">{imageError}</p>}
              </div>

              {/* ================= MEDICAL TEAM ================= */}
              <div className="grid grid-cols-12 gap-6">

                {/* WRITER */}
                <div className="col-span-12 md:col-span-6 border p-4 rounded-lg space-y-3">
                  <p className="font-medium text-blue-600">Medical Writer</p>

                  <input
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Writer Name"
                    value={writerName}
                    onChange={(e) => setWriterName(e.target.value)}
                  />

                  <input type="file" onChange={(e) => handleMedicalImage(e, "writer")} />

                  {writerPreview && (
                    <img src={writerPreview} className="h-16 w-16 rounded object-cover" />
                  )}
                </div>

                {/* REVIEWER */}
                <div className="col-span-12 md:col-span-6 border p-4 rounded-lg space-y-3">
                  <p className="font-medium text-green-600">Reviewed By</p>

                  <input
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Reviewer Name"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                  />

                  <input type="file" onChange={(e) => handleMedicalImage(e, "reviewer")} />

                  {reviewerPreview && (
                    <img src={reviewerPreview} className="h-16 w-16 rounded object-cover" />
                  )}
                </div>

              </div>

              {/* ================= SEO ================= */}
              <div className="grid grid-cols-12 gap-6">

                <div className="col-span-12 md:col-span-6 space-y-4 border p-4 rounded-lg">

                  <input
                    placeholder="Meta Title"
                    className="w-full border px-3 py-2 rounded"
                    {...register("metaTitle", {
                      required: "Meta title required",
                      maxLength: 60,
                    })}
                  />

                  <input
                    placeholder="Meta Keywords"
                    className="w-full border px-3 py-2 rounded"
                    {...register("metaKeywords", {
                      required: "Keywords required",
                    })}
                  />

                </div>

                <div className="col-span-12 md:col-span-6 border p-4 rounded-lg">
                  <textarea
                    placeholder="Meta Description"
                    className="w-full border px-3 py-2 rounded"
                    rows={5}
                    {...register("metaDescription", {
                      required: "Meta description required",
                      maxLength: 150,
                    })}
                  />
                </div>

              </div>

            
                          <div className="grid grid-cols-12 gap-6">

                              {/* STRUCTURED DATA */}
                              <div className="col-span-12 md:col-span-6 border p-4 rounded-lg">
                                  <label className="block mb-2 text-sm font-medium">
                                      Structured Data (JSON-LD)
                                  </label>

                                  <textarea
                                      rows={10}
                                      placeholder={`{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "headline": "Blog Title"
}`}
                                      className="w-full rounded-lg border px-4 py-2.5 text-sm"
                                      {...register("structuredData", {
                                          validate: (value) => {
                                              if (!value) return true;

                                              try {
                                                  JSON.parse(value);
                                                  return true;
                                              } catch {
                                                  return "Please enter valid JSON";
                                              }
                                          },
                                      })}
                                  />

                                  {errors.structuredData && (
                                      <p className="text-red-500 text-sm mt-1">
                                          {errors.structuredData.message}
                                      </p>
                                  )}
                              </div>

                          </div>

        

     
              <div className="flex justify-end">
                <button className="bg-brand-500 text-white px-6 py-3 rounded-lg">
                  Add Blog
                </button>
              </div>

            </div>
          </form>

        </ComponentCard>
      </div>
    </div>
  );
}