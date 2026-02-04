'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { nextStep, prevStep } from '@/components-front-end/redux/partnerregister/registerSlice';
import LocationPicker from '@/googlemapscomponents/locationPicker';

export  function StepFive() {
  const router = useRouter();
  const step = useSelector((state) => state.register.step);
  const dispatch = useDispatch();
  const [cliniclocation,setClinicLocation] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
   const uuid = useSelector((state) => state.register.uuid);




   useEffect(()=>{
           if(uuid){
               fetchClinicDetails();
           }
   
        },[uuid]);
   
        const fetchClinicDetails = async () =>{
           const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/get-clinic-details/${uuid}`,{
               method : "Get"
           });
           if(res.ok){
               debugger;
                 const result = await res.json();
                setLatitude(result.data.latitude);
                setLongitude(result.data.longitude);

                // setClinicLocation(
                //     `${result.data.street}, ${result.data.address_number}${result.data.complement ? ' - ' + result.data.complement : ''}, ` +
                //     `${result.data.neighborhood}, ${result.data.citycep}, ${result.data.state} - ${result.data.cep}`
                //   );


           }
        }

    

          const onCreate =async (lat,lng)=>{
                debugger;
    
                const  res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/insert-clinic-details`,{
                    method : "Post",
                    headers:{
                        "content-type" : "application/json"
                    },
                    body: JSON.stringify({
                        "uuid" : uuid,
                        "latitude" : lat,
                        "longitude" : lng
                    })
                });
                const result= await res.json();
                if(result.statusCode== 400){
      
                }
                if(res.ok){
                   
  
                    // dispatch(nextStep());
                }
             }








  return (
    <div className="my-20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Become a Partner {cliniclocation}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Join our partner network and grow your business with us.
          </p>
        </div>

        <div className="relative bg-white/90 backdrop-blur rounded-2xl shadow-xl border p-8 md:p-10">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white px-5 py-1 rounded-full text-sm font-medium shadow">
            Step {step} of 6
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                Select Your Clinic Location
              </h3>
              <p className="text-gray-600">
                Fill out your clinic information and select your exact location on the map.
              </p>

              {/* <p className="text-gray-700 font-medium mt-2">
                Selected coordinates: {latitude?.toFixed(6)}, {longitude?.toFixed(6)}
              </p> */}

            </div>

            <div className="w-full h-96 md:h-auto">
              <LocationPicker

                lat={latitude} 
                lng={longitude}  
                locationtext={cliniclocation}
                onSelect={(lat, lng) => {
                  setLatitude(Number(lat));
                  setLongitude(Number(lng));
                  onCreate(Number(lat),Number(lng));
                }}
              />
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between border-t pt-8">
            <button
              type="button"
              onClick={() => dispatch(prevStep())}
              disabled={step === 1}
              className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              ← Back
            </button>

            <button
             onClick={()=> dispatch(nextStep())}
              id="submitOtpButton"
              type="submit"
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
