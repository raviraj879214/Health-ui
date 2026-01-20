"use client"
import { nextStep, prevStep, setclinicid, setOtp, setStep } from "@/components-front-end/redux/partnerregister/registerSlice";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";








export function StepThree(){

 const step = useSelector((state) => state.register.step);
 const email = useSelector((state) => state.register.email);
 const uuid = useSelector((state) => state.register.uuid);
 const savedotp = useSelector((state) => state.register.otp);
 

 const [clinicid,setClinicId] = useState(null);
 const dispatch = useDispatch();
 const [countrycode,setCountryCode] = useState("+55");
const [button,setButton] = useState(false);

          const {
       register,
       handleSubmit,
       formState: { errors },
       setValue,
       watch,
       setError,
       getValues
     } = useForm();

     useEffect(()=>{
        if(uuid){
            fetchClinicDetails();
        }
     },[uuid]);





     const fetchClinicDetails = async () =>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/get-clinic-details/${uuid}`,{
            method : "Get"
        });

        if(res.ok){
            debugger;

            const result = await res.json();

            if(result.data == null){
                return;
            }

            dispatch(setclinicid(result.data?.uuid || ""));


            setClinicId(result.data?.uuid || "");
            setValue("clinicname",result.data.name);
            setValue("websiteurl",result.data.websiteurl);
            setValue("clinicemail",email);
            setValue("cnpj",result.data.cnpj);
            setValue("phonenumber",result.data.phone);
            const phoneverify = result.data.phoneVerify;
            setContinueButton(phoneverify ? true : false);

        }
     }



     const onCreate =async (data)=>{
        debugger;
        debugger;
        const  res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/insert-clinic-details`,{
            method : "Post",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                "name" :data.clinicname,
                "websiteurl": data.websiteurl,
                "uuid" : uuid,
                "clinicemail" : data.clinicemail,
                "cnpj" : data.cnpj,
                "clinicid" : clinicid,
                "phone" : data.phonenumber,
                "phoneVerify" : continuebutton ? 1 : 0
                
            })
        });
       

       

        
       

         if (res.ok) {
             debugger;
             const result = await res.json();

             if (result.statusCode === 401) {
                 setError("cnpj", { type: "manual", message: `cnpj already exist try another` });
                 return;
             }

             if (result.statusCode === 400) {
                 setError("clinicname", { type: "manual", message: `clinic name already exist try another` });
                 return;
             }


             fetchClinicDetails();
             dispatch(nextStep());
         }

     }





    const [verify,setverfiy] = useState(false);
    
    const [continuebutton,setContinueButton] = useState(false);


    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const timer = 60;

    useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

const phoneRulesByCountry = {
  "+1": { min: 10, max: 10 }, // USA
  "+91": { min: 10, max: 10 }, // India
  "+44": { min: 10, max: 11 }, // UK
  "+61": { min: 9, max: 9 },   // Australia
  "+55": { min: 10, max: 11 }, // Brazil
};



  const validatePhoneManually = (phone) => {

  if (!phone) {
    setError("phonenumber", { type: "manual", message: "Enter phone number" });
    return false;
  }


  const digits = phone.replace(/\D/g, "");


  if (!/^\d+$/.test(digits)) {
    setError("phonenumber", { type: "manual", message: "Only digits allowed" });
    return false;
  }



  const rule = phoneRulesByCountry[countrycode];
  if (rule) {
    if (digits.length < rule.min || digits.length > rule.max) {
      setError("phonenumber", { 
        type: "manual", 
        message: `Phone number must be ${rule.min}-${rule.max} digits` 
      });
      return false;
    }
  }

  // 5️⃣ Passed all checks
  return true;
};



    const verifyphonenumber = async (phone) => {

        debugger;
        setError("phonenumber", { type: "manual", message: `` });
        if (!validatePhoneManually(phone)) {
            return; 
        }


        const fullPhoneNumber = `${countrycode}${phone}`; 
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/send-otp-phone`, {
            method: "Post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                phone:  fullPhoneNumber
            })
        });


        if (res.ok) {
            const result = await res.json();
             if(result.success == true)   {
                 dispatch(setOtp(result.otp || "0000"));
                setverfiy(true);
                setSeconds(timer);
                setIsActive(true);
             }
             else{
                dispatch(setOtp(result.otp || "0000"));
                setverfiy(true);
                setSeconds(timer);
                setIsActive(true);

                setError("phonenumber", { 
                    type: "manual", 
                    message: `Unfortunelty something went wrong try after some times or just enter test  OTP : 0000` 
                });


             }
           
        }

    }




const inputsRef = useRef([]);
const OTP_LENGTH = 4;

const getFullOtp = () => { return inputsRef.current .slice(0, OTP_LENGTH) .map(input => input?.value || "") .join(""); };

const  onOtpComplete = async (otp) => {
  debugger;

  if(otp === savedotp || "0000"){
    
        // const res = await fetch(`${process}/v1/api/partner-register/verify-otp-phone`,{
        //     method : "Post",
        //     headers :{
        //         "content-type" : "application/json"
        //     },
        //     body: JSON.stringify({
        //         "clinicid" : clinicid,
        //          "phoneverify" : 1
        //     })
        // });
        // if(res.ok){
        //     const result = await res.json();
        // }

        setContinueButton(true);

        setverfiy(false);

  }
};



const handleChange = (e, index) => {
    debugger;
  const value = e.target.value.replace(/\D/g, "");
  if (!value) return;

  e.target.value = value[0];

  if (index < OTP_LENGTH - 1) {
    inputsRef.current[index + 1]?.focus();
  }

  const fullOtp = getFullOtp();

  if (fullOtp.length === OTP_LENGTH) {
    onOtpComplete(fullOtp); // 🔥 SHOW ALERT
  }

};

const handlePaste = (e) => {
  e.preventDefault();

  const paste = e.clipboardData
    .getData("text")
    .replace(/\D/g, "")
    .slice(0, OTP_LENGTH);

  paste.split("").forEach((char, index) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index].value = char;
    }
  });

  inputsRef.current[paste.length - 1]?.focus();

  // 🔥 SHOW ALERT AFTER PASTE
  if (paste.length === OTP_LENGTH) {
    onOtpComplete(paste);
  }
};


const handleKeyDown = (e, index) => {
  if (e.key === "Backspace" && !e.target.value && index > 0) {
    inputsRef.current[index - 1]?.focus();
  }
};





    return(<>
        

        <div className="my-20">
            <div className="container max-w-4xl mx-auto px-4">


                <div className="text-center mb-12">

                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        Become a Partner   
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Join our partner network and grow your business with us.
                    </p>
                </div>


                <div className="relative bg-white/90 backdrop-blur rounded-2xl shadow-xl border p-8 md:p-10">

                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white px-5 py-1 rounded-full text-sm font-medium shadow">
                        Step {step} of 3
                    </div>

                    <form onSubmit={handleSubmit(onCreate)}>


                        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-8 items-start gap-2">

                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    Create Clinic
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Add the clinic name and website. This will create the primary clinic, after which you can add the remaining ones.
                                </p>
                            </div>



                            <div className="relative">

                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Clinic Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Clinic name"
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register("clinicname", {
                                                required: "Please enter your clinic name",
                                            })} />

                                        {errors.clinicname && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {errors.clinicname.message}
                                            </p>
                                        )}


                                    </div>

                                    <div className="hidden">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Clinic Email 
                                        </label>
                                        <input
                                           value={email}
                                            type="text"
                                            placeholder="Clinic email"
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register("clinicemail", {
                                                required: "Please enter your clinic email",
                                            })} />

                                        {errors.clinicemail && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {errors.clinicemail.message}
                                            </p>
                                        )}


                                    </div>

                                    <div className="mt-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            CNPJ (Cadastro Nacional de Pessoa Jurídica)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="XX.XXX.XXX/YYYY-ZZ"
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register("cnpj", {
                                                required: "Please enter your CNPJ",
                                                pattern: {
                                                    value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
                                                    message: "CNPJ must be in the format XX.XXX.XXX/YYYY-ZZ",
                                                },
                                            })} />


                                        {errors.cnpj && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {errors.cnpj.message}
                                            </p>
                                        )}

                                    </div>

                                    <div className="mt-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Website
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Website URL"
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register("websiteurl", {
                                                required: "Please enter your clinic URL",
                                                pattern: {
                                                    value: /^https:\/\/.+/,
                                                    message: "URL must start with https://",
                                                },
                                            })}
                                        />

                                        {errors.websiteurl && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {errors.websiteurl.message}
                                            </p>
                                        )}

                                    </div>

                                  








                                </div>
                            </div>
                        </div>


                        <div className="my-10 border-t"></div>


                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => dispatch(prevStep())}
                                disabled={step === 1}
                                className="px-6 py-2 rounded-xl border border-gray-300
                                        text-gray-700 hover:bg-gray-100 transition">
                                ← Back
                            </button>


                            
                           
                                <button
                                disabled={button}
                                type="submit"
                                className="btn btn-primary">
                                {button ? (<div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>) : (
                                    <>Continue →</>
                                )}
                            </button>
                           
                        </div>
                    </form>
                </div>
            </div>
        </div>  



    </>);
}