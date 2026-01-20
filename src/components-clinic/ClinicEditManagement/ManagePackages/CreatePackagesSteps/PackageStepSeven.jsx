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
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-doctor/get-selected-doctor/${packageid}`,{
            method : "Get",
            headers: clinicHeaders()
        });

        if(res.ok){
            const result = await res.json();

            console.log("slected doctor",result.data);
            setSelectedDoctor(result.data.doctors);

            // setSelectedDoctor({
            //     firstname : result.doctors.firstname,
            //     lastname : result.doctors.lastname,
            //     image : result.doctors.image,
            //     degree :result.doctors.degree,
            //     briefDescription :result.doctors.briefDescription 
            // })
        }
    }

    const selectDoctor =async (data)=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-doctor/selected-doctor`,{
            method : "Post",
            headers : clinicHeaders(),
            body : JSON.stringify({
                packageId : packageid,
                doctorId: data.uuid,
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

                    <div className="border theme-border rounded h-[500px] p-4 overflow-auto">
                        <label className="block mb-2 font-medium">Choose Doctor</label>

                        <div className="relative inline-flex w-full" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full py-3 px-4 flex justify-between items-center text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            >
                                {selectedDoctor ? `Dr. ${selectedDoctor.firstname} ${selectedDoctor.lastname}` : "Select a Doctor"}

                                <svg
                                    className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <ul className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto dark:bg-neutral-800 dark:border-neutral-700">
                                    {doctors.length === 0 ? (
                                        <li className="py-2 px-3 text-gray-500">No doctors available</li>
                                    ) : (
                                        doctors.map((doctor) => (
                                            <li
                                                key={doctor.id}
                                                onClick={() => {
                                                    setSelectedDoctor(doctor);
                                                    selectDoctor(doctor);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="flex items-center cursor-pointer py-2 px-3 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400"
                                            >
                                                {/* Avatar */}
                                                <img
                                                    className="w-10 h-10 rounded-full object-cover mr-3"
                                                    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/doctors/profilepicture/${doctor.image}`}
                                                    alt={`Dr. ${doctor.firstname} ${doctor.lastname}`}
                                                />
                                                {/* Name */}
                                                <span>Dr. {doctor.firstname} {doctor.lastname}</span>
                                            </li>

                                        ))
                                    )}
                                </ul>
                            )}
                        </div>

                        {
                            selectedDoctor && (

                                <div className=" inline-flex w-full mt-10">
                                    <a href="#" className="flex flex-col items-center bg-neutral-100 p-6 border border-gray-200 rounded-lg shadow md:flex-row w-full">
                                        <img
                                            className="object-cover w-full rounded-lg h-64 md:h-auto md:w-48 mb-4 md:mb-0"
                                            src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/doctors/profilepicture/${selectedDoctor.image}`}
                                            alt=""
                                        />
                                        <div className="flex flex-col justify-between md:p-4 leading-normal">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                                Dr. {selectedDoctor.firstname} {selectedDoctor.lastname}
                                            </h5>
                                            <p className="text-sm text-gray-500 font-medium">
                                                {selectedDoctor.degree || "Specialist"}
                                            </p>
                                            <p className="mb-6 text-gray-700">

                                                <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: selectedDoctor.briefDescription }} />
                                            </p>
                                            <div>
                                                
                                            </div>
                                        </div>
                                    </a>
                                </div>

                            )
                        }











                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onCancel} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-700 shadow-sm border hover:bg-gray-100 sm:mt-0 sm:w-auto">
                            Cancel
                        </button>
                        <button onClick={()=> goToStepOne()} type="submit" className="btn btn-primary" disabled={!selectedDoctor}>
                            Next
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
