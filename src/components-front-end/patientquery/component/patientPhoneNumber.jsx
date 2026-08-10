import { addphoneNumber, addphoneNumberVerified, addphoneOtp, addProvider, addStep, addtelegramUsername, addtelegramUsernameVerified, customStep } from "@/components-front-end/redux/patinetquery/patientQueryRedux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";




export function PatientPhoneNumber(){


  const [otpmodal,setOtpModal] = useState(false);
  const [resendbutton,setResendButton] = useState(false);
  const {register,setValue,getValues,handleSubmit,formState:{errors},setError} = useForm();
  const  dispatch = useDispatch();
  const phoneOtp = useSelector((state) => state.patientquery.phoneOtp);
  const phoneNumberVerified = useSelector((state) => state.patientquery.phoneNumberVerified);
  const phoneNumber = useSelector((state) => state.patientquery.phoneNumber);

  const [provider,setProvider] = useState("sms");





  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);


  
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const timer = 60;


  
    const popularCountries = [
       { country: "United States", code: "+1", length: 10 },
      { country: "India", code: "+91", length: 10 },
      { country: "United Kingdom", code: "+44", length: 10 },
      { country: "Germany", code: "+49", length: 11 },
      { country: "France", code: "+33", length: 9 },
      { country: "Italy", code: "+39", length: 10 },
      { country: "Spain", code: "+34", length: 9 },
      { country: "Australia", code: "+61", length: 9 },
      { country: "Brazil", code: "+55", length: 11 },
    ];

      const [selectedCountry, setSelectedCountry] = useState(popularCountries[0]); // Default India



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



  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);
  };


  const handleOtpChange =async (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    const enteredOtp = newOtp.join("");
    debugger;
   
    if(enteredOtp.length == otp.length){
     await verifyotp(enteredOtp,selectedCountry.code + getValues("phonenumber"))
    }

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };


  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = pasted.split("");
    const enteredOtp = newOtp.join("");
    debugger;
    if(enteredOtp == phoneOtp){
      dispatch(addphoneNumber(selectedCountry.code + getValues("phonenumber")));
      dispatch(addphoneNumberVerified("1"));
      dispatch(addProvider(provider));
      dispatch(addStep());
    }
    
    setOtp((prev) =>
      prev.map((_, i) => newOtp[i] || "")
    );
  };


  const onCreate = async (data) => {
    debugger;
      setOtp(["","","","","",""]);
      if(provider === "telegram"){
        dispatch(addtelegramUsername(getValues("telegramusername")));
        dispatch(addtelegramUsernameVerified("1"));
         dispatch(addProvider(provider));
        dispatch(addStep());
        return;
      }

    console.log("selectedCountry", data.phonenumber.length);

    if(data.phonenumber.length !== selectedCountry.length){
        setError("phonenumber", {
              type: "manual",
              message: `Phone number must be ${selectedCountry.length} digits for ${selectedCountry.country}`
        });

      return false;
    }




    const phonenumber = selectedCountry.code + data.phonenumber;
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-query/send-otp-phone`, {
      method: "Post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "phone": phonenumber
      })
    });
    if (res.ok) {
      const result = await res.json();
      if(result.success === true){
        setOtpModal(true);
        setSeconds(timer);
        setIsActive(true);
        dispatch(addphoneOtp(result.otp));
      }else{
        setOtpModal(true);
        setSeconds(timer);
        setIsActive(true);
        dispatch(addphoneOtp("000000"));
      }
    }
    else{
    
    }
  }


  const changenumber=async()=>{
     setOtpModal(false);
  }




  const verifyotp = async(otp,phone)=>{
    debugger;
    const res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-query/otp-verification`,{
      method: "Post",
      headers :{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "phone" : phone,
        "otp" : otp
      })

    });
    if(res.ok){
      const result= await res.json();

      if(result.success === false){
         setError("phonenumber", {
              type: "manual",
              message: `Invalid OTP. Please enter the correct OTP.`
        });
      }

      if(result.success === true){
        dispatch(addphoneNumber(selectedCountry.code + getValues("phonenumber")));
        dispatch(addphoneNumberVerified("1"));
        dispatch(addProvider(provider));
        dispatch(addStep());
      }


    }

  }




    return(<>
      <ToastContainer />
    
       
      {phoneNumberVerified == 0 ?(<>
        
        <div className="bg-gray-50 flex flex-col items-center py-10 px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-2 max-w-3xl">
          How would you like us to reach you?
        </h2>

        <p className="text-sm text-blue-700 mb-6">
          We will use this phone number to send you details about your request.
          If number verification fails, you can try contacting one of our coordinators directly by skipping this step.
        </p>



        <div className="flex justify-center w-full">
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 flex items-center justify-center text-gray-400" />

              <div class="w-full max-w-md ">
                  <div class="flex justify-center space-x-2 bg-gray-200 rounded-full p-1 mb-5">

                    <button onClick={()=> setProvider("sms")} className={`px-4 py-2 rounded-full  text-blue-500 hover:bg-white  ${provider === "sms" && "bg-white font-semibold"}`}>
                      Sms / WhatsApp
                    </button>
                    {/* <button onClick={()=> setProvider("whatsapp")} className={`px-4 py-2 rounded-full  text-blue-500 hover:bg-white  ${provider === "whatsapp" && "bg-white font-semibold"}`}>
                      WhatsApp
                    </button> */}


                    <button onClick={()=> setProvider("telegram")} className={`px-4 py-2 rounded-full  text-blue-500 hover:bg-white  ${provider === "telegram" && "bg-white font-semibold"}`}>
                      Telegram
                    </button>
                  </div>


                {(provider === "whatsapp" || provider === "sms") && (<>
                  <form onSubmit={handleSubmit(onCreate)} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex">
                        <select
                          value={selectedCountry.code}
                          onChange={(e) => {
                            const country = popularCountries.find(c => c.code === e.target.value);
                            setSelectedCountry(country);
                          }}
                          className="
                        px-3
                        rounded-l-md
                        border
                        border-r-0
                        border-gray-300
                        bg-gray-100
                        text-sm
                        text-gray-700
                        focus:outline-none
                      "
                        >
                          {popularCountries.map((c) => (
                            <option key={c.code} value={c.code}>
                              ({c.code})
                            </option>
                          ))}
                        </select>

                        <input
                          disabled={otpmodal}
                          type="text"
                          placeholder="Enter phone number"

                          maxLength={selectedCountry.length}
                          inputMode="numeric"

                          className={`
                        w-full
                        rounded-r-md
                        border
                        px-4
                        py-2.5
                        text-sm
                        outline-none
                        transition
                        ${errors.phonenumber
                              ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"}
                    `}

                          {...register("phonenumber", {
                            required: "Phone number is required",
                          })}

                        />
                      </div>


                      
                    </div>
                    {otpmodal && (
                      <div className="flex flex-col gap-3">

                        <div className="flex justify-between gap-2">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              id={`otp-${index}`}
                              type="text"
                              value={digit}
                              maxLength={1}
                              onChange={(e) => handleOtpChange(e.target.value, index)}
                              onPaste={handleOtpPaste}
                              className="
                          w-full
                          h-12
                          text-center
                          text-base
                          font-medium
                          rounded-md
                          border
                          border-gray-300
                          focus:border-blue-500
                          focus:ring-2
                          focus:ring-blue-100
                          outline-none
                          transition
                        "
                            />
                          ))}
                        </div>


                        <div className="flex justify-between items-center text-sm">
                          <button
                            type="button"
                            disabled={seconds === 0 ? false : true}
                            onClick={() => {
                              onCreate({ phonenumber: getValues("phonenumber") })
                            }}
                            className="
                          text-blue-600
                          hover:text-blue-700
                          font-medium
                          transition">

                            {seconds > 0 ? `Resend code in` : <></>}   {seconds > 0 ? `${seconds}s` : <></>}
                            {seconds === 0 ? `Resend` : <></>}
                          </button>
                              
                          <button
                            onClick={() => changenumber()}
                            type="button"
                            className="
                          text-gray-500
                          hover:text-gray-700
                          transition">

                            Change Number
                          </button>
                        </div>
                      </div>
                    )}
                    {errors.phonenumber && (
                        <p className="text-sm text-red-600">
                          {errors.phonenumber.message}
                        </p>
                      )}
                    {!otpmodal && (<>
                      <button
                        type="submit"
                        className="
                w-full
                rounded-md
                bg-blue-600
                py-2.5
                text-sm
                font-semibold
                text-white
                hover:bg-blue-700
                focus:outline-none
                focus:ring-2
                focus:ring-blue-300
                transition
                mt-2
                "
                      >
                        Verify
                      </button>

                    </>)}

                  </form>
                </>)}

                

                {provider === "telegram" && (<>
                  <form onSubmit={handleSubmit(onCreate)} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        placeholder="Enter telegram username"
                        className={`
    w-full
    rounded-r-md
    border
    px-4
    py-2.5
    text-sm
    outline-none
    transition
    ${errors.telegramusername
                            ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                          }
  `}
                        {...register("telegramusername", {
                          required: "Telegram username is required",

                          pattern: {
                            value: /^[a-zA-Z0-9_]{5,32}$/,
                            message:
                              "Telegram username must be 5-32 characters and contain only letters, numbers, and underscores",
                          },

                          setValueAs: (value) => value.replace("@", ""),
                        })}
                      />


                      {errors.telegramusername && (
                        <p className="text-sm text-red-600">
                          {errors.telegramusername.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="
          w-full
          rounded-md
          bg-blue-600
          py-2.5
          text-sm
          font-semibold
          text-white
          hover:bg-blue-700
          focus:outline-none
          focus:ring-2
          focus:ring-blue-300
          transition
          mt-2
          ">
                      Save Changes
                    </button>
                  </form>
                </>)}
                </div>


          
                
             
          

             


          </div>
        </div>
      </div>

      
      </>):(<>
      
           <div class="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-sm border border-gray-200 mx-auto mt-5">
  

  <div class="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
    </svg>
  </div>


  <h3 class="text-lg font-semibold text-gray-800">
    {provider === "sms" && (<>Phone Number </>)} 
    {provider === "whatsapp" && (<>Phone Number </>)} 
    {provider === "telergam" && (<>Telegram Username </>)} 
     Verified
  </h3>
       <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
  {phoneNumber}
</span>

  <p class="text-sm text-gray-500 text-center mt-1 mb-5">
              Your
              {provider === "sms" && (<> Phone Number </>)}
              {provider === "whatsapp" && (<> Phone Number </>)}
              {provider === "telergam" && (<> Telegram Username </>)}
              has been successfully verified.
  </p>


  <button
    type="button"
    className="btn btn-primary"
    onClick={()=> dispatch(addStep())}>
      
    Next
  </button>

</div>
      </>)}


    </>);
}