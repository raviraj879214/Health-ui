"use client";

import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function DoctorSix({ onClose, doctoruuid , clinicuuid }) {


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    defaultValues: {
      sameAsClinic: false,
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      localidade: "",
      uf: "",
      estado: "",
      regiao: "",
      ibge: "",
      gia: "",
      ddd: "",
      siafi: "",
    },
  });

  const [addressid,setAddresID] = useState("");

  useEffect(()=>{

    fetchDoctorDetails();
    
  },[doctoruuid]);


  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };


  const accessAddressViaCep = async (cep) => {
    if (!cep) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_VIACEP_URL}/${cep}/json/`);
      if (res.ok) {
        const result = await res.json();
        setValue("logradouro", result.logradouro || "");
        setValue("bairro", result.bairro || "");
        setValue("localidade", result.localidade || "");
        setValue("uf", result.uf || "");
        setValue("complemento", result.complemento || "");
        setValue("estado", result.estado || "");
        setValue("regiao", result.regiao || "");
        setValue("ibge", result.ibge || "");
        setValue("gia", result.gia || "");
        setValue("ddd", result.ddd || "");
        setValue("siafi", result.siafi || "");
      }
    } catch (error) {
      console.error("Error fetching CEP:", error);
    }
  };


  const sameAsClinic= async(checked)=>{
   
    if(checked === false){
        reset();
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctors/get-clinic-address/${clinicuuid}`,{
        method : "Get",
        headers :await clinicHeaders(),
    });

    if(res.ok){
         
        const result = await res.json();
        setValue("logradouro", "");
        setValue("bairro",  "");
        setValue("localidade",  "");
        setValue("uf", "");
        setValue("complemento",  "");
        setValue("estado",  "");
        setValue("regiao",  "");
        setValue("ibge",  "");
        setValue("gia",  "");
        setValue("ddd", "");
        setValue("siafi", "");
        

        setValue("cep",result.data.cep);
        setValue("logradouro",result.data.street);
        setValue("complemento",result.data.complement);
        setValue("bairro",result.data.neighborhood);
        setValue("localidade",result.data.citycep);
        setValue("uf",result.data.state);
    }
  }

  

  const updateAddress = async(data)=>{
    debugger;
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctors/update-clinic-address`,{
        method : "Post",
        headers :await clinicHeaders(),
        body: JSON.stringify({
            id: addressid,
            clinicuuid : clinicuuid,
            doctoruuid : doctoruuid,
            cep: data?.cep,
            logradouro: data?.logradouro,
            numero: data?.numero,
            complemento: data?.complemento,
            bairro: data?.bairro,
            localidade: data?.localidade,
            uf: data?.uf,
            estado: data?.estado,
            regiao: data?.regiao,
            ibge: data?.ibge,
            gia: data?.gia,
            ddd: data?.ddd,
            siafi: data?.siafi,
        })
    });

    if(res.ok){
        const result = await res.json();
        fetchDoctorDetails();
         window.location.href = `?doid=${doctoruuid}&step=7`;
        
    }
  }





  const fetchDoctorDetails = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctors/get-doctor-address`, {
      method: "Post",
      headers: clinicHeaders(),
      body: JSON.stringify({
        clinicuuid: clinicuuid,
        doctoruuid: doctoruuid
      })
    });


    if (res.ok) {
      const result = await res.json();
        setAddresID(result.data.id);
        setValue("cep",result.data.zipcode);
        setValue("logradouro", result.data.street || "");
         setValue("bairro", result.data.neighborhood  || "");
         setValue("localidade", result.data.city || "");
         setValue("uf", result.data.stateCode || "");
         setValue("complemento", result.data.complement || "");
         setValue("estado", result.data.stateName || "");
         setValue("regiao", result.data.region || "");
         setValue("ibge", result.data.ibgeCode || "");
         setValue("gia", result.data.giaCode || "");
         setValue("ddd", result.data.areaCode || "");
         setValue("siafi", result.data.siafiCode || "");

    
    }
  }


  const onCancel =()=>{

    window.location.href = `?doid=${doctoruuid}&step=5`;
  }








  return (

    <Dialog open={true} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6">
          <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Doctor Address</span>
            <span className="text-green-400">6/7</span>
          </DialogTitle>

          <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50 h-auto overflow-scroll">
            <form onSubmit={handleSubmit(updateAddress)} className="space-y-4">

             
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  {...register("sameAsClinic")}
                  id="sameAsClinic"
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  onChange={(e)=>  sameAsClinic(e.target.checked)}
                />
                <label htmlFor="sameAsClinic" className="text-gray-700 font-medium">
                  Same as Hospital / Clinic
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      
                <div>
                  <label className="block text-sm font-medium text-gray-700">CEP / Postal Code</label>
                  <input
                    type="text"
                    {...register("cep", { required: true })}
                    placeholder="01001-000"
                    onBlur={(e) => accessAddressViaCep(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.cep && <p className="text-red-500 text-xs mt-1">CEP is required</p>}
                </div>

     
                <div>
                  <label className="block text-sm font-medium text-gray-700">Street / Logradouro</label>
                  <input
                    type="text"
                    {...register("logradouro", { required: true })}
                    placeholder="Praça da Sé"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.logradouro && <p className="text-red-500 text-xs mt-1">Street is required</p>}
                </div>



                <div>
                  <label className="block text-sm font-medium text-gray-700">Complement</label>
                  <input
                    type="text"
                    {...register("complemento")}
                    placeholder="Floor, suite, etc."
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700">Neighborhood / Bairro</label>
                  <input
                    type="text"
                    {...register("bairro", { required: true })}
                    placeholder="Sé"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.bairro && <p className="text-red-500 text-xs mt-1">Neighborhood is required</p>}
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700">City / Localidade</label>
                  <input
                    type="text"
                    {...register("localidade", { required: true })}
                    placeholder="São Paulo"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.localidade && <p className="text-red-500 text-xs mt-1">City is required</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">State / UF</label>
                  <input
                    type="text"
                    {...register("uf", { required: true })}
                    placeholder="SP"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.uf && <p className="text-red-500 text-xs mt-1">State is required</p>}
                </div>

 
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full State Name</label>
                  <input
                    type="text"
                    {...register("estado")}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700">Region</label>
                  <input
                    type="text"
                    {...register("regiao")}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

       
                <div>
                  <label className="block text-sm font-medium text-gray-700">IBGE Code</label>
                  <input
                    type="text"
                    {...register("ibge")}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

   
                <div>
                  <label className="block text-sm font-medium text-gray-700">GIA Code</label>
                  <input
                    type="text"
                    {...register("gia")}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700">Area Code / DDD</label>
                  <input
                    type="text"
                    {...register("ddd")}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

  
                <div>
                  <label className="block text-sm font-medium text-gray-700">SIAFI Code</label>
                  <input
                    type="text"
                    {...register("siafi")}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>


              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn btn-secondary"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary">

                  Save Address

                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
