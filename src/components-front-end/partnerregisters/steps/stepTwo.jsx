"use client"
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep, setOtp } from "../../redux/partnerregister/registerSlice";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";



export function StepTwo(){
 const step = useSelector((state) => state.register.step);
 const email = useSelector((state) => state.register.email);
 const uuid = useSelector((state) => state.register.uuid);
  const savedotp = useSelector((state) => state.register.otp);
 const dispatch = useDispatch();
 const [button,setButton] = useState(false);


     const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
  watch, // add watch
  getValues,
  setError
} = useForm();

// watch password field
const password = watch("password");

    useEffect(()=>{
        fetchClinicUserDetails();
    },[uuid]);

    const fetchClinicUserDetails = async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/get-clinic-user-details/${uuid}`,{
            method : "get"
        });
        if(res.ok){
            const result = await res.json();
            setValue("firstname",result.data.firstname);
            setValue("lastname",result.data.lastname);
            setValue("phoneno",result.data.phone);
            setValue("email",email);

            setContinueButton(result.data.phoneVerify === 1 ? true : false);

        }
    }







const onUpdate = async (data) => {
    debugger;
 
    setButton(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/insert-clinic-user-details`,{
        method : "Put",
        headers:{
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            "uuid" : uuid,
            "firstname" : data.firstname,
            "lastname": data.lastname,
            "phonenno": data.phoneno,
            "password" : data.password

        })
    });

    if(res.ok){
        const result= await res.json();
        setTimeout(() => {
             toast.success(result.message, {
                className: "bg-blue-600 text-white font-bold",
                bodyClassName: "text-white",
        });

        dispatch(nextStep());
        }, 2000);
    }
    setButton(false);
};





 const [countrycode,setCountryCode] = useState("+55");

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
    setError("phoneno", { type: "manual", message: "Enter phone number" });
    return false;
  }


  const digits = phone.replace(/\D/g, "");


  if (!/^\d+$/.test(digits)) {
    setError("phoneno", { type: "manual", message: "Only digits allowed" });
    return false;
  }



  const rule = phoneRulesByCountry[countrycode];
  if (rule) {
    if (digits.length < rule.min || digits.length > rule.max) {
      setError("phoneno", { 
        type: "manual", 
        message: `Phone number must be ${rule.min}-${rule.max} digits` 
      });
      return false;
    }
  }
  return true;
};



    const verifyphonenumber = async (phone) => {
        debugger;
        setError("phoneno", { type: "manual", message: `` });
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

                setError("phoneno", { 
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
    
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/verify-otp-phone`,{
            method : "Post",
            headers :{
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                "cliniciduuid" : uuid,
                 "phoneverify" : 1
            })
        });
        if(res.ok){
            const result = await res.json();
        }

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
                        Step {step} of 6
                    </div>

                    <form  onSubmit={handleSubmit(onUpdate)}>

                   
                    
                    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-8 items-start gap-2">


                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                Please provide the following details
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                               
                            </p>
                        </div>



                        <div className="relative">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                  <div className="hidden">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Email Address
                                </label>
                                <input
                                    disabled={true}
                                    value={email}
                                    type="email"
                                    placeholder="clinic@company.com"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register("email", {
                                        required: "Please enter your email address",
                                    })} />

                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}

                                </div>

                                  
                             </div>


                          

                           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">

                                <div className="mt-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First name
                                    </label>
                                    <input


                                        type="text"
                                        placeholder="first name"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("firstname", {
                                            required: "Please enter your first name",
                                        })} />

                                    {errors.firstname && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {errors.firstname.message}
                                        </p>
                                    )}

                                </div>
                                <div className="mt-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="last name"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("lastname", {
                                            required: "Please enter your last name",
                                        })} />

                                    {errors.lastname && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {errors.lastname.message}
                                        </p>
                                    )}

                                </div>
                            </div>


                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">

                                <div className="mt-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input


                                        type="password"
                                        placeholder="password"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("password", {
                                            required: "Please enter your password",
                                        })} />

                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}

                                </div>
                                <div className="mt-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                       Confirm Password
                                    </label>
                                   <input
                                        type="password"
                                        placeholder="confirm password"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("confirmpassword", {
                                            required: "Please enter your confirm password",
                                            validate: (value) => value === password || "Passwords do not match",
                                        })}
                                        />


                                    {errors.confirmpassword && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {errors.confirmpassword.message}
                                        </p>
                                    )}

                                </div>

                                 

                            </div>     
                             <div className="mt-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>

                                        <div className="relative flex gap-2 items-center">
                                            {/* Country Code Dropdown */}
                                           <select
                                                    onChange={(e) => {
                                                        debugger;
                                                    setCountryCode(e.target.value);
                                                
                                                    }}
                                                    className="rounded-xl border border-gray-300 bg-gray-50 px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"

                                                    defaultValue="+55"
                                                >
                                                    <option value="+1">🇺🇸 +1</option>
                                                    <option value="+91">🇮🇳 +91</option>
                                                    <option value="+44">🇬🇧 +44</option>
                                                    <option value="+61">🇦🇺 +61</option>
                                                    <option value="+55">🇧🇷 +55</option>
                                                </select>

                                            <input
                                                disabled={continuebutton}
                                                type="text"
                                                placeholder="Phone Number"
                                                className={`flex-1 rounded-xl border border-gray-300 px-4 py-3
                                                    text-gray-900 placeholder-gray-400
                                                    focus:outline-none focus:ring-2 focus:ring-blue-500
                                                    disabled:bg-gray-100 disabled:text-gray-400
                                                    disabled:border-gray-200 disabled:cursor-not-allowed
                                                    ${continuebutton ? "pr-10" : ""}`} // padding for check icon
                                                {...register("phoneno", {
                                                    required: "Please enter your phone number",
                                                    pattern: {
                                                        value: /^\d{4,15}$/,
                                                        message: "Enter a valid 9-15-digit phone number",
                                                    },
                                                })}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (!value) setverfiy(false);
                                                }}
                                            />

                                            {/* Check icon inside input */}
                                            {continuebutton && (
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-xl">
                                                    ✔️
                                                </span>
                                            )}

                                            {/* Verify button */}
                                            {verify === false && continuebutton === false && (
                                                <button
                                                    type="button"
                                                    onClick={() => verifyphonenumber(getValues("phoneno"))}
                                                    className="btn btn-primary"
                                                >
                                                    Verify
                                                </button>
                                            )}
                                        </div>



                                        {errors.phoneno && (
                                            <p className="mt-2 text-sm text-red-500">{errors.phoneno.message}</p>
                                        )}


                                        {(verify && continuebutton === false) && (
                                            <div className="">

                                                <div className="mt-6 p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
                                                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">
                                                        Verify OTP
                                                    </h3>

                                                    {/* OTP Inputs */}

                                                    <div
                                                        className="flex justify-center gap-3 mb-4"
                                                        onPaste={handlePaste}
                                                    >
                                                        {[0, 1, 2, 3].map((_, index) => (
                                                            <input
                                                                key={index}
                                                                type="text"
                                                                inputMode="numeric"
                                                                maxLength={1}
                                                                ref={(el) => (inputsRef.current[index] = el)}
                                                                onChange={(e) => handleChange(e, index)}
                                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                                className="w-14 h-14 text-center text-2xl font-bold
                                                                text-gray-900 bg-gray-100
                                                                rounded-xl border border-gray-300
                                                                focus:bg-white focus:border-indigo-500
                                                                focus:ring-2 focus:ring-indigo-200
                                                                outline-none transition"
                                                            />
                                                        ))}
                                                    </div>
                                                    {/* Resend Section */}
                                                    <div className="flex items-center justify-center gap-2 text-sm">
                                                        <span className="text-gray-500">

                                                            {seconds > 0 ? `Resend code in` : <></>}
                                                        </span>
                                                        <span className="font-semibold text-indigo-600">

                                                            {seconds > 0 ? `${seconds}s` : <></>}
                                                        </span>

                                                    </div>

                                                    <div className="flex justify-center mt-3">
                                                        <button
                                                            type="button"
                                                            disabled={seconds == 0 ? false : true}
                                                            className="text-indigo-600 font-medium
                                                            disabled:text-gray-400 disabled:cursor-not-allowed
                                                            hover:underline transition"
                                                            onClick={() => verifyphonenumber(getValues("phoneno"))}>
                                                            Resend OTP
                                                        </button>

                                                    </div>
                                                </div>


                                            </div>
                                        )}
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
                                    type="submit"
                                    className="btn btn-primary">

                                    {button ?
                                   (
                                   <div role="status">

                                        <svg aria-hidden="true" className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>

                                        <span className="sr-only">Loading...</span>

                                    </div>
                                    ) :
                                    (
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