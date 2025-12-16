"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Cookies from "js-cookie";


import DatePicker from "@/components/form/date-picker";
import Label from "@/components/form/Label";
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";


export function DoctorOne({ onClose, nextStep, clinicuuid, doctoruuid }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
    reset
  } = useForm({
    defaultValues: {
      languages: [],
      date: null,
      avatar: null,
    },
  });

  const [avatar, setAvatar] = useState(null);
  const [files, setFiles] = useState(null);
  const [dob, setDob] = useState("");
  const [doctoruuids, setdoctoruuids] = useState();

  const router = useRouter();


  const colourOptions = [
    { value: 'Guarani', label: 'Guarani' },
    { value: 'Ticuna', label: 'Ticuna' },
    { value: 'Kaingang', label: 'Kaingang' },
    { value: 'Yanomami', label: 'Yanomami' },
    { value: 'English', label: 'English' },
  ];

  const degreeOptions = [
    { value: 'Professor', label: 'Professor' },
    { value: 'Medical Doctor', label: 'Medical Doctor' },
    { value: 'Associate Professor', label: 'Associate Professor' },
    { value: 'Health professional', label: 'Health professional' },
    { value: 'Medical scientist', label: 'Medical scientist' },
    { value: 'Healthcare assistant', label: 'Healthcare assistant' },
  ];










  const handleFileChange = (e) => {
    debugger;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        setValue("avatar", file, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };



  const onCreateUpdate = async (data) => {
    debugger;

    console.log("Form Data:", data, { avatar });
    const formdata = new FormData();
    formdata.append("image", files);
    formdata.append("firstname", data.firstname);
    formdata.append("lastname", data.lastname);
    formdata.append("email", data.email);
    formdata.append("dob", data.date);
    formdata.append("crm", data.crm);
    formdata.append("languages", JSON.stringify(data.languages.map(l => l.value)));
    formdata.append("videourl", data.videourl);
    formdata.append("cpf", data.cpf);

    formdata.append("degree", data.degree);

    formdata.append("doctoruuid",
      doctoruuids ? doctoruuids : doctoruuid
    );

    formdata.append("clinicuuid", clinicuuid);




    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctors/create-doctor`, {
      method: "Post",
      headers: { Authorization: `Bearer ${Cookies.get("clinic_access")}` },
      body: formdata,
    });


    if (res.ok) {
      const result = await res.json();
      setdoctoruuids(result.data.uuid);
      window.location.href = `?doid=${result.data.uuid}&step=2`;
    }
  };


  useEffect(() => {

    if (doctoruuid) {
      fetchDoctorDetails();
    }

  }, [doctoruuid]);



  const fetchDoctorDetails = async () => {
    debugger;
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctors/doctor-details/${doctoruuid}`, {
      method: "Get",
      headers: clinicHeaders(),
    });

    if (res.ok) {
      const result = await res.json();

      setValue("firstname", result.data.firstname);
      setValue("lastname", result.data.lastname);
      setValue("email", result.data.email);
      setValue("crm", result.data.crm);
      setValue("videourl", result.data.videurl);
      setValue("cpf", result.data.cpf);
      setValue("degree", result.data.degree);

      const backendLanguages = JSON.parse(result.data.languages);

      const defaultSelected = colourOptions.filter(opt =>
        backendLanguages.includes(opt.value)
      );







      setValue("languages", defaultSelected);
      setValue("date", result.data.dob);
      setDob(result.data.dob);


      if (result.data.image) {


        setAvatar(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/doctors/profilepicture/${result.data.image}`);
        setValue("avatar", result.data.image); // optional, can store file name
      }


    }
  }






  const onCancel = () => {
    window.location.href = window.location.pathname;
  };



  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
          <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Add Doctor  </span>
            <span className="text-green-400">1/4</span>
          </DialogTitle>

          <div className="w-full bg-neutral-quaternary rounded-full h-2 ">
            <div className="bg-brand h-2 rounded-full"></div>
          </div>

          <div className="border theme-border p-4  rounded bg-gray-50 flex items-start gap-2 mb-5">
            <p className="text-sm text-gray-700">
              Give as much information about the doctor as possible to build patient confidence.
            </p>
          </div>

          <form onSubmit={handleSubmit(onCreateUpdate)}>
            <div className="grid grid-cols-12 gap-4">

              <div className="col-span-12 lg:col-span-4 flex flex-col items-center lg:items-start">
                <Controller
                  name="avatar"
                  control={control}
                  rules={{ required: "Please upload a profile picture" }}
                  render={({ field }) => (
                    <label className="cursor-pointer flex flex-col items-center lg:items-start">

                      <div className="avatar w-28 h-28 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-gray-300">
                        {avatar ? (
                          <img
                            src={avatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 text-4xl">+</span>
                        )}
                      </div>

                      <span className="mt-3 text-green-700 hover:text-green-500 text-sm font-semibold">
                        Upload Profile
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e)}
                      />
                    </label>
                  )}
                />

                {errors.avatar && (
                  <p className="text-sm text-red-400 mt-1">{errors.avatar.message}</p>
                )}
              </div>


              <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-4">


                <div className="col-span-12 lg:col-span-6">
                  <Label className="mb-1 block">First Name</Label>

                  <div className="flex w-full">
                    <input
                      type="text"
                      className="w-full border theme-border  p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-primary-300"
                      {...register("firstname", {
                        required: "Please enter firstname",
                        minLength: { value: 2, message: "Minimum 2 characters required" },
                        pattern: {
                          value: /^[A-Za-z ]+$/,
                          message: "Only letters allowed",
                        },
                      })}
                    />

                  </div>

                  {errors.firstname && (
                    <p className="text-sm text-red-400 mt-1">{errors.firstname.message}</p>
                  )}
                </div>


                <div className="col-span-12 lg:col-span-6">
                  <Label>Last Name</Label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    {...register("lastname", { required: "Please enter lastname" })}
                  />
                  {errors.lastname && (
                    <p className="text-sm text-red-400">{errors.lastname.message}</p>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Label>Email</Label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    {...register("email", {
                      required: "Please enter email",
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Please select a date" }}
                    render={({ field }) => (
                      <DatePicker
                        className="w-full"
                        id="date-picker"
                        label={`Select Dob`}
                        placeholder="Select Dob"
                        value={dob}
                        defaultDate={dob}
                        onChange={(dates, currentDateString) => field.onChange(currentDateString)}
                      />
                    )}
                  />
                  {errors.date && (
                    <p className="text-sm text-red-400">{errors.date.message}</p>
                  )}
                </div>

              </div>











              <div className="col-span-12 lg:col-span-6">
                <Label>CRM / State</Label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="CRM-SP 123456"
                  {...register("crm", {
                    required: "Please enter CRM / State",
                    pattern: {
                      value: /^CRM[-\s/]?[A-Z]{2}\s?\d{1,6}$/,
                      message: "Invalid format. Example: CRM-SP 123456"
                    },
                    maxLength: {
                      value: 20,
                      message: "CRM is too long"
                    }
                  })}
                />
                {errors.crm && (
                  <p className="text-sm text-red-400">{errors.crm.message}</p>
                )}
              </div>



              <div className="col-span-12 lg:col-span-6">
                <Label>Select Language</Label>
                <Controller
                  name="languages"
                  control={control}
                  rules={{ required: "Please select at least one language" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={colourOptions}
                      isMulti
                      className="w-full"
                      classNamePrefix="select"
                      onChange={(selected) => field.onChange(selected)}
                    />
                  )}/>
                {errors.languages && (
                  <p className="text-sm text-red-400">{errors.languages.message}</p>
                )}
              </div>


              <div className="col-span-12 lg:col-span-6">
                <Label>Video URL</Label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  {...register("videourl", { required: "Please enter video url" })}
                />
                {errors.videourl && (
                  <p className="text-sm text-red-400">{errors.videourl.message}</p>
                )}
              </div>

              <div className="col-span-12 lg:col-span-6">
                <Label>CPF</Label>

                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  {...register("cpf", {
                    required: "Please enter CPF",
                    pattern: {
                      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                      message: "Enter valid CPF",
                    },
                  })}
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .replace(/(\d{3})(\d)/, "$1.$2")
                      .replace(/(\d{3})(\d)/, "$1.$2")
                      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                  }}
                />

                {errors.cpf && (
                  <p className="text-sm text-red-400">{errors.cpf.message}</p>
                )}
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Label>Choose Degree</Label>
                <Controller
                  name="degree"
                  control={control}
                  rules={{ required: "Please select a degree" }}
                  render={({ field }) => (
                    <div>
                      <select
                        {...field}
                        className="w-full border theme-border p-2 rounded select"
                        onChange={(e) => field.onChange(e.target.value)}
                        value={field.value || ""} // set default value
                      >
                        <option value="">Select Degree</option> {/* placeholder */}
                        {degreeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.degree && (
                        <p className="text-sm text-red-400">{errors.degree.message}</p>
                      )}
                    </div>
                  )}
                />







              </div>




            </div>


            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={onCancel} className="btn btn-secondary">
                Cancel
              </button>

              <button
                type="submit" className="btn btn-primary">
                Next
              </button>

            </div>



          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
