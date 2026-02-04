import { addStep, addTreatmentID } from "@/components-front-end/redux/patinetquery/patientQueryRedux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";





export function SelectTreatment() {


    const [specialties,setSpecialties] = useState([]);
    const dispatch = useDispatch();


    useEffect(()=>{
        fetchSpecialties();
    },[]);


    const fetchSpecialties = async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-query/Get-specialty`,{
            method : "Get"
        });
        if(res.ok){
            const result = await res.json();
            setSpecialties(result.data);



        }
    }


    const selectTreatment = (treatmentid,name)=>{
        
        
        dispatch(addTreatmentID({ id: treatmentid, name: name }));

    }




  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
 const [searchspecialties,setSearchspecialties] = useState([]);



const onSearchFeild = (name) => {
  if (name.trim().length > 0) {
    const searchspecial = specialties.filter(x =>
      x.name.toLowerCase().includes(name.toLowerCase())
    );

    setSearchspecialties(searchspecial);
    setIsOpen(searchspecial.length > 0);
  } else {
    setIsOpen(false);
    setSearchspecialties([]);
  }
};




  return (

    <div className=" bg-gray-50 flex flex-col items-center py-10 px-4">
 
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Choose Your Specialty
      </h1>

    <div className="mx-auto w-full max-w-md mb-10 relative">
      <label htmlFor="search" className="sr-only">
        Search for treatments
      </label>

      <div className="relative group">
        {/* Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-brand">
          <svg
            className="w-5 h-5 text-body transition-colors duration-300 group-focus-within:text-brand"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="search"
          id="search"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setIsOpen(value.trim().length > 0);
            setQuery(value);
            onSearchFeild(value);

          }}
         
          placeholder="Search for treatments..."
          className="block w-full p-3 pl-10 pr-12 text-sm text-heading bg-neutral-secondary-medium border border-default-medium rounded-xl shadow-sm 
          transition-all duration-300 ease-in-out
          focus:ring-2 focus:ring-brand focus:border-brand focus:shadow-lg focus:shadow-brand/20
          group-hover:border-brand/60"
        />

       
      </div>

    
      {isOpen  && (
        <div className="absolute mt-2 w-full bg-white border border-default-medium rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
          <div className="px-4 py-2 text-xs font-semibold text-body bg-neutral-secondary-light">
            Suggestions
          </div>

          <ul className="max-h-60 overflow-y-auto">
           
            {searchspecialties.map((item, i) => (
              <li
                key={i}
                onMouseDown={() => setQuery(item.name)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-heading cursor-pointer 
                hover:bg-brand/5 hover:text-brand transition-colors duration-200"
                 onClick={()=> selectTreatment(item.id,item.name)}>
                <svg
                  className="w-4 h-4 text-body"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l4-4-4-4" />
                </svg>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>




     
      <div className="flex flex-wrap justify-center gap-4 max-w-5xl">
        {specialties.map((treatment, index) => (
          <a
            key={index}
            onClick={()=> selectTreatment(treatment.id,treatment.name)}
            className="bg-white p-4 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-neutral-primary-soft text-center w-fit cursor-pointer"
          >
            <h5 className="text-base font-semibold text-gray-800">
              {treatment.name}
            </h5>
          </a>
        ))}


      </div>
    </div>
  );
}
