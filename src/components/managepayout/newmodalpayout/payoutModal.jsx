import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import { adminHeaders } from "@/components/utils/adminHeader";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import { PatientQueryStatus } from "@/lib/enums/patientQueryStatus";
import { formatBrazilDate } from "@/lib/formatDate";
import { ButtonSpinner } from "@/reusable/buttonSpinner";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function PayoutModal({OnTriggerStripeBalance}) {

   const {register,formState:{errors},setError,getValues} =useForm();
 
   const [sampleData,setSampleData] = useState([]);


  const [openItem, setOpenItem] = useState(null);
  const bodyRefs = useRef({}); // Store refs for each body

  const toggleAccordion = (id) => {
    setOpenItem(openItem === id ? null : id);
  };



  useEffect(()=>{
        fetchPatientQuery();
  },[]);


  const fetchPatientQuery=async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-payout/payout-patient-query`,{
        method : "Get",
        headers : await adminHeaders()
    });
    if(res.ok){
        const result= await res.json();
        setSampleData(result.data);
    }
  }

  const [totalreceived,setTotalReceived] = useState(0);
  const[clinicstobepaid,setClinicsToBePaid] = useState(0);

   const [transfertransaction,setTransferTransaction] = useState([]);
   const [clinicspaid,setClinicsPaid] = useState(0);

   const [clinic,setClinic] = useState({});
   const [doctor,setDoctor] = useState({});
   const [packages,setPackage] = useState({});
   const [patientqueryinformation,setPatientQueryInformation] = useState({});




  const fetchTrransaction = async (patientqueryid,commission)=>{
   
    debugger;
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-payout/patient-query-transaction/${patientqueryid}`,{
        method : "Get",
        headers : await adminHeaders()
    });
    if(res.ok){
       const result = await res.json();
            const totalamount = (result.data.reduce((sum, x) => sum + x.amount, 0)/100);
            const clinicspaid = (result.transfer.reduce((sum, x) => sum + x.amount, 0)/100);
            const clinicstobepaid = ((totalamount * commission)/100);
            setTotalReceived((totalamount));
            setClinicsToBePaid(totalamount - clinicstobepaid - clinicspaid);
            setTransferTransaction(result.transfer);
            setClinicsPaid(clinicspaid); 



            //patient query details
            const somedetails = sampleData.find(x => x.id === patientqueryid);
            setPatientQueryInformation(somedetails);
            if (somedetails) {
                setClinic(somedetails.clinic);
                setDoctor(somedetails.doctor);
                setPackage(somedetails.package);
            }



    }
  }


    const [amount,setAmount] = useState(0);
    const [note,setNote] = useState(0);
    const [releasebutton,setReleaseButton] = useState(false);
   



    const releaseFunds = async (verndoraccountid,patientqueryid,commission) => {
       
        if (Number(amount) <= 0) {
            alert("Please enter amount");
            return false;
        }

         setReleaseButton(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-payout/release-fund`,{
            method : "Post",
            headers : await adminHeaders(),
            body: JSON.stringify({
                verndoraccountid: verndoraccountid,
                patientqueryid: patientqueryid,
                amount: amount,
                note: note,
            })
        });
        if(res.ok){
            const result = await res.json();
            if(result.status === 401){
                toast.error("Balance not available",{
                    position : "bottom-right",
                    autoClose : 3000
                })
            }
            setAmount(0);
            setNote("");
            OnTriggerStripeBalance();

            toast.success("Fund Transfered Successfully",{
                position : "bottom-right",
                autoClose : 3000
            });
            
            fetchTrransaction(patientqueryid,commission);
           
        }
        setReleaseButton(false);
    }



     const statusLabel = (status) => {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold";

  switch (status) {
    case PatientQueryStatus.PENDING:
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700 ml-3`}>
          Pending
        </span>
      );

    case PatientQueryStatus.ASSIGNED:
      return (
        <span className={`${base} bg-blue-100 text-blue-700 ml-3`}>
          Assigned
        </span>
      );

    case PatientQueryStatus.COMPLETED:
      return (
        <span className={`${base} bg-green-100 text-green-700 ml-3`}>
          Closed
        </span>
      );

    default:
      return (
        <span className={`${base} bg-gray-100 text-gray-600 ml-3`}>
          —
        </span>
      );
  }
};


  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-5">
      <h2 className="text-2xl font-bold mb-6">Payout Details</h2>

      {sampleData.map((item) => (
        <ComponentCard
          key={item.id}
          className="mb-4 transition-all hover:shadow-lg overflow-hidden">
          
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => {
                toggleAccordion(item.id);
                fetchTrransaction(item.id,item.clinic.commission);
            }}>

            <h3 className="text-lg font-semibold"># {item.querycode}     

              
                {statusLabel(item.status)}

            </h3>
            <span className="text-gray-400 text-xl">
              {openItem === item.id ? "−" : "+"}
            </span>
          </div>

         
          <div
            ref={(el) => (bodyRefs.current[item.id] = el)}
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
            style={{
              maxHeight:
                openItem === item.id
                  ? `${bodyRefs.current[item.id]?.scrollHeight}px`
                  : "0px",
            }}>

            <div className="mt-3 text-gray-700 text-sm border-t pt-3">

                      <div className="grid grid-cols-4 gap-4">
                        
                          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
                              <p className="text-sm text-indigo-700">Total Received</p>
                              <p className="text-2xl font-semibold text-indigo-900">
                                  {brazilianCurrency(totalreceived)}
                                  
                              </p>
                          </div>

                        
                          <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                              <p className="text-sm text-purple-700">Platform Commission Interest</p>
                              <p className="text-2xl font-semibold text-purple-900">
                                  {item.clinic.commission || ""}  %
                              </p>
                          </div>

                        
                          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                              <p className="text-sm text-amber-700">Clinic To Be Paid</p>
                              <p className="text-2xl font-semibold text-amber-900">
                                  {brazilianCurrency(clinicstobepaid)}
                              </p>
                          </div>

                        
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                              <p className="text-sm text-emerald-700">Clinic Paid</p>
                              <p className="text-2xl font-semibold text-emerald-900">
                                 
                                 {brazilianCurrency(clinicspaid)}
                              </p>
                          </div>

                      </div>
                      
                      <ComponentCard className="mt-3">

                          <div className=" gap-4">

                              <div className="grid grid-cols-3 gap-4 mb-5">
                                  <div class="flex items-center gap-2.5">

                                      {/* {JSON.stringify({doctor})}
                                    {JSON.stringify({packages})} */}

                                      <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
                                          <span class="font-medium text-body"><div>{clinic?.name?.charAt(0)}</div></span>
                                      </div>

                                      <div class="font-medium text-heading">
                                          <div>{clinic.name}</div>
                                          <div class="text-sm font-normal text-body">CNPJ : {clinic.cnpj}</div>
                                      </div>
                                  </div>


                                  <div class="flex items-center gap-2.5">
                                      <img class="w-10 h-10 rounded-full" src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/doctors/profilepicture/${doctor.image}`} alt="" />
                                      <div class="font-medium text-heading">
                                          <div>Dr. {doctor.firstname} {doctor.lastname}</div>
                                          <div class="text-sm font-normal text-body">{doctor.degree}</div>
                                      </div>
                                  </div>


                                  <div class="flex items-center gap-2.5">

                                      <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
                                          <span class="font-medium text-body">PKG</span>
                                      </div>

                                      <div class="font-medium text-heading">
                                          <div>{packages.title}</div>
                                          <div class="text-sm font-normal text-body">{brazilianCurrency(packages.discountedprice)}</div>
                                      </div>
                                  </div>
                              </div>
                              <hr></hr>

                              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-5">


                                  <div>
                                      <Label>Patient Requested No</Label>
                                      <div className="text-gray-700"><b>{patientqueryinformation?.querycode}</b></div>
                                  </div>

                                  <div>
                                      <Label>Name</Label>
                                      <div className="text-gray-700">{patientqueryinformation?.patientName}</div>
                                  </div>

                                  <div>
                                      <Label>Email</Label>
                                      <div className="text-gray-700">{patientqueryinformation?.email || "Not verified"}</div>
                                  </div>

                                  <div>
                                      <Label>Phone Number</Label>
                                      <div className="text-gray-700">{patientqueryinformation?.phoneNumber === "0" ? "Not verified" : patientqueryinformation?.phoneNumber}</div>
                                  </div>

                                  <div>
                                      <Label>Created At</Label>
                                      <div className="text-gray-700">{formatBrazilDate(patientqueryinformation?.createdAt)}</div>
                                  </div>

                                  <div>
                                      <p className="text-xs text-gray-500 mb-1">Medical Reports</p>
                                      <p className="text-sm text-gray-800 font-medium">
                                          {patientqueryinformation.medicalReportsValue || "--"}
                                      </p>
                                  </div>


                                  <div>
                                      <p className="text-xs text-gray-500 mb-1">Treatment</p>
                                      <p className="text-sm text-gray-800 font-medium">
                                          {patientqueryinformation.treatmentName || "--"}
                                      </p>
                                  </div>

                                  <div>
                                      <p className="text-xs text-gray-500 mb-1">What Matters Most</p>
                                      <p className="text-sm text-gray-800 font-medium">
                                          {patientqueryinformation.whatMatterMostName || "--"}
                                      </p>
                                  </div>

                                  <div>
                                      <p className="text-xs text-gray-500 mb-1">Procedure Time</p>
                                      <p className="text-sm text-gray-800 font-medium">
                                          {patientqueryinformation.procedureTimeValue || "--"}
                                      </p>
                                  </div>

                              </div>
                          </div>

                          
 
                      </ComponentCard>

                     <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5 ${item.status === PatientQueryStatus.ASSIGNED ? "" : "hidden"}`}>

                          <div className=" bg-white border border-gray-200 rounded-2xl shadow-sm p-5 h-fit">
                              <h2 className="text-lg font-semibold text-gray-800 mb-4">Release Funds</h2>

                              <div className="space-y-4">

                                  <div>
                                      <label className="block text-sm font-medium text-gray-600 mb-1">
                                          Amount to Release
                                      </label>
                                      <input
                                          value={amount}
                                          type="number"
                                          min={1}
                                          placeholder="Enter amount"
                                          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                          onChange={(e) => {
                                              setAmount(e.target.value)
                                          }} />

                                  </div>

                                  <div className="hidden">
                                      <label className="block text-sm font-medium text-gray-600 mb-1">
                                          Note (Optional)
                                      </label>
                                      <input
                                          type="text"
                                          placeholder="Add a note for this payout"
                                          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                          onChange={(e) => {
                                              setNote(e.target.value)
                                          }}
                                      />
                                  </div>



                                  {releasebutton ? <ButtonSpinner></ButtonSpinner> : (<>


                                      

                                      {clinicstobepaid > 0 ? (<>
                                          <button
                                              disabled={releasebutton}
                                              onClick={() => releaseFunds(item.clinic.stripeaccountid || "", item.id,item.clinic?.commission)}
                                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition shadow-sm">
                                              Release Funds
                                          </button>
                                      </>) : (<>

                                      </>)}
                                  </>)}





                              </div>
                          </div>

                          <div className=" bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                              <h2 className="text-lg font-semibold text-gray-800 mb-4">Transfered Transactions</h2>

                              <div className="bg-white shadow-xl rounded-2xl p-4 border border-gray-100 h-[200px] overflow-auto">
                                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                                      <thead className="bg-gray-50 sticky top-0">
                                          <tr>
                                              <th className="px-4 py-3 text-left font-medium text-gray-600">Transfer ID</th>
                                              <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                                              <th className="px-4 py-3 text-left font-medium text-gray-600">Amount</th>
                                              <th className="px-4 py-3 text-left font-medium text-gray-600">Currency</th>
                                              <th className="px-4 py-3 text-left font-medium text-gray-600">Destination</th>
                                             
                                              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                                          </tr>
                                      </thead>

                                      <tbody className="divide-y divide-gray-100 bg-white">
                                          {transfertransaction.map((item) => (
                                              <tr key={item.id} className="hover:bg-gray-50 transition">
                                                  <td className="px-4 py-3 font-medium text-gray-800">{item.id}</td>
                                                  <td className="px-4 py-3 text-gray-600">
                                                      {formatBrazilDate(new Date(item.created * 1000).toLocaleDateString())}
                                                  </td>
                                                  <td className="px-4 py-3 font-semibold text-green-600">
                                                      {brazilianCurrency((item.amount / 100).toFixed(2))}
                                                  </td>
                                                  <td className="px-4 py-3 uppercase text-gray-600">{item.currency}</td>
                                                  <td className="px-4 py-3 text-gray-600">{item.destination}</td>
                                                
                                                  <td className="px-4 py-3">
                                                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                                          Completed
                                                      </span>
                                                  </td>
                                              </tr>
                                          ))}
                                      </tbody>
                                  </table>
                              </div>
                          </div>
      



                    </div>

            </div>



          </div>
        </ComponentCard>
      ))}
    </div>
  );
}


