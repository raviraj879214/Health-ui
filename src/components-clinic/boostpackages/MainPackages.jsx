"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { clinicHeaders } from "../utils/clinicHeaders";
import { useEffect, useState } from "react";
import BoostList from "../boostpackages/BoostLists";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Select from "react-dropdown-select";
import {Listofactivepackages} from "../boostpackages/ListOfActivePackages";
import {brazilianCurrency} from "../../lib/brazilianCurrency";
import { PackageVerifyStatus } from "@/lib/enums/packageVerifyStatus";


export function MainPackage() {

    const [boostpackages, setBoostPackages] = useState([]);
    const [open,setOpen] = useState(false);
    const[selectedboostpackages,setSelectedBoostPackages] = useState({});

    const [degree,setDegree]= useState("");
    const [degreeOptions,setdegreeOptions]= useState([]);

    const [clinics,setClinics] = useState("");
    const [clinicsOptions,setClinicOptions] = useState([]);


    const [button,setButton] = useState(false);
    const [clinicuserid,setClinicUserid] = useState("");


    const [clinicpackage,setClinicPackage] = useState([]);

    useEffect(() => {
        fetchBoostPackages();
        fetchClinicPackages();
    }, []);



    const fetchClinicPackages =async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/boost-packages/get-clinic-packages`,{
                method : "Get",
                headers : clinicHeaders(),
            });

            if(res.ok){
                const result = await res.json();

                setClinicUserid(result.clinicuserid);
                
                

                setClinicPackage(result.data);
                const clinicarray =result.clinics.map((item)=>({
                    label: item.name,
                    value: item.uuid
                }));
                setClinicOptions(clinicarray);

            }

    }








    const fetchBoostPackages = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/boost-packages/get-boost-packages`, {
            method: "Get",
            headers: clinicHeaders(),

        });

        if (res.ok) {
            const result = await res.json();
            setBoostPackages(result.data.filter(x=>x.type === 0));
        }
    }


    const openPayModal = (data)=>{
        setSelectedBoostPackages({
            packagename : data.name,
            packageprice: data.price,
            packageduration:data.durationDays,
            packageid : data.id
        });

        setOpen(true);
    }




const handleClick = async (selectedpackages) => {

    if(!clinics){
        alert("Please select clinic");
       return ;
    }
    if (!degree) {
       alert("Please select treatment package");
       return ;
    }
    


        setButton(false);
        debugger;
        console.log("degree",degree[0]);

    try {
        
        const amount = selectedpackages.packageprice;
        const metadata = {
                packagename: selectedpackages.packagename,
                packageprice: selectedpackages.packageprice,
                packageduration: selectedpackages.packageduration,
                boostpackageid: selectedpackages.packageid,
                clinicpackageid : degree[0].value,
                clinicuserid: clinicuserid,
            };

      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/payments/create-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, metadata }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create session");
      }

      const data = await res.json();
      window.location.href = data.url; // Redirect to Stripe Checkout
    } catch (err) {
      console.error(err);
      alert("Payment start failed: " + (err?.message || err));
    } finally {
     
    }

    setButton(true);
  };




    const onChangeClinic = async (dataid) => {
        
       const packagearray = clinicpackage
        .filter(x => x.clinicId === dataid && x.status == PackageVerifyStatus.VERIFIED)
        .map(item => ({
            label: item.title,
            value: item.id
        }));
        
        setDegree("");
        setdegreeOptions([]);
        setdegreeOptions(packagearray);
    }





    return (<>

        <ComponentCard title="List of Packages">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {boostpackages.map(pkg => (
                        <div 
                        key={pkg.id} 
                        className="border theme-border p-4 rounded-lg flex flex-col justify-between"
                        >
                        <div>
                            <p className="font-semibold">{pkg.name}</p>
                            <p className="text-gray-600">{brazilianCurrency(pkg.price)}</p>
                            <p className="text-gray-500 text-sm">{pkg.durationDays} days</p>
                        </div>

                        <button 
                         onClick={()=> {
                           
                            openPayModal(pkg)

                         }}
                        className="btn btn-primary mt-3 py-1 px-3 text-sm rounded-md w-full">
                           Buy Now
                        </button>
                        </div>
                    ))}
            </div>


            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
                            <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
                                <span>Pay for Packages</span>
                                <span className="text-green-400"></span>
                            </DialogTitle>
                           <div className="">
  
                               
                                <div className="border theme-border p-6 rounded-xl bg-gray-50 shadow-sm space-y-6">

                                 
                                    <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-800">Boost Package Details</h2>
                                    <span className="background-theme px-3 py-1 text-sm  text-blue-600 rounded-full">
                                        Premium Package
                                    </span>
                                    </div>

                                   
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                    <div className="p-4 bg-white rounded-lg border theme-border shadow-sm">
                                        <p className="text-sm text-gray-500">Package Name</p>
                                        <p className="text-lg font-semibold text-gray-800">
                                        {selectedboostpackages.packagename}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-white rounded-lg border theme-border shadow-sm">
                                        <p className="text-sm text-gray-500">Price</p>
                                        <p className="text-lg font-semibold text-green-600">
                                        
                                         {brazilianCurrency(selectedboostpackages.packageprice)}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-white rounded-lg border theme-border shadow-sm">
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="text-lg font-semibold text-gray-800">
                                        {selectedboostpackages.packageduration} days
                                        </p>
                                    </div>

                                    </div>

                                    <hr className="theme-border" />

                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                         <label className="block mb-2 flex align-items-start  font-medium text-gray-700">
                                            Choose Clinic
                                        </label>
                                         <div className="bg-white p-2 rounded-lg border theme-border shadow-sm">

                                            <Select
                                                options={clinicsOptions}
                                                value={clinics}
                                                onChange={(selected) => {
                                                    console.log("selected",selected[0].value);
                                                    setClinics(selected);
                                                    onChangeClinic(selected[0].value);
                                                }}
                                                placeholder="Search clinic..."
                                                className="basic-select w-fit"
                                                classNamePrefix="select"
                                                
                                            />
                                        </div>

                                    </div>
                                    <div>
                                        <label className="block mb-2 flex align-items-start  font-medium text-gray-700">
                                            Treatment Package
                                        </label>
                                        <div className="bg-white p-2 rounded-lg border theme-border shadow-sm">

                                            <Select
                                                options={degreeOptions}
                                                value={degree}
                                                onChange={(selected) => {
                                                    setDegree(selected)
                                                }}
                                                placeholder="Search treatment package..."
                                                className="basic-select w-fit"
                                                classNamePrefix="select"
                                                
                                            />
                                        </div>
                                    </div>
                                  </div>
                                   
                                   

                                </div>



                           </div>
                           
                            <div className="mt-6 flex justify-end space-x-3 border-t pt-4">

                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                        onClick={() => setOpen(false)}>
                                        Cancel
                                    </button>
                                    
                                    <button
                                        disabled={button}
                                        onClick={()=> handleClick(selectedboostpackages)}
                                        type="button"
                                        className="btn btn-primary">
                                        Pay Now
                                    </button>
                            </div>


                        </DialogPanel>
                    </div>
                </div>
            </Dialog>


            <Listofactivepackages></Listofactivepackages>


        </ComponentCard>

    </>);
}