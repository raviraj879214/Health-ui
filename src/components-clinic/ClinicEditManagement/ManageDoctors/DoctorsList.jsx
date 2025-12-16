import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { ArrowRightIcon } from "@/icons";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArrowLeftIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function DoctorList({ onClose, clinicuuid ,sendData}) {



  const [doctors, setDoctors] = useState([]);

  const [selecteddoctors,setSelectedDoctors] = useState([]);
  const [button,setButton] = useState(false);
  const [addressmodal,setAddressModal]= useState(false);
  const [addressmodaldetails,setAddressModalDetails]= useState({});

  const {register,setValue,getValues,handleSubmit,formState:{errors},reset,setError} = useForm();
  const [sameasclinicaddress,setSameAsClinicAddress] = useState(false);


  useEffect(() => {
    
     if (clinicuuid) {
     fetchGlobalDoctors();
      fetchdoctors();
    }
  }, []);




  const fetchdoctors = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctors/get-doctors/${clinicuuid}`, {
      method: "Get",
      headers: clinicHeaders()
    });
    if (res.ok) {
      const result = await res.json();
      setSelectedDoctors(result.data);
      
    }
  }


  const fetchGlobalDoctors = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctors/global-doctor-list/${clinicuuid}`, {
        method: "GET",
        headers: clinicHeaders(),
      });

      if (res.ok) {
        const result = await res.json();
        setDoctors(result.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };




  const assignDoctorsClinic =async (doctoruuid)=>{
      setButton(true);
     
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctors/assign-doctor-clinic`,{
        method : "Post",
        headers : clinicHeaders(),
        body :JSON.stringify({
            doctoruuid: doctoruuid,
            clinicuuid : clinicuuid
        })
    });

    if(res.ok){

      setTimeout(() => {
        fetchGlobalDoctors();
        fetchdoctors();
        sendData();
           setButton(false);
            toast.success("Doctor assigned successfully!", {
                position: "bottom-right",
                autoClose: 500,
        });

        setAddressModalDetails({
          doctorname : "",
          doctorimage :"" ,
          doctordegree :"",
          doctorcpf : "",
          doctorcrm : "",
          uuid : ""
        });
        reset();
        setAddressModal(false);
        setSameAsClinicAddress(false);
       






      }, 3000);
    }

  
  }


  const assignDoctorModal = async(item)=>{
     debugger;
        setAddressModal(true);

        setAddressModalDetails({
          doctorname : item.firstname + item.lastname,
          doctorimage : item.image,
          doctordegree : item.degree,
          doctorcpf : item.cpf,
          doctorcrm : item.crm,
          uuid : item.uuid
        });
        reset();
       

  }

  const addAddressDoctor = async(data)=>{
    
      debugger;
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-address/create-address`,{
        method : "Post",
        headers : clinicHeaders(),
        body : JSON.stringify({
            clinicUuid: clinicuuid,
            doctorUuid: data.doctoruuid,
            zipcode: data.Zipcode,
            street: data.Street,
            complement:data.Complement,
            postalUnit: data.PostalUnit,
            neighborhood: data.Neighborhood,
            city: data.City,
            stateCode: data.StateCode,
            stateName: data.StateName,
            region: data.Region,
            ibgeCode: data.IBGECode,
            giaCode: data.GIACode,
            areaCode: data.AreaCode,
            siafiCode: data.SIAFICode,
        })
      });

      if(res.ok){
          assignDoctorsClinic(data.doctoruuid);
      }
  }


  const updateZipCode = async(zipcode)=>{

      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-address/get-address-viacep/${zipcode}`,{
        method : "Get",
        headers : clinicHeaders()
      });

      if(res.ok){
        const result = await res.json();

       if (result.result === false || result.erro) {
          setError("Zipcode", {
            type: "manual",
            message: "Enter correct zip code",
          });

          setValue("Zipcode", "");
          return;
        }

       
        setValue("Street", result.logradouro || "");
        setValue("Complement", result.complemento || "");
        setValue("PostalUnit", result.unidade || "");
        setValue("Neighborhood", result.bairro || "");
        setValue("City", result.localidade || "");
        setValue("StateCode", result.uf || "");
        setValue("StateName", result.estado || "");
        setValue("Region", result.regiao || "");
        setValue("IBGECode", result.ibge || "");
        setValue("GIACode", result.gia || "");
        setValue("AreaCode", result.ddd || "");
        setValue("SIAFICode", result.siafi || "");
       
        setValue("doctoruuid",addressmodaldetails.uuid);

      }
  }


  const SameAsClincAddress = async(data)=>{
      
      setSameAsClinicAddress(data);



  }







  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
  <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
  <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
    <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-7xl p-4 sm:p-6 overflow-y-auto max-h-screen">
      <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
        <span className="flex">
          Doctor List
          <span
            title="You can assign doctors by selecting them from the existing list on the website—no need to enter their details if they are already registered."
            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer ml-2"
          >
            <InformationCircleIcon className="w-4 h-4 text-gray-700 gap-2" />
          </span>
        </span>
      </DialogTitle>

      <div
        className={`
          grid gap-4 max-h-[400px] h-[400px]
          grid-cols-1
          sm:grid-cols-2
          lg:${addressmodal ? "grid-cols-3" : "grid-cols-2"}
          overflow-y-auto
        `}
      >
        {/* Doctors List */}
        <div className="border theme-border rounded overflow-auto h-[300px] sm:h-[400px]">
          <p className="p-2 font-semibold">List of Doctors</p>
          <ul className="space-y-3">
            {doctors.map((item) => (
              <li
                key={item.uuid}
                className="text-gray-700 border theme-border p-3 sm:p-3 rounded flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-3 sm:gap-4"
              >
                <div className="avatar flex-shrink-0 flex justify-center sm:block">
                  <img
                    className="w-16 h-16 sm:w-12 sm:h-12 rounded-full object-cover"
                    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/doctors/profilepicture/${item.image}`}
                    alt={`Dr. ${item.firstname} ${item.lastname}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-base">{`Dr. ${item.firstname} ${item.lastname}`}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 text-sm text-gray-600 mt-1">
                    <p>Degree: {item.degree || "Specialist"}</p>
                    <p>CPF: {item.cpf || "Not Mentioned"}</p>
                    <p>CRM: {item.crm || "Not Mentioned"}</p>
                  </div>
                </div>
                <div className="sm:ml-auto flex justify-start sm:justify-end w-full sm:w-auto">
                  <button
                    disabled={button}
                    onClick={() => assignDoctorModal(item)}
                    className="btn btn-primary flex items-center px-3 py-2 rounded w-full sm:w-auto justify-center"
                  >
                    Assign
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Address Modal Section */}
        {addressmodal && (
          <div className="border theme-border rounded overflow-auto h-[300px] sm:h-[400px]">
            <p className="p-2 font-semibold">Add address selected doctors</p>
            <ul className="space-y-2 p-1">
              <li className="text-gray-700 border theme-border p-3 rounded flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-3 sm:gap-4">
                <div className="avatar flex-shrink-0 flex justify-center sm:block">
                  <img
                    className="w-16 h-16 sm:w-12 sm:h-12 rounded-full object-cover"
                    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/doctors/profilepicture/${addressmodaldetails.doctorimage}`}
                    alt={`Dr. ${addressmodaldetails.doctorname}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-base">{`Dr. ${addressmodaldetails.doctorname}`}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 text-sm text-gray-600 mt-1">
                    <p>{addressmodaldetails.doctordegree || "Specialist"}</p>
                    <p>CPF: {addressmodaldetails.doctorcpf || "Not Mentioned"}</p>
                    <p>CRM: {addressmodaldetails.doctorcrm || "Not Mentioned"}</p>
                  </div>
                </div>
              </li>
            </ul>

            <div className="text-gray-700 border theme-border rounded flex items-center space-x-4 p-2 grid grid-cols-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                <div className="flex items-center gap-2">
                  <input
                    id="sameAddress"
                    type="checkbox"
                    {...register("sameasaddress")}
                    onChange={(e) => SameAsClincAddress(e.target.checked)}
                  />
                  <label htmlFor="sameAddress" className="text-sm font-medium">
                    Same as Clinic Address
                  </label>
                </div>

                <div className="flex items-end gap-2 mt-2">
                  {sameasclinicaddress && (
                    <button
                      onClick={() => assignDoctorsClinic(addressmodaldetails.uuid)}
                      type="submit"
                      className="btn btn-primary flex items-center px-3 py-1 rounded"
                    >
                      {button ? (
                        <div
                          className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-green-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <>
                          Submit <span className="ml-2"><ArrowRightIcon className="w-4 h-4 ml-2" /></span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {!sameasclinicaddress && (
                <form onSubmit={handleSubmit(addAddressDoctor)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-2">
                    <div className="hidden">
                      <label className="block text-sm font-medium mb-1">doctoruuid</label>
                      <input type="text" {...register("doctoruuid")} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Zipcode</label>
                      <input
                        type="text"
                        {...register("Zipcode", { required: "Please enter zip code" })}
                        onBlur={(e) => updateZipCode(e.target.value)}
                      />
                      {errors.Zipcode && (
                        <p className="text-red-500 text-sm">{errors.Zipcode.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Street</label>
                      <input type="text" {...register("Street")} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Complement</label>
                      <input type="text" {...register("Complement")} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Postal Unit</label>
                      <input type="text" {...register("PostalUnit")} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Neighborhood</label>
                      <input type="text" {...register("Neighborhood")} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input type="text" {...register("City")} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">State Code</label>
                      <input type="text" {...register("StateCode")} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">State Name</label>
                      <input type="text" {...register("StateName")} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Region</label>
                      <input type="text" {...register("Region")} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">IBGE Code</label>
                      <input type="text" {...register("IBGECode")} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">GIA Code</label>
                      <input type="text" {...register("GIACode")} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Area Code</label>
                      <input type="text" {...register("AreaCode")} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">SIAFI Code</label>
                      <input type="text" {...register("SIAFICode")} />
                    </div>

                    <div className="flex items-end gap-2 mb-3">
                      <button disabled={button} type="submit" className="btn btn-primary">
                        submit
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Selected / Assigned Doctors */}
        <div className="border theme-border rounded overflow-auto h-[300px] sm:h-[400px]">
          <p className="p-2 font-semibold">List of Assigned Doctors</p>
          <ul className="space-y-3">
            {selecteddoctors.map((item) => (
              <li
                key={item.uuid}
                className="text-gray-700 border theme-border p-3 rounded flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-3 sm:gap-4"
              >
                <div className="avatar flex-shrink-0 flex justify-center sm:block">
                  <img
                    className="w-16 h-16 sm:w-12 sm:h-12 rounded-full object-cover"
                    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/doctors/profilepicture/${item.image}`}
                    alt={`Dr. ${item.firstname} ${item.lastname}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-base">{`Dr. ${item.firstname} ${item.lastname}`}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 text-sm text-gray-600 mt-1">
                    <p>{item.degree || "Specialist"}</p>
                    <p>CPF: {item.cpf || "Not Mentioned"}</p>
                    <p>CRM: {item.crm || "Not Mentioned"}</p>
                  </div>
                </div>
                <div className="sm:ml-auto flex justify-start sm:justify-end w-full sm:w-auto">
                   {item.clinicuuid === clinicuuid ? (
                      <>
                        {/* <p className="btn btn-primary flex items-center px-4 py-2 rounded w-full sm:w-auto justify-center">Added from this Clinic</p> */}
                      </>
                    ): (
                      <>
                       <button className="btn btn-primary flex items-center px-4 py-2 rounded w-full sm:w-auto justify-center">
                        
                        <ArrowLeftIcon className="w-4 h-4 ml-2" />Revoke 
                      </button>
                      </>
                      
                    )}
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex justify-start space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Close
        </button>
      </div>
    </DialogPanel>
  </div>
</Dialog>




  );
}
