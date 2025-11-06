
"use client"
import { useForm } from "react-hook-form";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@/icons";
import { toast, ToastContainer } from "react-toastify";
import { ListOfSpecialties } from "../managespecialties/ListSpecialty";



export function MangageSpecailty() {
  const { register, setValue, getValues, formState: { errors }, handleSubmit, reset } = useForm();
  const [options, setoptions] = useState([]);
  const [authtoken, setauthtoken] = useState("");
  const [button, setbutton] = useState(false);
  const [triggertable, settriggertable] = useState(null);
  const [specialtiesid, setspecialtiesid] = useState(0);

  const [disabledropdownd,setdisabledropdown] = useState(false);


  useEffect(() => {
    const fetchtoken = async () => {
      const resToken = await fetch("/api/auth/get-token");
      const { token } = await resToken.json();
      setauthtoken(token.token);
    }
    fetchtoken();
    getSpecialtyType();

  }, [triggertable]);



  const getSpecialtyType = async () => {

    const resToken = await fetch("/api/auth/get-token");
    const { token } = await resToken.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/specialties-type/get-all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    if (res.ok) {
      const data = await res.json();
      const optionsd = data.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setoptions(optionsd);
    }
  }


  const onCreate = async (data) => {
    debugger;
    try {

      const tokenResponse = await fetch("/api/auth/get-token");
      const { token } = await tokenResponse.json();


      const payload = {
        name: data.name,
        typeId: data.typeid,
        status: 1,
        description: data.Description,
        specialtytypename : data.specialtytypename
      };



      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/specialties/create`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(payload),
        }
      );


      if (response.ok) {
        const data = await response.json();



        if (data.status == 409) {
          setValue("name", "");
          toast.error(data.message, {
            position: "bottom-right",
            autoClose: 3000,
          });

          return;
        }

        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
        settriggertable(data.data.createdAt);
        reset();
        onMinus();
      }
      else {
        const error = await response.json();
        toast.error(error.message || "Failed to create specialty.", {
          position: "bottom-right",
          autoClose: 3000,
        });
        reset();

      }

    }
    catch (error) {
      console.error("Create specialty error:", error);
      toast.error("An unexpected error occurred.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };



  const handleChildEditData = (id, name, description, typeId, uuid) => {
    setspecialtiesid(id);
    setValue("name", name);
    setValue("Description", description);
    setValue("typeid", typeId);
    setdisabledropdown(false);
  }

  const onUpdate = async (data) => {
    debugger;
    try {

      const tokenResponse = await fetch("/api/auth/get-token");
      const { token } = await tokenResponse.json();


      const payload = {
        id: specialtiesid,
        name: data.name,
        typeId: data.typeid,
        status: 1,
        description: data.Description,
      };


      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/specialties/update-specialties`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(payload),
        }
      );


      if (response.ok) {
        const data = await response.json();



        if (data.status == 409) {
          setValue("name", "");
          toast.error(data.message, {
            position: "bottom-right",
            autoClose: 3000,
          });

          return;
        }
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
        settriggertable(data.data.updatedAt);
        reset();
      }
      else {
        const error = await response.json();
        toast.error(error.message || "Failed to create specialty.", {
          position: "bottom-right",
          autoClose: 3000,
        });
        reset();

      }

    }
    catch (error) {
      console.error("Create specialty error:", error);
      toast.error("An unexpected error occurred.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }

    setspecialtiesid(0);
  }




  const SpecialtyTypeChnage=()=>{

  }



  const onPlus = ()=>{
    setdisabledropdown(true);
   setValue('typeid',0);
  }

  const onMinus =()=>{
    setdisabledropdown(false);
    setValue('typeid',"");
  }


  const addSpecilatytypevalue=(e)=>{

      console.log(e.target.value);

      setValue('typeid',0);

  }





  return (<>

    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 sm:col-span-12">
        <ComponentCard title="" desc="" showReload = {true}>
          
          <form onSubmit={handleSubmit(specialtiesid > 0 ? onUpdate : onCreate)}>
           
            <div className="grid grid-cols-12 gap-6">

             
              <div className="col-span-12 sm:col-span-6">
                <Label>Treatment Name</Label>
                <input
                  type="text"
                  className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                ${errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                  defaultValue={getValues("rolename")}
                  {...register("name", {
                    required: "Please enter treatment name",
                  })}

                  placeholder="Enter treatment Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              
              <div className="col-span-12 sm:col-span-6">
                <Label>Specialty</Label>

                {/* Dropdown + "+" Button row */}
                <div className="flex items-center gap-2">
                  {/* Dropdown */}
                  <div className="relative flex-1">
                    <select
                      {...register("typeid", { required: "Please select specialty" })}
                      className={`w-full rounded-md border px-3 py-2 appearance-none focus:outline-none ${errors.typeid
                          ? "border-red-500 focus:ring-red-300"
                          : "border-gray-300 focus:ring-brand-200"
                        }`}
                      disabled={disabledropdownd}
                      onChange={SpecialtyTypeChnage()}
                    >
                      <option value="">Select an option</option>
                      {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                       
                      
                      <option className={disabledropdownd ? "block" : 'hidden'} value="0">Enter Custom Name</option>
                      
                    </select>

                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>

                  {/* + Button beside dropdown */}
                 
                  {specialtiesid == 0 &&(
                       <button
                    type="button"
                    onClick={() => onPlus()}
                    className="flex items-center justify-center w-10 h-10 text-white bg-brand-500 rounded-md hover:bg-brand-600 focus:outline-none"
                  >
                    +
                  </button>
                  )}
                </div>

                {/* Conditional Input for Adding Specialty Type */}
              {disabledropdownd && specialtiesid == 0 && (

                <div className="flex items-center gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Enter Specialty"
                    className="flex-1 h-11 rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    onChange={(e) => addSpecilatytypevalue(e)}
                    {...register("specialtytypename", {
                      required: "Please enter Specialty",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => onMinus()}
                    className="flex items-center justify-center w-10 h-10 text-white bg-brand-500 rounded-md hover:bg-brand-600 focus:outline-none"
                  >
                    -
                  </button>
                </div>
              )}

                  {errors.specialtytypename && (
                                <p className="text-red-500 text-sm mt-1">{errors.specialtytypename.message}</p>
                  )}
                {errors.typeid && (
                  <p className="text-red-500 text-sm mt-1">{errors.typeid.message}</p>
                )}
              </div>

             
              <div className="col-span-12 sm:col-span-6">
                <label className="block mb-1 text-sm font-medium">Description</label>
                <textarea
                  placeholder="Enter Description"
                  className={`w-full rounded-md border px-3 py-2 appearance-none focus:outline-none
                ${errors.Description ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                  rows={4}
                  {...register("Description", { required: "Please enter description" })}
                />
                {errors.Description && (
                  <p className="text-red-500 text-sm">{errors.Description.message}</p>
                )}
              </div>

            
             

            </div>
          <div className="grid grid-cols-10 gap-4 mt-5">
  <div className="col-span-8"></div> {/* spacer */}
  <div className="col-span-2">
    <button
      type="submit"
      className="bg-brand-500 hover:bg-brand-600 w-full rounded-lg p-3 text-sm font-medium text-white transition-colors"
    >
      {specialtiesid > 0 ? "Update" : "Add"}
    </button>
  </div>
</div>


            
          </form>
        </ComponentCard>
      </div>
    </div>



    <div className="grid grid-cols-12 gap-4 mt-5">
      <div className="col-span-12 sm:col-span-12 space-y-5 sm:space-y-6">
        <ComponentCard title="Manage Treatments" desc="">
          <p className="text-green-500 text-sm"> </p>

          <ListOfSpecialties trigger={triggertable} sendData={handleChildEditData}></ListOfSpecialties>
        </ ComponentCard>
      </div>
    </div>



  </>);
}