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
import { type } from "os";


export function DoctorOne({ onClose, nextStep, clinicuuid, doctoruuid }) {


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
    reset,
    setError,
    getValues
  } = useForm({
    defaultValues: {
      languages: [],
      date: null,
      avatar: null,
    },
  });
    const crmState = watch("crmState");

  const [avatar, setAvatar] = useState(null);
  const [files, setFiles] = useState(null);
  const [dob, setDob] = useState("");
  const [doctoruuids, setdoctoruuids] = useState();

  const router = useRouter();


const colourOptions = [
  { value: 'English', label: 'English' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Dutch', label: 'Dutch' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Chinese (Mandarin)', label: 'Chinese (Mandarin)' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Turkish', label: 'Turkish' },
  { value: 'Greek', label: 'Greek' },
  { value: 'Hebrew', label: 'Hebrew' },
  { value: 'Polish', label: 'Polish' },
  { value: 'Ukrainian', label: 'Ukrainian' },
  { value: 'Romanian', label: 'Romanian' },
  { value: 'Czech', label: 'Czech' },
  { value: 'Hungarian', label: 'Hungarian' },
  { value: 'Swedish', label: 'Swedish' },
  { value: 'Norwegian', label: 'Norwegian' },
  { value: 'Danish', label: 'Danish' },
  { value: 'Finnish', label: 'Finnish' },
  { value: 'Thai', label: 'Thai' },
  { value: 'Vietnamese', label: 'Vietnamese' },
  { value: 'Indonesian', label: 'Indonesian' },
  { value: 'Malay', label: 'Malay' },
  { value: 'Filipino', label: 'Filipino' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'Persian (Farsi)', label: 'Persian (Farsi)' },
  { value: 'Bengali', label: 'Bengali' },
  { value: 'Tamil', label: 'Tamil' },
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
    

    console.log("Form Data:", data, { avatar });

    const formdata = new FormData();

    debugger;


      if (files) {
        formdata.append("image", files);
      }
      

    formdata.append("firstname", data.firstname);
    formdata.append("lastname", data.lastname);
    formdata.append("email", data.email);
    formdata.append("dob", data.date);

    formdata.append("crm",`${data.registrationType}-${data.crmState} ${data.crmNumber}`);


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

      if(result.status == 401){
        setError("crm", {
          type: "manual",
          message: "Crm Already exist"
        });
      }

      


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
      // setValue("crm", result.data.crm);

      const crm = result.data.crm;

      const match = crm.match(/^(CRM|CRO)-([A-Z]{2})\s*(\d+)$/);

if (match) {
  setValue("registrationType", match[1]); // CRM or CRO
  setValue("crmState", match[2]);         // SP, RJ, etc.
  setValue("crmNumber", match[3]);        // Registration number
}


      



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
        debugger;
        setAvatar(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=doctors/profilepicture/${result.data.image}`);
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
            <span className="text-green-400">1/7</span>
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
                  // rules={{ required: "Please upload a profile picture" }}
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

                {/* {errors.avatar && (
                  <p className="text-sm text-red-400 mt-1">{errors.avatar.message}</p>
                )} */}
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
                        label={`Date Of Birth`}
                        placeholder="Date Of Birth"
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











              <div className="col-span-12 lg:col-span-3">
  <Label>UF</Label>
  <select
    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
    {...register("crmState", {
      required: "Please select a state",
    })}
  >
    <option value="">Select State</option>
    <option value="AC">AC</option>
    <option value="AL">AL</option>
    <option value="AP">AP</option>
    <option value="AM">AM</option>
    <option value="BA">BA</option>
    <option value="CE">CE</option>
    <option value="DF">DF</option>
    <option value="ES">ES</option>
    <option value="GO">GO</option>
    <option value="MA">MA</option>
    <option value="MT">MT</option>
    <option value="MS">MS</option>
    <option value="MG">MG</option>
    <option value="PA">PA</option>
    <option value="PB">PB</option>
    <option value="PR">PR</option>
    <option value="PE">PE</option>
    <option value="PI">PI</option>
    <option value="RJ">RJ</option>
    <option value="RN">RN</option>
    <option value="RS">RS</option>
    <option value="RO">RO</option>
    <option value="RR">RR</option>
    <option value="SC">SC</option>
    <option value="SP">SP</option>
    <option value="SE">SE</option>
    <option value="TO">TO</option>
  </select>

  {errors.crmState && (
    <p className="mt-1 text-sm text-red-500">
      {errors.crmState.message}
    </p>
  )}
</div>

<div className="col-span-12 lg:col-span-3">
  <Label>CRM or CRO?</Label>
  <select
    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
    {...register("registrationType", {
      required: "Please select CRM or CRO",
    })}
  >
    <option value="">Select Type</option>
    <option value="CRM">CRM</option>
    <option value="CRO">CRO</option>
  </select>

  {errors.registrationType && (
    <p className="mt-1 text-sm text-red-500">
      {errors.registrationType.message}
    </p>
  )}
</div>

<div className="col-span-12 lg:col-span-3">
  <Label>Number</Label>
  <input
    type="text"
    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
    placeholder="123456"
    {...register("crmNumber", {
      required: "Please enter the registration number",
      pattern: {
        value: /^\d{1,6}$/,
        message: "Number must contain up to 6 digits",
      },
    })}
  />

  {errors.crmNumber && (
    <p className="mt-1 text-sm text-red-500">
      {errors.crmNumber.message}
    </p>
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
                <Label>Video URL (Optional)</Label>
                <input
                    type="text"
                    className="w-full border p-2 rounded"
                    {...register("videourl", {
                      // required: "Please enter video URL ",
                      pattern: {
                        value:
                          /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[A-Za-z0-9_-]{11}.*$/,
                        message: "Enter a valid YouTube video URL https://www.youtube.com/watch?v=xxxxxxxxx",
                      },
                    })}
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
                Back
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
