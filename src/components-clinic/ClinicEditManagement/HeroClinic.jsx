"use client";
import { useState, useRef, useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ClinicNameUpdates } from "../ClinicEditManagement/ClinicNameUpdate";

export function HeroSectionbanner({ name, clinicuuid, location ,clinicdetail }) {
  const [banners, setBanners] = useState([null, null, null, null, null]);
  const [indexToUpdate, setIndexToUpdate] = useState(null);
  const hiddenInput = useRef(null);

  const fetchBanners = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-banner/get-all-images/${clinicuuid}`,
        {
          headers: { Authorization: `Bearer ${Cookies.get("clinic_access")}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch banners");
      const data = await res.json();

      const sorted = [null, null, null, null, null];
      
      data.data.forEach((item) => {
        const index = parseInt(item.sort, 10) - 1;
        sorted[index] = {
          id: item.id,
          url: `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=clinic/banner/${item.Images}`,
        };
      });

      setBanners(sorted);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching banner images");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, [clinicuuid]);

  const openFilePicker = (index) => {
    setIndexToUpdate(index);

    // ✅ RESET INPUT BEFORE OPENING PICKER
    if (hiddenInput.current) {
      hiddenInput.current.value = "";
      hiddenInput.current.click();
    }
  };

  const handleUpload = async (file, index) => {
    debugger;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("clinicuuid", clinicuuid);
    formData.append("type", "banner");
    formData.append("sortbanner", (index + 1).toString());
    if (banners[index]?.id) formData.append("id", banners[index].id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-banner/insert-banner-images`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${Cookies.get("clinic_access")}` },
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      toast.success("Image uploaded!");

      const newBanners = [...banners];
      newBanners[index] = {
        id: data.data.id || banners[index]?.id,
        url: `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=clinic/banner/${data.data.Images}`,
      };
      setBanners(newBanners);
    } catch (err) {
      console.log("err", err);
      toast.error(err.message);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleUpload(file, indexToUpdate);

    // ✅ RESET INPUT AFTER UPLOAD (KEY FIX)
    e.target.value = "";
  };

  const removeImage = async (index) => {
    debugger;
    const imageData = banners[index];
    if (!imageData) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-banner/delete-banner-images/${imageData.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${Cookies.get("clinic_access")}` },
        }
      );
      if (!res.ok) throw new Error("Delete failed");

      toast.success("Image removed");
      const newBanners = [...banners];
      newBanners[index] = null;
      setBanners(newBanners);
    } catch (err) {
      toast.error("Error removing image");
    }
  };

  return (
    <ComponentCard title="Hospital Images">
      <div className="w-full bg-white border rounded-lg p-4">
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${
            banners.some((b) => b !== null)
              ? "h-full"
              : "h-[420px] sm:h-[420px]"
          }`}
        >
          <div
            className="sm:col-span-2 border rounded-md overflow-hidden relative cursor-pointer hover:border-blue-500"
            onClick={() => openFilePicker(0)}
          >
            {!banners[0] ? (
              <EmptyBlock />
            ) : (
              <Preview
                img={banners[0].url}
                remove={() => removeImage(0)}
              />
            )}
          </div>

          <div className="grid grid-rows-2 grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border rounded-md overflow-hidden relative cursor-pointer hover:border-blue-500"
                onClick={() => openFilePicker(i)}
              >
                {!banners[i] ? (
                  <EmptyBlock />
                ) : (
                  <Preview
                    img={banners[i].url}
                    remove={() => removeImage(i)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <input
        ref={hiddenInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      <ClinicNameUpdates
        clinicnames={name}
        clinicuuid={clinicuuid}
        location={location}
        clinicdetail={clinicdetail}


      />
    </ComponentCard>
  );
}

const EmptyBlock = () => (
  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
    <svg
      className="w-10 h-10 mb-1"
      fill="none"
      stroke="gray"
      strokeWidth={1.2}
      viewBox="0 0 24 24"
    >
      <path d="M4 5h16v14H4z" />
      <path d="M4 15l4-4 3 3 5-5 4 4" />
    </svg>
    <p className="text-sm">Click to upload</p>
  </div>
);

const Preview = ({ img, remove }) => (
  <div className="relative w-full h-full">
    <img
      src={img}
      alt="Hospital banner"
      className="w-full h-full object-cover"
    />
    <button
      onClick={(e) => {
        e.stopPropagation();
        remove();
      }}
      className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-10"
    >
      ✕
    </button>
  </div>
);
