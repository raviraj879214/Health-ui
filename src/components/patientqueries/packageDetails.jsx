import { brazilianCurrency } from "@/lib/brazilianCurrency";
import { useEffect, useState } from "react";
import { adminHeaders } from "../utils/adminHeader";
import { toast, ToastContainer } from "react-toastify";







export function PackageDetails({ querydetails , id , onData }) {


    const [changename,setChangeName] = useState(false);
    const[packageslist,setpackageslist] = useState([]);
    const [selectedpackageid,setSelectedPackageID] = useState("");

     useEffect(() => {
        fetchpackageslist();
     }, [id]);



    const fetchpackageslist = async ()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/get-packages-list/${id}`,{
        method : "Get",
        headers : await adminHeaders()
      });
      if(res.ok){
        const result =await res.json();
        setpackageslist(result.data);
      }
    }


    const assignPackageToQuery = async()=>{
      debugger;
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/assign-package-query`,{
                method : "Post",
                headers : await adminHeaders(),
                body:JSON.stringify({
                  packageid: selectedpackageid,
                  queryid: querydetails.id
                })
              });
              if(res.ok){
                const result = await res.json();
                  setChangeName(false);
                  setSelectedPackageID("");
                   onData(result.data.updatedAt);
                  toast.success("Packages changed/assigned successfully",{
                    position : "bottom-right",
                    autoClose : 3000
                  });
      
              }

    }




    
    return (<>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <ToastContainer></ToastContainer>
            <div className="flex items-center justify-between mb-4">
                <h6 className="font-bold text-gray-900">
                    Package Details 
                </h6>
            </div>


        {changename ? (
          <>

            <div className=" relative bg-white border border-gray-200 rounded-xl shadow-md p-4 flex items-center justify-between mb-5">
              
              <select
                className="flex-1 px-3 py-2 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0"
                value={selectedpackageid}
                onChange={(e)=> setSelectedPackageID(e.target.value)}>

                <option value="" disabled>
                  Select Packages
                </option>
                {packageslist.map((item) => (
                  <option key={item.id} value={item.id} >
                    {item.title}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => {
                  setChangeName(false);
                  setSelectedPackageID("");
                }}>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>


          </>
        ) : (
          <>
            <p className="text-lg font-semibold text-gray-800 mb-3">
              {querydetails.package?.title}
            </p>

          </>
        )}

            <p className="text-gray-600 mb-2">
                <span className="font-semibold">Actual Price:</span>{" "}
                {brazilianCurrency(querydetails.package?.actualprice)}
            </p>

            <p className="text-gray-600 mb-2">
                <span className="font-semibold">Discounted Price:</span>{" "}
                {brazilianCurrency(querydetails.package?.discountedprice)}
            </p>
            

            {selectedpackageid !== "" ?(<>
                <button
                onClick={()=> assignPackageToQuery() }
                className="border border-black px-4 py-2 rounded-2xl hover:bg-gray-100 transition w-full">
                      Save Changes
            </button>
            </>):(
              <>
                <button
                onClick={()=> setChangeName(true)}
                className="border border-black px-4 py-2 rounded-2xl hover:bg-gray-100 transition w-full">
                      Edit
            </button>
              
              </>
            )}

        </div>



    </>);
}