import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";




export function PackageStepSeven({ clinicuuid, packageid }) {
    const [open, setOpen] = useState(true);
    const [doctors, setDoctors] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selected, setSelected] = useState([]);

const toggle = (id) => {
  setSelected((prev) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
  );
};



    useEffect(() => {


        const fetchDoctors = async () => {

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-doctor/get-doctors/${clinicuuid}`,
                    { headers: clinicHeaders() }
                );
                if (res.ok) {
                    const result = await res.json();
                    setDoctors(result.data);
                }
            } catch (err) {
                console.error("Error fetching doctors:", err);
            }
        };

        if(clinicuuid){
             fetchDoctors();
        }
       
        if(packageid){
            fetchSelectedDoctor();
        }

    }, [clinicuuid]);


    const fetchSelectedDoctor = async ()=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-doctor/get-selected-doctor/${packageid}`,{
            method : "Get",
            headers: clinicHeaders()
        });

        if(res.ok){
            const result = await res.json();

            const doctorIds = result.data.map(item => item.doctors.id);
            console.log("slected doctor",doctorIds);

            setSelected(doctorIds);

            // setSelectedDoctor({
            //     firstname : result.doctors.firstname,
            //     lastname : result.doctors.lastname,
            //     image : result.doctors.image,
            //     degree :result.doctors.degree,
            //     briefDescription :result.doctors.briefDescription 
            // })
        }
    }

    const selectDoctor =async (action,data)=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-doctor/selected-doctor`,{
            method : "Post",
            headers : clinicHeaders(),
            body : JSON.stringify({
                packageId : packageid,
                doctorId: data.uuid,
                action: action
            }),
        });

        if(res.ok){

        }
    }


    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onCancel = () => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set("pckid", packageid);
        params.set("steppackage", "6");
        router.push(`?${params.toString()}`);
    };

    const goToStepOne = () => {

        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set("pckid", packageid);
        params.set("steppackage", "8");
        router.push(`?${params.toString()}`);
    };


   







    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
                <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
                    <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
                        <span>Choose Doctor</span>
                        <span className="text-green-400">7/8</span>
                    </DialogTitle>

                    <div className="border theme-border rounded h-[500px] p-4 overflow-y-auto">
                        <label className="block mb-3 font-semibold text-base">
                            Choose Doctor
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {doctors.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        toggle(item.id);

                                       
                                        if (selected.includes(item.id)) {
                                            selectDoctor("uncheck", item);
                                            } else {
                                            selectDoctor("check", item);
                                            }

                                    }}
                                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition
                                    ${selected.includes(item.id)
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 bg-white hover:bg-gray-50"
                                        }
                                    `}>

                           
                                    <div className="flex items-center gap-3">
                                        <img
                                            className="w-14 h-14 rounded-full object-cover border"
                                            src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=doctors/profilepicture/${item.image}`}
                                            alt={item.firstname}
                                        />

                                        <div>
                                            <h5 className="text-sm font-semibold text-gray-800">
                                                Dr. {item.firstname} {item.lastname}
                                            </h5>
                                            <p className="text-xs text-gray-500">
                                                {item.degree}
                                            </p>
                                        </div>
                                    </div>

                                   
                                    <div
                                        className={`w-5 h-5 flex items-center justify-center rounded-full border-2
                                            ${selected.includes(item.id)
                                                ? "bg-green-500 border-green-500"
                                                : "border-gray-300"
                                            }
                                        `}>

                                        {selected.includes(item.id) && (
                                            <svg
                                                className="w-3 h-3 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onCancel} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-700 shadow-sm border hover:bg-gray-100 sm:mt-0 sm:w-auto">
                            Back
                        </button>
                        <button onClick={()=> goToStepOne()} type="submit" className="btn btn-primary" >
                            Next
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
