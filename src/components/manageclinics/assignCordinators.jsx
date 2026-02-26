import { useState, useEffect } from "react";
import Label from "../form/Label";
import { Plus, Minus } from "lucide-react";
import { adminHeaders } from "../utils/adminHeader";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useConfirm } from "@/hooks/useConfirm";

/* 🔥 Shared state across all instances */
let activeClinicId = null;

export function AssignCordinator({ clinicid , cordinator }) {

    const [open, setOpen] = useState(false);
    const [cord,setCord] = useState(cordinator);

    const [options,setOptions] = useState([]);

    const {register,handleSubmit,setValue,getValues,formState:{errors},reset} = useForm();

    const {ConfirmDialog ,confirm} = useConfirm();



    useEffect(() => {
        if (activeClinicId !== clinicid) {
            setOpen(false);
            fetchCordinators();
        }
    }, [clinicid]);

    const handleToggle = () => {
        if (activeClinicId === clinicid) {
            activeClinicId = null;
            setOpen(false);
        } else {
            activeClinicId = clinicid;
            setOpen(true);

            // Force other components to re-render
            window.dispatchEvent(new Event("accordion-update"));
        }
    };

    useEffect(() => {
        const closeOthers = () => {
            if (activeClinicId !== clinicid) {
                setOpen(false);
            }
        };

        window.addEventListener("accordion-update", closeOthers);

        return () =>
            window.removeEventListener("accordion-update", closeOthers);
    }, [clinicid]);




    const fetchCordinators = async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-cordinators`,{
            method : "Get",
            headers : await adminHeaders()
        });
        if(res.ok){
            const result= await res.json();
            setOptions(result.data);
        }
    }


    const submit=async(data)=>{
       debugger;
        debugger;
       const result = await confirm("Are you sure you want to proceed with approval? Updating the coordinator will not impact previously received patient queries. The change will only affect future assignments to clinics.");
            if (!result) {
            console.log("User not confirmed!");
            return false;
        }
    

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/update-cordinators`,{
            method : "Put",
            headers : await adminHeaders(),
            body: JSON.stringify({
                clinicid : clinicid,
                cordinatorid: data.option
            })
        });
        if(res.ok){
            const  result= await res.json();
            toast.success("Cordinator changed successfully",{
                   position : "bottom-right",
                   autoClose : 3000
            });
           
            setCord(result.data.cordinator);
             reset();

        }


    }




    return (
        <div className="bg-white border rounded-xl p-5 shadow-sm w-full overflow-hidden">
            <ConfirmDialog></ConfirmDialog>
  {/* Header */}
  <div className="flex items-center justify-between gap-4">
    <Label className="text-sm font-semibold text-gray-800">
      Change Coordinator
    </Label>

    <button
      onClick={handleToggle}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition shrink-0"
    >
      {open ? <Minus size={16} /> : <Plus size={16} />}
    </button>
  </div>

  {/* Coordinator Info */}
  <div className="flex items-start gap-4 mt-4 min-w-0">

    {/* Avatar */}
    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-semibold text-blue-600 shrink-0">
      {cord?.firstname?.charAt(0) || "N"}
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-900 break-words">
        {cord?.firstname || "N/A"} {cord?.lastname || ""}
      </p>

      <p className="text-xs text-gray-500 break-all">
        {cord?.email || "No email available"}
      </p>
    </div>

  </div>


            {open && (
                <div className="mt-5 pt-4 border-t space-y-4">

                    <p className="text-sm text-gray-600">
                        You can change the assigned coordinator below.
                    </p>


                    <form onSubmit={handleSubmit(submit)} className="space-y-4">

                        {/* Select Field */}
                        <div className="space-y-1">
                            <select
                                {...register("option", { required: "Please select coordinator" })}
                                className={`w-full border rounded-lg px-3 py-2 text-sm bg-white
                                        focus:outline-none focus:ring-2 focus:ring-blue-500
                                        ${errors.option ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
                                        `}
                                >
                                <option value="">Select Coordinator</option>

                                {options.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.firstname} {item.lastname} - ({item.email})
                                    </option>
                                ))}
                            </select>

                            {/* Error Message */}
                            {errors.option && (
                                <p className="text-xs text-red-600 font-medium">
                                    {errors.option.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            Update Coordinator
                        </button>

                    </form>

                </div>
            )}

</div>
    );
}