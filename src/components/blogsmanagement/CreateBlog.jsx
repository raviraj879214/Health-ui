"use client";

import { Editor } from "primereact/editor";
import { useForm, Controller } from "react-hook-form";
import ComponentCard from "../common/ComponentCard";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { adminHeaders } from "../utils/adminHeader";
import { toast, ToastContainer } from "react-toastify";

export function CreateBlogs() {

const [blogDetails, setBlogDetails] = useState(null);

const searchParams = useSearchParams();
const id = searchParams.get("id");

useEffect(() => {
  if (id) {
    fetchBlogDetails(id);
  }
}, [id]);

const fetchBlogDetails = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-blog/get-blog/${id}`,
      {
        method: "GET",
        headers: await adminHeaders(),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch blog details");
    }
    const result = await res.json();
    setBlogDetails(result.data);
    setValue("title",result.data.title);
    setValue("readingMinutes",result.data.readingminutes);
    setValue("content",result.data.content);
    setPreview(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${result.data.image_url}`);
    setWriterName(result.data.writername);
    setWriterPreview(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${result.data.writerimage}`);
    setReviewerName(result.data.reviewername);
    setReviewerPreview(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${result.data.reviewerimage}`);
    setValue("metaTitle",result.data.metatitle);
    setValue("metaKeywords",result.data.metakeywords);
    setValue("metaDescription",result.data.metadescription);
    setValue("category",result.data.category);

   

    setValue("structuredData",JSON.stringify(result.data.se_structure));


    setValue("ogUrl",result.data.ogurl);
    setValue("ogType",result.data.ogtype);
    setValue("publisher",result.data.publisher);
    setOgPreview(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${result.data.ogimageurl}`);

   
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
};





  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      readingMinutes: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      se_structure: "",
      structuredData:"",
       ogUrl: "",
  ogType: "website",
  publisher: "",
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

    const [ogImage, setOgImage] = useState(null);
    const [ogPreview, setOgPreview] = useState(null);
    const [ogError, setOgError] = useState("");
    const ogInputRef = useRef(null);

    const [loader,setLoader] = useState(false);


  // ================= BLOG IMAGE VALIDATION =================
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setImageError("");

    const url = URL.createObjectURL(selectedFile);
    const img = new Image();

    img.onload = () => {
    //   if (img.width !== 1080 || img.height !== 608) {
    //     setImageError("Image must be exactly 1080 × 608 pixels");
    //     URL.revokeObjectURL(url);
    //     e.target.value = "";
    //     return;
    //   }

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


  const onCreate = async (data) => {
    debugger;

    if (imageError) return;

   if (
  !writerName ||
  (!writerFile && !writerPreview) ||
  !reviewerName ||
  (!reviewerFile && !reviewerPreview)
) {
  alert("Please fill Medical Writer & Reviewer details");
  return;
}

    const resToken = await fetch("/api/auth/get-token");
    const { token } = await resToken.json();

    const formData = new FormData();

    // BLOG DATA
   
    if(blogDetails !== null){
       formData.append("updateid", blogDetails.id);
    }

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("readingMinutes", data.readingMinutes);
    formData.append("metaTitle", data.metaTitle);
    formData.append("metaKeywords", data.metaKeywords);
    formData.append("metaDescription", data.metaDescription);
    //formData.append("se_structure", data.se_structure);
     formData.append("se_structure", data.structuredData);
     formData.append("category", data.category);

      

    // MEDICAL
    formData.append("writerName", writerName);
    formData.append("reviewerName", reviewerName);

      formData.append("ogUrl", data.ogUrl || "");
      formData.append("ogType", data.ogType || "website");
      formData.append("publisher", data.publisher || "");

      if (ogImage) {
          formData.append("ogImage", ogImage);
      }


    // IMAGES
    if (file) formData.append("image", file);
    if (writerFile) formData.append("writerImage", writerFile);
    if (reviewerFile) formData.append("reviewerImage", reviewerFile);
    setLoader(true);
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
      setOgImage(null);
      setOgPreview(null);
      setOgError("");

        if (ogInputRef.current) {
            ogInputRef.current.value = "";
        }

        toast.success("Blog created/updated successfully",{
          position : "bottom-right",
          autoClose : 3000
        });

    }
    setLoader(false);
  };


const handleOgImage = (e) => {
  const selectedFile = e.target.files?.[0];

  if (!selectedFile) return;

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (!allowedTypes.includes(selectedFile.type)) {
    setOgError(
      "Only JPG, JPEG, PNG, WEBP and GIF images are allowed."
    );
    e.target.value = "";
    return;
  }

  setOgError("");

  const url = URL.createObjectURL(selectedFile);

  setOgImage(selectedFile);
  setOgPreview(url);
};

const removeOgImage = () => {
  setOgImage(null);
  setOgPreview(null);
  setOgError("");

  if (ogInputRef.current) {
    ogInputRef.current.value = "";
  }
};


  return (
    <div className="grid grid-cols-12 gap-6">
      <ToastContainer></ToastContainer>
      <div className="col-span-12">
        
        <ComponentCard title="Create Blog" showReload={true}>

          <form onSubmit={handleSubmit(onCreate)}>
            <div className="space-y-6">

             

              

                          <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                              <div className="md:col-span-6">
                                  <div>
                                      <label className="text-sm font-medium">Title</label>
                                      <input
                                          className="h-11 w-full border rounded-lg px-3"
                                          {...register("title", { required: "Title required" })}
                                      />
                                      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                                  </div>
                              </div>

                              <div className="md:col-span-2">
                                <div>
                                  <label className="text-sm font-medium">Category</label>

                                  <select
                                    className="h-11 w-full border rounded-lg px-3"
                                    {...register("category", {
                                      required: "Category is required",
                                    })}
                                  >
                                    <option value="">Select Category</option>
                                    <option value="Health">Health</option>
                                    <option value="Medical Tourism">Medical Tourism</option>
                                    <option value="Plastic Surgery">Plastic Surgery</option>
                                    <option value="Dental Care">Dental Care</option>
                                    <option value="Wellness">Wellness</option>
                                  </select>

                                  {errors.category && (
                                    <p className="text-red-500">{errors.category.message}</p>
                                  )}
                                </div>
                              </div>



                              <div className="md:col-span-2">
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
                              </div>


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
                    <input type="file" hidden ref={inputRef} onChange={handleFileChange} accept=".jpg,.jpeg,.png,.webp" />
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

                  <input type="file" onChange={(e) => handleMedicalImage(e, "writer")} accept=".jpg,.jpeg,.png,.webp" />

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

                  <input type="file" onChange={(e) => handleMedicalImage(e, "reviewer")} accept=".jpg,.jpeg,.png,.webp" />

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
                            <div className="col-span-12 md:col-span-6 border p-4 rounded-lg space-y-4">
  <label className="block mb-2 text-sm font-medium">
    Open Graph (OG) Data
  </label>

  {/* OG URL */}
  <div>
    <label className="block text-sm font-medium mb-1">
      OG URL
    </label>

    <input
      type="url"
      placeholder="https://www.abc.com/blog-page"
      className="w-full border px-3 py-2 rounded"
      {...register("ogUrl")}
    />
  </div>

  {/* OG Type */}
  <div>
    <label className="block text-sm font-medium mb-1">
      OG Type
    </label>

    <select
      className="w-full border px-3 py-2 rounded"
      {...register("ogType")}
    >
      <option value="website">website</option>
      <option value="article">article</option>
      <option value="blog">blog</option>
    </select>
  </div>

  {/* Publisher */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Publisher
    </label>

    <input
      type="text"
      placeholder="Website Name"
      className="w-full border px-3 py-2 rounded"
      {...register("publisher")}
    />
  </div>

  {/* OG Image */}
  <div>
    <label className="block text-sm font-medium mb-2">
      OG Image
    </label>

    {!ogPreview ? (
      <label className="flex h-40 cursor-pointer items-center justify-center rounded-lg border border-dashed">
        <input
          type="file"
          hidden
          ref={ogInputRef}
         accept=".jpg,.jpeg,.png,.webp"
          onChange={handleOgImage}
        />

        <span className="text-sm text-gray-500">
          Upload OG Image
          <br />
          (JPG, PNG, WEBP, GIF)
        </span>
      </label>
    ) : (
      <div className="relative rounded-lg border p-2">
        <img
          src={ogPreview}
          alt="OG Preview"
          className="h-40 w-full object-contain rounded"
        />

        <button
          type="button"
          onClick={removeOgImage}
          className="absolute top-2 right-2 rounded bg-black px-3 py-1 text-sm text-white"
        >
          Remove
        </button>
      </div>
    )}

    {ogError && (
      <p className="mt-2 text-sm text-red-500">
        {ogError}
      </p>
    )}
  </div>
</div>

                          </div>

        

     
            <div className="flex justify-end gap-3">
  <button
    type="button"
    onClick={() => {
      window.location.href="/admin/blogs";
    }}
    className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100"
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={loader}
    className="bg-brand-500 text-white px-6 py-2 rounded-lg disabled:opacity-50"
  >
    {loader ? (
      <>...</>
    ) : (
      <>{id ? "Update Blog" : "Add Blog"}</>
    )}
  </button>
</div>

            </div>
          </form>

        </ComponentCard>
      </div>
    </div>
  );
}