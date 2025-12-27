"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Select from "react-select";
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";


export function AddSurgeryImage({sendData,clinicuuid}) {


  const [open, setOpen] = useState(false);
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  const [errors, setErrors] = useState({ before: false, after: false });
  const [uploading, setUploading] = useState(false);
  const [clearFiles, setClearFiles] = useState(false);
  const [degree, setDegree] = useState("");

  const [degreeOptions,setDegreeOptions] = useState([]);


  const [doctorsOptions,setDoctorsOptions] = useState([]);
  const [doctors,setDoctors] = useState("");



  useEffect(()=>{

          fetchtreatment();
          if(clinicuuid){
            fetchClinicDoctors();
          }
          

  },[clinicuuid]);


  const fetchClinicDoctors = async ()=>{

    debugger;
    //sdfdfddddddd
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-surgeries/get-doctors/${clinicuuid}`,{
      method : "Get",
      headers : clinicHeaders(),
    });

    if(res.ok){
       debugger;
       const result = await res.json();

       console.log("fetchClinicDoctors",result);

        const options = result.data.map(item => ({
            value: item.uuid,
            label: 'Dr. ' + item.firstname + ' ' + item.lastname
          }));


        setDoctorsOptions(options);

    }
  }






  const fetchtreatment =async()=>{
   
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-surgeries/get-treatment`,{
        method : "Get",
        headers : clinicHeaders(),
      });

      if(res.ok){
          const result = await res.json();
          const options = result.data.map(item => ({
            value: item.id,
            label: item.name
          }));
          setDegreeOptions(options);
          console.log("result",result);
      }
  }







  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (type === "before") {
      setBeforeFile(file);
      setBeforePreview(previewUrl);
      setErrors((prev) => ({ ...prev, before: false }));
    } else {
      setAfterFile(file);
      setAfterPreview(previewUrl);
      setErrors((prev) => ({ ...prev, after: false }));
    }
  };

  const handleUpload = async () => {

     if(doctors == ""){
      return;
     }
     if(degree == ""){
      return ;
     }

    const newErrors = { before: !beforeFile, after: !afterFile };
    setErrors(newErrors);
    if (newErrors.before || newErrors.after) return;

    setUploading(true);
    const surgeryId = crypto.randomUUID(); // 🔥 Unique for both uploads

    // 📌 Reusable upload function
    const uploadImage = async (file, type) => {
      debugger;
      const formData = new FormData();
      formData.append("image", file);
      formData.append("surgeryid", surgeryId);
      formData.append("type", type);
      formData.append("clinicUuid",clinicuuid);
      formData.append("doctorUuid",doctors.value);
      formData.append("treatmentid",degree.value);
      

      return await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-surgeries/insert-surgeries-images`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${Cookies.get("clinic_access")}` },
          body: formData,
        }
      );
    };

    try {
      // 🚩 Upload BEFORE image
      const resBefore = await uploadImage(beforeFile, "before");
      if (!resBefore.ok) throw new Error("Before image failed");

      // 🚩 Upload AFTER image
      const resAfter = await uploadImage(afterFile, "after");
      if (!resAfter.ok) throw new Error("After image failed");
        debugger;
      sendData(surgeryId);

      toast.success("Images uploaded successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });

      // 🔄 Reset after both success
      setClearFiles(true);
      setTimeout(() => setClearFiles(false), 50);
      setBeforeFile(null);
      setAfterFile(null);
      setBeforePreview(null);
      setAfterPreview(null);
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Error uploading images.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button onClick={() => setOpen(true)} className="btn btn-primary font-semibold">
          + Add Images 
        </button>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-3xl ">

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Upload Images</h3>
                  <div className="grid grid-cols-2 gap-2">
                     <div className="">
                            
                            <label className="block mb-1 font-medium">Choose Treatment</label>

                            <Select
                              options={degreeOptions}
                              value={degree}
                              onChange={(selected) => setDegree(selected)}
                              placeholder="Search  treatment..."
                              className="basic-select"
                              classNamePrefix="select"
                              isSearchable/>


                            {!degree && (
                              <p className="text-sm text-red-400 mt-1">Please select a degree</p>
                            )}

                      </div>
                    
                    <div className="">
                            
                            <label className="block mb-1 font-medium">Choose Doctor</label>

                            <Select
                              options={doctorsOptions}
                              value={doctors}
                              onChange={(selected) => setDoctors(selected)}
                              placeholder="Search  doctors..."
                              className="basic-select"
                              classNamePrefix="select"
                              isSearchable/>


                            {!doctors && (
                              <p className="text-sm text-red-400 mt-1">Please select a doctor</p>
                            )}
                            
                      </div>

                  </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                  <ImageUploader
                    label="Before Photo"
                    preview={beforePreview}
                    onChange={(e) => handleFileChange(e, "before")}
                    error={errors.before}
                    clear={clearFiles}
                  />
                  <ImageUploader
                    label="After Photo"
                    preview={afterPreview}
                    onChange={(e) => handleFileChange(e, "after")}
                    error={errors.after}
                    clear={clearFiles}
                  />
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading}
                  className="btn btn-primary ml-2"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-700 font-semibold shadow-sm hover:bg-gray-100 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

function ImageUploader({ label, preview, onChange, error, clear }) {
  const [localPreview, setLocalPreview] = useState(preview);

  useEffect(() => {
    if (clear) setLocalPreview(null);
  }, [clear]);

  useEffect(() => {
    setLocalPreview(preview);
  }, [preview]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900">{label}</label>
      <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 cursor-pointer hover:border-green-500">
        <label className="flex flex-col items-center justify-center w-full h-full">
          {localPreview ? (
            <img src={localPreview} alt={`${label} Preview`} className="object-cover w-full h-48 rounded-md" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 hover:text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
          <input type="file" className="sr-only" onChange={onChange} />
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">Please upload {label.toLowerCase()}</p>}
    </div>
  );
}
